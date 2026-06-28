// Operating-hours soft-enforce per 16 TAC §84.600 (5 a.m.–11 p.m. local).
// We show a banner; we do NOT block. Outside-hours session start logs an audit event.
import { loadComplianceConfig } from './config.js';
import { pick } from './lang.js';

export async function checkHours() {
  let cfg;
  try { cfg = await loadComplianceConfig(); } catch (_) { return; }
  const start = cfg.operating_hours_local?.start_hour ?? 5;
  const end = cfg.operating_hours_local?.end_hour ?? 23;
  const h = new Date().getHours();
  if (h >= start && h < end) return;

  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; background: #b45309; color: white;
    padding: 8px 16px; font-size: 14px; z-index: 9999; text-align: center;
  `;
  const s = String(start).padStart(2, '0'), e = String(end).padStart(2, '0');
  bar.textContent = pick(
    `Texas rule 16 TAC §84.600 limits instruction to ${s}:00–${e}:00 local time. Time spent now may not count toward your course requirement.`,
    `La regla de Texas 16 TAC §84.600 limita la instrucción de ${s}:00 a ${e}:00 hora local. El tiempo que pases ahora podría no contar para tu requisito del curso.`
  );
  document.body.appendChild(bar);

  try {
    await fetch('/api/compliance/timer/event', {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'outside_hours_session_started',
        lesson_id: null,
        payload: { local_hour: h },
      }),
    });
  } catch (_) { /* best effort */ }
}
