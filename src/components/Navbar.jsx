import { useState } from 'react';
import Icon from './ui/Icon';
import Btn from './ui/Btn';
import { ic } from '../constants/data';
import { uname } from '../utils/helpers';

export default function Navbar({ user, onLogin, onLogout, onNav, page }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    ['home', 'Home', ic.home],
    ['events', 'Events', ic.ticket],
    ['categories', 'Categories', ic.filter],
    ['venues', 'Venues', ic.venue],
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 500,
        background: 'rgba(12,12,12,.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        height: 60, display: 'flex', alignItems: 'center',
        padding: '0 var(--px)', gap: 8,
      }}>
        {/* Logo */}
        <div onClick={() => onNav('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginRight: 16, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px var(--red-glow)',
          }}>
            <Icon d={ic.ticket} size={17} color="#fff" />
          </div>
          <span style={{
            fontSize: 19, fontWeight: 800, fontFamily: 'var(--font-head)',
            letterSpacing: '-.3px', color: 'var(--text)',
          }}>
            Ticket<span style={{ color: 'var(--red)' }}>Verse</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', gap: 2, flex: 1 }} className="hide-mobile">
          {navLinks.map(([p, l]) => (
            <button key={p} onClick={() => onNav(p)}
              style={{
                background: page === p ? 'var(--red-dim)' : 'transparent',
                border: 'none', color: page === p ? 'var(--red)' : 'var(--text2)',
                padding: '7px 14px', borderRadius: 8, fontWeight: 600, fontSize: 13,
                cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all .15s',
                borderBottom: page === p ? '2px solid var(--red)' : '2px solid transparent',
              }}>
              {l}
            </button>
          ))}
          {user?.role === 'admin' && (
            <button onClick={() => onNav('admin')}
              style={{
                background: page === 'admin' ? 'rgba(232,25,44,.1)' : 'transparent',
                border: 'none', color: page === 'admin' ? 'var(--red)' : 'var(--text2)',
                padding: '7px 14px', borderRadius: 8, fontWeight: 600, fontSize: 13,
                cursor: 'pointer', fontFamily: 'var(--font-body)',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
              <Icon d={ic.shield} size={13} /> Admin
            </button>
          )}
        </div>

        {/* Search bar — desktop */}
        <div style={{
          position: 'relative', flex: '0 1 280px',
          display: window?.innerWidth < 768 ? 'none' : 'block',
        }} className="hide-mobile">
          <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
            <Icon d={ic.search} size={15} color="var(--text3)" />
          </div>
          <input placeholder="Search events…" style={{
            paddingLeft: 34, height: 36, fontSize: 13,
            background: 'var(--card)', border: '1px solid var(--border)',
          }} onClick={() => onNav('events')} readOnly />
        </div>

        {/* User actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {user ? (
            <>
              <button onClick={() => onNav('profile')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  color: 'var(--text)', cursor: 'pointer', padding: '5px 10px 5px 5px',
                  borderRadius: 40, fontFamily: 'var(--font-body)', transition: 'border-color .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--red)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--red)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff',
                }}>
                  {uname(user)[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600 }} className="hide-mobile">
                  {uname(user).split(' ')[0]}
                </span>
              </button>
              <button onClick={onLogout}
                style={{
                  width: 36, height: 36, borderRadius: '50%', background: 'var(--card)',
                  border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', color: 'var(--text2)',
                  transition: 'all .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
                title="Logout">
                <Icon d={ic.logout} size={15} />
              </button>
            </>
          ) : (
            <>
              <Btn onClick={onLogin} variant="outline" size="sm" style={{ display: window?.innerWidth < 480 ? 'none' : 'flex' }}>
                Log In
              </Btn>
              <Btn onClick={onLogin} size="sm">Sign Up</Btn>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500,
        background: 'rgba(12,12,12,.97)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        height: 64, display: 'none', alignItems: 'center',
        justifyContent: 'space-around', padding: '0 8px',
      }} className="mobile-bottom-nav">
        {navLinks.map(([p, l, ico]) => (
          <button key={p} onClick={() => onNav(p)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              color: page === p ? 'var(--red)' : 'var(--text3)',
              padding: '8px 12px', borderRadius: 10, flex: 1, transition: 'color .15s',
            }}>
            <Icon d={ico} size={20} color={page === p ? 'var(--red)' : 'var(--text3)'} />
            <span style={{ fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-body)' }}>{l}</span>
          </button>
        ))}
        <button onClick={() => user ? onNav('profile') : onLogin()}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer',
            color: page === 'profile' ? 'var(--red)' : 'var(--text3)',
            padding: '8px 12px', borderRadius: 10, flex: 1, transition: 'color .15s',
          }}>
          <Icon d={ic.user} size={20} color={page === 'profile' ? 'var(--red)' : 'var(--text3)'} />
          <span style={{ fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-body)' }}>
            {user ? uname(user).split(' ')[0] : 'Login'}
          </span>
        </button>
      </nav>

      {/* Responsive styles injected */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-bottom-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}