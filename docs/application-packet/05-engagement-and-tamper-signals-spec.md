# Specification 05 — Engagement and Tamper Signals

*This document describes how the APEX online driver education course satisfies the active-participation expectation of 16 TAC §84.501 by recording, as defense-in-depth audit signals, browser-level events that indicate a student's engagement state — tab visibility changes, multi-tab opens, developer-tools-open suspicion, paste events into quiz inputs, and rapid-input bursts — while keeping the lockout decision tied to the explicit identity and comprehension rules described elsewhere in this packet.*

---

## 1. Regulatory Basis

16 TAC §84.501 requires that an AMI driver education course be designed to ensure active student participation throughout the instructional period. Beyond the explicit identity-challenge and comprehension-gate mechanisms described in Specifications 01 and 03, APEX captures a set of **engagement signals** drawn from the browser's standard event model. These signals are recorded to the audit log so that a TDLR reviewer may verify the engagement pattern of any student and, in aggregate, of the student population.

The signals are **defense-in-depth indicators, not lockout triggers**. Lockouts open only on the explicit rules of §84.501 (identity wrong-rate threshold and second clip-question failure). The signals provide the auditor with evidence to evaluate the credibility of the active-time accounting; they do not themselves block the student.

The implementation lives in `frontend/scripts/compliance/tamper.js` and the server-side accumulator at `backend/compliance/timer.py`.

## 2. Signal Inventory

The following five signals are emitted by the client and persisted in `audit_events`. Each is enumerated in `ALLOWED_EVENT_TYPES` on the server, so any event the server does not recognize is rejected with HTTP 422.

### 2.1 Tab visibility change (`tab_visibility_change`)

Every change to `document.visibilityState` — whether the page becomes hidden (the student switches tabs, minimizes the browser, or locks the device) or visible again — emits one `tab_visibility_change` event with a payload of `{hidden: true|false}`.

A visibility change to `hidden` also causes the active-time accumulator to pause (Specification 02 §3). The visibility event is recorded regardless of pause status, so the auditor can correlate the two streams.

### 2.2 Multi-tab detection (`tab_multi_detected`)

On startup, each instance of the APEX client opens a `BroadcastChannel` named `apex-compliance` and posts a `hello` message containing a randomly-generated UUID. The channel is scoped to the browser origin, so messages travel between tabs on the same browser running the APEX site. When an instance receives a `hello` from a UUID other than its own, it emits a `tab_multi_detected` event with a payload of `{other_id}`.

This signal indicates that the student has opened a second APEX tab. As discussed in Specification 02 §7, this does not double-credit active time (each tab can credit at most one wall-clock second per real-world second under the visibility and input gates), but the auditor can use the signal to evaluate the student's session pattern.

### 2.3 Developer-tools suspicion (`devtools_open_suspected`)

The client listens for `window` `resize` events. When the differential `window.outerWidth - window.innerWidth` crosses a 200-pixel threshold from below — the heuristic indication that a side-docked developer tools panel has opened — the client emits one `devtools_open_suspected` event with the observed gap.

The heuristic is intentionally conservative. It does not distinguish developer tools from any other browser-chrome panel of similar width, and it can produce false negatives (undocked devtools windows produce no inner-width change). The signal therefore stands as a flag for human review, not as evidence sufficient to invalidate a session.

### 2.4 Paste into quiz (`paste_into_quiz`)

A document-level `paste` listener emits a `paste_into_quiz` event whenever a paste event targets an `<input>` or `<textarea>`. The payload contains the target tag name.

A paste into a quiz field is a strong indicator that the student is consulting an external source — a notes file, a chat window, a second device — to provide the answer. Multiple paste events on assessment screens during a single chapter would warrant administrative review of the student's record.

### 2.5 Rapid-input burst (`rapid_input_burst`)

The client maintains a sliding window of `keydown` timestamps over the prior three seconds. When the window contains **more than fifteen events** (an instantaneous rate above five keystrokes per second sustained for three seconds), the client emits one `rapid_input_burst` event with the count and resets the window.

The signal flags input patterns inconsistent with a student typing answers naturally — most commonly, automation scripts or held-down keys.

## 3. Posting Protocol

All five signal types are posted to `POST /api/compliance/timer/event` with a request body of:

