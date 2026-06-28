# APEX / Lane — Implementation Plan

12-month roadmap to ship a TDLR-approved, gamified, Spanish-native teen driver's ed product in Texas. Sequenced as a layer cake, not parallel bets.

---

## Strategic Anchors (locked decisions)

- **Single state, single persona, single vertical for 12 months.** TX teen driver's ed only. No CA/FL/GA, no real estate, no traffic school, no CDL until Year 2.
- **Spanish-native AI voice tutor at launch.** Not bolt-on translation. ~30% TAM expansion in TX/CA for ~10% extra dev cost.
- **R3F + GLTF + DRACO** for 3D, not Unity WebGL. Bundle size is the gating factor on teen mobile UX.
- **Duolingo-grade loop** (streaks, XP, leagues, hearts, streak freeze). Don't invent gamification.
- **No dark patterns.** No auto-renew traps, no forced timers beyond regulator minimums. Brand is the moat.
- **Pass Guarantee tier** ($129) as marketing wedge. Money back if you don't pass first 222attempt.
- **Regulatory work starts Week 1.** TDLR provider application is the critical path, not the code.

---

## Phase 0 — Pre-Build (Weeks 1–2)

Goal: lock identity, start regulatory clock, validate willingness to pay before writing simulation code.

| Task | Owner | Deliverable |
|------|-------|-------------|
| Pick brand name (Lane vs APEX vs DriveQuest) — register .com, social handles | Founder | Domain + IG/TikTok claimed |
| File TDLR Provider Application (Form DL-1) for teen driver education | Founder + lawyer | Submitted application + receipt |
| Engage Texas-licensed attorney for curriculum review (~$3–5k retainer) | Founder | Engagement letter |
| Refresh landing page (`index.html`) with waitlist + Spanish toggle | Eng | Live page with email capture |
| Pre-sell: $39 founders' deposit toward $79 course, refundable | Founder | Stripe payment link, 100+ deposits = green light |
| Recruit 3 Austin/Houston high school partners for closed beta pipeline | Founder | LOIs from 3 schools |
| Hire 1 senior full-stack eng (R3F-fluent) + 1 contract 3D artist (Blender/Mixamo) | Founder | Signed offers |

Kill criteria: <30 paid deposits in 30 days = thesis is wrong, pivot or stop.

---

## Phase 1 — MVP Build (Weeks 3–14, ~3 months)

Goal: 30 cinematic scenarios + Duolingo loop + Spanish AI tutor + state-approved certificate generation. Closed beta with 50 Austin teens.

### Tech stack (locked)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | Next.js 15 (App Router) + React 19 | SSR for SEO state landers, App Router for streaming |
| 3D | React Three Fiber + Drei + GLTF/DRACO | 5MB bundles vs Unity's 20MB |
| Styling | Tailwind + Framer Motion | Cinematic transitions cheap |
| Voice AI | GPT-4o-realtime (English + Spanish) + ElevenLabs (premium voice tier) | <600ms first-word latency |
| Content LLM | Claude Sonnet 4.6 for question gen + content QA (regulatory accuracy) | Two-model split: speed where you need speed, accuracy where regulators audit |
| Backend | FastAPI + Postgres + pgvector | Founder's existing stack — ship faster |
| Auth | Clerk | Don't build auth |
| Payments | Stripe (web) | RevenueCat deferred until native |
| Hosting | Vercel (frontend) + Railway (API/DB) | Cheap until $1M ARR |
| Analytics | PostHog (product) + Mixpanel (funnel) | Both, not one |
| Error/perf | Sentry + Vercel Analytics | |

### Migration from current prototype

The existing static HTML (`index.html`, `dashboard.html`, `lesson.html`, etc.) becomes the **marketing + waitlist site**. The actual product is a new Next.js app at `app.<domain>`. Don't try to grow the static prototype into the product — port the design language, ditch the architecture.

