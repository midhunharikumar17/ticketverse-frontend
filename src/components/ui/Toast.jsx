import { useState, useEffect } from 'react';

let _st;
export const toast = (msg, type = 'success') => _st?.({ msg, type, id: Date.now() });

export default function Toast() {
  const [toasts, setToasts] = useState([]);
  _st = (t) => setToasts(p => [...p.slice(-2), t]);

  useEffect(() => {
    if (!toasts.length) return;
    const ti = setTimeout(() => setToasts(p => p.slice(1)), 3500);
    return () => clearTimeout(ti);
  }, [toasts]);

  if (!toasts.length) return null;

  const colors = { success: '#00c853', error: '#e8192c', info: '#2979ff', warning: '#f5a623' };

  return (
    <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
      zIndex: 99999, display: 'flex', flexDirection: 'column', gap: 8, width: 'min(90vw,380px)' }}>
      {toasts.map(t => (
        <div key={t.id} className="fade-up"
          style={{ background: 'var(--card2)', border: `1px solid ${colors[t.type]}44`,
            borderLeft: `3px solid ${colors[t.type]}`, borderRadius: 12,
            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: `0 8px 32px rgba(0,0,0,.5), 0 0 0 1px ${colors[t.type]}11`,
            fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[t.type],
            flexShrink: 0, boxShadow: `0 0 8px ${colors[t.type]}` }} />
          {t.msg}
        </div>
      ))}
    </div>
  );
}