// Tiny language helper for compliance UI. Reads the same persisted language
// the rest of the app uses (localStorage 'apex_lang'), independent of i18n.js
// load order. `pick(en, es)` returns the right string for the current language.
export function currentLang() {
  try {
    const v = localStorage.getItem('apex_lang');
    if (v === 'es' || v === 'en') return v;
  } catch (_) {}
  try {
    const s = window.APEX && window.APEX.load && window.APEX.load();
    if (s && s.language === 'es') return 'es';
  } catch (_) {}
  return 'en';
}

export function pick(en, es) {
  return currentLang() === 'es' ? es : en;
}