### Build order (week by week)

| Wk | Milestone | What ships |
|----|-----------|------------|
| 3–4 | Auth + paywall + dashboard skeleton | Sign up → Stripe → empty dashboard |
| 5–6 | Lesson engine v1 (2D + R3F shell) | 3 lessons playable, XP/hearts wired |
| 7 | Streak system + streak freeze | Daily login loop functional |
| 8–9 | First 10 R3F scenarios with stylized 3D city | "Wow demo" recordable for TikTok |
| 10 | AI voice tutor (English + Spanish, GPT-4o-realtime) | Voice coach reacts to answers in real time |
| 11 | Adaptive practice exam generator (LLM + TX DMV bank) | 50-question randomized exams |
| 12 | TDLR-template-compliant electronic certificate generator | PDF cert issued on completion |
| 13 | League v0 (weekly cohort leaderboard) + friend invites | Social loop live |
| 14 | Closed beta launch — 50 Austin teens recruited from 3 partner schools | Beta running |

### Content plan (parallel track)

- 32 hours of TX teen driver's ed instruction split into ~30 scenarios + ~10 reading micro-modules + 6 mastery checkpoints (matches TDLR hour requirements)
- All copy bilingual (EN/ES) from day one — translation by professional Spanish-speaking driver's ed instructor, not Google Translate
- Question bank: license TX DMV practice questions from a content vendor + LLM-augment to ~500 unique items
- Voice tutor system prompt: separate prompts per scenario, with cultural framing for Spanish ("Imagínate que estás en una glorieta en Houston…")

### What we explicitly do NOT build in Phase 1

- Native iOS/Android (PWA installable only — defer until $1M ARR)
- VR mode
- Real-time STT for "talk to your coach" (multiple-choice fakes it)
- Multiplayer real-time
- More than TX
- Mandarin/Vietnamese (Year 2)
- Real estate vertical
- Traffic school SKU
- Insurance partnership integration
- School district admin portal
- Custom 3D engine, custom 3D assets (Mixamo + asset stores only)

---

## Phase 2 — Beta → Public Launch (Months 4–6)

Goal: TDLR approval received, public TX launch, 1,000 paid students.

| Milestone | Month |
|-----------|-------|
| TDLR audit / curriculum review feedback addressed | M4 |
| TDLR provider approval received (target — realistically 3–6 mo from filing) | M4–M5 |
| Beta cohort retention data: target ≥40% complete-the-course rate vs DriversEd.com's ~20% | M4 |
| Founder TikTok account hits 100k cumulative views before paid spend | M5 |
| Public TX launch — `lane.com/texas` (or whatever) | M5 |
| 1,000 paid students | M6 |
| Pass Guarantee tier launches with 12-week proof data | M6 |

### Launch GTM (Month 5)

- Founder content: 3 TikToks/week showing scenario clips, AI tutor reactions, streak flexes. Build in public.
- Influencer drops: 20–50 micro-creators in TX teen lifestyle, $25–50k creator budget
- High school partnerships: 5 Austin/Houston schools offering Lane as their recommended online provider
- SEO: state-specific landers (`lane.com/texas/teen-drivers-ed`, `/austin`, `/houston`, `/spanish`)
- **Anti-pattern:** no Google Search ads. Aceable/DriversEd.com will outbid you. Win on TikTok organic + creator first.

---

## Phase 3 — Validate & Tune (Months 7–9)

Goal: 5,000 paid students in TX, unit economics proven, hire compliance ops for state expansion.

| Lever | Target |
|-------|--------|
| CAC (paid) | <$25 blended |
| LTV (Lane Pro $79) | $89 with referral expansion |
| LTV:CAC | ≥3.5:1 |
| Course completion rate | ≥45% |
| First-attempt DMV pass rate (self-reported) | ≥80% |
| TikTok-driven signups % | ≥40% |
| Spanish learner share of TX cohort | ≥20% |

