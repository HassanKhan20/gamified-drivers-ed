# TDLR AMI Compliance Engine — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make APEX structurally compatible with 16 TAC §84.501 (Texas online driver-education AMI rule) by building 7 compliance subsystems without rewriting the curriculum.

**Architecture:** Add a `backend/compliance/` Python package containing identity validation, multimedia comprehension gates, anti-skip timer enforcement, mastery threshold, audit event log, lockout/intervention, and operating-hours soft enforcement. Frontend gets a parallel `frontend/scripts/compliance/` module set that wires these into every authenticated page. Existing `main.py` stays monolithic; compliance routers are included from it. SQLite schema additions are tolerant of pre-existing DBs via `try/except` on `ALTER TABLE`.

**Tech Stack:** FastAPI, SQLite, pydantic, Python 3.10+, vanilla ES modules, pytest + httpx for tests.

**Spec:** `docs/superpowers/specs/2026-05-11-tdlr-ami-compliance-engine-design.md`

---

## File map

**Create:**
- `backend/compliance/__init__.py`
- `backend/compliance/config.py` — `/api/compliance/config` router
- `backend/compliance/audit.py` — `audit_events` schema + `log_event()` helper
- `backend/compliance/mastery.py` — `passes_mastery()` + `MASTERY_THRESHOLD = 0.70`
- `backend/compliance/timer.py` — `/api/compliance/timer/tick`, `/api/compliance/timer/event` routers + curriculum-minutes loader
- `backend/compliance/identity.py` — `identity_questions` + `identity_challenges` schemas + 3 routers
- `backend/compliance/multimedia.py` — clip schemas + 2 routers
- `backend/compliance/lockouts.py` — lockout schema + middleware + admin routers
- `backend/compliance/hours.py` — pure helper (no router)
- `backend/compliance/curriculum_minutes.json` — generated artifact
- `scripts/sync_curriculum_minutes.py` — regex parser that emits the JSON above
- `backend/tests/__init__.py`
- `backend/tests/conftest.py` — pytest fixtures (client, fresh DB)
- `backend/tests/test_mastery.py`
- `backend/tests/test_timer.py`
- `backend/tests/test_identity.py`
- `backend/tests/test_multimedia.py`
- `backend/tests/test_lockouts.py`
- `backend/tests/test_audit.py`
- `backend/tests/test_progress_min_minutes.py`
- `frontend/scripts/compliance/config.js`
- `frontend/scripts/compliance/timer.js`
- `frontend/scripts/compliance/tamper.js`
- `frontend/scripts/compliance/identity.js`
- `frontend/scripts/compliance/clip-gate.js`
- `frontend/scripts/compliance/lockout.js`
- `frontend/scripts/compliance/hours-banner.js`
- `frontend/identity-setup.html`
- `frontend/admin-lockouts.html`

**Modify:**
- `backend/main.py` — include compliance routers; replace 0.66 with `passes_mastery()`; add lockout middleware; env-based DB path
- `backend/admin_unlock.py` — convert to CLI granting `role='admin'`
- `backend/requirements.txt` — add `pytest`, `httpx`
- `frontend/scripts/curriculum.js` — verify each chapter has `minutes` field (already does)
- `frontend/scripts/app.js` — load compliance config + bootstrap compliance scripts
- `frontend/lesson.html`, `frontend/topic.html`, `frontend/drive.html`, `frontend/dashboard.html`, `frontend/roadmap.html` — `<script type="module" src="scripts/compliance/...">` includes
- `frontend/signup.html` — redirect to `identity-setup.html` on successful signup
- `frontend/dmv-test.html` — bump pass threshold via shared config
- `README.md` — document compliance subsystems

---

## Phase 0 — Foundation (test infra, compliance package, audit log)

### Task 1: Test infrastructure + env-overridable DB path

**Files:**
- Modify: `backend/requirements.txt`
- Modify: `backend/main.py` (DB_PATH constant only)
- Create: `backend/tests/__init__.py`
- Create: `backend/tests/conftest.py`
- Create: `backend/tests/test_health.py`

- [ ] **Step 1: Add pytest + httpx to requirements**

Modify `backend/requirements.txt` to add two lines:

```
pytest>=8.0
httpx>=0.27
```

- [ ] **Step 2: Make DB path overridable via env var**

In `backend/main.py`, replace the line:

```python
DB_PATH = ROOT / "backend" / "apex.db"
```

with:

```python
DB_PATH = Path(os.environ.get("APEX_DB_PATH", str(ROOT / "backend" / "apex.db")))
```

- [ ] **Step 3: Create `backend/tests/__init__.py`**

Write to `backend/tests/__init__.py`:

```python
# Marker file for pytest to discover tests
```

- [ ] **Step 4: Create `backend/tests/conftest.py`**

Write to `backend/tests/conftest.py`:

```python
"""Pytest fixtures for APEX backend tests.

Each test runs against a fresh SQLite DB at a tmp_path, no shared state.
Uses FastAPI's TestClient for HTTP-level testing.
"""
import os
import importlib
import sys
from pathlib import Path

import pytest


@pytest.fixture
def client(tmp_path, monkeypatch):
    """Fresh TestClient with an isolated SQLite file per test."""
    db_path = tmp_path / "test_apex.db"
    monkeypatch.setenv("APEX_DB_PATH", str(db_path))

    # Force-reload main so init_db() runs against the new path
    for mod_name in list(sys.modules):
        if mod_name == "backend.main" or mod_name.startswith("backend.compliance"):
            del sys.modules[mod_name]

    from fastapi.testclient import TestClient
    from backend import main as main_module
    importlib.reload(main_module)
    return TestClient(main_module.app)


@pytest.fixture
def signed_up_client(client):
    """A client that has signed up a teen user and is logged in via session cookie."""
    r = client.post("/api/signup", json={
        "email": "teen@example.com",
        "password": "correcthorse1",
        "name": "Test Teen",
        "role": "teen",
        "language": "en",
    })
    assert r.status_code == 200, r.text
    return client
```

- [ ] **Step 5: Create a smoke test that proves the fixtures work**

Write to `backend/tests/test_health.py`:

```python
def test_health_endpoint(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "ok"


def test_signed_up_fixture_yields_authenticated_session(signed_up_client):
    r = signed_up_client.get("/api/me")
    assert r.status_code == 200
    assert r.json()["user"]["email"] == "teen@example.com"
```

- [ ] **Step 6: Install + run**

Run from project root:

```bash
pip install -r backend/requirements.txt
pytest backend/tests/test_health.py -v
```

Expected: 2 passed.

- [ ] **Step 7: Commit**

```bash
git add backend/requirements.txt backend/main.py backend/tests/
git commit -m "test: add pytest + httpx infra with env-overridable DB path"
```

---

### Task 2: Compliance package skeleton + config endpoint

**Files:**
- Create: `backend/compliance/__init__.py`
- Create: `backend/compliance/config.py`
- Modify: `backend/main.py` (include router)
- Create: `backend/tests/test_compliance_config.py`

- [ ] **Step 1: Write the failing test**

Write to `backend/tests/test_compliance_config.py`:

```python
def test_compliance_config_returns_thresholds(client):
    r = client.get("/api/compliance/config")
    assert r.status_code == 200
    body = r.json()
    assert body["mastery_threshold"] == 0.70
    assert body["identity_response_seconds"] == 90
    assert body["identity_warmup_min_total"] == 10
    assert body["identity_wrong_rate_lockout"] == 0.30
    assert body["multimedia_gate_min_seconds"] == 180
    assert body["timer_idle_pause_seconds"] == 60
    assert body["operating_hours_local"] == {"start_hour": 5, "end_hour": 23}
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_compliance_config.py -v
```

Expected: `404 Not Found` on the GET — fails because the route doesn't exist.

- [ ] **Step 3: Create the compliance package**

Write to `backend/compliance/__init__.py`:

```python
# APEX compliance engine — TDLR AMI rule §84.501 implementation
```

Write to `backend/compliance/config.py`:

```python
"""Compliance config endpoint — single source of truth for thresholds and windows.

The frontend fetches this once on boot and caches it in window.APEX_COMPLIANCE_CONFIG.
Backend code imports the constants directly.
"""
from fastapi import APIRouter

# --- Constants exported to backend code ---
MASTERY_THRESHOLD = 0.70                  # 16 TAC POI-DE; §84.502 adult
IDENTITY_RESPONSE_SECONDS = 90            # §84.501 personal-validation window
IDENTITY_WARMUP_MIN_TOTAL = 10            # don't lock out before this many challenges
IDENTITY_WRONG_RATE_LOCKOUT = 0.30        # §84.501 30% wrong → lockout
MULTIMEDIA_GATE_MIN_SECONDS = 180         # §84.501 clip >180s requires Q
TIMER_IDLE_PAUSE_SECONDS = 60             # tab-blur / no-input pause threshold
OPERATING_HOURS_START = 5                 # §84.600 5 a.m. local
OPERATING_HOURS_END = 23                  # §84.600 11 p.m. local

router = APIRouter(prefix="/api/compliance")


@router.get("/config")
def get_config():
    """Public — no auth required. Used to seed frontend constants."""
    return {
        "mastery_threshold": MASTERY_THRESHOLD,
        "identity_response_seconds": IDENTITY_RESPONSE_SECONDS,
        "identity_warmup_min_total": IDENTITY_WARMUP_MIN_TOTAL,
        "identity_wrong_rate_lockout": IDENTITY_WRONG_RATE_LOCKOUT,
        "multimedia_gate_min_seconds": MULTIMEDIA_GATE_MIN_SECONDS,
        "timer_idle_pause_seconds": TIMER_IDLE_PAUSE_SECONDS,
        "operating_hours_local": {
            "start_hour": OPERATING_HOURS_START,
            "end_hour": OPERATING_HOURS_END,
        },
    }
```

- [ ] **Step 4: Wire the router into main.py**

In `backend/main.py`, after the `app = FastAPI(...)` line and the CORS middleware block, add:

```python
from backend.compliance.config import router as compliance_config_router
app.include_router(compliance_config_router)
```

Place this BEFORE `app.mount("/", StaticFiles(...))` at the bottom (mount is last). The `from backend.compliance...` import can go near the top with the other imports.

- [ ] **Step 5: Run, expect pass**

```bash
pytest backend/tests/test_compliance_config.py -v
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/compliance/ backend/main.py backend/tests/test_compliance_config.py
git commit -m "feat(compliance): add compliance package + /api/compliance/config endpoint"
```

---

### Task 3: Audit event log

**Files:**
- Create: `backend/compliance/audit.py`
- Modify: `backend/main.py` (call audit init from init_db)
- Create: `backend/tests/test_audit.py`

- [ ] **Step 1: Write the failing test**

Write to `backend/tests/test_audit.py`:

```python
def test_audit_log_writes_row(signed_up_client):
    # Trigger an audit log write by hitting an endpoint that produces one.
    # We use a direct POST to a debug endpoint added in this task.
    r = signed_up_client.post("/api/compliance/_debug/log", json={
        "event_type": "test_event",
        "lesson_id": "1.1",
        "payload": {"hello": "world"},
    })
    assert r.status_code == 200
    event_id = r.json()["id"]

    r2 = signed_up_client.get(f"/api/compliance/_debug/audit?event_id={event_id}")
    assert r2.status_code == 200
    row = r2.json()
    assert row["event_type"] == "test_event"
    assert row["lesson_id"] == "1.1"
    assert row["payload"] == {"hello": "world"}
    assert row["retain_until"]  # populated
    assert row["user_id"] > 0
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_audit.py -v
```

Expected: 404 on `/api/compliance/_debug/log`.

- [ ] **Step 3: Write the audit module**

Write to `backend/compliance/audit.py`:

