# Curriculum Table of Contents

*The full APEX teen driver education curriculum, organized into 12 modules totaling 2,055 minutes across 54 chapters (above the 1,920-minute AMI floor required by 16 TAC §84.501). The 2026-05-14 gap-fill pass added four chapters — freeway lane discipline (4.4), used-car title/lemon law (8.4), TX speed-law tiers (9.4), and crash-scene first aid (10.3) — and renumbered the affected module checkpoints.*

Per-chapter minute floors are enforced server-side via `backend/compliance/curriculum_minutes.json`, automatically generated from this curriculum source. No student can mark a chapter complete before accumulating the required active time on that chapter (tracked in seconds, capped per tick to prevent forging).

---

## Module 1 — Driver Education & the Highway Transportation System (200 min)

| Chapter | Title | Min | Type |
|---|---|---:|---|
| 1.1 | Welcome — what this course gives you | 30 | reading |
| 1.2 | The Texas licensing path | 45 | reading |
| 1.3 | The Pedestrian Pop-Up | 50 | scenario |
| 1.4 | The Late Yellow | 45 | scenario |
| 1.5 | Module 1 checkpoint | 30 | checkpoint |

---

## Module 2 — Driving Tasks & Procedures (200 min)

| Chapter | Title | Min | Type |
|---|---|---:|---|
| 2.1 | Pre-drive: seat, mirrors, blind spots | 45 | reading |
| 2.2 | Smith System: a defensive-driving framework | 50 | reading |
| 2.3 | Lane changes, signals, and merging | 55 | scenario |
| 2.4 | Module 2 checkpoint | 30 | checkpoint |

(plus authored extension chapters totaling 20 min)

---

## Module 3 — Vehicle Operation (~175 min)

Chapters 3.1–3.4 cover acceleration, braking, steering inputs, and basic vehicle dynamics; checkpoint at 3.4.

---

## Module 4 — Performing Basic Maneuvers (~195 min)

Chapters 4.1–4.3: right-of-way at every intersection type, parallel parking, U-turns / 3-point / reversing. **4.4 Freeway entry, exit, and lane discipline (NEW, 15 min).** 4.5 checkpoint.

---

## Module 5 — Sharing the Roadway (~195 min)

Chapters 5.1–5.5: cyclists and motorcycles, 18-wheeler blind spots, emergency vehicles and TX Move Over law, school buses and school zones, checkpoint.

---

## Module 6 — Hazardous Conditions (~170 min)

Chapters 6.1–6.x cover rain, ice, fog, sun glare, night driving, and similar adverse conditions.

---

## Module 7 — Alcohol, Drugs & Impairment (~145 min)

Includes Texas zero-tolerance, implied consent (§724.011), prescription/OTC drug effects, fatigue, and the social pressure scenarios.

---

## Module 8 — Buying & Maintaining a Vehicle (~160 min)

Chapters on registration/inspection/title transfer, insurance basics, periodic maintenance. **8.4 Buying a used car — title, lemon law, and the traps (NEW, 15 min).** 8.5 checkpoint.

---

## Module 9 — Texas-Specific Laws (~165 min)

Chapters on Texas Transportation Code highlights, the Lisa Torry Smith Act (unmarked crosswalks), GDL restrictions. **9.4 TX speed law — limits, tiers, and "reasonable and prudent" (NEW, 15 min).** 9.5 checkpoint.

---

## Module 10 — Emergencies & Crashes (~175 min)

Chapters on skid recovery / brake failure, post-crash legal duties (TX 550). **10.3 First aid at a crash scene — buying minutes for paramedics (NEW, 15 min).** 10.4 final exam (60 min).

---

## Module 11 — Texas Civic Responsibilities (90 min) — NEW

| Chapter | Title | Min | Type |
|---|---|---:|---|
| 11.1 | Human trafficking — what drivers actually see | 15 | reading |
| 11.2 | Street racing — what it costs you in Texas (§545.420) | 15 | reading |
| 11.3 | Work zones — SB 1366 and the Move Over law (§545.157) | 15 | reading |
| 11.4 | Traffic stops — your rights, the officer's duties (CSEA, §1001.110) | 15 | reading |
| 11.5 | Module 11 checkpoint | 30 | checkpoint |

**Mandated content basis:**
- 11.1 — TX SB 9 / Texas Education Code §1001.107
- 11.2 — TX Transportation Code §545.420
- 11.3 — TX SB 1366 (effective 2026-05-01); TX Transp. Code §545.157
- 11.4 — TX HB 2305 / Texas Education Code §1001.110 (Community Safety Education Act)

---

## Module 12 — Personal Responsibilities (60 min) — NEW

| Chapter | Title | Min | Type |
|---|---|---:|---|
| 12.1 | Anatomical gifts — the donor question at the DMV (§521.401) | 15 | reading |
| 12.2 | Driving with Disabilities — the TX voluntary registry (§521.142(g)) | 15 | reading |
| 12.3 | Module 12 final checkpoint | 30 | checkpoint |

**Mandated content basis:**
- 12.1 — TX Transportation Code §521.401 (Donate Life Texas)
- 12.2 — TX HB 1554 (2021) / TX Transp. Code §521.142(g) (Texas Driving with Disabilities Program)

---

## Final exam

The Module 12 checkpoint serves as the **comprehensive final exam**. Students answer a randomized 30-question subset from a bank of 200+ questions spanning all 12 modules. Pass threshold is **≥70% (21 of 30)** per POI-DE and §84.501.

A separate Module 1 checkpoint also serves as the **Learner License gate** — passing it at 70% triggers issuance of the Learner-License half of the DE-964 certificate so the student can apply for their permit at DPS at age 15.

---

## Total instructional minutes

| Module | Title | Min |
|---|---|---:|
| 1 | Driver Education & Highway Transportation System | 200 |
| 2 | Driving Tasks & Procedures | 180 |
| 3 | Vehicle Operation | 175 |
| 4 | Performing Basic Maneuvers (+ freeway 4.4) | 200 |
| 5 | Sharing the Roadway | 215 |
| 6 | Hazardous Conditions | 215 |
| 7 | Alcohol, Drugs & Impairment | 175 |
| 8 | Buying & Maintaining a Vehicle (+ title/lemon 8.4) | 170 |
| 9 | Texas-Specific Laws (+ speed-law 9.4) | 200 |
| 10 | Emergencies & Crashes (+ first aid 10.3) | 175 |
| 11 | Texas Civic Responsibilities | 90 |
| 12 | Personal Responsibilities | 60 |
| **Total** | | **2,055** |

**AMI floor (§84.501):** 1,920 minutes
**APEX total:** 2,055 minutes
**Buffer:** +135 minutes

The minute totals above are derived directly from `frontend/scripts/curriculum.js` via `scripts/sync_curriculum_minutes.py`. The authoritative per-chapter manifest is `backend/compliance/curriculum_minutes.json`.
