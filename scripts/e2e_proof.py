"""End-to-end proof: exercise every student action against a real chapter,
using the FastAPI TestClient against a throwaway DB. Proves the full happy path
AND the anti-skip enforcement actually works on live curriculum data.

Run: python scripts/e2e_proof.py
"""
import os
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

# Fresh throwaway DB
tmp = tempfile.mkdtemp()
os.environ["APEX_DB_PATH"] = str(Path(tmp) / "e2e.db")

from fastapi.testclient import TestClient
from backend import main

client = TestClient(main.app)
ok = 0
fail = 0


def check(label, cond):
    global ok, fail
    if cond:
        ok += 1
        print(f"  PASS  {label}")
    else:
        fail += 1
        print(f"  FAIL  {label}")


print("=== APEX End-to-End Proof ===\n")

# 1. Signup
r = client.post("/api/signup", json={"email": "proof@example.com", "password": "correcthorse1", "name": "Proof", "role": "teen", "language": "en", "date_of_birth": "2008-01-01"})
check("signup returns 200", r.status_code == 200)
check("signup returns user + progress", "user" in r.json() and "progress" in r.json())

# 1b. Checkout the PTDE plan so the user is entitled to the teen track.
r = client.post("/api/checkout", json={"sku": "ptde"})
check("checkout grants ptde entitlement", r.status_code == 200 and "ptde" in r.json().get("entitlements", []))

# 2. Identity seed (required before lessons)
r = client.post("/api/compliance/identity/seed", json={"answers": [
    {"prompt": "favorite_color", "answer": "blue"},
    {"prompt": "first_pet", "answer": "rex"},
    {"prompt": "city_of_birth", "answer": "dallas"},
    {"prompt": "elementary_school", "answer": "lakewood"},
    {"prompt": "favorite_food_child", "answer": "tacos"},
]})
check("identity seed accepts 5 questions", r.status_code == 200 and r.json().get("seeded") == 5)

# 3. Compliance config reachable
r = client.get("/api/compliance/config")
check("compliance config returns mastery_threshold 0.70", r.status_code == 200 and r.json()["mastery_threshold"] == 0.70)

# 4. Anti-skip: try to complete chapter 1.1 (floor 30 min) with no time -> 409
r = client.post("/api/progress/lesson", json={"lesson_id": "1.1", "minutes": 30, "xp": 50})
check("completing 1.1 with no logged time is BLOCKED (409)", r.status_code == 409)
if r.status_code == 409:
    check("409 reports correct required_seconds (1800)", r.json()["detail"]["required_seconds"] == 1800)

# 5. Timer status for 1.1 reflects the floor
r = client.get("/api/compliance/timer/status?lesson_id=1.1")
check("timer status shows 1800s required, 0 accumulated, not met", r.status_code == 200 and r.json()["required_seconds"] == 1800 and r.json()["accumulated_seconds"] == 0 and r.json()["met"] is False)

# 6. Tick the timer to the floor (1800s via 15 x 120s ticks)
for _ in range(15):
    client.post("/api/compliance/timer/tick", json={"lesson_id": "1.1", "seconds": 120, "signals": []})
r = client.get("/api/compliance/timer/status?lesson_id=1.1")
check("after ticking, timer status shows met=True", r.status_code == 200 and r.json()["met"] is True)

# 7. Now completing 1.1 succeeds
r = client.post("/api/progress/lesson", json={"lesson_id": "1.1", "minutes": 30, "xp": 50})
check("completing 1.1 after meeting floor succeeds (200)", r.status_code == 200)

# 8. Completion recorded + XP awarded
r = client.get("/api/me")
prog = r.json()["progress"]
check("1.1 appears in completedLessons", "1.1" in prog["completedLessons"])
check("XP was awarded (>0)", prog["xp"] > 0)

# 9. Identity challenge fires + can be answered correctly
nxt = client.get("/api/compliance/identity/next?lesson_id=2.1&force=1").json()
check("identity challenge issued for a lesson", nxt is not None and "challenge_id" in nxt)
if nxt:
    answers = {"What is your favorite color?": "blue", "What was your first pet's name?": "rex",
               "In what city were you born?": "dallas", "What is the name of your elementary school?": "lakewood",
               "What was your favorite food as a child?": "tacos"}
    ans = answers.get(nxt["prompt"], "blue")
    r = client.post("/api/compliance/identity/check", json={"challenge_id": nxt["challenge_id"], "answer": ans, "response_ms": 4000})
    check("correct identity answer accepted", r.status_code == 200 and r.json()["correct"] is True)

# 10. Topic-progress mastery gate at 70%
r = client.post("/api/topics/2.1/progress", json={"quiz_score": 0.66})
r2 = client.post("/api/topics/2.1/progress", json={"drive_done": True})
check("drive_done blocked at 66% quiz (409)", r2.status_code == 409)
client.post("/api/topics/2.1/progress", json={"quiz_score": 0.70})
r3 = client.post("/api/topics/2.1/progress", json={"drive_done": True})
check("drive_done accepted at 70% quiz (200)", r3.status_code == 200)

# 11. Audit trail recorded the time ticks
# (indirect: completion worked, which requires chapter_seconds populated by ticks)
r = client.get("/api/compliance/timer/status?lesson_id=1.1")
check("chapter_seconds persisted (>=1800)", r.json()["accumulated_seconds"] >= 1800)

print(f"\n=== RESULT: {ok} passed, {fail} failed ===")
sys.exit(1 if fail else 0)
