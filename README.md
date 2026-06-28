# APEX — Gamified TX Drivers Ed

> State-approvable drivers ed teens don't try to bypass. Built like a flight simulator, not a slideshow.

A complete prototype: FastAPI backend with auth, SQLite progress, a Three.js driving simulator, mini-games, and a unified Duolingo-style path that ties everything into one journey from "Welcome" to "DMV Permit Test."

---

## Repo layout

```
gamified-drivers-ed/
├── backend/                    # FastAPI + SQLite (auth, progress, drives, cars, leaderboard)
│   ├── main.py                 # all API routes + static-file serving
│   ├── requirements.txt        # fastapi, uvicorn, pydantic[email]
│   ├── apex.db                 # SQLite DB (auto-creates on first run)
│   └── README.md               # backend-specific notes
│
├── frontend/                   # Static site — served by FastAPI under /
│   ├── *.html                  # 19 pages (see "Pages" below)
│   ├── scripts/
│   │   ├── api.js              # fetch wrapper for /api/*
│   │   ├── app.js              # APEX state, server sync, helpers
│   │   ├── curriculum.js       # 10 modules · 42 chapters · TDLR-aligned
│   │   ├── cars.js             # 6 cars on the level-unlock ladder
│   │   └── journey.js          # unified 50-node path (chapters + games + drives + hazards + final)
│   └── styles/
│       └── app.css             # warm-cream + emerald + amber design system
│
├── docs/
│   └── IMPLEMENTATION_PLAN.md  # 12-month plan, regulatory critical path, budget
│
└── README.md                   # you are here
```

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Public landing (hero, ticker, plans teaser, testimonials, FAQ, footer) |
| `plans.html` | 4 SKUs · EN/ES toggle · A Auto comparison table |
| `about.html` | Credentials, principles, refund window |
| `contact.html` | Refund policy in writing, contact form |
| `compliance.html` | TDLR / ROSCA / COPPA stance + competitor comparison |
| `signup.html` / `login.html` | Auth (calls `/api/signup`, `/api/login`) |
| `dashboard.html` | Stats, today's mission, streak calendar |
| **`roadmap.html`** | **The unified journey** — 50 stops, parallax sky, 3D car avatar, pulsing current node |
| `course.html` | List view of the curriculum tree (alternative to roadmap) |
| `lesson.html?id=X.Y` | Data-driven lesson player (scenario / reading / checkpoint) |
| `drive.html?scenario=...` | Three.js driving simulator (free / parking / checkpoint / finaltest) |
| `garage.html` | All 6 cars w/ live 3D previews + lock states |
| `games.html` | Game corner hub w/ leaderboard |
| `game-signs.html` | Drag-drop traffic-sign matching |
| `game-rightofway.html` | Click-in-order 4-way-stop sequencer |
| `hazard.html` | Daily hazard-perception drill |
| `parent.html` | Parent dashboard |
| `soon.html` | Generic "coming soon" template |

---

## Run locally

