# Specification 03 — Multimedia Comprehension Gates

*This document describes how the APEX online driver education course satisfies the multimedia-comprehension requirement of 16 TAC §84.501 by requiring, for every instructional video clip longer than 180 seconds, a comprehension question on completion; presenting a randomly selected question from a registered bank of no fewer than four; forcing a replay on a first wrong answer; and opening a lockout on a second wrong answer.*

---

## 1. Regulatory Basis

16 TAC §84.501 requires an AMI driver education course to verify, through comprehension questions, that the student attended to and understood any substantial instructional multimedia segment. The rule is implemented in APEX by gating every clip longer than three minutes behind a randomly-selected comprehension question, with deterministic remediation paths on incorrect answers. The implementation lives in `backend/compliance/multimedia.py` and `frontend/scripts/compliance/clip-gate.js`.

## 2. Threshold

The minimum-duration trigger is **180 seconds**, exposed in the central configuration as `MULTIMEDIA_GATE_MIN_SECONDS` and surfaced to the frontend via `GET /api/compliance/config`. Any registered clip with `duration_sec > 180` triggers the gate. Clips of 180 seconds or less are exempt; the rationale is that short clips (typically used in APEX for transitions, callouts, and micro-explanations) do not constitute the substantial instructional segment the rule contemplates.

## 3. Clip Registry

Every long-form clip used in instructional content must be registered in the database before it can be presented. Registration consists of:

1. One row in `multimedia_clips` containing the clip identifier (e.g. `m4-c2-roadrage-clip`), its `duration_sec`, the parent lesson identifier, and an optional title.
2. **At least four (4)** rows in `clip_questions`, each with a prompt, an options list (JSON array of 2 to 8 strings), and the index of the correct option.

The minimum-four-questions floor is enforced by Pydantic at the seeding endpoint (`conlist(QuestionSpec, min_length=4, max_length=12)`). An attempt to register a clip with fewer than four questions is rejected with HTTP 422. The minimum supports the random-selection rule in §4 by guaranteeing that no two consecutive viewings of the same clip will reliably present the same question.

### 3.1 Current registry state

As of the date of this submission, **zero clips are registered** in `multimedia_clips`. This reflects an authoring decision: the existing APEX short-form video assets are all under 180 seconds and therefore exempt from the gate. The interactive driving scenarios are not video clips and likewise do not trigger the rule.

The engine is nevertheless fully implemented and exercised by the automated test suite using a synthetic clip fixture. When a curriculum author registers a long-form clip in a future content release, the gate will engage automatically with no code change.

## 4. Question Selection

When the student requests clip metadata via `GET /api/compliance/clips/{clip_id}`, the server:

1. Loads the clip row from `multimedia_clips`. A missing clip returns HTTP 404.
2. Selects one question from `clip_questions` for that clip uniformly at random (`ORDER BY RANDOM() LIMIT 1`). A clip with no registered questions returns HTTP 409.
3. Returns the clip metadata together with the question's prompt, the option list, and the question ID. **The correct option index is not returned** — it is held server-side.

## 5. Answer Grading

On `POST /api/compliance/clips/{clip_id}/view` with `{finished, question_id, answer_index}`:

1. The server loads the question row by `(question_id, clip_id)`. A mismatch returns HTTP 404, preventing a client from submitting an answer to a different clip's question.
2. The server compares the submitted `answer_index` to the stored `correct_index`.
3. A row is inserted into `clip_views` with `finished_at = CURRENT_TIMESTAMP`, the question identifier, the boolean answered-correctly outcome, and `retain_until = now + 3 years`.
4. An audit event is written with `event_type = 'clip_question_correct'` or `'clip_question_wrong'` and a payload containing the question identifier and the submitted answer index.

## 6. Remediation Paths

The response body of `POST /api/compliance/clips/{clip_id}/view` indicates the next required step:

### 6.1 Correct answer

`{correct: true, must_replay: false, lockout_opened: false}` — the student advances. The clip view counts toward chapter completion.

### 6.2 First wrong answer

`{correct: false, must_replay: true, lockout_opened: false}` — the client renders the clip again from the beginning, then re-presents a randomly selected question on completion. The replay rule is enforced by counting prior wrong views in `clip_views` for the (user, clip) pair: if there is one wrong view and no correct view, replay is required.

### 6.3 Second wrong answer

If the server counts **two or more** wrong views for the same (user, clip) pair after inserting the current wrong row, the engine calls `open_lockout(user_id, reason='clip_gate_failure')`. The student then encounters the standard lockout flow described in Specification 01 §6.3 and Specification 04 §3: subsequent API calls return HTTP 423 Locked, and an administrator must review the audit log and close the lockout via the admin endpoint.

The second-wrong-equals-lockout rule mirrors the regulatory expectation that a student who cannot demonstrate basic comprehension of an instructional clip after a second attempt should be reviewed by staff before further progress.

## 7. Audit Records

The multimedia comprehension subsystem writes the following audit event types to `audit_events`:

- `clip_started` — when the player begins playback
- `clip_finished` — when playback reaches the end of the clip
- `clip_question_correct` — correct answer to the comprehension question
- `clip_question_wrong` — incorrect answer to the comprehension question
- `lockout_opened` (reason `clip_gate_failure`) — second wrong answer triggers
- `lockout_closed` — administrative close

In addition, each clip view writes one row to `clip_views`. The combination of `clip_views` and the audit event log allows a TDLR auditor to reconstruct, for any student and any clip, the full viewing history: every start, every finish, the question presented on each viewing, the answer chosen, and the outcome.

Each row in `clip_views` and each audit row carries `retain_until = occurred_at + 3 years` per §84.81.

## 8. Configuration Reference

| Constant | Value | Source |
|---|---|---|
| `MULTIMEDIA_GATE_MIN_SECONDS` | 180 s | `config.py` |
| Minimum questions per clip | 4 | `multimedia.py` Pydantic constraint |
| Maximum questions per clip | 12 | `multimedia.py` Pydantic constraint |
| Replay-on-first-wrong | required | `multimedia.py` |
| Lockout-on-second-wrong | reason `clip_gate_failure` | `multimedia.py` |
| Retention | 3 years | `multimedia.py` `RETENTION_DAYS = 365 * 3` |
