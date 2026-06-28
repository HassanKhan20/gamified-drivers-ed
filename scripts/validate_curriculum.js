// Exhaustive curriculum validator.
// Loads curriculum.js, checks EVERY chapter and EVERY field against the schema
// for its type, and validates every quiz/exam answer index is in range.
//
// Run: node scripts/validate_curriculum.js
// Exit code 0 = clean, 1 = problems found.

global.window = {};
require('../frontend/scripts/curriculum.js');
const C = global.window.APEX_CURRICULUM;

let errors = [];
let warnings = [];
let stats = { modules: 0, chapters: 0, reading: 0, scenario: 0, checkpoint: 0, quizQuestions: 0, examQuestions: 0 };

function err(loc, msg) { errors.push(`✗ [${loc}] ${msg}`); }
function warn(loc, msg) { warnings.push(`⚠ [${loc}] ${msg}`); }

function checkQuiz(loc, quiz) {
  if (!Array.isArray(quiz)) { err(loc, 'quiz is not an array'); return; }
  if (quiz.length < 1) { warn(loc, 'quiz has 0 questions'); }
  quiz.forEach((q, i) => {
    const qloc = `${loc} quiz[${i}]`;
    if (!q.q || typeof q.q !== 'string') err(qloc, 'missing/invalid question text');
    if (!Array.isArray(q.options) || q.options.length < 2) err(qloc, `needs >=2 options, has ${q.options ? q.options.length : 0}`);
    if (typeof q.correct !== 'number') err(qloc, `correct is not a number (${q.correct})`);
    else if (q.options && (q.correct < 0 || q.correct >= q.options.length)) err(qloc, `correct index ${q.correct} out of range [0,${q.options.length - 1}]`);
    if (q.options) q.options.forEach((o, oi) => { if (typeof o !== 'string' || !o.trim()) err(qloc, `option[${oi}] empty/invalid`); });
    if (q.why !== undefined && (typeof q.why !== 'string' || !q.why.trim())) warn(qloc, 'why present but empty');
    stats.quizQuestions++;
  });
}

function checkExam(loc, exam) {
  if (!Array.isArray(exam)) { err(loc, 'exam is not an array'); return; }
  if (exam.length < 4) warn(loc, `checkpoint exam has only ${exam.length} questions (expect >=6 for a checkpoint)`);
  exam.forEach((q, i) => {
    const qloc = `${loc} exam[${i}]`;
    if (!q.q || typeof q.q !== 'string') err(qloc, 'missing/invalid question text');
    if (!Array.isArray(q.options) || q.options.length < 2) err(qloc, `needs >=2 options, has ${q.options ? q.options.length : 0}`);
    if (typeof q.correct !== 'number') err(qloc, `correct is not a number (${q.correct})`);
    else if (q.options && (q.correct < 0 || q.correct >= q.options.length)) err(qloc, `correct index ${q.correct} out of range [0,${q.options.length - 1}]`);
    stats.examQuestions++;
  });
}

function checkReading(loc, ch) {
  if (!Array.isArray(ch.body) || ch.body.length < 1) err(loc, 'reading missing body[]');
  else ch.body.forEach((p, i) => { if (typeof p !== 'string' || !p.trim()) err(loc, `body[${i}] empty/invalid`); });
  if (!Array.isArray(ch.keyPoints) || ch.keyPoints.length < 1) warn(loc, 'reading missing keyPoints[]');
  checkQuiz(loc, ch.quiz);
}

function checkScenario(loc, ch) {
  if (!ch.scene || !ch.scene.description) err(loc, 'scenario missing scene.description');
  if (!Array.isArray(ch.options) || ch.options.length < 2) err(loc, 'scenario needs >=2 options');
  const letters = (ch.options || []).map(o => o.letter);
  ch.options && ch.options.forEach((o, i) => {
    if (!o.letter) err(loc, `option[${i}] missing letter`);
    if (!o.text || !o.text.trim()) err(loc, `option[${i}] missing text`);
  });
  if (!ch.correct) err(loc, 'scenario missing correct');
  else if (!letters.includes(ch.correct)) err(loc, `correct '${ch.correct}' not among option letters [${letters.join(',')}]`);
  if (!ch.consequences) err(loc, 'scenario missing consequences');
  else {
    letters.forEach(l => {
      if (!ch.consequences[l]) err(loc, `consequences missing entry for option '${l}'`);
      else {
        if (typeof ch.consequences[l].good !== 'boolean') warn(loc, `consequences[${l}].good not boolean`);
        if (!ch.consequences[l].body) err(loc, `consequences[${l}] missing body`);
      }
    });
    // the 'correct' option's consequence should be good:true
    if (ch.correct && ch.consequences[ch.correct] && ch.consequences[ch.correct].good !== true)
      err(loc, `consequences[${ch.correct}] (the correct answer) is not marked good:true`);
  }
  if (!ch.rule || !ch.rule.body) warn(loc, 'scenario missing rule.body');
  checkQuiz(loc, ch.quiz);
}

// ---- main loop ----
if (!C || !Array.isArray(C.modules)) { console.error('FATAL: APEX_CURRICULUM.modules missing'); process.exit(1); }

const seenIds = new Set();
C.modules.forEach(m => {
  stats.modules++;
  const mloc = `M${m.num}`;
  if (!m.id) err(mloc, 'module missing id');
  if (!m.title) err(mloc, 'module missing title');
  if (!Array.isArray(m.chapters) || m.chapters.length < 1) { err(mloc, 'module has no chapters'); return; }

  m.chapters.forEach(ch => {
    stats.chapters++;
    const loc = ch.id || `${mloc}?`;
    if (!ch.id) err(loc, 'chapter missing id');
    if (seenIds.has(ch.id)) err(loc, 'DUPLICATE chapter id');
    seenIds.add(ch.id);
    if (!ch.title || !ch.title.trim()) err(loc, 'chapter missing title');
    if (typeof ch.minutes !== 'number' || ch.minutes <= 0) err(loc, `invalid minutes (${ch.minutes})`);
    if (!['reading', 'scenario', 'checkpoint'].includes(ch.type)) { err(loc, `unknown type '${ch.type}'`); return; }

    if (ch.type === 'reading') { stats.reading++; checkReading(loc, ch); }
    else if (ch.type === 'scenario') { stats.scenario++; checkScenario(loc, ch); }
    else if (ch.type === 'checkpoint') { stats.checkpoint++; checkExam(loc, ch.exam); }
  });
});

// ---- report ----
console.log('=== APEX Curriculum Validation ===\n');
console.log(`Modules:    ${stats.modules}`);
console.log(`Chapters:   ${stats.chapters} (reading ${stats.reading}, scenario ${stats.scenario}, checkpoint ${stats.checkpoint})`);
console.log(`Quiz Qs:    ${stats.quizQuestions}`);
console.log(`Exam Qs:    ${stats.examQuestions}`);
console.log(`Total Qs:   ${stats.quizQuestions + stats.examQuestions}`);
console.log(`Total min:  ${C.totalMinutes}\n`);

if (warnings.length) { console.log(`--- ${warnings.length} WARNING(S) ---`); warnings.forEach(w => console.log(w)); console.log(''); }
if (errors.length) { console.log(`--- ${errors.length} ERROR(S) ---`); errors.forEach(e => console.log(e)); console.log('\nRESULT: FAIL'); process.exit(1); }
console.log('RESULT: PASS — every chapter and every question is structurally valid.');
process.exit(0);
