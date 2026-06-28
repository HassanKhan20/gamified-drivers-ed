# Specification 04 — Records and Audit Log Retention

*This document describes how the APEX online driver education course satisfies the records-retention requirement of 16 TAC §84.81 by maintaining an append-only `audit_events` log of every consequential student action, stamping each row with a three-year `retain_until` timestamp, and exposing audit endpoints that allow a TDLR reviewer to reconstruct any student's full course history.*

---

## 1. Regulatory Basis

16 TAC §84.81 requires a driver education provider to maintain student records for not less than three (3) years and to produce them for inspection on request by the Department. 16 TAC §84.501 specifies the events that must be captured for an AMI course: identity validations, comprehension-question outcomes, active-time accounting, mastery outcomes, and lockout activity. This specification describes how those records are persisted, retained, and produced. The implementation lives in `backend/compliance/audit.py`.

## 2. Append-Only Design

The `audit_events` table is the canonical compliance log. Its schema is:

```sql
CREATE TABLE audit_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    event_type TEXT NOT NULL,
    lesson_id TEXT,
    payload_json TEXT,
    occurred_at TEXT DEFAULT CURRENT_TIMESTAMP,
    retain_until TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_audit_user_time ON audit_events(user_id, occurred_at);
CREATE INDEX idx_audit_type ON audit_events(event_type);
```

All compliance-engine writes to this table go through the single helper `log_event(db, user_id, event_type, lesson_id, payload)`. There is no application code path that issues `UPDATE` or `DELETE` against `audit_events`. The table is treated as an append-only log for the lifetime of the data.

The `retain_until` column is computed as `occurred_at + 1,095 days` (3 × 365) at the moment the row is written. No automated deletion job runs against the table. Records may be removed only by explicit operator action after `retain_until` has passed, and any such operation is performed through a documented retention-purge procedure outside the application runtime.

## 3. Event Type Enumeration

The following event types are written to `audit_events` by the compliance engine. The table indicates the subsystem of origin and the source rule.

| Event type | Written by | Rule |
|---|---|---|
| `identity_seeded` | `identity.py` — registration | §84.501 |
| `identity_q_asked` | `identity.py` — challenge creation | §84.501 |
| `identity_q_answered` | `identity.py` — answer scoring | §84.501 |
| `identity_q_timeout` | `identity.py` — response window exceeded | §84.501 |
| `clip_started` | `clip-gate.js` — playback start | §84.501 |
| `clip_finished` | `clip-gate.js` — playback end | §84.501 |
| `clip_question_correct` | `multimedia.py` — comprehension pass | §84.501 |
| `clip_question_wrong` | `multimedia.py` — comprehension fail | §84.501 |
| `time_tick` | `timer.py` — every credited active-time batch | §84.501 |
| `time_pause` | `timer.js` — blur, hidden, or idle transition | §84.501 |
| `time_resume` | `timer.js` — return to active state | §84.501 |
| `tab_visibility_change` | `timer.js` — `visibilitychange` event | §84.501 |
| `tab_multi_detected` | `tamper.js` — second tab detected via BroadcastChannel | §84.501 |
| `devtools_open_suspected` | `tamper.js` — outer/inner width gap heuristic | §84.501 |
| `paste_into_quiz` | `tamper.js` — paste into input or textarea | §84.501 |
| `rapid_input_burst` | `tamper.js` — >15 keydowns in 3 s | §84.501 |
| `outside_hours_session_started` | `hours-banner.js` — instruction outside 5 a.m.–11 p.m. | §84.600 |
| `chapter_started` | progress endpoint — chapter entry | §84.501 |
| `chapter_completed` | progress endpoint — chapter advance | §84.501 |
| `mastery_passed` | `mastery.py` — score ≥ 0.70 | §84.502 / POI-DE |
| `mastery_failed` | `mastery.py` — score < 0.70 | §84.502 / POI-DE |
| `lockout_opened` | `lockouts.py` — `open_lockout()` | §84.501 |
| `lockout_closed` | `lockouts.py` — admin close | §84.501 |
| `lockout_open_pending` | engine fallback when lockouts module is unavailable | internal |

The enumeration is extensible. The frontend `/event` endpoint validates event types against an allowlist (`ALLOWED_EVENT_TYPES` in `timer.py`) to prevent arbitrary strings entering the log.

## 4. Per-Event Payload Contents

The `payload_json` column carries the event-specific facts a TDLR auditor would need to evaluate compliance. Selected examples:

