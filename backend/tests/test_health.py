def test_health_endpoint(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "ok"


def test_signed_up_fixture_yields_authenticated_session(signed_up_client):
    r = signed_up_client.get("/api/me")
    assert r.status_code == 200
    assert r.json()["user"]["email"] == "teen@example.com"