```python
"""Append-only audit event log — subsystem 5 of the AMI compliance engine.

Schema is created on import via init_audit_schema() called from main.init_db().
Retention is 3 years per 16 TAC §84.81.
"""
from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timedelta
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

RETENTION_DAYS = 365 * 3


def init_audit_schema(db: sqlite3.Connection) -> None:
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS audit_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            event_type TEXT NOT NULL,
            lesson_id TEXT,
            payload_json TEXT,
            occurred_at TEXT DEFAULT CURRENT_TIMESTAMP,
            retain_until TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_audit_user_time ON audit_events(user_id, occurred_at);
        CREATE INDEX IF NOT EXISTS idx_audit_type ON audit_events(event_type);
        """
    )


def log_event(
    db: sqlite3.Connection,
    user_id: int,
    event_type: str,
    lesson_id: Optional[str] = None,
    payload: Optional[dict[str, Any]] = None,
) -> int:
    """Append one row to audit_events. Returns the new row id."""
    retain_until = (datetime.utcnow() + timedelta(days=RETENTION_DAYS)).isoformat()
    payload_json = json.dumps(payload) if payload is not None else None
    cur = db.execute(
        "INSERT INTO audit_events (user_id, event_type, lesson_id, payload_json, retain_until) "
        "VALUES (?, ?, ?, ?, ?)",
        (user_id, event_type, lesson_id, payload_json, retain_until),
    )
    return cur.lastrowid


# --- Debug endpoints (used by tests; safe to leave in since they require auth) ---

router = APIRouter(prefix="/api/compliance/_debug")


class LogIn(BaseModel):
    event_type: str
    lesson_id: Optional[str] = None
    payload: Optional[dict[str, Any]] = None


def _serialize_event(row: sqlite3.Row) -> dict[str, Any]:
    return {
        "id": row["id"],
        "user_id": row["user_id"],
        "event_type": row["event_type"],
        "lesson_id": row["lesson_id"],
        "payload": json.loads(row["payload_json"]) if row["payload_json"] else None,
        "occurred_at": row["occurred_at"],
        "retain_until": row["retain_until"],
    }


def _bind_routes(require_user, db_factory):
    """Bind require_user dep + db factory at registration time to avoid circular imports."""

    @router.post("/log")
    def debug_log(payload: LogIn, user=Depends(require_user)):
        with db_factory() as c:
            event_id = log_event(c, user["id"], payload.event_type, payload.lesson_id, payload.payload)
        return {"id": event_id}

    @router.get("/audit")
    def debug_get_event(event_id: int, user=Depends(require_user)):
        with db_factory() as c:
            row = c.execute("SELECT * FROM audit_events WHERE id = ? AND user_id = ?", (event_id, user["id"])).fetchone()
        if not row:
            raise HTTPException(404, "Not found")
        return _serialize_event(row)
```

- [ ] **Step 4: Wire audit init + routes into main.py**

In `backend/main.py`:

(a) Add import near the top with other imports:

```python
from backend.compliance import audit as compliance_audit
```

(b) At the end of `init_db()` function body (before the function returns), add:

```python
        compliance_audit.init_audit_schema(c)
```

(c) After `app.include_router(compliance_config_router)` add:

```python
compliance_audit._bind_routes(require_user, db)
app.include_router(compliance_audit.router)
```

(There's a chicken-and-egg with `require_user` being defined later in main.py — move the include block to BELOW the definition of `require_user`. The right place is just before the static mount.)

- [ ] **Step 5: Run, expect pass**

```bash
pytest backend/tests/test_audit.py backend/tests/test_compliance_config.py backend/tests/test_health.py -v
```

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/compliance/audit.py backend/main.py backend/tests/test_audit.py
git commit -m "feat(compliance): add audit_events append-only log + log_event helper"
```

---

## Phase 1 — Mastery threshold (0.66 → 0.70)

### Task 4: Mastery helper + flip topic-progress gate

**Files:**
- Create: `backend/compliance/mastery.py`
- Modify: `backend/main.py` (`update_topic_progress` function only)
- Create: `backend/tests/test_mastery.py`

- [ ] **Step 1: Write the failing test**

Write to `backend/tests/test_mastery.py`:

```python
import pytest

from backend.compliance.mastery import passes_mastery, MASTERY_THRESHOLD


def test_mastery_threshold_is_seventy_percent():
    assert MASTERY_THRESHOLD == 0.70


@pytest.mark.parametrize("score,expected", [
    (0.69, False),
    (0.70, True),
    (0.71, True),
    (1.00, True),
    (0.00, False),
])
def test_passes_mastery_ratio(score, expected):
    assert passes_mastery(score) is expected


def test_passes_mastery_counts():
    # 6 of 8 = 0.75 → pass
    assert passes_mastery_counts(6, 8) is True
    # 5 of 8 = 0.625 → fail
    assert passes_mastery_counts(5, 8) is False
    # exactly 7/10 = 0.70 → pass
    assert passes_mastery_counts(7, 10) is True


def test_topic_drive_done_requires_70_percent_quiz(signed_up_client):
    # Submit quiz_score = 0.66 then try to mark drive done — should be 409
    r = signed_up_client.post("/api/topics/1.1/progress", json={"quiz_score": 0.66})
    assert r.status_code == 200

    r2 = signed_up_client.post("/api/topics/1.1/progress", json={"drive_done": True})
    assert r2.status_code == 409, r2.text

    # Now boost quiz_score to 0.70 and retry
    r3 = signed_up_client.post("/api/topics/1.1/progress", json={"quiz_score": 0.70})
    assert r3.status_code == 200

    r4 = signed_up_client.post("/api/topics/1.1/progress", json={"drive_done": True})
    assert r4.status_code == 200, r4.text
    assert r4.json()["drive_done"] is True


# Import passes_mastery_counts up top once defined
from backend.compliance.mastery import passes_mastery_counts  # noqa: E402
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_mastery.py -v
```

Expected: ImportError on `passes_mastery_counts` (or all assertions fail).

- [ ] **Step 3: Write the mastery module**

Write to `backend/compliance/mastery.py`:

```python
"""Mastery threshold — single source of truth for "what counts as passing"
under 16 TAC POI-DE / §84.502.
"""

MASTERY_THRESHOLD = 0.70


def passes_mastery(ratio: float) -> bool:
    """ratio in [0.0, 1.0]. Returns True iff ratio >= MASTERY_THRESHOLD."""
    return ratio >= MASTERY_THRESHOLD


def passes_mastery_counts(correct: int, total: int) -> bool:
    """correct + total integers. Returns False on total==0."""
    if total <= 0:
        return False
    return (correct / total) >= MASTERY_THRESHOLD
```

- [ ] **Step 4: Flip the topic-progress gate in main.py**

In `backend/main.py`, function `update_topic_progress`, find both occurrences of `0.66` and replace with the threshold import. At the top of the function (or in the imports block), add:

```python
from backend.compliance.mastery import MASTERY_THRESHOLD, passes_mastery
```

Then in `update_topic_progress`:

(a) Replace:

```python
            if quiz_score < 0.66:
                raise HTTPException(status_code=409, detail="Quiz must pass before drive can complete.")
```

with:

```python
            if not passes_mastery(quiz_score):
                raise HTTPException(status_code=409, detail=f"Quiz must reach {int(MASTERY_THRESHOLD*100)}% before drive can complete.")
```

(b) Replace:

```python
        completed = (
            article_read and quiz_score >= 0.66
```

with:

```python
        completed = (
            article_read and passes_mastery(quiz_score)
```

- [ ] **Step 5: Run, expect pass**

```bash
pytest backend/tests/test_mastery.py -v
```

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/compliance/mastery.py backend/main.py backend/tests/test_mastery.py
git commit -m "feat(compliance): mastery threshold 70% (was 66%) per 16 TAC POI-DE"
```

---

## Phase 2 — Anti-skip timer enforcement + curriculum minutes sync

### Task 5: Curriculum-minutes JSON generator

**Files:**
- Create: `scripts/sync_curriculum_minutes.py`
- Create: `backend/compliance/curriculum_minutes.json` (will be regenerated)

- [ ] **Step 1: Write the generator script**

Write to `scripts/sync_curriculum_minutes.py`:

```python
"""Parse frontend/scripts/curriculum.js, extract per-chapter minute floors,
and write backend/compliance/curriculum_minutes.json.

We deliberately use regex (not a JS engine) — curriculum.js is hand-authored
and follows a stable pattern: `id: 'X.Y', title: '...', minutes: N,`.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CURRICULUM_JS = ROOT / "frontend" / "scripts" / "curriculum.js"
OUT_JSON = ROOT / "backend" / "compliance" / "curriculum_minutes.json"

PATTERN = re.compile(
    r"id:\s*'(?P<id>\d+\.\d+)'.*?minutes:\s*(?P<minutes>\d+)",
    re.DOTALL,
)


def main() -> None:
    text = CURRICULUM_JS.read_text(encoding="utf-8")
    result: dict[str, int] = {}
    for m in PATTERN.finditer(text):
        chapter_id = m.group("id")
        minutes = int(m.group("minutes"))
        if chapter_id in result:
            raise SystemExit(f"Duplicate chapter id: {chapter_id}")
        result[chapter_id] = minutes
    if not result:
        raise SystemExit("No chapters found — regex needs review")
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(result, indent=2, sort_keys=True), encoding="utf-8")
    print(f"Wrote {len(result)} chapters to {OUT_JSON}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run it**

```bash
python scripts/sync_curriculum_minutes.py
```

Expected: prints "Wrote N chapters" where N matches the chapter count in curriculum.js (looks like ~40+). Verify the output file:

```bash
cat backend/compliance/curriculum_minutes.json | head -20
```

Should look like:

```json
{
  "1.1": 30,
  "1.2": 45,
  ...
}
```

- [ ] **Step 3: Commit the script + generated JSON**

```bash
git add scripts/sync_curriculum_minutes.py backend/compliance/curriculum_minutes.json
git commit -m "feat(compliance): curriculum-minutes JSON generator (parses curriculum.js)"
```

---

### Task 6: Server-side minimum-minutes enforcement on chapter completion

**Files:**
- Modify: `backend/main.py` (`complete_lesson` function)
- Create: `backend/tests/test_progress_min_minutes.py`

- [ ] **Step 1: Write the failing test**

Write to `backend/tests/test_progress_min_minutes.py`:

```python
def test_completion_fails_if_minutes_under_floor(signed_up_client):
    # Chapter 1.1 has minutes=30 in curriculum.js → server floor = 30.
    # Try to complete with only 5 minutes logged.
    r = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.1",
        "minutes": 5,
        "xp": 50,
    })
    assert r.status_code == 409, r.text
    body = r.json()
    assert body["detail"]["required"] == 30
    assert body["detail"]["have"] == 5


def test_completion_succeeds_when_minutes_meet_floor(signed_up_client):
    # Need to accumulate minutes first. We make N completion attempts —
    # the server's existing logic stores minutes via ON CONFLICT.
    # Simpler: send a single completion with minutes=30.
    r = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.1",
        "minutes": 30,
        "xp": 50,
    })
    assert r.status_code == 200, r.text


def test_unknown_chapter_id_bypasses_minute_floor(signed_up_client):
    """Until curriculum_minutes.json knows the chapter, we don't gate it.
    This preserves current behavior for any future ad-hoc lesson ids.
    """
    r = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "999.999",
        "minutes": 0,
        "xp": 0,
    })
    assert r.status_code == 200
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_progress_min_minutes.py -v
```

Expected: the first test expects 409, gets 200.

- [ ] **Step 3: Add the floor-loader + enforcement**

In `backend/main.py`:

(a) Near the top with other imports, add:

```python
import json as _stdlib_json
_CURRICULUM_MINUTES_PATH = ROOT / "backend" / "compliance" / "curriculum_minutes.json"
try:
    _CURRICULUM_MINUTES: dict[str, int] = _stdlib_json.loads(_CURRICULUM_MINUTES_PATH.read_text(encoding="utf-8"))
except FileNotFoundError:
    _CURRICULUM_MINUTES = {}
```

(b) In `complete_lesson()`, BEFORE the existing INSERT statements, add the floor check:

```python
    floor = _CURRICULUM_MINUTES.get(payload.lesson_id)
    if floor is not None:
        with db() as c:
            current = c.execute(
                "SELECT minutes FROM chapter_minutes WHERE user_id = ? AND chapter_id = ?",
                (user["id"], payload.lesson_id),
            ).fetchone()
        have = (current["minutes"] if current else 0) + payload.minutes
        if have < floor:
            raise HTTPException(status_code=409, detail={"error": "minutes_under_floor", "required": floor, "have": have})
```

The existing logic that does INSERT/UPDATE on chapter_minutes runs after this gate.

- [ ] **Step 4: Run, expect pass**

```bash
pytest backend/tests/test_progress_min_minutes.py -v
```

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/main.py backend/tests/test_progress_min_minutes.py
git commit -m "feat(compliance): enforce chapter minimum-minutes floor on completion (§84.501)"
```

---

### Task 7: Timer tick endpoint + tamper-event endpoint

**Files:**
- Create: `backend/compliance/timer.py`
- Modify: `backend/main.py` (include router)
- Create: `backend/tests/test_timer.py`

- [ ] **Step 1: Write the failing test**

Write to `backend/tests/test_timer.py`:

