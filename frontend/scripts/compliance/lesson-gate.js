// Compliance gate for lesson pages — renders a progress bar + countdown
// based on /api/compliance/timer/status, and disables the chapter's "next /
// finish" buttons until the per-chapter minute floor (16 TAC §84.501) is met.
//
// Usage: import + call attachLessonGate(lessonId) on lesson/topic/drive pages
// after the page has rendered the buttons it wants to gate.

import { pick } from './lang.js';

const POLL_INTERVAL_MS = 5_000;   // re-fetch server status every 5s
const TICK_INTERVAL_MS = 1_000;   // local UI countdown every 1s
const GATED_BUTTON_SELECTORS = [
  'button[onclick="finishLesson()"]',
  'button[onclick*="finishLesson"]',
];

let _state = null;

export async function attachLessonGate(lessonId) {
  if (!lessonId) return;
  if (_state) detachLessonGate();
  console.log('[APEX gate] attaching for lesson', lessonId);
  _state = {
    lessonId,
    required: 0,
    accumulated: 0,    // last server-known value
    localActive: 0,    // seconds since last server sync (incremented locally)
    met: false,
    pollIv: null,
    tickIv: null,
    bar: null,
    lastInputAt: Date.now(),
  };

  // 1. Render the bar
  _state.bar = renderBar();
  console.log('[APEX gate] bar rendered, parent:', _state.bar.parentElement?.tagName);

  // 2. Initial server sync
  await syncStatus();
  console.log('[APEX gate] synced, required=', _state.required, 'accumulated=', _state.accumulated);

  // 3. Subsequent server polls (catches missed ticks, multi-tab consistency)
  _state.pollIv = setInterval(syncStatus, POLL_INTERVAL_MS);

  // 4. Local countdown
  _state.tickIv = setInterval(localTick, TICK_INTERVAL_MS);

  // Watch input for the same activity-pause rule the timer uses
  ['keydown', 'pointerdown', 'pointermove', 'wheel', 'scroll'].forEach(ev =>
    window.addEventListener(ev, onInput, { passive: true })
  );
  document.addEventListener('visibilitychange', () => paint());
}

export function detachLessonGate() {
  if (!_state) return;
  clearInterval(_state.pollIv);
  clearInterval(_state.tickIv);
  _state.bar?.remove();
  ['keydown', 'pointerdown', 'pointermove', 'wheel', 'scroll'].forEach(ev =>
    window.removeEventListener(ev, onInput)
  );
  _state = null;
}

function onInput() { if (_state) _state.lastInputAt = Date.now(); }

async function syncStatus() {
  if (!_state) return;
  try {
    const r = await fetch(`/api/compliance/timer/status?lesson_id=${encodeURIComponent(_state.lessonId)}`, {
      credentials: 'include',
    });
    if (!r.ok) return;
    const data = await r.json();
    _state.required = data.required_seconds || 0;
    _state.accumulated = data.accumulated_seconds || 0;
    _state.localActive = 0;        // server has now absorbed prior local ticks
    _state.met = !!data.met;
    paint();
  } catch (_) { /* ignore — retry next poll */ }
}

function localTick() {
  if (!_state) return;
  if (document.hidden) return;
  if (Date.now() - _state.lastInputAt > 60_000) return;  // mirror idle pause
  _state.localActive += 1;
  paint();
}

function effectiveAccumulated() {
  return Math.min(_state.required || 0, _state.accumulated + _state.localActive);
}

function effectiveMet() {
  if (_state.required <= 0) return true;
  return effectiveAccumulated() >= _state.required;
}

