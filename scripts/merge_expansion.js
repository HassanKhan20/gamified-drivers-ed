// Merge expanded-content batches into curriculum.js.
// Each batch JSON is keyed by chapter id and contains ONLY the fields to
// replace/add (body, keyPoints, quiz, and optionally worked, miniScenario).
// We deep-merge into the matching chapter, preserving id/title/minutes/type,
// then regenerate curriculum.js (clean JSON + the existing helper IIFE).
//
// Run: node scripts/merge_expansion.js

const fs = require('fs');
const path = require('path');
const SCRIPTS = path.join(__dirname, '..', 'frontend', 'scripts');
const CUR = path.join(SCRIPTS, 'curriculum.js');

// 1. Load current curriculum
global.window = {};
require(CUR);
const C = global.window.APEX_CURRICULUM;

// 2. Load batches
const exp = {};
let batchCount = 0;
for (let i = 1; i <= 8; i++) {
  const f = path.join(SCRIPTS, `_exp_batch_${i}.json`);
  if (!fs.existsSync(f)) { console.log(`(batch ${i} not present yet — skipping)`); continue; }
  const obj = JSON.parse(fs.readFileSync(f, 'utf8'));
  Object.assign(exp, obj);
  batchCount++;
}
if (batchCount === 0) { console.error('No batches found. Aborting.'); process.exit(1); }

// 3. Merge into chapters
let merged = 0;
const expandedIds = new Set(Object.keys(exp));
C.modules.forEach(m => {
  m.chapters.forEach(ch => {
    if (exp[ch.id]) {
      const e = exp[ch.id];
      if (e.body) ch.body = e.body;
      if (e.keyPoints) ch.keyPoints = e.keyPoints;
      if (e.quiz) ch.quiz = e.quiz;
      if (e.worked) ch.worked = e.worked;
      if (e.miniScenario) ch.miniScenario = e.miniScenario;
      merged++;
      expandedIds.delete(ch.id);
    }
  });
});
if (expandedIds.size) console.log('WARNING: expansion ids not found in curriculum:', [...expandedIds].join(', '));

// 4. Regenerate curriculum.js (data + helper IIFE). Strip the computed helper
//    fields off the root before serializing.
const root = { state: C.state, audience: C.audience, totalHours: C.totalHours, modules: C.modules };
// modules' chapters may have picked up nothing extra; serialize as-is.
const HELPER = `

// Helpers
(function () {
  const c = window.APEX_CURRICULUM;
  c.allChapters = c.modules.flatMap(m => m.chapters.map(ch => Object.assign({ moduleId: m.id, moduleNum: m.num, moduleTitle: m.title }, ch)));
  c.totalMinutes = c.allChapters.reduce((s, ch) => s + (ch.minutes || 0), 0);
  c.byId = id => c.allChapters.find(ch => ch.id === id) || null;
  c.moduleOf = id => c.modules.find(m => m.chapters.some(ch => ch.id === id));
  c.nextChapter = id => {
    const i = c.allChapters.findIndex(ch => ch.id === id);
    return i >= 0 && i < c.allChapters.length - 1 ? c.allChapters[i + 1] : null;
  };
  c.prevChapter = id => {
    const i = c.allChapters.findIndex(ch => ch.id === id);
    return i > 0 ? c.allChapters[i - 1] : null;
  };
  c.isUnlocked = (id, completedList) => {
    completedList = completedList || [];
    const idx = c.allChapters.findIndex(ch => ch.id === id);
    if (idx <= 0) return true;
    return completedList.includes(c.allChapters[idx - 1].id);
  };
})();
`;

const header = `// APEX — TX Teen Driver Education curriculum (full authored content).
// Expanded for interactive loop-player delivery (see docs/superpowers/specs/2026-05-28-...).
// Schema: chapter.type = 'reading' | 'scenario' | 'checkpoint'
//   reading   -> body[], keyPoints[], quiz[], optional worked{}, optional miniScenario{}
//   scenario  -> scene{}, options[], correct, consequences{}, rule{}, quiz[], optional body[]
//   checkpoint-> exam[]
window.APEX_CURRICULUM = `;

fs.writeFileSync(CUR, header + JSON.stringify(root, null, 2) + ';' + HELPER, 'utf8');
console.log(`Merged ${merged} expanded chapters from ${batchCount} batch(es) into curriculum.js`);