```python
def test_timer_tick_accumulates_chapter_minutes(signed_up_client):
    # Send three 30-second ticks for chapter 1.1 = 90 seconds = 1.5 min.
    for _ in range(3):
        r = signed_up_client.post("/api/compliance/timer/tick", json={
            "lesson_id": "1.1",
            "seconds": 30,
            "signals": [],
        })
        assert r.status_code == 200, r.text

    # Verify chapter_minutes via /api/me progress payload.
    me = signed_up_client.get("/api/me").json()
    minutes = me["progress"]["chapterMinutes"].get("1.1")
    assert minutes == 1  # int(90/60) = 1


def test_timer_tick_caps_oversize_delta(signed_up_client):
    # Send a 1-hour tick — server should cap.
    r = signed_up_client.post("/api/compliance/timer/tick", json={
        "lesson_id": "1.1",
        "seconds": 3600,
        "signals": [],
    })
    assert r.status_code == 200
    me = signed_up_client.get("/api/me").json()
    minutes = me["progress"]["chapterMinutes"].get("1.1")
    # Cap is 120 sec per tick (defensive ceiling)
    assert minutes is not None
    assert minutes <= 2


def test_timer_event_logs_to_audit(signed_up_client):
    r = signed_up_client.post("/api/compliance/timer/event", json={
        "event_type": "tab_visibility_change",
        "lesson_id": "1.1",
        "payload": {"hidden": True},
    })
    assert r.status_code == 200


def test_timer_event_rejects_unknown_type(signed_up_client):
    r = signed_up_client.post("/api/compliance/timer/event", json={
        "event_type": "not_an_allowed_event",
        "lesson_id": "1.1",
        "payload": {},
    })
    assert r.status_code == 422
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_timer.py -v
```

Expected: 404s.

- [ ] **Step 3: Write the timer module**

Write to `backend/compliance/timer.py`:

```python
"""Subsystem 3 + 8 — anti-skip active-time accumulator and tamper-event logger.

Client posts /tick every ~30s with seconds-of-active-time delta. Server caps
per-tick delta at 120s defensively. Tab-visibility, focus, paste, multi-tab
detection events post to /event and land in audit_events.
"""
from __future__ import annotations

import sqlite3
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from backend.compliance.audit import log_event

router = APIRouter(prefix="/api/compliance/timer")

PER_TICK_CAP_SECONDS = 120  # defensive ceiling — accidental long tick = capped

ALLOWED_EVENT_TYPES = {
    "tab_visibility_change",
    "tab_multi_detected",
    "devtools_open_suspected",
    "paste_into_quiz",
    "rapid_input_burst",
    "time_pause",
    "time_resume",
}


class TickIn(BaseModel):
    lesson_id: str = Field(min_length=1, max_length=20, pattern=r"^[A-Za-z0-9_.\-:]+$")
    seconds: int = Field(ge=0, le=600)
    signals: list[str] = Field(default_factory=list, max_length=32)


class TimerEventIn(BaseModel):
    event_type: str = Field(min_length=1, max_length=40)
    lesson_id: Optional[str] = Field(default=None, max_length=20, pattern=r"^[A-Za-z0-9_.\-:]+$")
    payload: Optional[dict[str, Any]] = None


def _bind_routes(require_user, db_factory):

    @router.post("/tick")
    def tick(payload: TickIn, user=Depends(require_user)):
        credited = min(payload.seconds, PER_TICK_CAP_SECONDS)
        minutes_delta = credited // 60  # only whole minutes go into chapter_minutes (existing schema is INT minutes)
        with db_factory() as c:
            if minutes_delta > 0:
                c.execute(
                    "INSERT INTO chapter_minutes (user_id, chapter_id, minutes) VALUES (?, ?, ?) "
                    "ON CONFLICT(user_id, chapter_id) DO UPDATE SET minutes = minutes + excluded.minutes",
                    (user["id"], payload.lesson_id, minutes_delta),
                )
            log_event(c, user["id"], "time_tick", payload.lesson_id, {
                "seconds_requested": payload.seconds,
                "seconds_credited": credited,
                "signals": payload.signals,
            })
        return {"ok": True, "credited_seconds": credited, "minutes_added": minutes_delta}

    @router.post("/event")
    def event(payload: TimerEventIn, user=Depends(require_user)):
        if payload.event_type not in ALLOWED_EVENT_TYPES:
            raise HTTPException(status_code=422, detail=f"Unknown event_type: {payload.event_type}")
        with db_factory() as c:
            log_event(c, user["id"], payload.event_type, payload.lesson_id, payload.payload)
        return {"ok": True}
```

- [ ] **Step 4: Wire it into main.py**

In `backend/main.py`, near the audit bind block:

```python
from backend.compliance import timer as compliance_timer
compliance_timer._bind_routes(require_user, db)
app.include_router(compliance_timer.router)
```

- [ ] **Step 5: Run, expect pass**

```bash
pytest backend/tests/test_timer.py -v
```

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/compliance/timer.py backend/main.py backend/tests/test_timer.py
git commit -m "feat(compliance): /timer/tick + /timer/event endpoints w/ per-tick cap"
```

---

### Task 8: Frontend compliance config loader + active-time timer

**Files:**
- Create: `frontend/scripts/compliance/config.js`
- Create: `frontend/scripts/compliance/timer.js`
- Create: `frontend/scripts/compliance/tamper.js`

- [ ] **Step 1: Write the config loader**

Write to `frontend/scripts/compliance/config.js`:

```javascript
// Loads /api/compliance/config once and stamps it on window.APEX_COMPLIANCE_CONFIG.
// All other compliance scripts read from that global.
let _loaded = null;

export async function loadComplianceConfig() {
  if (_loaded) return _loaded;
  const r = await fetch('/api/compliance/config', { credentials: 'include' });
  if (!r.ok) throw new Error(`Compliance config fetch failed: ${r.status}`);
  const cfg = await r.json();
  window.APEX_COMPLIANCE_CONFIG = cfg;
  _loaded = cfg;
  return cfg;
}
```

- [ ] **Step 2: Write the timer**

Write to `frontend/scripts/compliance/timer.js`:

```javascript
// Active-time accumulator. Pauses on tab-blur, document-hidden, or no input >Ns.
// Posts /api/compliance/timer/tick every TICK_POST_INTERVAL_MS.
// One instance per page; start with `startTimer(lessonId)`.
import { loadComplianceConfig } from './config.js';

const TICK_POST_INTERVAL_MS = 30_000;
const TICK_LOCAL_INTERVAL_MS = 1_000;

let _state = null;

export async function startTimer(lessonId) {
  if (!lessonId) throw new Error('startTimer needs lessonId');
  const cfg = await loadComplianceConfig();
  if (_state) stopTimer();
  _state = {
    lessonId,
    idleThresholdMs: (cfg.timer_idle_pause_seconds || 60) * 1000,
    activeSeconds: 0,
    pendingSeconds: 0,
    lastInputAt: Date.now(),
    paused: false,
    tickIv: null,
    postIv: null,
  };
  const onInput = () => { _state.lastInputAt = Date.now(); maybeResume(); };
  ['keydown', 'pointerdown', 'pointermove', 'wheel', 'scroll'].forEach(ev => {
    window.addEventListener(ev, onInput, { passive: true });
  });
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('blur', onBlur);
  window.addEventListener('focus', onFocus);
  window.addEventListener('beforeunload', flush);

  _state.tickIv = setInterval(localTick, TICK_LOCAL_INTERVAL_MS);
  _state.postIv = setInterval(flush, TICK_POST_INTERVAL_MS);
  _state.cleanup = () => {
    ['keydown', 'pointerdown', 'pointermove', 'wheel', 'scroll'].forEach(ev => {
      window.removeEventListener(ev, onInput);
    });
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('blur', onBlur);
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('beforeunload', flush);
  };
}

export function stopTimer() {
  if (!_state) return;
  flush();
  clearInterval(_state.tickIv);
  clearInterval(_state.postIv);
  _state.cleanup?.();
  _state = null;
}

function localTick() {
  if (!_state) return;
  if (document.hidden || _state.paused) return;
  if (Date.now() - _state.lastInputAt > _state.idleThresholdMs) {
    pause('idle');
    return;
  }
  _state.activeSeconds += 1;
  _state.pendingSeconds += 1;
}

function onVisibilityChange() {
  postEvent('tab_visibility_change', { hidden: document.hidden });
  if (document.hidden) pause('hidden');
  else maybeResume();
}

function onBlur() { pause('blur'); }
function onFocus() { maybeResume(); }

function pause(reason) {
  if (_state.paused) return;
  _state.paused = true;
  postEvent('time_pause', { reason });
}

function maybeResume() {
  if (!_state || !_state.paused) return;
  if (document.hidden) return;
  if (Date.now() - _state.lastInputAt > _state.idleThresholdMs) return;
  _state.paused = false;
  postEvent('time_resume', {});
}

async function flush() {
  if (!_state) return;
  const seconds = _state.pendingSeconds;
  if (seconds <= 0) return;
  _state.pendingSeconds = 0;
  try {
    await fetch('/api/compliance/timer/tick', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lesson_id: _state.lessonId, seconds, signals: [] }),
    });
  } catch (_) {
    // Connection failures: re-credit pendingSeconds so we retry next interval
    _state.pendingSeconds += seconds;
  }
}

async function postEvent(event_type, payload) {
  try {
    await fetch('/api/compliance/timer/event', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, lesson_id: _state?.lessonId, payload }),
    });
  } catch (_) { /* best effort */ }
}
```

- [ ] **Step 3: Write the tamper-signal poster**

Write to `frontend/scripts/compliance/tamper.js`:

```javascript
// Background tamper-signal detector. Posts to /api/compliance/timer/event.
// Detects: multi-tab open (via BroadcastChannel echo), devtools-suspect resize,
// paste-into-quiz events, rapid-input bursts.

const CH_NAME = 'apex-compliance';
let _initialized = false;

export function startTamperWatch(lessonId) {
  if (_initialized) return;
  _initialized = true;

  try {
    const ch = new BroadcastChannel(CH_NAME);
    const myId = crypto.randomUUID();
    ch.postMessage({ kind: 'hello', id: myId });
    ch.onmessage = (e) => {
      if (e.data?.kind === 'hello' && e.data.id !== myId) {
        postEvent('tab_multi_detected', { other_id: e.data.id }, lessonId);
      }
    };
  } catch (_) { /* old browser */ }

  let lastWidthGap = window.outerWidth - window.innerWidth;
  window.addEventListener('resize', () => {
    const gap = window.outerWidth - window.innerWidth;
    if (gap > 200 && lastWidthGap <= 200) {
      postEvent('devtools_open_suspected', { gap }, lessonId);
    }
    lastWidthGap = gap;
  });

  document.addEventListener('paste', (e) => {
    const target = e.target;
    if (target && /input|textarea/i.test(target.tagName || '')) {
      postEvent('paste_into_quiz', { tag: target.tagName }, lessonId);
    }
  });

  let inputs = [];
  document.addEventListener('keydown', () => {
    const now = Date.now();
    inputs.push(now);
    inputs = inputs.filter(t => now - t < 3000);
    if (inputs.length > 15) {  // >5/sec for 3s
      postEvent('rapid_input_burst', { count: inputs.length }, lessonId);
      inputs = [];
    }
  });
}

async function postEvent(event_type, payload, lessonId) {
  try {
    await fetch('/api/compliance/timer/event', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, lesson_id: lessonId || null, payload }),
    });
  } catch (_) { /* best effort */ }
}
```

- [ ] **Step 4: Commit**

```bash
git add frontend/scripts/compliance/config.js frontend/scripts/compliance/timer.js frontend/scripts/compliance/tamper.js
git commit -m "feat(compliance,frontend): config loader + active-time timer + tamper-signal watcher"
```

---

### Task 9: Wire timer + tamper into lesson/topic/drive pages

**Files:**
- Modify: `frontend/lesson.html`, `frontend/topic.html`, `frontend/drive.html`

- [ ] **Step 1: Add compliance scripts to lesson.html**

In `frontend/lesson.html`, find the closing `</body>` tag. Just before it, add:

```html
<script type="module">
  import { startTimer } from './scripts/compliance/timer.js';
  import { startTamperWatch } from './scripts/compliance/tamper.js';
  // Lesson ID comes from query string ?id=X.Y
  const params = new URLSearchParams(location.search);
  const lessonId = params.get('id');
  if (lessonId) {
    startTimer(lessonId);
    startTamperWatch(lessonId);
  }
