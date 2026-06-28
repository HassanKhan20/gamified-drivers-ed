"""Pytest fixtures for APEX backend tests.

Each test runs against a fresh SQLite DB at a tmp_path so tests are isolated.
Uses FastAPI's TestClient for HTTP-level testing.
"""
from __future__ import annotations

import importlib
import sys

import pytest


@pytest.fixture
def client(tmp_path, monkeypatch):
    """Fresh TestClient with an isolated SQLite file per test."""
    db_path = tmp_path / "test_apex.db"
    monkeypatch.setenv("APEX_DB_PATH", str(db_path))

    # Drop any cached imports of backend.main / backend.compliance.* so a fresh
    # import picks up the new APEX_DB_PATH and re-runs init_db() against tmp_path.
    for mod_name in list(sys.modules):
        if (mod_name == "backend.main"
                or mod_name == "backend.billing"
                or mod_name.startswith("backend.compliance")):
            del sys.modules[mod_name]

    from fastapi.testclient import TestClient
    import importlib
    main_module = importlib.import_module("backend.main")
    return TestClient(main_module.app)


@pytest.fixture
def signed_up_client(client):
    """A signed-in teen user who has ALSO completed checkout for the PTDE plan,
    i.e. a normal paying user with the teen + parent tracks entitled. Content
    endpoints are track-gated, so most tests need this entitlement."""
    r = client.post("/api/signup", json={
        "email": "teen@example.com",
        "password": "correcthorse1",
        "name": "Test Teen",
        "role": "teen",
        "language": "en",
    })
    assert r.status_code == 200, r.text
    c = client.post("/api/checkout", json={"sku": "ptde"})
    assert c.status_code == 200, c.text
    return client


@pytest.fixture
def unpaid_client(client):
    """A signed-in user with NO entitlement — used to verify content gating (402)."""
    r = client.post("/api/signup", json={
        "email": "unpaid@example.com",
        "password": "correcthorse1",
        "name": "Unpaid",
        "role": "teen",
        "language": "en",
    })
    assert r.status_code == 200, r.text
    return client
