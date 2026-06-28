# Specification 01 — Personal Identity Validation

*This document describes how the APEX online driver education course satisfies the personal validation requirement of 16 TAC §84.501 by issuing periodic identity-challenge questions, scoring responses against a normalized answer bank, and locking the student out of the course when the cumulative wrong-answer rate exceeds the regulatory threshold.*

---

## 1. Regulatory Basis

16 TAC §84.501 requires every alternative method of instruction (AMI) driver education course to verify, during instruction, that the person consuming the course is the enrolled student. The rule permits, among other methods, **periodic personal validation questions** drawn from information the student supplied at registration. This specification describes the design, scheduling, scoring, retention, and lockout behavior of that subsystem as implemented in `backend/compliance/identity.py`.

The system is also designed to permit, at a later date, substitution of a third-party knowledge-based authentication (KBA) provider in the same code path without altering the surrounding course flow.

## 2. Question Bank and Registration

### 2.1 Curated prompt bank

A fixed list of twenty-five (25) personal-validation prompts is maintained server-side in `CURATED_PROMPTS`. Examples include:

- *"What was your first pet's name?"*
- *"In what city were you born?"*
- *"What is the name of your elementary school?"*
- *"What is your mother's maiden name?"*
- *"What street did you grow up on?"*

The full list is selected to be (a) answerable by a teenage student without consulting external records, (b) stable over the duration of the course, and (c) unlikely to be guessable by another individual sharing the same device or household.

### 2.2 Seeding flow

At registration — and before the student is permitted to begin any instructional content — the student is required to:

1. Select **between five (5) and ten (10) prompts** from the curated bank.
2. Provide an answer of between 1 and 120 characters for each selected prompt.

The endpoint `POST /api/compliance/identity/seed` enforces these bounds via Pydantic validators (`conlist(SeedItem, min_length=5, max_length=10)`). Submitting fewer than five or more than ten answers is rejected with HTTP 422.

### 2.3 Answer normalization and storage

Each answer is normalized before storage by:

1. Trimming leading and trailing whitespace.
2. Collapsing internal whitespace runs to a single space.
3. Converting all characters to lowercase.

The normalized value is written to `identity_questions.answer_norm`. Answers are **not password-hashed**. This is a deliberate design choice: §84.501 contemplates that an auditor may need to inspect what the student registered as their correct answer in order to verify that the system was applying the validation rule correctly. Personal validation answers are not security secrets in the password sense; they are reference values for an identity-comparison routine. They are protected by access control (admin-only audit endpoints) and by the application's session model, not by hashing.

The record persisted at seeding is:

| Column | Contents |
|---|---|
| `user_id` | Foreign key to `users.id` |
| `prompt_id` | Stable identifier from the curated bank (e.g. `first_pet`) |
| `prompt` | Human-readable prompt text shown to the student |
| `answer_norm` | Normalized answer, as defined above |
| `created_at` | UTC timestamp of seeding |

A successful seed writes one row to `audit_events` with `event_type = 'identity_seeded'` and a payload containing the count of questions registered.

## 3. Challenge Scheduling

### 3.1 One challenge per lesson, randomized

The compliance engine issues **at most one identity challenge per (user, lesson)** combination. On the student's first visit to a lesson, the client calls `GET /api/compliance/identity/next?lesson_id={id}`. The server then:

1. Checks `identity_challenges` for any existing row matching `(user_id, lesson_id)`. If one exists, no new challenge is created — the prior outcome stands.
2. If no row exists, the server draws a uniform random number. With probability **0.70** a new challenge is created; otherwise the call returns `null` and no challenge is recorded.
3. When a challenge is created, the server selects one of the student's seeded questions uniformly at random and returns the prompt to the client along with the response window.

The 70% scheduling probability means that, across a course composed of multiple chapters with multiple lessons each, the student will be challenged on the order of several dozen times during the 32-hour course. The randomization prevents a memorize-the-pattern bypass strategy.

A test-only `force=1` query parameter bypasses the random draw and is used solely by the automated regression suite.

### 3.2 Audit record at challenge creation

Each created challenge writes:

- A row to `identity_challenges` with `asked_at = CURRENT_TIMESTAMP`, `retain_until = now + 3 years`, and the foreign key to the selected question.
- A row to `audit_events` with `event_type = 'identity_q_asked'`, the lesson identifier, and a payload containing the `challenge_id` and `question_id`.

