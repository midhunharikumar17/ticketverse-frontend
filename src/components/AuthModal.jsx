import { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import Btn from './ui/Btn';
import Field from './ui/Field';
import Icon from './ui/Icon';
import { toast } from './ui/Toast';
import API from '../api/axios';
import { ic } from '../constants/data';
import { uname } from '../utils/helpers';

export default function AuthModal({ open, onClose, onAuth }) {
  const [tab, setTab]       = useState('login');
  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr]       = useState('');

  useEffect(() => { if (open) { setErr(''); setForm({ name: '', email: '', password: '' }); } }, [open]);
  const s = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    setErr('');
    if (!form.email || !form.password) { setErr('Email and password are required'); return; }
    if (tab === 'register' && form.name.trim().length < 2) { setErr('Name must be at least 2 characters'); return; }
    if (form.password.length < 6) { setErr('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const url = tab === 'login' ? '/auth/login' : '/auth/register';
      const payload = tab === 'login'
        ? { email: form.email.trim(), password: form.password }
        : { name: form.name.trim(), email: form.email.trim(), password: form.password };
      const res = await API.post(url, payload);
      localStorage.setItem('token', res.data.token);
      onAuth(res.data.user);
      onClose();
      toast(`Welcome${tab === 'register' ? ' to TicketVerse' : ' back'}, ${uname(res.data.user)}! 🎉`);
    } catch (e) {
      setErr(e.response?.data?.message || e.response?.data?.error?.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="">
      {/* Logo header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: 'var(--red)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px', boxShadow: '0 4px 16px var(--red-glow)',
        }}>
          <Icon d={ic.ticket} size={24} color="#fff" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800 }}>
          {tab === 'login' ? 'Welcome back' : 'Join TicketVerse'}
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 4 }}>
          {tab === 'login' ? 'Sign in to your account' : 'Create your free account today'}
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', background: 'var(--card)', borderRadius: 10, padding: 4, marginBottom: 24,
        border: '1px solid var(--border)',
      }}>
        {['login', 'register'].map(t => (
          <button key={t} onClick={() => { setTab(t); setErr(''); }}
            style={{
              flex: 1, padding: '9px 0', borderRadius: 8, border: 'none',
              background: tab === t ? 'var(--red)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--text2)',
              fontWeight: 700, fontSize: 13, cursor: 'pointer',
              fontFamily: 'var(--font-body)', transition: 'all .18s',
            }}>
            {t === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {tab === 'register' && (
          <Field label="Full Name" required>
            <input placeholder="John Doe" value={form.name} onChange={e => s('name', e.target.value)} />
          </Field>
        )}
        <Field label="Email Address" required>
          <input type="email" placeholder="you@example.com" value={form.email} onChange={e => s('email', e.target.value)} />
        </Field>
        <Field label="Password" required>
          <div style={{ position: 'relative' }}>
            <input type={show ? 'text' : 'password'} placeholder="Min 6 characters"
              value={form.password} onChange={e => s('password', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              style={{ paddingRight: 44 }} />
            <button onClick={() => setShow(p => !p)}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: 4,
              }}>
              <Icon d={show ? ic.eye : 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'} size={16} />
            </button>
          </div>
        </Field>

        {err && (
          <div style={{
            background: 'rgba(232,25,44,.08)', border: '1px solid rgba(232,25,44,.3)',
            borderRadius: 10, padding: '10px 14px', color: 'var(--red)', fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Icon d={ic.close} size={14} color="var(--red)" /> {err}
          </div>
        )}

        <Btn onClick={submit} full disabled={loading} size="lg" style={{ marginTop: 4, height: 48 }}>
          {loading ? '⏳ Please wait…' : tab === 'login' ? 'Log In' : 'Create Account'}
        </Btn>

        <p style={{ textAlign: 'center', color: 'var(--text3)', fontSize: 12 }}>
          By continuing you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </Modal>
  );
}