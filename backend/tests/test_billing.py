def test_plans_catalog_shape(client):
    r = client.get("/api/plans")
    assert r.status_code == 200
    plans = {p["sku"]: p for p in r.json()["plans"]}
    assert set(plans) == {"ptde", "teen", "adult", "defensive"}
    assert plans["ptde"]["status"] == "available"
    assert plans["ptde"]["price_cents"] == 2900
    assert plans["ptde"]["tracks"] == ["teen", "parent"]
    for sku in ("teen", "adult", "defensive"):
        assert plans[sku]["status"] == "coming_soon"


def test_checkout_grants_ptde(unpaid_client):
    r = unpaid_client.post("/api/checkout", json={"sku": "ptde"})
    assert r.status_code == 200, r.text
    assert "ptde" in r.json()["entitlements"]
    assert set(r.json()["allowedTracks"]) == {"teen", "parent"}

    me = unpaid_client.get("/api/me").json()
    assert me["entitlements"] == ["ptde"]
    assert set(me["allowedTracks"]) == {"teen", "parent"}


def test_checkout_rejects_coming_soon(unpaid_client):
    r = unpaid_client.post("/api/checkout", json={"sku": "teen"})
    assert r.status_code == 409, r.text


def test_checkout_rejects_unknown(unpaid_client):
    r = unpaid_client.post("/api/checkout", json={"sku": "nope"})
    assert r.status_code == 404


def test_content_gated_402_without_entitlement(unpaid_client):
    # No entitlement → content write returns 402 Payment Required
    r = unpaid_client.post("/api/progress/lesson", json={"lesson_id": "999.999", "minutes": 0, "xp": 0})
    assert r.status_code == 402, r.text
    assert r.json()["detail"]["required_track"] == "teen"


def test_content_allowed_after_checkout(unpaid_client):
    unpaid_client.post("/api/checkout", json={"sku": "ptde"})
    # 999.999 has no minute floor, so a teen-entitled user gets 200 (not 402)
    r = unpaid_client.post("/api/progress/lesson", json={"lesson_id": "999.999", "minutes": 0, "xp": 0})
    assert r.status_code == 200, r.text


def test_btw_requires_parent_track(unpaid_client):
    # unpaid → 402 on BTW (parent track)
    r = unpaid_client.post("/api/btw_drives", json={"date": "2026-05-01", "duration_min": 30})
    assert r.status_code == 402
    # after ptde checkout (grants parent), allowed
    unpaid_client.post("/api/checkout", json={"sku": "ptde"})
    r2 = unpaid_client.post("/api/btw_drives", json={"date": "2026-05-01", "duration_min": 30})
    assert r2.status_code == 200, r2.text


def test_me_without_entitlement_shows_empty(unpaid_client):
    me = unpaid_client.get("/api/me").json()
    assert me["entitlements"] == []
    assert me["allowedTracks"] == []
