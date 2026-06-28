"""Subsystem 2 - multimedia comprehension gates per 16 TAC SS 84.501.

Any clip > 180 seconds requires a comprehension question on completion.
Wrong answer -> student must replay the clip. Second wrong answer -> lockout.

Authoring flow: register a clip via the _debug/seed_clip endpoint (or directly
in DB) with at least 4 questions. Currently zero clips are registered; the
engine is in place for when long-form content is authored.
"""
from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, conlist

from backend.compliance.audit import log_event

router = APIRouter(prefix="/api/compliance")
debug_router = APIRouter(prefix="/api/compliance/_debug")

RETENTION_DAYS = 365 * 3


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
    lesson_id: str = Field(min_length=1, max_length=40)
    title: Optional[str] = Field(default=None, max_length=120)
    questions: conlist(QuestionSpec, min_length=4, max_length=12)


def bind_routes(require_user, db_factory):

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

            retain_until = (datetime.utcnow() + timedelta(days=RETENTION_DAYS)).isoformat()
            c.execute(
                "INSERT INTO clip_views (user_id, clip_id, finished_at, question_id, answered_correctly, retain_until) "
                "VALUES (?, ?, ?, ?, ?, ?)",
                (user["id"], clip_id, datetime.utcnow().isoformat(), payload.question_id,
                 1 if correct else 0, retain_until),
            )
            log_event(c, user["id"],
                      "clip_question_correct" if correct else "clip_question_wrong",
                      clip_id,
                      {"question_id": payload.question_id, "answer_index": payload.answer_index})

            must_replay = False
            lockout_opened = False
            if not correct:
                # Count prior WRONG views (this row already inserted)
                prior_wrong = c.execute(
                    "SELECT COUNT(*) AS n FROM clip_views "
                    "WHERE user_id = ? AND clip_id = ? AND answered_correctly = 0",
                    (user["id"], clip_id),
                ).fetchone()["n"]
                if prior_wrong >= 2:
                    try:
                        from backend.compliance.lockouts import open_lockout
                        lid = open_lockout(c, user["id"], "clip_gate_failure")
                        lockout_opened = lid is not None
                    except ImportError:
                        log_event(c, user["id"], "lockout_open_pending", clip_id,
                                  {"reason": "clip_gate_failure"})
                        lockout_opened = True
                else:
                    must_replay = True

        return {"correct": correct, "must_replay": must_replay, "lockout_opened": lockout_opened}


def bind_debug_routes(require_user, db_factory):

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
