# APEX — TDLR AMI Compliance Engine Design

**Date:** 2026-05-11
**Status:** Design approved verbally; user delegated remaining decisions and autonomous execution
**Scope:** Compliance engine (load-bearing systems), NOT curriculum content
**Driving rule:** 16 TAC Chapter 84, especially §84.501 (Alternative Method of Instruction / online)

---

## 1. Goal

Make the APEX codebase structurally compatible with TDLR's online driver-education-provider rules so that, when the curriculum content work is done in a later phase, the course is submittable as an AMI without re-architecting the engine. Out of scope: writing the missing curriculum, doing the TDLR provider application paperwork, building a full admin console, and pre-clearing the design with TDLR.

## 2. The eight subsystems

| # | Subsystem | Purpose | TDLR rule |
|---|---|---|---|
| 1 | **Identity validation** | Verify the enrolled student is the one consuming the course | §84.501 |
| 2 | **Multimedia comprehension gates** | Force a quiz after any clip >180s, retry or lockout on wrong | §84.501 |
| 3 | **Anti-skip timer enforcement** | Cannot complete a chapter faster than its mandated minutes; tab-blur / idle pauses the clock | §84.501 |
| 4 | **Mastery gate at 70%** | Every progress assessment and final must pass at ≥70% | POI-DE; §84.502 |
| 5 | **Audit event log** | Per-event log of every identity Q, comprehension Q, time tick, and validation outcome | §84.501, §84.81 |
| 6 | **Lockout / intervention** | When identity-validation fails the 30% threshold, lock the student and notify staff | §84.501 |
| 7 | **Operating-hours soft enforcement** | Warn (and log) when instruction occurs outside 5 a.m.–11 p.m. | §84.600 (ambiguity for async — soft enforce) |
| 8 | **Anti-tamper signals** | Detect tab-blur, page-hidden, time-jump, rapid-input, multi-tab as audit signals | §84.501 (engagement intent) |

All eight live behind clean module boundaries so each can be swapped, hardened, or replaced (e.g., upgrading subsystem 1 to a third-party KBA, or subsystem 3 to server-authoritative heartbeats) without touching consumers.

## 3. Decisions taken (with rationale)

