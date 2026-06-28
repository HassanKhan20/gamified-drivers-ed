"""APEX backend — FastAPI + SQLite, no external DB or auth service.

Run from project root:
    pip install -r backend/requirements.txt
    uvicorn backend.main:app --reload --port 8000

Serves the static frontend at /, plus API routes under /api/*.
"""
from __future__ import annotations

import hashlib
import hmac
import os
import secrets
import sqlite3
import time
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Optional

from fastapi import Cookie, Depends, FastAPI, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, Field

from backend.compliance.mastery import MASTERY_THRESHOLD, passes_mastery
import json as _stdlib_json
_CURRICULUM_MINUTES_PATH = Path(__file__).resolve().parent / "compliance" / "curriculum_minutes.json"
try:
    _CURRICULUM_MINUTES: dict[str, int] = _stdlib_json.loads(_CURRICULUM_MINUTES_PATH.read_text(encoding="utf-8"))
except FileNotFoundError:
    _CURRICULUM_MINUTES = {}

ROOT = Path(__file__).resolve().parent.parent  # project root (one up from backend/)
DB_PATH = Path(os.environ.get("APEX_DB_PATH", str(ROOT / "backend" / "apex.db")))
STATIC_DIR = ROOT / "frontend"  # frontend/ holds all HTML/JS/CSS
SESSION_COOKIE = "apex_sess"
SESSION_DAYS = 30

