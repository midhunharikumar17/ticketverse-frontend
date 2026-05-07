import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';
import { CATS, ic } from '../constants/data';
import { fmt, fmtDay, minP, grad } from '../utils/helpers';

// City filter bar
const CITIES = ['All Cities', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'];

export default function HomePage({ events, onEventClick, onNav }) {
  const [city, setCity]   = useState('All Cities');
  const [fi, setFi]       = useState(0);
  const featured = events.slice(0, 5);
  const fe = featured[fi];

  useEffect(() => {
    const t = setInterval(() => setFi(p => (p + 1) % featured.length), 5000);
    return () => clearInterval(t);
  }, [featured.length]);

  const filtered = city === 'All Cities'
    ? events
    : events.filter(e => e.venueAddress?.toLowerCase().includes(city.toLowerCase()));

  if (!fe) return null;

  return (
    <div>
      {/* ── Hero Carousel ── */}
      <div style={{ position: 'relative', height: 'clamp(300px, 55vw, 520px)', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: fe.posterUrl ? `url(${fe.posterUrl}) center/cover no-repeat` : grad(fe._id),
          transition: 'opacity .8s',
        }} />
        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,.9) 0%, rgba(0,0,0,.4) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 40%)' }} />

        {/* Content */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(20px,4vw,48px)',
          maxWidth: 680,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{
              background: 'var(--red)', color: '#fff', fontSize: 10, fontWeight: 800,
              padding: '3px 12px', borderRadius: 20, letterSpacing: .5, textTransform: 'uppercase',
            }}>
              {fe.category}
            </span>
            <span style={{ color: 'var(--text2)', fontSize: 12 }}>
              {fmtDay(fe.startTime)} · {fe.venueName}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(22px, 4.5vw, 48px)', fontWeight: 900,
            fontFamily: 'var(--font-head)', lineHeight: 1.1, marginBottom: 16,
            textShadow: '0 2px 20px rgba(0,0,0,.5)',
          }}>
            {fe.title}
          </h1>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Btn onClick={() => onEventClick(fe)} variant="primary" size="lg"
              style={{ boxShadow: '0 4px 24px var(--red-glow)' }}>
              Book Now · ₹{minP(fe.tiers).toLocaleString()}+
            </Btn>
            <Btn onClick={() => onNav('events')} variant="dark" size="lg">
              View All Events
            </Btn>
          </div>
        </div>

        {/* Slide indicators */}
        <div style={{
          position: 'absolute', bottom: 24, right: 24,
          display: 'flex', gap: 6, alignItems: 'center',
        }}>
          {featured.map((_, i) => (
            <div key={i} onClick={() => setFi(i)}
              style={{
                width: i === fi ? 24 : 6, height: 6, borderRadius: 3,
                background: i === fi ? 'var(--red)' : 'rgba(255,255,255,.3)',
                cursor: 'pointer', transition: 'all .3s',
              }} />
          ))}
        </div>
      </div>

      {/* ── City Filter ── */}
      <div style={{
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        overflowX: 'auto', padding: '0 var(--px)',
      }}>
        <div style={{ display: 'flex', gap: 4, padding: '10px 0', minWidth: 'max-content' }}>
          {CITIES.map(c => (
            <button key={c} onClick={() => setCity(c)}
              style={{
                padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                background: city === c ? 'var(--red)' : 'var(--card)',
                color: city === c ? '#fff' : 'var(--text2)',
                transition: 'all .15s', whiteSpace: 'nowrap',
                boxShadow: city === c ? '0 2px 8px var(--red-glow)' : 'none',
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <div style={{ padding: 'clamp(24px,4vw,48px) var(--px) 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 'clamp(16px,3vw,20px)', fontWeight: 800, fontFamily: 'var(--font-head)' }}>
            Browse Categories
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
          {CATS.map(c => (
            <div key={c.id} onClick={() => onNav('events', c.id)}
              style={{
                flex: '0 0 auto', padding: '10px 20px', borderRadius: 40,
                background: c.bg, border: `1px solid ${c.color}33`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all .2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = c.color; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = c.bg; e.currentTarget.style.color = ''; }}>
              <span style={{ fontSize: 16 }}>{c.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trending Events ── */}
      <section style={{ padding: 'clamp(24px,4vw,48px) var(--px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 'clamp(16px,3vw,22px)', fontWeight: 800, fontFamily: 'var(--font-head)' }}>
              Trending in {city === 'All Cities' ? 'India' : city}
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 2 }}>
              {filtered.length} event{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <Btn onClick={() => onNav('events')} variant="outlineRed" size="sm">
            View All <Icon d={ic.arrow} size={14} />
          </Btn>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {filtered.slice(0, 6).map(e => (
            <EventCard key={e._id} event={e} onClick={onEventClick} />
          ))}
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <div style={{ margin: '0 var(--px) 48px' }}>
        <div style={{
          borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #1a0a20 0%, #0a0a1a 100%)',
          border: '1px solid rgba(232,25,44,.2)',
          padding: 'clamp(20px,4vw,40px)',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(232,25,44,.15) 0%, transparent 70%)', borderRadius: '50%' }} />
          <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--red)', letterSpacing: 1, textTransform: 'uppercase' }}>
            🎟 Limited Time Offer
          </p>
          <h3 style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 900, fontFamily: 'var(--font-head)' }}>
            Get 20% off your first booking
          </h3>
          <p style={{ color: 'var(--text2)', fontSize: 14, maxWidth: 400 }}>
            Use code <strong style={{ color: 'var(--gold)', letterSpacing: 1 }}>WELCOME20</strong> at checkout.
            Valid on all events.
          </p>
          <div>
            <Btn onClick={() => onNav('events')} variant="primary" size="lg">
              Explore Events
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}