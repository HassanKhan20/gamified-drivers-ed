// APEX — unified journey.
// One serpentine path from "Welcome" to "DMV Permit Test." Every node maps to one
// thing the student does: a chapter, a scenario, a game, a hazard drill, or a drive.
//
// Each module from the curriculum gets its chapters interleaved with practice
// nodes (games / hazards / drives) and capped with a "boss" drive scenario so it
// feels like clearing a level.

(function () {
  const C = window.APEX_CURRICULUM;
  if (!C) { console.warn('curriculum.js must load before journey.js'); return; }

  // Practice nodes that fit naturally inside specific modules.
  // Module M1: Pedestrian/Right-of-way kicks in early.
  // Module M2: Driving Tasks → sign match + first parking practice.
  // Module M5: Sharing the road → right-of-way game.
  // Module M6: Hazardous → daily hazard drill.
  // After each module a drive "boss" is inserted.
  const PRACTICE_AFTER_MODULE = {
    'M1': [
      { type: 'shorts', id: 'M1-shorts',  label: '3 Shorts · M1 highlights',     route: 'shorts.html', count: 3 },
      { type: 'drive',  id: 'parking',    label: 'Parking lot warm-up',          route: 'drive.html?scenario=parking' },
    ],
    'M2': [
      { type: 'game',   id: 'signs',      label: 'Sign Match · 60s',             route: 'game-signs.html' },
      { type: 'shorts', id: 'M2-shorts',  label: '3 Shorts · M2 highlights',     route: 'shorts.html', count: 3 },
    ],
    'M3': [
      { type: 'drive',  id: 'checkpoint', label: 'Checkpoint cruise',            route: 'drive.html?scenario=checkpoint' },
    ],
    'M4': [
      { type: 'game',   id: 'rightofway', label: 'Right-of-Way Sequencer',       route: 'game-rightofway.html' },
      { type: 'shorts', id: 'M4-shorts',  label: '3 Shorts · intersections',     route: 'shorts.html', count: 3 },
    ],
    'M5': [
      { type: 'hazard', id: 'daily',      label: 'Hazard Perception Drill',      route: 'hazard.html' },
    ],
    'M6': [
      { type: 'drive',  id: 'checkpoint', label: 'Wet-weather drill',            route: 'drive.html?scenario=checkpoint' },
      { type: 'shorts', id: 'M6-shorts',  label: '3 Shorts · weather + night',   route: 'shorts.html', count: 3 },
    ],
    'M7': [],
    'M8': [],
    'M9': [
      { type: 'drive',  id: 'checkpoint', label: 'TX-law refresher run',         route: 'drive.html?scenario=checkpoint' },
      { type: 'shorts', id: 'M9-shorts',  label: '3 Shorts · TX laws',           route: 'shorts.html', count: 3 },
    ],
    'M10':[
      { type: 'dmv',    id: 'dmv-day',    label: 'DMV Day · simulated road test', route: 'dmv-test.html' },
    ],
  };

  function chapterToNode(ch) {
    const moduleNum = ch.moduleNum || 1;
    return {
      type: ch.type === 'scenario' ? 'scenario' : ch.type === 'checkpoint' ? 'checkpoint' : 'reading',
      id: 'lesson:' + ch.id,
      ref: ch.id,
      label: ch.title,
      moduleId: ch.moduleId,
      moduleNum,
      moduleTitle: ch.moduleTitle,
      route: 'lesson.html?id=' + ch.id,
      minutes: ch.minutes,
    };
  }

  // Build the journey: walk modules, push every chapter, then practice nodes for that module.
  const nodes = [];
  C.modules.forEach((m, mi) => {
    m.chapters.forEach(ch => nodes.push(chapterToNode(Object.assign({}, ch, {
      moduleId: m.id, moduleNum: m.num, moduleTitle: m.title,
    }))));
    (PRACTICE_AFTER_MODULE[m.id] || []).forEach((p, pi) => {
      nodes.push(Object.assign({
        moduleId: m.id, moduleNum: m.num, moduleTitle: m.title,
      }, p, { id: p.type + ':' + m.id + ':' + p.id + ':' + pi }));
    });
  });

  // Final node — the graduation
  nodes.push({
    type: 'final', id: 'final:dmv',
    label: 'DMV Permit Test', route: 'lesson.html?id=10.3',
    moduleId: 'FINAL', moduleNum: 11, moduleTitle: 'Graduation',
  });

  // Compute first-unlocked + completion based on user state.
  function isNodeDone(node, state) {
    state = state || {};
    if (node.type === 'final') {
      const c = state.completedLessons || [];
      return c.includes('10.3');
    }
    if (node.type === 'reading' || node.type === 'scenario' || node.type === 'checkpoint') {
      return (state.completedLessons || []).includes(node.ref);
    }
    if (node.type === 'game') {
      return ((state.gameBest || {})[node.ref] || 0) > 0;
    }
    if (node.type === 'drive') {
      return ((state.driveScenariosCompleted || []).includes(node.ref));
    }
    if (node.type === 'hazard') {
      return (state.hazardsCompleted || 0) > 0;
    }
    if (node.type === 'shorts') {
      const watched = (state.shortsWatched && state.shortsWatched.length) || 0;
      return watched >= (node.count || 3);
    }
    if (node.type === 'dmv') {
      // Done if user has logged any drive scenario starting with 'dmv-'
      return (state.driveScenariosCompleted || []).some(s => String(s).startsWith('dmv-'));
    }
    return false;
  }

  // The first not-done node in order — "what's next."
  function currentNode(state) {
    for (const n of nodes) if (!isNodeDone(n, state)) return n;
    return null;
  }

  // Group nodes by module for section dividers.
  const groups = [];
  let lastModule = null;
  nodes.forEach((n, i) => {
    if (n.moduleId !== lastModule) {
      groups.push({ moduleId: n.moduleId, moduleNum: n.moduleNum, moduleTitle: n.moduleTitle, startIndex: i, nodes: [] });
      lastModule = n.moduleId;
    }
    groups[groups.length - 1].nodes.push(n);
  });

  window.APEX_JOURNEY = {
    nodes,
    groups,
    isNodeDone,
    currentNode,
    indexOf: (id) => nodes.findIndex(n => n.id === id),
    typeMeta: {
      reading:    { icon: 'book',   label: 'Lesson' },
      scenario:   { icon: 'play',   label: 'Scenario' },
      checkpoint: { icon: 'flag',   label: 'Checkpoint' },
      game:       { icon: 'puzzle', label: 'Game' },
      drive:      { icon: 'car',    label: 'Drive' },
      hazard:     { icon: 'alert',  label: 'Hazard' },
      shorts:     { icon: 'phone',  label: 'Shorts' },
      dmv:        { icon: 'badge',  label: 'DMV Day' },
      final:      { icon: 'trophy', label: 'Final' },
    },
  };
})();