```json
{
  "event_type": "<one of the allowlisted types>",
  "lesson_id": "<lesson context, optional>",
  "payload":   { /* signal-specific facts */ }
}
```

The endpoint validates the event type against `ALLOWED_EVENT_TYPES` and rejects unknown types with HTTP 422. Valid events are written through `log_event()` to `audit_events` with `retain_until = now + 3 years`.

Failed network calls are silently swallowed on the client. This is a deliberate choice: a transient network error must not block the student from continuing instruction, and the absence of a signal is no more conclusive than the presence of one (signals are evidentiary, not gating). Server-side logs reveal connection-loss patterns at the infrastructure layer.

## 4. Defense-in-Depth Framing

The design treats these five signals as supporting evidence in a layered compliance posture, not as primary controls:

1. **Primary controls** — identity validation per §84.501 (Specification 01); comprehension gates per §84.501 (Specification 03); per-chapter minimum minutes per §84.501 (Specification 02); mastery threshold of 0.70 per POI-DE and §84.502.
2. **Server-side cap** — the 120-second per-tick cap on `/timer/tick` (Specification 02 §4) bounds the credit a tampered client can claim.
3. **Engagement signals** (this document) — additional evidence in `audit_events` that, in aggregate, allows an auditor to evaluate whether a given student's accumulated time and assessment outcomes reflect a credible engagement pattern.

The reason for the framing is two-fold. First, no individual browser signal is reliable enough on its own to justify denying a student credit for instruction; browser feature variance and student behavior heterogeneity produce both false positives and false negatives. Second, §84.501 is concerned with the design of the course as a whole — that there exist mechanisms to verify engagement — not with the deterministic punishment of any individual signal.

## 5. Use of the Signals During Audit

A TDLR reviewer evaluating a particular student's record can query `audit_events` for the engagement signals and correlate them with the time-on-task record. Examples:

**Multi-tab pattern for one student:**

```sql
SELECT lesson_id, occurred_at, payload_json
  FROM audit_events
 WHERE user_id = 42
   AND event_type = 'tab_multi_detected'
 ORDER BY occurred_at;
```

**Visibility-change rate by lesson (proxy for inattention):**

```sql
SELECT lesson_id, COUNT(*) AS visibility_changes
  FROM audit_events
 WHERE user_id = 42 AND event_type = 'tab_visibility_change'
 GROUP BY lesson_id
 ORDER BY visibility_changes DESC;
```

**Paste events during assessment lessons:**

```sql
SELECT occurred_at, lesson_id, payload_json
  FROM audit_events
 WHERE event_type = 'paste_into_quiz'
   AND user_id = 42;
```

**Rapid-input burst incidents across the population:**

```sql
SELECT user_id, COUNT(*) AS burst_count
  FROM audit_events
 WHERE event_type = 'rapid_input_burst'
 GROUP BY user_id
HAVING burst_count > 0
 ORDER BY burst_count DESC;
```

These queries support both individual-record review and population-level analysis at audit time.

## 6. Operating-Hours Engagement Signal

A sixth, related signal — `outside_hours_session_started` — is emitted by `frontend/scripts/compliance/hours-banner.js` when a student loads an instructional page outside the 5 a.m. to 11 p.m. window contemplated by 16 TAC §84.600. The implementation is a soft enforcement: a banner is displayed informing the student that instruction time outside those hours may not count toward the course requirement, and the session-started event is logged. The student is not blocked from continuing, because the application of §84.600 to asynchronous self-paced online instruction is a question APEX has flagged for TDLR pre-clearance.

The audit record allows a reviewer to identify any session conducted outside the 5 a.m.–11 p.m. window for any student.

## 7. Configuration Reference

| Signal | Threshold | Source file |
|---|---|---|
| `tab_visibility_change` | every transition | `timer.js` |
| `tab_multi_detected` | one `hello` from a different UUID on `apex-compliance` channel | `tamper.js` |
| `devtools_open_suspected` | outer/inner-width gap > 200 px on resize | `tamper.js` |
| `paste_into_quiz` | every paste into `<input>` or `<textarea>` | `tamper.js` |
| `rapid_input_burst` | > 15 `keydown` events in 3 s | `tamper.js` |
| `outside_hours_session_started` | local time outside 5 a.m.–11 p.m. | `hours-banner.js` |

All thresholds are version-controlled and surface in the audit log payload so that any change is recoverable on review.
