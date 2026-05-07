import { useState } from 'react';
import Icon from './ui/Icon';
import { toast } from './ui/Toast';
import { ic } from '../constants/data';

const LINKS = {
  Discover: [['Events', 'events'], ['Categories', 'categories'], ['Venues', 'venues'], ['New Releases', 'events']],
  Support:  [['Help Center', '#'], ['Contact Us', '#'], ['Refund Policy', '#'], ['Terms of Service', '#']],
  Company:  [['About Us', '#'], ['Careers', '#'], ['Press', '#'], ['Blog', '#']],
};

const SOCIAL = [
  { label: 'Twitter',   icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', color: '#1DA1F2' },
  { label: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 20.5h9a5 5 0 005-5v-9a5 5 0 00-5-5h-9a5 5 0 00-5 5v9a5 5 0 005 5z', color: '#E1306C' },
  { label: 'YouTube',   icon: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z M9.75 15.02V8.98l5.75 3.02-5.75 3.02z', color: '#FF0000' },
];

function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone]   = useState(false);
  const [loading, setLoading] = useState(false);

  const subscribe = async () => {
    if (!email.includes('@')) { toast('Enter a valid email', 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setDone(true);
    toast('Subscribed! 🎉 Deals incoming.');
    setLoading(false);
  };

  if (done) return (
    <div style={{ background: 'rgba(0,200,83,.08)', border: '1px solid rgba(0,200,83,.2)',
      borderRadius: 12, padding: '12px 16px', color: '#00c853', fontSize: 13, fontWeight: 600 }}>
      ✅ You're in! Check your inbox for deals.
    </div>
  );

  return (
    <div>
      <p style={{ fontWeight: 800, fontSize: 15, fontFamily: 'var(--font-head)', marginBottom: 6 }}>
        Get exclusive deals
      </p>
      <p style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>
        Early access to events + discount codes. No spam.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="email" placeholder="your@email.com" value={email}
          onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && subscribe()}
          style={{ flex: 1, height: 40, fontSize: 13 }} />
        <button onClick={subscribe} disabled={loading}
          style={{
            background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 10,
            padding: '0 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            whiteSpace: 'nowrap', fontFamily: 'var(--font-body)',
            opacity: loading ? .6 : 1, flexShrink: 0,
          }}>
          {loading ? '…' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
}

export default function Footer({ onNav }) {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', marginTop: 60 }}>
      {/* Main grid */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(32px,5vw,56px) var(--px) clamp(24px,4vw,40px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px,100%), 1fr))',
        gap: 'clamp(24px,4vw,48px)',
      }}>
        {/* Brand */}
        <div style={{ gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: 'var(--red)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px var(--red-glow)',
            }}>
              <Icon d={ic.ticket} size={17} color="#fff" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-head)' }}>
              Ticket<span style={{ color: 'var(--red)' }}>Verse</span>
            </span>
          </div>
          <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
            India's premier live event ticketing platform. Concerts, sports, theatre and more.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {SOCIAL.map(s => (
              <a key={s.label} href="#" title={s.label}
                style={{
                  width: 34, height: 34, borderRadius: 8, background: 'var(--card)',
                  border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.background = `${s.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)'; }}>
                <Icon d={s.icon} size={15} color="var(--text2)" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p style={{ fontWeight: 800, fontSize: 11, color: 'var(--text)', marginBottom: 14,
              letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'var(--font-head)' }}>
              {heading}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(([label, page]) => (
                <span key={label} onClick={() => page !== '#' && onNav?.(page)}
                  style={{ color: 'var(--text2)', fontSize: 13, cursor: page !== '#' ? 'pointer' : 'default',
                    transition: 'color .15s' }}
                  onMouseEnter={e => { if (page !== '#') e.currentTarget.style.color = 'var(--red)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Newsletter */}
        <div><Newsletter /></div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border)', padding: 'clamp(14px,2vw,20px) var(--px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12, maxWidth: 1200, margin: '0 auto',
      }}>
        <p style={{ color: 'var(--text3)', fontSize: 12 }}>
          © 2025 TicketVerse Technologies Pvt. Ltd. All rights reserved.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text3)', fontSize: 12 }}>
          <span>🔒 Payments secured by</span>
          <span style={{ fontWeight: 700, color: '#528FF0' }}>Razorpay</span>
          <span style={{ color: 'var(--border2)' }}>·</span>
          <span>SSL Encrypted</span>
        </div>
      </div>
    </footer>
  );
}