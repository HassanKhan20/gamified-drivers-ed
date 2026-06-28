"""Subsystem 6 - lockout state machine per 16 TAC SS 84.501.

At most one open lockout per user. Opened automatically by identity-validation
threshold breach (in identity.py) or clip-gate second failure (in multimedia.py).
Closed via the admin endpoint.

While a user has an open lockout, the middleware returns 423 Locked on every
API call except an allowlist (their own status, admin routes, logout, health).
"""
from __future__ import annotations

import sqlite3
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field

from backend.compliance.audit import log_event

router = APIRouter(prefix="/api/compliance/lockouts")
admin_router = APIRouter(prefix="/api/admin")
debug_router = APIRouter(prefix="/api/compliance/_debug")

LOCKOUT_ALLOWLIST_PREFIXES = (
    "/api/me",
    "/api/logout",
    "/api/compliance/lockouts/me",
    "/api/admin/",
    "/api/health",
    "/api/compliance/config",
    "/api/compliance/_debug/",
)


def init_lockouts_schema(db: sqlite3.Connection) -> None:
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS lockouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            reason TEXT NOT NULL,
            opened_at TEXT DEFAULT CURRENT_TIMESTAMP,
            closed_at TEXT,
            closed_by TEXT,
            notes TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_lockouts_user ON lockouts(user_id);
        """
    )


def open_lockout(db: sqlite3.Connection, user_id: int, reason: str) -> Optional[int]:
    """Open a lockout for user_id if none is currently open. Returns new id or None."""
    existing = db.execute(
        "SELECT id FROM lockouts WHERE user_id = ? AND closed_at IS NULL",
        (user_id,),
    ).fetchone()
    if existing:
        return None
    cur = db.execute(
        "INSERT INTO lockouts (user_id, reason) VALUES (?, ?)",
        (user_id, reason),
    )
    log_event(db, user_id, "lockout_opened", None, {"reason": reason, "lockout_id": cur.lastrowid})
    return cur.lastrowid


def current_lockout(db: sqlite3.Connection, user_id: int) -> Optional[sqlite3.Row]:
    return db.execute(
        "SELECT * FROM lockouts WHERE user_id = ? AND closed_at IS NULL "
        "ORDER BY opened_at DESC LIMIT 1",
        (user_id,),
    ).fetchone()


class CloseLockoutIn(BaseModel):
    notes: Optional[str] = Field(default=None, max_length=500)


class OpenDebugIn(BaseModel):
    reason: str = Field(default="manual", max_length=80)


def bind_routes(require_user, require_admin, db_factory):

    @router.get("/me")
    def my_lockout(user=Depends(require_user)):
        with db_factory() as c:
            row = current_lockout(c, user["id"])
        if not row:
            return {"open": False}
        return {
            "open": True,
            "id": row["id"],
            "reason": row["reason"],
            "opened_at": row["opened_at"],
        }

    @admin_router.get("/lockouts")
    def list_open_lockouts(admin=Depends(require_admin)):
        with db_factory() as c:
            rows = c.execute(
                "SELECT l.*, u.email FROM lockouts l JOIN users u ON u.id = l.user_id "
                "WHERE l.closed_at IS NULL ORDER BY l.opened_at DESC"
            ).fetchall()
        return [{
            "id": r["id"],
            "user_id": r["user_id"],
            "email": r["email"],
            "reason": r["reason"],
            "opened_at": r["opened_at"],
        } for r in rows]

    @admin_router.post("/lockouts/{lockout_id}/close")
    def close_lockout(lockout_id: int, payload: CloseLockoutIn, admin=Depends(require_admin)):
        with db_factory() as c:
            row = c.execute("SELECT * FROM lockouts WHERE id = ?", (lockout_id,)).fetchone()
            if not row:
                raise HTTPException(404, "Lockout not found")
            if row["closed_at"]:
                raise HTTPException(409, "Already closed")
            c.execute(
                "UPDATE lockouts SET closed_at = ?, closed_by = ?, notes = ? WHERE id = ?",
                (datetime.utcnow().isoformat(), admin["email"], payload.notes, lockout_id),
            )
            log_event(c, row["user_id"], "lockout_closed", None,
                      {"lockout_id": lockout_id, "closed_by": admin["email"]})
        return {"ok": True}


def bind_debug_routes(require_user, db_factory):

    @debug_router.post("/open_lockout")
    def debug_open(payload: OpenDebugIn, user=Depends(require_user)):
        with db_factory() as c:
            lid = open_lockout(c, user["id"], payload.reason)
        return {"ok": True, "lockout_id": lid}

    @debug_router.post("/set_admin")
    def debug_set_admin(user=Depends(require_user)):
        with db_factory() as c:
            c.execute("UPDATE users SET role = 'admin' WHERE id = ?", (user["id"],))
        return {"ok": True}


def make_lockout_middleware(db_factory, session_user_fn, SESSION_COOKIE):
    """Returns a starlette-compatible middleware that 423s locked-out users
    on non-allowlisted routes.
    """
    from starlette.responses import JSONResponse

    async def lockout_middleware(request: Request, call_next):
        path = request.url.path
        if any(path.startswith(p) for p in LOCKOUT_ALLOWLIST_PREFIXES):
            return await call_next(request)
        if not path.startswith("/api/"):
            return await call_next(request)
        token = request.cookies.get(SESSION_COOKIE)
        user = session_user_fn(token) if token else None
        if user:
            with db_factory() as c:
                row = current_lockout(c, user["id"])
            if row:
                return JSONResponse(
                    status_code=423,
                    content={"detail": {"reason": row["reason"], "lockout_id": row["id"]}},
                )
        return await call_next(request)

    return lockout_middleware
