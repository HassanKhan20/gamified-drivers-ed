// APEX — global language toggle.
// Auto-injects a floating EN/ES button in the TOP-RIGHT corner of every page.
// Click → flip the language, save to localStorage, apply DOM translations
// (data-i18n="key"), then reload so dynamic content re-renders.
//
// Hard-coded inline-style colors so it always renders the same way regardless
// of which page-level :root the host page declares (some pages override CSS vars).

(function () {
  var BTN_ID = 'apex-lang-toggle';
  var STYLE_ID = 'apex-lang-toggle-css';

  function getLang() {
    try {
      var v = localStorage.getItem('apex_lang');
      if (v === 'es' || v === 'en') return v;
    } catch (e) {}
    try {
      var s = window.APEX && window.APEX.load && window.APEX.load();
      if (s && s.language === 'es') return 'es';
    } catch (e) {}
    return 'en';
  }
  function setLang(lang) {
    var v = (lang === 'es' ? 'es' : 'en');
    try { localStorage.setItem('apex_lang', v); } catch (e) {}
    try {
      if (window.APEX && window.APEX.load && window.APEX.save) {
        var s = window.APEX.load(); s.language = v; window.APEX.save(s);
      }
    } catch (e) {}
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '#' + BTN_ID + ' {',
      '  position: fixed !important; top: 12px !important; right: 12px !important;',
      '  z-index: 2147483647 !important;',
      '  display: inline-flex !important; padding: 4px !important;',
      '  border-radius: 999px !important;',
      '  background: #ffffff !important;',
      '  border: 1px solid #d6cfbd !important;',
      '  box-shadow: 0 8px 24px -8px rgba(15,17,22,0.25) !important;',
      '  font-family: "Inter", ui-monospace, monospace !important;',
      '  align-items: center !important;',
      '}',
      '#' + BTN_ID + ' .globe { padding: 0 8px 0 10px !important; font-size: 13px !important; }',
      '#' + BTN_ID + ' button {',
      '  background: transparent; border: 0; cursor: pointer;',
      '  padding: 7px 12px !important; border-radius: 999px !important;',
      '  font-family: inherit !important; font-size: 11px !important; font-weight: 700 !important;',
      '  letter-spacing: 0.10em !important; color: #5d6776 !important;',
      '  transition: all 0.15s !important;',
      '}',
      '#' + BTN_ID + ' button.active {',
      '  background: #0e7c5d !important; color: #ffffff !important;',
      '  box-shadow: 0 4px 12px -4px rgba(14,124,93,0.5) !important;',
      '}',
      '#' + BTN_ID + ' button:hover { color: #0d1117 !important; }',
      '#' + BTN_ID + ' button.active:hover { color: #ffffff !important; }',
    ].join('\n');
    (document.head || document.documentElement).appendChild(style);
  }

  function injectButton() {
    if (document.getElementById(BTN_ID)) return;
    if (!document.body) return;
    var lang = getLang();
    var wrap = document.createElement('div');
    wrap.id = BTN_ID;
    wrap.setAttribute('aria-label', 'Idioma / Language');
    wrap.innerHTML =
      '<span class="globe" title="Idioma · Language">🌐</span>' +
      '<button data-l="en" class="' + (lang === 'en' ? 'active' : '') + '" aria-label="English">EN</button>' +
      '<button data-l="es" class="' + (lang === 'es' ? 'active' : '') + '" aria-label="Español">ES</button>';
    wrap.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest && e.target.closest('button[data-l]');
      if (!btn) return;
      var target = btn.getAttribute('data-l');
      if (target === getLang()) return;
      setLang(target);
      // Reload so dynamic JS-rendered content re-evaluates with the new language.
      location.reload();
    });
    document.body.appendChild(wrap);
    console.log('[APEX] language toggle injected (' + lang + ')');
  }

  // ----- Phrase-dictionary + regex-pattern translator -----
  // Translates text nodes that aren't tagged with data-i18n.
  // Two layers:
  //   1) PHRASE_DICT — exact-match (after trim) for the ~250 most common UI strings
  //   2) REGEX_PATTERNS — for templated strings like "Module N", "X / 42 chapters"
  var PHRASE_DICT = {
    // ---- Top-bar / dashboard ----
    "Your streak": "Tu racha",
    "Course progress": "Progreso del curso",
    "Badges": "Logros",
    "Friend leaderboard": "Tabla de amigos",
    "Open →": "Abrir →",
    "OPEN →": "ABRIR →",
    "YOUR PATH": "TU CAMINO",
    "DAYS": "DÍAS",
    "Streak +1": "Racha +1",
    "You": "Tú",
    "Driver": "Conductor",
    "driver": "conductor",
    "No fake timers in APEX.": "Sin temporizadores falsos en APEX.",
    "Don't break the streak — one lesson a day keeps it alive.":
      "No rompas la racha — una lección al día la mantiene viva.",
    "chapters · 32 TDLR hrs": "capítulos · 32 hrs TDLR",
    "/ 32 TDLR hours credited.": "/ 32 horas TDLR acreditadas.",
    "42 topics · one road · every video, article, quiz, game, and drive lives inside its topic.":
      "42 temas · un camino · todo video, artículo, cuestionario, juego y manejo está dentro de su tema.",
    "Open the path and tap the next unlocked topic. The simulator and games are reached through their topic — they're not separate menus.":
      "Abre el camino y toca el siguiente tema desbloqueado. El simulador y los juegos se acceden a través de su tema — no son menús separados.",
    "State hour requirements come from real interaction — scenarios, decisions, mastery quizzes. Idle time doesn't count. So the more you actually engage, the faster you finish.":
      "Las horas requeridas por el estado vienen de interacción real — escenarios, decisiones, cuestionarios de dominio. El tiempo inactivo no cuenta. Mientras más realmente participes, más rápido terminas.",
    // ---- Topic / roadmap ----
    "Back": "Atrás",
    "Back to your path": "Regresar al camino",
    "Topic progress": "Progreso del tema",
    "What's inside — complete in order": "Qué incluye — completa en orden",
    "Topic locked.": "Tema bloqueado.",
    "Topic complete.": "Tema completado.",
    "Nice work. The next topic is now unlocked on your path.":
      "Buen trabajo. El siguiente tema está desbloqueado en tu camino.",
    "Locked": "Bloqueado",
    "locked": "bloqueado",
    "done": "hecho",
    "tap to start": "tócalo para empezar",
    "Resume": "Continuar",
    "Up next": "Sigue",
    "topics": "temas",
    "shorts": "shorts",
    "article": "artículo",
    "exam": "examen",
    "quiz": "cuestionario",
    "game": "juego",
    "drive": "manejo",
    "Read": "Leer",
    "Watch": "Ver",
    "Re-watch": "Repetir",
    "Review": "Revisar",
    "Play": "Jugar",
    "Replay": "Volver a jugar",
    "Drive": "Manejar",
    "Re-drive": "Volver a manejar",
    "Start quiz": "Iniciar",
    "Retake": "Volver a tomar",
    "Quiz": "Cuestionario",
    "Module checkpoint exam": "Examen de control del módulo",
    "Next →": "Siguiente →",
    "Finish": "Terminar",
    "Correct.": "Correcto.",
    "Wrong — review the article and try again.": "Incorrecto — revisa el artículo e intenta de nuevo.",
    // ---- Lesson page ----
    "Pick one:": "Elige una:",
    "Pick the response a defensive driver would make. Don't worry about being wrong — that's how you learn.":
      "Elige la respuesta de un conductor defensivo. No te preocupes si te equivocas — así se aprende.",
    "See my options →": "Ver mis opciones →",
    "Here's what happens.": "Esto es lo que pasa.",
    "Why? Show me the rule": "¿Por qué? Muéstrame la regla",
    "Skip to quiz →": "Saltar al cuestionario →",
    "Take the quiz →": "Tomar el cuestionario →",
    "↩ Re-read consequence": "↩ Releer la consecuencia",
    "Get all of them right to pass. Wrong answers loop back. No fake timers.":
      "Acierta todas para aprobar. Las respuestas incorrectas se repiten. Sin temporizadores falsos.",
    "Authoring in progress.": "Edición en proceso.",
    "Mark chapter studied →": "Marcar capítulo estudiado →",
    "Read aloud": "Escucha",
    "Stop": "Detener",
    "Continue →": "Continuar →",
    "I read it — quiz me →": "Lo leí — cuestiona →",
    "Key points": "Puntos clave",
    "Quick check": "Repaso rápido",
    "Chapter complete": "Capítulo completado",
    "Nailed it.": "¡Lo lograste!",
    "Not quite — let's lock this one in.": "Casi — vamos a repasarla.",
    "Read the article": "Leer el artículo",
    "📄 Read the full article": "📄 Leer el artículo completo",
    "Optional · the full article": "Opcional · el artículo completo",
    "If the shorts already clicked, skip straight to the quiz. The article is here as reference.":
      "Si los shorts ya te quedaron claros, ve directo al cuestionario. El artículo está aquí como referencia.",
    "↑ Re-watch shorts": "↑ Volver a ver shorts",
    "Try again": "Intentar de nuevo",
    "Start the exam →": "Iniciar el examen →",
    "Retake the exam": "Volver a tomar el examen",
    "See result →": "Ver resultado →",
    "Next question →": "Siguiente pregunta →",
    "Spanish authoring in progress for this chapter — showing English meanwhile.":
      "Edición en español de este capítulo en proceso — mostrando inglés mientras tanto.",
    "Mastery quiz": "Cuestionario de dominio",
    "Final exam": "Examen final",
    // ---- Scene meta tokens ----
    "Day": "Día",
    "Night": "Noche",
    "Dusk": "Atardecer",
    "Dawn": "Amanecer",
    "Highway": "Autopista",
    "Rural": "Rural",
    "Urban": "Urbano",
    "Suburban": "Suburbio",
    "Rain": "Lluvia",
    "Fog": "Niebla",
    "Snow": "Nieve",
    "Ice": "Hielo",
    "Clear": "Despejado",
    "Wet": "Mojado",
    "Dry": "Seco",
    // ---- Drive simulator ----
    "EXIT": "SALIR",
    "RESTART": "REINICIAR",
    "FREE DRIVE": "MANEJO LIBRE",
    "PARKING PRACTICE": "PRÁCTICA DE ESTACIONAMIENTO",
    "LOT WARM-UP": "CALENTAMIENTO DE LOTE",
    "PARALLEL PARK · GUIDED": "ESTACIONAMIENTO PARALELO · GUIADO",
    "3-POINT TURN · GUIDED": "VUELTA EN 3 PUNTOS · GUIADA",
    "PEDESTRIAN POP-UP": "PEATÓN SORPRESA",
    "LATE-YELLOW DRILL": "AMARILLO TARDÍO",
    "SMOG LANE CHANGE": "CAMBIO DE CARRIL SMOG",
    "4-WAY STOP": "ALTO DE 4 VÍAS",
    "WET WEATHER": "CLIMA MOJADO",
    "SKID RECOVERY": "RECUPERACIÓN DE DERRAPE",
    "CHECKPOINT RUN": "RECORRIDO DE CONTROL",
    "ROAD TEST · FINAL": "EXAMEN PRÁCTICO · FINAL",
    "Speed": "Velocidad",
    "MPH": "MPH",
    "Car": "Carro",
    "CLASS A · LVL 1": "CLASE A · NVL 1",
    "Welcome to your simulator.": "Bienvenido al simulador.",
    "Got it — let's drive →": "Listo — ¡a manejar! →",
    "Run complete.": "Recorrido completado.",
    "Road test cleared.": "Examen práctico aprobado.",
    "Free drive — explore the city.": "Manejo libre — explora la ciudad.",
    // ---- Games ----
    "Sign Match": "Empareja la señal",
    "Right-of-Way Sequencer": "Secuenciador de derecho de paso",
    "Drag each sign to its meaning. Match all 8 before time runs out. +50 pts per correct match. -10 pts per wrong drop.":
      "Arrastra cada señal a su significado. Empareja las 8 antes de que acabe el tiempo. +50 pts por acierto. -10 pts por error.",
    "▸ Pool · Drag from here": "▸ Pool · Arrastra desde aquí",
    "▸ Drop on the matching meaning": "▸ Suelta en el significado correcto",
    "Round complete.": "Ronda completada.",
    "Play again": "Jugar de nuevo",
    "Back to path →": "Regresar al camino →",
    "Final score": "Puntaje final",
    "Accuracy": "Precisión",
    "XP earned": "XP ganada",
    "All 8 signs matched. Time bonus applied.": "Las 8 señales emparejadas. Bono de tiempo aplicado.",
    "Time's up. Score saved.": "Se acabó el tiempo. Puntaje guardado.",
    "How to play (open me first)": "Cómo jugar (ábreme primero)",
    "Daily Hazard Drill": "Práctica diaria de peligros",
    "Spot the hazards in this scene.": "Encuentra los peligros en esta escena.",
    // ---- Auth ----
    "Get your first chapter.": "Obtén tu primer capítulo.",
    "Sign up once. Streaks, XP, and TDLR engagement minutes sync to your account.":
      "Crea tu cuenta una vez. Rachas, XP y minutos TDLR se sincronizan con tu cuenta.",
    "Already have an account?": "¿Ya tienes cuenta?",
    "Sign in →": "Iniciar sesión →",
    "Create account →": "Crear cuenta →",
    "PROTOTYPE · NO BILLING · NO AUTO-RENEW": "PROTOTIPO · SIN COBRO · SIN RENOVACIÓN AUTOMÁTICA",
    "Name": "Nombre",
    "Email": "Correo",
    "Password": "Contraseña",
    "I am a": "Soy",
    "TEEN": "ADOLESCENTE",
    "PARENT": "PADRE",
    "I agree to the": "Acepto el",
    "and": "y",
    "If I'm under 18, my parent/guardian has consented.":
      "Si soy menor de 18, mi padre/tutor ha consentido.",
    "User Agreement": "Acuerdo de Usuario",
    "Privacy Policy": "Política de Privacidad",
    "Privacy": "Privacidad",
    "Plans": "Planes",
    "About": "Sobre nosotros",
    "Compliance": "Cumplimiento",
    "Contact / Refund": "Contacto / Reembolso",
    "Contact": "Contacto",
    "Drivers ed teens don't try to bypass.": "Educación vial que los adolescentes no intentan saltar.",
    // ---- Misc shared ----
    "Loading…": "Cargando…",
    "Close": "Cerrar",
    "Cancel": "Cancelar",
    "Save": "Guardar",
    "Delete": "Eliminar",
    "Edit": "Editar",
    "min": "min",
    "minute": "minuto",
    "minutes": "minutos",
    "second": "segundo",
    "seconds": "segundos",
    "hour": "hora",
    "hours": "horas",
    "Open": "Abrir",
    "Continue": "Continuar",
    "Yes": "Sí",
    "No": "No",
    "Ok": "OK",
    "Submit": "Enviar",
  };

  // ---- Regex-driven patterns for templated strings ----
  // Each entry: [regex, replacement]. Replacement uses $1, $2 backrefs.
  // Numbers and identifiers are preserved verbatim — only the surrounding
  // English glue is translated.
  var REGEX_PATTERNS = [
    // "Module N · Title · ~N min"  (lesson sub-line)
    [/^Module\s+(\d+)\s*·\s*([^·]+)·\s*~\s*(\d+)\s*min$/i, 'Módulo $1 · $2 · ~$3 min'],
    // "Module N: Title"
    [/^Module\s+(\d+):\s*(.+)$/, 'Módulo $1: $2'],
    // "Module N"
    [/^Module\s+(\d+)$/i, 'Módulo $1'],
    // "Chapter X.Y · Module N: Title"
    [/^Chapter\s+(\d+\.\d+)\s*·\s*Module\s+(\d+):\s*(.+)$/i, 'Capítulo $1 · Módulo $2: $3'],
    // "Chapter X.Y · Module N · Title"
    [/^Chapter\s+(\d+\.\d+)\s*·\s*Module\s+(\d+)\s*·\s*(.+)$/i, 'Capítulo $1 · Módulo $2 · $3'],
    // "Chapter X.Y: Title"
    [/^Chapter\s+(\d+\.\d+):\s*(.+)$/i, 'Capítulo $1: $2'],
    // "Up next — Chapter X.Y: Title."
    [/^Up next\s*—\s*Chapter\s+(\d+\.\d+):\s*(.+)\.$/i, 'Sigue — Capítulo $1: $2.'],
    // "Chapter X.Y"
    [/^Chapter\s+(\d+\.\d+)$/i, 'Capítulo $1'],
    // "Welcome back, Name."
    [/^Welcome back,\s*(.+)\.$/i, 'Bienvenido de regreso, $1.'],
    // "Chapter not found"
    [/^Chapter not found$/i, 'Capítulo no encontrado'],
    // "X-day streak"
    [/^(\d+)-day streak$/i, '$1 días de racha'],
    // "X / Y chapters · 32 TDLR hrs"
    [/^(\d+)\s*\/\s*(\d+)\s*chapters\s*·\s*32\s*TDLR\s*hrs$/i, '$1 / $2 capítulos · 32 hrs TDLR'],
    // "X.Y / 32 TDLR hours credited."
    [/^([\d.]+)\s*\/\s*32\s*TDLR\s*hours credited\.?$/i, '$1 / 32 horas TDLR acreditadas.'],
    // "X / Y" alone — leave as-is (no translation needed)
    // "+N XP"
    [/^\+(\d+)\s*XP$/i, '+$1 XP'],
    // "~N min" / "~N MIN"
    [/^~\s*(\d+)\s*min$/i, '~$1 min'],
    [/^(\d+)\s*MIN$/, '$1 MIN'],
    // "X XP · Lvl Y"
    [/^(\d+)\s*XP\s*·\s*Lvl\s*(\d+)$/i, '$1 XP · Nvl $2'],
    // "SCENARIO NN" -> "ESCENARIO NN"
    [/^SCENARIO\s+(\d+)$/i, 'ESCENARIO $1'],
    // "Stop N of M:" / "Stop N of M"
    [/^Stop\s+(\d+)\s+of\s+(\d+):?\s*(.*)$/i, 'Parada $1 de $2: $3'],
    // "TOPIC N of 42"
    [/^TOPIC\s+(\d+\.\d+|\d+)\s+of\s+(\d+)$/i, 'TEMA $1 de $2'],
    [/^TOPIC\s+(\d+\.\d+|\d+)$/i, 'TEMA $1'],
    // "Ch. X.Y" -> "Cap. X.Y"
    [/^Ch\.\s+(\d+\.\d+)$/i, 'Cap. $1'],
    // "ROUND N / M"
    [/^ROUND\s+(\d+)\s*\/\s*(\d+)$/i, 'RONDA $1 / $2'],
    // "N / M" -> leave numbers alone (handled above for chapters)
    // "Quick mastery quiz next — N questions. Get them all right and Chapter X.Y is yours."
    [/^Quick mastery quiz next\s*—\s*(\d+)\s+questions.*Chapter\s+(\d+\.\d+)\s+is yours\.?$/i,
     'Cuestionario de dominio a continuación — $1 preguntas. Acierta todas y el Capítulo $2 es tuyo.'],
    // "Mastery quiz · X/Y" / "Mastery quiz · X / Y"
    [/^Mastery quiz\s*·\s*(\d+)\s*\/\s*(\d+)$/i, 'Cuestionario de dominio · $1 / $2'],
    // "Module N checkpoint" (chapter title for checkpoint)
    [/^Module\s+(\d+)\s+checkpoint$/i, 'Examen del módulo $1'],
    // "Credited N min toward your 32 TDLR hours."
    [/^Credited\s+(\d+)\s+min toward your 32 TDLR hours\.?$/i, 'Se acreditaron $1 min hacia tus 32 horas TDLR.'],
    // "X-day Streak" badge
    [/^(\d+)-day Streak$/i, 'Racha de $1 días'],
    // "POOL · DRAG FROM HERE" → handled by literal phrase
  ];

  function translatePhrase(s) {
    var trim = s.trim();
    if (!trim) return null;
    if (PHRASE_DICT[trim]) {
      var pre  = s.match(/^\s*/)[0];
      var post = s.match(/\s*$/)[0];
      return pre + PHRASE_DICT[trim] + post;
    }
    // Regex pattern fallback
    for (var i = 0; i < REGEX_PATTERNS.length; i++) {
      var pair = REGEX_PATTERNS[i];
      if (pair[0].test(trim)) {
        var replaced = trim.replace(pair[0], pair[1]);
        if (replaced !== trim) {
          var pre2  = s.match(/^\s*/)[0];
          var post2 = s.match(/\s*$/)[0];
          return pre2 + replaced + post2;
        }
      }
    }
    return null;
  }

  function applyPhraseDict() {
    if (getLang() !== 'es') return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.parentNode) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        var tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('[data-i18n]')) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('#apex-lang-toggle')) return NodeFilter.FILTER_REJECT;
        // The loop player owns its own language; never let the phrase-walker touch it.
        if (p.closest && p.closest('[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    var nodes = [];
    var n; while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (txt) {
      var translated = translatePhrase(txt.nodeValue);
      if (translated && translated !== txt.nodeValue) {
        txt.nodeValue = translated;
      }
    });
  }

  // Reentrancy + idempotence: setting textContent is itself a DOM mutation,
  // so the MutationObserver below would re-fire forever without these guards.
  var _applyingI18n = false;
  function applyI18nNow() {
    if (_applyingI18n) return;
    _applyingI18n = true;
    try {
      var lang = getLang();
      var dict = (window.APEX_I18N && window.APEX_I18N[lang]) || {};
      var enDict = (window.APEX_I18N && window.APEX_I18N.en) || {};
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        var translated = dict[key] || enDict[key];
        // Only write if the value is actually different (avoids spurious mutations)
        if (translated && el.textContent !== translated) {
          el.textContent = translated;
        }
      });
      document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
        var map = el.getAttribute('data-i18n-attr');
        map.split(',').forEach(function (pair) {
          var parts = pair.trim().split(':').map(function (s) { return s.trim(); });
          var attr = parts[0], key = parts[1];
          if (!attr || !key) return;
          var translated = dict[key] || enDict[key];
          if (translated && el.getAttribute(attr) !== translated) {
            el.setAttribute(attr, translated);
          }
        });
      });
      // Phrase-dictionary fallback for any un-tagged text nodes.
      applyPhraseDict();
    } catch (e) { console.warn('[APEX] i18n apply failed', e); }
    finally { _applyingI18n = false; }
  }

  // Watch the DOM for newly added nodes. Re-runs the translator on any element
  // insert (not just data-i18n). This is what catches dynamically-injected
  // lesson content, scenario cards, mission card updates, etc.
  // Rate-limited via requestAnimationFrame so it never spins.
  function startObserver() {
    if (window.__APEX_LANG_OBSERVER) return;
    try {
      var pending = false;
      var mo = new MutationObserver(function (mutations) {
        if (_applyingI18n || pending) return;
        // React when ANY element node gets added (we'll let applyI18nNow figure
        // out which descendants need translating). Skip if it's just text node
        // changes from the translator itself.
        var has = false;
        for (var i = 0; i < mutations.length && !has; i++) {
          var m = mutations[i];
          if (m.type !== 'childList' || !m.addedNodes) continue;
          for (var j = 0; j < m.addedNodes.length; j++) {
            var n = m.addedNodes[j];
            if (n && n.nodeType === 1) { has = true; break; }
          }
        }
        if (!has) return;
        pending = true;
        // Coalesce bursts on the next animation frame so we never thrash.
        requestAnimationFrame(function () { pending = false; applyI18nNow(); });
      });
      mo.observe(document.body, { childList: true, subtree: true });
      window.__APEX_LANG_OBSERVER = mo;
    } catch (e) { console.warn('[APEX] MutationObserver failed', e); }
  }

  function bootstrap() {
    try {
      injectStyles();
      injectButton();
      applyI18nNow();
      startObserver();
      if ('speechSynthesis' in window) {
        try { speechSynthesis.onvoiceschanged = applyI18nNow; } catch (e) {}
      }
    } catch (e) {
      console.error('[APEX] lang-toggle bootstrap failed:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
  // Multiple retries in case the body wasn't ready, AND to re-apply translations
  // after async content (dashboard topbar, lesson body, etc.) renders.
  setTimeout(bootstrap, 50);
  setTimeout(bootstrap, 250);
  setTimeout(bootstrap, 600);
  setTimeout(bootstrap, 1500);
})();