</script>
```

- [ ] **Step 2: Repeat for topic.html and drive.html**

For `frontend/topic.html`, do the same. For `frontend/drive.html`, look for the existing logic that determines the scenario or current lesson ID and pass that to `startTimer()` — if no chapter is associated with a drive session, pass `'drive:' + scenarioName` so the timer at least records activity context.

For `drive.html`, the snippet looks like:

```html
<script type="module">
  import { startTimer } from './scripts/compliance/timer.js';
  import { startTamperWatch } from './scripts/compliance/tamper.js';
  const params = new URLSearchParams(location.search);
  const scenario = params.get('scenario') || 'free';
  const lessonId = 'drive:' + scenario;
  startTimer(lessonId);
  startTamperWatch(lessonId);
</script>
```

- [ ] **Step 3: Smoke test in a real browser**

Run:

```bash
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

Open `http://127.0.0.1:8000/`, sign up as a test user, navigate to `/lesson.html?id=1.1`, leave it open for 90+ seconds. Then in the Network tab check for `/api/compliance/timer/tick` POSTs. Switch tabs to verify a `time_pause` POST appears.

This is a manual acceptance check — no automated test (vanilla-JS frontend, no test framework).

- [ ] **Step 4: Commit**

```bash
git add frontend/lesson.html frontend/topic.html frontend/drive.html
git commit -m "feat(compliance,frontend): wire timer + tamper into lesson/topic/drive pages"
```

---

## Phase 3 — Identity validation

### Task 10: Identity schema + curated prompts + seed endpoint

**Files:**
- Create: `backend/compliance/identity.py` (initial — seed only, more endpoints follow)
- Modify: `backend/main.py` (init_db + include router)
- Create: `backend/tests/test_identity.py`

- [ ] **Step 1: Write the failing test (seed only)**

Write to `backend/tests/test_identity.py`:

```python
def test_identity_seed_persists_questions(signed_up_client):
    r = signed_up_client.post("/api/compliance/identity/seed", json={
        "answers": [
            {"prompt": "favorite_color", "answer": "Blue"},
            {"prompt": "first_pet", "answer": " Fluffy  "},
            {"prompt": "city_of_birth", "answer": "Dallas"},
            {"prompt": "elementary_school", "answer": "Lakewood"},
            {"prompt": "favorite_food_child", "answer": "Tacos"},
        ],
    })
    assert r.status_code == 200, r.text
    assert r.json()["seeded"] == 5


def test_identity_seed_rejects_unknown_prompt(signed_up_client):
    r = signed_up_client.post("/api/compliance/identity/seed", json={
        "answers": [
            {"prompt": "not_a_real_prompt", "answer": "x"},
        ],
    })
    assert r.status_code == 422


def test_identity_seed_requires_min_five(signed_up_client):
    r = signed_up_client.post("/api/compliance/identity/seed", json={
        "answers": [{"prompt": "favorite_color", "answer": "Blue"}],
    })
    assert r.status_code == 422


def test_identity_get_prompts_returns_curated_list(client):
    r = client.get("/api/compliance/identity/prompts")
    assert r.status_code == 200
    prompts = r.json()["prompts"]
    assert len(prompts) >= 20
    assert "favorite_color" in [p["id"] for p in prompts]
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_identity.py -v
```

Expected: 404s.

- [ ] **Step 3: Write the identity module (seed + prompts only)**

Write to `backend/compliance/identity.py`:

```python
"""Subsystem 1 — personal-validation identity questions per 16 TAC §84.501.

At registration, student picks ≥5 prompts from the curated list and provides
answers. Answers are stored as lowercase-trimmed-whitespace-collapsed strings
(NOT password-hashed — TDLR auditors must be able to see what was stored).
"""
from __future__ import annotations

import re
import sqlite3
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, conlist

from backend.compliance.audit import log_event

router = APIRouter(prefix="/api/compliance/identity")

CURATED_PROMPTS: list[dict[str, str]] = [
    {"id": "favorite_color",        "prompt": "What is your favorite color?"},
    {"id": "first_pet",             "prompt": "What was your first pet's name?"},
    {"id": "city_of_birth",         "prompt": "In what city were you born?"},
    {"id": "elementary_school",     "prompt": "What is the name of your elementary school?"},
    {"id": "favorite_teacher",      "prompt": "What was your favorite teacher's last name?"},
    {"id": "best_friend_4th",       "prompt": "Who was your best friend in 4th grade?"},
    {"id": "family_car_make",       "prompt": "What is the make of your family's car?"},
    {"id": "childhood_street",      "prompt": "What street did you grow up on?"},
    {"id": "favorite_food_child",   "prompt": "What was your favorite food as a child?"},
    {"id": "favorite_cartoon",      "prompt": "What was your favorite cartoon growing up?"},
    {"id": "family_nickname",       "prompt": "What nickname does your family call you?"},
    {"id": "mothers_maiden",        "prompt": "What is your mother's maiden name?"},
    {"id": "first_concert",         "prompt": "What was the first concert you attended?"},
    {"id": "first_phone",           "prompt": "What was the make of your first phone?"},
    {"id": "favorite_book_child",   "prompt": "What was your favorite book as a kid?"},
    {"id": "favorite_video_game",   "prompt": "What is your favorite video game?"},
    {"id": "first_job",             "prompt": "What was your first job?"},
    {"id": "favorite_sports_team",  "prompt": "What is your favorite sports team?"},
    {"id": "city_grew_up",          "prompt": "What city did you grow up in?"},
    {"id": "favorite_subject",      "prompt": "What is your favorite school subject?"},
    {"id": "favorite_movie",        "prompt": "What is your favorite movie?"},
    {"id": "favorite_song",         "prompt": "What is your favorite song?"},
    {"id": "favorite_color_2",      "prompt": "What is your second-favorite color?"},
    {"id": "first_car",             "prompt": "What was the first car you drove?"},
    {"id": "best_friend_now",       "prompt": "Who is your best friend?"},
]

VALID_PROMPT_IDS = {p["id"] for p in CURATED_PROMPTS}

_WHITESPACE_RX = re.compile(r"\s+")


def normalize_answer(s: str) -> str:
    return _WHITESPACE_RX.sub(" ", s.strip()).lower()


def init_identity_schema(db: sqlite3.Connection) -> None:
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS identity_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            prompt_id TEXT NOT NULL,
            prompt TEXT NOT NULL,
            answer_norm TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_identity_q_user ON identity_questions(user_id);

        CREATE TABLE IF NOT EXISTS identity_challenges (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            lesson_id TEXT,
            asked_at TEXT DEFAULT CURRENT_TIMESTAMP,
            answered_at TEXT,
            response_ms INTEGER,
            correct INTEGER,
            retain_until TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (question_id) REFERENCES identity_questions(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_identity_c_user ON identity_challenges(user_id);
        """
    )


class SeedItem(BaseModel):
    prompt: str = Field(min_length=1, max_length=40)
    answer: str = Field(min_length=1, max_length=120)


class SeedIn(BaseModel):
    answers: conlist(SeedItem, min_length=5, max_length=10)


def _bind_routes(require_user, db_factory):

    @router.get("/prompts")
    def list_prompts():
        return {"prompts": CURATED_PROMPTS}

    @router.post("/seed")
    def seed(payload: SeedIn, user=Depends(require_user)):
        # Validate prompt ids
        for item in payload.answers:
            if item.prompt not in VALID_PROMPT_IDS:
                raise HTTPException(status_code=422, detail=f"Unknown prompt id: {item.prompt}")
        prompt_text_by_id = {p["id"]: p["prompt"] for p in CURATED_PROMPTS}
        with db_factory() as c:
            # Wipe any prior seeds for this user (registration can be re-run)
            c.execute("DELETE FROM identity_questions WHERE user_id = ?", (user["id"],))
            for item in payload.answers:
                c.execute(
                    "INSERT INTO identity_questions (user_id, prompt_id, prompt, answer_norm) VALUES (?, ?, ?, ?)",
                    (user["id"], item.prompt, prompt_text_by_id[item.prompt], normalize_answer(item.answer)),
                )
            log_event(c, user["id"], "identity_seeded", None, {"count": len(payload.answers)})
        return {"seeded": len(payload.answers)}
```

- [ ] **Step 4: Wire schema init + router into main.py**

In `backend/main.py`:

(a) Import:

```python
from backend.compliance import identity as compliance_identity
```

(b) In `init_db()` after `compliance_audit.init_audit_schema(c)`:

```python
        compliance_identity.init_identity_schema(c)
```

(c) After `compliance_timer` bind block:

```python
compliance_identity._bind_routes(require_user, db)
app.include_router(compliance_identity.router)
```

- [ ] **Step 5: Run, expect pass**

```bash
pytest backend/tests/test_identity.py -v
```

Expected: 4 PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/compliance/identity.py backend/main.py backend/tests/test_identity.py
git commit -m "feat(compliance): identity_questions seed + curated prompts (§84.501)"
```

---

### Task 11: Identity scheduler (/next) + checker (/check) endpoints

**Files:**
- Modify: `backend/compliance/identity.py` (add /next, /check, lockout trigger)
- Modify: `backend/tests/test_identity.py` (add tests)

- [ ] **Step 1: Add failing tests for /next and /check**

Append to `backend/tests/test_identity.py`:

```python
def _seed(client):
    r = client.post("/api/compliance/identity/seed", json={"answers": [
        {"prompt": "favorite_color",      "answer": "Blue"},
        {"prompt": "first_pet",           "answer": "Fluffy"},
        {"prompt": "city_of_birth",       "answer": "Dallas"},
        {"prompt": "elementary_school",   "answer": "Lakewood"},
        {"prompt": "favorite_food_child", "answer": "Tacos"},
    ]})
    assert r.status_code == 200


def test_identity_next_returns_a_challenge_after_seed(signed_up_client):
    _seed(signed_up_client)
    r = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1")
    assert r.status_code == 200
    body = r.json()
    assert body is not None
    assert "challenge_id" in body
    assert "prompt" in body
    assert "prompt_id" not in body  # we don't leak the id to the client (avoid lookup)


def test_identity_check_correct_answer_passes(signed_up_client):
    _seed(signed_up_client)
    nxt = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1").json()
    # Find the right answer from the test fixtures — we use prompt text to figure out which.
    # In the real flow the user knows their own answer; in tests we map by prompt text.
    answers = {
        "What is your favorite color?": "blue",
        "What was your first pet's name?": "fluffy",
        "In what city were you born?": "dallas",
        "What is the name of your elementary school?": "lakewood",
        "What was your favorite food as a child?": "tacos",
    }
    answer = answers[nxt["prompt"]]
    r = signed_up_client.post("/api/compliance/identity/check", json={
        "challenge_id": nxt["challenge_id"],
        "answer": answer,
        "response_ms": 5000,
    })
    assert r.status_code == 200, r.text
    assert r.json()["correct"] is True


def test_identity_check_wrong_answer_recorded(signed_up_client):
    _seed(signed_up_client)
    nxt = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1").json()
    r = signed_up_client.post("/api/compliance/identity/check", json={
        "challenge_id": nxt["challenge_id"],
        "answer": "not_the_right_answer_at_all",
        "response_ms": 5000,
    })
    assert r.status_code == 200
    assert r.json()["correct"] is False


def test_identity_check_timeout_counts_as_wrong(signed_up_client):
    _seed(signed_up_client)
    nxt = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1").json()
    # response_ms > 90000 = timeout → wrong regardless of answer
    r = signed_up_client.post("/api/compliance/identity/check", json={
        "challenge_id": nxt["challenge_id"],
        "answer": "blue",  # might even be right but timeout supersedes
        "response_ms": 95_000,
    })
    assert r.status_code == 200
    assert r.json()["correct"] is False


def test_identity_lockout_after_30pct_wrong_past_warmup(signed_up_client):
    _seed(signed_up_client)
    answers = {
        "What is your favorite color?": "blue",
        "What was your first pet's name?": "fluffy",
        "In what city were you born?": "dallas",
        "What is the name of your elementary school?": "lakewood",
        "What was your favorite food as a child?": "tacos",
    }
    locked = False
    for i in range(15):
        nxt = signed_up_client.get(f"/api/compliance/identity/next?lesson_id=1.{i+1}&force=1").json()
        right_answer = answers[nxt["prompt"]]
        # Wrong half the time
        ans = "WRONG_ANSWER" if i % 2 == 0 else right_answer
        r = signed_up_client.post("/api/compliance/identity/check", json={
            "challenge_id": nxt["challenge_id"],
            "answer": ans,
            "response_ms": 5000,
        })
        if r.status_code == 200 and r.json().get("lockout_opened"):
            locked = True
            break
    assert locked, "Expected a lockout after >30% wrong past warmup"
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_identity.py -v
```

Expected: the 5 new tests fail (no /next or /check routes).

- [ ] **Step 3: Extend identity.py with /next, /check, and lockout trigger**

In `backend/compliance/identity.py`, add at the bottom (after `_bind_routes` definition, fold into it):

Replace the `_bind_routes` function with this expanded version:

```python
import random
from datetime import datetime, timedelta

