// APEX i18n — EN / ES UI strings for the entire app.
// User language is stored in APEX state (mirrored from /api/me) and localStorage.
// `T(key)` returns a translated string with EN fallback.
//
// To translate a DOM element, mark it with `data-i18n="some.key"` for textContent,
// or `data-i18n-attr="placeholder:some.key"` for attribute translation. The
// `lang-toggle.js` script applies these on page load + when the language flips.

window.APEX_I18N = {
  en: {
    // Sidebar nav (used everywhere)
    'nav.dashboard':      'Dashboard',
    'nav.your_path':      'Your Path',
    'nav.all_courses':    'All courses',
    'nav.shorts':         'Shorts',
    'nav.free_drive':     'Free Drive',
    'nav.garage':         'Garage',
    'nav.dmv_sim':        'DMV Day Sim',
    'nav.btw_logbook':    'BTW Logbook',
    'nav.compliance':     'Compliance',
    'nav.contact':        'Contact',
    'nav.signout':        'Sign out',
    'nav.signin':         'Sign in',
    'nav.signup':         'Sign up',
    'nav.about':          'About',
    'nav.plans':          'Plans',
    'nav.hazard_drill':   'Hazard Drill',
    'nav.teen_path':      "Teen's path",
    'nav.family':         'Family',
    'nav.learn':          'Learn',
    'nav.trust':          'Trust',

    // Hero / dashboard
    'dash.todays_mission':  "▸ Today's mission",
    'dash.start_lesson':    'Start lesson →',
    'dash.open_path':       'Open your path →',
    'dash.welcome_back':    'Welcome back',
    'dash.up_next':         'Up next',
    'dash.streak':          'Streak',
    'dash.xp':              'XP',
    'dash.level':           'Level',
    'dash.your_streak':     'Your streak',
    'dash.course_progress': 'Course progress',
    'dash.recent_badges':   'Recent badges',
    'dash.days_caps':       'DAYS',
    'dash.streak_tip':      "Don't break the streak — one lesson a day keeps it alive.",
    'dash.chapters_tdlr':   'chapters · 32 TDLR hrs',
    'dash.tdlr_hours_credited': '/ 32 TDLR hours credited.',
    'dash.badges':          'Badges',
    'dash.your_path_caps':  'YOUR PATH',
    'dash.path_headline':   '42 topics · one road · every video, article, quiz, game, and drive lives inside its topic.',
    'dash.path_subhead':    "Open the path and tap the next unlocked topic. The simulator and games are reached through their topic — they're not separate menus.",
    'dash.open_arrow':      'OPEN →',
    'dash.open_arrow_lower':'Open →',
    'dash.friend_leaderboard': 'Friend leaderboard',
    'dash.you':             'You',
    'dash.no_fake_timers_h':'No fake timers in APEX.',
    'dash.no_fake_timers_b':"State hour requirements come from real interaction — scenarios, decisions, mastery quizzes. Idle time doesn't count. So the more you actually engage, the faster you finish.",
    'dash.streak_plus_1':   'Streak +1',
    'dash.next_car':        'Next car',
    'btw.parent_track':            '📘 Parent track →',
    'btw.parent_track_eyebrow':    'PARENT TRACK · 8 TOPICS · ~50 MIN',
    'btw.parent_track_h':          'Everything you need to supervise.',
    'btw.parent_track_b':          'Quick visual cards. No quizzes. GDL rules · DPS road test · insurance · crash protocol.',

    // Lesson player
    'lesson.read_aloud':           '🔊 Read aloud',
    'lesson.stop_audio':           '⏹ Stop',
    'lesson.quiz_me':              'I read it — quiz me →',
    'lesson.continue':             'Continue →',
    'lesson.back_to_path':         'Back to path →',
    'lesson.dashboard':            'Dashboard',
    'lesson.key_points':           'Key points',
    'lesson.quick_check':          'Quick check',
    'lesson.next':                 'Next →',
    'lesson.done':                 'Chapter complete',
    'lesson.nailed_it':            'Nailed it.',
    'lesson.not_quite':            "Not quite — let's lock this one in.",
    'lesson.translation_pending':  'Spanish authoring in progress for this chapter — showing English meanwhile.',
    'lesson.skip_to_quiz':         'Skip to the quiz →',
    'lesson.skip_to_quiz_short':   'Skip to quiz →',
    'lesson.read_article':         'Read the article',
    'lesson.read_full_article':    '📄 Read the full article',
    'lesson.optional_article':     'Optional · the full article',
    'lesson.optional_blurb':       "If the shorts already clicked, skip straight to the quiz. The article is here as reference.",
    'lesson.rewatch_shorts':       '↑ Re-watch shorts',
    'lesson.show_rule':            'Why? Show me the rule',
    'lesson.take_quiz':            'Take the quiz →',
    'lesson.reread':               '↩ Re-read consequence',
    'lesson.see_options':          'See my options →',
    'lesson.pick_one':             'Pick one:',
    'lesson.heres_what_happens':   "Here's what happens.",
    'lesson.start_exam':           'Start the exam →',
    'lesson.retake':               'Retake the exam',
    'lesson.see_result':           'See result →',
    'lesson.next_question':        'Next question →',
    'lesson.correct':              'Correct.',
    'lesson.try_again':            'Not yet — try again.',

    // Common actions
    'common.continue':         'Continue',
    'common.back':             'Back',
    'common.save':             'Save',
    'common.cancel':           'Cancel',
    'common.delete':           'Delete',
    'common.close':            'Close',
    'common.loading':          'Loading…',
    'common.exit':             'EXIT',

    // Auth pages
    'auth.create_account':       'Create account →',
    'auth.signing_in':           'Signing in…',
    'auth.creating':             'Creating…',
    'auth.welcome_back':         'Welcome back.',
    'auth.welcome_back_sub':     "Pick up where you left off — your streak is waiting.",
    'auth.get_first_chapter':    'Get your first chapter.',
    'auth.signup_sub':           'Sign up once. Streaks, XP, and TDLR engagement minutes sync to your account.',
    'auth.email':                'Email',
    'auth.password':             'Password',
    'auth.name':                 'Name',
    'auth.i_am_a':               'I am a',
    'auth.teen':                 'TEEN',
    'auth.parent':               'PARENT',
    'auth.have_account':         'Already have an account?',
    'auth.no_account':           'No account yet?',
    'auth.sign_in_link':         'Sign in →',
    'auth.create_one':           'Create one →',
    'auth.prototype_no_billing': 'PROTOTYPE · NO BILLING · NO AUTO-RENEW',
    'auth.secure_footer': 'SECURE SIGN-UP · ONE-TIME ENROLLMENT · NO SUBSCRIPTIONS',

    // Roadmap
    'roadmap.your_path':       'Your Path',
    'roadmap.up_next':         '▸ Up next',
    'roadmap.resume':          'Resume',
    'roadmap.dmv_test':        'DMV Permit Test',
    'roadmap.permit_passed':   'Permit test passed.',
    'roadmap.permit_passed_sub': "You're cleared. Print your TDLR certificate and head to the DMV.",
    'roadmap.permit_unlocked': 'Every stop on the path is done. The graduation exam is yours to take.',
    'roadmap.permit_locked':   'Clear the path above to unlock the final.',
    'roadmap.start_test':      'Start the test',
    'roadmap.review':          'Review',
    'roadmap.locked':          'Locked',

    // Parent / BTW
    'btw.title':               'Behind-the-wheel logbook',
    'btw.subtitle':            'TX requires 30 hours of supervised driving (10 at night) before the road test. APEX captures GPS at start & end and exports a TDLR DE-964 / DE-964E sheet for DPS.',
    'btw.export':              '⬇ Export DE-964 CSV',
    'btw.total_hours':         'Total hours',
    'btw.night_hours':         'Night hours',
    'btw.drives_logged':       'Drives logged',
    'btw.miles_driven':        'Miles driven',
    'btw.gps_verified':        'GPS-verified',
    'btw.log_new':             'Log a new drive',
    'btw.capture_gps':         '📍 Capture GPS now',
    'btw.gps_idle':            '▸ GPS NOT CAPTURED — TAP "CAPTURE GPS" WHEN YOU START & AGAIN WHEN YOU END',
    'btw.save_drive':          'Save drive',
    'btw.f_date':              'Date',
    'btw.f_duration':          'Duration (minutes)',
    'btw.f_start':             'Start time',
    'btw.f_end':               'End time',
    'btw.f_miles':             'Miles driven',
    'btw.f_daynight':          'Day or night?',
    'btw.f_weather':           'Weather',
    'btw.f_road':              'Road type',
    'btw.f_pname':             'Parent / instructor name',
    'btw.f_plic':              'Parent / instructor TX license #',
    'btw.f_notes':             'Notes',
    'btw.empty':               'No drives logged yet. Add your first one above.',

    // DMV simulator
    'dmv.exit':                'EXIT',
    'dmv.checkin':             'CHECK-IN',
    'dmv.evaluation':          'EVALUATION',
    'dmv.objective':           '▸ OBJECTIVE',
    'dmv.your_dps_site':       'YOUR DPS SITE',
    'dmv.test_sequence':       'Test sequence',
    'dmv.try_again':           'Try again',
    'dmv.next_gate':           'NEXT GATE',
    'dmv.score':               'DPS Score',

    // Drive sim
    'drive.exit':              'EXIT',
    'drive.restart':           'RESTART',
    'drive.cam_3rd':           'CAM · 3RD',
    'drive.cam_1st':           'CAM · 1ST',
    'drive.next':              'NEXT',
    'drive.welcome':           'Welcome to your simulator.',
    'drive.welcome_sub':       "This is a 3D driving practice ground. Pick a scenario in the top-right when you're ready — Free Drive to roam, or Checkpoint Run / Road Test for guided exercises.",
    'drive.lets_drive':        "Got it — let's drive →",

    // Topic page (English)
    'back_to_path':            'Back to your path',
    'back_to_path_label':      'Back to your path',
    'topic_locked_h':          'Topic locked.',
    'topic_locked_b':          ' Finish the previous topic to unlock this one.',
    'topic_progress':          'Topic progress',
    'whats_inside':            "What's inside — complete in order",
    'topic_complete_h':        'Topic complete.',
    'topic_complete_b':        'Nice work. The next topic is now unlocked on your path.',

    // Toggle / language
    'lang.toggle_to_es':       'Cambiar a español',
    'lang.toggle_to_en':       'Switch to English',
    'lang.label':              'Idioma · Language',
  },

  es: {
    'nav.dashboard':      'Inicio',
    'nav.your_path':      'Tu camino',
    'nav.all_courses':    'Todos los cursos',
    'nav.shorts':         'Cortos',
    'nav.free_drive':     'Manejo libre',
    'nav.garage':         'Garaje',
    'nav.dmv_sim':        'Simulador DPS',
    'nav.btw_logbook':    'Bitácora de manejo',
    'nav.compliance':     'Cumplimiento',
    'nav.contact':        'Contacto',
    'nav.signout':        'Cerrar sesión',
    'nav.signin':         'Iniciar sesión',
    'nav.signup':         'Crear cuenta',
    'nav.about':          'Sobre nosotros',
    'nav.plans':          'Planes',
    'nav.hazard_drill':   'Práctica de peligros',
    'nav.teen_path':      'Camino del adolescente',
    'nav.family':         'Familia',
    'nav.learn':          'Aprender',
    'nav.trust':          'Confianza',

    'dash.todays_mission':  '▸ Misión de hoy',
    'dash.start_lesson':    'Comenzar lección →',
    'dash.open_path':       'Abrir tu camino →',
    'dash.welcome_back':    'Bienvenido de regreso',
    'dash.up_next':         'Sigue',
    'dash.streak':          'Racha',
    'dash.xp':              'XP',
    'dash.level':           'Nivel',
    'dash.your_streak':     'Tu racha',
    'dash.course_progress': 'Progreso del curso',
    'dash.recent_badges':   'Logros recientes',
    'dash.days_caps':       'DÍAS',
    'dash.streak_tip':      'No rompas la racha — una lección al día la mantiene viva.',
    'dash.chapters_tdlr':   'capítulos · 32 hrs TDLR',
    'dash.tdlr_hours_credited': '/ 32 horas TDLR acreditadas.',
    'dash.badges':          'Logros',
    'dash.your_path_caps':  'TU CAMINO',
    'dash.path_headline':   '42 temas · un camino · todo video, artículo, cuestionario, juego y manejo está dentro de su tema.',
    'dash.path_subhead':    'Abre el camino y toca el siguiente tema desbloqueado. El simulador y los juegos se acceden a través de su tema — no son menús separados.',
    'dash.open_arrow':      'ABRIR →',
    'dash.open_arrow_lower':'Abrir →',
    'dash.friend_leaderboard': 'Tabla de amigos',
    'dash.you':             'Tú',
    'dash.no_fake_timers_h':'Sin temporizadores falsos en APEX.',
    'dash.no_fake_timers_b':'Las horas requeridas por el estado vienen de interacción real — escenarios, decisiones, cuestionarios de dominio. El tiempo inactivo no cuenta. Mientras más realmente participes, más rápido terminas.',
    'dash.streak_plus_1':   'Racha +1',
    'dash.next_car':        'Próximo carro',
    'btw.parent_track':            '📘 Curso del padre →',
    'btw.parent_track_eyebrow':    'CURSO DEL PADRE · 8 TEMAS · ~50 MIN',
    'btw.parent_track_h':          'Todo lo que necesitas para supervisar.',
    'btw.parent_track_b':          'Tarjetas visuales rápidas. Sin cuestionarios. Reglas GDL · examen DPS · seguro · protocolo de choque.',

    'lesson.read_aloud':           '🔊 Escucha la lección',
    'lesson.stop_audio':           '⏹ Detener',
    'lesson.quiz_me':              'Lo leí — cuestiona →',
    'lesson.continue':             'Continuar →',
    'lesson.back_to_path':         'Regresar al camino →',
    'lesson.dashboard':            'Inicio',
    'lesson.key_points':           'Puntos clave',
    'lesson.quick_check':          'Repaso rápido',
    'lesson.next':                 'Siguiente →',
    'lesson.done':                 'Capítulo completado',
    'lesson.nailed_it':            '¡Lo lograste!',
    'lesson.not_quite':            'Casi — vamos a repasarla.',
    'lesson.translation_pending':  'La traducción al español de este capítulo está en proceso — por ahora se muestra en inglés.',
    'lesson.skip_to_quiz':         'Saltar al examen →',
    'lesson.skip_to_quiz_short':   'Saltar al examen →',
    'lesson.read_article':         'Leer el artículo',
    'lesson.read_full_article':    '📄 Leer el artículo completo',
    'lesson.optional_article':     'Opcional · el artículo completo',
    'lesson.optional_blurb':       'Si los cortos ya te aclararon, salta directo al examen. El artículo está como referencia.',
    'lesson.rewatch_shorts':       '↑ Volver a ver los cortos',
    'lesson.show_rule':            '¿Por qué? Muéstrame la regla',
    'lesson.take_quiz':            'Hacer el examen →',
    'lesson.reread':               '↩ Releer la consecuencia',
    'lesson.see_options':          'Ver mis opciones →',
    'lesson.pick_one':             'Elige una:',
    'lesson.heres_what_happens':   'Esto es lo que pasa.',
    'lesson.start_exam':           'Comenzar el examen →',
    'lesson.retake':               'Volver a hacer el examen',
    'lesson.see_result':           'Ver resultado →',
    'lesson.next_question':        'Siguiente pregunta →',
    'lesson.correct':              'Correcto.',
    'lesson.try_again':            'Aún no — inténtalo de nuevo.',

    'common.continue':         'Continuar',
    'common.back':             'Atrás',
    'common.save':             'Guardar',
    'common.cancel':           'Cancelar',
    'common.delete':           'Eliminar',
    'common.close':            'Cerrar',
    'common.loading':          'Cargando…',
    'common.exit':             'SALIR',

    'auth.create_account':       'Crear cuenta →',
    'auth.signing_in':           'Iniciando…',
    'auth.creating':             'Creando…',
    'auth.welcome_back':         'Bienvenido de regreso.',
    'auth.welcome_back_sub':     'Continúa donde te quedaste — tu racha te espera.',
    'auth.get_first_chapter':    'Obtén tu primer capítulo.',
    'auth.signup_sub':           'Crea cuenta una vez. Las rachas, XP, y minutos del TDLR se sincronizan en tu cuenta.',
    'auth.email':                'Correo',
    'auth.password':             'Contraseña',
    'auth.name':                 'Nombre',
    'auth.i_am_a':               'Soy un',
    'auth.teen':                 'ADOLESCENTE',
    'auth.parent':               'PADRE/MADRE',
    'auth.have_account':         '¿Ya tienes una cuenta?',
    'auth.no_account':           '¿No tienes cuenta?',
    'auth.sign_in_link':         'Inicia sesión →',
    'auth.create_one':           'Crea una →',
    'auth.prototype_no_billing': 'PROTOTIPO · SIN COBROS · SIN RENOVACIÓN',
    'auth.secure_footer': 'REGISTRO SEGURO · INSCRIPCIÓN ÚNICA · SIN SUSCRIPCIONES',

    'roadmap.your_path':       'Tu camino',
    'roadmap.up_next':         '▸ Sigue',
    'roadmap.resume':          'Continuar',
    'roadmap.dmv_test':        'Examen de Permiso del DPS',
    'roadmap.permit_passed':   '¡Examen de permiso aprobado!',
    'roadmap.permit_passed_sub': 'Tu certificado del TDLR está listo. Imprímelo y ve al DPS.',
    'roadmap.permit_unlocked': 'Cada parada del camino está hecha. El examen final está listo para ti.',
    'roadmap.permit_locked':   'Completa el camino arriba para desbloquear el final.',
    'roadmap.start_test':      'Comenzar el examen',
    'roadmap.review':          'Repasar',
    'roadmap.locked':          'Bloqueado',

    'btw.title':               'Bitácora de manejo',
    'btw.subtitle':             'Texas requiere 30 horas de manejo supervisado (10 de noche) antes del examen práctico. APEX captura GPS al inicio y al final y exporta una hoja DE-964 / DE-964E del TDLR para DPS.',
    'btw.export':              '⬇ Exportar DE-964 CSV',
    'btw.total_hours':         'Horas totales',
    'btw.night_hours':         'Horas de noche',
    'btw.drives_logged':       'Viajes registrados',
    'btw.miles_driven':        'Millas conducidas',
    'btw.gps_verified':        'verificados con GPS',
    'btw.log_new':             'Registrar un nuevo viaje',
    'btw.capture_gps':         '📍 Capturar GPS ahora',
    'btw.gps_idle':            '▸ GPS NO CAPTURADO — TOCA "CAPTURAR GPS" AL INICIO Y AL FINAL',
    'btw.save_drive':          'Guardar viaje',
    'btw.f_date':              'Fecha',
    'btw.f_duration':          'Duración (minutos)',
    'btw.f_start':             'Hora inicio',
    'btw.f_end':               'Hora fin',
    'btw.f_miles':             'Millas',
    'btw.f_daynight':          '¿Día o noche?',
    'btw.f_weather':           'Clima',
    'btw.f_road':              'Tipo de camino',
    'btw.f_pname':             'Nombre del padre/instructor',
    'btw.f_plic':              'Licencia TX del padre/instructor',
    'btw.f_notes':             'Notas',
    'btw.empty':               'Aún no has registrado viajes. Agrega el primero arriba.',

    'dmv.exit':                'SALIR',
    'dmv.checkin':             'REGISTRO',
    'dmv.evaluation':          'EVALUACIÓN',
    'dmv.objective':           '▸ OBJETIVO',
    'dmv.your_dps_site':       'TU CENTRO DPS',
    'dmv.test_sequence':       'Secuencia del examen',
    'dmv.try_again':           'Volver a intentar',
    'dmv.next_gate':           'SIGUIENTE PARADA',
    'dmv.score':               'Puntaje DPS',

    'drive.exit':              'SALIR',
    'drive.restart':           'REINICIAR',
    'drive.cam_3rd':           'CÁM · 3ª',
    'drive.cam_1st':           'CÁM · 1ª',
    'drive.next':              'SIGUE',
    'drive.welcome':           'Bienvenido al simulador.',
    'drive.welcome_sub':       'Este es un simulador 3D de manejo. Elige un escenario arriba a la derecha cuando estés listo: Manejo libre para explorar, Recorrido o Examen Final para ejercicios guiados.',
    'drive.lets_drive':        'Listo — ¡a manejar! →',

    // Topic page (Spanish)
    'back_to_path':            'Regresar al camino',
    'back_to_path_label':      'Regresar al camino',
    'topic_locked_h':          'Tema bloqueado.',
    'topic_locked_b':          ' Termina el tema anterior para desbloquear este.',
    'topic_progress':          'Progreso del tema',
    'whats_inside':            'Qué incluye — completa en orden',
    'topic_complete_h':        '¡Tema completado!',
    'topic_complete_b':        'Buen trabajo. El siguiente tema está desbloqueado en tu camino.',

    'lang.toggle_to_es':       'Cambiar a español',
    'lang.toggle_to_en':       'Switch to English',
    'lang.label':              'Idioma · Language',
  },
};