Hires:
- Compliance ops lead (part-time → full-time) — only job is filing CA/FL/GA approvals
- Content lead — owns scenario authoring + Spanish QA
- 2nd full-stack eng

---

## Phase 4 — Multi-State + Year-2 Decision (Months 10–12)

Goal: CA + FL + GA approval applications filed, Mandarin tutor in CA, decide on second SKU.

- File CA DMV, FL DHSMV, GA DDS provider applications (each 3–6 mo cycle)
- Add Mandarin + Vietnamese voice tutor (CA-targeted) — pure feature add, ~2 weeks dev
- Month-12 review: pick Year-2 second SKU
  - **Default pick: traffic school** (same engine, ~1/4 content cost, recurring buyer pattern)
  - Alternative: insurance B2B2C pilot (only if 12mo of safety data is showing claim correlation)

Year-1 target: **5,000–15,000 paid students, $400k–$1.2M ARR.**

---

## Critical Path & Risks

The single thing that determines whether Year 1 succeeds or fails:

> **TDLR approval timeline.** File Week 1. Hire a Texas-licensed attorney who has done provider applications before. Budget 6 months conservatively. Do not launch publicly without it — issuing certificates without approval is the kind of thing that gets a startup shut down by the state.

Other risks ranked:

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| TDLR approval delayed past M6 | High | Start week 1; weekly check-ins with TDLR; hire experienced attorney |
| 3D simulation cost > value to convert | Medium | Build 3 scenarios first, A/B test against flat 2D version on beta cohort before scaling to 30 |
| Aceable copies gamification fast | Medium | Their dark-pattern brand is the moat we lean on; speed of execution matters more than "secret" |
| Content hallucination = legal risk | Medium | All AI-generated content reviewed by licensed instructor before ship; voice tutor system prompts constrained to scenario context |
| TikTok algo shift kills organic CAC | Low–Med | Diversify to Snap, YT Shorts, IG Reels by M6 |
| Founder burns out doing content + product + compliance | High | Hire compliance ops by M5; content creator partner by M7 |

---

## Budget (12 months, scrappy)

| Line | Range |
|------|-------|
| Eng (1 senior FT + 1 contract → 2 FT by M9) | $180–240k |
| 3D contractor + asset licenses | $20–35k |
| Design (contract) | $25–40k |
| Spanish content + instructor reviewer | $15–25k |
| Legal (TDLR + contracts) | $15–25k |
| Tools (Vercel, Railway, Clerk, OpenAI, ElevenLabs, PostHog, Stripe, Sentry) | $12–24k |
| Marketing (creator deals + small paid test) | $40–80k |
| Buffer (15%) | $45k |
| **Total** | **$350–500k** |

Bootstrap-feasible if founder is unpaid + 1 cofounder unpaid + ~$200k saved/raised friends-and-family. Not VC territory until $1M ARR.

---

## Week 1 Action List (do these now)

1. Pick the brand name. Register `.com`, IG, TikTok, X handles same day.
2. Download TDLR Form DL-1 (Provider Application) and book a 30-min call with a Texas education attorney.
3. Set up `lane.com` (or whatever) waitlist landing page with Spanish toggle and `$39 founders' deposit` Stripe link.
4. Post the first founder TikTok. The product is recording itself building.
5. Email 10 Austin/Houston driver's ed teachers + 3 high school principals — book 5 intro calls.
6. Open a job post for senior full-stack engineer (R3F-fluent, ships fast). 2 weeks to close.
7. Open a Discord server for the waitlist. Day-1 community = day-1 organic content.

---

*This plan supersedes the strategic deep-dive's broader speculation. The deep-dive identified opportunities; this document commits to which ones get built when. The five expansion vectors are explicitly deferred: Spanish is folded in as a feature, traffic school is Year 2, insurance is Year 2 pilot, schools are opportunistic, CDL is out.*