from backend.compliance.config import (
    IDENTITY_WARMUP_MIN_TOTAL,
    IDENTITY_WRONG_RATE_LOCKOUT,
    IDENTITY_RESPONSE_SECONDS,
)


class CheckIn(BaseModel):
    challenge_id: int
    answer: str = Field(min_length=1, max_length=120)
    response_ms: int = Field(ge=0, le=600_000)


def _bind_routes(require_user, db_factory):

    @router.get("/prompts")
    def list_prompts():
        return {"prompts": CURATED_PROMPTS}

    @router.post("/seed")
    def seed(payload: SeedIn, user=Depends(require_user)):
        for item in payload.answers:
            if item.prompt not in VALID_PROMPT_IDS:
                raise HTTPException(status_code=422, detail=f"Unknown prompt id: {item.prompt}")
        prompt_text_by_id = {p["id"]: p["prompt"] for p in CURATED_PROMPTS}
        with db_factory() as c:
            c.execute("DELETE FROM identity_questions WHERE user_id = ?", (user["id"],))
            for item in payload.answers:
                c.execute(
                    "INSERT INTO identity_questions (user_id, prompt_id, prompt, answer_norm) VALUES (?, ?, ?, ?)",
                    (user["id"], item.prompt, prompt_text_by_id[item.prompt], normalize_answer(item.answer)),
                )
            log_event(c, user["id"], "identity_seeded", None, {"count": len(payload.answers)})
        return {"seeded": len(payload.answers)}

    @router.get("/next")
    def next_challenge(lesson_id: str, force: int = 0, user=Depends(require_user)):
        """Returns a new challenge if one is due, else null.

        Scheduling rule: at most one challenge per lesson_id; the first time
        a lesson is visited a challenge is created with ~70% probability,
        unless force=1 (used by tests and on lesson-completion).
        """
        with db_factory() as c:
            existing = c.execute(
                "SELECT id FROM identity_challenges WHERE user_id = ? AND lesson_id = ?",
                (user["id"], lesson_id),
            ).fetchone()
            if existing:
                return None  # already challenged for this lesson

            if not force and random.random() > 0.70:
                return None

            qs = c.execute(
                "SELECT id, prompt FROM identity_questions WHERE user_id = ? "
                "ORDER BY RANDOM() LIMIT 1",
                (user["id"],),
            ).fetchone()
            if not qs:
                raise HTTPException(status_code=409, detail="Identity questions not seeded")

            retain_until = (datetime.utcnow() + timedelta(days=365*3)).isoformat()
            cur = c.execute(
                "INSERT INTO identity_challenges (user_id, question_id, lesson_id, retain_until) "
                "VALUES (?, ?, ?, ?)",
                (user["id"], qs["id"], lesson_id, retain_until),
            )
            challenge_id = cur.lastrowid
            log_event(c, user["id"], "identity_q_asked", lesson_id, {"challenge_id": challenge_id, "question_id": qs["id"]})

        return {"challenge_id": challenge_id, "prompt": qs["prompt"], "response_seconds": IDENTITY_RESPONSE_SECONDS}

    @router.post("/check")
    def check(payload: CheckIn, user=Depends(require_user)):
        with db_factory() as c:
            ch = c.execute(
                "SELECT c.*, q.answer_norm FROM identity_challenges c "
                "JOIN identity_questions q ON q.id = c.question_id "
                "WHERE c.id = ? AND c.user_id = ?",
                (payload.challenge_id, user["id"]),
            ).fetchone()
            if not ch:
                raise HTTPException(status_code=404, detail="Challenge not found")
            if ch["answered_at"] is not None:
                raise HTTPException(status_code=409, detail="Already answered")

            timed_out = payload.response_ms > IDENTITY_RESPONSE_SECONDS * 1000
            correct_match = normalize_answer(payload.answer) == ch["answer_norm"] and not timed_out

            c.execute(
                "UPDATE identity_challenges SET answered_at = ?, response_ms = ?, correct = ? WHERE id = ?",
                (datetime.utcnow().isoformat(), payload.response_ms, 1 if correct_match else 0, payload.challenge_id),
            )
            log_event(c, user["id"], "identity_q_answered", ch["lesson_id"], {
                "challenge_id": payload.challenge_id,
                "correct": correct_match,
                "timed_out": timed_out,
                "response_ms": payload.response_ms,
            })

            # Lockout math
            row = c.execute(
                "SELECT COUNT(*) AS total, "
                "       SUM(CASE WHEN correct=0 THEN 1 ELSE 0 END) AS wrong "
                "FROM identity_challenges WHERE user_id = ? AND answered_at IS NOT NULL",
                (user["id"],),
            ).fetchone()
            total = row["total"] or 0
            wrong = row["wrong"] or 0
            lockout_opened = False
            if total >= IDENTITY_WARMUP_MIN_TOTAL and (wrong / total) > IDENTITY_WRONG_RATE_LOCKOUT:
                # Only one open lockout at a time — the lockouts module will add the table later;
                # for now we just log it so the check returns the flag.
                log_event(c, user["id"], "lockout_open_pending", None, {
                    "reason": "identity_validation_threshold", "wrong": wrong, "total": total,
                })
                lockout_opened = True

        return {"correct": correct_match, "timed_out": timed_out, "lockout_opened": lockout_opened}
```

- [ ] **Step 4: Run, expect pass**

```bash
pytest backend/tests/test_identity.py -v
```

Expected: all 8 PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/compliance/identity.py backend/tests/test_identity.py
git commit -m "feat(compliance): identity /next scheduler + /check w/ 30%-wrong lockout trigger"
```

---

### Task 12: Frontend identity-setup page + in-lesson challenge UI

**Files:**
- Create: `frontend/identity-setup.html`
- Create: `frontend/scripts/compliance/identity.js`
- Modify: `frontend/signup.html` (redirect after signup)

- [ ] **Step 1: Write identity-setup.html**

Write to `frontend/identity-setup.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Set up identity verification · APEX</title>
  <link rel="stylesheet" href="styles/app.css">
</head>
<body>
  <main class="container narrow" style="padding:48px 16px;">
    <h1>One quick setup step</h1>
    <p>Texas requires us to verify the same person taking the course is the one enrolled. Pick five of these questions and answer them. We'll ask one occasionally during lessons. Use answers only you would know.</p>

    <form id="identity-form">
      <div id="prompts-list"></div>
      <button type="submit" class="btn primary" style="margin-top:24px;">Save and continue</button>
      <p id="status" style="margin-top:12px;color:#b91c1c;"></p>
    </form>
  </main>

  <script type="module">
    const promptsList = document.getElementById('prompts-list');
    const statusEl = document.getElementById('status');
    const form = document.getElementById('identity-form');

    async function load() {
      const r = await fetch('/api/compliance/identity/prompts');
      const { prompts } = await r.json();
      promptsList.innerHTML = prompts.map(p => `
        <label style="display:block;margin:16px 0;">
          <input type="checkbox" name="prompt" value="${p.id}" data-prompt="${p.prompt}">
          ${p.prompt}
          <input type="text" name="answer_${p.id}" placeholder="Your answer" disabled
            style="display:block;width:100%;margin-top:6px;padding:8px;border:1px solid #ccc;border-radius:6px;">
        </label>
      `).join('');
      promptsList.querySelectorAll('input[name="prompt"]').forEach(cb => {
        cb.addEventListener('change', e => {
          const ans = cb.closest('label').querySelector(`input[name="answer_${cb.value}"]`);
          ans.disabled = !cb.checked;
          if (!cb.checked) ans.value = '';
        });
      });
    }
    load();

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const answers = [];
      promptsList.querySelectorAll('input[name="prompt"]:checked').forEach(cb => {
        const txt = cb.closest('label').querySelector(`input[name="answer_${cb.value}"]`).value.trim();
        if (txt) answers.push({ prompt: cb.value, answer: txt });
      });
      if (answers.length < 5) {
        statusEl.textContent = 'Pick at least 5 questions and answer each.';
        return;
      }
      if (answers.length > 10) {
        statusEl.textContent = 'At most 10 questions.';
        return;
      }
      const r = await fetch('/api/compliance/identity/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ answers }),
      });
      if (!r.ok) {
        statusEl.textContent = 'Save failed — please retry.';
        return;
      }
      location.href = '/dashboard.html';
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Write the in-lesson challenge UI**

Write to `frontend/scripts/compliance/identity.js`:

```javascript
// In-lesson identity challenge. Hits /api/compliance/identity/next on chapter
// entry; if a challenge comes back, renders a modal with a 90-second timer.
import { loadComplianceConfig } from './config.js';

export async function maybeChallenge(lessonId) {
  if (!lessonId) return;
  const r = await fetch(`/api/compliance/identity/next?lesson_id=${encodeURIComponent(lessonId)}`, {
    credentials: 'include',
  });
  if (!r.ok) return;
  const data = await r.json();
  if (!data) return;
  await renderChallenge(data, lessonId);
}

function renderChallenge(challenge, lessonId) {
  return new Promise(async (resolve) => {
    const cfg = await loadComplianceConfig();
    const secs = challenge.response_seconds || cfg.identity_response_seconds || 90;

    const overlay = document.createElement('div');
    overlay.id = 'apex-identity-modal';
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(15,19,28,0.85); z-index: 99999;
      display: flex; align-items: center; justify-content: center; font-family: inherit;
    `;
    overlay.innerHTML = `
      <div style="background:#fbfaf6;border-radius:14px;padding:28px;max-width:480px;width:90%;
                   box-shadow:0 24px 80px rgba(0,0,0,.45);">
        <h2 style="margin:0 0 8px;">Identity check</h2>
        <p style="margin:0 0 16px;color:#5d6776;">Texas rule §84.501. You have <span id="cd">${secs}</span>s.</p>
        <p style="font-size:18px;font-weight:600;margin:0 0 12px;">${challenge.prompt}</p>
        <input id="ans" type="text" autofocus
               style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;font-size:16px;">
        <p id="err" style="color:#b91c1c;min-height:1.2em;margin:8px 0 0;"></p>
        <button id="submit" class="btn primary" style="margin-top:12px;">Submit</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const cdEl = overlay.querySelector('#cd');
    const ansEl = overlay.querySelector('#ans');
    const errEl = overlay.querySelector('#err');
    const submitBtn = overlay.querySelector('#submit');

    const start = Date.now();
    const timer = setInterval(() => {
      const rem = Math.max(0, secs - Math.floor((Date.now() - start) / 1000));
      cdEl.textContent = rem;
      if (rem <= 0) {
        clearInterval(timer);
        submit(true);
      }
    }, 250);

    async function submit(timedOut) {
      submitBtn.disabled = true;
      const response_ms = Date.now() - start;
      try {
        const r = await fetch('/api/compliance/identity/check', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            challenge_id: challenge.challenge_id,
            answer: ansEl.value || ' ',
            response_ms,
          }),
        });
        const body = await r.json();
        if (body.lockout_opened) {
          location.href = '/lockout.html';
          return;
        }
        if (!body.correct) {
          errEl.textContent = timedOut ? 'Time up. Recorded as incorrect.' : 'Not a match. Recorded.';
          setTimeout(() => { overlay.remove(); resolve(false); }, 1500);
        } else {
          overlay.remove();
          resolve(true);
        }
      } catch (_) {
        overlay.remove();
        resolve(null);
      } finally {
        clearInterval(timer);
      }
    }

    submitBtn.addEventListener('click', () => submit(false));
    ansEl.addEventListener('keydown', e => { if (e.key === 'Enter') submit(false); });
  });
}
```

- [ ] **Step 3: Wire signup → identity-setup**

In `frontend/signup.html`, find the existing JS that handles signup success (look for `location.href = '/dashboard.html'` or similar). Change it to redirect to `/identity-setup.html` instead:

```javascript
// after successful signup POST:
location.href = '/identity-setup.html';
```

If the existing redirect points to `/dashboard.html`, change it. If signup.html uses inline `<script>` and posts via fetch, the change is one line.

- [ ] **Step 4: Wire identity challenge into lesson.html**

In `frontend/lesson.html`, update the existing compliance script block:

```html
<script type="module">
  import { startTimer } from './scripts/compliance/timer.js';
  import { startTamperWatch } from './scripts/compliance/tamper.js';
  import { maybeChallenge } from './scripts/compliance/identity.js';
  const params = new URLSearchParams(location.search);
  const lessonId = params.get('id');
  if (lessonId) {
    startTimer(lessonId);
    startTamperWatch(lessonId);
    maybeChallenge(lessonId);
  }
