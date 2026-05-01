import { useState } from 'react';
import Icon from './ui/Icon';
import { toast } from './ui/Toast';
import API from '../api/axios';
import { ic } from '../constants/data';

const LINKS = {
  Explore:  [['Home','home'],['Events','events'],['Categories','categories'],['Venues','venues']],
  Support:  [['Help Center','#'],['Contact Us','#'],['Refund Policy','#'],['Terms of Service','#']],
  Company:  [['About Us','#'],['Careers','#'],['Press','#'],['Blog','#']],
};

const SOCIAL = [
  { label:'Twitter',  icon:'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  { label:'Instagram', icon:'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 20.5h9a5 5 0 005-5v-9a5 5 0 00-5-5h-9a5 5 0 00-5 5v9a5 5 0 005 5z' },
  { label:'LinkedIn',  icon:'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
  { label:'YouTube',   icon:'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z M9.75 15.02V8.98l5.75 3.02-5.75 3.02z' },
];

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState('idle'); // idle | loading | done

  const subscribe = async () => {
    if (!email.trim() || !email.includes('@')) {
      toast('Enter a valid email', 'error'); return;
    }
    setStatus('loading');
    // Simulate API call — wire to real endpoint later
    await new Promise(r => setTimeout(r, 800));
    setStatus('done');
    toast('Subscribed! 🎉 You\'ll get the best deals first.');
  };

  if (status === 'done') return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,214,143,.08)', border: '1px solid rgba(0,214,143,.2)', borderRadius: 12, padding: '14px 18px' }}>
      <Icon d={ic.check} size={18} color="#00d68f" />
      <p style={{ color: '#00d68f', fontWeight: 600, fontSize: 13 }}>You're subscribed! Welcome to the family.</p>
    </div>
  );

  return (
    <div>
      <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, fontFamily: 'var(--font-head)' }}>Stay in the loop</p>
      <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>
        Get early access to events, exclusive deals and discount codes — straight to your inbox.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && subscribe()}
          style={{ flex: 1, fontSize: 13 }}
        />
        <button
          onClick={subscribe}
          disabled={status === 'loading'}
          style={{ background: 'linear-gradient(135deg,#6c47ff,#9d7fff)', color: '#fff', border: 'none', borderRadius: 10, padding: '0 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', opacity: status === 'loading' ? .6 : 1, fontFamily: 'var(--font-body)' }}>
          {status === 'loading' ? '…' : 'Subscribe'}
        </button>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 11, marginTop: 8 }}>No spam. Unsubscribe anytime.</p>
    </div>
  );
}

// ── Main Footer ───────────────────────────────────────────────────────────────
export default function Footer({ onNav }) {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', marginTop: 60 }}>
      {/* Top band */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 28px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40 }}>

        {/* Brand + newsletter */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#6c47ff,#9d7fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px #6c47ff44' }}>
              <Icon d={ic.ticket} size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 19, fontWeight: 800, fontFamily: 'var(--font-head)', background: 'linear-gradient(135deg,#9d7fff,#f0a500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TicketVerse
            </span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7, marginBottom: 22 }}>
            Your universe of live experiences. Book concerts, sports, theatre and more — all in one place.
          </p>
          <Newsletter />
          {/* Social */}
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {SOCIAL.map(s => (
              <a key={s.label} href="#" title={s.label}
                style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6c47ff'; e.currentTarget.style.background = 'rgba(108,71,255,.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)'; }}>
                <Icon d={s.icon} size={15} color="var(--muted)" />
              </a>
            ))}
          </div>
        </div>

        {/* Nav link columns */}
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p style={{ fontWeight: 700, fontSize: 12, color: 'var(--text)', marginBottom: 14, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'var(--font-head)' }}>
              {heading}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {links.map(([label, page]) => (
                <span key={label}
                  onClick={() => page !== '#' && onNav?.(page)}
                  style={{ color: 'var(--muted)', fontSize: 13, cursor: page !== '#' ? 'pointer' : 'default', transition: 'color .18s' }}
                  onMouseEnter={e => { if (page !== '#') e.currentTarget.style.color = '#9d7fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom band */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap', gap: 10 }}>
        <p style={{ color: 'var(--muted)', fontSize: 12 }}>© 2025 TicketVerse. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(t => (
            <span key={t} style={{ color: 'var(--muted)', fontSize: 12, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = '#9d7fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: 11 }}>
          <span>🔒 Secured by</span>
          <span style={{ fontWeight: 700, color: '#528FF0' }}>Razorpay</span>
        </div>
      </div>
    </footer>
  );
}