app = FastAPI(title="APEX Drivers Ed API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000", "http://127.0.0.1:5173", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security + cache headers. One pass:
#  - browsers must always fetch the latest HTML/JS/CSS (dev productivity)
#  - send a tight set of security headers on every response (defence-in-depth)
@app.middleware("http")
async def security_and_cache_headers(request: Request, call_next):
    response = await call_next(request)
    path = request.url.path

    # No-cache for static-served HTML/JS/CSS during dev.
    if path.endswith((".html", ".js", ".css")) or path == "/":
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"

    # ---- Always-on security headers ----
    # Disallow embedding APEX in someone else's iframe (clickjacking).
    response.headers.setdefault("X-Frame-Options", "DENY")
    # Stop browsers from MIME-sniffing responses.
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    # Don't leak referrer to other sites; only same-origin.
    response.headers.setdefault("Referrer-Policy", "same-origin")
    # Disable powerful browser APIs we don't use.
    response.headers.setdefault(
        "Permissions-Policy",
        "camera=(), microphone=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
    )
    # Content Security Policy:
    #   - default: only this origin
    #   - allow Three.js + R3F from unpkg.com (importmap)
    #   - Google Fonts CSS + font files
    #   - inline script + style needed for our embedded handlers (would tighten in v2)
    response.headers.setdefault(
        "Content-Security-Policy",
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://unpkg.com; "
        "style-src  'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src   'self' https://fonts.gstatic.com data:; "
        "img-src    'self' data:; "
        "connect-src 'self'; "
        "frame-ancestors 'none'; "
        "base-uri 'self'; "
        "form-action 'self'",
    )
    # Only enable HSTS in true HTTPS deployments. Toggled via env.
    if os.environ.get("APEX_HSTS") == "1":
        response.headers.setdefault("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    return response


# ---------- Rate limiter (in-memory token bucket per IP, per-route) ----------
# Defends /api/signup and /api/login from brute force. In-memory is fine for a
# single uvicorn worker; for multi-worker prod swap to Redis.
_rate_limit_buckets: dict[tuple[str, str], list[float]] = {}
_RATE_WINDOW_SEC = 60.0
_RATE_MAX_PER_WINDOW = 10  # 10 requests per minute per IP per route

def _client_ip(request: Request) -> str:
    # Honor a single hop of trusted proxy if APEX_TRUST_PROXY is set.
    if os.environ.get("APEX_TRUST_PROXY") == "1":
        fwd = request.headers.get("x-forwarded-for")
        if fwd:
            return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

def _check_rate_limit(request: Request, route_key: str) -> None:
    ip = _client_ip(request)
    now = time.time()
    key = (ip, route_key)
    bucket = _rate_limit_buckets.get(key, [])
    # Drop timestamps outside the window
    bucket = [t for t in bucket if now - t < _RATE_WINDOW_SEC]
    if len(bucket) >= _RATE_MAX_PER_WINDOW:
        # Optional: include a Retry-After header on the 429
        raise HTTPException(status_code=429, detail="Too many requests. Slow down.")
    bucket.append(now)
    _rate_limit_buckets[key] = bucket


def _cleanup_expired_sessions() -> None:
    """Best-effort: remove sessions past their expiry. Called from auth endpoints."""
    try:
        with db() as c:
            c.execute("DELETE FROM sessions WHERE expires_at < ?", (datetime.utcnow().isoformat(),))
    except Exception:
        pass


# Cookie security flag — set APEX_SECURE_COOKIE=1 in production (HTTPS only).
SECURE_COOKIE = os.environ.get("APEX_SECURE_COOKIE") == "1"


# ---------- DB ----------

def db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with db() as c:
        c.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT,
                role TEXT DEFAULT 'teen',
                language TEXT DEFAULT 'en',
                state TEXT DEFAULT 'TX',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                expires_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS progress (
                user_id INTEGER PRIMARY KEY,
                xp INTEGER DEFAULT 0,
                level INTEGER DEFAULT 1,
                streak INTEGER DEFAULT 0,
                last_active_date TEXT,
                drives_logged INTEGER DEFAULT 0,
                total_drive_hours REAL DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS completed_lessons (
                user_id INTEGER NOT NULL,
                lesson_id TEXT NOT NULL,
                minutes INTEGER DEFAULT 0,
                completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, lesson_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS chapter_minutes (
                user_id INTEGER NOT NULL,
                chapter_id TEXT NOT NULL,
                minutes INTEGER DEFAULT 0,
                PRIMARY KEY (user_id, chapter_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS game_scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                game_id TEXT NOT NULL,
                score INTEGER NOT NULL,
                accuracy REAL,
                duration_sec INTEGER,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE INDEX IF NOT EXISTS idx_game_scores_user ON game_scores(user_id);
            CREATE INDEX IF NOT EXISTS idx_game_scores_game ON game_scores(game_id);

            CREATE TABLE IF NOT EXISTS drives (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                scenario TEXT NOT NULL,
                car_id TEXT NOT NULL,
                duration_sec INTEGER NOT NULL,
                distance_m REAL DEFAULT 0,
                top_speed REAL DEFAULT 0,
                checkpoints_hit INTEGER DEFAULT 0,
                checkpoints_total INTEGER DEFAULT 0,
                score INTEGER DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE INDEX IF NOT EXISTS idx_drives_user ON drives(user_id);

            CREATE TABLE IF NOT EXISTS user_settings (
                user_id INTEGER PRIMARY KEY,
                selected_car_id TEXT DEFAULT 'sedan-base',
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS shorts_watched (
                user_id INTEGER NOT NULL,
                short_id TEXT NOT NULL,
                completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, short_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS btw_drives (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                date TEXT NOT NULL,
                start_time TEXT,
                end_time TEXT,
                duration_min INTEGER NOT NULL,
                miles REAL DEFAULT 0,
                is_night INTEGER DEFAULT 0,
                weather TEXT,
                road_type TEXT,
                gps_start_lat REAL, gps_start_lng REAL,
                gps_end_lat REAL,   gps_end_lng REAL,
                gps_verified INTEGER DEFAULT 0,
                parent_name TEXT,
                parent_license TEXT,
                notes TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE INDEX IF NOT EXISTS idx_btw_user ON btw_drives(user_id);

            CREATE TABLE IF NOT EXISTS topic_progress (
                user_id INTEGER NOT NULL,
                topic_id TEXT NOT NULL,
                shorts_watched TEXT DEFAULT '[]',   -- JSON list of short ids
                article_read INTEGER DEFAULT 0,
                quiz_score REAL DEFAULT 0,           -- 0.0 .. 1.0
                game_score INTEGER DEFAULT 0,
                drive_done INTEGER DEFAULT 0,
                completed INTEGER DEFAULT 0,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, topic_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE INDEX IF NOT EXISTS idx_topic_progress_user ON topic_progress(user_id);
            """
        )
        # Compliance engine schemas (each module owns its own init function).
        from backend.compliance.audit import init_audit_schema
        from backend.compliance.timer import init_timer_schema
        from backend.compliance.identity import init_identity_schema
        from backend.compliance.multimedia import init_multimedia_schema
        from backend.compliance.lockouts import init_lockouts_schema
        from backend.compliance.spacedrep import init_spacedrep_schema
        from backend.billing import init_billing_schema
        init_audit_schema(c)
        init_timer_schema(c)
        init_identity_schema(c)
        init_multimedia_schema(c)
        init_lockouts_schema(c)
        init_spacedrep_schema(c)
        init_billing_schema(c)


init_db()


# ---------- Password hashing (PBKDF2-SHA256, stdlib only) ----------

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    iters = 200_000
    derived = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iters)
    return f"pbkdf2_sha256${iters}${salt.hex()}${derived.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        scheme, iters_str, salt_hex, hash_hex = stored.split("$")
        if scheme != "pbkdf2_sha256":
            return False
        iters = int(iters_str)
        derived = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), bytes.fromhex(salt_hex), iters)
        return hmac.compare_digest(derived.hex(), hash_hex)
    except Exception:
        return False


# ---------- Session helpers ----------

def create_session(user_id: int) -> str:
    token = secrets.token_urlsafe(32)
    expires = (datetime.utcnow() + timedelta(days=SESSION_DAYS)).isoformat()
    with db() as c:
        c.execute("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)", (token, user_id, expires))
    return token


def session_user(token: Optional[str]) -> Optional[sqlite3.Row]:
    if not token:
        return None
    with db() as c:
        row = c.execute(
            "SELECT u.* FROM users u JOIN sessions s ON s.user_id = u.id "
            "WHERE s.token = ? AND s.expires_at > ?",
            (token, datetime.utcnow().isoformat()),
        ).fetchone()
    return row


def require_user(apex_sess: Optional[str] = Cookie(default=None, alias=SESSION_COOKIE)) -> sqlite3.Row:
    user = session_user(apex_sess)
    if not user:
        raise HTTPException(status_code=401, detail="Not signed in")
    return user


def require_admin(apex_sess: Optional[str] = Cookie(default=None, alias=SESSION_COOKIE)) -> sqlite3.Row:
    user = session_user(apex_sess)
    if not user or user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


def _require_track(track: str):
    """Dependency factory: 402 Payment Required if the user's entitlements don't
    include `track`. Admins bypass (so support/QA can inspect any content)."""
    import backend.billing as _billing

    def dep(user: sqlite3.Row = Depends(require_user)) -> sqlite3.Row:
        if user["role"] == "admin":
            return user
        with db() as c:
            tracks = _billing.allowed_tracks(c, user["id"])
        if track not in tracks:
            raise HTTPException(status_code=402, detail={"error": "not_entitled", "required_track": track})
        return user
    return dep


require_teen = _require_track("teen")
require_parent = _require_track("parent")


# ---------- Schemas ----------

# A short blocklist of the most common weak passwords. We reject these even if
# they pass the length check, so a determined typo like "password11" still
# bounces. Full lists are huge; this catches the obvious offenders without
# shipping a megabyte of strings.
_WEAK_PASSWORDS: set[str] = {
    "password", "password1", "password12", "password123", "password1234",
    "12345678", "123456789", "1234567890", "qwerty123", "qwertyuiop",
    "letmein123", "iloveyou1", "admin1234", "welcome123", "monkey1234",
    "abc12345", "iloveyou123", "trustno1234", "sunshine1", "princess1",
    "football1", "baseball1", "michael12", "ninja1234", "azerty1234",
    "dragon1234", "master1234", "shadow1234", "qazwsxedc", "1q2w3e4r5t",
}


def _password_check(pw: str) -> Optional[str]:
    """Return an error message if pw violates the rules, else None."""
    if len(pw) < 10:
        return "Password must be at least 10 characters."
    if pw.lower() in _WEAK_PASSWORDS:
        return "That password is too common. Pick something less guessable."
    # Reject all-digits / all-letters passwords (low entropy)
    if pw.isdigit() or pw.isalpha():
        return "Mix letters and numbers (or symbols) — no all-letters or all-digits."
    return None


class SignupIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=10, max_length=128)
    name: Optional[str] = Field(default=None, max_length=80)
    role: Optional[str] = Field(default="teen", pattern="^(teen|parent)$")
    language: Optional[str] = Field(default="en", pattern="^(en|es)$")


class PasswordChangeIn(BaseModel):
    current_password: str = Field(min_length=1, max_length=128)
    new_password: str = Field(min_length=10, max_length=128)


class AccountDeleteIn(BaseModel):
    password: str = Field(min_length=1, max_length=128)
    confirm: str = Field(min_length=1, max_length=20)  # must be the literal "DELETE"


class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class CompleteLessonIn(BaseModel):
    lesson_id: str = Field(min_length=1, max_length=20, pattern=r"^[A-Za-z0-9_.\-:]+$")
    minutes: int = Field(default=0, ge=0, le=120)
    xp: int = Field(default=50, ge=0, le=200)


class GameScoreIn(BaseModel):
    game_id: str = Field(min_length=1, max_length=40, pattern=r"^[a-z0-9_\-]+$")
    score: int = Field(ge=0, le=100000)
    accuracy: Optional[float] = Field(default=None, ge=0.0, le=1.0)
    duration_sec: Optional[int] = Field(default=None, ge=0, le=3600)


class DriveIn(BaseModel):
    scenario: str = Field(min_length=1, max_length=40, pattern=r"^[a-z0-9_\-]+$")
    car_id: str = Field(min_length=1, max_length=40, pattern=r"^[a-z0-9_\-]+$")
    duration_sec: int = Field(ge=0, le=3600)
    distance_m: float = Field(default=0, ge=0, le=100_000)
    top_speed: float = Field(default=0, ge=0, le=500)
    checkpoints_hit: int = Field(default=0, ge=0, le=100)
    checkpoints_total: int = Field(default=0, ge=0, le=100)
    score: int = Field(default=0, ge=0, le=100_000)


class CarSelectIn(BaseModel):
    car_id: str = Field(min_length=1, max_length=40, pattern=r"^[a-z0-9_\-]+$")


class ShortWatchedIn(BaseModel):
    short_id: str = Field(min_length=1, max_length=80, pattern=r"^[a-z0-9_\-]+$")


class TopicProgressIn(BaseModel):
    # All optional; absence = leave unchanged. Server merges field-by-field
    # and validates the gate sequence (can't game a drive done if quiz fails).
    short_id: Optional[str]    = Field(default=None, max_length=80, pattern=r"^[a-z0-9_\-]+$")
    article_read: Optional[bool] = None
    quiz_score:   Optional[float] = Field(default=None, ge=0.0, le=1.0)
    game_score:   Optional[int]   = Field(default=None, ge=0, le=100_000)
    drive_done:   Optional[bool] = None


class BTWDriveIn(BaseModel):
    date: str = Field(min_length=8, max_length=10, pattern=r"^\d{4}-\d{2}-\d{2}$")
    start_time: Optional[str] = Field(default=None, max_length=8, pattern=r"^\d{1,2}:\d{2}(:\d{2})?$")
    end_time:   Optional[str] = Field(default=None, max_length=8, pattern=r"^\d{1,2}:\d{2}(:\d{2})?$")
    duration_min: int = Field(ge=1, le=600)
    miles: float = Field(default=0, ge=0, le=1000)
    is_night: bool = False
    weather:   Optional[str] = Field(default=None, max_length=24)
    road_type: Optional[str] = Field(default=None, max_length=24)
    gps_start_lat: Optional[float] = Field(default=None, ge=-90,  le=90)
    gps_start_lng: Optional[float] = Field(default=None, ge=-180, le=180)
    gps_end_lat:   Optional[float] = Field(default=None, ge=-90,  le=90)
    gps_end_lng:   Optional[float] = Field(default=None, ge=-180, le=180)
    parent_name:    Optional[str] = Field(default=None, max_length=80)
    parent_license: Optional[str] = Field(default=None, max_length=20)
    notes:          Optional[str] = Field(default=None, max_length=500)


# Authoritative car catalog. Frontend mirrors this in cars.js but the server
# enforces level-based unlock when a user tries to select one.
CAR_CATALOG = [
    {"id": "sedan-base",     "name": "Origin Sedan",  "class": "A",  "level": 1,  "topSpeed": 120, "accel": 8.5, "color": "#9ca3af"},
    {"id": "coupe-sport",    "name": "Vector Coupe",  "class": "B",  "level": 5,  "topSpeed": 180, "accel": 6.5, "color": "#00d4ff"},
    {"id": "super-mint",     "name": "Mint Apex",     "class": "S",  "level": 10, "topSpeed": 240, "accel": 4.2, "color": "#00f5a0"},
    {"id": "hyper-cyan",     "name": "Hyper One",     "class": "S+", "level": 15, "topSpeed": 290, "accel": 3.0, "color": "#22d3ee"},
    {"id": "f1-prototype",   "name": "Prototype X",   "class": "F1", "level": 20, "topSpeed": 340, "accel": 2.2, "color": "#ffb020"},
    {"id": "concept-exotic", "name": "Concept Z",     "class": "X",  "level": 25, "topSpeed": 400, "accel": 1.8, "color": "#ff3b5c"},
]
CAR_BY_ID = {c["id"]: c for c in CAR_CATALOG}


# ---------- Helpers ----------

def serialize_user(u: sqlite3.Row) -> dict[str, Any]:
    return {
        "id": u["id"],
        "email": u["email"],
        "name": u["name"],
        "role": u["role"],
        "language": u["language"],
        "state": u["state"],
    }


def get_or_create_progress(user_id: int) -> sqlite3.Row:
    with db() as c:
        row = c.execute("SELECT * FROM progress WHERE user_id = ?", (user_id,)).fetchone()
        if not row:
            c.execute("INSERT INTO progress (user_id) VALUES (?)", (user_id,))
            row = c.execute("SELECT * FROM progress WHERE user_id = ?", (user_id,)).fetchone()
    return row


def serialize_progress(user_id: int) -> dict[str, Any]:
    p = get_or_create_progress(user_id)
    with db() as c:
        completed = [r["lesson_id"] for r in c.execute(
            "SELECT lesson_id FROM completed_lessons WHERE user_id = ? ORDER BY completed_at", (user_id,)).fetchall()]
        chapter_min = {r["chapter_id"]: r["minutes"] for r in c.execute(
            "SELECT chapter_id, minutes FROM chapter_minutes WHERE user_id = ?", (user_id,)).fetchall()}
    return {
        "xp": p["xp"],
        "level": p["level"],
        "streak": p["streak"],
        "lastActiveDate": p["last_active_date"],
        "drivesLogged": p["drives_logged"],
        "totalDriveHours": p["total_drive_hours"],
        "completedLessons": completed,
        "chapterMinutes": chapter_min,
    }


# ---------- Auth routes ----------

def _set_session_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        SESSION_COOKIE, token,
        max_age=SESSION_DAYS * 86400,
        httponly=True,
        samesite="lax",
        secure=SECURE_COOKIE,  # set APEX_SECURE_COOKIE=1 in HTTPS production
    )


@app.post("/api/signup")
def signup(payload: SignupIn, request: Request, response: Response):
    _check_rate_limit(request, "signup")
    _cleanup_expired_sessions()
    # Reject weak/common passwords on top of the length check.
    pw_err = _password_check(payload.password)
    if pw_err:
        raise HTTPException(status_code=422, detail=pw_err)
    # Normalize email (case-insensitive lookups)
    email = payload.email.lower().strip()
    with db() as c:
        existing = c.execute("SELECT id FROM users WHERE LOWER(email) = ?", (email,)).fetchone()
        if existing:
            # Generic message, not "email taken" — reduces account enumeration.
            raise HTTPException(status_code=409, detail="Could not create account.")
        cur = c.execute(
            "INSERT INTO users (email, password_hash, name, role, language) VALUES (?, ?, ?, ?, ?)",
            (email, hash_password(payload.password), payload.name, payload.role or "teen", payload.language or "en"),
        )
        user_id = cur.lastrowid
        c.execute("INSERT INTO progress (user_id) VALUES (?)", (user_id,))
        user = c.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        try:
            from backend.compliance.audit import log_event
            log_event(c, user_id, "auth_signup", None, {"ip": _client_ip(request)})
        except Exception:
            pass
    token = create_session(user["id"])
    _set_session_cookie(response, token)
    return {"user": serialize_user(user), "progress": serialize_progress(user["id"])}


@app.post("/api/login")
def login(payload: LoginIn, request: Request, response: Response):
    _check_rate_limit(request, "login")
    _cleanup_expired_sessions()
    email = payload.email.lower().strip()
    with db() as c:
        user = c.execute("SELECT * FROM users WHERE LOWER(email) = ?", (email,)).fetchone()
    if not user or not verify_password(payload.password, user["password_hash"]):
        # Same message regardless of which field is wrong (no account enumeration).
        if user:
            try:
                from backend.compliance.audit import log_event
                with db() as c:
                    log_event(c, user["id"], "auth_login_fail", None, {"ip": _client_ip(request)})
            except Exception:
                pass
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_session(user["id"])
    _set_session_cookie(response, token)
    try:
        from backend.compliance.audit import log_event
        with db() as c:
            log_event(c, user["id"], "auth_login_ok", None, {"ip": _client_ip(request)})
    except Exception:
        pass
    return {"user": serialize_user(user), "progress": serialize_progress(user["id"])}


# ---------- Account / privacy routes ----------

class ProfileIn(BaseModel):
    name: Optional[str] = Field(default=None, max_length=80)
    language: Optional[str] = Field(default=None, pattern="^(en|es)$")


@app.post("/api/me/profile")
def update_profile(payload: ProfileIn, request: Request,
                   user: sqlite3.Row = Depends(require_user)):
    """Update name and/or language. Email is locked (KYC for the cert)."""
    fields, args = [], []
    if payload.name is not None:
        clean = payload.name.strip()
        if not clean:
            raise HTTPException(status_code=422, detail="Name cannot be empty.")
        fields.append("name = ?"); args.append(clean)
    if payload.language is not None:
        fields.append("language = ?"); args.append(payload.language)
    if not fields:
        return {"ok": True, "changed": False}
    args.append(user["id"])
    with db() as c:
        c.execute(f"UPDATE users SET {', '.join(fields)} WHERE id = ?", args)
    return {"ok": True, "changed": True}


@app.post("/api/me/password")
def change_password(payload: PasswordChangeIn, request: Request, response: Response,
                    apex_sess: Optional[str] = Cookie(default=None, alias=SESSION_COOKIE),
                    user: sqlite3.Row = Depends(require_user)):
    """Change password. Verifies the current password, enforces strength rules,
    and invalidates every OTHER session for this user (current session keeps
    living). Defends against a stolen-cookie attacker who can't change pw."""
    _check_rate_limit(request, "password_change")
    if not verify_password(payload.current_password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Current password is incorrect.")
    pw_err = _password_check(payload.new_password)
    if pw_err:
        raise HTTPException(status_code=422, detail=pw_err)
    if verify_password(payload.new_password, user["password_hash"]):
        raise HTTPException(status_code=422, detail="New password must differ from current one.")
    new_hash = hash_password(payload.new_password)
    with db() as c:
        c.execute("UPDATE users SET password_hash = ? WHERE id = ?", (new_hash, user["id"]))
        # Invalidate every session except the one making this request.
        c.execute("DELETE FROM sessions WHERE user_id = ? AND token != ?", (user["id"], apex_sess or ""))
        try:
            from backend.compliance.audit import log_event
            log_event(c, user["id"], "auth_password_changed", None, {"ip": _client_ip(request)})
        except Exception:
            pass
    return {"ok": True}


@app.post("/api/me/sessions/signout-all")
def signout_all(request: Request, response: Response,
                user: sqlite3.Row = Depends(require_user)):
    """Drop every session for this user (including the current one). The browser
    is signed out everywhere. Use after a suspected compromise."""
    with db() as c:
        c.execute("DELETE FROM sessions WHERE user_id = ?", (user["id"],))
        try:
            from backend.compliance.audit import log_event
            log_event(c, user["id"], "auth_signout_all", None, {"ip": _client_ip(request)})
        except Exception:
            pass
    response.delete_cookie(SESSION_COOKIE, samesite="lax", secure=SECURE_COOKIE, httponly=True)
    return {"ok": True}


@app.get("/api/me/export")
def export_my_data(user: sqlite3.Row = Depends(require_user)):
    """Return everything we have about this user as a single JSON document.
    Used by the Settings → "Download my data" button. Mirrors what a TDLR
    auditor or a curious student could reasonably ask to see."""
    uid = user["id"]
    with db() as c:
        def rows(q: str, *args):
            return [dict(r) for r in c.execute(q, args).fetchall()]
        data = {
            "user": serialize_user(user),
            "progress": serialize_progress(uid),
            "completed_lessons": rows("SELECT lesson_id, minutes, completed_at FROM completed_lessons WHERE user_id = ?", uid),
            "chapter_minutes":   rows("SELECT chapter_id, minutes FROM chapter_minutes WHERE user_id = ?", uid),
            "chapter_seconds":   rows("SELECT chapter_id, seconds, updated_at FROM chapter_seconds WHERE user_id = ?", uid),
            "topic_progress":    rows("SELECT topic_id, shorts_watched, article_read, quiz_score, game_score, drive_done, completed, updated_at FROM topic_progress WHERE user_id = ?", uid),
            "drives":            rows("SELECT scenario, car_id, duration_sec, distance_m, top_speed, checkpoints_hit, checkpoints_total, score, created_at FROM drives WHERE user_id = ?", uid),
            "game_scores":       rows("SELECT game_id, score, accuracy, duration_sec, played_at FROM game_scores WHERE user_id = ?", uid),
            "btw_drives":        rows("SELECT date, start_time, end_time, duration_min, miles, is_night, weather, road_type, gps_verified, parent_name, parent_license, notes, created_at FROM btw_drives WHERE user_id = ?", uid),
            "shorts_watched":    rows("SELECT short_id, watched_at FROM shorts_watched WHERE user_id = ?", uid),
            "audit_events":      rows("SELECT event_type, lesson_id, payload_json, created_at FROM audit_events WHERE user_id = ?", uid),
        }
        try:
            from backend.compliance.audit import log_event
            log_event(c, uid, "data_exported")
        except Exception:
            pass
    return JSONResponse(
        content=data,
        headers={"Content-Disposition": f'attachment; filename="goodlane-data-{uid}.json"'},
    )


@app.post("/api/me/delete")
def delete_my_account(payload: AccountDeleteIn, request: Request, response: Response,
                      user: sqlite3.Row = Depends(require_user)):
    """Hard-delete the account. Requires the current password + the literal
    string "DELETE" as a typo-guard. Cascades remove dependent rows. There is
    no recovery from this — for TDLR-record retention, the audit trail keeps
    a single "account_deleted" row in audit_events.log keyed by the gone uid."""
    if payload.confirm.strip().upper() != "DELETE":
        raise HTTPException(status_code=422, detail='Type DELETE to confirm.')
    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect password.")
    uid = user["id"]
    with db() as c:
        try:
            from backend.compliance.audit import log_event
            log_event(c, uid, "account_deleted", None, {"ip": _client_ip(request), "email": user["email"]})
        except Exception:
            pass
        # FK ON DELETE CASCADE clears sessions, progress, completed_lessons,
        # topic_progress, chapter_minutes, chapter_seconds, drives,
        # btw_drives, shorts_watched, game_scores, identity_*, lockouts, etc.
        c.execute("DELETE FROM users WHERE id = ?", (uid,))
    response.delete_cookie(SESSION_COOKIE, samesite="lax", secure=SECURE_COOKIE, httponly=True)
    return {"ok": True}


@app.post("/api/logout")
def logout(response: Response, apex_sess: Optional[str] = Cookie(default=None, alias=SESSION_COOKIE)):
    if apex_sess:
        with db() as c:
            c.execute("DELETE FROM sessions WHERE token = ?", (apex_sess,))
    # Match the original cookie attributes when deleting so Set-Cookie actually clears it.
    response.delete_cookie(SESSION_COOKIE, samesite="lax", secure=SECURE_COOKIE, httponly=True)
    return {"ok": True}


@app.get("/api/me")
def me(user: sqlite3.Row = Depends(require_user)):
    import backend.billing as _billing
    with db() as c:
        skus = _billing.active_skus(c, user["id"])
        tracks = sorted(_billing.allowed_tracks(c, user["id"]))
    return {
        "user": serialize_user(user),
        "progress": serialize_progress(user["id"]),
        "entitlements": skus,
        "allowedTracks": tracks,
    }


# ---------- Progress routes ----------

@app.post("/api/progress/lesson")
def complete_lesson(payload: CompleteLessonIn, user: sqlite3.Row = Depends(require_teen)):
    today = datetime.utcnow().date().isoformat()
    # Anti-skip enforcement per 16 TAC SS 84.501: the chapter cannot be marked
    # complete until the student has accumulated the curriculum minimum.
    # Source of truth is chapter_seconds (populated by /api/compliance/timer/tick).
    floor_min = _CURRICULUM_MINUTES.get(payload.lesson_id)
    if floor_min is not None:
        with db() as c:
            row = c.execute(
                "SELECT seconds FROM chapter_seconds WHERE user_id = ? AND chapter_id = ?",
                (user["id"], payload.lesson_id),
            ).fetchone()
        have_seconds = int(row["seconds"]) if row else 0
        if have_seconds < floor_min * 60:
            raise HTTPException(
                status_code=409,
                detail={
                    "error": "minutes_under_floor",
                    "required_seconds": floor_min * 60,
                    "have_seconds": have_seconds,
                },
            )
    with db() as c:
        c.execute(
            "INSERT OR IGNORE INTO completed_lessons (user_id, lesson_id, minutes) VALUES (?, ?, ?)",
            (user["id"], payload.lesson_id, payload.minutes),
        )
        c.execute(
            "INSERT INTO chapter_minutes (user_id, chapter_id, minutes) VALUES (?, ?, ?) "
            "ON CONFLICT(user_id, chapter_id) DO UPDATE SET minutes = minutes + excluded.minutes",
            (user["id"], payload.lesson_id, payload.minutes),
        )
        # XP + level + streak
        prev = c.execute("SELECT xp, level, streak, last_active_date FROM progress WHERE user_id = ?", (user["id"],)).fetchone()
        new_xp = prev["xp"] + payload.xp
        new_level = prev["level"]
        while new_xp >= new_level * 100:
            new_level += 1
        prev_day = prev["last_active_date"]
        if prev_day == today:
            new_streak = prev["streak"]
        elif prev_day == (datetime.utcnow().date() - timedelta(days=1)).isoformat():
            new_streak = prev["streak"] + 1
        else:
            new_streak = 1
        c.execute(
            "UPDATE progress SET xp = ?, level = ?, streak = ?, last_active_date = ? WHERE user_id = ?",
            (new_xp, new_level, new_streak, today, user["id"]),
        )
    return serialize_progress(user["id"])


# ---------- Game routes ----------

# Per-game score ceilings — defends against client-side score forging.
# A user submitting a 9999 score for "signs" gets clamped down server-side.
GAME_SCORE_CEILING = {"signs": 1500, "rightofway": 600, "hazard": 300}
# Cap how many XP-awarding game submissions a user can make per day.
_GAME_SUBMISSIONS_PER_DAY = 30

@app.post("/api/games/score")
def submit_game_score(payload: GameScoreIn, user: sqlite3.Row = Depends(require_teen)):
    today = datetime.utcnow().date().isoformat()
    # Clamp score to a sane ceiling for the game.
    ceiling = GAME_SCORE_CEILING.get(payload.game_id, 2000)
    score = max(0, min(payload.score, ceiling))
    with db() as c:
        # Throttle submission rate per user per day.
        today_count = c.execute(
            "SELECT COUNT(*) AS n FROM game_scores WHERE user_id = ? AND DATE(created_at) = ?",
            (user["id"], today),
        ).fetchone()["n"]
        if today_count >= _GAME_SUBMISSIONS_PER_DAY:
            raise HTTPException(status_code=429, detail="Too many game submissions today.")
        c.execute(
            "INSERT INTO game_scores (user_id, game_id, score, accuracy, duration_sec) VALUES (?, ?, ?, ?, ?)",
            (user["id"], payload.game_id, score, payload.accuracy, payload.duration_sec),
        )
        # XP = score/10 capped at 100/submission. Already validated, but re-clamp for safety.
        xp_award = max(0, min(100, score // 10))
        if xp_award:
            prev = c.execute("SELECT xp, level FROM progress WHERE user_id = ?", (user["id"],)).fetchone()
            new_xp = prev["xp"] + xp_award
            new_level = prev["level"]
            while new_xp >= new_level * 100:
                new_level += 1
            c.execute("UPDATE progress SET xp = ?, level = ? WHERE user_id = ?", (new_xp, new_level, user["id"]))
    return {"ok": True, "xp_awarded": xp_award, "progress": serialize_progress(user["id"])}


@app.get("/api/games/{game_id}/best")
def best_score(game_id: str, user: sqlite3.Row = Depends(require_user)):
    with db() as c:
        row = c.execute(
            "SELECT MAX(score) AS best, COUNT(*) AS plays FROM game_scores WHERE user_id = ? AND game_id = ?",
            (user["id"], game_id),
        ).fetchone()
    return {"best": row["best"] or 0, "plays": row["plays"] or 0}


# ---------- Cars ----------

@app.get("/api/cars")
def list_cars():
    return CAR_CATALOG


@app.get("/api/cars/owned")
def owned_cars(user: sqlite3.Row = Depends(require_user)):
    p = get_or_create_progress(user["id"])
    level = p["level"]
    with db() as c:
        s = c.execute("SELECT selected_car_id FROM user_settings WHERE user_id = ?", (user["id"],)).fetchone()
    selected = s["selected_car_id"] if s else "sedan-base"
    return {
        "level": level,
        "selected": selected,
        "cars": [{**car, "owned": level >= car["level"]} for car in CAR_CATALOG],
    }


@app.post("/api/cars/select")
def select_car(payload: CarSelectIn, user: sqlite3.Row = Depends(require_user)):
    car = CAR_BY_ID.get(payload.car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Unknown car")
    p = get_or_create_progress(user["id"])
    if p["level"] < car["level"]:
        raise HTTPException(status_code=403, detail=f"Locked — requires level {car['level']}")
    with db() as c:
        c.execute(
            "INSERT INTO user_settings (user_id, selected_car_id) VALUES (?, ?) "
            "ON CONFLICT(user_id) DO UPDATE SET selected_car_id = excluded.selected_car_id",
            (user["id"], payload.car_id),
        )
    return {"ok": True, "selected": payload.car_id}


# ---------- Drives ----------

_DRIVES_PER_DAY = 50

@app.post("/api/drives")
def log_drive(payload: DriveIn, user: sqlite3.Row = Depends(require_teen)):
    car = CAR_BY_ID.get(payload.car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Unknown car")
    today = datetime.utcnow().date().isoformat()
    # Sanity-check that checkpoints_hit can't exceed total
    hit = max(0, min(payload.checkpoints_hit, payload.checkpoints_total or payload.checkpoints_hit))
    with db() as c:
        # Daily submission cap — prevents XP farming via /api/drives spam
        today_count = c.execute(
            "SELECT COUNT(*) AS n FROM drives WHERE user_id = ? AND DATE(created_at) = ?",
            (user["id"], today),
        ).fetchone()["n"]
        if today_count >= _DRIVES_PER_DAY:
            raise HTTPException(status_code=429, detail="Too many drive submissions today.")
        c.execute(
            "INSERT INTO drives (user_id, scenario, car_id, duration_sec, distance_m, top_speed, "
            "checkpoints_hit, checkpoints_total, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (user["id"], payload.scenario, payload.car_id, payload.duration_sec, payload.distance_m,
             payload.top_speed, hit, payload.checkpoints_total, payload.score),
        )
        # XP = 10 per checkpoint hit + score/20, capped at 150 per submission
        xp_award = min(150, hit * 10 + (payload.score // 20))
        if xp_award:
            prev = c.execute("SELECT xp, level FROM progress WHERE user_id = ?", (user["id"],)).fetchone()
            new_xp = prev["xp"] + xp_award
            new_level = prev["level"]
            while new_xp >= new_level * 100:
                new_level += 1
            c.execute("UPDATE progress SET xp = ?, level = ? WHERE user_id = ?", (new_xp, new_level, user["id"]))
    return {"ok": True, "xp_awarded": xp_award, "progress": serialize_progress(user["id"])}


# ---------- Behind-the-wheel drive log (TX DE-964 / DE-964E) ----------

@app.post("/api/btw_drives")
def add_btw_drive(payload: BTWDriveIn, user: sqlite3.Row = Depends(require_parent)):
    gps_verified = 1 if (payload.gps_start_lat is not None and payload.gps_end_lat is not None) else 0
    with db() as c:
        cur = c.execute(
            "INSERT INTO btw_drives (user_id, date, start_time, end_time, duration_min, miles, is_night, weather, road_type, "
            "gps_start_lat, gps_start_lng, gps_end_lat, gps_end_lng, gps_verified, parent_name, parent_license, notes) "
            "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            (user["id"], payload.date, payload.start_time, payload.end_time,
             payload.duration_min, payload.miles, 1 if payload.is_night else 0,
             payload.weather, payload.road_type,
             payload.gps_start_lat, payload.gps_start_lng,
             payload.gps_end_lat, payload.gps_end_lng,
             gps_verified, payload.parent_name, payload.parent_license, payload.notes),
        )
    return {"ok": True, "id": cur.lastrowid, "gps_verified": bool(gps_verified)}


def _btw_summary(user_id: int) -> dict[str, Any]:
    with db() as c:
        rows = c.execute(
            "SELECT * FROM btw_drives WHERE user_id = ? ORDER BY date DESC, id DESC", (user_id,)
        ).fetchall()
    drives = [dict(r) for r in rows]
    total_min = sum(d["duration_min"] or 0 for d in drives)
    night_min = sum(d["duration_min"] or 0 for d in drives if d["is_night"])
    miles = sum(d["miles"] or 0 for d in drives)
    return {
        "drives": drives,
        "total_min": total_min,
        "total_hours": round(total_min / 60.0, 2),
        "night_min": night_min,
        "night_hours": round(night_min / 60.0, 2),
        "miles": round(miles, 1),
        # TX DE-964 requirement: 30 hours BTW total + 10 night
        "required_hours": 30,
        "required_night_hours": 10,
        "verified_count": sum(1 for d in drives if d["gps_verified"]),
    }


@app.get("/api/btw_drives")
def list_btw_drives(user: sqlite3.Row = Depends(require_user)):
    return _btw_summary(user["id"])


@app.delete("/api/btw_drives/{drive_id}")
def delete_btw_drive(drive_id: int, user: sqlite3.Row = Depends(require_user)):
    with db() as c:
        c.execute("DELETE FROM btw_drives WHERE id = ? AND user_id = ?", (drive_id, user["id"]))
    return {"ok": True}


@app.get("/api/btw_drives/export")
def export_btw_csv(user: sqlite3.Row = Depends(require_user)):
    """CSV in TX DE-964 / DE-964E-compatible columns. Parent prints, signs, hands to DPS."""
    summary = _btw_summary(user["id"])
    user_name = user["name"] or user["email"].split("@")[0]
    lines = [
        f"# TX TDLR Behind-the-Wheel Drive Log · DE-964 export",
        f"# Student,{user_name}",
        f"# Generated,{datetime.utcnow().isoformat()}",
        f"# Total hours,{summary['total_hours']} of {summary['required_hours']} required",
        f"# Night hours,{summary['night_hours']} of {summary['required_night_hours']} required",
        f"# GPS-verified entries,{summary['verified_count']} of {len(summary['drives'])}",
        "",
        "Date,Start,End,Duration (min),Miles,Day/Night,Weather,Road type,GPS verified,Parent name,Parent license,Notes",
    ]
    for d in summary["drives"]:
        # CSV-escape any commas / quotes in user-entered fields
        def esc(v):
            if v is None: return ""
            s = str(v)
            if any(c in s for c in [',', '"', '\n']):
                s = '"' + s.replace('"', '""') + '"'
            return s
        lines.append(",".join([
            esc(d["date"]),
            esc(d["start_time"]),
            esc(d["end_time"]),
            str(d["duration_min"] or 0),
            f"{d['miles'] or 0:.1f}",
            "Night" if d["is_night"] else "Day",
            esc(d["weather"]),
            esc(d["road_type"]),
            "Yes" if d["gps_verified"] else "No",
            esc(d["parent_name"]),
            esc(d["parent_license"]),
            esc(d["notes"]),
        ]))
    csv = "\n".join(lines) + "\n"
    headers = {"Content-Disposition": f"attachment; filename=\"apex-de964-{user_name}.csv\""}
    return Response(content=csv, media_type="text/csv", headers=headers)


# ---------- Shorts ----------

@app.post("/api/shorts/watched")
def watch_short(payload: ShortWatchedIn, user: sqlite3.Row = Depends(require_user)):
    today = datetime.utcnow().date().isoformat()
    awarded = 0
    with db() as c:
        existing = c.execute(
            "SELECT 1 FROM shorts_watched WHERE user_id = ? AND short_id = ?",
            (user["id"], payload.short_id),
        ).fetchone()
        first_watch = existing is None
        c.execute(
            "INSERT OR IGNORE INTO shorts_watched (user_id, short_id) VALUES (?, ?)",
            (user["id"], payload.short_id),
        )
        if first_watch:
            # Cap XP from shorts at 50/day to prevent farming.
            today_count = c.execute(
                "SELECT COUNT(*) AS n FROM shorts_watched WHERE user_id = ? AND DATE(completed_at) = ?",
                (user["id"], today),
            ).fetchone()["n"]
            if today_count <= 10:
                awarded = 5
                prev = c.execute("SELECT xp, level FROM progress WHERE user_id = ?", (user["id"],)).fetchone()
                new_xp = prev["xp"] + awarded
                new_level = prev["level"]
                while new_xp >= new_level * 100:
                    new_level += 1
                c.execute("UPDATE progress SET xp = ?, level = ? WHERE user_id = ?", (new_xp, new_level, user["id"]))
    return {"ok": True, "first_watch": first_watch, "xp_awarded": awarded, "progress": serialize_progress(user["id"])}


@app.get("/api/shorts/watched")
def list_watched_shorts(user: sqlite3.Row = Depends(require_user)):
    with db() as c:
        rows = c.execute(
            "SELECT short_id FROM shorts_watched WHERE user_id = ? ORDER BY completed_at DESC",
            (user["id"],),
        ).fetchall()
    return [r["short_id"] for r in rows]


@app.get("/api/drives/recent")
def recent_drives(user: sqlite3.Row = Depends(require_user), limit: int = 10):
    with db() as c:
        rows = c.execute(
            "SELECT scenario, car_id, duration_sec, distance_m, top_speed, "
            "checkpoints_hit, checkpoints_total, score, created_at "
            "FROM drives WHERE user_id = ? ORDER BY created_at DESC LIMIT ?",
            (user["id"], limit),
        ).fetchall()
    return [dict(r) for r in rows]


@app.get("/api/leaderboard")
def leaderboard(game_id: Optional[str] = None, limit: int = 10):
    with db() as c:
        if game_id:
            rows = c.execute(
                "SELECT u.name, u.email, MAX(g.score) AS best "
                "FROM game_scores g JOIN users u ON u.id = g.user_id "
                "WHERE g.game_id = ? GROUP BY g.user_id ORDER BY best DESC LIMIT ?",
                (game_id, limit),
            ).fetchall()
        else:
            rows = c.execute(
                "SELECT u.name, u.email, p.xp AS best "
                "FROM progress p JOIN users u ON u.id = p.user_id "
                "ORDER BY p.xp DESC LIMIT ?",
                (limit,),
            ).fetchall()
    return [{"name": r["name"] or r["email"].split("@")[0], "score": r["best"]} for r in rows]


# ---------- Topic progress ----------
# Mirror of the localStorage `apex_topic_progress` per user. Topic IDs are
# the chapter ids (1.1 .. 10.3); we don't enforce a closed enum here so that
# adding a new topic doesn't require a migration. We DO clamp scores and
# require auth — clients can't pretend to be other users.

import json as _json

_TOPIC_ID_RX = __import__("re").compile(r"^\d{1,2}\.\d{1,2}$")


def _topic_row(user_id: int, topic_id: str) -> Optional[sqlite3.Row]:
    with db() as c:
        return c.execute(
            "SELECT * FROM topic_progress WHERE user_id = ? AND topic_id = ?",
            (user_id, topic_id),
        ).fetchone()


def _topic_to_dict(r: sqlite3.Row) -> dict[str, Any]:
    if not r:
        return {}
    try:
        watched = _json.loads(r["shorts_watched"] or "[]")
    except Exception:
        watched = []
    return {
        "topic_id":       r["topic_id"],
        "shorts_watched": watched,
        "article_read":   bool(r["article_read"]),
        "quiz_score":     float(r["quiz_score"] or 0),
        "game_score":     int(r["game_score"] or 0),
        "drive_done":     bool(r["drive_done"]),
        "completed":      bool(r["completed"]),
    }


@app.get("/api/topics/progress")
def all_topic_progress(user: sqlite3.Row = Depends(require_user)):
    with db() as c:
        rows = c.execute(
            "SELECT * FROM topic_progress WHERE user_id = ?",
            (user["id"],),
        ).fetchall()
    return {r["topic_id"]: _topic_to_dict(r) for r in rows}


@app.get("/api/topics/{topic_id}/progress")
def get_topic_progress(topic_id: str, user: sqlite3.Row = Depends(require_user)):
    if not _TOPIC_ID_RX.match(topic_id):
        raise HTTPException(status_code=400, detail="Invalid topic id")
    return _topic_to_dict(_topic_row(user["id"], topic_id))


@app.post("/api/topics/{topic_id}/progress")
def update_topic_progress(
    topic_id: str,
    payload: TopicProgressIn,
    user: sqlite3.Row = Depends(require_teen),
):
    """Merge an asset-completion update for one topic.

    The server clamps numeric scores and refuses to mark a later step done
    without the prior step having a passing value already on record.
    """
    if not _TOPIC_ID_RX.match(topic_id):
        raise HTTPException(status_code=400, detail="Invalid topic id")
    _check_rate_limit(__import__("starlette").requests.Request(scope={"type": "http"}), "topic_progress") if False else None  # noop
    with db() as c:
        row = c.execute(
            "SELECT * FROM topic_progress WHERE user_id = ? AND topic_id = ?",
            (user["id"], topic_id),
        ).fetchone()
        watched = []
        article_read = False
        quiz_score = 0.0
        game_score = 0
        drive_done = False
        if row:
            try: watched = _json.loads(row["shorts_watched"] or "[]")
            except Exception: watched = []
            article_read = bool(row["article_read"])
            quiz_score = float(row["quiz_score"] or 0)
            game_score = int(row["game_score"] or 0)
            drive_done = bool(row["drive_done"])

        # Apply incoming fields
        if payload.short_id and payload.short_id not in watched:
            # cap watched list at 50 ids per topic
            if len(watched) < 50:
                watched.append(payload.short_id)
        if payload.article_read is True:
            article_read = True
        if payload.quiz_score is not None:
            quiz_score = max(quiz_score, float(payload.quiz_score))  # only ratchet up
        if payload.game_score is not None:
            # clamp at the same ceiling we use for game scores
            game_score = max(game_score, max(0, min(int(payload.game_score), 100_000)))
        if payload.drive_done is True:
            # Gate check: TDLR mastery is 70%, set in compliance/mastery.py.
            if not passes_mastery(quiz_score):
                raise HTTPException(
                    status_code=409,
                    detail=f"Quiz must reach {int(MASTERY_THRESHOLD * 100)}% before drive can complete.",
                )
            drive_done = True

        completed = (
            article_read and passes_mastery(quiz_score)
            # game/drive optional per topic - completion is tracked client-side
        )

        c.execute(
            "INSERT INTO topic_progress (user_id, topic_id, shorts_watched, article_read, quiz_score, game_score, drive_done, completed, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) "
            "ON CONFLICT(user_id, topic_id) DO UPDATE SET "
            "  shorts_watched = excluded.shorts_watched, "
            "  article_read   = excluded.article_read, "
            "  quiz_score     = excluded.quiz_score, "
            "  game_score     = excluded.game_score, "
            "  drive_done     = excluded.drive_done, "
            "  completed      = excluded.completed, "
            "  updated_at     = excluded.updated_at",
            (
                user["id"], topic_id,
                _json.dumps(watched),
                1 if article_read else 0,
                quiz_score, game_score,
                1 if drive_done else 0,
                1 if completed else 0,
                datetime.utcnow().isoformat(),
            ),
        )

    return _topic_to_dict(_topic_row(user["id"], topic_id))


# ---------- Static frontend ----------

@app.get("/api/health")
def health():
    return {"status": "ok", "ts": int(time.time())}


# ---------- Compliance engine routers ----------
# Mounted AFTER all helpers (`db`, `require_user`, etc.) are defined and BEFORE
# the static-files catch-all so /api/compliance/* resolves to the routers.
from backend.compliance.config import router as compliance_config_router
from backend.compliance import audit as compliance_audit
from backend.compliance import timer as compliance_timer
from backend.compliance import identity as compliance_identity
from backend.compliance import multimedia as compliance_multimedia
from backend.compliance import lockouts as compliance_lockouts
from backend.compliance import spacedrep as compliance_spacedrep
import backend.billing as billing
app.include_router(compliance_config_router)
compliance_audit.bind_routes(require_user, db)
compliance_timer.bind_routes(require_user, db)
compliance_identity.bind_routes(require_user, db)
compliance_multimedia.bind_routes(require_user, db)
compliance_multimedia.bind_debug_routes(require_user, db)
compliance_lockouts.bind_routes(require_user, require_admin, db)
compliance_lockouts.bind_debug_routes(require_user, db)
compliance_spacedrep.bind_routes(require_user, db)
billing.bind_routes(require_user, db)
app.include_router(compliance_audit.router)
app.include_router(compliance_timer.router)
app.include_router(compliance_identity.router)
app.include_router(compliance_multimedia.router)
app.include_router(compliance_multimedia.debug_router)
app.include_router(compliance_lockouts.router)
app.include_router(compliance_lockouts.admin_router)
app.include_router(compliance_lockouts.debug_router)
app.include_router(compliance_spacedrep.router)
app.include_router(billing.router)

# Lockout middleware: returns 423 on non-allowlisted routes when user has open lockout.
app.middleware("http")(compliance_lockouts.make_lockout_middleware(db, session_user, SESSION_COOKIE))


# Mount the static frontend AFTER the API routes are defined.
app.mount("/", StaticFiles(directory=str(STATIC_DIR), html=True), name="static")