window.APEX_LANG = (function () {
  function get() {
    try {
      const local = localStorage.getItem('apex_lang');
      if (local === 'es' || local === 'en') return local;
      const s = window.APEX && APEX.load();
      return (s && s.language === 'es') ? 'es' : 'en';
    } catch (e) { return 'en'; }
  }
  function set(lang) {
    const v = (lang === 'es' ? 'es' : 'en');
    try { localStorage.setItem('apex_lang', v); } catch (e) {}
    try {
      if (window.APEX) {
        const s = APEX.load(); s.language = v; APEX.save(s);
      }
    } catch (e) {}
  }
  return { get, set };
})();

window.T = function (key) {
  const lang = window.APEX_LANG.get();
  const dict = window.APEX_I18N[lang] || window.APEX_I18N.en;
  return dict[key] || (window.APEX_I18N.en[key] || key);
};

// Speech synthesis helper. Picks a Spanish or English voice based on locale.
window.APEX_SPEAK = (function () {
  let cur = null;
  function pickVoice(lang) {
    if (!('speechSynthesis' in window)) return null;
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return null;
    const wanted = lang === 'es' ? /^es/ : /^en/;
    const ranked = voices.filter(v => wanted.test(v.lang)).sort((a, b) => {
      const score = (v) => (/(google|natural|neural|premium|enhanced)/i.test(v.name) ? 0 : 1);
      return score(a) - score(b);
    });
    return ranked[0] || voices.find(v => wanted.test(v.lang)) || voices[0];
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    stop();
    const lang = window.APEX_LANG.get();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.96; u.pitch = 1.0; u.volume = 1.0;
    const v = pickVoice(lang);
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = lang === 'es' ? 'es-MX' : 'en-US'; }
    cur = u;
    speechSynthesis.speak(u);
  }
  function stop() { if ('speechSynthesis' in window) speechSynthesis.cancel(); cur = null; }
  function speaking() { return ('speechSynthesis' in window) && speechSynthesis.speaking; }
  return { speak, stop, speaking };
})();

