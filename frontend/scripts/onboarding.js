// APEX — first-login walkthrough.
//
// Fires the FIRST time a user lands on dashboard.html with no prior progress.
// Five plain steps that explain (1) what APEX is, (2) the topic-first model,
// (3) the BTW logbook + GPS, (4) language toggle, (5) "you're set."
// Sets `apex_onboarded=1` in localStorage so it never fires again unless the
// user explicitly resets state.
//
// Localized via APEX_TOPICS.lang() (en/es) so a Spanish-first signup gets
// Spanish onboarding immediately.

(function () {
  if (typeof window === 'undefined') return;
  if (location.pathname.endsWith('dashboard.html') === false &&
      location.pathname !== '/' &&
      location.pathname !== '') return;

  // Don't show twice.
  try { if (localStorage.getItem('apex_onboarded') === '1') return; } catch (e) {}

  function lang() {
    try {
      const v = localStorage.getItem('apex_lang');
      if (v === 'es' || v === 'en') return v;
    } catch (e) {}
    try {
      const s = window.APEX && window.APEX.load && window.APEX.load();
      if (s && s.language === 'es') return 'es';
    } catch (e) {}
    return 'en';
  }

  const L = lang();
  const T = (en, es) => (L === 'es' ? es : en);

  const STEPS = [
    {
      icon: '👋',
      tag: T('STEP 1 / 5 · WELCOME', 'PASO 1 / 5 · BIENVENIDA'),
      title: T('Welcome to APEX.', 'Bienvenido a APEX.'),
      body: T(
        "You're here to get your Texas teen driver license. APEX walks you through the full TDLR-required course — 32 hours of classroom + the 30 hours of behind-the-wheel practice that goes with it.",
        'Estás aquí para obtener tu licencia de conducir adolescente de Texas. APEX te guía por todo el curso requerido por TDLR — 32 horas de aula + las 30 horas de práctica al volante que lo acompañan.'
      ),
    },
    {
      icon: '🛣️',
      tag: T('STEP 2 / 5 · YOUR PATH', 'PASO 2 / 5 · TU CAMINO'),
      title: T('42 topics. One road.', '42 temas. Un camino.'),
      body: T(
        'The whole course is a single ordered path of 42 topics. Each topic is a small bundle: short videos, a short article, a quiz, and sometimes a game or a drive scenario. Finish a topic to unlock the next one. No skipping.',
        'Todo el curso es un solo camino ordenado de 42 temas. Cada tema es un paquete pequeño: videos cortos, un artículo, un cuestionario, y a veces un juego o escenario de manejo. Termina un tema para desbloquear el siguiente. Sin saltarse pasos.'
      ),
    },
    {
      icon: '🚗',
      tag: T('STEP 3 / 5 · BTW LOGBOOK', 'PASO 3 / 5 · BITÁCORA AL VOLANTE'),
      title: T('Your parent signs your real drives.', 'Tu padre firma tus prácticas reales.'),
      body: T(
        "Texas requires 30 hours of behind-the-wheel time with a licensed adult (10 of them at night). After every drive, log it on your phone — APEX captures the GPS so it's verifiable. Your parent reviews and e-signs. Print the DE-964 form when you've hit 30 hours.",
        'Texas requiere 30 horas de práctica al volante con un adulto licenciado (10 de ellas de noche). Después de cada práctica, regístrala en tu teléfono — APEX captura el GPS para que sea verificable. Tu padre la revisa y firma. Imprime el formato DE-964 cuando llegues a 30 horas.'
      ),
    },
    {
      icon: '🌐',
      tag: T('STEP 4 / 5 · LANGUAGE', 'PASO 4 / 5 · IDIOMA'),
      title: T('English or Spanish — your call.', 'Inglés o español — tu eliges.'),
      body: T(
        'Tap the EN/ES button at the top-right of any page to switch the entire app — lessons, quizzes, voice tutor, the whole thing. You can flip between them anytime; your progress carries over.',
        'Toca el botón EN/ES en la esquina superior derecha de cualquier página para cambiar toda la app — lecciones, cuestionarios, tutor por voz, todo. Puedes cambiar cuando quieras; tu progreso se mantiene.'
      ),
    },
    {
      icon: '✅',
      tag: T('STEP 5 / 5 · READY', 'PASO 5 / 5 · LISTO'),
      title: T("You're set. Let's open the path.", 'Listo. Abramos tu camino.'),
      body: T(
        "Click 'Open the path' below and tap the first topic. The whole course is broken into 5–10 minute pieces — do one a day and you'll be exam-ready in about 8 weeks.",
        "Haz clic en 'Abrir el camino' y toca el primer tema. Todo el curso está dividido en piezas de 5–10 minutos — haz uno al día y estarás listo para el examen en unas 8 semanas."
      ),
    },
  ];

  // ---------- Render ----------
  const css = `
    .apex-onboard-mask {
      position: fixed; inset: 0;
      background: rgba(15,17,22,0.62); backdrop-filter: blur(6px);
      z-index: 99999; display: flex; align-items: center; justify-content: center;
      padding: 18px;
      animation: apex-onb-fade 0.25s ease-out;
    }
    @keyframes apex-onb-fade { from { opacity: 0; } to { opacity: 1; } }
    .apex-onboard-card {
      width: 100%; max-width: 540px;
      background: #faf6ec;
      border-radius: 18px;
      box-shadow: 0 24px 60px -12px rgba(15,17,22,0.45);
      overflow: hidden;
      animation: apex-onb-pop 0.32s cubic-bezier(0.16,1,0.3,1);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    @keyframes apex-onb-pop {
      from { transform: translateY(20px) scale(0.96); opacity: 0; }
      to   { transform: none; opacity: 1; }
    }
    .apex-onboard-hero {
      background: linear-gradient(135deg, #0e7c5d 0%, #0a5944 100%);
      color: #ffffff;
      padding: 32px 28px 24px;
      text-align: center;
    }
    .apex-onboard-icon { font-size: 48px; line-height: 1; margin-bottom: 14px; }
    .apex-onboard-tag {
      font-family: 'Inter', system-ui, sans-serif; font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.20em; text-transform: uppercase;
      opacity: 0.78; margin-bottom: 8px;
    }
    .apex-onboard-card h2 {
      font-family: 'Inter', 'Inter', sans-serif;
      font-size: 26px; font-weight: 800; letter-spacing: -0.02em;
      margin: 0 0 4px;
    }
    .apex-onboard-body {
      padding: 22px 28px 8px;
      color: #2a313b; font-size: 14.5px; line-height: 1.55;
    }
    .apex-onboard-dots {
      display: flex; gap: 6px; justify-content: center;
      padding: 6px 0 14px;
    }
    .apex-onboard-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #d6cfbd; transition: all 0.2s;
    }
    .apex-onboard-dot.active { background: #0e7c5d; width: 22px; border-radius: 999px; }
    .apex-onboard-actions {
      display: flex; gap: 8px; padding: 0 28px 26px;
    }
    .apex-onboard-actions button {
      flex: 1; padding: 12px 18px; border-radius: 10px;
      font-family: 'Inter', system-ui, sans-serif; font-weight: 700; font-size: 14px;
      cursor: pointer; transition: all 0.15s; border: 0;
    }
    .apex-onboard-back {
      background: transparent; color: #485265;
      border: 1px solid #e6dfcc !important;
    }
    .apex-onboard-back:hover { background: #ede4d0; color: #15191f; }
    .apex-onboard-next {
      background: #0e7c5d; color: #ffffff;
      box-shadow: 0 4px 14px -4px rgba(14,124,93,0.40);
    }
    .apex-onboard-next:hover { background: #0a5944; transform: translateY(-1px); }
    .apex-onboard-skip {
      position: absolute; top: 10px; right: 14px;
      background: transparent; border: 0; color: rgba(255,255,255,0.78);
      font-family: 'Inter', system-ui, sans-serif; font-size: 11px;
      letter-spacing: 0.10em; cursor: pointer; padding: 6px 10px; border-radius: 6px;
    }
    .apex-onboard-skip:hover { background: rgba(255,255,255,0.14); color: #fff; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const mask = document.createElement('div');
  mask.className = 'apex-onboard-mask';
  mask.innerHTML = `
    <div class="apex-onboard-card" role="dialog" aria-modal="true" aria-labelledby="apexOnbTitle">
      <div class="apex-onboard-hero" style="position: relative;">
        <button class="apex-onboard-skip" id="apexOnbSkip">${T('SKIP', 'SALTAR')}</button>
        <div class="apex-onboard-icon" id="apexOnbIcon">👋</div>
        <div class="apex-onboard-tag" id="apexOnbTag">—</div>
        <h2 id="apexOnbTitle">—</h2>
      </div>
      <div class="apex-onboard-body" id="apexOnbBody">—</div>
      <div class="apex-onboard-dots" id="apexOnbDots"></div>
      <div class="apex-onboard-actions">
        <button class="apex-onboard-back" id="apexOnbBack">${T('Back', 'Atrás')}</button>
        <button class="apex-onboard-next" id="apexOnbNext">${T('Next →', 'Siguiente →')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(mask);

  let idx = 0;

  function render() {
    const s = STEPS[idx];
    document.getElementById('apexOnbIcon').textContent = s.icon;
    document.getElementById('apexOnbTag').textContent = s.tag;
    document.getElementById('apexOnbTitle').textContent = s.title;
    document.getElementById('apexOnbBody').textContent = s.body;
    const dotsEl = document.getElementById('apexOnbDots');
    dotsEl.innerHTML = STEPS.map((_, i) => `<div class="apex-onboard-dot ${i === idx ? 'active' : ''}"></div>`).join('');
    document.getElementById('apexOnbBack').style.visibility = idx === 0 ? 'hidden' : 'visible';
    document.getElementById('apexOnbNext').textContent =
      idx === STEPS.length - 1 ? T('Open the path →', 'Abrir el camino →') : T('Next →', 'Siguiente →');
  }

  function finish() {
    try { localStorage.setItem('apex_onboarded', '1'); } catch (e) {}
    mask.remove();
    if (idx === STEPS.length - 1) location.href = 'roadmap.html';
  }

  document.getElementById('apexOnbBack').onclick = () => { if (idx > 0) { idx -= 1; render(); } };
  document.getElementById('apexOnbNext').onclick = () => {
    if (idx < STEPS.length - 1) { idx += 1; render(); } else { finish(); }
  };
  document.getElementById('apexOnbSkip').onclick = () => {
    try { localStorage.setItem('apex_onboarded', '1'); } catch (e) {}
    mask.remove();
  };
  // Esc closes too
  window.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      try { localStorage.setItem('apex_onboarded', '1'); } catch (e2) {}
      mask.remove();
      window.removeEventListener('keydown', escHandler);
    }
  });

  render();
})();
