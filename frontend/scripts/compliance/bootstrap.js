// Compliance bootstrap - load on every authenticated page.
//
// Installs:
//   1. /api/compliance/config fetch + window.APEX_COMPLIANCE_CONFIG cache
//   2. lockout.js global fetch interceptor (redirects 423 -> /lockout.html)
//   3. hours-banner.js outside-hours warning
//
// Per-page timer + identity + tamper imports remain on lesson/topic/drive pages.
import { loadComplianceConfig } from './config.js';
import './lockout.js';
import { checkHours } from './hours-banner.js';

loadComplianceConfig().then(() => checkHours()).catch(() => {});
