"""Spaced repetition — tracks per-student question outcomes and resurfaces
missed questions as warmups in later chapters and weights them in the final
exam draw. Retention engine for the interactive rebuild.

question_key = "{chapter_id}:{quiz_index}" (stable, language-independent).
"""
from __future__ import annotations

import sqlite3
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from backend.compliance.audit import log_event

router = APIRouter(prefix="/api/compliance/spacedrep")

MAX_WARMUPS = 2  # how many prior misses to resurface per chapter entry


def init_spacedrep_schema(db: sqlite3.Connection) -> None:
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS question_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            question_key TEXT NOT NULL,
            correct INTEGER NOT NULL,        -- 0 or 1
            attempted_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_qattempts_user ON question_attempts(user_id);
        CREATE INDEX IF NOT EXISTS idx_qattempts_key ON question_attempts(user_id, question_key);
        """
    )


class AttemptIn(BaseModel):
    question_key: str = Field(min_length=1, max_length=40, pattern=r"^[A-Za-z0-9_.:\-]+$")
    correct: bool


def bind_routes(require_user, db_factory):

    @router.post("/attempt")
    def record_attempt(payload: AttemptIn, user=Depends(require_user)):
        with db_factory() as c:
            c.execute(
                "INSERT INTO question_attempts (user_id, question_key, correct) VALUES (?, ?, ?)",
                (user["id"], payload.question_key, 1 if payload.correct else 0),
            )
            log_event(c, user["id"], "question_attempt",
                      payload.question_key.split(":")[0] if ":" in payload.question_key else None,
                      {"question_key": payload.question_key, "correct": payload.correct})
        return {"ok": True}

    @router.get("/warmups")
    def get_warmups(exclude_lesson: Optional[str] = None, user=Depends(require_user)):
        """Return up to MAX_WARMUPS question_keys the student most recently MISSED
        and has not since gotten right. Excludes the current lesson's own keys so
        warmups are genuinely spaced (drawn from earlier chapters).
        """
        with db_factory() as c:
            rows = c.execute(
                "SELECT question_key, "
                "       MAX(CASE WHEN correct=1 THEN attempted_at END) AS last_right, "
                "       MAX(CASE WHEN correct=0 THEN attempted_at END) AS last_wrong "
                "FROM question_attempts WHERE user_id = ? "
                "GROUP BY question_key",
                (user["id"],),
            ).fetchall()
        due = []
        for r in rows:
            key = r["question_key"]
            if exclude_lesson and key.split(":")[0] == exclude_lesson:
                continue
            last_wrong = r["last_wrong"]
            last_right = r["last_right"]
            # "still missed" = has a wrong attempt, and no right attempt after it
            if last_wrong and (not last_right or last_right < last_wrong):
                due.append({"question_key": key, "last_wrong": last_wrong})
        # most-recently-missed first
        due.sort(key=lambda d: d["last_wrong"], reverse=True)
        return {"warmups": [d["question_key"] for d in due[:MAX_WARMUPS]]}

    @router.get("/missed")
    def get_all_missed(user=Depends(require_user)):
        """All currently-missed question_keys — used to weight the final exam draw."""
        with db_factory() as c:
            rows = c.execute(
                "SELECT question_key, "
                "       MAX(CASE WHEN correct=1 THEN attempted_at END) AS last_right, "
                "       MAX(CASE WHEN correct=0 THEN attempted_at END) AS last_wrong "
                "FROM question_attempts WHERE user_id = ? GROUP BY question_key",
                (user["id"],),
            ).fetchall()
        missed = [r["question_key"] for r in rows
                  if r["last_wrong"] and (not r["last_right"] or r["last_right"] < r["last_wrong"])]
        return {"missed": missed}