```bash
pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

Open **http://127.0.0.1:8000/** — the FastAPI app serves both the API and the static frontend on a single port.

DB auto-creates at `backend/apex.db`. Delete the file to reset.

---

## API surface (FastAPI on `/api/*`)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Liveness probe |
| POST | `/api/signup` | Create account · sets httpOnly session cookie |
| POST | `/api/login` | Sign in |
| POST | `/api/logout` | End session |
| GET | `/api/me` | Current user + full progress |
| POST | `/api/progress/lesson` | Mark a chapter complete · awards XP, bumps streak |
| POST | `/api/games/score` | Submit a mini-game score · auto-awards XP |
| GET | `/api/games/{id}/best` | Personal best for a game |
| GET | `/api/cars` | Public car catalog (6 cars, level + stats) |
| GET | `/api/cars/owned` | Cars unlocked at the user's current level |
| POST | `/api/cars/select` | Pick the active car · 403 if locked |
| POST | `/api/drives` | Log a drive simulator session |
| GET | `/api/drives/recent` | Recent runs |
| GET | `/api/leaderboard` | Top XP (overall) or top score per game |

Auth = stdlib PBKDF2-SHA256 password hashing + DB-backed sessions in an httpOnly `apex_sess` cookie. No external auth provider.

---

## The journey

`scripts/journey.js` defines a single 50-node path that interleaves chapters, scenarios, mini-games, drive-simulator scenarios, hazard drills, and a final DMV permit test. Every screen the student touches is one node on that road. `roadmap.html` renders the path as a serpentine SVG with a pulsing current node and a 3D car avatar that sits on the user's actual selected car.

Module structure mirrors `scripts/curriculum.js` (TDLR-aligned 10 modules totalling ~32 instructional hours).

---

## Design system

Single shared CSS at `frontend/styles/app.css`. Palette:

- **Warm cream paper** `#fbfaf6` page · `#ffffff` cards
- **Charcoal text** `#15191f` primary · `#5d6776` muted
- **Deep emerald** `#0e7c5d` brand (reads "go / certified," not neon)
- **Warm amber** `#b45309` secondary accent (achievements, locked-by-level)
- **Soft warm shadows** instead of glow rings

No scan lines, no glass-on-black, no neon. Designed to feel professional enough that parents trust it and visually rewarding enough that teens open it.

---

## Strategic context

See `docs/IMPLEMENTATION_PLAN.md` for the full 12-month roadmap, regulatory critical path (TDLR provider application is the gating dependency), budget tiers, and competitive analysis vs Aceable / DriversEd.com / A Auto.

---

## TDLR compliance engine

Per the design at `docs/superpowers/specs/2026-05-11-tdlr-ami-compliance-engine-design.md` and 16 TAC §84.501, APEX implements an Alternative Method of Instruction (AMI) compliance engine. Backend lives in `backend/compliance/`; frontend in `frontend/scripts/compliance/`.

**Subsystems (all shipped):**
1. **Identity validation** — personal questions registered at signup; one challenge per chapter, 90-second window, lockout if cumulative wrong-rate >30% past 10-challenge warmup. Module: `compliance/identity.py`.
2. **Multimedia comprehension gates** — clips >180s require a comprehension question on completion. Wrong → replay; second wrong → lockout. Engine ready; no clips registered yet (no shipping content currently exceeds 180s). Module: `compliance/multimedia.py`.
3. **Anti-skip timer enforcement** — active-time accumulator (pauses on tab-blur, document-hidden, idle >60s) + server-side minimum-minutes floor at chapter completion via `chapter_seconds` table. Source of truth is the timer, not the legacy `chapter_minutes`. Module: `compliance/timer.py`.
4. **Mastery threshold (70%)** — single source of truth in `compliance/mastery.py`, surfaced to frontend via `/api/compliance/config`. Topic-progress gate flipped from 0.66 → 0.70.
5. **Audit event log** — append-only `audit_events` with 3-year retention timestamp per §84.81. Module: `compliance/audit.py`.
6. **Lockouts** — at most one open per user; FastAPI middleware returns 423 on non-allowlisted routes; admin closes via `/api/admin/lockouts/{id}/close`. Module: `compliance/lockouts.py`.
7. **Operating-hours soft enforce** — 5 a.m.–11 p.m. banner + audit event; does not hard-block (rule's application to async self-paced is ambiguous; flagged for TDLR pre-clearance). Module: `compliance/hours-banner.js` (frontend-only).

**Test suite:**

```bash
pip install -r backend/requirements.txt
pytest backend/tests/ -v
```

**Promoting a user to admin (for closing lockouts via `/admin-lockouts.html`):**

```bash
python -m backend.promote_admin user@example.com
```

**Regenerating the per-chapter minute floors after editing `curriculum.js`:**

```bash
python scripts/sync_curriculum_minutes.py
```

Commit the regenerated `backend/compliance/curriculum_minutes.json` alongside the curriculum change.

**Known content gap (curriculum work, not engine):**
- Curriculum currently sums to **1,845 instructional minutes**; AMI rule §84.501 requires **1,920 minutes** of presented content. **75 minutes short.** The engine will refuse to mark the course "complete" until this is filled, so it surfaces immediately at first end-to-end completion.

**Not yet implemented** (TDLR-submission blockers — content, business, and operations work, not engine work):
- Restructure curriculum 10 → 12 POI-DE-aligned modules
- Mandated content topics: human trafficking, anatomical gifts, SB 1366 work-zone (effective 2026-05-01), street racing per §545.420, Texas Driving with Disabilities Program, Community Safety Education Act
- TDLR provider license application (Versa, $500 + $300/endorsement, $10K bond on DES138N)
- AMI course approval filing (separate from provider license)
- Electronic certificate template pre-approval + DE-964 number ordering
- Module-1 mastery → DE-964 Learner-License-half issuance flow
- Texas-licensed education attorney review

**Open ambiguities to confirm with TDLR before filing:**
- Whether the 5 a.m.–11 p.m. rule applies to async self-paced sessions.
- Whether cosmetic gamification UI (XP popups, badge animations) counts as "distracting material" during instructional time.
- Final exam question count + bank size (set in Course Approval Guide, not rule text).
