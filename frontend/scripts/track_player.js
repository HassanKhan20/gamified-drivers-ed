// APEX — shared shorts-track player.
//
// Renders a vertical topic list + tap-to-play full-screen shorts modal.
// Used by adult_learn.html, defensive_learn.html, and parent_learn.html
// (parent_learn currently has its own copy; can be migrated later).
//
// Usage:
//   APEX_TRACK_PLAYER.mount({
//     topics: window.APEX_ADULT_TOPICS,   // array of topic objects
//     storageKey: 'apex_adult_done',       // localStorage namespace for completion
//     accentColor: '#14a37e',              // primary CTA color
//   });
//
// Each topic must follow the parent_topics.js shape: { id, title_en, title_es,
// minutes, shorts: [{ title_en, title_es, body_en, body_es, visual }], ack_en, ack_es }

window.APEX_TRACK_PLAYER = (function () {
  function lang() {
    try { const v = localStorage.getItem('apex_lang'); if (v === 'es' || v === 'en') return v; } catch (e) {}
    return 'en';
  }

  function mount({ topics, storageKey, accentColor }) {
    accentColor = accentColor || '#14a37e';
    const lng = lang();
    const T = (en, es) => (lng === 'es' ? es : en);

    let done = {};
    try { done = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (e) {}
    function saveDone() { localStorage.setItem(storageKey, JSON.stringify(done)); }

    // Override CTA accent color via inline style (the per-page CSS sets a default,
    // but if a track wants a different accent it can pass it in).
    document.documentElement.style.setProperty('--track-accent', accentColor);
    const styleOverride = document.createElement('style');
    styleOverride.textContent = `
      .ps-progress .seg.done { background: ${accentColor}; }
      .ps-progress .seg.current::after { background: ${accentColor}; }
      .ps-content .ps-tag { color: ${accentColor}; }
      .ps-content .ps-next { background: ${accentColor}; }
    `;
    document.head.appendChild(styleOverride);

    function renderList() {
      const host = document.getElementById('topicList');
      if (!host) return;
      host.innerHTML = topics.map((t, i) => {
        const isDone = !!done[t.id];
        const title = lng === 'es' ? t.title_es : t.title_en;
        return `
          <div class="topic-card ${isDone ? 'done' : ''}" data-id="${t.id}">
            <div class="num">${isDone ? '✓' : (i + 1)}</div>
            <div>
              <div class="ttl">${title}</div>
              <div class="sub">${t.shorts.length} ${T('shorts', 'shorts')} · ${t.minutes} ${T('min', 'min')}</div>
            </div>
            <div class="cta">${isDone ? T('REPLAY', 'REPETIR') : T('START', 'INICIAR')}</div>
          </div>`;
      }).join('');
      const dc = document.getElementById('doneCount');
      if (dc) dc.textContent = Object.keys(done).length + ' / ' + topics.length + ' ' + T('DONE', 'HECHO');
      host.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', () => openTopic(card.dataset.id));
      });
    }

    let active = { topic: null, idx: 0 };
    function openTopic(id) {
      const topic = topics.find(t => t.id === id);
      if (!topic) return;
      active.topic = topic; active.idx = 0;
      renderShort();
      document.getElementById('psMask').classList.add('show');
    }
    function closeModal() {
      document.getElementById('psMask').classList.remove('show');
      active.topic = null;
    }
    function renderShort() {
      const t = active.topic; if (!t) return;
      const total = t.shorts.length + 1; // +1 for the ack
      const idx = active.idx;
      const segs = [];
      for (let i = 0; i < total; i++) {
        const cls = i < idx ? 'done' : i === idx ? 'current' : '';
        segs.push(`<div class="seg ${cls}"></div>`);
      }
      document.getElementById('psProgress').innerHTML = segs.join('');

      const isAck = idx === t.shorts.length;
      if (isAck) {
        const ack = lng === 'es' ? t.ack_es : t.ack_en;
        document.getElementById('psVisual').className = 'ps-visual';
        document.getElementById('psGlyph').textContent = '✓';
        document.getElementById('psTag').textContent = T('ACKNOWLEDGE', 'CONFIRMAR');
        document.getElementById('psTitle').textContent = T('Got it?', '¿Entendido?');
        document.getElementById('psBody').innerHTML =
          '<label style="display: flex; gap: 10px; align-items: flex-start; cursor: pointer; color: rgba(250,246,236,0.92);">' +
          '<input type="checkbox" id="ackChk" style="margin-top: 4px; flex-shrink: 0;" />' +
          '<span>' + ack + '</span></label>';
        document.getElementById('psNext').textContent = T('Mark complete →', 'Marcar completado →');
      } else {
        const s = t.shorts[idx];
        document.getElementById('psVisual').className = 'ps-visual ' + (s.visual || '');
        document.getElementById('psGlyph').textContent = '';
        document.getElementById('psTag').textContent = T('SHORT', 'SHORT') + ' ' + (idx + 1) + ' / ' + t.shorts.length;
        document.getElementById('psTitle').textContent = lng === 'es' ? s.title_es : s.title_en;
        document.getElementById('psBody').textContent = lng === 'es' ? s.body_es : s.body_en;
        document.getElementById('psNext').textContent = T('Next →', 'Siguiente →');
      }
      document.getElementById('psPrev').disabled = idx === 0;
    }
    document.getElementById('psClose').onclick = closeModal;
    document.getElementById('psMask').addEventListener('click', (e) => {
      if (e.target.id === 'psMask') closeModal();
    });
    document.getElementById('psPrev').onclick = () => {
      if (active.idx > 0) { active.idx -= 1; renderShort(); }
    };
    document.getElementById('psNext').onclick = () => {
      const t = active.topic; if (!t) return;
      const isAckStep = active.idx === t.shorts.length;
      if (isAckStep) {
        const chk = document.getElementById('ackChk');
        if (!chk || !chk.checked) {
          document.getElementById('psBody').style.outline = '2px solid ' + accentColor;
          setTimeout(() => { document.getElementById('psBody').style.outline = ''; }, 700);
          return;
        }
        done[t.id] = true; saveDone(); renderList();
        closeModal();
        return;
      }
      if (active.idx < t.shorts.length) { active.idx += 1; renderShort(); }
    };

    renderList();
  }

  return { mount };
})();
