// Wraps a <video> element. When the clip's duration > 180s, listens for
// 'ended' and presents the comprehension question. Wrong -> replay; second
// wrong -> server returns lockout flag -> redirect to /lockout.html.
import { loadComplianceConfig } from './config.js';
import { pick } from './lang.js';

export async function wrapClip(videoEl, clipId) {
  const cfg = await loadComplianceConfig();
  const minSec = cfg.multimedia_gate_min_seconds || 180;

  if (videoEl.readyState < 1) {
    await new Promise(res => videoEl.addEventListener('loadedmetadata', res, { once: true }));
  }
  if ((videoEl.duration || 0) <= minSec) return;

  videoEl.addEventListener('ended', async () => {
    const r = await fetch(`/api/compliance/clips/${encodeURIComponent(clipId)}`, { credentials: 'include' });
    if (!r.ok) return;
    const data = await r.json();
    await presentQuestion(videoEl, clipId, data.question);
  });
}

async function presentQuestion(videoEl, clipId, q) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(15,19,28,0.85); z-index: 99999;
      display: flex; align-items: center; justify-content: center;
    `;
    const optsHtml = q.options.map((o, i) => `
      <button data-idx="${i}" class="opt-btn" style="display:block;width:100%;text-align:left;
        padding:10px;margin:6px 0;border:1px solid #ccc;border-radius:6px;background:white;cursor:pointer;">${o}</button>
    `).join('');
    overlay.innerHTML = `
      <div style="background:#fbfaf6;border-radius:14px;padding:28px;max-width:540px;width:90%;">
        <h3 style="margin:0 0 16px;">${pick('Quick check', 'Repaso rápido')}</h3>
        <p style="font-size:17px;margin:0 0 16px;">${q.prompt}</p>
        <div id="opts">${optsHtml}</div>
        <p id="msg" style="margin-top:12px;min-height:1.2em;"></p>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const r = await fetch(`/api/compliance/clips/${encodeURIComponent(clipId)}/view`, {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ finished: true, question_id: q.id, answer_index: idx }),
        });
        const body = await r.json();
        if (body.lockout_opened) { location.href = '/lockout.html'; return; }
        if (body.correct) {
          overlay.remove(); resolve(true); return;
        }
        if (body.must_replay) {
          overlay.querySelector('#msg').textContent = pick('Not quite - replaying the clip.', 'Casi - repitiendo el video.');
          setTimeout(() => {
            overlay.remove();
            videoEl.currentTime = 0;
            videoEl.play();
            resolve(false);
          }, 1500);
        }
      });
    });
  });
}
