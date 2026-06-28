// Loads /api/compliance/config once and stamps it onto window.APEX_COMPLIANCE_CONFIG.
// All other compliance scripts read from that global.
let _loaded = null;

export async function loadComplianceConfig() {
  if (_loaded) return _loaded;
  const r = await fetch('/api/compliance/config', { credentials: 'include' });
  if (!r.ok) throw new Error(`Compliance config fetch failed: ${r.status}`);
  const cfg = await r.json();
  window.APEX_COMPLIANCE_CONFIG = cfg;
  _loaded = cfg;
  return cfg;
}