// ====================================================================
// PHRASE_DICT — full-text English → Spanish phrase translations.
// Used by translateAllText() to walk text nodes. No data-i18n markup needed.
// Keys are TRIMMED English; matching is whole-string after trim.
// ====================================================================
window.APEX_PHRASE_DICT = {
  // Dashboard
  "Your streak": "Tu racha",
  "Course progress": "Progreso del curso",
  "Recent badges": "Logros recientes",
  "First Lesson": "Primera lección",
  "Perfect Quiz": "Examen perfecto",
  "First Drive": "Primer manejo",
  "3-day Streak": "Racha de 3 días",
  "7-day Streak": "Racha de 7 días",
  "Don't break the streak — one lesson a day keeps it alive.": "No rompas la racha — una lección al día la mantiene viva.",
  "Drive Simulator": "Simulador de manejo",
  "▸ FULL 3D · NEW": "▸ 3D COMPLETO · NUEVO",
  "FULL 3D · NEW": "3D COMPLETO · NUEVO",
  "Open city block · 1st & 3rd person cameras · arrow-key controls · 4 scenarios including the Final Road Test. Your car level-locks unlock as you XP up.":
    "Cuadra abierta · cámaras en 1ª y 3ª persona · controles con flechas · 4 escenarios incluyendo el Examen Final. Tu auto se desbloquea al subir de nivel.",
  "PER FINAL TEST": "POR EXAMEN FINAL",
  "Daily Hazard Drill": "Práctica diaria de peligros",
  "Spot the 5 hazards in today's scene. Hazard-perception training is clinically proven to reduce new-driver crash rates.":
    "Encuentra los 5 peligros de la escena de hoy. La detección de peligros está comprobada clínicamente para reducir choques de nuevos conductores.",
  "DAILY · NEW": "DIARIO · NUEVO",
  "+30 XP": "+30 XP",
  "+50 XP": "+50 XP",
  "+150 XP": "+150 XP",
  "STREAK +1": "RACHA +1",
  "Streak +1": "Racha +1",
  "1-day streak": "Racha de 1 día",
  "No fake timers in APEX.": "Nada de temporizadores falsos en APEX.",
  "State hour requirements come from real interaction — scenarios, decisions, mastery quizzes. Idle time doesn't count. So the more you actually engage, the faster you finish.":
    "Las horas estatales se acumulan con interacción real — escenarios, decisiones, exámenes. El tiempo inactivo no cuenta. Mientras más participes, más rápido terminas.",

  // Roadmap
  "Up next": "Sigue",
  "Resume": "Continuar",
  "Up next — chapter": "Sigue — capítulo",
  "Module": "Módulo",
  "Chapter": "Capítulo",
  "Lesson": "Lección",
  "Scenario": "Escenario",
  "Checkpoint": "Punto de control",
  "Game": "Juego",
  "Drive": "Manejo",
  "Hazard": "Peligro",
  "Final": "Final",
  "Step": "Paso",
  "Locked": "Bloqueado",
  "Done": "Completado",
  "Tap to start": "Toca para comenzar",

  // Lesson player buttons + text
  "Back to path": "Regresar al camino",
  "Back to path →": "Regresar al camino →",
  "Mastery required to advance": "Dominio requerido para avanzar",
  "Quick check": "Repaso rápido",
  "Mastery quiz": "Examen de dominio",
  "I read it — quiz me →": "Lo leí — cuestiona →",
  "Skip to the quiz →": "Saltar al examen →",
  "Skip to quiz →": "Saltar al examen →",
  "Read the article": "Leer el artículo",
  "Read the full article": "Leer el artículo completo",
  "📄 Read the full article": "📄 Leer el artículo completo",
  "↑ Re-watch shorts": "↑ Volver a ver los cortos",
  "↑ Re-watch": "↑ Volver a ver",
  "Why? Show me the rule": "¿Por qué? Muéstrame la regla",
  "Why? Show me the rule →": "¿Por qué? Muéstrame la regla →",
  "Take the quiz →": "Hacer el examen →",
  "↩ Re-read consequence": "↩ Releer la consecuencia",
  "Pick one:": "Elige una:",
  "See my options →": "Ver mis opciones →",
  "Here's what happens.": "Esto es lo que pasa.",
  "Optional · the full article": "Opcional · el artículo completo",
  "If the shorts already clicked, skip straight to the quiz. The article is here as reference.":
    "Si los cortos ya te aclararon, salta directo al examen. El artículo está como referencia.",
  "Key points": "Puntos clave",
  "Lock these in": "Memorízalos",
  "Why it matters": "Por qué importa",
  "Deeper context": "Contexto adicional",
  "Read article": "Leer artículo",
  "INTRO": "INTRO",
  "CORE": "ESENCIAL",
  "DEPTH": "PROFUNDIDAD",
  "TAKEAWAY": "PUNTO CLAVE",
  "Shorts done.": "Cortos terminados.",
  "You can re-watch any of them or move on. The full article is up next, but you can skip straight to the quiz.":
    "Puedes volver a verlos o continuar. El artículo completo es lo siguiente, pero puedes saltar al examen.",
  "Start the exam →": "Comenzar el examen →",
  "Retake the exam": "Volver a hacer el examen",
  "See result →": "Ver resultado →",
  "Next question →": "Siguiente pregunta →",
  "Next chapter →": "Siguiente capítulo →",
  "Next →": "Siguiente →",
  "Correct.": "Correcto.",
  "Nailed it.": "¡Lo lograste!",
  "Not quite — let's lock this one in.": "Casi — vamos a repasarla.",
  "Not yet — try again.": "Aún no — inténtalo de nuevo.",
  "Dashboard": "Inicio",
  "Chapter complete": "Capítulo completo",
  "MIN": "MIN",
  "Loading…": "Cargando…",
  "Loading...": "Cargando...",

  // Auth
  "Welcome back.": "Bienvenido de regreso.",
  "Pick up where you left off — your streak is waiting.": "Continúa donde te quedaste — tu racha te espera.",
  "Get your first chapter.": "Obtén tu primer capítulo.",
  "Sign up once. Streaks, XP, and TDLR engagement minutes sync to your account.":
    "Crea cuenta una vez. Las rachas, XP, y minutos del TDLR se sincronizan en tu cuenta.",
  "Email": "Correo",
  "Password": "Contraseña",
  "Name": "Nombre",
  "I am a": "Soy un",
  "Sign in →": "Iniciar sesión →",
  "Sign in": "Iniciar sesión",
  "Sign up": "Crear cuenta",
  "Sign out": "Cerrar sesión",
  "Create account →": "Crear cuenta →",
  "Already have an account?": "¿Ya tienes una cuenta?",
  "No account yet?": "¿No tienes cuenta?",
  "Create one →": "Crea una →",
  "Signing in…": "Iniciando…",
  "Creating…": "Creando…",
  "PROTOTYPE · NO BILLING · NO AUTO-RENEW": "PROTOTIPO · SIN COBROS · SIN RENOVACIÓN",
  "TEEN": "ADOLESCENTE",
  "PARENT": "PADRE/MADRE",
  "By continuing you agree to nothing — this is a prototype.": "Al continuar no aceptas nada — esto es un prototipo.",

  // Parent BTW
  "Behind-the-wheel logbook": "Bitácora de manejo",
  "Total hours": "Horas totales",
  "Night hours": "Horas de noche",
  "Drives logged": "Viajes registrados",
  "Miles driven": "Millas conducidas",
  "Across all logged drives": "De todos los viajes registrados",
  "Log a new drive": "Registrar un nuevo viaje",
  "📍 Capture GPS now": "📍 Capturar GPS ahora",
  "📍 Capture GPS end": "📍 Capturar GPS al final",
  "📍 GPS captured ✓": "📍 GPS capturado ✓",
  "Save drive": "Guardar viaje",
  "Saved drives sync to your TDLR DE-964 export.": "Los viajes se sincronizan con tu exportación TDLR DE-964.",
  "⬇ Export DE-964 CSV": "⬇ Exportar DE-964 CSV",
  "Date": "Fecha",
  "Duration (minutes)": "Duración (minutos)",
  "Start time": "Hora inicio",
  "End time": "Hora fin",
  "Day or night?": "¿Día o noche?",
  "Day": "Día",
  "Night": "Noche",
  "Weather": "Clima",
  "Clear": "Despejado",
  "Cloudy": "Nublado",
  "Rain": "Lluvia",
  "Heavy rain": "Lluvia fuerte",
  "Fog": "Niebla",
  "Wind": "Viento",
  "Other": "Otro",
  "Road type": "Tipo de camino",
  "Residential": "Residencial",
  "Urban": "Urbano",
  "Highway": "Carretera",
  "Mixed": "Mixto",
  "Parking lot": "Estacionamiento",
  "Parent / instructor name": "Nombre del padre/instructor",
  "Parent / instructor TX license #": "Licencia TX del padre/instructor",
  "Notes": "Notas",
  "No drives logged yet. Add your first one above.": "Aún no has registrado viajes. Agrega el primero arriba.",
  "GPS ✓": "GPS ✓",
  "NO GPS": "SIN GPS",

  // Drive sim onboarding
  "Welcome to your simulator.": "Bienvenido al simulador.",
  "This is a 3D driving practice ground. Pick a scenario in the top-right when you're ready — Free Drive to roam, or Checkpoint Run / Road Test for guided exercises.":
    "Este es un simulador 3D de manejo. Elige un escenario arriba a la derecha cuando estés listo: Manejo libre para explorar, Recorrido o Examen Final para ejercicios guiados.",
  "Got it — let's drive →": "Listo — ¡a manejar! →",
  "EXIT": "SALIR",
  "RESTART": "REINICIAR",
  "▸ Free Drive": "▸ Manejo libre",
  "▸ Parking Practice": "▸ Práctica de estacionamiento",
  "▸ Checkpoint Run": "▸ Recorrido",
  "▸ Road Test (final)": "▸ Examen Final",
  "FREE DRIVE": "MANEJO LIBRE",
  "PARKING PRACTICE": "PRÁCTICA DE ESTACIONAMIENTO",
  "CHECKPOINT RUN": "RECORRIDO",
  "ROAD TEST · FINAL": "EXAMEN FINAL",
  "CAM · 3RD": "CÁM · 3ª",
  "CAM · 1ST": "CÁM · 1ª",
  "Speed": "Velocidad",
  "MPH": "MPH",
  "Car": "Auto",
  "Free drive — explore the city.": "Manejo libre — explora la ciudad.",
  "No goal. W/↑ go. S/↓ brake. A D / ← → steer. Try the camera toggle.":
    "Sin objetivo. W/↑ acelera. S/↓ frena. A D / ← → gira. Prueba el cambio de cámara.",
  "Use the compass below to find it. Slow down as you arrive.":
    "Usa la brújula de abajo para encontrarlo. Reduce la velocidad al acercarte.",
  "Score = checkpoints hit + finish time. Compass below points at your next one.":
    "Puntaje = paradas + tiempo. La brújula apunta a tu próxima parada.",
  "Drive smoothly. Stop near each green flag. The amber flag is the final.":
    "Maneja con calma. Detente en cada bandera verde. La bandera ámbar es la final.",
  "NEXT": "SIGUE",
  "OUT OF BOUNDS — RESPAWNED": "FUERA DE LÍMITES — REGRESASTE AL INICIO",
  "All stops cleared. Run finishing…": "Todas las paradas completas. Terminando…",
  "Score saving to your account.": "Guardando puntaje en tu cuenta.",
  "Run complete.": "Recorrido completo.",
  "Road test cleared.": "¡Examen aprobado!",
  "Score saved to your account.": "Puntaje guardado en tu cuenta.",
  "Time": "Tiempo",
  "Top mph": "Vel máx mph",
  "XP": "XP",
  "Drive again": "Manejar de nuevo",

  // DMV simulator
  "Arrive at examiner": "Llega al examinador",
  "Drive forward and stop at the cone.": "Maneja al frente y detente en el cono.",
  "Stop at controlled intersection": "Detente en la intersección controlada",
  "Approach the stop sign at <15 mph and come to a complete stop.": "Acércate al alto a menos de 15 mph y detente por completo.",
  "Left turn from stop": "Vuelta a la izquierda desde el alto",
  "Turn left, signal early, stay in the proper lane.": "Vuelta a la izquierda, señaliza temprano, mantén el carril.",
  "3-point turn": "Vuelta en 3 puntos",
  "Use the 3-point turn box to reverse direction.": "Usa el cuadro de 3 puntos para cambiar de dirección.",
  "Parallel park": "Estacionamiento en paralelo",
  "Pull alongside, then back into the parallel parking space.": "Detente al lado, luego retrocede al espacio paralelo.",
  "Return to examiner": "Regresa al examinador",
  "Drive back to the start and stop. Wait for evaluation.": "Regresa al inicio y detente. Espera la evaluación.",
  "Test sequence": "Secuencia del examen",
  "▸ OBJECTIVE": "▸ OBJETIVO",
  "YOUR DPS SITE": "TU CENTRO DPS",
  "DPS Score": "Puntaje DPS",
  "NEXT GATE": "SIGUIENTE PARADA",
  "Try again": "Volver a intentar",
  "CHECK-IN": "REGISTRO",
  "EVALUATION": "EVALUACIÓN",

  // Common
  "Continue": "Continuar",
  "Continue →": "Continuar →",
  "Cancel": "Cancelar",
  "Save": "Guardar",
  "Delete": "Eliminar",
  "Close": "Cerrar",
  "Back": "Atrás",
  "Next": "Siguiente",
  "Open": "Abrir",
  "View": "Ver",
  "Share": "Compartir",
};

