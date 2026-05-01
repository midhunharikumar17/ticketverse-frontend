import { useState } from 'react';
import API from '../api/axios';
import Icon from './ui/Icon';
import { ic } from '../constants/data';

export default function CouponInput({ amount, eventId, onApply, onRemove }) {
  const [code, setCode]       = useState('');
  const [applied, setApplied] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState('');

  const apply = async () => {
    if (!code.trim()) { setErr('Enter a coupon code'); return; }
    setErr(''); setLoading(true);
    try {
      const res = await API.post('/coupons/validate', {
        code: code.trim().toUpperCase(),
        amount,
        eventId,
      });
      setApplied(res.data);
      onApply?.(res.data);
    } catch (e) {
      setErr(e.response?.data?.message || 'Invalid coupon');
    } finally { setLoading(false); }
  };

  const remove = () => {
    setApplied(null);
    setCode('');
    setErr('');
    onRemove?.();
  };

  if (applied) return (
    <div style={{ background: 'rgba(0,214,143,.08)', border: '1px solid rgba(0,214,143,.25)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(0,214,143,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon d={ic.tag} size={14} color="#00d68f" />
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 13, color: '#00d68f' }}>{applied.code}</p>
          <p style={{ fontSize: 11, color: 'var(--muted)' }}>
            {applied.type === 'percent' ? `${applied.value}% off` : `₹${applied.value} off`}
            {applied.description ? ` · ${applied.description}` : ''}
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontWeight: 800, color: '#00d68f', fontSize: 15 }}>−₹{applied.discount.toLocaleString()}</p>
        <button onClick={remove}
          style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 11, cursor: 'pointer', marginTop: 2, fontFamily: 'var(--font-body)' }}>
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setErr(''); }}
            onKeyDown={e => e.key === 'Enter' && apply()}
            placeholder="Enter coupon code"
            style={{ letterSpacing: 1, fontWeight: 600, fontSize: 13, textTransform: 'uppercase' }}
          />
        </div>
        <button
          onClick={apply}
          disabled={loading}
          style={{ background: 'linear-gradient(135deg,#6c47ff,#9d7fff)', color: '#fff', border: 'none', borderRadius: 10, padding: '0 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: loading ? .6 : 1, whiteSpace: 'nowrap', fontFamily: 'var(--font-body)' }}>
          {loading ? '…' : 'Apply'}
        </button>
      </div>
      {err && (
        <p style={{ color: '#ff4d6d', fontSize: 12, marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
          <Icon d={ic.close} size={12} color="#ff4d6d" />{err}
        </p>
      )}
    </div>
  );
}