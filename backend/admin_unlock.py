"""APEX admin one-shot: create-or-update a user and unlock everything.

Run from project root:
    python -m backend.admin_unlock <email> <password> [name]

Idempotent — safe to re-run. Uses the same password hashing the live app uses,
so the user can sign in normally afterwards.
"""
from __future__ import annotations

import json
import sqlite3
import sys
from datetime import datetime, timedelta
from pathlib import Path

from backend.main import DB_PATH, hash_password
from backend.billing import grant_entitlement
from backend.compliance.timer import credit_seconds, chapter_seconds_for

# ---- Curriculum chapter IDs (source of truth: backend/compliance/curriculum_minutes.json) ----
CHAPTER_IDS = [
    "1.1","1.2","1.3","1.4","1.5",
    "2.1","2.2","2.3","2.4",
    "3.1","3.2","3.3","3.4",
    "4.1","4.2","4.3","4.4","4.5",
    "5.1","5.2","5.3","5.4","5.5",
    "6.1","6.2","6.3","6.4","6.5",
    "7.1","7.2","7.3","7.4",
    "8.1","8.2","8.3","8.4","8.5",
    "9.1","9.2","9.3","9.4","9.5",
    "10.1","10.2","10.3","10.4",
    "11.1","11.2","11.3","11.4","11.5",
    "12.1","12.2","12.3",
]

# Identity questions seeded so the §84.501 challenge always passes for this
# test account. All answers normalize to "test".
IDENTITY_SEED = [
    ("favorite_color",      "What is your favorite color?",            "test"),
    ("first_pet",           "What was your first pet's name?",         "test"),
    ("city_of_birth",       "In what city were you born?",             "test"),
    ("elementary_school",   "What is the name of your elementary school?", "test"),
    ("favorite_teacher",    "What was your favorite teacher's last name?", "test"),
]

SHORT_IDS = [
    "s-pedestrian-popup","s-3-second-rule","s-yield-pentagon","s-blind-spot",
    "s-implied-consent","s-stop-distance-physics","s-right-on-red","s-hydroplane",
    "s-move-over","s-school-bus","s-night-glare","s-gdl-restrictions",
]

DRIVE_SCENARIOS = [
    "freedrive","parking","parallel_park","three_point","pedestrian","yellow",
    "lane_change","four_way","wet_weather","skid","checkpoint","finaltest",
]

GAME_CEILINGS = {"signs": 1500, "rightofway": 600, "hazard": 300}


