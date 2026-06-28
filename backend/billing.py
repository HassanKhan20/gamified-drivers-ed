"""Plan catalog + entitlements + a PaymentProvider seam.

Single live plan today (Parent-Taught Teen, $29); three others are "coming_soon".
Payment is simulated (no card); a real StripeProvider can implement the same
PaymentProvider interface later without touching gating or entitlement logic.

Tracks: an entitlement grants a set of content "tracks". A user's allowed tracks
= union of tracks across their active entitlements. Content endpoints gate on a
required track (see require_track in main.py).
"""
from __future__ import annotations

import sqlite3
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api")

# Single source of truth for plans. Editing here updates plans.html + checkout.
PLAN_CATALOG: dict[str, dict] = {
    "ptde": {
        "name": "Parent-Taught Teen Driver Ed",
        "price_cents": 2900,
        "status": "available",
        "tracks": ["teen", "parent"],
        "blurb": "The full 32-hour Texas teen course, taught parent-supervised. Includes the teen curriculum, parent track, and BTW logbook.",
    },
    "teen": {
        "name": "Teen Drivers Ed (Instructor-Taught)",
        "price_cents": 5900,
        "status": "coming_soon",
        "tracks": ["teen"],
        "blurb": "Instructor-taught teen course.",
    },
    "adult": {
        "name": "Adult Drivers Ed (18–24)",
        "price_cents": 3900,
        "status": "coming_soon",
        "tracks": ["adult"],
        "blurb": "The 6-hour adult course (ADE-1317).",
    },
    "defensive": {
        "name": "Defensive Driving / Ticket Dismissal",
        "price_cents": 2900,
        "status": "coming_soon",
        "tracks": ["defensive"],
        "blurb": "Defensive driving / ticket dismissal course.",
    },
}


def init_billing_schema(db: sqlite3.Connection) -> None:
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS entitlements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            sku TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'active',
            source TEXT,
            granted_at TEXT DEFAULT CURRENT_TIMESTAMP,
            expires_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_entitlements_user ON entitlements(user_id);
        """
    )


def grant_entitlement(db: sqlite3.Connection, user_id: int, sku: str, source: str = "simulated") -> None:
    """Idempotent: grant `sku` to user if they don't already hold it active."""
    existing = db.execute(
        "SELECT id FROM entitlements WHERE user_id = ? AND sku = ? AND status = 'active'",
        (user_id, sku),
    ).fetchone()
    if existing:
        return
    db.execute(
        "INSERT INTO entitlements (user_id, sku, status, source) VALUES (?, ?, 'active', ?)",
        (user_id, sku, source),
    )


def active_skus(db: sqlite3.Connection, user_id: int) -> list[str]:
    rows = db.execute(
        "SELECT sku FROM entitlements WHERE user_id = ? AND status = 'active'",
        (user_id,),
    ).fetchall()
    return [r["sku"] for r in rows]


def allowed_tracks(db: sqlite3.Connection, user_id: int) -> set[str]:
    tracks: set[str] = set()
    for sku in active_skus(db, user_id):
        plan = PLAN_CATALOG.get(sku)
        if plan:
            tracks.update(plan.get("tracks", []))
    return tracks


# ---------- Payment provider seam ----------

class PaymentProvider:
    """Interface. checkout() either grants immediately (simulated) or, for a real
    provider, would return a redirect URL and grant later via webhook."""
    def checkout(self, db: sqlite3.Connection, user_id: int, sku: str) -> dict:
        raise NotImplementedError


class SimulatedProvider(PaymentProvider):
    def checkout(self, db: sqlite3.Connection, user_id: int, sku: str) -> dict:
        grant_entitlement(db, user_id, sku, source="simulated")
        return {"ok": True, "granted": sku, "provider": "simulated"}


PROVIDER: PaymentProvider = SimulatedProvider()


# ---------- Schemas + routes ----------

class CheckoutIn(BaseModel):
    sku: str = Field(min_length=1, max_length=40, pattern=r"^[a-z0-9_\-]+$")


def _public_catalog() -> list[dict]:
    return [
        {
            "sku": sku,
            "name": p["name"],
            "price_cents": p["price_cents"],
            "status": p["status"],
            "tracks": p["tracks"],
            "blurb": p["blurb"],
        }
        for sku, p in PLAN_CATALOG.items()
    ]


def bind_routes(require_user, db_factory):

    @router.get("/plans")
    def get_plans():
        return {"plans": _public_catalog()}

    @router.post("/checkout")
    def checkout(payload: CheckoutIn, user=Depends(require_user)):
        plan = PLAN_CATALOG.get(payload.sku)
        if not plan:
            raise HTTPException(status_code=404, detail="Unknown plan")
        if plan["status"] != "available":
            raise HTTPException(status_code=409, detail="This plan is not available yet.")
        with db_factory() as c:
            result = PROVIDER.checkout(c, user["id"], payload.sku)
            skus = active_skus(c, user["id"])
            tracks = sorted(allowed_tracks(c, user["id"]))
        return {"ok": True, "result": result, "entitlements": skus, "allowedTracks": tracks}