</script>
```

Do the same for `topic.html` and `drive.html`.

- [ ] **Step 5: Manual smoke test**

```bash
python -m uvicorn backend.main:app --reload --port 8000
```

Sign up as new user → confirm redirect to `/identity-setup.html` → pick 5 questions → submit → arrive at `/dashboard.html`. Visit `/lesson.html?id=1.1` and reload a few times — identity modal should appear ~70% of the time.

- [ ] **Step 6: Commit**

```bash
git add frontend/identity-setup.html frontend/signup.html frontend/scripts/compliance/identity.js frontend/lesson.html frontend/topic.html frontend/drive.html
git commit -m "feat(compliance,frontend): identity setup page + in-lesson challenge modal"
```

---

## Phase 4 — Multimedia comprehension gates

### Task 13: Clip schema + GET clip + POST clip view

**Files:**
- Create: `backend/compliance/multimedia.py`
- Modify: `backend/main.py` (init + include router)
- Create: `backend/tests/test_multimedia.py`

- [ ] **Step 1: Write the failing test**

Write to `backend/tests/test_multimedia.py`:

```python
def _register_test_clip(client):
    """Use the admin/test-only seed endpoint to register a clip + 4 questions."""
    r = client.post("/api/compliance/_debug/seed_clip", json={
        "clip_id": "test-clip-1",
        "lesson_id": "1.1",
        "duration_sec": 210,
        "title": "Test clip about hazards",
        "questions": [
            {"prompt": "What color was the car?", "options": ["red", "blue", "green", "yellow"], "correct_index": 0},
            {"prompt": "What did the driver do?", "options": ["stopped", "ran", "swerved", "honked"], "correct_index": 1},
            {"prompt": "Time of day?", "options": ["dawn", "noon", "dusk", "night"], "correct_index": 2},
            {"prompt": "Speed limit?", "options": ["25", "35", "45", "55"], "correct_index": 1},
        ],
    })
    assert r.status_code == 200


def test_get_clip_does_not_leak_correct_index(signed_up_client):
    _register_test_clip(signed_up_client)
    r = signed_up_client.get("/api/compliance/clips/test-clip-1")
    assert r.status_code == 200
    body = r.json()
    assert body["clip_id"] == "test-clip-1"
    assert body["duration_sec"] == 210
    assert "question" in body
    assert "correct_index" not in body["question"]
    assert len(body["question"]["options"]) == 4


def test_post_clip_view_grades_correct_answer(signed_up_client):
    _register_test_clip(signed_up_client)
    info = signed_up_client.get("/api/compliance/clips/test-clip-1").json()
    qid = info["question"]["id"]
    # Resolve correct_index — test fetches it via debug endpoint
    truth = signed_up_client.get(f"/api/compliance/_debug/clip_question/{qid}").json()
    correct = truth["correct_index"]
    r = signed_up_client.post("/api/compliance/clips/test-clip-1/view", json={
        "finished": True,
        "question_id": qid,
        "answer_index": correct,
    })
    assert r.status_code == 200
    assert r.json()["correct"] is True


def test_post_clip_view_wrong_then_wrong_again_triggers_lockout(signed_up_client):
    _register_test_clip(signed_up_client)
    info = signed_up_client.get("/api/compliance/clips/test-clip-1").json()
    qid = info["question"]["id"]
    truth = signed_up_client.get(f"/api/compliance/_debug/clip_question/{qid}").json()
    wrong = (truth["correct_index"] + 1) % 4

    r1 = signed_up_client.post("/api/compliance/clips/test-clip-1/view", json={
        "finished": True, "question_id": qid, "answer_index": wrong,
    })
    assert r1.json()["correct"] is False
    assert r1.json()["must_replay"] is True

    r2 = signed_up_client.post("/api/compliance/clips/test-clip-1/view", json={
        "finished": True, "question_id": qid, "answer_index": wrong,
    })
    assert r2.json()["correct"] is False
    assert r2.json()["lockout_opened"] is True
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_multimedia.py -v
```

- [ ] **Step 3: Write the multimedia module**

Write to `backend/compliance/multimedia.py`:

```python
"""Subsystem 2 — multimedia comprehension gates per 16 TAC §84.501.

Any clip > 180s triggers a comprehension question on completion. Wrong → replay;
second wrong → lockout.
"""
from __future__ import annotations

import json
import random
import sqlite3
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, conlist

from backend.compliance.audit import log_event

router = APIRouter(prefix="/api/compliance")


