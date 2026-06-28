"""Append-only audit event log - subsystem 5 of the AMI compliance engine.

Schema is created on import via init_audit_schema() called from main.init_db().
Retention is 3 years per 16 TAC SS 84.81.
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


# --- Debug endpoints (used by tests; require auth) ---

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


def bind_routes(require_user, db_factory):
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
