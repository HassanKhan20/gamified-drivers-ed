# Specification 02 — Time-on-Task Enforcement

*This document describes how the APEX online driver education course satisfies the active-time and anti-skip requirements of 16 TAC §84.501 by measuring active student engagement on a one-second cadence, pausing the measurement on inattention or tab departure, capping per-request credit server-side, and refusing to mark any chapter complete until the per-chapter minimum-minutes floor has been met.*

---

## 1. Regulatory Basis

16 TAC §84.501 requires an AMI driver education course to ensure that the student spends the prescribed instructional time on each unit of the course, without the ability to circumvent the requirement by leaving the page open, opening a second tab, or otherwise simulating engagement while absent. The same rule, read together with the Texas program-of-instruction guide for driver education (POI-DE), establishes a total course duration of **1,920 minutes (32 hours)** for a teen driver education course.

This specification describes how the time-on-task subsystem, implemented in `backend/compliance/timer.py` and `frontend/scripts/compliance/timer.js`, enforces both the per-chapter minimum and the overall course duration.

## 2. Active-Time Measurement

### 2.1 Definition of "active"

The client-side accumulator credits one second of active time to the current lesson on each one-second internal tick if and only if **all** of the following conditions are true at that instant:

1. The browser's `document.visibilityState` is not `'hidden'`.
2. The page has not received a `blur` event without a subsequent `focus`.
3. The student has produced at least one input event — `keydown`, `pointerdown`, `pointermove`, `wheel`, or `scroll` — within the prior **sixty (60) seconds**, the idle threshold defined by `TIMER_IDLE_PAUSE_SECONDS` in the central configuration.

If any of those conditions fails, the tick is dropped and no second is credited.

### 2.2 Tick cadence

The local tick fires every 1,000 milliseconds (`TICK_LOCAL_INTERVAL_MS`). Credited seconds accumulate in a `pendingSeconds` counter.

### 2.3 Server post cadence

Every 30,000 milliseconds (`TICK_POST_INTERVAL_MS`), the client flushes the pending counter to the server via `POST /api/compliance/timer/tick` with the lesson identifier and the integer second count for the prior 30-second window. On network failure the pending seconds are returned to the counter for retry on the next interval.

## 3. Pause Triggers

The following events cause the local accumulator to enter the paused state and post a `time_pause` audit event:

| Event | Trigger | Audit payload reason |
|---|---|---|
| Document hidden | `document.visibilityState === 'hidden'` | `hidden` |
| Window blur | `window` `blur` event without subsequent `focus` | `blur` |
| Idle | `now() - lastInputAt > 60_000` ms | `idle` |

In addition, every change to `document.visibilityState` posts a `tab_visibility_change` event regardless of the resulting paused state.

The student resumes accruing time when the page is once again visible, focused, and an input event occurs within the idle threshold. The resume transition posts a `time_resume` audit event.

## 4. Server-Side Per-Tick Cap

Every `POST /api/compliance/timer/tick` request is processed as follows:

1. The request body is validated by Pydantic: `seconds` must be a non-negative integer no greater than 600.
2. The server applies a defensive ceiling of **120 seconds** per tick (`PER_TICK_CAP_SECONDS`). If the client reports more than 120 seconds in a single request, only 120 are credited.
3. The credited seconds are added to `chapter_seconds.seconds` for the (user, lesson) pair via an upsert.
4. The server writes one row to `audit_events` with `event_type = 'time_tick'` and a payload containing both the requested seconds and the credited seconds, so the auditor can see any divergence.

The 120-second cap is the engine's primary defense against client tampering of the time accumulator. Even if a hostile client were to fabricate a tick claiming an entire hour of active time, the server would credit only two minutes and would record the discrepancy in the audit log. In practice the client posts 30-second batches, so legitimate use never exceeds 30 seconds per tick.

## 5. Per-Chapter Minimum Minutes

### 5.1 Authoring source of truth

The required active-time floor for each chapter is sourced from `backend/compliance/curriculum_minutes.json`. This file is generated from the frontend authoring source (`frontend/scripts/curriculum.js`) by a pre-commit synchronization script, so the curriculum and the server-side compliance check cannot drift apart.

The current map contains entries for forty-two chapters across ten modules. Sample entries:

| Chapter ID | Minimum minutes |
|---|---|
| `1.1` | 30 |
| `2.3` | 55 |
| `4.1` | 60 |
| `9.4` | 30 |

### 5.2 Sum to the AMI floor

The per-chapter minutes are designed so that the sum across all chapters meets or exceeds the AMI floor of **1,920 minutes (32 hours)** required by §84.501 read with the POI-DE. The engine verifies the floor at chapter-complete time (per-chapter) and at course-complete time (total).

### 5.3 Gate at chapter completion

When the student attempts to advance past a chapter (existing endpoint `/api/progress/lesson` and the chapter-complete path described in the engine design document), the server compares the accumulated `chapter_seconds.seconds` for that (user, chapter) against `minimum_minutes * 60`. If the accumulated value is less than the floor, the server returns HTTP 409 with a body of `{required, have}` and **does not** mark the chapter complete.

This means a student cannot skip past content — neither by URL manipulation, by deleting cookies, nor by clicking advance prematurely. The only path to chapter completion is to accrue at least the prescribed active seconds.

## 6. Audit Records

The time-on-task subsystem writes the following audit event types to `audit_events`:

- `time_tick` — every credited tick batch, with both `seconds_requested` and `seconds_credited` (so the cap is visible to the auditor)
- `time_pause` — every transition into the paused state, with reason `blur`, `hidden`, or `idle`
- `time_resume` — every transition out of the paused state
- `tab_visibility_change` — every change to `document.visibilityState` regardless of pause status
- `chapter_started` / `chapter_completed` — chapter boundary events

Each row carries `retain_until = occurred_at + 3 years` per §84.81. The combination of these event types allows an auditor to reconstruct, for any student and any chapter, the full attendance pattern: when the student entered the chapter, every interval of active engagement, every blur and resume, and the moment the chapter was completed with the cumulative active-second total.

## 7. Treatment of Concurrent Tabs

Per Specification 05, a `BroadcastChannel` listener detects when a second browser tab loads any APEX page for the same user. The detection itself does not pause the timer in the first tab, but the second tab emits a `tab_multi_detected` audit event so that an auditor can see the concurrent-session pattern. Because the timer in each tab runs independently and each only credits one second per real-world second, opening multiple tabs does not double-credit the student — the bottleneck is wall-clock time accrued under the per-tab visibility and input conditions of §2.1.

## 8. Configuration Reference

| Constant | Value | Source |
|---|---|---|
| `TICK_LOCAL_INTERVAL_MS` | 1,000 ms | `timer.js` |
| `TICK_POST_INTERVAL_MS` | 30,000 ms | `timer.js` |
| `PER_TICK_CAP_SECONDS` | 120 s | `timer.py` |
| `TIMER_IDLE_PAUSE_SECONDS` | 60 s | `config.py`, exposed via `/api/compliance/config` |
| Per-chapter minimum minutes | per `curriculum_minutes.json` | `compliance/curriculum_minutes.json` |
| Course-total floor | 1,920 minutes | POI-DE per §84.501 |