// Patterns for templated phrases. Each has a regex match and a Spanish replacement
// using $1, $2 etc. for captured groups. Run AFTER full-phrase matches.
window.APEX_PHRASE_PATTERNS = [
  // "Welcome back, NAME." → "Bienvenido de regreso, NAME."
  [/^Welcome back,\s*(.+?)\.$/i, "Bienvenido de regreso, $1."],
  [/^Welcome back,\s*(.+)$/i,    "Bienvenido de regreso, $1"],
  // "Up next — Chapter X.Y: TITLE." → "Sigue — Capítulo X.Y: TITLE."
  [/^Up next\s*[—-]\s*Chapter\s+(\S+)\s*:\s*(.+?)\.?$/i, "Sigue — Capítulo $1: $2."],
  // "Up next — chapter X.Y: TITLE."
  [/^Up next\s*[—-]\s*chapter\s+(\S+)\s*:\s*(.+?)\.?$/i, "Sigue — capítulo $1: $2."],
  // "Module N · TITLE · ..."
  [/^Module\s+(\d+)\s*·\s*(.+?)\s*·\s*(.+)$/i, "Módulo $1 · $2 · $3"],
  // "Module N: TITLE"
  [/^Module\s+(\d+):\s*(.+)$/i, "Módulo $1: $2"],
  // "Chapter N.M: TITLE"
  [/^Chapter\s+(\S+):\s*(.+)$/i, "Capítulo $1: $2"],
  // "Chapter N.M complete." / "Chapter N.M mastered."
  [/^Chapter\s+(\S+)\s+(complete|mastered)\.$/i, "¡Capítulo $1 completado!"],
  // "X / 32 TDLR hours credited."
  [/^([\d.]+)\s*\/\s*32\s+TDLR hours credited\.?$/i, "$1 / 32 horas TDLR acreditadas."],
  // "Don't break the streak — one lesson a day keeps it alive." (also as exact)
  // "Stop X of Y: head to the next green flagpole."
  [/^Stop\s+(\d+)\s+of\s+(\d+):\s*(.*)$/i, "Parada $1 de $2: $3"],
  // "Stop X: PHRASE"
  [/^Stop\s+(\d+):\s*(.+)$/i, "Parada $1: $2"],
  // "head to the next green flagpole." / "head to the green flagpole."
  [/^head to the (next )?green flagpole\.?$/i, "ve a la siguiente bandera verde."],
  [/^drive north and pull up to the green flagpole\.?$/i, "ve al norte y detente en la bandera verde."],
  [/^Final stop · drive to the amber flagpole\.?$/i, "Parada final · ve a la bandera ámbar."],
  // "Compass below points at it. X more after this." / "X more after this."
  [/^Compass below points at it\.\s*(\d+)\s+more after this\.?$/i, "La brújula apunta hacia ella. $1 más después de esta."],
  [/^(\d+)\s+more after this\.?$/i, "$1 más después de esta."],
  // "X-day streak"
  [/^(\d+)-day streak$/i, "Racha de $1 días"],
  // "X-day Streak"
  [/^(\d+)-day Streak$/i, "Racha de $1 días"],
  // "X DAYS"
  [/^(\d+)\s*DAYS$/, "$1 DÍAS"],
  // "X / Y"  (just keep numbers, no translation needed but match to skip)
  // "X / 30 hours remaining" / "X hours remaining"
  [/^([\d.]+)\s+hours remaining$/i, "$1 horas restantes"],
  [/^([\d.]+)\s+night hours remaining$/i, "$1 horas de noche restantes"],
  // "X GPS-verified"
  [/^(\d+)\s+GPS-verified$/i, "$1 verificados con GPS"],
  // "+N XP earned"
  [/^\+(\d+)\s*XP earned$/i, "+$1 XP ganados"],
  // "X chapters · 32 TDLR hrs" — keep number
  [/^chapters\s*·\s*32\s+TDLR hrs$/i, "capítulos · 32 hrs TDLR"],
  // "X / Y" — leave alone, return null sentinel
];

