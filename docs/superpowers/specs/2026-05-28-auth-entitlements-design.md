# Auth + Plan Entitlements — Design

**Date:** 2026-05-28
**Status:** Approved verbally; proceeding to plan + build
**Scope:** Complete the sign-in/auth experience and gate course content by what the user "paid" for. Single live plan (Parent-Taught Teen, $29); three others shown "Coming soon". Simulated payment now, real-payment seam for later.

---

## 1. Product decision

The catalog collapses to **one purchasable plan**:

| SKU | Name | Price | Status | Unlocks (tracks) |
|---|---|---|---|---|
| `ptde` | Parent-Taught Teen Driver Ed | $29 | **available** | `teen`, `parent` |
| `teen` | Teen Drivers Ed (instructor-taught) | $59 | coming_soon | — |
| `adult` | Adult Drivers Ed (18–24) | $39 | coming_soon | — |
| `defensive` | Defensive Driving / Ticket Dismissal | $29 | coming_soon | — |

PTDE is the right single launch product: parent-taught means the **parent is the instructor**, sidestepping the instructor-of-record requirement that blocks the instructor-taught track.

## 2. Entitlement model

- New table `entitlements (id, user_id, sku, status, granted_at, expires_at, source)`. A user can hold a *set* of entitlements (future-proof); v1 grants exactly one (`ptde`).
- `PLAN_CATALOG` (backend constant) is the single source of truth for sku → name, price_cents, status, tracks.
- A user's **allowed tracks** = union of `PLAN_CATALOG[sku].tracks` over their active entitlements.
- Track → content mapping:
  - `teen` → roadmap, lessons (`lesson.html`), topics (`topic.html`), drive sim, mini-games, hazard drill, garage, DMV sim
  - `parent` → parent track (`parent_learn.html`), BTW logbook
  - `adult` → `adult_learn.html` (no entitlement grants it yet)
  - `defensive` → `defensive_learn.html` (none yet)
- Ungated for any signed-in user: dashboard, account/settings, compliance page, logout.

## 3. Payment seam (approach C)

`backend/billing.py`:
```
class PaymentProvider:        # interface
    def checkout(self, user_id, sku) -> CheckoutResult   # may grant immediately or return a redirect URL

class SimulatedProvider(PaymentProvider):   # used now
    # grants the entitlement immediately; no card, no money
```
A future `StripeProvider` implements the same interface (create Checkout Session, confirm via webhook, then grant). Gating and entitlement logic never reference the provider directly — only `billing.grant_entitlement()` and the catalog.

## 4. API surface

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/plans` | Catalog: `[{sku, name, price_cents, status, tracks, blurb}]` — drives plans.html |
| POST | `/api/checkout` | Auth required. Body `{sku}`. Rejects `coming_soon` (409) and unknown sku (404). Calls provider; on success grants entitlement. Returns `{ok, entitlements}` |
| GET | `/api/me` | Now also returns `entitlements: [...]` and `allowedTracks: [...]` |

Gating is enforced **server-side** (defense in depth), not only in the UI. A reusable dependency `require_track(track)` returns 402 Payment Required when the user's allowedTracks lacks it. Applied to content-write/track endpoints:
- `POST /api/progress/lesson`, `/api/compliance/timer/tick`, `/api/compliance/timer/event`, `/api/drives`, `/api/games/score`, `/api/topics/{id}/progress` → require `teen`
- `POST /api/btw_drives` (+ list/export) → require `parent`

Read-only `/api/me`, `/api/plans`, `/api/compliance/config`, auth routes, and `/api/health` are never track-gated.

## 5. Frontend

- **`plans.html`** — reads `/api/plans`. PTDE card: "Get started · $29" → `signup.html?sku=ptde`. Other three: greyed, "Coming soon" badge, disabled CTA.
- **`checkout.html`** (new) — prototype. Shows the PTDE plan + "Complete enrollment (prototype — no card)". On click → `POST /api/checkout {sku:'ptde'}` → on success → `identity-setup.html`. If already entitled, redirects to dashboard.
- **Entitlement guard** — extend the existing `APEX.guard()` so gated pages do: not signed in → `login.html`; signed in but lacking the page's required track → `checkout.html`; entitled → render. A page declares its required track via a small inline call, e.g. `APEX.requireTrack('teen')`.
- **Sign-in wiring** — public pages show "Sign in" (→ login.html) + "Sign up"; authenticated pages show "Sign out". Login on success routes: entitled → dashboard, not entitled → checkout.
- **Bilingual** — all new UI strings (checkout, guard notices, plan statuses) go through the same EN/ES pattern already in use (`T()` / inline `pick`).

## 6. Flows

- **New user:** plans → "Get started $29" → `signup.html?sku=ptde` → account created → `checkout.html` → simulated grant → `identity-setup.html` → dashboard.
- **Returning, entitled:** login → dashboard.
- **Returning, not entitled:** login → checkout.
- **Deep-link a gated page unpaid:** guard → checkout (or login if signed out).

## 7. Out of scope (YAGNI)

- Real card processing / Stripe (interface only)
- Refunds, expiry, renewals (columns exist, unused)
- Separate teen vs parent logins (one account = one family enrollment)
- Granting the three coming-soon SKUs

## 8. Risks

- **Gating must be server-side**, or a user could bypass the UI guard and hit content APIs directly. Mitigation: `require_track` on all content-write endpoints + tests proving 402.
- **Existing users** (pre-entitlement) have no entitlement row → would be locked out. Mitigation: the `admin_unlock.py`/seed path grants `ptde`; and a one-time note that pre-existing dev accounts need a grant (dev DB resettable).
- **Course-mode legacy:** signup's old `courseMode` (teen/adult/defensive/parent) is superseded by sku. Keep `role` (teen/parent) for dashboard framing; sku/entitlement is the access authority.

## 9. Acceptance criteria

- `GET /api/plans` returns 4 entries, only `ptde` available.
- `POST /api/checkout {sku:'ptde'}` grants entitlement; `/api/me` then shows it + allowedTracks `['teen','parent']`.
- `POST /api/checkout {sku:'teen'}` → 409 (coming soon).
- A signed-in user with no entitlement gets **402** from `POST /api/progress/lesson`; after checkout, **200/409-floor** (not 402).
- BTW endpoints require `parent`; PTDE grants it.
- plans.html shows PTDE purchasable, others "Coming soon".
- Guard redirects: signed-out → login, signed-in-unpaid → checkout.
- Existing backend tests still pass; new tests cover the above.
