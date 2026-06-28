"""End-to-end smoke: full TDLR compliance flow.

Covers:
  1. Signup -> identity seed.
  2. Tick 30 minutes onto chapter 1.1 via timer.
  3. Mark chapter complete - succeeds because minute floor met.
  4. Force-open a lockout -> next API call returns 423.
  5. Self-promote to admin and close the lockout.
  6. After close, previously-blocked endpoints respond normally again.
"""


def test_full_compliance_flow(signed_up_client):
    # 1. Seed identity questions
    r = signed_up_client.post("/api/compliance/identity/seed", json={"answers": [
        {"prompt": "favorite_color",      "answer": "blue"},
        {"prompt": "first_pet",           "answer": "fluffy"},
        {"prompt": "city_of_birth",       "answer": "dallas"},
        {"prompt": "elementary_school",   "answer": "lakewood"},
        {"prompt": "favorite_food_child", "answer": "tacos"},
    ]})
    assert r.status_code == 200, r.text

    # 2. Tick 30 minutes (1800 sec) onto lesson 1.1
    # PER_TICK_CAP_SECONDS = 120, so 15 ticks of 120s = 1800s
    for _ in range(15):
        rt = signed_up_client.post("/api/compliance/timer/tick", json={
            "lesson_id": "1.1", "seconds": 120, "signals": [],
        })
        assert rt.status_code == 200, rt.text
    assert rt.json()["total_seconds"] >= 1800

    # 3. Mark lesson complete - succeeds (1.1 floor = 30 min = 1800 sec)
    rc = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.1", "minutes": 30, "xp": 50,
    })
    assert rc.status_code == 200, rc.text

    # 4. Force-open a lockout -> subsequent API call returns 423
    signed_up_client.post("/api/compliance/_debug/open_lockout", json={"reason": "manual"})
    blocked = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.2", "minutes": 0, "xp": 0,
    })
    assert blocked.status_code == 423

    # 5. Promote and close lockout
    signed_up_client.post("/api/compliance/_debug/set_admin")
    info = signed_up_client.get("/api/compliance/lockouts/me").json()
    lid = info["id"]
    closed = signed_up_client.post(f"/api/admin/lockouts/{lid}/close", json={"notes": "ok"})
    assert closed.status_code == 200

    # 6. After close, previously-blocked endpoint is no longer 423
    after = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.2", "minutes": 0, "xp": 0,
    })
    assert after.status_code != 423
