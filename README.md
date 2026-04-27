# APEX — Gamified Drivers Ed

State-approved drivers ed teens don't try to bypass. Built like a game, not a slideshow.

## Positioning

> No fake timers. No surprise charges. Real scenarios, real progress, real parent dashboard.

## Files

| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Landing page + race-car animation | **Live** |
| `signup.html` | Role picker (Teen / Parent), saves to localStorage | **Live** |
| `dashboard.html` | Teen dashboard — XP, streak, daily mission, badges | **Live** |
| `lesson.html` | Interactive lesson player — Chapter 1.3 "The Pedestrian Pop-Up" with mastery quiz | **Live** |
| `parent.html` | Parent dashboard — kid progress, drive log, scenario-of-the-day, insurance tracker | **Live** |
| `hazard.html` | Daily Hazard Perception drill — clickable scene with 5 hazards + decoys | **Live** |
| `compliance.html` | Trust page — TDLR / ROSCA / COPPA / refund policy + competitor comparison | **Live** |
| `soon.html` | Generic Coming Soon template (param-driven) | **Live** |
| `app.css` / `app.js` | Shared shell styles + localStorage state | Shared |

## Coming-soon routes (linked from sidebars)

- Drive Log · Achievements · Friends/Leaderboard · Settings (teen)
- Drive Logbook · Weekly Reports · Insurance Discount Paperwork (parent)

Each routes to `soon.html?f=<name>&d=<description>` showing a feature mockup.

## Run

```
python -m http.server 5173
```

Open http://localhost:5173/ — no build, no `npm install`.

## What's interactive (try this flow)

1. Land at `/` → click **"Launch the prototype"**
2. Pick **Teen**, enter your name → routes to dashboard
3. Click **"Start lesson"** on the daily mission
4. Walk the scenario → consequence → rule → 3-question mastery quiz
5. Confetti + XP burst on completion → state updates persist via localStorage
6. Sign out, sign up again as **Parent** to see the parent view

