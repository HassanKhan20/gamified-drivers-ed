def test_timer_tick_accumulates_chapter_seconds(signed_up_client):
    for _ in range(3):
        r = signed_up_client.post("/api/compliance/timer/tick", json={
            "lesson_id": "1.1",
            "seconds": 30,
            "signals": [],
        })
        assert r.status_code == 200, r.text
    # Last response shows total 90s
    assert r.json()["total_seconds"] == 90


def test_timer_tick_caps_oversize_delta(signed_up_client):
    # Submit a 1-hour tick - server should cap at 120 sec
    r = signed_up_client.post("/api/compliance/timer/tick", json={
        "lesson_id": "1.1",
        "seconds": 600,  # max allowed by pydantic
        "signals": [],
    })
    assert r.status_code == 200
    assert r.json()["credited_seconds"] == 120  # PER_TICK_CAP_SECONDS
    assert r.json()["total_seconds"] == 120


def test_timer_event_logs_allowed_type(signed_up_client):
    r = signed_up_client.post("/api/compliance/timer/event", json={
        "event_type": "tab_visibility_change",
        "lesson_id": "1.1",
        "payload": {"hidden": True},
    })
    assert r.status_code == 200


def test_timer_event_rejects_unknown_type(signed_up_client):
    r = signed_up_client.post("/api/compliance/timer/event", json={
        "event_type": "not_an_allowed_event",
        "lesson_id": "1.1",
        "payload": {},
    })
    assert r.status_code == 422


def test_timer_status_for_known_chapter(signed_up_client):
    # Chapter 1.1 floor is 30 min = 1800 seconds
    r = signed_up_client.get("/api/compliance/timer/status?lesson_id=1.1")
    assert r.status_code == 200
    body = r.json()
    assert body["required_seconds"] == 1800
    assert body["accumulated_seconds"] == 0
    assert body["remaining_seconds"] == 1800
    assert body["met"] is False

    # Tick 600 seconds (10 min). Status should show 1200s remaining.
    for _ in range(5):
        signed_up_client.post("/api/compliance/timer/tick", json={
            "lesson_id": "1.1", "seconds": 120, "signals": [],
        })
    r2 = signed_up_client.get("/api/compliance/timer/status?lesson_id=1.1")
    body2 = r2.json()
    assert body2["accumulated_seconds"] == 600
    assert body2["remaining_seconds"] == 1200
    assert body2["met"] is False


def test_timer_status_for_unknown_chapter_reports_met(signed_up_client):
    r = signed_up_client.get("/api/compliance/timer/status?lesson_id=not.a.chapter")
    assert r.status_code == 200
    body = r.json()
    assert body["required_seconds"] == 0
    assert body["met"] is True
