# Content Expansion + Interactive Rebuild — Design

**Date:** 2026-05-28
**Status:** Approach C approved verbally; reference chapter + sign-off pending
**Driving problem:** The 54 chapters carry 2,055 minutes of time floor but only ~15,900 words of content (7.7 words/floor-minute). Students read ~90 seconds of content then wait out a 40–50 minute timer. This is a student-experience failure, a retention failure, and a §84.501 compliance risk (the rule requires *presented instructional content*, not an idle timer).

---

## 1. Goal

Raise every chapter to a defensible content + interaction density so that the time floor is honestly filled with instruction, and present it through an interactive loop player. Target: a student spends the floor *engaged*, not waiting.

## 2. Density target (the contract)

Per §84.501, instructional time = presented content + active participation. We fill the floor with a blend:

| Component | Share of a chapter's minutes | How time is honestly consumed |
|---|---|---|
| Written teaching (chunked into beats) | ~50% | reading at ~130 wpm → ~30 words of content per floor-minute of reading |
| Interactive beats (micro-quiz, decision, drag) | ~30% | answering + feedback + reflection |
| Scenario / worked example | ~15% | branching decision with consequences |
| Recap + spaced retrieval | ~5% | retrieval practice |

**Concrete per-chapter target:** ~30 words/floor-minute of written content (up from 7.7), PLUS one branching scenario and 6–10 interactive checks. For a 45-minute chapter that's ~**1,300 words** of teaching (up from ~130) split into 7–10 teach beats, each followed by a check, plus a scenario. That genuinely fills ~45 minutes of engaged time.

**Course-wide:** ~2,055 floor-minutes × ~30 words/min ≈ **~60,000 words** of teaching content (up from ~16k), plus the interaction layer. ~4x expansion.

## 3. Schema — minimal churn, reuse the approved loop player

We do NOT invent a new chapter schema. We expand the existing fields and let the loop player chunk them:

**Reading chapters** keep `{id, title, minutes, type:'reading', body[], keyPoints[], quiz[]}` but:
- `body[]` grows from ~3 paragraphs to **7–10 focused paragraphs**, each a single teachable idea (so each becomes one teach beat)
- `quiz[]` grows from 3 to **6–10 questions**, so the loop player can place a check after roughly every 1–2 teach beats
- NEW optional `worked` field: `{setup, walkthrough}` — a concrete TX-specific worked example rendered as its own beat
- NEW optional `miniScenario` field: `{prompt, options[], correct, feedback{}}` — a single branching decision embedded mid-chapter for interaction

**Scenario chapters** keep their schema but gain:
- `body[]` (NEW, optional) — 2–3 setup/teaching paragraphs before the decision, so the scenario teaches, not just tests
- expanded `quiz[]` (3 → 5–6)

**Checkpoint chapters** unchanged in schema; exams may grow (8 → 10–12 Qs) for the bigger modules.

This means the loop player (below) is the same engine the user already approved; it just has more beats to render.

## 4. The loop player (frontend)

`lesson.html` rendering changes from "wall of text + end quiz" to a **beat sequence**:

1. **Pre-test gate** (optional, student-initiated): "Already know this? Test out." → answers the quiz cold → correct topics' teach beats collapse to skimmable, missed topics get emphasized. (Pretesting effect; agency for fast learners.)
2. **Teach beats**: one `body` paragraph per card, advanced by the student, with a beat counter ("4 of 11").
3. **Check beats**: a quiz question after every 1–2 teach beats, with instant feedback + the `why` shown immediately.
4. **Worked-example beat** (if present): the `worked` walkthrough.
5. **Mini-scenario beat** (if present): the embedded branching decision.
6. **Recap beat**: keyPoints + any spaced-repetition warmup items resurfaced from earlier missed questions.

The §84.501 time floor and the existing countdown bar are unchanged — the student still cannot complete before the floor, but now the floor is full of beats instead of dead air.

## 5. Spaced repetition (retention engine)

New backend table `question_attempts (user_id, question_key, correct, attempted_at)`. When a student misses a question, it is logged. At the start of later chapters, the loop player injects 1–2 "warmup" beats drawn from that student's prior misses (reworded). The final-exam draw weights toward each student's missed questions. (Spacing effect.)

`question_key` = `{chapter_id}:{quiz_index}` so it's stable and language-independent.

## 6. How content gets produced (mass production)

The expansion is the bulk of the work. Approach:
1. **Reference chapter first** (this spec ships with one): chapter 3.3 fully expanded to the target density and structure. It is the gold standard every other chapter is measured against.
2. **Parallel authoring agents**, each assigned a batch of chapters, each given: the existing thin chapter, the reference chapter as the quality bar, the density target, and the schema. Each returns expanded chapter objects.
3. **Validation gate**: the existing `validate_curriculum.js` (every quiz index valid) + `analyze_division.js` (every chapter now ≥25 words/floor-min) must pass before merge.
4. **Spanish re-translation**: expanded English invalidates the current Spanish (which matches the thin version). After English expansion is approved, re-run the translation pipeline (4 agents → merge_es.js with parity check) on the expanded content. **Spanish is regenerated last, once English is final.**

## 7. Sequencing

1. Ship reference chapter (3.3) + get sign-off on quality bar. ← gate
2. Build the loop player + spaced-repetition backend (engine work, parallelizable with content).
3. Mass-expand English content (parallel agents, batch by module).
4. Validate density + indices + e2e.
5. Re-translate Spanish on the final English.
6. Re-run full audit (validator, division analysis, e2e proof).

## 8. Out of scope

- Changing the 50-node journey order (stays).
- New media/video production (text + scenario interaction only; the multimedia-gate engine already exists for when video is authored).
- The drive simulator internals (unchanged; chapters may *link* to relevant sim scenarios as enrichment).

## 9. Risks

- **Volume**: ~45,000 new words of English content. Mitigation: parallel agents, strict per-chapter template, density gate before merge.
- **Quality drift across agents**: different agents write in different voices. Mitigation: the reference chapter + the existing voice (chapters 1.1, 11.x) as explicit style anchors; a review pass.
- **Spanish rework**: expansion throws away the Spanish just produced. Accepted cost — Spanish must mirror final English. Sequenced last.
- **Accuracy**: more content = more chances for a wrong legal/safety claim. Mitigation: TX statute citations required, and the instructor-of-record review (already a gating step) covers content accuracy before filing.

## 10. Acceptance criteria

- Every non-checkpoint chapter ≥ 25 words/floor-minute (was 7.7 avg).
- Every chapter has ≥6 interactive checks and (for reading) one worked example or mini-scenario.
- `validate_curriculum.js` passes (all indices valid).
- `analyze_division.js` shows zero THIN flags.
- `e2e_proof.py` still 16/16.
- Spanish re-translated and `merge_es.js` parity check passes on expanded content.
- A student moving through a chapter has a beat to engage with continuously through the time floor — no dead air.
