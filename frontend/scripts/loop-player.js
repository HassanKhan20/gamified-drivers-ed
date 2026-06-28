// APEX Loop Player — renders any chapter (reading / scenario / checkpoint) as a
// sequence of one-idea "beats" with interleaved checks, instant feedback, a
// worked example, a branching mini-scenario, and a recap.
//
// LANGUAGE: the player renders its OWN chrome from a lang-keyed LABELS table and
// marks its mount with data-no-i18n so the global DOM-walking translator leaves
// it alone. The caller passes the current language via opts.lang ('en'|'es').
// Content (body/quiz/etc.) is already in the right language via the curriculum
// overlay before it reaches the player.
//
// Usage (classic script): window.APEX_LOOP.play(chapter, mountEl, {
//   lang: 'en'|'es', onFinish: fn(), onAttempt: fn(questionKey, correct), masteryThreshold: 0.7
// });
(function () {
  function esc(s) { return String(s == null ? '' : s); }

  var LABELS = {
    en: {
      learn: 'LEARN', quickCheck: 'QUICK CHECK', worked: 'WORKED EXAMPLE', theRule: 'THE RULE',
      recap: 'RECAP', youDecide: 'YOU DECIDE', checkpoint: 'CHECKPOINT', result: 'RESULT',
      cont: 'Continue →', back: '← Back', finish: 'Finish ✓', start: 'Start →',
      hintRead: 'Read, then continue', hintPick: 'Pick an answer', hintDefensive: 'Pick the defensive move',
      lockThese: 'Lock these in:', setup: 'Setup.', correctMark: '✓ Correct',
      examIntro: function (n, pct) { return 'This checkpoint has <strong>' + n + ' questions</strong>. You need <strong>' + pct + '%</strong> to pass. You\'ll see the answer after each one.'; },
      examScore: function (c, t) { return c + ' of ' + t + ' correct'; },
      passed: 'You passed this checkpoint.',
      failed: function (pct) { return 'You need ' + pct + '% to pass. Review and try again.'; },
      retry: 'Retry checkpoint',
    },
    es: {
      learn: 'APRENDE', quickCheck: 'REPASO RÁPIDO', worked: 'EJEMPLO RESUELTO', theRule: 'LA REGLA',
      recap: 'RESUMEN', youDecide: 'TÚ DECIDES', checkpoint: 'PUNTO DE CONTROL', result: 'RESULTADO',
      cont: 'Continuar →', back: '← Atrás', finish: 'Terminar ✓', start: 'Comenzar →',
      hintRead: 'Lee y continúa', hintPick: 'Elige una respuesta', hintDefensive: 'Elige la decisión defensiva',
      lockThese: 'Memorízalos:', setup: 'Situación.', correctMark: '✓ Correcto',
      examIntro: function (n, pct) { return 'Este punto de control tiene <strong>' + n + ' preguntas</strong>. Necesitas <strong>' + pct + '%</strong> para aprobar. Verás la respuesta después de cada una.'; },
      examScore: function (c, t) { return c + ' de ' + t + ' correctas'; },
      passed: 'Aprobaste este punto de control.',
      failed: function (pct) { return 'Necesitas ' + pct + '% para aprobar. Repasa e intenta de nuevo.'; },
      retry: 'Repetir el examen',
    },
  };

  function buildBeats(ch) {
    var beats = [];
    if (ch.type === 'reading') {
      var body = ch.body || [], quiz = ch.quiz || [];
      var everyN = body.length > 0 ? Math.max(1, Math.round(body.length / Math.max(1, quiz.length))) : 1;
      var qi = 0;
      body.forEach(function (p, i) {
        beats.push({ kind: 'teach', text: p });
        if (qi < quiz.length && ((i + 1) % everyN === 0)) { beats.push({ kind: 'check', q: quiz[qi], key: ch.id + ':' + qi }); qi++; }
      });
      while (qi < quiz.length) { beats.push({ kind: 'check', q: quiz[qi], key: ch.id + ':' + qi }); qi++; }
      if (ch.worked) beats.push({ kind: 'worked', w: ch.worked });
      if (ch.miniScenario) beats.push({ kind: 'mini', s: ch.miniScenario, key: ch.id + ':m' });
      beats.push({ kind: 'recap', kp: ch.keyPoints || [] });
    } else if (ch.type === 'scenario') {
      (ch.body || []).forEach(function (p) { beats.push({ kind: 'teach', text: p }); });
      beats.push({ kind: 'decision', ch: ch });
      if (ch.rule) beats.push({ kind: 'rule', rule: ch.rule });
      (ch.quiz || []).forEach(function (q, i) { beats.push({ kind: 'check', q: q, key: ch.id + ':' + i }); });
      beats.push({ kind: 'recap', kp: ch.keyPoints || [] });
    } else if (ch.type === 'checkpoint') {
      var exam = ch.exam || [];
      beats.push({ kind: 'examIntro', count: exam.length });
      exam.forEach(function (q, i) { beats.push({ kind: 'exam', q: q, key: ch.id + ':e' + i, idx: i, total: exam.length }); });
      beats.push({ kind: 'examResult' });
    }
    return beats;
  }

  function play(chapter, mount, opts) {
    opts = opts || {};
    var onFinish = opts.onFinish || function () {};
    var onAttempt = opts.onAttempt || function () {};
    var mastery = opts.masteryThreshold || 0.70;
    var L = LABELS[opts.lang === 'es' ? 'es' : 'en'];
    var beats = buildBeats(chapter);
    var idx = 0, answered = {}, examCorrect = 0, examTotal = 0;

    injectStyles();
    mount.setAttribute('data-no-i18n', '1'); // keep the global DOM translator out of the player
    mount.innerHTML =
      '<div class="lp-bar"><div class="lp-fill" id="lpFill"></div></div>' +
      '<div class="lp-kicker" id="lpKicker"></div>' +
      '<div class="lp-card" id="lpCard"></div>' +
      '<div class="lp-nav">' +
        '<button class="btn btn-secondary" id="lpPrev">' + esc(L.back) + '</button>' +
        '<span class="lp-hint" id="lpHint"></span>' +
        '<button class="btn btn-primary" id="lpNext">' + esc(L.cont) + '</button>' +
      '</div>';

    var card = mount.querySelector('#lpCard');
    var fill = mount.querySelector('#lpFill');
    var kicker = mount.querySelector('#lpKicker');
    var nextB = mount.querySelector('#lpNext');
    var prevB = mount.querySelector('#lpPrev');
    var hint = mount.querySelector('#lpHint');

    nextB.onclick = function () { go(1); };
    prevB.onclick = function () { go(-1); };
    function setNext(on, label) { nextB.disabled = !on; if (label) nextB.textContent = label; }
    function needsAnswer(b) { return b && (b.kind === 'check' || b.kind === 'mini' || b.kind === 'decision' || b.kind === 'exam'); }

    function go(d) {
      var b = beats[idx];
      if (d > 0 && needsAnswer(b) && answered[idx] === undefined) return;
      if (d > 0 && idx === beats.length - 1) { onFinish(); return; }
      idx = Math.max(0, Math.min(beats.length - 1, idx + d));
      render();
      if (mount.scrollIntoView) mount.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function render() {
      var b = beats[idx];
      fill.style.width = Math.round(idx / (beats.length - 1) * 100) + '%';
      prevB.style.visibility = idx === 0 ? 'hidden' : 'visible';
      var last = idx === beats.length - 1;
      nextB.textContent = last ? L.finish : L.cont;
      hint.textContent = '';
      if (b.kind === 'teach') renderTeach(b);
      else if (b.kind === 'check') renderCheck(b);
      else if (b.kind === 'worked') renderWorked(b);
      else if (b.kind === 'mini') renderMini(b);
      else if (b.kind === 'decision') renderDecision(b);
      else if (b.kind === 'rule') renderRule(b);
      else if (b.kind === 'recap') renderRecap(b);
      else if (b.kind === 'examIntro') renderExamIntro(b);
      else if (b.kind === 'exam') renderExam(b);
      else if (b.kind === 'examResult') renderExamResult(b);
    }

    function renderTeach(b) {
      kicker.className = 'lp-kicker teach'; kicker.textContent = L.learn + ' · ' + (idx + 1) + ' / ' + beats.length;
      card.innerHTML = '<div class="lp-teach">' + esc(b.text) + '</div>';
      setNext(true); hint.textContent = L.hintRead;
    }
    function renderWorked(b) {
      kicker.className = 'lp-kicker worked'; kicker.textContent = L.worked;
      card.innerHTML = '<div class="lp-worked"><b>' + esc(L.setup) + '</b> ' + esc(b.w.setup) + '</div><div class="lp-teach">' + esc(b.w.walkthrough) + '</div>';
      setNext(true);
    }
    function renderRule(b) {
      kicker.className = 'lp-kicker worked'; kicker.textContent = L.theRule;
      card.innerHTML = '<div class="lp-rule"><span class="lp-tag">' + esc(b.rule.tag || 'RULE') + '</span>' +
        '<h3>' + esc(b.rule.title || '') + '</h3><p>' + esc(b.rule.body || '') + '</p>' +
        (b.rule.stat ? '<div class="lp-stat"><div class="lp-statnum">' + esc(b.rule.stat.num) + '</div><div>' + esc(b.rule.stat.body) + '</div></div>' : '') + '</div>';
      setNext(true);
    }
    function renderRecap(b) {
      kicker.className = 'lp-kicker recap'; kicker.textContent = L.recap;
      card.innerHTML = '<p style="margin:0 0 12px;font-weight:600;">' + esc(L.lockThese) + '</p>' +
        '<ul class="lp-keypoints">' + (b.kp || []).map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('') + '</ul>';
      setNext(true, L.finish);
    }
    function renderCheck(b) { renderChoiceQuestion(b.q.q, b.q.options, b.q.correct, function (i) { return b.q.why; }, L.quickCheck, 'check', b.key); }
    function renderMini(b) { renderChoiceQuestion(b.s.prompt, b.s.options, b.s.correct, function (i) { return (b.s.feedback && b.s.feedback[i] ? b.s.feedback[i].body : ''); }, L.youDecide, 'scenario', b.key); }

    function renderDecision(b) {
      var c = b.ch; kicker.className = 'lp-kicker scenario'; kicker.textContent = L.youDecide;
      var scene = c.scene || {}, opts2 = c.options || [], prior = answered[idx];
      card.innerHTML = (scene.tag ? '<span class="lp-tag">' + esc(scene.tag) + '</span>' : '') +
        '<p class="lp-q">' + esc(scene.description || '') + '</p>' +
        '<div id="lpOpts">' + opts2.map(function (o) { return '<button class="lp-opt" data-letter="' + o.letter + '">' + o.letter + '. ' + esc(o.text) + '</button>'; }).join('') + '</div>' +
        '<div class="lp-fb" id="lpFb"></div>';
      var buttons = Array.prototype.slice.call(card.querySelectorAll('.lp-opt'));
      buttons.forEach(function (btn) {
        btn.onclick = function () {
          if (answered[idx] !== undefined) return;
          var letter = btn.dataset.letter; answered[idx] = letter;
          var cons = (c.consequences || {})[letter] || {};
          var good = cons.good === true || letter === c.correct;
          buttons.forEach(function (x) { x.disabled = true; });
          btn.classList.add(good ? 'right' : 'wrong');
          if (!good && c.correct) { var cb = buttons.filter(function (x) { return x.dataset.letter === c.correct; })[0]; if (cb) cb.classList.add('right'); }
          var fb = card.querySelector('#lpFb'); fb.className = 'lp-fb show ' + (good ? 'good' : 'bad');
          fb.innerHTML = '<strong>' + esc(cons.title || '') + '</strong><br>' + esc(cons.body || '');
          onAttempt(chapter.id + ':decision', good); setNext(true, L.cont);
        };
      });
      setNext(prior !== undefined); hint.textContent = prior === undefined ? L.hintDefensive : '';
    }

    function renderChoiceQuestion(q, options, correct, whyFor, kickerLabel, kickerClass, key) {
      kicker.className = 'lp-kicker ' + kickerClass; kicker.textContent = kickerLabel;
      var prior = answered[idx];
      card.innerHTML = '<p class="lp-q">' + esc(q) + '</p>' +
        '<div id="lpOpts">' + options.map(function (o, i) { return '<button class="lp-opt" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div>' +
        '<div class="lp-fb" id="lpFb"></div>';
      var buttons = Array.prototype.slice.call(card.querySelectorAll('.lp-opt'));
      buttons.forEach(function (btn) {
        btn.onclick = function () {
          if (answered[idx] !== undefined) return;
          var i = parseInt(btn.dataset.i, 10); answered[idx] = i;
          var right = i === correct;
          buttons.forEach(function (x) { x.disabled = true; });
          btn.classList.add(right ? 'right' : 'wrong');
          if (!right) buttons[correct].classList.add('right');
          var fb = card.querySelector('#lpFb'); fb.className = 'lp-fb show ' + (right ? 'good' : 'bad');
          fb.innerHTML = (right ? '✓ ' : '✗ ') + esc(whyFor(i));
          if (key) onAttempt(key, right); setNext(true, L.cont);
        };
      });
      setNext(prior !== undefined); hint.textContent = prior === undefined ? L.hintPick : '';
    }

    function renderExamIntro(b) {
      kicker.className = 'lp-kicker check'; kicker.textContent = L.checkpoint;
      examCorrect = 0; examTotal = 0;
      card.innerHTML = '<div class="lp-teach">' + L.examIntro(b.count, Math.round(mastery * 100)) + '</div>';
      setNext(true, L.start);
    }
    function renderExam(b) {
      kicker.className = 'lp-kicker check'; kicker.textContent = L.checkpoint + ' · ' + (b.idx + 1) + ' / ' + b.total;
      var prior = answered[idx];
      card.innerHTML = '<p class="lp-q">' + esc(b.q.q) + '</p>' +
        '<div id="lpOpts">' + b.q.options.map(function (o, i) { return '<button class="lp-opt" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div>' +
        '<div class="lp-fb" id="lpFb"></div>';
      var buttons = Array.prototype.slice.call(card.querySelectorAll('.lp-opt'));
      buttons.forEach(function (btn) {
        btn.onclick = function () {
          if (answered[idx] !== undefined) return;
          var i = parseInt(btn.dataset.i, 10); answered[idx] = i;
          var right = i === b.q.correct; examTotal++; if (right) examCorrect++;
          buttons.forEach(function (x) { x.disabled = true; });
          btn.classList.add(right ? 'right' : 'wrong');
          if (!right) buttons[b.q.correct].classList.add('right');
          var fb = card.querySelector('#lpFb'); fb.className = 'lp-fb show ' + (right ? 'good' : 'bad');
          fb.innerHTML = right ? L.correctMark : ('✗ ' + esc(b.q.why || ''));
          onAttempt(b.key, right); setNext(true);
        };
      });
      setNext(prior !== undefined); hint.textContent = prior === undefined ? L.hintPick : '';
    }
    function renderExamResult() {
      var pct = examTotal ? examCorrect / examTotal : 0, passed = pct >= mastery;
      kicker.className = 'lp-kicker recap'; kicker.textContent = L.result;
      card.innerHTML = '<div style="text-align:center;padding:10px;">' +
        '<div style="font-size:42px;font-weight:800;color:' + (passed ? '#0e7c5d' : '#b45309') + ';">' + Math.round(pct * 100) + '%</div>' +
        '<p style="font-weight:600;margin:8px 0;">' + L.examScore(examCorrect, examTotal) + '</p>' +
        '<p style="color:var(--ink-500,#5d6776);">' + (passed ? esc(L.passed) : esc(L.failed(Math.round(mastery * 100)))) + '</p>' +
        (passed ? '' : '<button class="btn btn-secondary" id="lpRetry" style="margin-top:10px;">' + esc(L.retry) + '</button>') + '</div>';
      if (!passed) {
        card.querySelector('#lpRetry').onclick = function () { for (var k in answered) delete answered[k]; idx = beats.map(function (x) { return x.kind; }).indexOf('examIntro'); render(); };
        setNext(false);
      } else { setNext(true, L.finish); }
    }

    render();
  }

  function injectStyles() {
    if (document.getElementById('lp-styles')) return;
    var s = document.createElement('style'); s.id = 'lp-styles';
    s.textContent = [
      '.lp-bar{height:8px;background:rgba(0,0,0,.08);border-radius:999px;overflow:hidden;margin:6px 0 18px;}',
      '.lp-fill{height:100%;width:0;background:linear-gradient(90deg,#0e7c5d,#14a37e);transition:width .4s cubic-bezier(.16,1,.3,1);}',
      ".lp-kicker{font-family:'Inter', system-ui, sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:10px;}",
      '.lp-kicker.teach{color:#0e7c5d;}.lp-kicker.check{color:#b45309;}.lp-kicker.worked{color:#0a5944;}',
      '.lp-kicker.scenario{color:#7c3aed;}.lp-kicker.recap{color:#5d6776;}',
      '.lp-card{background:#fff;border:1px solid var(--hairline,#e6dfcc);border-radius:16px;padding:24px;min-height:160px;box-shadow:0 8px 28px -16px rgba(15,17,22,.12);animation:lpRise .3s cubic-bezier(.16,1,.3,1);}',
      '@keyframes lpRise{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}',
      '.lp-teach{font-size:17.5px;line-height:1.7;color:var(--ink-300,#2a313b);}',
      '.lp-q{font-size:18px;font-weight:700;margin:0 0 16px;}',
      '.lp-opt{display:block;width:100%;text-align:left;padding:13px 16px;margin:8px 0;border:1.5px solid var(--hairline,#e6dfcc);border-radius:12px;background:#fff;cursor:pointer;font:inherit;font-size:15px;transition:all .12s;}',
      '.lp-opt:hover:not(:disabled){border-color:#0e7c5d;transform:translateX(2px);}.lp-opt:disabled{cursor:default;}',
      '.lp-opt.right{border-color:#0e7c5d;background:#ebf7f1;}.lp-opt.wrong{border-color:#dc2626;background:#fef2f2;}',
      '.lp-fb{margin-top:14px;padding:14px 16px;border-radius:12px;font-size:14.5px;display:none;}',
      '.lp-fb.show{display:block;}.lp-fb.good{background:#ebf7f1;color:#0a5944;border:1px solid #b9e0cf;}',
      '.lp-fb.bad{background:#fef2f2;color:#991b1b;border:1px solid #fecaca;}',
      '.lp-worked{background:#fdf3e7;border:1px solid #f3d7b1;border-radius:12px;padding:15px;margin-bottom:14px;font-size:15px;}.lp-worked b{color:#b45309;}',
      '.lp-rule{background:linear-gradient(180deg,#ebf7f1,#fff);border:1px solid #b9e0cf;border-radius:14px;padding:20px;}',
      ".lp-tag{display:inline-block;background:#0e7c5d;color:#fff;padding:3px 10px;border-radius:6px;font-family:'Inter', system-ui, sans-serif;font-size:10px;font-weight:700;letter-spacing:.12em;margin-bottom:10px;}",
      '.lp-rule h3{margin:6px 0 8px;font-size:18px;}.lp-stat{display:flex;gap:12px;align-items:center;background:#fff;border:1px solid #e6dfcc;border-radius:10px;padding:12px;margin-top:12px;}',
      '.lp-statnum{font-size:26px;font-weight:800;color:#0e7c5d;}',
      '.lp-keypoints{list-style:none;padding:0;margin:0;}.lp-keypoints li{padding:9px 0 9px 26px;position:relative;border-bottom:1px solid var(--hairline,#e6dfcc);}',
      ".lp-keypoints li:before{content:'✓';position:absolute;left:0;color:#0e7c5d;font-weight:700;}",
      '.lp-nav{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:18px;}',
      '.lp-hint{font-size:12px;color:#5d6776;}.lp-nav .btn:disabled{opacity:.5;cursor:not-allowed;}',
    ].join('\n');
    document.head.appendChild(s);
  }

  window.APEX_LOOP = { play: play };
})();