def main():
    if len(sys.argv) < 3:
        print("usage: python -m backend.admin_unlock <email> <password> [name]")
        sys.exit(1)
    email = sys.argv[1].strip().lower()
    password = sys.argv[2]
    name = sys.argv[3] if len(sys.argv) >= 4 else email.split("@")[0]
    today = datetime.utcnow().date().isoformat()
    now = datetime.utcnow().isoformat()

    pw_hash = hash_password(password)

    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    c = conn.cursor()

    # 1) Create or update the user
    row = c.execute("SELECT id FROM users WHERE LOWER(email) = ?", (email,)).fetchone()
    if row:
        user_id = row["id"]
        c.execute(
            "UPDATE users SET password_hash = ?, name = ?, role = 'teen', language = 'en', state = 'TX' WHERE id = ?",
            (pw_hash, name, user_id),
        )
        print(f"  ✓ Updated existing user id={user_id} email={email}")
    else:
        c.execute(
            "INSERT INTO users (email, password_hash, name, role, language, state) "
            "VALUES (?, ?, ?, 'teen', 'en', 'TX')",
            (email, pw_hash, name),
        )
        user_id = c.lastrowid
        print(f"  ✓ Created user id={user_id} email={email}")

    # 1b) Grant the Parent-Taught Teen entitlement so the gating layer lets
    #     this user write to content endpoints (POST /api/lessons/complete, etc.)
    grant_entitlement(conn, user_id, "ptde", source="admin_unlock")
    print("  ✓ Entitlement granted: ptde (Parent-Taught Teen Driver Ed)")

    # 1c) Identity questions per §84.501 — seed with 5 known-answer prompts.
    #     All answers normalize to "test" so the challenge always passes.
    c.execute("DELETE FROM identity_questions WHERE user_id = ?", (user_id,))
    for prompt_id, prompt, ans in IDENTITY_SEED:
        c.execute(
            "INSERT INTO identity_questions (user_id, prompt_id, prompt, answer_norm) "
            "VALUES (?, ?, ?, ?)",
            (user_id, prompt_id, prompt, ans),
        )
    print(f"  ✓ Identity questions seeded ({len(IDENTITY_SEED)} prompts · answer: 'test')")

    # 2) Progress: max XP, level, long streak, all 32 hours credited
    c.execute(
        "INSERT INTO progress (user_id, xp, level, streak, last_active_date, drives_logged, total_drive_hours) "
        "VALUES (?, ?, ?, ?, ?, ?, ?) "
        "ON CONFLICT(user_id) DO UPDATE SET "
        "  xp = excluded.xp, level = excluded.level, streak = excluded.streak, "
        "  last_active_date = excluded.last_active_date, drives_logged = excluded.drives_logged, "
        "  total_drive_hours = excluded.total_drive_hours",
        (user_id, 9999, 30, 42, today, 30, 30.0),
    )
    print("  ✓ Progress: 9,999 XP · Lvl 30 · 42-day streak · 30 BTW hours")

    # 3) Mark every lesson complete + credit minutes (32 TDLR hrs = 32 * 55 = 1,760 min)
    minutes_per_chapter = max(40, (32 * 55) // len(CHAPTER_IDS))
    for cid in CHAPTER_IDS:
        c.execute(
            "INSERT OR IGNORE INTO completed_lessons (user_id, lesson_id, minutes) VALUES (?, ?, ?)",
            (user_id, cid, minutes_per_chapter),
        )
        c.execute(
            "INSERT INTO chapter_minutes (user_id, chapter_id, minutes) VALUES (?, ?, ?) "
            "ON CONFLICT(user_id, chapter_id) DO UPDATE SET minutes = excluded.minutes",
            (user_id, cid, minutes_per_chapter),
        )
    print(f"  ✓ Completed all {len(CHAPTER_IDS)} chapters · {minutes_per_chapter} min each")

    # 3b) chapter_seconds: the §84.501 active-time source of truth. Credit each
    #     chapter to its TDLR floor + a small buffer so finish gates clear.
    import json as _json
    from pathlib import Path as _Path
    floors_path = _Path(__file__).resolve().parent / "compliance" / "curriculum_minutes.json"
    try:
        floors = _json.loads(floors_path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        floors = {}
    seeded_floor_count = 0
    for cid in CHAPTER_IDS:
        floor_min = int(floors.get(cid, 30))
        target_seconds = floor_min * 60 + 30  # 30s buffer above the floor
        current = chapter_seconds_for(conn, user_id, cid)
        if current < target_seconds:
            credit_seconds(conn, user_id, cid, target_seconds - current)
        seeded_floor_count += 1
    print(f"  ✓ chapter_seconds: §84.501 floors met for {seeded_floor_count} chapters")

    # 4) Topic progress: everything done for every topic
    for cid in CHAPTER_IDS:
        c.execute(
            "INSERT INTO topic_progress (user_id, topic_id, shorts_watched, article_read, quiz_score, game_score, drive_done, completed, updated_at) "
            "VALUES (?, ?, ?, 1, 1.0, 1500, 1, 1, ?) "
            "ON CONFLICT(user_id, topic_id) DO UPDATE SET "
            "  shorts_watched = excluded.shorts_watched, article_read = 1, quiz_score = 1.0, "
            "  game_score = 1500, drive_done = 1, completed = 1, updated_at = excluded.updated_at",
            (user_id, cid, json.dumps(SHORT_IDS), now),
        )
    print(f"  ✓ Topic progress: all {len(CHAPTER_IDS)} topics 100% complete")

    # 5) Shorts watched: all of them
    for sid in SHORT_IDS:
        c.execute(
            "INSERT OR IGNORE INTO shorts_watched (user_id, short_id) VALUES (?, ?)",
            (user_id, sid),
        )
    print(f"  ✓ Shorts: all {len(SHORT_IDS)} marked watched")

    # 6) Game scores: ceiling for each
    for game_id, ceiling in GAME_CEILINGS.items():
        c.execute(
            "INSERT INTO game_scores (user_id, game_id, score, accuracy, duration_sec) VALUES (?, ?, ?, ?, ?)",
            (user_id, game_id, ceiling, 1.0, 60),
        )
    print(f"  ✓ Game scores: max for {', '.join(GAME_CEILINGS)}")

    # 7) Drives: one entry per scenario so simulator badges + recents populate
    for scn in DRIVE_SCENARIOS:
        c.execute(
            "INSERT INTO drives (user_id, scenario, car_id, duration_sec, distance_m, top_speed, "
            "checkpoints_hit, checkpoints_total, score) "
            "VALUES (?, ?, 'concept-exotic', 240, 1200, 65, 6, 6, 1200)",
            (user_id, scn),
        )
    print(f"  ✓ Drives: one logged for each of {len(DRIVE_SCENARIOS)} scenarios")

    # 8) Select the top car (level 25+ unlocks 'concept-exotic')
    c.execute(
        "INSERT INTO user_settings (user_id, selected_car_id) VALUES (?, 'concept-exotic') "
        "ON CONFLICT(user_id) DO UPDATE SET selected_car_id = excluded.selected_car_id",
        (user_id,),
    )
    print("  ✓ Selected car: Concept Z (top-tier, level 25 unlock)")

    # 9) BTW logbook: pre-populate ~10 verified drives totaling 30 hours
    base_date = datetime.utcnow().date()
    for i in range(10):
        d = (base_date - timedelta(days=i + 1)).isoformat()
        c.execute(
            "INSERT INTO btw_drives (user_id, date, start_time, end_time, duration_min, miles, "
            "is_night, weather, road_type, gps_start_lat, gps_start_lng, gps_end_lat, gps_end_lng, "
            "gps_verified, parent_name, parent_license, notes) "
            "VALUES (?, ?, '17:30', '20:30', 180, 60, ?, 'clear', 'mixed', "
            "30.2672, -97.7431, 30.4015, -97.7257, 1, 'Hassan Khan Sr.', 'TX-12345678', "
            "'Practice run · highway + city')",
            (user_id, d, 1 if i < 4 else 0),
        )
    print("  ✓ BTW logbook: 10 verified drives, 30 hours total (4 night)")

    conn.commit()
    conn.close()

    print()
    print(f"  Sign in at http://127.0.0.1:8000/login.html with:")
    print(f"    email:    {email}")
    print(f"    password: {password}")
    print()
    print("  Identity-challenge answer for any prompt: test")
    print("  Already entitled → checkout.html bounces straight to dashboard.html")


if __name__ == "__main__":
    main()