| Decision | Choice | Why |
|---|---|---|
| Identity validation method | **Personal validation questions** (build it ourselves) | §84.501 accepts this; KBA is impractical for teens (data doesn't exist for minors) and expensive at bootstrap scale. Interface designed so a KBA provider can swap in later via one file. |
| Timer architecture | **Client-tracked w/ anti-tamper signals (option A)**, schema designed for server-authoritative heartbeats (option B) later | A matches what existing AMI-approved competitors use. Audit event log captures everything B would; upgrade path is one PR. |
| Lockout console | **Status flag + admin email queue + minimal `/admin/lockouts` endpoint**, no UI yet | Pre-launch product has no students yet — full admin console is wasted work. |
| Multimedia comprehension gate | **Build the engine; register zero clips today** | Existing shorts are <180s by design; scenarios are interactive (rule doesn't trigger). Engine is ready when first long-form clip is authored. |
| Mastery threshold | **0.70 universally** (currently 0.66 for topic completion, 6/8 = 0.75 for checkpoints) | TDLR POI-DE rule. The 0.66 is a misalignment that ships with the current code. |
| Operating-hours enforcement | **Soft enforce: banner + audit log violation**, do not hard-block | §84.600 was written for synchronous classrooms. Hard-blocking self-paced async at 11pm would frustrate users for a rule whose application is ambiguous. Flagged for TDLR pre-clearance. |
| Record retention | **Add `retain_until` columns; no automated deletion** | Rule requires 3-year retention, not 3-year auto-delete. Lifecycle job is post-launch infrastructure. |
| Curriculum module restructure (10→12) | **Out of scope** | Content work, multi-week, needs Texas-licensed education advisor review. Flagged as a TDLR-submission blocker. |
| SB 1366 work-zone content, human trafficking, anatomical gifts, Texas Driving with Disabilities Program content | **Out of scope** | Same reason. Engine is content-agnostic; these get added during the content pass. |

## 4. Architecture

### 4.1 Module boundaries (backend)

`backend/main.py` stays monolithic for now — the broader split into per-domain modules is a separate refactor deferred until after the compliance engine ships. What this design adds is a clean `backend/compliance/` package alongside `main.py`, plus shared helpers (`db()`, `require_user`, `audit_log`) imported from main:

```
backend/
├── main.py                          # existing FastAPI app, routes, schema, helpers (unchanged in structure)
└── compliance/                      # NEW — the compliance engine
    ├── __init__.py
    ├── config.py                    # /api/compliance/config endpoint (thresholds, windows, flags)
    ├── audit.py                     # append-only event log writer + table
    ├── mastery.py                   # passes_mastery() helper + 70% threshold constant
    ├── timer.py                     # /api/compliance/timer/tick + curriculum_minutes loader
    ├── identity.py                  # questions table, scheduler, /seed /next /check endpoints
    ├── multimedia.py                # clip + clip_question tables + /clips endpoints
    ├── lockouts.py                  # lockout state machine + middleware allowlist + admin endpoints
    ├── hours.py                     # operating-hours rule helper (mostly used client-side)
    └── curriculum_minutes.json      # generated from frontend/scripts/curriculum.js
```

Compliance routers are mounted in `main.py` via `include_router`. The compliance package has no dependency on games / cars / drives / shorts / topics modules.

### 4.2 Module boundaries (frontend)

```
frontend/scripts/
├── compliance/
│   ├── identity.js        # asks the personal-validation Q when scheduled, posts result
│   ├── clip-gate.js       # wraps a <video> element, fires comprehension Q at end
│   ├── timer.js           # active-time accumulator + tab-blur/idle pause + heartbeat poster
│   ├── tamper.js          # listens for visibility, focus, copy, multi-tab signals
│   ├── lockout.js         # detects 423 responses, renders lockout screen
│   └── hours-banner.js    # renders 5am-11pm warning, posts violation to audit
├── ...existing scripts...
```

Existing pages (`lesson.html`, `drive.html`, `topic.html`) import the compliance scripts as ES modules. Existing logic untouched except for the bare hooks that wire compliance in — described in §6.

### 4.3 New database tables

```sql
-- Subsystem 1: identity validation
CREATE TABLE identity_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  prompt TEXT NOT NULL,                  -- "What was your first pet's name?"
  answer_norm TEXT NOT NULL,             -- lowercased, trimmed, whitespace-collapsed
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_identity_q_user ON identity_questions(user_id);

CREATE TABLE identity_challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  lesson_id TEXT,                        -- which lesson context triggered it
  asked_at TEXT DEFAULT CURRENT_TIMESTAMP,
  answered_at TEXT,
  response_ms INTEGER,                   -- response time in ms; null = timed out
  correct INTEGER,                       -- null=unanswered, 0=wrong, 1=right
  retain_until TEXT,                     -- 3-year retention timestamp
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES identity_questions(id) ON DELETE CASCADE
);
CREATE INDEX idx_identity_c_user ON identity_challenges(user_id);

-- Subsystem 2: multimedia comprehension gates
CREATE TABLE multimedia_clips (
  id TEXT PRIMARY KEY,                   -- "m4-c2-roadrage-clip"
  duration_sec INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  title TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clip_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clip_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  options_json TEXT NOT NULL,            -- JSON array of strings
  correct_index INTEGER NOT NULL,
  FOREIGN KEY (clip_id) REFERENCES multimedia_clips(id) ON DELETE CASCADE
);
CREATE INDEX idx_clip_q ON clip_questions(clip_id);

CREATE TABLE clip_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  clip_id TEXT NOT NULL,
  started_at TEXT DEFAULT CURRENT_TIMESTAMP,
  finished_at TEXT,
  question_id INTEGER,
  question_answered_correctly INTEGER,    -- 0 or 1
  retain_until TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_clip_views_user ON clip_views(user_id);

-- Subsystem 3 + 8: timer ticks + tamper signals (one append-only log)
-- (uses audit_events, see below)

-- Subsystem 6: lockouts
CREATE TABLE lockouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  reason TEXT NOT NULL,                  -- "identity_validation_threshold" | "clip_gate_failure" | "manual"
  opened_at TEXT DEFAULT CURRENT_TIMESTAMP,
  closed_at TEXT,
  closed_by TEXT,                        -- staff email or "auto"
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_lockouts_user ON lockouts(user_id);

-- Subsystem 5: audit event log (subsumes subsystem 8 tamper signals)
CREATE TABLE audit_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  event_type TEXT NOT NULL,              -- enum below
  lesson_id TEXT,
  payload_json TEXT,
  occurred_at TEXT DEFAULT CURRENT_TIMESTAMP,
  retain_until TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_audit_user_time ON audit_events(user_id, occurred_at);
CREATE INDEX idx_audit_type ON audit_events(event_type);
```

`event_type` enum (extensible):
- `time_tick` — client posted N seconds of active time on lesson L
- `time_pause` — tab blurred / idle / hidden
- `time_resume` — focus regained
- `tab_visibility_change`, `tab_multi_detected`, `devtools_open_suspected`, `paste_into_quiz`
- `identity_q_asked` / `identity_q_answered` / `identity_q_timeout`
- `clip_started` / `clip_finished` / `clip_question_correct` / `clip_question_wrong`
- `chapter_started` / `chapter_completed`
- `mastery_passed` / `mastery_failed`
- `outside_hours_session_started`
- `lockout_opened` / `lockout_closed`

Every audit row gets `retain_until = now + 3 years` per §84.81.

### 4.4 New / changed API surface

```
POST /api/compliance/identity/seed         body: [{prompt, answer}, ...]  → register the 5-10 personal Qs at registration
POST /api/compliance/identity/check        body: {challenge_id, answer}   → submit an answer; returns {correct, status, lockout?}
GET  /api/compliance/identity/next         query: lesson_id               → ask the server "should I challenge now?" returns null or a challenge

POST /api/compliance/timer/tick            body: {lesson_id, seconds, signals[]}  → idempotent-ish; server logs + accumulates
POST /api/compliance/timer/event           body: {event_type, lesson_id, payload}  → tamper signals & visibility events

GET  /api/compliance/clips/{clip_id}       → clip metadata + the comprehension Q (correct_index NOT returned)
POST /api/compliance/clips/{clip_id}/view  body: {finished, answer_index}  → log the view + grade the answer

GET  /api/compliance/lockouts/me           → current lockout state for the user (or null)
POST /api/admin/lockouts/{user_id}/open    (admin only)
POST /api/admin/lockouts/{id}/close        body: {notes}  (admin only)

GET  /api/admin/audit                      query: user_id, since, types[]  → paginated event feed (admin only)
```

Admin authentication: gated by `users.role = 'admin'`. The `admin_unlock.py` script in the repo today is converted into a one-shot CLI that adds `role='admin'` to a designated email. No admin UI in v1.

### 4.5 Schema changes to existing tables

- `progress`: + `last_activity_at TEXT` (server-tracked, used by timer subsystem to detect idle)
- `chapter_minutes`: + `minimum_minutes INTEGER` (the required floor, sourced from curriculum)
- `users`: + `role TEXT` already exists (currently 'teen'/'parent'); extend to allow 'admin'

## 5. Subsystem details

### 5.1 Identity validation (subsystem 1)

**Registration flow:** After signup, before the student can start any lesson, they pick 5–10 personal questions from a curated list (~25 prompts) and provide answers. Answers are stored normalized (lowercased, whitespace-collapsed) so "Fluffy " and "fluffy" match. Stored only as the normalization, not hashed — TDLR auditors must be able to see what was registered vs. what was answered, and these are not security secrets in the password sense.

**Curated prompt list (initial):** favorite color, first pet's name, mother's maiden name, city of birth, name of elementary school, favorite teacher's last name, name of best friend in 4th grade, what kind of car your family drives, what street you grew up on, favorite food as a child, favorite cartoon as a kid, what nickname your family calls you, etc. (~25 total in `compliance/identity.py`).

**Challenge scheduling:** A student is challenged once per chapter, at a randomized time within the chapter's first 80% (so it isn't always at the end). The server is the source of truth for *when* a challenge is due; client asks `/api/compliance/identity/next?lesson_id=...` on chapter entry and at random intervals.

**Validation outcome math:** Track cumulative `(correct, total)` over the user's full course history. If `total >= 10 AND (wrong / total) > 0.30`, open a lockout. The 10-question warmup prevents single-mistake lockouts at the start.

**Response window:** 90 seconds (client-enforced timer, server validates `response_ms <= 90000`; >90s server-side = timeout = counts as wrong).

**Question selection:** Server randomly picks among the user's questions, weighted to avoid recent repeats (no two identical Qs within 4 challenges).

### 5.2 Multimedia comprehension gates (subsystem 2)

**Clip registry:** Every clip >180s used in instructional content must be registered in `multimedia_clips` w/ at least 4 questions in `clip_questions`.

**Authoring flow:** When a curriculum author adds a clip, they add a row + 4+ comprehension questions. Currently zero rows.

**Playback flow:** `clip-gate.js` wraps any clip whose `duration_sec > 180`. On clip end, fetch one of the questions randomly, present, gate.

**Wrong-answer rule:** Re-view the clip from the start. If wrong again, open a lockout with reason `clip_gate_failure`.

### 5.3 Anti-skip timer enforcement (subsystem 3)

**Active-time accumulator:** `timer.js` runs an interval that ticks every 5 seconds while the page is visible AND focused AND the user has interacted within the last 60 seconds (keypress, click, scroll, mouse-move). On tick, increments local `seconds_on_lesson`. Every 30 seconds, POSTs `{lesson_id, seconds_delta}` to `/api/compliance/timer/tick`.

**Pause triggers:** visibility hidden → pause; window blur → pause; no user input for 60s → pause. Each transition is logged to audit as `time_pause` / `time_resume`.

**Server idle check:** Server compares `last_activity_at` from `progress` table; if more than 5 minutes between ticks for the same lesson, server credits only 60 seconds for the gap (defensive ceiling).

**Anti-skip enforcement at chapter completion:** When the client POSTs `/api/progress/lesson` to mark a chapter complete, server checks `chapter_minutes.minutes >= chapter.minimum_minutes`. The minute floor is sourced from a server-side JSON file `backend/compliance/curriculum_minutes.json` that is **generated** from `frontend/scripts/curriculum.js` by a small Node-less Python parser (`scripts/sync_curriculum_minutes.py`) run as a pre-commit step. The parser extracts `id: 'X.Y', ..., minutes: N` pairs via regex; no need to evaluate JavaScript. This keeps `curriculum.js` as the single authoring source and removes hand-mirroring drift. If short, return 409 with `{required, have}`.

**No backwards-compat for the 66% world:** chapters completed before this change keep their state — we just stop accepting new "complete" calls without sufficient minutes.

### 5.4 Mastery gate at 70% (subsystem 4)

Code search & replace audit: every comparison against `0.66`, `0.7`, `0.75`, `>= 6` (in 8-Q checkpoint context) gets reviewed. The decisions:

- Topic completion gate (currently `quiz_score >= 0.66` in `update_topic_progress` and `update_topic_progress`'s `completed` logic): → `0.70`
- Checkpoint pass (currently `6 / 8 = 0.75`): → `>= 0.70`, rounded up to integer floor (`Math.ceil(8 * 0.70) = 6`). Effectively unchanged at 8-Q exams, but the rule is expressed as a percentage now and survives variable-length exams.
- Final/comprehensive exam: same 0.70 rule via a shared `passes_mastery(score, total)` helper.

A `passes_mastery()` helper in `compliance/mastery.py` is the only source of truth on the backend. The frontend gets the threshold via a single `/api/compliance/config` endpoint that returns `{mastery_threshold: 0.70, identity_response_seconds: 90, ...}` and is cached for the session. No hand-mirrored magic numbers in frontend code — `app.js` fetches this on boot and stamps it onto a `window.APEX_COMPLIANCE_CONFIG` object that all pages read.

### 5.5 Audit event log (subsystem 5)

**Append-only.** Every consequential action — identity challenge asked/answered, clip viewed, timer tick, chapter complete, mastery pass/fail, lockout open/close, tamper signal — writes a row to `audit_events`. The log is what a TDLR auditor reads to reconstruct the student's experience.

**Storage assumption:** SQLite handles this at our scale (≤ a few thousand students in year 1 = single-digit millions of rows). If we cross 10M rows, partition by year or migrate to Postgres — out of scope today.

**Retention:** `retain_until = occurred_at + 3 years`. No automated deletion job yet.

### 5.6 Lockout / intervention (subsystem 6)

**State machine:** Each user has at most one open lockout at a time. While open, API calls return 423 Locked with a JSON body explaining the reason. Allowlist of endpoints that remain accessible during lockout: `/api/me`, `/api/logout`, `/api/compliance/lockouts/me`, and all `/api/admin/*` routes (admin endpoints check role inside the route). This prevents the lockout from cutting off the user's view of the lockout itself and lets admins close it.

**Auto-open triggers:** identity-validation threshold exceeded; clip-gate second failure.

**Close path:** admin POSTs `/api/admin/lockouts/{id}/close` with notes. Email queue (server-side cron — out of scope; for v1, just log to stdout and rely on a manual SELECT) notifies staff at lockout-open time.

**UI:** `lockout.js` intercepts 423 responses and renders a full-screen "your account is paused — please email support@apex.example" page. No "click here to appeal" flow in v1.

### 5.7 Operating-hours soft enforcement (subsystem 7)

`hours-banner.js` checks browser local time (with America/Chicago override via `Intl`). Outside 5 a.m.–11 p.m., a banner appears: *"Texas rule §84.600 limits instruction to 5 a.m.–11 p.m. Time spent now may not count toward your course requirement."* User can continue. Each session start outside hours logs `outside_hours_session_started` to audit.

This is intentionally soft. The rule's application to async self-paced online is ambiguous; flagged for TDLR pre-clearance.

### 5.8 Anti-tamper signals (subsystem 8)

Folded into the audit event log as event types:
- `tab_visibility_change` — every `document.visibilitychange`
- `tab_multi_detected` — page registers a `BroadcastChannel` and listens for echoes (a second tab gets detected via the echo)
- `paste_into_quiz` — paste event listener on quiz inputs
- `devtools_open_suspected` — `window.outerWidth - window.innerWidth > 200` heuristic on resize
- `rapid_input_burst` — >5 inputs/sec for 3+ consecutive seconds

These are signals not blockers. They go to the audit log; lockouts open only on the explicit identity/clip rules.

## 6. Integration points (where existing code is touched)

| File | Change |
|---|---|
| `backend/main.py` | Split per §4.1; add compliance routes; add lockout middleware that returns 423 if user has open lockout |
| `backend/main.py` `update_topic_progress` | Bump 0.66 → 0.70 |
| `backend/main.py` `complete_lesson` | Add `chapter_minutes.minutes >= minimum_minutes` check before crediting |
| `frontend/scripts/app.js` | Bootstrap compliance scripts on every authenticated page |
| `frontend/lesson.html` | Import `timer.js`, `identity.js`, `clip-gate.js`, `tamper.js`, `lockout.js`, `hours-banner.js` |
| `frontend/topic.html` | Same imports |
| `frontend/drive.html` | Same imports |
| `frontend/dmv-test.html` | Bump local quiz pass threshold from 6/8 to 0.70 via shared constant |
| `frontend/signup.html` | After successful signup, redirect to `/identity-setup.html` (new page) |
| `frontend/scripts/curriculum.js` | Add `minimum_minutes` to each chapter (already has `minutes` — confirm it's the floor, not the budget) |
| **NEW** `frontend/identity-setup.html` | 5-10-Q registration flow |
| **NEW** `frontend/admin-lockouts.html` | Read-only list w/ close action (simple table, admin-only) |
| `backend/admin_unlock.py` | Convert to a CLI that grants `role='admin'` to a given email |

## 7. Open questions to confirm with TDLR before launch

These don't block engine work but they block actually filing:
1. Whether the 5 a.m.–11 p.m. operating-hours rule applies to async self-paced online sessions.
2. Whether gamification cosmetic UI (XP popups, badge unlock animations) counts as "distracting material" during instructional time.
3. The required question count and bank size for the teen DE final exam (not in rule text; lives in Course Approval Guide).
4. Whether our personal-validation question approach is sufficient or TDLR requires a third-party identity-data integration for a teen course.

## 8. Out of scope (this design)

These are real TDLR-submission blockers but they are content / business / operations work, not engine work:
- Restructuring curriculum from 10 modules → 12 POI-DE-aligned topics
- Adding mandated content: human trafficking recognition, anatomical gifts, SB 1366 work-zone (effective May 1, 2026), street racing under §545.420, Texas Driving with Disabilities Program, Community Safety Education Act
- TDLR provider license application (Form via Versa, $500 fee, $300 endorsement, $10K surety bond on DES138N)
- AMI course approval application
- Electronic certificate template pre-approval
- DE-964 certificate number ordering
- Module-1 mastery → DE-964 Learner-License-half issuance flow (depends on cert template approval)
- Texas-licensed education attorney review
- Compliance ops hire (~Month 5)

## 9. Risks

- **The 1,920-min content total may not currently sum.** Existing curriculum claims 32 hours but uses a 55-min/hour definition. If summed at face value across the 10 modules, total may be ≤ 1,760 min vs the 1,920-min AMI floor. Engine will refuse to mark the course "complete" if course-wide minutes are short, so this surfaces immediately when first student completes — but should be checked sooner.
- **Schema migrations on existing apex.db are non-trivial.** Adding columns to existing tables requires `ALTER TABLE` w/ SQLite's quirks. Mitigation: `try/except` pattern in `init_db()` for ADD COLUMN, and `apex.db` is a dev DB that can be deleted.
- **The audit event log will dominate write volume.** Mitigation: write-batch ticks server-side (one row per 30-second client POST, not per 5-sec tick).
- **`role='admin'` check via `users.role` reuses a field also valued `teen | parent`.** Risk of accidental admin demotion if a student edits their profile. Mitigation: profile-update endpoints reject changes to `role`; admin role only set via the CLI.

## 10. Acceptance criteria

This engine is "done" when:
- A new student signs up → must complete identity-question registration before any lesson
- Each chapter is gated by minimum-minutes server-side; client-side timer correctly pauses on blur/idle
- A chapter w/ a registered clip (the test fixture clip) shows a comprehension question after the clip ends; wrong answer makes the clip replay; second wrong answer opens a lockout
- A student who fails identity validation cumulatively above 30% (after 10+ challenges) sees a 423 lockout screen on next API call
- Operating-hours banner appears outside 5–11 hours, doesn't block, logs a violation
- Audit log shows all events with correct retain_until
- Mastery threshold is 0.70 everywhere — verified by grep for 0.66 / `>= 6 ` in checkpoint code paths
- Admin can list open lockouts and close one from `admin-lockouts.html`
- No existing functionality regressed (BTW logbook, drive simulator, mini-games, leaderboard, car selection all still work)
