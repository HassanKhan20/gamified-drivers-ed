def test_attempt_recorded_and_missed_resurfaces(signed_up_client):
    # Miss a question in chapter 1
    r = signed_up_client.post("/api/compliance/spacedrep/attempt", json={"question_key": "1.1:0", "correct": False})
    assert r.status_code == 200
    # Get it right in a different question
    signed_up_client.post("/api/compliance/spacedrep/attempt", json={"question_key": "1.2:0", "correct": True})

    # Warmups for a later lesson should include the missed key, exclude same-lesson
    r = signed_up_client.get("/api/compliance/spacedrep/warmups?exclude_lesson=2.1")
    assert r.status_code == 200
    assert "1.1:0" in r.json()["warmups"]
    assert "1.2:0" not in r.json()["warmups"]  # was correct


def test_later_correct_clears_the_miss(signed_up_client):
    signed_up_client.post("/api/compliance/spacedrep/attempt", json={"question_key": "3.3:2", "correct": False})
    # still missed
    assert "3.3:2" in signed_up_client.get("/api/compliance/spacedrep/missed").json()["missed"]
    # now get it right
    signed_up_client.post("/api/compliance/spacedrep/attempt", json={"question_key": "3.3:2", "correct": True})
    assert "3.3:2" not in signed_up_client.get("/api/compliance/spacedrep/missed").json()["missed"]


def test_warmups_capped_at_two(signed_up_client):
    for i in range(5):
        signed_up_client.post("/api/compliance/spacedrep/attempt", json={"question_key": f"5.{i}:0", "correct": False})
    w = signed_up_client.get("/api/compliance/spacedrep/warmups").json()["warmups"]
    assert len(w) <= 2


def test_exclude_lesson_filters_current_chapter(signed_up_client):
    signed_up_client.post("/api/compliance/spacedrep/attempt", json={"question_key": "7.1:0", "correct": False})
    w = signed_up_client.get("/api/compliance/spacedrep/warmups?exclude_lesson=7.1").json()["warmups"]
    assert "7.1:0" not in w
