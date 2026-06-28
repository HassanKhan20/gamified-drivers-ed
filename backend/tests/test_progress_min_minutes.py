def _tick(client, lesson_id: str, total_seconds: int) -> None:
    """Send timer ticks of 120s each until total_seconds is credited."""
    remaining = total_seconds
    while remaining > 0:
        sec = min(120, remaining)
        r = client.post("/api/compliance/timer/tick", json={
            "lesson_id": lesson_id, "seconds": sec, "signals": [],
        })
        assert r.status_code == 200, r.text
        remaining -= sec


def test_completion_fails_when_under_minute_floor(signed_up_client):
    # Chapter 1.1 floor = 30 min = 1800 sec. Credit only 60 sec.
    _tick(signed_up_client, "1.1", 60)
    r = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.1", "minutes": 5, "xp": 50,
    })
    assert r.status_code == 409, r.text
    detail = r.json()["detail"]
    assert detail["error"] == "minutes_under_floor"
    assert detail["required_seconds"] == 1800
    assert detail["have_seconds"] == 60


def test_completion_succeeds_when_floor_met(signed_up_client):
    # Credit full 30 min for chapter 1.1
    _tick(signed_up_client, "1.1", 1800)
    r = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.1", "minutes": 30, "xp": 50,
    })
    assert r.status_code == 200, r.text


def test_unknown_lesson_id_bypasses_floor_check(signed_up_client):
    # Chapter ids not in curriculum_minutes.json have no floor.
    r = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "999.999", "minutes": 0, "xp": 0,
    })
    assert r.status_code == 200
