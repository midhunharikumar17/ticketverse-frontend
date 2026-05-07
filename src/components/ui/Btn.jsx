import { useState } from 'react';

export default function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, full, style, type }) {
  const [pressed, setPressed] = useState(false);

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 6, fontFamily: 'var(--font-body)', fontWeight: 600, borderRadius: 'var(--radius)',
    border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1, width: full ? '100%' : 'auto',
    transition: 'all .15s', transform: pressed && !disabled ? 'scale(.97)' : 'scale(1)',
    whiteSpace: 'nowrap', ...style,
  };

  const sizes = {
    xs: { padding: '5px 12px', fontSize: 11 },
    sm: { padding: '7px 14px', fontSize: 12 },
    md: { padding: '10px 20px', fontSize: 13 },
    lg: { padding: '13px 28px', fontSize: 14 },
    xl: { padding: '15px 36px', fontSize: 15 },
  };

  const variants = {
    primary: { background: 'var(--red)', color: '#fff', boxShadow: '0 4px 14px var(--red-glow)' },
    gold:    { background: 'linear-gradient(135deg,#f5a623,#e8192c)', color: '#fff', boxShadow: '0 4px 14px rgba(245,166,35,.3)' },
    outline: { background: 'transparent', border: '1.5px solid var(--border2)', color: 'var(--text2)' },
    outlineRed: { background: 'transparent', border: '1.5px solid var(--red)', color: 'var(--red)' },
    ghost:   { background: 'transparent', color: 'var(--text2)', padding: '8px 12px' },
    danger:  { background: '#c62828', color: '#fff' },
    success: { background: '#00c853', color: '#111', fontWeight: 700 },
    dark:    { background: 'var(--card2)', border: '1px solid var(--border)', color: 'var(--text)' },
  };

  return (
    <button type={type} onClick={disabled ? undefined : onClick}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{ ...base, ...sizes[size] || sizes.md, ...variants[variant] || variants.primary }}>
      {children}
    </button>
  );
}