def init_multimedia_schema(db: sqlite3.Connection) -> None:
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS multimedia_clips (
            id TEXT PRIMARY KEY,
            duration_sec INTEGER NOT NULL,
            lesson_id TEXT NOT NULL,
            title TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS clip_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            clip_id TEXT NOT NULL,
            prompt TEXT NOT NULL,
            options_json TEXT NOT NULL,
            correct_index INTEGER NOT NULL,
            FOREIGN KEY (clip_id) REFERENCES multimedia_clips(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_clip_q ON clip_questions(clip_id);
        CREATE TABLE IF NOT EXISTS clip_views (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            clip_id TEXT NOT NULL,
            started_at TEXT DEFAULT CURRENT_TIMESTAMP,
            finished_at TEXT,
            question_id INTEGER,
            answered_correctly INTEGER,
            retain_until TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_clip_views_user ON clip_views(user_id);
        """
    )


class ClipViewIn(BaseModel):
    finished: bool
    question_id: Optional[int] = None
    answer_index: Optional[int] = None


class QuestionSpec(BaseModel):
    prompt: str = Field(min_length=1, max_length=240)
    options: conlist(str, min_length=2, max_length=8)
    correct_index: int = Field(ge=0, le=7)


class SeedClipIn(BaseModel):
    clip_id: str = Field(min_length=1, max_length=80, pattern=r"^[a-z0-9_\-]+$")
    duration_sec: int = Field(ge=1, le=7200)
    lesson_id: str = Field(min_length=1, max_length=20)
    title: Optional[str] = Field(default=None, max_length=120)
    questions: conlist(QuestionSpec, min_length=4, max_length=12)


def _bind_routes(require_user, db_factory):

    @router.get("/clips/{clip_id}")
    def get_clip(clip_id: str, user=Depends(require_user)):
        with db_factory() as c:
            clip = c.execute("SELECT * FROM multimedia_clips WHERE id = ?", (clip_id,)).fetchone()
            if not clip:
                raise HTTPException(404, "Clip not found")
            q = c.execute(
                "SELECT id, prompt, options_json FROM clip_questions WHERE clip_id = ? ORDER BY RANDOM() LIMIT 1",
                (clip_id,),
            ).fetchone()
            if not q:
                raise HTTPException(409, "Clip has no comprehension questions registered")
        return {
            "clip_id": clip["id"],
            "duration_sec": clip["duration_sec"],
            "lesson_id": clip["lesson_id"],
            "title": clip["title"],
            "question": {
                "id": q["id"],
                "prompt": q["prompt"],
                "options": json.loads(q["options_json"]),
            },
        }

    @router.post("/clips/{clip_id}/view")
    def post_view(clip_id: str, payload: ClipViewIn, user=Depends(require_user)):
        if payload.question_id is None or payload.answer_index is None:
            raise HTTPException(422, "question_id and answer_index required")
        with db_factory() as c:
            q = c.execute(
                "SELECT * FROM clip_questions WHERE id = ? AND clip_id = ?",
                (payload.question_id, clip_id),
            ).fetchone()
            if not q:
                raise HTTPException(404, "Question not found for this clip")
            correct = (payload.answer_index == q["correct_index"])

            from datetime import datetime, timedelta
            retain_until = (datetime.utcnow() + timedelta(days=365*3)).isoformat()
            c.execute(
                "INSERT INTO clip_views (user_id, clip_id, finished_at, question_id, answered_correctly, retain_until) "
                "VALUES (?, ?, ?, ?, ?, ?)",
                (user["id"], clip_id, datetime.utcnow().isoformat(), payload.question_id, 1 if correct else 0, retain_until),
            )
            log_event(c, user["id"], "clip_question_correct" if correct else "clip_question_wrong",
                      q["clip_id"], {"question_id": payload.question_id, "answer_index": payload.answer_index})

            must_replay = False
            lockout_opened = False
            if not correct:
                # Count prior wrong answers for this user on this clip
                prior_wrong = c.execute(
                    "SELECT COUNT(*) AS n FROM clip_views WHERE user_id = ? AND clip_id = ? AND answered_correctly = 0",
                    (user["id"], clip_id),
                ).fetchone()["n"]
                # We just inserted one — so prior_wrong == 1 means this is the first wrong, replay required
                if prior_wrong >= 2:
                    log_event(c, user["id"], "lockout_open_pending", clip_id, {"reason": "clip_gate_failure"})
                    lockout_opened = True
                else:
                    must_replay = True

        return {"correct": correct, "must_replay": must_replay, "lockout_opened": lockout_opened}


# --- Debug endpoints for tests ---

debug_router = APIRouter(prefix="/api/compliance/_debug")


def _bind_debug_routes(require_user, db_factory):

    @debug_router.post("/seed_clip")
    def seed_clip(payload: SeedClipIn, user=Depends(require_user)):
        with db_factory() as c:
            c.execute(
                "INSERT OR REPLACE INTO multimedia_clips (id, duration_sec, lesson_id, title) VALUES (?, ?, ?, ?)",
                (payload.clip_id, payload.duration_sec, payload.lesson_id, payload.title),
            )
            c.execute("DELETE FROM clip_questions WHERE clip_id = ?", (payload.clip_id,))
            for q in payload.questions:
                c.execute(
                    "INSERT INTO clip_questions (clip_id, prompt, options_json, correct_index) VALUES (?, ?, ?, ?)",
                    (payload.clip_id, q.prompt, json.dumps(q.options), q.correct_index),
                )
        return {"ok": True, "clip_id": payload.clip_id, "questions": len(payload.questions)}

    @debug_router.get("/clip_question/{qid}")
    def get_clip_question_truth(qid: int, user=Depends(require_user)):
        with db_factory() as c:
            q = c.execute("SELECT * FROM clip_questions WHERE id = ?", (qid,)).fetchone()
            if not q:
                raise HTTPException(404, "Not found")
        return {"id": q["id"], "prompt": q["prompt"], "correct_index": q["correct_index"]}
```

- [ ] **Step 4: Wire it into main.py**

Add to imports:

```python
from backend.compliance import multimedia as compliance_multimedia
```

In init_db():

```python
        compliance_multimedia.init_multimedia_schema(c)
```

After the identity bind block:

```python
compliance_multimedia._bind_routes(require_user, db)
compliance_multimedia._bind_debug_routes(require_user, db)
app.include_router(compliance_multimedia.router)
app.include_router(compliance_multimedia.debug_router)
```

- [ ] **Step 5: Run, expect pass**

```bash
pytest backend/tests/test_multimedia.py -v
```

Expected: 4 PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/compliance/multimedia.py backend/main.py backend/tests/test_multimedia.py
git commit -m "feat(compliance): multimedia clip + comprehension gate w/ replay+lockout"
```

---

### Task 14: Frontend clip-gate wrapper

**Files:**
- Create: `frontend/scripts/compliance/clip-gate.js`

- [ ] **Step 1: Write the wrapper**

Write to `frontend/scripts/compliance/clip-gate.js`:

```javascript
// Wraps a <video> element. When the clip's duration_sec > MIN, listens for
// 'ended' and presents the comprehension question. Wrong → replay; second
// wrong → server returns lockout flag; redirect to /lockout.html.
import { loadComplianceConfig } from './config.js';

export async function wrapClip(videoEl, clipId) {
  const cfg = await loadComplianceConfig();
  const minSec = cfg.multimedia_gate_min_seconds || 180;

  // Defer registration until metadata loads (need duration_sec)
  if (videoEl.readyState < 1) {
    await new Promise(res => videoEl.addEventListener('loadedmetadata', res, { once: true }));
  }
  if ((videoEl.duration || 0) <= minSec) return;

  videoEl.addEventListener('ended', async () => {
    const r = await fetch(`/api/compliance/clips/${encodeURIComponent(clipId)}`, { credentials: 'include' });
    if (!r.ok) return;
    const data = await r.json();
    await presentQuestion(videoEl, clipId, data.question);
  });
}

async function presentQuestion(videoEl, clipId, q) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(15,19,28,0.85); z-index: 99999;
      display: flex; align-items: center; justify-content: center;
    `;
    const optsHtml = q.options.map((o, i) => `
      <button data-idx="${i}" class="opt-btn" style="display:block;width:100%;text-align:left;
        padding:10px;margin:6px 0;border:1px solid #ccc;border-radius:6px;background:white;cursor:pointer;">${o}</button>
    `).join('');
    overlay.innerHTML = `
      <div style="background:#fbfaf6;border-radius:14px;padding:28px;max-width:540px;width:90%;">
        <h3 style="margin:0 0 16px;">Quick check</h3>
        <p style="font-size:17px;margin:0 0 16px;">${q.prompt}</p>
        <div id="opts">${optsHtml}</div>
        <p id="msg" style="margin-top:12px;min-height:1.2em;"></p>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const r = await fetch(`/api/compliance/clips/${encodeURIComponent(clipId)}/view`, {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ finished: true, question_id: q.id, answer_index: idx }),
        });
        const body = await r.json();
        if (body.lockout_opened) { location.href = '/lockout.html'; return; }
        if (body.correct) {
          overlay.remove(); resolve(true); return;
        }
        if (body.must_replay) {
          overlay.querySelector('#msg').textContent = 'Not quite — replaying the clip.';
          setTimeout(() => {
            overlay.remove();
            videoEl.currentTime = 0;
            videoEl.play();
            resolve(false);
          }, 1500);
        }
      });
    });
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/scripts/compliance/clip-gate.js
git commit -m "feat(compliance,frontend): clip-gate wrapper for <video> elements"
```

(Note: no clips are registered yet — wrapper is a no-op until content authors add clips. This is intentional per spec.)

---

## Phase 5 — Lockouts + admin

### Task 15: Lockouts schema + state + middleware

**Files:**
- Create: `backend/compliance/lockouts.py`
- Modify: `backend/main.py` (init + middleware + admin role enforcement)
- Modify: `backend/compliance/identity.py` (open lockout for real)
- Modify: `backend/compliance/multimedia.py` (open lockout for real)
- Create: `backend/tests/test_lockouts.py`

- [ ] **Step 1: Write the failing test**

Write to `backend/tests/test_lockouts.py`:

```python
def test_open_lockout_blocks_non_allowlisted_routes(signed_up_client):
    # Use the debug endpoint to force-open a lockout
    r = signed_up_client.post("/api/compliance/_debug/open_lockout", json={"reason": "manual"})
    assert r.status_code == 200

    r2 = signed_up_client.post("/api/progress/lesson", json={"lesson_id": "1.1", "minutes": 30, "xp": 50})
    assert r2.status_code == 423, r2.text

    # Allowlisted endpoints still work
    r3 = signed_up_client.get("/api/me")
    assert r3.status_code == 200
    r4 = signed_up_client.get("/api/compliance/lockouts/me")
    assert r4.status_code == 200
    assert r4.json()["open"] is True
    assert r4.json()["reason"] == "manual"


def test_lockout_close_via_admin_clears_block(signed_up_client):
    # Open a lockout
    signed_up_client.post("/api/compliance/_debug/open_lockout", json={"reason": "manual"})
    # Promote the same user to admin (via debug)
    signed_up_client.post("/api/compliance/_debug/set_admin")
    # As admin, close it
    open_row = signed_up_client.get("/api/compliance/lockouts/me").json()
    lid = open_row["id"]
    r = signed_up_client.post(f"/api/admin/lockouts/{lid}/close", json={"notes": "verified"})
    assert r.status_code == 200, r.text

    r2 = signed_up_client.post("/api/progress/lesson", json={"lesson_id": "1.1", "minutes": 30, "xp": 50})
    assert r2.status_code in (200, 409)  # 409 if minute floor hits; either is "not 423"


def test_identity_threshold_actually_opens_lockout(signed_up_client):
    # Seed five answers
    signed_up_client.post("/api/compliance/identity/seed", json={"answers": [
        {"prompt": "favorite_color",      "answer": "Blue"},
        {"prompt": "first_pet",           "answer": "Fluffy"},
        {"prompt": "city_of_birth",       "answer": "Dallas"},
        {"prompt": "elementary_school",   "answer": "Lakewood"},
        {"prompt": "favorite_food_child", "answer": "Tacos"},
    ]})
    # Force 11 wrong answers in a row → past warmup, 100% wrong → lockout
    for i in range(11):
        nxt = signed_up_client.get(f"/api/compliance/identity/next?lesson_id=L.{i}&force=1").json()
        signed_up_client.post("/api/compliance/identity/check", json={
            "challenge_id": nxt["challenge_id"], "answer": "WRONG", "response_ms": 1000,
        })

    me_lockout = signed_up_client.get("/api/compliance/lockouts/me").json()
    assert me_lockout["open"] is True
    assert me_lockout["reason"] == "identity_validation_threshold"
```

- [ ] **Step 2: Run, expect fail**

```bash
pytest backend/tests/test_lockouts.py -v
```

- [ ] **Step 3: Write the lockouts module**

Write to `backend/compliance/lockouts.py`:

```python
"""Subsystem 6 — lockout state machine per 16 TAC §84.501.

State: at most one open lockout per user. Open by identity-validation threshold
breach or clip-gate second failure. Close via admin endpoint.
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

LOCKOUT_ALLOWLIST_PREFIXES = (
    "/api/me",
    "/api/logout",
    "/api/compliance/lockouts/me",
    "/api/admin/",
    "/api/health",
    "/api/compliance/config",
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


def _bind_routes(require_user, require_admin, db_factory):

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
            log_event(c, row["user_id"], "lockout_closed", None, {"lockout_id": lockout_id, "closed_by": admin["email"]})
        return {"ok": True}


debug_router = APIRouter(prefix="/api/compliance/_debug")


def _bind_debug_routes(require_user, db_factory):

    class OpenIn(BaseModel):
        reason: str = Field(default="manual", max_length=80)

    @debug_router.post("/open_lockout")
    def debug_open(payload: OpenIn, user=Depends(require_user)):
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
```

- [ ] **Step 4: Wire into main.py**

Add to imports:

```python
from backend.compliance import lockouts as compliance_lockouts
```

In init_db():

```python
        compliance_lockouts.init_lockouts_schema(c)
```

Define `require_admin` (just below `require_user`):

```python
def require_admin(apex_sess: Optional[str] = Cookie(default=None, alias=SESSION_COOKIE)) -> sqlite3.Row:
    user = session_user(apex_sess)
    if not user or user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user
```

After existing bind blocks add:

```python
compliance_lockouts._bind_routes(require_user, require_admin, db)
compliance_lockouts._bind_debug_routes(require_user, db)
app.include_router(compliance_lockouts.router)
app.include_router(compliance_lockouts.admin_router)
app.include_router(compliance_lockouts.debug_router)
```

Register the middleware. Right after the existing `@app.middleware("http")` block, add:

```python
app.middleware("http")(compliance_lockouts.make_lockout_middleware(db, session_user, SESSION_COOKIE))
```

- [ ] **Step 5: Wire identity + multimedia to ACTUALLY open lockouts**

In `backend/compliance/identity.py`, find the line:

```python
            if total >= IDENTITY_WARMUP_MIN_TOTAL and (wrong / total) > IDENTITY_WRONG_RATE_LOCKOUT:
                # Only one open lockout at a time — the lockouts module will add the table later;
                # for now we just log it so the check returns the flag.
                log_event(c, user["id"], "lockout_open_pending", None, {
                    "reason": "identity_validation_threshold", "wrong": wrong, "total": total,
                })
                lockout_opened = True
```

Replace with:

```python
            if total >= IDENTITY_WARMUP_MIN_TOTAL and (wrong / total) > IDENTITY_WRONG_RATE_LOCKOUT:
                from backend.compliance.lockouts import open_lockout
                lid = open_lockout(c, user["id"], "identity_validation_threshold")
                lockout_opened = lid is not None
```

In `backend/compliance/multimedia.py`, find:

```python
                if prior_wrong >= 2:
                    log_event(c, user["id"], "lockout_open_pending", clip_id, {"reason": "clip_gate_failure"})
                    lockout_opened = True
```

Replace with:

```python
                if prior_wrong >= 2:
                    from backend.compliance.lockouts import open_lockout
                    lid = open_lockout(c, user["id"], "clip_gate_failure")
                    lockout_opened = lid is not None
```

- [ ] **Step 6: Run, expect pass**

```bash
pytest backend/tests/test_lockouts.py backend/tests/test_identity.py backend/tests/test_multimedia.py -v
```

Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add backend/compliance/lockouts.py backend/compliance/identity.py backend/compliance/multimedia.py backend/main.py backend/tests/test_lockouts.py
git commit -m "feat(compliance): lockouts state machine + middleware + admin close endpoint"
```

---

### Task 16: Admin lockouts page + admin_unlock CLI

**Files:**
- Create: `frontend/admin-lockouts.html`
- Create: `frontend/lockout.html` (the screen shown to locked-out users)
- Modify: `backend/admin_unlock.py` (convert to CLI)
- Create: `frontend/scripts/compliance/lockout.js`

- [ ] **Step 1: Convert admin_unlock.py to a CLI**

First read the existing content to understand its purpose, then replace:

Write to `backend/admin_unlock.py`:

```python
"""CLI: promote a user to admin by email.

Usage:
  python backend/admin_unlock.py <email>

Requires the user to have already signed up.
"""
import sys
import sqlite3
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = Path(os.environ.get("APEX_DB_PATH", str(ROOT / "backend" / "apex.db")))


def main():
    if len(sys.argv) != 2:
        print("Usage: python backend/admin_unlock.py <email>", file=sys.stderr)
        sys.exit(2)
    email = sys.argv[1].lower().strip()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    row = conn.execute("SELECT id, email, role FROM users WHERE LOWER(email) = ?", (email,)).fetchone()
    if not row:
        print(f"No user with email {email}", file=sys.stderr)
        sys.exit(1)
    if row["role"] == "admin":
        print(f"User {email} is already admin.")
        return
    conn.execute("UPDATE users SET role = 'admin' WHERE id = ?", (row["id"],))
    conn.commit()
    print(f"Promoted {email} to admin.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Write admin-lockouts.html**

Write to `frontend/admin-lockouts.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Lockouts · APEX Admin</title>
  <link rel="stylesheet" href="styles/app.css">
</head>
<body>
  <main class="container narrow" style="padding:48px 16px;">
    <h1>Open lockouts</h1>
    <p style="color:#5d6776;">Students whose accounts are paused pending identity verification or clip-gate failure.</p>
    <table style="width:100%;border-collapse:collapse;margin-top:16px;">
      <thead><tr>
        <th style="text-align:left;padding:8px;border-bottom:1px solid #ccc;">Email</th>
        <th style="text-align:left;padding:8px;border-bottom:1px solid #ccc;">Reason</th>
        <th style="text-align:left;padding:8px;border-bottom:1px solid #ccc;">Opened</th>
        <th></th>
      </tr></thead>
      <tbody id="rows"></tbody>
    </table>
  </main>
  <script type="module">
    async function load() {
      const r = await fetch('/api/admin/lockouts', { credentials: 'include' });
      if (r.status === 403) { document.body.innerHTML = '<p style="padding:40px;">Admin access required.</p>'; return; }
      const rows = await r.json();
      document.getElementById('rows').innerHTML = rows.map(row => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${row.email}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${row.reason}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${row.opened_at}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">
            <button data-id="${row.id}" class="close-btn">Close</button>
          </td>
        </tr>
      `).join('') || '<tr><td colspan="4" style="padding:24px;color:#5d6776;">No open lockouts.</td></tr>';

      document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const notes = prompt('Close note?') || '';
          const r = await fetch(`/api/admin/lockouts/${btn.dataset.id}/close`, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes }),
          });
          if (r.ok) load();
        });
      });
    }
    load();
  </script>
</body>
</html>
```

- [ ] **Step 3: Write the lockout screen**

Write to `frontend/lockout.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Account paused · APEX</title>
  <link rel="stylesheet" href="styles/app.css">
</head>
<body>
  <main class="container narrow" style="padding:80px 16px;text-align:center;">
    <h1>Your account is paused</h1>
    <p style="color:#5d6776;max-width:480px;margin:16px auto;">
      Per Texas Administrative Code §84.501, your course access is temporarily paused while our team verifies your identity.
      Please email <a href="mailto:support@apex.example">support@apex.example</a> to resolve this.
    </p>
    <p id="info" style="color:#5d6776;margin-top:16px;font-size:14px;"></p>
  </main>
  <script type="module">
    fetch('/api/compliance/lockouts/me', { credentials: 'include' })
      .then(r => r.json())
      .then(d => {
        if (d.open) {
          document.getElementById('info').textContent = `Reason: ${d.reason} · Opened: ${d.opened_at}`;
        } else {
          location.href = '/dashboard.html';
        }
      });
  </script>
</body>
</html>
```

- [ ] **Step 4: Write the 423-interceptor**

Write to `frontend/scripts/compliance/lockout.js`:

```javascript
// Wraps fetch globally. Any /api/* response with status 423 redirects to /lockout.html.
const _origFetch = window.fetch.bind(window);

window.fetch = async (...args) => {
  const res = await _origFetch(...args);
  if (res.status === 423) {
    try {
      const u = typeof args[0] === 'string' ? args[0] : args[0].url || '';
      if (u.includes('/api/') && !location.pathname.endsWith('/lockout.html')) {
        location.href = '/lockout.html';
      }
    } catch (_) {}
  }
  return res;
};

export const lockoutInterceptorInstalled = true;
```

- [ ] **Step 5: Commit**

```bash
git add backend/admin_unlock.py frontend/admin-lockouts.html frontend/lockout.html frontend/scripts/compliance/lockout.js
git commit -m "feat(compliance): admin lockouts page + lockout screen + 423 fetch interceptor"
```

---

## Phase 6 — Operating-hours soft enforcement

### Task 17: Hours banner + outside-hours audit event

**Files:**
- Create: `frontend/scripts/compliance/hours-banner.js`

- [ ] **Step 1: Write the banner**

Write to `frontend/scripts/compliance/hours-banner.js`:

```javascript
// Operating-hours soft-enforce: §84.600 limits instruction 5 a.m. – 11 p.m. local.
// We show a banner; we do NOT block. Outside-hours session start is logged.
import { loadComplianceConfig } from './config.js';

export async function checkHours() {
  const cfg = await loadComplianceConfig();
  const start = cfg.operating_hours_local?.start_hour ?? 5;
  const end = cfg.operating_hours_local?.end_hour ?? 23;
  const h = new Date().getHours();
  if (h >= start && h < end) return;

  // Outside hours — show banner + log event
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; background: #b45309; color: white;
    padding: 8px 16px; font-size: 14px; z-index: 9999; text-align: center;
  `;
  bar.textContent = `Texas rule §84.600 limits instruction to ${start}:00–${end}:00 local time. Time spent now may not count toward your course requirement.`;
  document.body.appendChild(bar);

  try {
    await fetch('/api/compliance/timer/event', {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'tab_visibility_change',  // reusing existing allowed type as carrier
        lesson_id: null,
        payload: { outside_hours: true, local_hour: h },
      }),
    });
  } catch (_) {}
}
```

Wait — the spec wants a distinct event type for outside-hours. Update the ALLOWED_EVENT_TYPES in `backend/compliance/timer.py` to include `"outside_hours_session_started"`:

In `backend/compliance/timer.py`, modify the set:

```python
ALLOWED_EVENT_TYPES = {
    "tab_visibility_change",
    "tab_multi_detected",
    "devtools_open_suspected",
    "paste_into_quiz",
    "rapid_input_burst",
    "time_pause",
    "time_resume",
    "outside_hours_session_started",
}
```

Then fix the banner script to use the proper event type:

In `frontend/scripts/compliance/hours-banner.js`, change `event_type: 'tab_visibility_change'` to `event_type: 'outside_hours_session_started'`.

- [ ] **Step 2: Commit**

```bash
git add backend/compliance/timer.py frontend/scripts/compliance/hours-banner.js
git commit -m "feat(compliance): outside-hours soft-enforcement banner + audit event type"
```

---

## Phase 7 — Polish, integration, smoke

### Task 18: Wire all compliance scripts via app.js bootstrap

**Files:**
- Modify: `frontend/scripts/app.js` (add compliance bootstrap)
- Modify: `frontend/dashboard.html`, `frontend/roadmap.html`, `frontend/lesson.html`, `frontend/topic.html`, `frontend/drive.html`, `frontend/dmv-test.html` (include lockout + hours scripts on every authenticated page)

- [ ] **Step 1: Add compliance bootstrap to app.js**

In `frontend/scripts/app.js`, at the top of the file, add:

```javascript
// Compliance bootstrap — runs on every page that imports app.js
import('./compliance/config.js').then(m => m.loadComplianceConfig()).catch(() => {});
import('./compliance/lockout.js').catch(() => {});
import('./compliance/hours-banner.js').then(m => m.checkHours()).catch(() => {});
```

- [ ] **Step 2: Convert app.js to a module if it isn't already**

Check existing pages — if `<script src="scripts/app.js">` is used (not `type="module"`), change every reference to `<script type="module" src="scripts/app.js">`. Pages to update: every page in `frontend/*.html` that includes app.js.

Use grep:

```bash
grep -l "scripts/app.js" frontend/*.html
```

For each result, change `<script src="scripts/app.js">` → `<script type="module" src="scripts/app.js">`.

- [ ] **Step 3: Manual smoke**

```bash
python -m uvicorn backend.main:app --reload --port 8000
```

Open browser dev tools → Network. Visit `/dashboard.html` → verify a single `/api/compliance/config` request. Visit at 11:30 p.m. local (or set your system clock) → verify banner appears + `/api/compliance/timer/event` POST with `outside_hours_session_started`.

- [ ] **Step 4: Commit**

```bash
git add frontend/scripts/app.js frontend/*.html
git commit -m "feat(compliance,frontend): bootstrap compliance config + lockout interceptor + hours banner globally"
```

---

### Task 19: End-to-end smoke test

**Files:**
- Create: `backend/tests/test_smoke_e2e.py`

- [ ] **Step 1: Write the smoke test**

Write to `backend/tests/test_smoke_e2e.py`:

```python
"""End-to-end smoke: signup → identity seed → start lesson → tick time
→ get identity challenge → answer → mark lesson complete → admin closes a forced lockout.
"""

def test_full_compliance_flow(signed_up_client):
    # 1. Seed identity
    r = signed_up_client.post("/api/compliance/identity/seed", json={"answers": [
        {"prompt": "favorite_color",      "answer": "blue"},
        {"prompt": "first_pet",           "answer": "fluffy"},
        {"prompt": "city_of_birth",       "answer": "dallas"},
        {"prompt": "elementary_school",   "answer": "lakewood"},
        {"prompt": "favorite_food_child", "answer": "tacos"},
    ]})
    assert r.status_code == 200

    # 2. Configure ourselves as admin too (so we can hit admin endpoints)
    signed_up_client.post("/api/compliance/_debug/set_admin")

    # 3. Tick 30 minutes of active time on lesson 1.1
    for _ in range(60):  # 60 × 30s = 30 min
        signed_up_client.post("/api/compliance/timer/tick", json={
            "lesson_id": "1.1", "seconds": 30, "signals": [],
        })

    # 4. Try to mark complete — should pass now that minute floor is met
    r = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.1", "minutes": 0, "xp": 50,
    })
    assert r.status_code == 200, r.text

    # 5. Force-open a lockout, verify subsequent API call gets 423
    signed_up_client.post("/api/compliance/_debug/open_lockout", json={"reason": "manual"})
    blocked = signed_up_client.post("/api/progress/lesson", json={"lesson_id": "1.2", "minutes": 0, "xp": 0})
    assert blocked.status_code == 423

    # 6. Admin closes the lockout
    info = signed_up_client.get("/api/compliance/lockouts/me").json()
    lid = info["id"]
    closed = signed_up_client.post(f"/api/admin/lockouts/{lid}/close", json={"notes": "ok"})
    assert closed.status_code == 200

    # 7. After close, the previously-blocked call returns its normal response
    after = signed_up_client.post("/api/progress/lesson", json={"lesson_id": "1.2", "minutes": 0, "xp": 0})
    assert after.status_code in (200, 409)  # 409 if minute floor hits, 200 if not registered
```

- [ ] **Step 2: Run all tests together**

```bash
pytest backend/tests/ -v
```

Expected: every test passes.

- [ ] **Step 3: Commit**

```bash
git add backend/tests/test_smoke_e2e.py
git commit -m "test(compliance): end-to-end smoke covering full compliance flow"
```

---

### Task 20: README update + close out

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a compliance section to README**

In `README.md`, after the existing "Strategic context" section, append a new section:

```markdown
---

## TDLR compliance engine

Per `docs/superpowers/specs/2026-05-11-tdlr-ami-compliance-engine-design.md` and 16 TAC §84.501, APEX implements an Alternative Method of Instruction (AMI) compliance engine. The engine lives in `backend/compliance/` and `frontend/scripts/compliance/`.

**Subsystems:**
1. **Identity validation** — personal questions registered at signup; one challenge per chapter, 90-second window, lockout if cumulative wrong-rate >30% past 10-challenge warmup.
2. **Multimedia comprehension gates** — clips >180s require a comprehension question on completion. Wrong → replay; second wrong → lockout. Engine ready; no clips registered yet.
3. **Anti-skip timer enforcement** — active-time accumulator (pauses on tab-blur, document-hidden, idle >60s) + server-side minimum-minutes floor at chapter completion.
4. **Mastery threshold (70%)** — single source of truth in `backend/compliance/mastery.py`, surfaced to frontend via `/api/compliance/config`.
5. **Audit event log** — append-only `audit_events` with 3-year retention timestamp per §84.81.
6. **Lockouts** — at most one open per user; FastAPI middleware returns 423 on non-allowlisted routes; admin closes via `/admin/lockouts/{id}/close`.
7. **Operating-hours soft enforce** — 5 a.m.–11 p.m. banner + audit event; does not block.

**Not yet implemented** (TDLR-submission blockers, content/business work, not engine work):
- Restructure curriculum 10 → 12 POI-DE-aligned modules
- Mandated content: human trafficking, anatomical gifts, SB 1366 work-zone, street racing §545.420, TX Driving with Disabilities Program, Community Safety Education Act
- TDLR provider license application (Versa, $500 + $300/endorsement, $10K bond on DES138N)
- AMI course approval filing
- Electronic certificate template pre-approval + DE-964 number ordering
- Module-1 mastery → DE-964 Learner-License-half issuance flow
- Texas-licensed education attorney review

**Running the test suite:**

```bash
pip install -r backend/requirements.txt
pytest backend/tests/ -v
```

**Promoting a user to admin (for closing lockouts):**

```bash
python backend/admin_unlock.py user@example.com
```

After promotion, the admin can visit `/admin-lockouts.html` to view + close lockouts.

**Updating the per-chapter minute floors after editing `curriculum.js`:**

```bash
python scripts/sync_curriculum_minutes.py
```

Commit the regenerated `backend/compliance/curriculum_minutes.json` alongside the curriculum change.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document TDLR compliance engine in README"
```

---

## Self-review checklist (for the executing agent — run BEFORE Task 1)

- [ ] Spec coverage: Each of the 8 subsystems in the spec maps to at least one task above (config, audit, mastery, timer, identity, multimedia, lockouts, hours).
- [ ] Placeholder scan: No "TBD", "TODO", or "fill in later" remains.
- [ ] Type consistency: `db_factory`, `require_user`, `require_admin`, `log_event`, `passes_mastery`, `open_lockout`, `current_lockout` are defined once and referenced with the same signature throughout.
- [ ] Out-of-scope items (curriculum restructure, SB 1366 content, TDLR application paperwork) appear in the README §"Not yet implemented" and in the spec §8.
- [ ] Every backend task ends with a passing pytest run.
- [ ] Every frontend-only task that lacks an automated test calls out the manual acceptance check explicitly.

---

## Notes on autonomous execution

The user explicitly delegated autonomous execution. The executing agent should:
1. Run each task's TDD cycle (write test → run fail → implement → run pass → commit) before moving to the next.
2. Commit after each task using the commit message in the plan — these are intentional checkpoints; do NOT batch commits across tasks.
3. If a test fails after implementation in a way the plan doesn't predict, STOP and surface the failure — do not paper over with a try/except. Use systematic-debugging if uncertain.
4. If a spec ambiguity is discovered mid-execution, write the new decision into the spec and reference it in the commit message; do not silently diverge.
5. After Task 20, report back to the user with: tests passing count, commit count, any deviations from plan, and a verification command list they can run to sanity-check.
