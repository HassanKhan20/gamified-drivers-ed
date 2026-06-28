// Content-division analysis: for each chapter, report time budget vs actual
// content density, so imbalances (thin chapters with big time floors, or walls
// of text crammed into short floors) surface. This is the "is it divided well?"
// view a structural validator can't give.
global.window = {};
require('../frontend/scripts/curriculum.js');
const C = global.window.APEX_CURRICULUM;

function words(s) { return (s || '').trim().split(/\s+/).filter(Boolean).length; }

function chapterWords(ch) {
  let w = 0;
  if (Array.isArray(ch.body)) ch.body.forEach(p => w += words(p));
  if (ch.scene && ch.scene.description) w += words(ch.scene.description);
  if (Array.isArray(ch.options)) ch.options.forEach(o => w += words(o.text));
  if (ch.consequences) Object.values(ch.consequences).forEach(c => w += words(c.title) + words(c.body));
  if (ch.rule) w += words(ch.rule.body) + (ch.rule.stat ? words(ch.rule.stat.body) : 0);
  return w;
}

console.log('=== Content Division Analysis ===\n');
console.log('id     type        min  bodyPgh  Qs   words   words/min   flag');
console.log('-----  ----------  ---  -------  ---  ------  ---------   ----');

const flags = [];
C.modules.forEach(m => {
  m.chapters.forEach(ch => {
    const w = chapterWords(ch);
    const wpm = (w / ch.minutes).toFixed(1);
    const pgh = Array.isArray(ch.body) ? ch.body.length : (ch.type === 'scenario' ? '(scn)' : '-');
    const qs = (ch.quiz ? ch.quiz.length : 0) + (ch.exam ? ch.exam.length : 0);
    let flag = '';
    // Heuristics: reading/scenario chapters should have enough content for their time.
    // A 15-min reading chapter ~ 350-600 words is reasonable (active learning, not pure reading).
    // Flag thin (a big floor with little content) and dense (a wall crammed into a short floor).
    if (ch.type !== 'checkpoint') {
      if (w / ch.minutes < 8 && ch.minutes >= 40) flag = 'THIN (long floor, little content)';
      else if (w / ch.minutes > 45) flag = 'DENSE (wall of text for the time)';
    }
    if (ch.type === 'checkpoint' && qs < 6) flag = 'few exam Qs';
    if (flag) flags.push(`${ch.id} (${ch.title}): ${flag}`);
    console.log(
      `${ch.id.padEnd(5)}  ${ch.type.padEnd(10)}  ${String(ch.minutes).padStart(3)}  ${String(pgh).padStart(7)}  ${String(qs).padStart(3)}  ${String(w).padStart(6)}  ${String(wpm).padStart(9)}   ${flag}`
    );
  });
  // module subtotal
  const mins = m.chapters.reduce((s, c) => s + c.minutes, 0);
  console.log(`       >>> Module ${m.num} "${m.title}": ${m.chapters.length} chapters, ${mins} min\n`);
});

console.log('\n=== Flags ===');
if (flags.length) flags.forEach(f => console.log('• ' + f));
else console.log('None — division looks balanced by the heuristics.');
