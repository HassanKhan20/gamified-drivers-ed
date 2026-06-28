def test_identity_prompts_endpoint_returns_curated_list(client):
    r = client.get("/api/compliance/identity/prompts")
    assert r.status_code == 200
    prompts = r.json()["prompts"]
    assert len(prompts) >= 20
    ids = [p["id"] for p in prompts]
    assert "favorite_color" in ids


def test_identity_seed_persists_questions(signed_up_client):
    r = signed_up_client.post("/api/compliance/identity/seed", json={
        "answers": [
            {"prompt": "favorite_color",      "answer": "Blue"},
            {"prompt": "first_pet",           "answer": " Fluffy  "},
            {"prompt": "city_of_birth",       "answer": "Dallas"},
            {"prompt": "elementary_school",   "answer": "Lakewood"},
            {"prompt": "favorite_food_child", "answer": "Tacos"},
        ],
    })
    assert r.status_code == 200, r.text
    assert r.json()["seeded"] == 5


def test_identity_seed_rejects_unknown_prompt(signed_up_client):
    r = signed_up_client.post("/api/compliance/identity/seed", json={
        "answers": [{"prompt": "not_a_real_prompt", "answer": "x"},
                    {"prompt": "favorite_color", "answer": "blue"},
                    {"prompt": "first_pet", "answer": "fluffy"},
                    {"prompt": "city_of_birth", "answer": "dallas"},
                    {"prompt": "favorite_food_child", "answer": "tacos"}],
    })
    assert r.status_code == 422


def test_identity_seed_requires_min_five(signed_up_client):
    r = signed_up_client.post("/api/compliance/identity/seed", json={
        "answers": [{"prompt": "favorite_color", "answer": "Blue"}],
    })
    assert r.status_code == 422


# Helpers below

ANSWERS = {
    "favorite_color":      "blue",
    "first_pet":           "fluffy",
    "city_of_birth":       "dallas",
    "elementary_school":   "lakewood",
    "favorite_food_child": "tacos",
}

PROMPT_TO_ANSWER = {
    "What is your favorite color?":              ANSWERS["favorite_color"],
    "What was your first pet's name?":           ANSWERS["first_pet"],
    "In what city were you born?":               ANSWERS["city_of_birth"],
    "What is the name of your elementary school?": ANSWERS["elementary_school"],
    "What was your favorite food as a child?":   ANSWERS["favorite_food_child"],
}


def _seed(client):
    r = client.post("/api/compliance/identity/seed", json={"answers": [
        {"prompt": k, "answer": v} for k, v in ANSWERS.items()
    ]})
    assert r.status_code == 200


def test_identity_next_returns_challenge_after_seed(signed_up_client):
    _seed(signed_up_client)
    r = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1")
    assert r.status_code == 200
    body = r.json()
    assert body is not None
    assert "challenge_id" in body
    assert "prompt" in body
    assert body["response_seconds"] == 90


def test_identity_next_returns_null_when_already_challenged(signed_up_client):
    _seed(signed_up_client)
    r1 = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1").json()
    assert r1 is not None
    r2 = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1")
    assert r2.status_code == 200
    assert r2.json() is None  # same lesson_id, already challenged


def test_identity_check_correct_answer_passes(signed_up_client):
    _seed(signed_up_client)
    nxt = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1").json()
    r = signed_up_client.post("/api/compliance/identity/check", json={
        "challenge_id": nxt["challenge_id"],
        "answer": PROMPT_TO_ANSWER[nxt["prompt"]],
        "response_ms": 5000,
    })
    assert r.status_code == 200, r.text
    assert r.json()["correct"] is True


def test_identity_check_wrong_answer_recorded(signed_up_client):
    _seed(signed_up_client)
    nxt = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1").json()
    r = signed_up_client.post("/api/compliance/identity/check", json={
        "challenge_id": nxt["challenge_id"],
        "answer": "not_the_right_answer",
        "response_ms": 5000,
    })
    assert r.status_code == 200
    assert r.json()["correct"] is False


def test_identity_check_timeout_counts_as_wrong(signed_up_client):
    _seed(signed_up_client)
    nxt = signed_up_client.get("/api/compliance/identity/next?lesson_id=1.1&force=1").json()
    r = signed_up_client.post("/api/compliance/identity/check", json={
        "challenge_id": nxt["challenge_id"],
        "answer": PROMPT_TO_ANSWER[nxt["prompt"]],
        "response_ms": 95_000,  # > 90,000ms = 90s window
    })
    assert r.status_code == 200
    assert r.json()["correct"] is False
    assert r.json()["timed_out"] is True


def test_identity_lockout_after_threshold_breach(signed_up_client):
    _seed(signed_up_client)
    # 11 wrong in a row -> past 10-warmup, 100% wrong = lockout
    triggered = False
    for i in range(11):
        nxt = signed_up_client.get(f"/api/compliance/identity/next?lesson_id=L.{i}&force=1").json()
        r = signed_up_client.post("/api/compliance/identity/check", json={
            "challenge_id": nxt["challenge_id"],
            "answer": "WRONG",
            "response_ms": 1000,
        })
        if r.json().get("lockout_opened"):
            triggered = True
            break
    assert triggered, "Expected lockout_opened=True past warmup threshold"
