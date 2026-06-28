// Test: the loop player must render its OWN chrome (kicker labels, nav buttons,
// hints) in the language passed to play({lang}), not hardcoded English.
// Uses a minimal DOM shim that memoizes child stubs per selector so we can read
// back what the player wrote.

function fakeEl() {
  const el = {
    _q: {}, textContent: '', innerHTML: '', disabled: false, title: '',
    style: {}, dataset: {}, className: '',
    addEventListener() {}, appendChild() {}, scrollIntoView() {}, setAttribute() {}, getAttribute() { return null; },
    set onclick(v) {}, get onclick() { return null; },
    querySelector(sel) { return this._q[sel] || (this._q[sel] = fakeEl()); },
    querySelectorAll() { return []; },
  };
  return el;
}
global.document = { getElementById: () => fakeEl(), createElement: () => fakeEl(), head: { appendChild() {} } };
global.window = {};
require('../frontend/scripts/curriculum.js');
require('../frontend/scripts/loop-player.js');
const C = global.window.APEX_CURRICULUM;
const LP = global.window.APEX_LOOP;

let pass = 0, fail = 0;
function assert(label, cond) { cond ? pass++ : fail++; console.log((cond ? '  PASS  ' : '  FAIL  ') + label); }

// Reading chapter in Spanish — first beat is a teach beat, kicker should be Spanish.
const reading = C.byId('3.3');
let mount = fakeEl();
LP.play(reading, mount, { lang: 'es', onFinish() {}, onAttempt() {} });
const kicker = mount.querySelector('#lpKicker').textContent;
const nextBtn = mount.querySelector('#lpNext').textContent;
assert("ES reading kicker is not English 'LEARN' (got: '" + kicker + "')", !/LEARN/.test(kicker) && kicker.length > 0);
assert("ES nav button is not English 'Continue' (got: '" + nextBtn + "')", !/Continue/.test(nextBtn));

// English chapter — kicker SHOULD be English.
mount = fakeEl();
LP.play(reading, mount, { lang: 'en', onFinish() {}, onAttempt() {} });
const kickerEn = mount.querySelector('#lpKicker').textContent;
assert("EN reading kicker contains 'LEARN' (got: '" + kickerEn + "')", /LEARN/.test(kickerEn));

// Checkpoint in Spanish — examIntro kicker should be Spanish.
const cp = C.byId('1.5');
mount = fakeEl();
LP.play(cp, mount, { lang: 'es', onFinish() {}, onAttempt() {} });
const cpKicker = mount.querySelector('#lpKicker').textContent;
assert("ES checkpoint kicker is not English 'CHECKPOINT' (got: '" + cpKicker + "')", !/CHECKPOINT/.test(cpKicker) && cpKicker.length > 0);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
