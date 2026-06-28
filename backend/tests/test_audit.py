def test_audit_log_writes_row(signed_up_client):
    # Trigger an audit log write via the debug endpoint added in this task.
    r = signed_up_client.post("/api/compliance/_debug/log", json={
        "event_type": "test_event",
        "lesson_id": "1.1",
        "payload": {"hello": "world"},
    })
    assert r.status_code == 200, r.text
    event_id = r.json()["id"]

    r2 = signed_up_client.get(f"/api/compliance/_debug/audit?event_id={event_id}")
    assert r2.status_code == 200
    row = r2.json()
    assert row["event_type"] == "test_event"
    assert row["lesson_id"] == "1.1"
    assert row["payload"] == {"hello": "world"}
    assert row["retain_until"]
    assert row["user_id"] > 0
