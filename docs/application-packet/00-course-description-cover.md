# APEX Driver Education — Course Description and Application Cover

*Submitted with the TDLR Driver Education Provider License application for [Provider Legal Name], DBA "APEX." Online endorsement requested.*

---

## 1. Course at a Glance

| Attribute | Value |
|---|---|
| Course type | Texas Teen Driver Education (32-hour) |
| Delivery method | Online (AMI) under 16 TAC §84.501 |
| Audience | Texas teen students, ages 14–17 |
| Language | English and Spanish — all 54 chapters localized (idiomatic Texas-Mexican Spanish, pending native-speaker QA pass) |
| Total presented instructional content | 2,055 minutes (floor: 1,920) |
| Modules | 12 (POI-DE aligned) |
| Pass threshold | 70% mastery per §84.501 / POI-DE |
| Certificate issued | DE-964 (Learner License half + Driver License half) |

---

## 2. Provider Information

- **Provider legal name:** [TO COMPLETE: LLC name once formed]
- **DBA / brand name:** APEX
- **Owner / principal:** [TO COMPLETE]
- **Physical address:** [TO COMPLETE]
- **Mailing address:** [TO COMPLETE]
- **Instructor of record:** [TO COMPLETE: instructor's name + TDLR license number]
- **Website:** [TO COMPLETE]
- **Contact email:** [TO COMPLETE]
- **Surety bond:** $10,000 on Form DES138N (attached separately)
- **Assumed-name registration:** filed with Texas Secretary of State and [county] (copy attached)

---

## 3. Compliance With §84.500 and §84.501

APEX has implemented the "adequate testing and security measures" required by §84.500 as a documented, code-backed compliance engine spanning seven subsystems. Each subsystem is described in detail in the accompanying specification documents:

| Document | Subsystem | Rule |
|---|---|---|
| 01-identity-validation-spec | Personal-validation identity questions | §84.501 |
| 02-time-on-task-spec | Anti-skip timer enforcement; 1,920-minute floor | §84.501, §84.500 |
| 03-multimedia-comprehension-spec | Comprehension gates for clips >180 seconds | §84.501 |
| 04-records-retention-spec | Append-only audit event log; 3-year retention | §84.81 |
| 05-engagement-and-tamper-signals-spec | Active-participation monitoring | §84.501 |
| 06-ada-accommodation-plan | Reasonable accommodation procedures | §84.40 |

The instructor of record has reviewed the curriculum and the spec documents and is named on the provider record.

---

## 4. Curriculum Summary

APEX's curriculum is structured as **12 modules totaling at least 1,920 minutes** of presented instructional content, aligned with the POI-DE Program Guide.

APEX delivers 12 modules / 54 chapters / 2,055 instructional minutes. The APEX module names reflect an internal pedagogy; their mapping to the POI-DE 12-topic taxonomy is documented in full in `poi-de-coverage-matrix.md` (96% full coverage, 0 uncovered required topics).

| # | APEX Module | Minutes |
|---|---|---:|
| 1 | Driver Education & the Highway Transportation System | 200 |
| 2 | Driving Tasks & Procedures | 180 |
| 3 | Vehicle Operation | 175 |
| 4 | Performing Basic Maneuvers (incl. freeway lane discipline) | 200 |
| 5 | Sharing the Roadway | 215 |
| 6 | Hazardous Conditions (incl. night driving, distraction) | 215 |
| 7 | Alcohol, Drugs & Impairment | 175 |
| 8 | Buying & Maintaining a Vehicle (incl. title/lemon law) | 170 |
| 9 | Texas-Specific Laws (incl. speed-law tiers) | 200 |
| 10 | Emergencies & Crashes (incl. first aid) | 175 |
| 11 | Texas Civic Responsibilities (trafficking, racing, work zones, CSEA) | 90 |
| 12 | Personal Responsibilities (anatomical gifts, disabilities registry) | 60 |
| **Total** |  | **2,055** |

Per-chapter minute floors are listed in `curriculum_minutes.json` (a JSON manifest derived directly from the authored curriculum). Each floor is enforced server-side at chapter completion; no student can mark a chapter complete before accumulating the required active time. Total exceeds the §84.501 AMI floor of 1,920 minutes by 135.

### 4.1 Required content topics covered

- ✅ Smith System defensive driving principles
- ✅ Right-of-way (TX Transp. Code §545.151–§545.156)
- ✅ Traffic control devices (TX Transp. Code §544)
- ✅ Alcohol and other drugs; implied consent (§724.011); zero-tolerance for minors
- ✅ Speed limits and conditions (§545.351)
- ✅ Safety belts and child passenger restraints (§545.412–§545.413)
- ✅ Adverse weather and visibility
- ✅ Sharing the road (motorcyclists, bicyclists, pedestrians, large trucks)
- ✅ **Community Safety Education Act / HB 2305 (mandated)** — driver-officer interaction during traffic stops
- ✅ **Street racing penalties — TX Transp. Code §545.420 (mandated)**
- ✅ **Work-zone safety — SB 1366 amendments effective 2026-05-01 (mandated)**
- ✅ **Human trafficking awareness — TX SB 9 / TEC §1001.107 (mandated)**
- ✅ **Anatomical gifts — TX Transp. Code §521.401 (mandated)**
- ✅ **Texas Driving with Disabilities Program — TX HB 1554 / §521.142(g) (mandated)**

### 4.2 Methodology

- **Reading chapters**: 2–3 substantive paragraphs each with 3-5 key points and a 3-question quiz. ~30–45 min each.
- **Scenario chapters**: interactive decision-tree exercises in real driving situations (Texas-specific intersections, weather, etc.). ~45–55 min each.
- **Checkpoint chapters**: comprehensive module-end assessments at 70% mastery threshold. ~30 min each.
- **Drive simulator scenarios**: a three-dimensional driving environment built on Three.js, available to reinforce specific module content (parking, parallel-parking, four-way-stop, pedestrian-emergency, adverse-weather, etc.). Drive-simulator time supplements but does not count toward the 1,920 minute floor.
- **Final exam**: comprehensive end-of-course assessment at 70% mastery. Questions drawn from an authored bank of at least 200 questions across the 12 modules; each student session receives a randomized subset.

---

## 5. Behind-the-Wheel Coordination

APEX provides a parent-taught BTW logbook with GPS verification, exportable in TDLR DE-964 / DE-964E format. Students must complete 30 hours of supervised driving (including 10 hours at night) outside the online course before APEX issues the second half of the DE-964 certificate. The logbook system is integrated into the APEX backend and is described separately in the BTW Drive Logbook section of the course documentation.

---

## 6. Certificate Issuance

APEX issues the DE-964 certificate in two halves per TDLR requirements:

- **Learner License half** — issued automatically after the student passes Module 1 (Traffic Laws) at 70% mastery. Used at DPS to apply for a learner permit at age 15.
- **Driver License half** — issued after the student completes all 12 modules at 70% mastery, plus the 30/10 BTW logbook requirement. Used at DPS to apply for the provisional license at age 16.

Both halves use TDLR-issued certificate numbers ordered in bulk through the Versa Online Licensing System. The electronic certificate template will be submitted for TDLR pre-approval before certificate numbers are ordered.

Lost or unaccounted certificate numbers will be reported to TDLR within 15 working days of discovery, per §84.43.

---

## 7. Record Retention

All student records — enrollment, time-on-task, identity validation challenges, multimedia comprehension responses, lockout events, and certificate issuance — are retained for **three years** as required by §84.81. Records are stored in a secure database with backup and are available for TDLR inspection in machine-readable form.

---

## 8. Pre-Approval Advertising

Prior to TDLR approval, APEX has limited its public communication to "Driving School Opening Soon" notices with name and contact information, per §84.80. No student enrollment, payment collection, or course delivery has occurred or will occur prior to license issuance.

---

## 9. Attachments

The following documents are attached to this application packet:

- **00-course-description-cover.md** (this document)
- **01-identity-validation-spec.md** — Personal-validation identity question system
- **02-time-on-task-spec.md** — Anti-skip timer and minimum-minutes enforcement
- **03-multimedia-comprehension-spec.md** — Comprehension gates for video content
- **04-records-retention-spec.md** — Audit event log and three-year retention
- **05-engagement-and-tamper-signals-spec.md** — Active-participation monitoring
- **06-ada-accommodation-plan.md** — Reasonable accommodation procedures
- **curriculum-table-of-contents.md** — Full 12-module table of contents with minute floors
- **sample-question-bank.md** — 20 sample questions across modules (the full bank exceeds 200)
- **DES138N** (surety bond, $10,000) — separate PDF attachment
- **Assumed-name registration** — separate PDF attachment
- **Instructor of record license verification** — separate PDF attachment

---

## 10. Open Items Requiring Confirmation

Three items require written confirmation from TDLR's Education and Examination Division before APEX considers the implementation final. Each item has been implemented in a manner that is conservative (permits future tightening) but where rule interpretation is ambiguous in the rule text:

1. **Operating-hours rule §84.600.** Whether the 5:00 a.m.–11:00 p.m. instructional window applies to asynchronous self-paced sessions. APEX currently shows a banner outside that window warning students that time may not count, and logs the session start to the audit log, but does not hard-block. Confirmation requested.

2. **Gamification UI elements.** Whether XP indicators, badge unlock animations, and similar "Duolingo-style" engagement aesthetics constitute "distracting material" under §84.501. APEX has implemented these as content-tied reinforcement (e.g., XP awarded for passing a mastery quiz), not as unrelated entertainment. Confirmation requested.

3. **Final exam structure.** The required question count and bank size for the comprehensive final exam are not specified in §84.501. APEX has authored 200+ questions across the 12 modules, with each student session receiving a randomized 30-question subset, pass threshold 70%. Confirmation that this approach meets TDLR expectations is requested.

APEX is prepared to adjust any of these implementations based on TDLR's written guidance.

---

*Signed:*
__________________________________
[Founder / Owner]

__________________________________
[Instructor of Record, TDLR License # __________]

Date: __________
