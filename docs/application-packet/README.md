# APEX Driver Education — TDLR Application Packet

This folder contains the documents that accompany the APEX online driver education provider license application filed with the Texas Department of Licensing and Regulation (TDLR) via the Versa Online Licensing System.

The intent of the packet is to give TDLR's Education and Examination Division a complete view of:
1. The provider (who is applying, the bond, the assumed-name registration).
2. The course (curriculum aligned to POI-DE, 1,995 instructional minutes, mandated content topics).
3. The technical compliance with 16 TAC §§84.500 and 84.501 (the "adequate testing and security measures" required for online providers).
4. The accommodations and accessibility plan required by §84.40.

---

## Documents in this packet

| File | Purpose | Status |
|---|---|---|
| **`00-course-description-cover.md`** | Application cover. Provider info, course summary, attachment list, signature lines for founder + instructor of record. | DRAFT — needs provider legal name, owner info, instructor license number filled in |
| **`01-identity-validation-spec.md`** | Personal-validation identity questions per §84.501 — 25-prompt curated bank, 90-second window, lockout math. | Complete |
| **`02-time-on-task-spec.md`** | Anti-skip timer enforcement per §84.501 — chapter_seconds source-of-truth, per-tick cap, minimum-minute floors, 1,920-minute total. | Complete |
| **`03-multimedia-comprehension-spec.md`** | Comprehension gates for clips >180 seconds per §84.501. Engine in place; zero clips currently registered. | Complete |
| **`04-records-retention-spec.md`** | Append-only audit event log + 3-year retain_until per §84.81. Sample SQL queries TDLR could run. | Complete |
| **`05-engagement-and-tamper-signals-spec.md`** | Active-participation monitoring per §84.501 — visibility, multi-tab, devtools, paste-into-quiz, rapid-input bursts. | Complete |
| **`06-ada-accommodation-plan.md`** | Reasonable accommodation plan per §84.40 — WCAG 2.1 AA target, accommodations by disability category, request process. | Complete |
| **`curriculum-table-of-contents.md`** | Full 12-module table of contents with minute floors. Mandated-content basis citations. | Complete |
| **`poi-de-coverage-matrix.md`** | Maps every POI-DE topic to the APEX chapter that covers it. Surfaces 94% full / 6% cross-referenced coverage and explicit pending gaps. | Complete |
| **`sample-question-bank.md`** | 25 sample questions across all 12 modules. Full bank exceeds 200 questions. | Excerpt |

---

## Attachments to be added separately (not in this folder)

- **DES138N surety bond, $10,000** — purchased from a Texas surety bond agency, attached as PDF.
- **Assumed-name registration** — copies of TX Secretary of State filing + county DBA filing, attached as PDF.
- **Verification of ownership** — owner list with percentages.
- **Instructor of record license verification** — copy of the contracted instructor's current TDLR Driver Education Instructor License.
- **Criminal History Questionnaire** — if any owner or principal has any felony or non-traffic misdemeanor history.
- **Electronic certificate template** — submitted in a separate Versa transaction for TDLR pre-approval **before** ordering DE-964 certificate numbers.

---

## Sequence of filing

1. Form the LLC (or sole-prop with DBA).
2. Buy the $10,000 surety bond on Form DES138N.
3. Contract a licensed Texas Driver Education Instructor as instructor of record.
4. Register on Versa (`vo.licensing.tdlr.texas.gov`) as a new user.
5. File the Driver Education Provider application with the **online** endorsement. Upload this packet.
6. Wait for TDLR review (4–6 months for a new provider with online endorsement).
7. Once provider license is approved, submit the electronic certificate template for pre-approval.
8. Once the template is approved, order DE-964 certificate numbers in bulk via Versa.
9. **Now you can enroll students and sell.**

Until step 9, pre-launch advertising is limited to "Driving School Opening Soon" per 16 TAC §84.80 — no enrollment, no payment collection.

---

## Three items requiring written confirmation from TDLR

These are documented in `00-course-description-cover.md` §10. APEX has implemented each in a conservative way that can be tightened later if TDLR's interpretation differs:

1. **Operating-hours rule (§84.600).** Does the 5 a.m.–11 p.m. window apply to asynchronous self-paced sessions?
2. **Gamification UI elements.** Does content-tied XP / badge animation count as "distracting material" under §84.501?
3. **Final exam structure.** Is the 200+ question bank / 30-question randomized session / 70% pass threshold acceptable?

A separate inquiry through https://www.tdlr.texas.gov/Help to the Education and Examination Division is recommended before final submission.

---

## Code repository pointers

The compliance engine described in the spec documents above is implemented at:

- `backend/compliance/` — Python backend modules (identity, multimedia, timer, lockouts, audit, mastery, config)
- `frontend/scripts/compliance/` — JavaScript frontend modules
- `backend/compliance/curriculum_minutes.json` — minute floors enforced at chapter completion
- `backend/tests/` — pytest test suite (37 tests pass)

Engineering design document: `docs/superpowers/specs/2026-05-11-tdlr-ami-compliance-engine-design.md`
Implementation plan: `docs/superpowers/plans/2026-05-11-tdlr-ami-compliance-engine-plan.md`

---

## Document version

**Packet assembled:** 2026-05-13 (curriculum gap-fill + coverage matrix added 2026-05-14)
**Curriculum total minutes:** 2,055 across 54 chapters (AMI floor: 1,920; buffer: +135)
**Tests passing:** 39/39
**Status:** DRAFT — pending provider entity formation, surety bond purchase, instructor-of-record contracting, and instructor review of curriculum content
