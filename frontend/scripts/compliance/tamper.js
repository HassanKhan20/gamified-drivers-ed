// Background tamper-signal detector. Posts to /api/compliance/timer/event.
// Detects: multi-tab open (via BroadcastChannel echo), devtools-suspect resize,
// paste-into-quiz events, rapid-input bursts.

const CH_NAME = 'apex-compliance';
let _initialized = false;

export function startTamperWatch(lessonId) {
  if (_initialized) return;
  _initialized = true;

  try {
    const ch = new BroadcastChannel(CH_NAME);
    const myId = crypto.randomUUID();
    ch.postMessage({ kind: 'hello', id: myId });
    ch.onmessage = (e) => {
      if (e.data?.kind === 'hello' && e.data.id !== myId) {
        postEvent('tab_multi_detected', { other_id: e.data.id }, lessonId);
      }
    };
  } catch (_) { /* old browser - skip */ }

  let lastWidthGap = window.outerWidth - window.innerWidth;
  window.addEventListener('resize', () => {
    const gap = window.outerWidth - window.innerWidth;
    if (gap > 200 && lastWidthGap <= 200) {
      postEvent('devtools_open_suspected', { gap }, lessonId);
    }
    lastWidthGap = gap;
  });

  document.addEventListener('paste', (e) => {
    const target = e.target;
    if (target && /input|textarea/i.test(target.tagName || '')) {
      postEvent('paste_into_quiz', { tag: target.tagName }, lessonId);
    }
  });

  let inputs = [];
  document.addEventListener('keydown', () => {
    const now = Date.now();
    inputs.push(now);
    inputs = inputs.filter(t => now - t < 3000);
    if (inputs.length > 15) {
      postEvent('rapid_input_burst', { count: inputs.length }, lessonId);
      inputs = [];
    }
  });
}

async function postEvent(event_type, payload, lessonId) {
  try {
    await fetch('/api/compliance/timer/event', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, lesson_id: lessonId || null, payload }),
    });
  } catch (_) { /* best effort */ }
}
