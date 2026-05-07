export default function Field({ label, children, hint, error, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)',
          letterSpacing: '.5px', textTransform: 'uppercase' }}>
          {label}{required && <span style={{ color: 'var(--red)', marginLeft: 3 }}>*</span>}
        </label>
      )}
      {children}
      {error && <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 2 }}>{error}</p>}
      {hint && !error && <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{hint}</p>}
    </div>
  );
}