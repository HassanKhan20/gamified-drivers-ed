def _register_test_clip(client):
    r = client.post("/api/compliance/_debug/seed_clip", json={
        "clip_id": "test-clip-1",
        "lesson_id": "1.1",
        "duration_sec": 210,
        "title": "Test clip about hazards",
        "questions": [
            {"prompt": "What color was the car?", "options": ["red", "blue", "green", "yellow"], "correct_index": 0},
            {"prompt": "What did the driver do?", "options": ["stopped", "ran", "swerved", "honked"], "correct_index": 1},
            {"prompt": "Time of day?",          "options": ["dawn", "noon", "dusk", "night"],       "correct_index": 2},
            {"prompt": "Speed limit?",          "options": ["25", "35", "45", "55"],                "correct_index": 1},
        ],
    })
    assert r.status_code == 200, r.text


def test_get_clip_does_not_leak_correct_index(signed_up_client):
    _register_test_clip(signed_up_client)
    r = signed_up_client.get("/api/compliance/clips/test-clip-1")
    assert r.status_code == 200
    body = r.json()
    assert body["clip_id"] == "test-clip-1"
    assert body["duration_sec"] == 210
    assert "question" in body
    assert "correct_index" not in body["question"]
    assert len(body["question"]["options"]) == 4


def test_post_clip_view_grades_correct_answer(signed_up_client):
    _register_test_clip(signed_up_client)
    info = signed_up_client.get("/api/compliance/clips/test-clip-1").json()
    qid = info["question"]["id"]
    truth = signed_up_client.get(f"/api/compliance/_debug/clip_question/{qid}").json()
    correct = truth["correct_index"]
    r = signed_up_client.post("/api/compliance/clips/test-clip-1/view", json={
        "finished": True, "question_id": qid, "answer_index": correct,
    })
    assert r.status_code == 200, r.text
    assert r.json()["correct"] is True


def test_post_clip_view_wrong_then_wrong_again_triggers_lockout(signed_up_client):
    _register_test_clip(signed_up_client)
    info = signed_up_client.get("/api/compliance/clips/test-clip-1").json()
    qid = info["question"]["id"]
    truth = signed_up_client.get(f"/api/compliance/_debug/clip_question/{qid}").json()
    wrong = (truth["correct_index"] + 1) % 4

    r1 = signed_up_client.post("/api/compliance/clips/test-clip-1/view", json={
        "finished": True, "question_id": qid, "answer_index": wrong,
    })
    assert r1.json()["correct"] is False
    assert r1.json()["must_replay"] is True

    r2 = signed_up_client.post("/api/compliance/clips/test-clip-1/view", json={
        "finished": True, "question_id": qid, "answer_index": wrong,
    })
    assert r2.json()["correct"] is False
    assert r2.json()["lockout_opened"] is True
