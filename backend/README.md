# APEX backend

FastAPI + SQLite. No external services required.

## Run

```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

Open http://localhost:8000/ — backend serves the static frontend AND the `/api/*` routes from a single port. Stop the old `python -m http.server 5173` if it's running.

## What's wired

- `POST /api/signup` — email + password (>=8 chars), creates user + initial progress row
- `POST /api/login` — sets httpOnly session cookie (`apex_sess`)
- `POST /api/logout`
- `GET  /api/me` — current user + full progress payload
- `POST /api/progress/lesson` — `{lesson_id, minutes, xp}` — auto-bumps streak, levels up
- `POST /api/games/score` — `{game_id, score, accuracy?, duration_sec?}` — awards XP
- `GET  /api/games/{game_id}/best` — best score for current user
- `GET  /api/leaderboard?game_id=...&limit=10` — global top-N (omit `game_id` for total-XP leaderboard)
- `GET  /api/health`

## DB

SQLite file at `backend/apex.db`. Schema bootstraps on first run. Delete the file to reset.

## Auth model

Sessions live in the DB. Cookie is httpOnly, samesite=lax, 30-day TTL. Passwords are PBKDF2-SHA256 (200k iterations, stdlib only — zero crypto deps).