- `identity_q_asked` — `{challenge_id, question_id}`
- `identity_q_answered` — `{challenge_id, correct, timed_out, response_ms}`
- `clip_question_wrong` — `{question_id, answer_index}`
- `time_tick` — `{seconds_requested, seconds_credited, signals}` — exposing any divergence between client-claimed and server-credited time
- `tab_multi_detected` — `{other_id}` — the second tab's broadcast UUID
- `lockout_opened` — `{reason, lockout_id}`

The `lesson_id` column carries the chapter identifier when the event has lesson context.

## 5. Three-Year Retention Implementation

Three retention paths exist in the engine, all setting `retain_until = now + 365 × 3 days`:

| Table | Set by |
|---|---|
| `audit_events` | `audit.log_event()` for every row |
| `identity_challenges` | `identity.py` at challenge creation |
| `clip_views` | `multimedia.py` at view insertion |

The user, lesson, mastery, and lockout tables are retained for the lifetime of the database (no `retain_until` column) because they are required for course-completion certification beyond the three-year window. This conservative approach exceeds the §84.81 minimum.

## 6. Audit Production for TDLR

### 6.1 Endpoint access

Read endpoints scoped to a single user are available to that user (e.g. `GET /api/compliance/lockouts/me`). Bulk audit access — across users or across event types — is gated by `users.role = 'admin'`. The role is set out-of-band through a one-shot CLI tool (`admin_unlock.py`) and is not modifiable through any public-facing endpoint.

### 6.2 Sample SQL queries

A TDLR reviewer with read access to the database can produce the following reports directly. Examples for an arbitrary user with `user_id = 42`:

**Full identity-validation history for one student:**

```sql
SELECT id, event_type, lesson_id, payload_json, occurred_at
  FROM audit_events
 WHERE user_id = 42
   AND event_type IN ('identity_seeded', 'identity_q_asked',
                      'identity_q_answered', 'lockout_opened',
                      'lockout_closed')
 ORDER BY occurred_at;
```

**Active-time totals by chapter for one student:**

```sql
SELECT chapter_id, seconds AS active_seconds, ROUND(seconds/60.0, 1) AS minutes
  FROM chapter_seconds
 WHERE user_id = 42
 ORDER BY chapter_id;
```

**Every credited time tick with both claimed and credited seconds (audit of cap enforcement):**

```sql
SELECT occurred_at, lesson_id,
       json_extract(payload_json, '$.seconds_requested') AS claimed,
       json_extract(payload_json, '$.seconds_credited')  AS credited
  FROM audit_events
 WHERE user_id = 42 AND event_type = 'time_tick'
 ORDER BY occurred_at;
```

**All comprehension-question outcomes across the population for one clip:**

```sql
SELECT user_id, occurred_at, event_type, payload_json
  FROM audit_events
 WHERE event_type IN ('clip_question_correct', 'clip_question_wrong')
   AND lesson_id = 'm4-c2-roadrage-clip'
 ORDER BY occurred_at;
```

**Every lockout opened in a date range, with reason:**

```sql
SELECT l.id, l.user_id, u.email, l.reason,
       l.opened_at, l.closed_at, l.closed_by
  FROM lockouts l
  JOIN users u ON u.id = l.user_id
 WHERE l.opened_at BETWEEN '2026-05-01' AND '2026-08-01'
 ORDER BY l.opened_at;
```

**Records nearing retention expiry:**

```sql
SELECT event_type, COUNT(*) AS row_count, MIN(retain_until) AS earliest_expiry
  FROM audit_events
 WHERE retain_until < datetime('now', '+30 days')
 GROUP BY event_type;
```

## 7. Storage and Scaling

The `audit_events` table is stored in SQLite for the year-one deployment. At the projected enrollment (low thousands of students) the table is expected to remain under ten million rows. Should the row count approach that threshold, the migration path is to partition by calendar year or move the table to PostgreSQL — neither operation requires a schema change visible to the consuming endpoints.

The compliance engine writes one audit row per 30-second client tick batch (not per one-second internal tick) — this is the dominant volume source and was sized deliberately to keep write rates within SQLite's comfortable range.

## 8. Records Other Than Audit Events

The following ancillary records are also retained, with the same three-year minimum:

| Table | Records |
|---|---|
| `identity_questions` | Registered prompts and normalized answers per user |
| `identity_challenges` | Each identity challenge issued, with response time and outcome |
| `clip_views` | Each multimedia clip viewing, with question and outcome |
| `chapter_seconds` | Per-user, per-chapter active-time totals |
| `lockouts` | Open and closed lockouts, with reason, administrator email, and notes |

Together with `audit_events`, these tables constitute the complete student instructional record for TDLR audit purposes.
