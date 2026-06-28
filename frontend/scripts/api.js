// APEX — frontend API wrapper.
// Talks to the FastAPI backend at the same origin (port 8000 when running uvicorn).
// All requests are credentialed (httpOnly session cookie). On failure, callers should
// catch and fall back to localStorage via window.APEX (see app.js).

window.APEX_API = (function () {
  const base = '';  // same origin

  async function req(path, opts = {}) {
    const res = await fetch(base + path, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
      ...opts,
    });
    let body = null;
    try { body = await res.json(); } catch (_) { /* empty body */ }
    if (!res.ok) {
      let msg = 'HTTP ' + res.status;
      if (body && body.detail !== undefined) {
        if (typeof body.detail === 'string') {
          msg = body.detail;
        } else if (Array.isArray(body.detail) && body.detail[0]) {
          msg = body.detail[0].msg || msg;
        } else if (body.detail && typeof body.detail === 'object') {
          msg = body.detail.error || body.detail.msg || msg;
        }
      }
      const err = new Error(msg);
      err.status = res.status;
      err.body = body;
      throw err;
    }
    return body;
  }

  return {
    health: () => req('/api/health'),
    signup: ({ email, password, name, role, language, date_of_birth }) =>
      req('/api/signup', { method: 'POST', body: JSON.stringify({ email, password, name, role, language, date_of_birth }) }),
    login: ({ email, password }) =>
      req('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    logout: () => req('/api/logout', { method: 'POST' }),
    me: () => req('/api/me'),
    completeLesson: ({ lesson_id, minutes, xp }) =>
      req('/api/progress/lesson', { method: 'POST', body: JSON.stringify({ lesson_id, minutes, xp }) }),
    submitScore: ({ game_id, score, accuracy, duration_sec }) =>
      req('/api/games/score', { method: 'POST', body: JSON.stringify({ game_id, score, accuracy, duration_sec }) }),
    bestScore: (game_id) => req('/api/games/' + encodeURIComponent(game_id) + '/best'),
    leaderboard: ({ game_id, limit = 10 } = {}) => {
      const qs = new URLSearchParams();
      if (game_id) qs.set('game_id', game_id);
      qs.set('limit', String(limit));
      return req('/api/leaderboard?' + qs.toString());
    },
  };
})();