function paint() {
  if (!_state || !_state.bar) return;
  const met = effectiveMet();
  if (_state.required <= 0) {
    _state.bar.style.display = 'none';
    document.body.style.paddingTop = '';
    setButtonsEnabled(true);
    return;
  }
  _state.bar.style.display = '';
  document.body.style.paddingTop = (_state.bar.offsetHeight + 8) + 'px';
  const acc = effectiveAccumulated();
  const pct = Math.min(100, Math.round((acc / _state.required) * 100));
  const remaining = Math.max(0, _state.required - acc);

  _state.bar.querySelector('.lg-fill').style.width = pct + '%';
  _state.bar.querySelector('.lg-acc').textContent = formatMMSS(acc);
  _state.bar.querySelector('.lg-total').textContent = formatMMSS(_state.required);
  const msg = _state.bar.querySelector('.lg-msg');
  if (met) {
    msg.textContent = pick('✓ Texas minimum time met — you can continue.', '✓ Tiempo mínimo de Texas cumplido — puedes continuar.');
    msg.style.color = '#0a5944';
    _state.bar.style.background = '#ebf7f1';
    _state.bar.style.borderBottomColor = '#0e7c5d';
  } else {
    msg.textContent = pick(
      `Texas 16 TAC §84.501 minimum: continue in ${formatMMSS(remaining)}.`,
      `Mínimo de Texas 16 TAC §84.501: continúa en ${formatMMSS(remaining)}.`
    );
    msg.style.color = '#8a6d36';
    _state.bar.style.background = '#fef3c7';
    _state.bar.style.borderBottomColor = '#b45309';
  }
  setButtonsEnabled(met);
}

function setButtonsEnabled(enabled) {
  const buttons = [];
  GATED_BUTTON_SELECTORS.forEach(sel => {
    document.querySelectorAll(sel).forEach(b => buttons.push(b));
  });
  buttons.forEach(b => {
    if (enabled) {
      b.removeAttribute('disabled');
      b.style.opacity = '';
      b.style.cursor = '';
      b.title = '';
    } else {
      b.setAttribute('disabled', 'disabled');
      b.style.opacity = '0.55';
      b.style.cursor = 'not-allowed';
      b.title = 'Texas rule §84.501 — minimum time not yet met for this chapter.';
    }
  });
}

function renderBar() {
  const bar = document.createElement('div');
  bar.id = 'apex-lesson-gate';
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 9999;
    padding: 14px 20px;
    background: #fef3c7;
    border-bottom: 3px solid #b45309;
    box-shadow: 0 8px 24px -8px rgba(15,17,22,0.25);
    font-family: 'Inter', system-ui, sans-serif;
    color: #15191f;
  `;
  bar.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px; max-width: 880px; margin: 0 auto;">
      <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; color: #b45309;">
        <span style="font-size: 18px;">⏱</span>
        <span>TX §84.501</span>
      </div>
      <div style="flex: 1; min-width: 0;">
        <div class="lg-msg" style="font-size: 12.5px; font-weight: 600; margin-bottom: 5px; color: #8a6d36;">
          ${pick('Loading time tracker…', 'Cargando el medidor de tiempo…')}
        </div>
        <div style="height: 10px; background: rgba(0,0,0,0.10); border-radius: 999px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08);">
          <div class="lg-fill" style="height: 100%; width: 0%; min-width: 4px;
            background: linear-gradient(90deg, #0e7c5d, #14a37e, #2dd4a4);
            transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
            box-shadow: 0 0 8px rgba(14,124,93,0.4);"></div>
        </div>
      </div>
      <div style="font-family: 'Inter', system-ui, sans-serif; font-size: 14px;
                  color: #15191f; font-weight: 700; white-space: nowrap;
                  background: white; padding: 6px 12px; border-radius: 8px;
                  border: 1px solid #e6dfcc;">
        <span class="lg-acc">0:00</span> / <span class="lg-total">0:00</span>
      </div>
    </div>
  `;
  // Pin to document body so it's always visible regardless of parent overflow.
  document.body.appendChild(bar);
  // Push page content down so the fixed bar doesn't cover it.
  document.body.style.paddingTop = (bar.offsetHeight + 8) + 'px';
  return bar;
}

function formatMMSS(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}
