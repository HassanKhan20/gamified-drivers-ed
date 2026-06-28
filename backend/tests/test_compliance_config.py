def test_compliance_config_returns_thresholds(client):
    r = client.get("/api/compliance/config")
    assert r.status_code == 200
    body = r.json()
    assert body["mastery_threshold"] == 0.70
    assert body["identity_response_seconds"] == 90
    assert body["identity_warmup_min_total"] == 10
    assert body["identity_wrong_rate_lockout"] == 0.30
    assert body["multimedia_gate_min_seconds"] == 180
    assert body["timer_idle_pause_seconds"] == 60
    assert body["operating_hours_local"] == {"start_hour": 5, "end_hour": 23}