## 4. Response Window

The student has **ninety (90) seconds** from the moment the prompt is rendered to submit an answer. The window is enforced in two places:

1. **Client-side:** The browser displays a countdown and auto-submits a timeout response when the window elapses.
2. **Server-side:** The `POST /api/compliance/identity/check` endpoint accepts a `response_ms` value reported by the client and rejects the response as a timeout (counted as wrong) if `response_ms > 90,000`.

The 90-second window is published by the `/api/compliance/config` endpoint as `identity_response_seconds`, so the value is a single source of truth across backend and frontend.

## 5. Answer Scoring

On `POST /api/compliance/identity/check`:

1. The submitted answer is normalized using the same routine described in §2.3.
2. The normalized submission is compared by exact string equality against `identity_questions.answer_norm`.
3. A timeout (per §4) is treated as `correct = 0`.
4. The challenge row is updated with `answered_at`, `response_ms`, and `correct` (0 or 1). A second answer to the same challenge is rejected with HTTP 409.
5. An audit record is written with `event_type = 'identity_q_answered'` and a payload containing the challenge ID, the correctness outcome, whether the response timed out, and the recorded response time in milliseconds.

## 6. Lockout Threshold

### 6.1 Math

After every answered challenge, the server recomputes the student's cumulative answered-challenge statistics:

- `total` = count of identity challenges where `answered_at IS NOT NULL`
- `wrong` = count of identity challenges where `correct = 0`

A lockout is opened if and only if **both** of the following hold:

1. `total >= 10` (the warmup floor, `IDENTITY_WARMUP_MIN_TOTAL`), and
2. `wrong / total > 0.30` (the wrong-rate threshold, `IDENTITY_WRONG_RATE_LOCKOUT`).

### 6.2 Rationale for warmup

The 10-challenge warmup prevents a single early mistake — for example, a student mistyping "fluffy" as "flufy" at challenge two — from triggering a lockout when statistical reliability is impossible at low sample sizes. Once the student has answered ten or more challenges, the 30% threshold becomes the operative test.

### 6.3 Lockout effect

When the threshold is crossed, the engine calls `open_lockout(user_id, reason='identity_validation_threshold')`. This:

1. Inserts a row into `lockouts` with `opened_at = CURRENT_TIMESTAMP` and `closed_at = NULL`.
2. Writes an audit record with `event_type = 'lockout_opened'` and a payload identifying the reason.
3. Causes the per-request lockout middleware (see Specification 04 §3) to respond to subsequent API calls with HTTP 423 Locked.

A locked student can no longer accrue course time or progress until a designated administrator reviews the audit log and closes the lockout via `POST /api/admin/lockouts/{id}/close`. The administrator's email and any notes are recorded on the lockout row.

## 7. Question Re-use Policy

Each call to `GET /api/compliance/identity/next` selects one of the student's seeded questions uniformly at random (`ORDER BY RANDOM() LIMIT 1`). Because the student registered between 5 and 10 questions, every challenge is drawn from the student's own answer bank and not from any pre-populated default set.

## 8. Audit Records

Per §84.501 and §84.81, the following records are retained for not less than three years (`retain_until = occurred_at + 3 years`):

| Table | Records |
|---|---|
| `identity_questions` | One row per registered (user, prompt) pair |
| `identity_challenges` | One row per challenge issued, with asked / answered timestamps, response time, and correctness |
| `audit_events` | `identity_seeded`, `identity_q_asked`, `identity_q_answered`, `lockout_opened`, `lockout_closed` |

A TDLR auditor reviewing a single student's identity-validation history can reconstruct the full sequence — registration, every challenge issued, every response, the running wrong-rate, and any lockout — by reading those four event types in occurrence order for that `user_id`.

## 9. Configuration Reference

All thresholds are centralized in `backend/compliance/config.py` and exposed at `GET /api/compliance/config`:

| Constant | Value | Rule |
|---|---|---|
| `IDENTITY_RESPONSE_SECONDS` | 90 | §84.501 |
| `IDENTITY_WARMUP_MIN_TOTAL` | 10 | §84.501 |
| `IDENTITY_WRONG_RATE_LOCKOUT` | 0.30 | §84.501 |

Changes to these values are version-controlled and reflected at the next configuration fetch.
