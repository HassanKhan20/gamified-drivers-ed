def test_open_lockout_blocks_non_allowlisted_routes(signed_up_client):
    r = signed_up_client.post("/api/compliance/_debug/open_lockout", json={"reason": "manual"})
    assert r.status_code == 200, r.text

    # Non-allowlisted POST should now 423
    r2 = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.1", "minutes": 30, "xp": 50,
    })
    assert r2.status_code == 423, r2.text

    # Allowlisted endpoints still work
    assert signed_up_client.get("/api/me").status_code == 200
    me_lockout = signed_up_client.get("/api/compliance/lockouts/me").json()
    assert me_lockout["open"] is True
    assert me_lockout["reason"] == "manual"


def test_lockout_close_via_admin_clears_block(signed_up_client):
    signed_up_client.post("/api/compliance/_debug/open_lockout", json={"reason": "manual"})
    signed_up_client.post("/api/compliance/_debug/set_admin")
    info = signed_up_client.get("/api/compliance/lockouts/me").json()
    lid = info["id"]
    r = signed_up_client.post(f"/api/admin/lockouts/{lid}/close", json={"notes": "verified"})
    assert r.status_code == 200, r.text

    # After close, original endpoint no longer 423s. May 409 if minute floor hits, that's fine.
    r2 = signed_up_client.post("/api/progress/lesson", json={
        "lesson_id": "1.1", "minutes": 30, "xp": 50,
    })
    assert r2.status_code != 423, r2.text


def test_identity_threshold_opens_real_lockout(signed_up_client):
    # Seed 5 answers
    signed_up_client.post("/api/compliance/identity/seed", json={"answers": [
        {"prompt": "favorite_color",      "answer": "Blue"},
        {"prompt": "first_pet",           "answer": "Fluffy"},
        {"prompt": "city_of_birth",       "answer": "Dallas"},
        {"prompt": "elementary_school",   "answer": "Lakewood"},
        {"prompt": "favorite_food_child", "answer": "Tacos"},
    ]})
    # Wrong answers until lockout triggers (then middleware blocks /next)
    for i in range(20):
        r_next = signed_up_client.get(f"/api/compliance/identity/next?lesson_id=L.{i}&force=1")
        if r_next.status_code == 423:
            break
        nxt = r_next.json()
        if nxt is None:
            continue
        r_check = signed_up_client.post("/api/compliance/identity/check", json={
            "challenge_id": nxt["challenge_id"], "answer": "WRONG", "response_ms": 1000,
        })
        if r_check.status_code == 200 and r_check.json().get("lockout_opened"):
            break

    me_lockout = signed_up_client.get("/api/compliance/lockouts/me").json()
    assert me_lockout["open"] is True
    assert me_lockout["reason"] == "identity_validation_threshold"


def test_admin_list_lockouts_requires_admin(signed_up_client):
    # Non-admin gets 403
    r = signed_up_client.get("/api/admin/lockouts")
    assert r.status_code == 403

    # Promote and retry
    signed_up_client.post("/api/compliance/_debug/set_admin")
    r2 = signed_up_client.get("/api/admin/lockouts")
    assert r2.status_code == 200
    assert isinstance(r2.json(), list)
