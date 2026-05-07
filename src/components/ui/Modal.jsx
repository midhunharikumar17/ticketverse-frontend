import { useEffect } from 'react';
import Icon from './Icon';
import { ic } from '../../constants/data';

export default function Modal({ open, onClose, children, title, width = 500, noPad }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 9000,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '0', backdropFilter: 'blur(6px)',
        '@media(minWidth:600px)': { alignItems: 'center', padding: '24px' } }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '20px 20px 0 0', width: '100%', maxWidth: width,
          maxHeight: '92vh', overflowY: 'auto', position: 'relative',
          boxShadow: '0 -8px 40px rgba(0,0,0,.6)',
          /* Desktop: rounded all corners */
          ...(typeof window !== 'undefined' && window.innerWidth >= 600 ? {
            borderRadius: '20px', margin: '24px',
          } : {}) }}>
        {/* Handle bar for mobile */}
        <div style={{ width: 36, height: 4, background: 'var(--border2)', borderRadius: 2,
          margin: '12px auto 0', display: window?.innerWidth < 600 ? 'block' : 'none' }} />
        {(title !== undefined) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0,
            background: 'var(--surface)', zIndex: 1, borderRadius: '20px 20px 0 0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-head)' }}>{title}</h3>
            <button onClick={onClose}
              style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--card)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text2)' }}>
              <Icon d={ic.close} size={16} />
            </button>
          </div>
        )}
        <div style={{ padding: noPad ? 0 : '20px' }}>{children}</div>
      </div>
    </div>
  );
}