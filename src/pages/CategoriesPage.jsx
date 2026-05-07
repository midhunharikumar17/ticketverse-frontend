import EventCard from '../components/EventCard';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';
import { CATS, ic } from '../constants/data';

export default function CategoriesPage({ events, onEventClick, onNav }) {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(24px,4vw,48px) var(--px)' }}>
      <h1 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 900, fontFamily: 'var(--font-head)', marginBottom: 8 }}>
        Browse Categories
      </h1>
      <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 36 }}>
        Find events by what you love
      </p>

      {/* Category hero grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px,100%), 1fr))',
        gap: 12, marginBottom: 56,
      }}>
        {CATS.map(c => {
          const count = events.filter(e => e.category === c.id).length;
          return (
            <div key={c.id} onClick={() => onNav('events', c.id)}
              style={{
                padding: '20px 16px', borderRadius: 'var(--radius-lg)',
                background: `linear-gradient(135deg, ${c.color}18 0%, ${c.color}08 100%)`,
                border: `1px solid ${c.color}25`, cursor: 'pointer',
                textAlign: 'center', transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${c.color}25`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{c.emoji}</div>
              <p style={{ fontWeight: 800, fontSize: 14, fontFamily: 'var(--font-head)', color: c.color, marginBottom: 4 }}>{c.id}</p>
              <p style={{ fontSize: 11, color: 'var(--text3)' }}>{count} event{count !== 1 ? 's' : ''}</p>
            </div>
          );
        })}
      </div>

      {/* Events per category */}
      {CATS.map(c => {
        const ev = events.filter(e => e.category === c.id);
        if (!ev.length) return null;
        return (
          <div key={c.id} style={{ marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `${c.color}18`, border: `1px solid ${c.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>
                  {c.emoji}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-head)' }}>{c.id}</h2>
                  <p style={{ fontSize: 12, color: 'var(--text3)' }}>{ev.length} events</p>
                </div>
              </div>
              <Btn onClick={() => onNav('events', c.id)} variant="outlineRed" size="sm">
                See All <Icon d={ic.arrow} size={13} />
              </Btn>
            </div>
            {/* Horizontal scroll on mobile */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px,100%), 1fr))',
              gap: 14,
            }}>
              {ev.slice(0, 4).map(e => <EventCard key={e._id} event={e} onClick={onEventClick} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}