"""Append-only audit event log - subsystem 5 of the AMI compliance engine.

Schema is created on import via init_audit_schema() called from main.init_db().
Retention is 3 years per 16 TAC SS 84.81.

Tamper-evidence: every row stores a SHA-256 hash of
(prev_row_hash || event_type || user_id || lesson_id || payload_json || occurred_at)
chained to the immediately-preceding row's row_hash. If anyone edits or removes
a row, every subsequent row's hash breaks. A TDLR auditor can verify the chain
end-to-end via /api/compliance/_debug/audit/verify.
"""
from __future__ import annotations

import hashlib
import json
import sqlite3
from datetime import datetime, timedelta
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

RETENTION_DAYS = 365 * 3
GENESIS_HASH = "0" * 64  # the hash that precedes the very first row


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
            prev_hash TEXT,
            row_hash TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_audit_user_time ON audit_events(user_id, occurred_at);
        CREATE INDEX IF NOT EXISTS idx_audit_type ON audit_events(event_type);
        """
    )
    # Backfill columns on a pre-existing schema (idempotent).
    for col in ("prev_hash", "row_hash"):
        try:
            db.execute(f"ALTER TABLE audit_events ADD COLUMN {col} TEXT")
        except sqlite3.OperationalError:
            pass  # column already exists


def _hash_row(
    prev_hash: str,
    user_id: int,
    event_type: str,
    lesson_id: Optional[str],
    payload_json: Optional[str],
    occurred_at: str,
) -> str:
    """Deterministic SHA-256 over the canonical row payload."""
    h = hashlib.sha256()
    h.update(prev_hash.encode("utf-8"))
    h.update(b"|")
    h.update(str(user_id).encode("utf-8"))
    h.update(b"|")
    h.update(event_type.encode("utf-8"))
    h.update(b"|")
    h.update((lesson_id or "").encode("utf-8"))
    h.update(b"|")
    h.update((payload_json or "").encode("utf-8"))
    h.update(b"|")
    h.update(occurred_at.encode("utf-8"))
    return h.hexdigest()


def log_event(
    db: sqlite3.Connection,
    user_id: int,
    event_type: str,
    lesson_id: Optional[str] = None,
    payload: Optional[dict[str, Any]] = None,
) -> int:
    """Append one row to audit_events with a hash chain. Returns the new row id."""
    now = datetime.utcnow().isoformat()
    retain_until = (datetime.utcnow() + timedelta(days=RETENTION_DAYS)).isoformat()
    payload_json = json.dumps(payload, sort_keys=True) if payload is not None else None

    # Pull the most recent row's hash to chain from. NULL → use GENESIS_HASH.
    row = db.execute(
        "SELECT row_hash FROM audit_events ORDER BY id DESC LIMIT 1"
    ).fetchone()
    prev_hash = (row["row_hash"] if row and row["row_hash"] else None) or GENESIS_HASH
    row_hash = _hash_row(prev_hash, user_id, event_type, lesson_id, payload_json, now)

    cur = db.execute(
        "INSERT INTO audit_events "
        "(user_id, event_type, lesson_id, payload_json, occurred_at, retain_until, prev_hash, row_hash) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (user_id, event_type, lesson_id, payload_json, now, retain_until, prev_hash, row_hash),
    )
    return cur.lastrowid


def verify_chain(db: sqlite3.Connection, limit: Optional[int] = None) -> dict[str, Any]:
    """Walk the audit log and recompute each row's hash. Returns the index of
    the first broken row (if any) plus a summary. Safe to expose to admins."""
    q = "SELECT id, user_id, event_type, lesson_id, payload_json, occurred_at, prev_hash, row_hash FROM audit_events ORDER BY id"
    if limit:
        q += f" LIMIT {int(limit)}"
    expected_prev = GENESIS_HASH
    checked = 0
    for r in db.execute(q):
        if r["prev_hash"] != expected_prev:
            return {
                "ok": False, "checked": checked,
                "broken_at_id": r["id"],
                "reason": "prev_hash mismatch — a prior row was deleted or edited",
            }
        recomputed = _hash_row(
            r["prev_hash"], r["user_id"], r["event_type"], r["lesson_id"],
            r["payload_json"], r["occurred_at"],
        )
        if recomputed != r["row_hash"]:
            return {
                "ok": False, "checked": checked,
                "broken_at_id": r["id"],
                "reason": "row_hash mismatch — this row's content was edited",
            }
        expected_prev = r["row_hash"]
        checked += 1
    return {"ok": True, "checked": checked, "head_hash": expected_prev}


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

    @router.get("/audit/verify")
    def debug_verify_chain(limit: Optional[int] = None, user=Depends(require_user)):
        """Walk the audit hash chain and report the first broken row, if any.
        For a TDLR audit, this is the tamper-evidence proof: ok=True means no
        row has been altered or removed since it was written. Any user can run
        this; the underlying chain spans the whole table, not just this user."""
        with db_factory() as c:
            return verify_chain(c, limit=limit)
