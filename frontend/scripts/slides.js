// APEX — animated slide-deck lesson player.
//
// Replaces the wall-of-text reading flow with a paced sequence of animated
// slides (Khan Academy / Duolingo style). Builds a deck from chapter data:
//   chapter.body[]      → concept slides (one paragraph each)
//   chapter.keyPoints[] → cascading bullet slide
//   chapter.scene       → animated scene hero (for scenario chapters)
//   chapter.rule        → highlighted rule slide (if present)
//   plus auto-generated title, recap, and quiz-hook slides
//
// Usage:
//   APEX_SLIDES.render(hostEl, chapter, { onComplete: fn });
//
// Each slide animates in. User clicks "Next" or presses → / Space to advance.
// Engagement minutes still count via the parent page's existing timer.

(function () {
  if (typeof window === 'undefined') return;

  // ---------- Inject CSS once ----------
  function injectCSS() {
    if (document.getElementById('apex-slides-css')) return;
    const style = document.createElement('style');
    style.id = 'apex-slides-css';
    style.textContent = `
      .apex-deck { position: relative; min-height: 460px; padding: 0 0 90px; }
      .apex-deck .deck-progress {
        display: flex; gap: 4px; margin: 0 0 22px;
      }
      .apex-deck .dp-dot {
        flex: 1; height: 5px; border-radius: 999px;
        background: #e6dfcc; transition: background 0.3s, transform 0.3s;
      }
      .apex-deck .dp-dot.done    { background: #14a37e; }
      .apex-deck .dp-dot.current { background: #0e7c5d; transform: scaleY(1.5); }

      .apex-slide {
        opacity: 0; transform: translateX(28px);
        transition: opacity 0.35s cubic-bezier(0.16,1,0.3,1),
                    transform 0.42s cubic-bezier(0.16,1,0.3,1);
        will-change: opacity, transform;
      }
      .apex-slide.in  { opacity: 1; transform: none; }
      .apex-slide.out { opacity: 0; transform: translateX(-28px); pointer-events: none; }

      /* Title slide */
      .as-title { text-align: center; padding: 20px 0 10px; }
      .as-title .crumb {
        font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #0a5944;
        letter-spacing: 0.20em; text-transform: uppercase; font-weight: 700;
        margin-bottom: 14px;
        opacity: 0; animation: as-fade-up 0.5s 0.05s forwards;
      }
      .as-title h1 {
        font-family: 'Inter'; font-size: 38px; font-weight: 800;
        letter-spacing: -0.025em; line-height: 1.12; color: #15191f;
        margin: 0 0 14px;
        opacity: 0; animation: as-fade-up 0.55s 0.18s forwards;
      }
      .as-title p {
        color: #5d6776; font-size: 15px; line-height: 1.55; max-width: 540px;
        margin: 0 auto;
        opacity: 0; animation: as-fade-up 0.55s 0.32s forwards;
      }
      .as-title .ring {
        width: 96px; height: 96px; border-radius: 50%;
        background: linear-gradient(135deg, #0e7c5d, #14a37e);
        margin: 26px auto 0;
        display: flex; align-items: center; justify-content: center;
        color: #fff; box-shadow: 0 16px 36px -12px rgba(14,124,93,0.45);
        opacity: 0; animation: as-pop 0.6s 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
      }

      /* Concept slide */
      .as-concept { padding: 14px 0; }
      .as-concept .as-tag {
        display: inline-block; font-family: 'Inter', system-ui, sans-serif; font-size: 10.5px;
        color: #0a5944; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700;
        background: #ebf7f1; padding: 5px 10px; border-radius: 999px;
        opacity: 0; animation: as-fade-up 0.4s 0s forwards;
      }
      .as-concept h2 {
        font-family: 'Inter'; font-size: 26px; font-weight: 700;
        letter-spacing: -0.02em; color: #15191f; margin: 14px 0 14px;
        opacity: 0; animation: as-fade-up 0.45s 0.10s forwards;
      }
      .as-concept p {
        color: #2a313b; font-size: 16px; line-height: 1.65; margin: 0;
        opacity: 0; animation: as-fade-up 0.5s 0.22s forwards;
      }
      .as-concept .as-decoration {
        margin-top: 22px; height: 110px; border-radius: 14px;
        background: linear-gradient(135deg, #faf6ec, #ede4d0);
        border: 1px solid #e6dfcc;
        position: relative; overflow: hidden;
        opacity: 0; animation: as-fade-up 0.6s 0.35s forwards;
      }

      /* Key-points slide */
      .as-keypoints h2 {
        font-family: 'Inter'; font-size: 26px; font-weight: 700;
        margin: 6px 0 18px; color: #15191f;
        opacity: 0; animation: as-fade-up 0.4s 0s forwards;
      }
      .as-keypoints ul {
        list-style: none; padding: 0; margin: 0;
      }
      .as-keypoints li {
        display: flex; align-items: flex-start; gap: 14px;
        padding: 14px 16px; margin-bottom: 10px;
        background: #fbfaf6; border: 1px solid #e6dfcc; border-radius: 12px;
        font-size: 15px; line-height: 1.5; color: #2a313b;
        opacity: 0; transform: translateX(20px);
        animation: as-slide-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
      }
      .as-keypoints li .num {
        flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%;
        background: #0e7c5d; color: #fff;
        display: flex; align-items: center; justify-content: center;
        font-family: 'Inter'; font-weight: 800; font-size: 13px;
      }

      /* Scene/scenario slide */
      .as-scene { padding: 8px 0; }
      .as-scene .scene-frame {
        background: linear-gradient(180deg, #cfddea 0%, #ede4d0 60%, #d8d2bf 100%);
        border-radius: 18px; padding: 22px;
        position: relative; overflow: hidden;
        opacity: 0; animation: as-fade-up 0.5s 0s forwards;
      }
      .as-scene .scene-frame::before {
        content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 70px;
        background: linear-gradient(180deg, transparent, rgba(74,80,90,0.55));
      }
      .as-scene .scene-frame::after {
        content: ''; position: absolute; left: 10%; right: 10%; bottom: 14px; height: 4px;
        background: repeating-linear-gradient(90deg, #fde68a 0 24px, transparent 24px 48px);
      }
      .as-scene .scene-tag {
        display: inline-block; padding: 5px 11px; border-radius: 999px;
        background: rgba(255,255,255,0.86); border: 1px solid #d6cfbd;
        font-family: 'Inter', system-ui, sans-serif; font-size: 10.5px;
        font-weight: 700; letter-spacing: 0.16em; color: #15191f;
        position: relative; z-index: 2;
        opacity: 0; animation: as-fade-up 0.4s 0.15s forwards;
      }
      .as-scene .scene-meta {
        display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px;
        position: relative; z-index: 2;
      }
      .as-scene .scene-meta-pill {
        padding: 4px 10px; border-radius: 999px;
        background: rgba(15,17,22,0.74); color: #faf6ec;
        font-family: 'Inter', system-ui, sans-serif; font-size: 10px;
        font-weight: 700; letter-spacing: 0.12em;
        opacity: 0; animation: as-fade-up 0.4s 0.28s forwards;
      }
      .as-scene .scene-car {
        position: absolute; bottom: 10px; left: 50%; width: 90px; height: 32px;
        transform: translateX(-50%);
        background: linear-gradient(180deg, #475569 0%, #1e293b 100%);
        border-radius: 12px 12px 4px 4px;
        z-index: 3;
        animation: as-car-rise 0.7s 0.40s cubic-bezier(0.16,1,0.3,1) backwards;
      }
      .as-scene .scene-car::before {
        content: ''; position: absolute; left: 14px; right: 14px; top: 4px; height: 14px;
        background: rgba(166,196,216,0.65); border-radius: 6px 6px 0 0;
      }
      .as-scene .scene-car::after {
        content: ''; position: absolute; left: 8px; right: 8px; bottom: -6px; height: 8px;
        background: repeating-linear-gradient(90deg, #0a0a0d 0 14px, transparent 14px 24px);
      }
      .as-scene h2 {
        font-family: 'Inter'; font-size: 22px; font-weight: 700;
        margin: 18px 0 12px; color: #15191f; line-height: 1.35;
        opacity: 0; animation: as-fade-up 0.5s 0.30s forwards;
      }
      .as-scene p {
        color: #2a313b; font-size: 15.5px; line-height: 1.6; margin: 0;
        opacity: 0; animation: as-fade-up 0.5s 0.45s forwards;
      }

      /* Stat slide */
      .as-stat { text-align: center; padding: 40px 0; }
      .as-stat .num {
        font-family: 'Inter'; font-weight: 800; font-size: 96px;
        line-height: 1; letter-spacing: -0.04em;
        background: linear-gradient(135deg, #0e7c5d, #14a37e);
        -webkit-background-clip: text; background-clip: text; color: transparent;
        opacity: 0; animation: as-pop 0.6s 0.05s cubic-bezier(0.16,1,0.3,1) forwards;
      }
      .as-stat p {
        color: #2a313b; font-size: 17px; line-height: 1.5; max-width: 420px;
        margin: 18px auto 0;
        opacity: 0; animation: as-fade-up 0.5s 0.30s forwards;
      }

      /* Rule slide */
      .as-rule .rule-card {
        background: linear-gradient(180deg, #fdf3e7 0%, #faf6ec 100%);
        border: 1px solid #f3d7b1; border-radius: 16px;
        padding: 24px;
        opacity: 0; animation: as-fade-up 0.5s 0.05s forwards;
      }
      .as-rule .rule-tag {
        display: inline-block; padding: 5px 11px; border-radius: 6px;
        background: #b45309; color: #fff;
        font-family: 'Inter', system-ui, sans-serif; font-size: 10.5px;
        font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
        margin-bottom: 14px;
      }
      .as-rule h2 {
        font-family: 'Inter'; font-size: 24px; font-weight: 700;
        letter-spacing: -0.02em; color: #15191f; margin: 0 0 12px;
      }
      .as-rule p { color: #2a313b; font-size: 15px; line-height: 1.6; margin: 0; }
      .as-rule .rule-stat {
        margin-top: 18px; padding: 14px 16px; border-radius: 12px;
        background: rgba(255,255,255,0.85); border: 1px solid #f3d7b1;
        display: flex; gap: 14px; align-items: center;
      }
      .as-rule .rule-stat-num {
        font-family: 'Inter'; font-size: 32px; font-weight: 800;
        color: #b45309; line-height: 1;
      }
      .as-rule .rule-stat-body { font-size: 13.5px; color: #2a313b; line-height: 1.45; }

      /* Recap slide */
      .as-recap h2 {
        font-family: 'Inter'; font-size: 26px; font-weight: 700;
        margin: 4px 0 16px; color: #15191f;
        opacity: 0; animation: as-fade-up 0.45s 0s forwards;
      }
      .as-recap .check-list { display: flex; flex-direction: column; gap: 8px; }
      .as-recap .ck {
        display: flex; align-items: center; gap: 12px;
        padding: 12px 14px; border-radius: 10px;
        background: #ebf7f1; border: 1px solid #b9e0cf;
        color: #0a5944; font-size: 14.5px; line-height: 1.45;
        opacity: 0; transform: translateX(-12px);
        animation: as-slide-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
      }
      .as-recap .ck-icon {
        flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%;
        background: #0e7c5d; color: #fff;
        display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 13px;
      }

      /* Quiz hook slide */
      .as-hook { text-align: center; padding: 50px 0; }
      .as-hook .icon {
        width: 80px; height: 80px; margin: 0 auto 18px;
        border-radius: 50%; background: linear-gradient(135deg, #fbbf24, #b45309);
        display: flex; align-items: center; justify-content: center;
        color: #fff; box-shadow: 0 14px 32px -10px rgba(180,83,9,0.40);
        opacity: 0; animation: as-pop 0.5s 0.05s cubic-bezier(0.16,1,0.3,1) forwards;
      }
      .as-hook h2 {
        font-family: 'Inter'; font-size: 28px; font-weight: 800;
        letter-spacing: -0.02em; color: #15191f; margin: 0 0 8px;
        opacity: 0; animation: as-fade-up 0.45s 0.18s forwards;
      }
      .as-hook p {
        color: #5d6776; font-size: 15px; max-width: 380px; margin: 0 auto;
        opacity: 0; animation: as-fade-up 0.45s 0.30s forwards;
      }

      /* Footer controls */
      .apex-deck-controls {
        position: sticky; bottom: 0;
        display: flex; gap: 10px; justify-content: space-between;
        padding: 14px 0 4px; margin-top: 22px;
        background: linear-gradient(180deg, transparent, #faf6ec 30%);
      }
      .apex-deck-controls button {
        padding: 12px 22px; border-radius: 10px;
        font-family: 'Inter', system-ui, sans-serif; font-weight: 700; font-size: 14px;
        cursor: pointer; transition: all 0.15s; border: 0;
      }
      .apex-deck-controls .ad-back {
        background: transparent; color: #485265; border: 1px solid #e6dfcc !important;
      }
      .apex-deck-controls .ad-back:hover { background: #ede4d0; color: #15191f; }
      .apex-deck-controls .ad-back:disabled { opacity: 0.4; cursor: not-allowed; }
      .apex-deck-controls .ad-next {
        background: #0e7c5d; color: #fff;
        box-shadow: 0 4px 14px -4px rgba(14,124,93,0.40);
      }
      .apex-deck-controls .ad-next:hover { background: #0a5944; transform: translateY(-1px); }
      .apex-deck-controls .ad-counter {
        flex: 1; align-self: center; text-align: center;
        font-family: 'Inter', system-ui, sans-serif; font-size: 11px; font-weight: 700;
        color: #485265; letter-spacing: 0.14em;
      }

      @keyframes as-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      @keyframes as-slide-in { to { opacity: 1; transform: none; } }
      @keyframes as-pop {
        0%   { opacity: 0; transform: scale(0.55); }
        65%  { opacity: 1; transform: scale(1.08); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes as-car-rise { from { opacity: 0; transform: translate(-50%, 28px); } to { opacity: 1; transform: translateX(-50%); } }

      @media (max-width: 540px) {
        .as-title h1 { font-size: 28px; }
        .as-stat .num { font-size: 64px; }
        .as-concept h2, .as-keypoints h2, .as-recap h2 { font-size: 22px; }
      }
    `;
    document.head.appendChild(style);
  }

  // ---------- Build deck from a chapter ----------
  function buildDeck(chapter) {
    const slides = [];
    const lang = (window.APEX_TOPICS && window.APEX_TOPICS.lang && window.APEX_TOPICS.lang()) || 'en';
    const isEs = lang === 'es';

    // Pull EN/ES variants where available.
    const esCh = (window.APEX_CHAPTER_ES && isEs) ? window.APEX_CHAPTER_ES(chapter.id) : null;
    const title = (esCh && esCh.title) || chapter.title;
    const body = (esCh && esCh.body) || chapter.body || [];
    const keyPoints = (esCh && esCh.keyPoints) || chapter.keyPoints || [];
    const scene = (esCh && esCh.sceneDescription)
      ? { tag: esCh.sceneTag || (chapter.scene && chapter.scene.tag) || 'SCENARIO',
          meta: esCh.sceneMeta || (chapter.scene && chapter.scene.meta) || [],
          description: esCh.sceneDescription }
      : chapter.scene;
    const rule = (esCh && esCh.rule) || chapter.rule;

    const T = (en, es) => (isEs ? es : en);

    // 1. Title slide
    slides.push({
      type: 'title',
      title,
      crumb: T(`Chapter ${chapter.id} · Module ${chapter.moduleNum}`,
                `Capítulo ${chapter.id} · Módulo ${chapter.moduleNum}`),
      lede: T(
        `~${chapter.minutes} minutes of focused study. Tap Next to begin.`,
        `~${chapter.minutes} minutos de estudio enfocado. Toca Siguiente para empezar.`
      ),
    });

    // 2. Scene hero (scenario chapters only)
    if (scene && scene.description) {
      slides.push({
        type: 'scene',
        tag: scene.tag,
        meta: scene.meta || [],
        description: scene.description,
        heading: T('The moment', 'El momento'),
      });
    }

    // 3. Body paragraphs as concept slides
    body.forEach((para, i) => {
      slides.push({
        type: 'concept',
        index: i + 1,
        total: body.length,
        tag: T(`Concept ${i + 1} of ${body.length}`,
                `Concepto ${i + 1} de ${body.length}`),
        heading: i === 0
          ? T('Why this matters', 'Por qué importa')
          : i === 1
            ? T('Going deeper', 'Más a fondo')
            : T('Key context', 'Contexto clave'),
        body: para,
      });
    });

    // 4. Stat slide if rule has a stat
    if (rule && rule.stat) {
      slides.push({
        type: 'stat',
        num: rule.stat.num,
        body: rule.stat.body,
      });
    }

    // 5. Rule slide
    if (rule && rule.title) {
      slides.push({
        type: 'rule',
        tag: rule.tag,
        title: rule.title,
        body: rule.body,
        stat: rule.stat,
      });
    }

    // 6. Key points (cascading bullets)
    if (keyPoints && keyPoints.length) {
      slides.push({
        type: 'keypoints',
        heading: T('Key points to lock in', 'Puntos clave para grabar'),
        points: keyPoints,
      });
    }

    // 7. Recap
    if (keyPoints && keyPoints.length) {
      slides.push({
        type: 'recap',
        heading: T('Quick recap', 'Repaso rápido'),
        points: keyPoints.slice(0, 5),
      });
    }

    // 8. Quiz hook
    const quizCount = (chapter.quiz || chapter.exam || []).length;
    if (quizCount > 0) {
      slides.push({
        type: 'hook',
        title: T(`Ready? ${quizCount} quick questions.`,
                  `¿Listo? ${quizCount} preguntas rápidas.`),
        body: T(
          'You learn the rule by using it. Wrong answers loop back; no fake timers.',
          'Aprendes la regla usándola. Las respuestas incorrectas se repiten; sin temporizadores falsos.'
        ),
      });
    }

    return slides;
  }

  // ---------- Render a single slide into HTML ----------
  function renderSlide(s) {
    const esc = window._apexEscapeHtml || ((x) => x);
    if (s.type === 'title') {
      return `
        <div class="as-title">
          <div class="crumb">${esc(s.crumb)}</div>
          <h1>${esc(s.title)}</h1>
          <p>${esc(s.lede)}</p>
          <div class="ring">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 4 20 12 6 20"/></svg>
          </div>
        </div>`;
    }
    if (s.type === 'concept') {
      return `
        <div class="as-concept">
          <span class="as-tag">${esc(s.tag)}</span>
          <h2>${esc(s.heading)}</h2>
          <p>${esc(s.body)}</p>
          <div class="as-decoration">
            <svg width="100%" height="100%" viewBox="0 0 400 110" preserveAspectRatio="xMidYMid slice">
              <line x1="0" y1="80" x2="400" y2="80" stroke="#a39e91" stroke-width="2"/>
              <line x1="0" y1="80" x2="400" y2="80" stroke="#fde68a" stroke-width="2" stroke-dasharray="20 14"/>
              <rect x="170" y="56" width="60" height="22" rx="6" fill="#475569"/>
              <rect x="178" y="50" width="44" height="14" rx="3" fill="#a6c4d8"/>
              <circle cx="184" cy="84" r="4" fill="#0a0a0d"/>
              <circle cx="216" cy="84" r="4" fill="#0a0a0d"/>
            </svg>
          </div>
        </div>`;
    }
    if (s.type === 'scene') {
      return `
        <div class="as-scene">
          <div class="scene-frame">
            <span class="scene-tag">${esc(s.tag)}</span>
            <div class="scene-meta">${(s.meta || []).map(m => `<span class="scene-meta-pill">${esc(m)}</span>`).join('')}</div>
            <div class="scene-car"></div>
          </div>
          <h2>${esc(s.description)}</h2>
        </div>`;
    }
    if (s.type === 'stat') {
      return `
        <div class="as-stat">
          <div class="num">${esc(s.num)}</div>
          <p>${esc(s.body)}</p>
        </div>`;
    }
    if (s.type === 'rule') {
      return `
        <div class="as-rule">
          <div class="rule-card">
            <span class="rule-tag">${esc(s.tag || 'RULE')}</span>
            <h2>${esc(s.title)}</h2>
            <p>${s.body || ''}</p>
            ${s.stat ? `
              <div class="rule-stat">
                <div class="rule-stat-num">${esc(s.stat.num)}</div>
                <div class="rule-stat-body">${esc(s.stat.body)}</div>
              </div>` : ''}
          </div>
        </div>`;
    }
    if (s.type === 'keypoints') {
      return `
        <div class="as-keypoints">
          <h2>${esc(s.heading)}</h2>
          <ul>
            ${s.points.map((p, i) => `
              <li style="animation-delay: ${0.10 + i * 0.10}s;">
                <span class="num">${i + 1}</span>
                <span>${esc(p)}</span>
              </li>
            `).join('')}
          </ul>
        </div>`;
    }
    if (s.type === 'recap') {
      return `
        <div class="as-recap">
          <h2>${esc(s.heading)}</h2>
          <div class="check-list">
            ${s.points.map((p, i) => `
              <div class="ck" style="animation-delay: ${0.05 + i * 0.08}s;">
                <span class="ck-icon">✓</span>
                <span>${esc(p)}</span>
              </div>
            `).join('')}
          </div>
        </div>`;
    }
    if (s.type === 'hook') {
      return `
        <div class="as-hook">
          <div class="icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <h2>${esc(s.title)}</h2>
          <p>${esc(s.body)}</p>
        </div>`;
    }
    return '';
  }

  // ---------- Public render ----------
  function render(host, chapter, options) {
    options = options || {};
    injectCSS();

    const slides = buildDeck(chapter);
    if (!slides.length) {
      if (typeof options.onComplete === 'function') options.onComplete();
      return;
    }

    const lang = (window.APEX_TOPICS && window.APEX_TOPICS.lang && window.APEX_TOPICS.lang()) || 'en';
    const T = (en, es) => (lang === 'es' ? es : en);

    host.innerHTML = `
      <div class="apex-deck">
        <div class="deck-progress" id="deckProgress"></div>
        <div id="deckSlide"></div>
        <div class="apex-deck-controls">
          <button class="ad-back" id="adBack">${T('← Back', '← Atrás')}</button>
          <span class="ad-counter" id="adCounter">1 / ${slides.length}</span>
          <button class="ad-next" id="adNext">${T('Next →', 'Siguiente →')}</button>
        </div>
      </div>
    `;

    let idx = 0;
    function renderProgress() {
      const dots = slides.map((_, i) => {
        const cls = i < idx ? 'done' : i === idx ? 'current' : '';
        return `<div class="dp-dot ${cls}"></div>`;
      }).join('');
      document.getElementById('deckProgress').innerHTML = dots;
    }
    function renderCurrent() {
      const slot = document.getElementById('deckSlide');
      slot.innerHTML = `<div class="apex-slide" id="slideEl">${renderSlide(slides[idx])}</div>`;
      // Trigger entrance animation on next frame
      requestAnimationFrame(() => {
        const el = document.getElementById('slideEl');
        if (el) el.classList.add('in');
      });
      document.getElementById('adCounter').textContent = (idx + 1) + ' / ' + slides.length;
      document.getElementById('adBack').disabled = idx === 0;
      const nextBtn = document.getElementById('adNext');
      nextBtn.textContent = idx === slides.length - 1
        ? T('Take the quiz →', 'Tomar el cuestionario →')
        : T('Next →', 'Siguiente →');
      renderProgress();
    }
    function go(delta) {
      const newIdx = idx + delta;
      if (newIdx < 0) return;
      if (newIdx >= slides.length) {
        if (typeof options.onComplete === 'function') options.onComplete();
        return;
      }
      idx = newIdx;
      renderCurrent();
      // Scroll deck top into view so the next slide is visible immediately
      const wrap = host.querySelector('.apex-deck');
      if (wrap && wrap.scrollIntoView) {
        wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    document.getElementById('adNext').onclick = () => go(1);
    document.getElementById('adBack').onclick = () => go(-1);

    // Keyboard nav (only while deck is on-screen)
    function keyHandler(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    }
    window.addEventListener('keydown', keyHandler);
    // Cleanup hook (caller can stash this on host)
    host._apexDeckCleanup = () => window.removeEventListener('keydown', keyHandler);

    renderCurrent();
  }

  window.APEX_SLIDES = { buildDeck, renderSlide, render };
})();