// True if the trimmed text node looks like a username, number, code, or other
// dynamic value we should NEVER touch. Skip whitespace-only too.
function _shouldSkipText(s) {
  if (!s || !s.trim()) return true;
  var t = s.trim();
  // Pure numbers
  if (/^[\d.,/+\-\s%·:]+$/.test(t)) return true;
  // Single-character or 1-2 char (likely M/T/W/S etc)
  if (t.length <= 2) return true;
  return false;
}

function _translateText(s) {
  var trimmed = s.trim();
  if (_shouldSkipText(trimmed)) return null;
  var dict = window.APEX_PHRASE_DICT || {};
  if (Object.prototype.hasOwnProperty.call(dict, trimmed)) {
    return s.replace(trimmed, dict[trimmed]);
  }
  var pats = window.APEX_PHRASE_PATTERNS || [];
  for (var i = 0; i < pats.length; i++) {
    var pat = pats[i][0], repl = pats[i][1];
    if (pat.test(trimmed)) {
      var translated = trimmed.replace(pat, repl);
      return s.replace(trimmed, translated);
    }
  }
  return null;
}

// Translate every text node in `root` whose trimmed value matches the dictionary
// or one of the regex patterns. Skips <script>, <style>, contenteditable.
function _translateAllTextNodes(root, lang) {
  if (lang !== 'es') return;
  if (!root) root = document.body || document;
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, IFRAME: 1, CODE: 1, PRE: 1 };
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      var p = node.parentNode;
      if (!p) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS[p.nodeName]) return NodeFilter.FILTER_REJECT;
      if (p.closest && p.closest('[contenteditable]')) return NodeFilter.FILTER_REJECT;
      if (p.id === 'apex-lang-toggle' || (p.closest && p.closest('#apex-lang-toggle'))) return NodeFilter.FILTER_REJECT;
      // The loop player owns its own language; never let the phrase-walker touch it.
      if (p.closest && p.closest('[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
      var v = node.nodeValue;
      if (!v || !v.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  var nodes = [];
  var n;
  while ((n = walker.nextNode())) nodes.push(n);
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var translated = _translateText(node.nodeValue);
    if (translated !== null && translated !== node.nodeValue) {
      node.nodeValue = translated;
    }
  }
  // Translate user-facing attributes too
  var ATTRS = ['placeholder', 'title', 'aria-label', 'value'];
  var els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[aria-label]') : [];
  for (var k = 0; k < els.length; k++) {
    var el = els[k];
    for (var a = 0; a < ATTRS.length; a++) {
      var av = el.getAttribute(ATTRS[a]);
      if (!av) continue;
      var t = _translateText(av);
      if (t && t !== av) el.setAttribute(ATTRS[a], t);
    }
  }
}

// Walk the DOM and translate everything we can:
//   1) explicit `data-i18n` keyed elements (precise, JS-driven)
//   2) every text node via the phrase dictionary + regex patterns
window.APEX_APPLY_I18N = function (root) {
  root = root || document;
  var lang = (window.APEX_LANG && window.APEX_LANG.get && window.APEX_LANG.get()) || 'en';

  // 1. data-i18n keyed translations
  root.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var v = T(key);
    if (v && el.textContent !== v) el.textContent = v;
  });
  root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    var map = el.getAttribute('data-i18n-attr');
    map.split(',').forEach(function (pair) {
      var parts = pair.trim().split(':').map(function (s) { return s.trim(); });
      var attr = parts[0], key = parts[1];
      if (!attr || !key) return;
      var v = T(key);
      if (v && el.getAttribute(attr) !== v) el.setAttribute(attr, v);
    });
  });

  // 2. Phrase-dict translation of every other text node + attribute
  _translateAllTextNodes(root.body || root, lang);
};
