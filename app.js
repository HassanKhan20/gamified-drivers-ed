// APEX prototype — shared state + helpers
window.APEX = {
  KEY: 'apex_state_v1',
  defaults: {
    user: null,
    role: 'teen',
    xp: 240,
    level: 3,
    streak: 5,
    completedLessons: ['1.1', '1.2'],
    drivesLogged: 4,
    totalDriveHours: 12.5,
    badges: ['first-lesson', 'streak-3', 'perfect-quiz', 'early-bird']
  },
  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) return Object.assign({}, this.defaults, JSON.parse(raw));
    } catch (e) {}
    return Object.assign({}, this.defaults);
  },
  save(state) {
    localStorage.setItem(this.KEY, JSON.stringify(state));
  },
  set(patch) {
    const next = Object.assign({}, this.load(), patch);
    this.save(next);
    return next;
  },
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
  reset() {
    localStorage.removeItem(this.KEY);
  },
  guard(redirect) {
    redirect = redirect || 'signup.html';
    const s = this.load();
    if (!s.user) {
      location.href = redirect;
      return null;
    }
    return s;
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

// Topbar renderer (for app pages)
window.APEX_TOPBAR = function (title, subtitle) {
  const s = APEX.load();
  return `
    <div class="topbar">
      <div>
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ''}
      </div>
      <div class="user-stats">
        <div class="stat-pill streak" title="Daily streak">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 0.67c0 0 2.43 2.84 2.43 5.59 0 2.62-1.72 4.74-4.34 4.74-2.63 0-4.61-2.12-4.61-4.74l.04-.45c-2.55 3.04-4.04 6.67-4.04 10.45 0 4.97 4.03 9 9 9s9-4.03 9-9C21.02 8.65 17.5 4.07 13.5.67z"/></svg>
          ${s.streak}-day streak
        </div>
        <div class="stat-pill xp" title="Total XP">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          ${s.xp} XP · Lvl ${s.level}
        </div>
        <div class="profile-chip" title="${s.user || 'Driver'}">${(s.user || 'D').charAt(0).toUpperCase()}</div>
      </div>
    </div>
  `;
};
