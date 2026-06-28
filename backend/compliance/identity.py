"""Subsystem 1 - personal-validation identity questions per 16 TAC SS 84.501.

At registration the student picks >=5 prompts from CURATED_PROMPTS and provides
answers. Answers are stored as normalized strings (lowercased, whitespace
collapsed) - NOT password-hashed - because TDLR auditors must be able to read
what was stored to verify the validation flow.

Scheduling: one challenge per lesson; the first time a lesson is visited a
challenge is created with ~70% probability (force=1 in tests).

Lockout math: track cumulative (wrong, total). If total >= WARMUP and
(wrong / total) > THRESHOLD, the check returns lockout_opened=True (the
actual lockout row is added when the lockouts module is wired in Phase 5).
"""
from __future__ import annotations

import random
import re
import sqlite3
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, conlist

from backend.compliance.audit import log_event
from backend.compliance.config import (
    IDENTITY_RESPONSE_SECONDS,
    IDENTITY_WARMUP_MIN_TOTAL,
    IDENTITY_WRONG_RATE_LOCKOUT,
)

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
    {"id": "second_color",          "prompt": "What is your second-favorite color?"},
    {"id": "first_car",             "prompt": "What was the first car you drove?"},
    {"id": "best_friend_now",       "prompt": "Who is your best friend?"},
]

VALID_PROMPT_IDS = {p["id"] for p in CURATED_PROMPTS}
PROMPT_TEXT_BY_ID = {p["id"]: p["prompt"] for p in CURATED_PROMPTS}

_WHITESPACE_RX = re.compile(r"\s+")
RETENTION_DAYS = 365 * 3


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


class CheckIn(BaseModel):
    challenge_id: int
    answer: str = Field(min_length=1, max_length=120)
    response_ms: int = Field(ge=0, le=600_000)


def bind_routes(require_user, db_factory):

    @router.get("/prompts")
    def list_prompts():
        return {"prompts": CURATED_PROMPTS}

    @router.post("/seed")
    def seed(payload: SeedIn, user=Depends(require_user)):
        for item in payload.answers:
            if item.prompt not in VALID_PROMPT_IDS:
                raise HTTPException(status_code=422, detail=f"Unknown prompt id: {item.prompt}")
        with db_factory() as c:
            c.execute("DELETE FROM identity_questions WHERE user_id = ?", (user["id"],))
            for item in payload.answers:
                c.execute(
                    "INSERT INTO identity_questions (user_id, prompt_id, prompt, answer_norm) VALUES (?, ?, ?, ?)",
                    (user["id"], item.prompt, PROMPT_TEXT_BY_ID[item.prompt], normalize_answer(item.answer)),
                )
            log_event(c, user["id"], "identity_seeded", None, {"count": len(payload.answers)})
        return {"seeded": len(payload.answers)}

    @router.get("/next")
    def next_challenge(lesson_id: str, force: int = 0, user=Depends(require_user)):
        """Return a new challenge if one is due for this lesson, else null.

        Rule: at most one challenge per (user, lesson_id). On the first visit
        a challenge is created with ~70% probability, unless force=1.
        """
        with db_factory() as c:
            existing = c.execute(
                "SELECT id FROM identity_challenges WHERE user_id = ? AND lesson_id = ?",
                (user["id"], lesson_id),
            ).fetchone()
            if existing:
                return None

            if not force and random.random() > 0.70:
                return None

            qs = c.execute(
                "SELECT id, prompt FROM identity_questions WHERE user_id = ? "
                "ORDER BY RANDOM() LIMIT 1",
                (user["id"],),
            ).fetchone()
            if not qs:
                raise HTTPException(status_code=409, detail="Identity questions not seeded")

            retain_until = (datetime.utcnow() + timedelta(days=RETENTION_DAYS)).isoformat()
            cur = c.execute(
                "INSERT INTO identity_challenges (user_id, question_id, lesson_id, retain_until) "
                "VALUES (?, ?, ?, ?)",
                (user["id"], qs["id"], lesson_id, retain_until),
            )
            challenge_id = cur.lastrowid
            log_event(c, user["id"], "identity_q_asked", lesson_id,
                      {"challenge_id": challenge_id, "question_id": qs["id"]})

        return {
            "challenge_id": challenge_id,
            "prompt": qs["prompt"],
            "response_seconds": IDENTITY_RESPONSE_SECONDS,
        }

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
            correct_match = (
                normalize_answer(payload.answer) == ch["answer_norm"]
                and not timed_out
            )

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

            # Lockout math: total + wrong over the user's full history
            row = c.execute(
                "SELECT COUNT(*) AS total, "
                "       SUM(CASE WHEN correct=0 THEN 1 ELSE 0 END) AS wrong "
                "FROM identity_challenges WHERE user_id = ? AND answered_at IS NOT NULL",
                (user["id"],),
            ).fetchone()
            total = row["total"] or 0
            wrong = row["wrong"] or 0
            lockout_opened = False
            if total >= IDENTITY_WARMUP_MIN_TOTAL and total > 0 and (wrong / total) > IDENTITY_WRONG_RATE_LOCKOUT:
                # Phase 5 wires the actual lockouts table; for now, log the trigger.
                # When lockouts.open_lockout is available, replace this block.
                try:
                    from backend.compliance.lockouts import open_lockout
                    lid = open_lockout(c, user["id"], "identity_validation_threshold")
                    lockout_opened = lid is not None
                except ImportError:
                    log_event(c, user["id"], "lockout_open_pending", None, {
                        "reason": "identity_validation_threshold",
                        "wrong": wrong, "total": total,
                    })
                    lockout_opened = True

        return {"correct": correct_match, "timed_out": timed_out, "lockout_opened": lockout_opened}
