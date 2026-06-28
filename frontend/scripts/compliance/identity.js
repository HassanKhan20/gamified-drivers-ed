// In-lesson identity challenge. Hits /api/compliance/identity/next on chapter
// entry; if a challenge comes back, renders a modal with a 90-second timer.
import { loadComplianceConfig } from './config.js';
import { pick } from './lang.js';

export async function maybeChallenge(lessonId) {
  if (!lessonId) return;
  let r;
  try {
    r = await fetch(`/api/compliance/identity/next?lesson_id=${encodeURIComponent(lessonId)}`, {
      credentials: 'include',
    });
  } catch (_) { return; }
  if (!r.ok) return;
  const data = await r.json();
  if (!data) return;
  await renderChallenge(data, lessonId);
}

function renderChallenge(challenge, lessonId) {
  return new Promise(async (resolve) => {
    const cfg = await loadComplianceConfig();
    const secs = challenge.response_seconds || cfg.identity_response_seconds || 90;

    const overlay = document.createElement('div');
    overlay.id = 'apex-identity-modal';
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(15,19,28,0.85); z-index: 99999;
      display: flex; align-items: center; justify-content: center; font-family: inherit;
    `;
    overlay.innerHTML = `
      <div style="background:#fbfaf6;border-radius:14px;padding:28px;max-width:480px;width:90%;
                   box-shadow:0 24px 80px rgba(0,0,0,.45);">
        <h2 style="margin:0 0 8px;">${pick('Identity check', 'Verificación de identidad')}</h2>
        <p style="margin:0 0 16px;color:#5d6776;">${pick('Texas rule 16 TAC §84.501. You have', 'Regla de Texas 16 TAC §84.501. Tienes')} <span id="cd">${secs}</span>s.</p>
        <p style="font-size:18px;font-weight:600;margin:0 0 12px;">${challenge.prompt}</p>
        <input id="ans" type="text" autofocus autocomplete="off"
               style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <p id="err" style="color:#b91c1c;min-height:1.2em;margin:8px 0 0;"></p>
        <button id="submit" style="margin-top:12px;padding:10px 18px;background:#0e7c5d;color:white;
                                    border:none;border-radius:8px;font-weight:600;cursor:pointer;">${pick('Submit', 'Enviar')}</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const cdEl = overlay.querySelector('#cd');
    const ansEl = overlay.querySelector('#ans');
    const errEl = overlay.querySelector('#err');
    const submitBtn = overlay.querySelector('#submit');

    const start = Date.now();
    const timer = setInterval(() => {
      const rem = Math.max(0, secs - Math.floor((Date.now() - start) / 1000));
      cdEl.textContent = rem;
      if (rem <= 0) {
        clearInterval(timer);
        submit(true);
      }
    }, 250);

    async function submit(timedOut) {
      submitBtn.disabled = true;
      const response_ms = Date.now() - start;
      try {
        const r = await fetch('/api/compliance/identity/check', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            challenge_id: challenge.challenge_id,
            answer: ansEl.value || ' ',
            response_ms,
          }),
        });
        const body = await r.json();
        if (body.lockout_opened) {
          location.href = '/lockout.html';
          return;
        }
        if (!body.correct) {
          errEl.textContent = timedOut
            ? pick('Time up. Recorded as incorrect.', 'Se acabó el tiempo. Registrado como incorrecto.')
            : pick('Not a match. Recorded.', 'No coincide. Registrado.');
          setTimeout(() => { overlay.remove(); resolve(false); }, 1500);
        } else {
          overlay.remove();
          resolve(true);
        }
      } catch (_) {
        overlay.remove();
        resolve(null);
      } finally {
        clearInterval(timer);
      }
    }

    submitBtn.addEventListener('click', () => submit(false));
    ansEl.addEventListener('keydown', e => { if (e.key === 'Enter') submit(false); });
  });
}
