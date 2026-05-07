export const uname  = u => u?.displayName || u?.name || 'User';
export const fmt    = d => new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
export const fmtT   = d => new Date(d).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
export const fmtDay = d => new Date(d).toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' });
export const minP   = t => t?.length ? Math.min(...t.map(x => x.price)) : 0;

export const GRADS  = [
  'linear-gradient(135deg,#e8192c 0%,#ff6b35 100%)',
  'linear-gradient(135deg,#7b2ff7 0%,#e8192c 100%)',
  'linear-gradient(135deg,#f5a623 0%,#e8192c 100%)',
  'linear-gradient(135deg,#00c853 0%,#2979ff 100%)',
  'linear-gradient(135deg,#e040fb 0%,#7b2ff7 100%)',
  'linear-gradient(135deg,#2979ff 0%,#00bcd4 100%)',
];
export const grad   = id => GRADS[(id?.charCodeAt?.(0) || 0) % GRADS.length];

export const pct    = (rem, total) => total > 0 ? Math.round((rem / total) * 100) : 0;