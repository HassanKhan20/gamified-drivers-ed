// Wraps fetch globally. Any /api/* response with status 423 redirects to /lockout.html.
const _origFetch = window.fetch.bind(window);

window.fetch = async (...args) => {
  const res = await _origFetch(...args);
  if (res.status === 423) {
    try {
      const u = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
      if (u.includes('/api/') && !location.pathname.endsWith('/lockout.html')) {
        location.href = '/lockout.html';
      }
    } catch (_) { /* ignore */ }
  }
  return res;
};

export const lockoutInterceptorInstalled = true;
