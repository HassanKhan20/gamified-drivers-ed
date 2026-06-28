"""Subsystem 3 + 8 - anti-skip active-time accumulator and tamper-event logger.

The chapter_seconds table is the source of truth for "did this student spend the
required minutes on this chapter." Client posts /tick every ~30s with seconds of
active time; server caps per-tick delta at PER_TICK_CAP_SECONDS defensively.

Tab-visibility, focus, paste, multi-tab events post to /event and land in
audit_events.
"""
from __future__ import annotations

import sqlite3
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from backend.compliance.audit import log_event

router = APIRouter(prefix="/api/compliance/timer")

PER_TICK_CAP_SECONDS = 120  # defensive ceiling - accidental long tick gets capped

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


def init_timer_schema(db: sqlite3.Connection) -> None:
    """chapter_seconds: precise per-user/per-chapter active-time counter.

    The existing chapter_minutes table is kept for backward-compat UI display
    (int minutes) but is no longer the compliance source of truth.
    """
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS chapter_seconds (
            user_id INTEGER NOT NULL,
            chapter_id TEXT NOT NULL,
            seconds INTEGER DEFAULT 0,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, chapter_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_chapter_seconds_user ON chapter_seconds(user_id);
        """
    )


def chapter_seconds_for(db: sqlite3.Connection, user_id: int, chapter_id: str) -> int:
    row = db.execute(
        "SELECT seconds FROM chapter_seconds WHERE user_id = ? AND chapter_id = ?",
        (user_id, chapter_id),
    ).fetchone()
    return int(row["seconds"]) if row else 0


def credit_seconds(db: sqlite3.Connection, user_id: int, chapter_id: str, seconds: int) -> int:
    """Credit `seconds` to (user, chapter). Returns the new running total."""
    db.execute(
        "INSERT INTO chapter_seconds (user_id, chapter_id, seconds) VALUES (?, ?, ?) "
        "ON CONFLICT(user_id, chapter_id) DO UPDATE SET "
        "  seconds = seconds + excluded.seconds, "
        "  updated_at = CURRENT_TIMESTAMP",
        (user_id, chapter_id, seconds),
    )
    return chapter_seconds_for(db, user_id, chapter_id)


class TickIn(BaseModel):
    lesson_id: str = Field(min_length=1, max_length=40, pattern=r"^[A-Za-z0-9_.\-:]+$")
    seconds: int = Field(ge=0, le=600)
    signals: list[str] = Field(default_factory=list, max_length=32)


class TimerEventIn(BaseModel):
    event_type: str = Field(min_length=1, max_length=40)
    lesson_id: Optional[str] = Field(default=None, max_length=40, pattern=r"^[A-Za-z0-9_.\-:]+$")
    payload: Optional[dict[str, Any]] = None


def _load_curriculum_minutes() -> dict[str, int]:
    """Lazy-load floor manifest. Returns {} if file missing (e.g. tests)."""
    import json
    from pathlib import Path
    path = Path(__file__).resolve().parent / "curriculum_minutes.json"
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return {}


def bind_routes(require_user, db_factory):

    @router.post("/tick")
    def tick(payload: TickIn, user=Depends(require_user)):
        credited = min(payload.seconds, PER_TICK_CAP_SECONDS)
        with db_factory() as c:
            total = credit_seconds(c, user["id"], payload.lesson_id, credited)
            log_event(c, user["id"], "time_tick", payload.lesson_id, {
                "seconds_requested": payload.seconds,
                "seconds_credited": credited,
                "signals": payload.signals,
            })
        return {"ok": True, "credited_seconds": credited, "total_seconds": total}

    @router.get("/status")
    def status(lesson_id: str, user=Depends(require_user)):
        """Return the time-floor status for a lesson so the UI can render a
        countdown and gate the "next" button until the minimum is met.
        """
        floor_min = _load_curriculum_minutes().get(lesson_id)
        with db_factory() as c:
            total = chapter_seconds_for(c, user["id"], lesson_id)
        if floor_min is None:
            # No floor for this lesson_id - UI should not gate.
            return {
                "lesson_id": lesson_id,
                "required_seconds": 0,
                "accumulated_seconds": total,
                "remaining_seconds": 0,
                "met": True,
            }
        required = floor_min * 60
        return {
            "lesson_id": lesson_id,
            "required_seconds": required,
            "accumulated_seconds": total,
            "remaining_seconds": max(0, required - total),
            "met": total >= required,
        }

    @router.post("/event")
    def event(payload: TimerEventIn, user=Depends(require_user)):
        if payload.event_type not in ALLOWED_EVENT_TYPES:
            raise HTTPException(status_code=422, detail=f"Unknown event_type: {payload.event_type}")
        with db_factory() as c:
            log_event(c, user["id"], payload.event_type, payload.lesson_id, payload.payload)
        return {"ok": True}
