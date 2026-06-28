// APEX — TOPICS spine.
//
// One topic = one TDLR chapter (1.1 .. 10.3). Each topic owns ALL of its assets:
// shorts → article → quiz → game → drive. Nothing in the app exists outside a
// topic. Click a topic node → topic.html → strict gated checklist → assets.
//
// Derived from window.APEX_CURRICULUM + window.APEX_SHORTS at runtime so we
// only have one authored copy of the content.

(function () {
  const C = window.APEX_CURRICULUM;
  const SHORTS = window.APEX_SHORTS || [];
  if (!C) { console.warn('topics.js: curriculum.js must load first'); return; }

  // ----- Asset attachments per topic -----
  // game: which topic gets which mini-game (id matches game-*.html)
  // drive: which topic launches a guided sim drill (drive.html?scenario=…)
  // Topics not listed here just have shorts/article/quiz.
  const TOPIC_GAME = {
    '1.3':  { id: 'hazard',     pass_score: 60,  route: 'hazard.html' },
    '1.4':  { id: 'hazard',     pass_score: 80,  route: 'hazard.html' },
    '4.1':  { id: 'rightofway', pass_score: 480, route: 'game-rightofway.html' },
    '5.4':  { id: 'signs',      pass_score: 800, route: 'game-signs.html' },
    '9.1':  { id: 'signs',      pass_score: 1000, route: 'game-signs.html' },
  };
  const TOPIC_DRIVE = {
    '1.3':  { id: 'pedestrian',    label_en: 'Pedestrian pop-up scenario',     label_es: 'Escenario peatón sorpresa',     route: 'drive.html?scenario=pedestrian' },
    '1.4':  { id: 'yellow_light',  label_en: 'Late-yellow decision drill',     label_es: 'Decisión amarillo tardío',      route: 'drive.html?scenario=yellow' },
    '2.3':  { id: 'lane_change',   label_en: 'SMOG lane-change drill',         label_es: 'Cambio de carril (SMOG)',       route: 'drive.html?scenario=lane_change' },
    '4.1':  { id: 'four_way',      label_en: '4-way stop scenario',            label_es: 'Alto de 4 vías',                route: 'drive.html?scenario=four_way' },
    '4.2':  { id: 'parallel_park', label_en: 'Parallel-park drill (guided)',   label_es: 'Estacionamiento paralelo guiado', route: 'drive.html?scenario=parallel_park' },
    '4.3':  { id: 'three_point',   label_en: '3-point turn drill (guided)',    label_es: 'Vuelta en 3 puntos (guiada)',   route: 'drive.html?scenario=three_point' },
    '6.1':  { id: 'wet_weather',   label_en: 'Wet-weather control drill',      label_es: 'Manejo en clima mojado',        route: 'drive.html?scenario=wet_weather' },
    '10.1': { id: 'skid_recovery', label_en: 'Skid recovery drill',            label_es: 'Recuperación de derrape',       route: 'drive.html?scenario=skid' },
  };

  // ----- Auto-generate 3–6 shorts PER CHAPTER from its actual content -----
  // Each chapter produces:
  //   1. INTRO short (chapter title + lede pulled from body[0] first sentence)
  //   2. One short per body paragraph (CONCEPT 1, CONCEPT 2, ...)
  //   3. KEY POINTS short (bulleted)
  //   4. RULE short (scenario chapters only)
  //   5. STAT short (if rule.stat exists)
  // Plus the static curated APEX_SHORTS get attached to whichever chapter
  // their tags suggest, so the existing illustrated scenes still appear.
  function firstSentence(s) {
    if (!s) return '';
    const m = s.match(/^(.{20,260}?[.!?])(\s|$)/);
    return m ? m[1] : s.slice(0, 220);
  }
  function generatedShortsFor(ch) {
    if (ch.type === 'checkpoint') return [];
    const out = [];
    const body = Array.isArray(ch.body) ? ch.body : [];
    const lede = body[0] ? firstSentence(body[0]) : '';
    out.push({
      id: 'gen-' + ch.id + '-intro',
      generated: true, type: 'intro',
      moduleNum: ch.moduleNum, moduleId: ch.moduleId, chapterId: ch.id,
      title: ch.title, hook: lede,
      body: 'Here\'s the gist of what you\'re about to learn — then we\'ll dig in.',
      duration: 14, visual: 'gen-intro',
    });
    body.forEach((para, i) => {
      out.push({
        id: 'gen-' + ch.id + '-c' + (i + 1),
        generated: true, type: 'concept',
        moduleNum: ch.moduleNum, moduleId: ch.moduleId, chapterId: ch.id,
        title: i === 0 ? 'Why this matters' : i === 1 ? 'Going deeper' : 'Key context',
        hook: firstSentence(para),
        body: para,
        duration: Math.max(18, Math.min(40, Math.ceil(para.length / 32))),
        visual: 'gen-concept-' + (i % 4),
      });
    });
    if (ch.scene && ch.scene.description) {
      out.push({
        id: 'gen-' + ch.id + '-scene',
        generated: true, type: 'scenario',
        moduleNum: ch.moduleNum, moduleId: ch.moduleId, chapterId: ch.id,
        title: ch.title, hook: ch.scene.description.slice(0, 200),
        body: 'Picture the moment: ' + (ch.scene.tag || 'SCENARIO') + '. ' + (ch.scene.meta || []).join(' · '),
        duration: 16, visual: 'gen-scene',
      });
    }
    if (ch.rule && ch.rule.title) {
      out.push({
        id: 'gen-' + ch.id + '-rule',
        generated: true, type: 'rule',
        moduleNum: ch.moduleNum, moduleId: ch.moduleId, chapterId: ch.id,
        title: ch.rule.title, hook: '',
        body: typeof ch.rule.body === 'string' ? ch.rule.body.replace(/<[^>]+>/g, '') : '',
        rule: { tag: ch.rule.tag || 'RULE', text: ch.rule.title },
        duration: 18, visual: 'gen-rule',
      });
    }
    if (ch.rule && ch.rule.stat) {
      out.push({
        id: 'gen-' + ch.id + '-stat',
        generated: true, type: 'fact',
        moduleNum: ch.moduleNum, moduleId: ch.moduleId, chapterId: ch.id,
        title: ch.rule.stat.num, hook: ch.rule.stat.body,
        body: '',
        duration: 12, visual: 'gen-stat',
      });
    }
    if (Array.isArray(ch.keyPoints) && ch.keyPoints.length) {
      out.push({
        id: 'gen-' + ch.id + '-keypoints',
        generated: true, type: 'habit',
        moduleNum: ch.moduleNum, moduleId: ch.moduleId, chapterId: ch.id,
        title: 'Lock these in', hook: 'The non-negotiables for this chapter.',
        body: '',
        keyPoints: ch.keyPoints,
        duration: 16, visual: 'gen-keypoints',
      });
    }
    return out;
  }

  // Curated SHORTS get attached to the chapter that matches their module first.
  const shortsByModule = {};
  SHORTS.forEach(s => {
    const k = s.moduleId || ('M' + (s.moduleNum || 1));
    (shortsByModule[k] = shortsByModule[k] || []).push(s);
  });
  const shortsAssignment = {}; // chapter_id -> [short]
  C.modules.forEach(m => {
    const pool = shortsByModule[m.id] || [];
    const readingChapters = m.chapters.filter(ch => ch.type !== 'checkpoint');
    if (!readingChapters.length) return;
    // First: every chapter gets its auto-generated shorts.
    readingChapters.forEach(ch => {
      shortsAssignment[ch.id] = generatedShortsFor(ch);
    });
    // Then: curated shorts get prepended to the first matching chapter for visual variety.
    pool.forEach((s, i) => {
      const ch = readingChapters[i % readingChapters.length];
      shortsAssignment[ch.id] = [s, ...(shortsAssignment[ch.id] || [])];
    });
  });

  // Make all generated shorts findable by id (for shorts.html lookup)
  Object.values(shortsAssignment).forEach(list => {
    list.forEach(s => {
      if (s.generated) window.APEX_SHORTS_BY_ID[s.id] = s;
    });
  });

  // ----- Build the topic objects -----
  const topics = [];
  let order = 0;
  C.modules.forEach(m => {
    m.chapters.forEach(ch => {
      order += 1;
      const isCheckpoint = ch.type === 'checkpoint';
      const isScenario   = ch.type === 'scenario';

      const t = {
        id: ch.id,                       // e.g. "4.2"
        order,
        moduleId: m.id, moduleNum: m.num, moduleTitle: m.title,
        chapter_label: 'Ch. ' + ch.id,
        title_en: ch.title,
        type: ch.type,                   // reading | scenario | checkpoint
        minutes_estimate: ch.minutes || 30,
        xp_reward: isCheckpoint ? 200 : 100,
        prerequisites: order > 1 ? [previousChapterId(C, m.id, ch.id)] : [],

        assets: {
          shorts:   isCheckpoint ? [] : (shortsAssignment[ch.id] || []).map(s => ({
            id: s.id, title_en: s.title, duration_sec: s.duration, generated: !!s.generated,
          })),
          article:  isCheckpoint ? null : { id: 'article:' + ch.id, read_minutes: Math.ceil((ch.minutes || 30) / 6) },
          quiz:     {
            id: 'quiz:' + ch.id,
            question_count: (ch.quiz && ch.quiz.length) || (ch.exam && ch.exam.length) || 0,
            pass_threshold: isCheckpoint ? 0.75 : 0.66,
            type: isCheckpoint ? 'exam' : 'quiz',
          },
          game:     TOPIC_GAME[ch.id] || null,
          drive:    TOPIC_DRIVE[ch.id] || null,
        },
      };

      // Scenario chapters embed the scene description into the article
      if (isScenario) {
        t.scenario_description = ch.scene && ch.scene.description;
      }

      topics.push(t);
    });
  });

  function previousChapterId(curr, currModuleId, chapterId) {
    let prev = null;
    for (const m of curr.modules) {
      for (const ch of m.chapters) {
        if (ch.id === chapterId) return prev;
        prev = ch.id;
      }
    }
    return null;
  }

  // ----- Spanish title overrides -----
  // Sourced from APEX_CURRICULUM_ES; fall back to English if missing.
  const ES = window.APEX_CURRICULUM_ES || {};
  // Module-title translations (the curriculum_es file is keyed by chapter id only,
  // so we ship module names here to keep the topic page fully ES-clean).
  const ES_MODULE = {
    'M1':  'Educación vial y el sistema de transporte',
    'M2':  'Tareas y procedimientos al manejar',
    'M3':  'Operación del vehículo',
    'M4':  'Maniobras e intersecciones',
    'M5':  'Compartir el camino',
    'M6':  'Condiciones peligrosas y distracciones',
    'M7':  'Alcohol, drogas y consentimiento implícito',
    'M8':  'Mantenimiento, seguros y registro del vehículo',
    'M9':  'Leyes de tránsito de Texas',
    'M10': 'Emergencias y graduación',
  };
  topics.forEach(t => {
    const es = ES[t.id];
    t.title_es = (es && es.title) || t.title_en;
    t.moduleTitle_es = ES_MODULE[t.moduleId] || t.moduleTitle;
    t.moduleTitle_en = t.moduleTitle;
  });

  // Build asset-step ordering for the topic page UI.
  // Strict gate: shorts → article → quiz → game → drive.
  function steps(t) {
    const out = [];
    if (t.assets.shorts && t.assets.shorts.length) {
      out.push({ kind: 'shorts',  count: t.assets.shorts.length, ids: t.assets.shorts.map(s => s.id) });
    }
    if (t.assets.article) {
      out.push({ kind: 'article', read_minutes: t.assets.article.read_minutes });
    }
    if (t.assets.quiz && t.assets.quiz.question_count) {
      out.push({ kind: 'quiz',    type: t.assets.quiz.type, qs: t.assets.quiz.question_count, pass: t.assets.quiz.pass_threshold });
    }
    if (t.assets.game)  out.push({ kind: 'game',  game_id: t.assets.game.id, route: t.assets.game.route, pass_score: t.assets.game.pass_score });
    if (t.assets.drive) out.push({ kind: 'drive', drive_id: t.assets.drive.id, route: t.assets.drive.route, label_en: t.assets.drive.label_en, label_es: t.assets.drive.label_es });
    return out;
  }

  // ----- Per-user topic progress (localStorage; backend-mirrored when signed in) -----
  // shape: { [topicId]: { shorts:[ids], article:bool, quizScore:0..1, gameScore:int, driveDone:bool, completed:bool } }
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem('apex_topic_progress') || '{}'); } catch (e) { return {}; }
  }
  function saveProgress(p) {
    localStorage.setItem('apex_topic_progress', JSON.stringify(p));
    if (window.APEX_API && window.APEX_API.syncTopicProgress) {
      try { window.APEX_API.syncTopicProgress(p); } catch (e) {}
    }
  }
  // Pulls /api/topics/progress and merges server state into localStorage.
  // Server is source of truth — we overwrite local entries with server data
  // for any topic the server knows about. (Local-only changes survive only
  // until the next server entry covers them.)
  async function refreshFromServer() {
    try {
      const res = await fetch('/api/topics/progress', { credentials: 'include' });
      if (!res.ok) return null;
      const server = await res.json(); // { [topicId]: { shorts_watched, article_read, quiz_score, game_score, drive_done, completed } }
      const local = loadProgress();
      // Map server's snake_case shape into the localStorage camelCase shape.
      Object.keys(server).forEach(tid => {
        const s = server[tid];
        local[tid] = {
          shorts:    Array.isArray(s.shorts_watched) ? s.shorts_watched : [],
          article:   !!s.article_read,
          quizScore: Number(s.quiz_score || 0),
          gameScore: Number(s.game_score || 0),
          driveDone: !!s.drive_done,
          completed: !!s.completed,
        };
      });
      localStorage.setItem('apex_topic_progress', JSON.stringify(local));
      return local;
    } catch (e) {
      // Not signed in / backend offline — keep local
      return null;
    }
  }
  function getTopic(id) { return topics.find(t => t.id === id) || null; }

  function isStepDone(topicId, step, p) {
    p = p || loadProgress();
    const tp = p[topicId] || {};
    if (step.kind === 'shorts') {
      const watched = tp.shorts || [];
      return step.ids.every(id => watched.includes(id));
    }
    if (step.kind === 'article')  return !!tp.article;
    if (step.kind === 'quiz')     return (tp.quizScore || 0) >= step.pass;
    if (step.kind === 'game')     return (tp.gameScore || 0) >= step.pass_score;
    if (step.kind === 'drive')    return !!tp.driveDone;
    return false;
  }

  function topicCompleted(t, p) {
    p = p || loadProgress();
    const sts = steps(t);
    if (!sts.length) return false;
    return sts.every(s => isStepDone(t.id, s, p));
  }

  function nextStep(t, p) {
    p = p || loadProgress();
    const sts = steps(t);
    for (const s of sts) if (!isStepDone(t.id, s, p)) return s;
    return null;
  }

  function topicUnlocked(t, p) {
    p = p || loadProgress();
    if (!t.prerequisites || !t.prerequisites.length) return true;
    // Unlock rule: every prerequisite chapter must be marked complete at the
    // chapter level (in APEX.completedLessons). The backend §84.501 gate at
    // /api/progress/lesson refuses to mark a chapter complete until its
    // chapter_seconds floor is met, so "in completedLessons" ≡ "legal time +
    // finished." We deliberately do NOT require every topic-step (shorts +
    // article + quiz + game + drive) here — that's a richer per-topic UI
    // signal, not the unlock gate.
    let completedLessons = [];
    try {
      const s = window.APEX && window.APEX.load && window.APEX.load();
      if (s && Array.isArray(s.completedLessons)) completedLessons = s.completedLessons;
    } catch (e) {}
    return t.prerequisites.every(pid => {
      if (!pid) return true;
      // Fall back to topic-step completion for offline / local-only sessions.
      if (completedLessons.includes(pid)) return true;
      const pt = getTopic(pid);
      return pt ? topicCompleted(pt, p) : true;
    });
  }

  // ----- Mutators (called by asset pages) -----
  function recordShortWatched(topicId, shortId) {
    const p = loadProgress();
    const tp = p[topicId] = p[topicId] || {};
    tp.shorts = tp.shorts || [];
    if (!tp.shorts.includes(shortId)) tp.shorts.push(shortId);
    saveProgress(p);
  }
  function recordArticleRead(topicId) {
    const p = loadProgress();
    p[topicId] = p[topicId] || {};
    p[topicId].article = true;
    saveProgress(p);
  }
  function recordQuizScore(topicId, score01) {
    const p = loadProgress();
    p[topicId] = p[topicId] || {};
    p[topicId].quizScore = Math.max(p[topicId].quizScore || 0, score01);
    saveProgress(p);
  }
  function recordGameScore(topicId, score) {
    const p = loadProgress();
    p[topicId] = p[topicId] || {};
    p[topicId].gameScore = Math.max(p[topicId].gameScore || 0, score);
    saveProgress(p);
  }
  function recordDriveDone(topicId) {
    const p = loadProgress();
    p[topicId] = p[topicId] || {};
    p[topicId].driveDone = true;
    saveProgress(p);
  }
  function markCompleteIfReady(topicId) {
    const p = loadProgress();
    const t = getTopic(topicId);
    if (!t) return false;
    if (topicCompleted(t, p)) {
      p[topicId].completed = true;
      saveProgress(p);
      return true;
    }
    return false;
  }

  // ----- i18n helpers -----
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
  function t(t_obj, key) { // key like 'title' picks title_en or title_es
    const L = lang();
    return t_obj[key + '_' + L] || t_obj[key + '_en'] || '';
  }

  window.APEX_TOPICS = {
    list: topics,
    get: getTopic,
    steps,
    isStepDone,
    topicCompleted,
    nextStep,
    topicUnlocked,
    loadProgress,
    saveProgress,
    refreshFromServer,
    recordShortWatched,
    recordArticleRead,
    recordQuizScore,
    recordGameScore,
    recordDriveDone,
    markCompleteIfReady,
    lang,
    t,
    // First topic that's unlocked + not completed (for "what's next" CTA)
    currentTopic() {
      const p = loadProgress();
      for (const tp of topics) if (topicUnlocked(tp, p) && !topicCompleted(tp, p)) return tp;
      return null;
    },
    // Convenience: count completed topics
    progressSummary() {
      const p = loadProgress();
      const total = topics.length;
      const done = topics.filter(tp => topicCompleted(tp, p)).length;
      return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
    },
  };
})();
