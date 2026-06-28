// Active-time accumulator. Pauses on tab-blur, document-hidden, or no input >Ns.
// Posts /api/compliance/timer/tick every TICK_POST_INTERVAL_MS.
// One instance per page; start with `startTimer(lessonId)`.
import { loadComplianceConfig } from './config.js';

const TICK_POST_INTERVAL_MS = 30_000;
const TICK_LOCAL_INTERVAL_MS = 1_000;

let _state = null;

export async function startTimer(lessonId) {
  if (!lessonId) throw new Error('startTimer needs lessonId');
  const cfg = await loadComplianceConfig();
  if (_state) stopTimer();
  _state = {
    lessonId,
    idleThresholdMs: (cfg.timer_idle_pause_seconds || 60) * 1000,
    activeSeconds: 0,
    pendingSeconds: 0,
    lastInputAt: Date.now(),
    paused: false,
    tickIv: null,
    postIv: null,
  };
  const onInput = () => { _state.lastInputAt = Date.now(); maybeResume(); };
  const inputEvents = ['keydown', 'pointerdown', 'pointermove', 'wheel', 'scroll'];
  inputEvents.forEach(ev => window.addEventListener(ev, onInput, { passive: true }));
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('blur', onBlur);
  window.addEventListener('focus', onFocus);
  window.addEventListener('beforeunload', flush);

  _state.tickIv = setInterval(localTick, TICK_LOCAL_INTERVAL_MS);
  _state.postIv = setInterval(flush, TICK_POST_INTERVAL_MS);
  _state.cleanup = () => {
    inputEvents.forEach(ev => window.removeEventListener(ev, onInput));
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('blur', onBlur);
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('beforeunload', flush);
  };
}

export function stopTimer() {
  if (!_state) return;
  flush();
  clearInterval(_state.tickIv);
  clearInterval(_state.postIv);
  _state.cleanup?.();
  _state = null;
}

function localTick() {
  if (!_state) return;
  if (document.hidden || _state.paused) return;
  if (Date.now() - _state.lastInputAt > _state.idleThresholdMs) {
    pause('idle');
    return;
  }
  _state.activeSeconds += 1;
  _state.pendingSeconds += 1;
}

function onVisibilityChange() {
  postEvent('tab_visibility_change', { hidden: document.hidden });
  if (document.hidden) pause('hidden');
  else maybeResume();
}

function onBlur() { pause('blur'); }
function onFocus() { maybeResume(); }

function pause(reason) {
  if (!_state || _state.paused) return;
  _state.paused = true;
  postEvent('time_pause', { reason });
}

function maybeResume() {
  if (!_state || !_state.paused) return;
  if (document.hidden) return;
  if (Date.now() - _state.lastInputAt > _state.idleThresholdMs) return;
  _state.paused = false;
  postEvent('time_resume', {});
}

async function flush() {
  if (!_state) return;
  const seconds = _state.pendingSeconds;
  if (seconds <= 0) return;
  _state.pendingSeconds = 0;
  try {
    await fetch('/api/compliance/timer/tick', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lesson_id: _state.lessonId, seconds, signals: [] }),
    });
  } catch (_) {
    // Re-credit pending seconds for retry on next interval
    _state.pendingSeconds += seconds;
  }
}

async function postEvent(event_type, payload) {
  try {
    await fetch('/api/compliance/timer/event', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, lesson_id: _state?.lessonId, payload }),
    });
  } catch (_) { /* best effort */ }
}
