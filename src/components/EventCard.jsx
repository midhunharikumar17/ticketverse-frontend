import { useState } from 'react';
import Icon from './ui/Icon';
import { ic, CATS } from '../constants/data';
import { fmt, fmtT, minP, grad } from '../utils/helpers';

export default function EventCard({ event, onClick, featured }) {
  const [hov, setHov] = useState(false);
  const cat = CATS.find(c => c.id === event.category);
  const rem = event.tiers?.reduce((s, t) => s + (t.remainingQuantity ?? 0), 0) ?? null;
  const totalSeats = event.tiers?.reduce((s, t) => s + (t.totalQuantity ?? t.remainingQuantity ?? 0), 0) || 1;
  const soldPct = Math.max(0, Math.min(100, 100 - (rem / totalSeats) * 100));
  const isAlmostGone = rem !== null && rem < 30 && rem > 0;
  const isSoldOut = rem === 0;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick(event)}
      style={{
        background: 'var(--card)', borderRadius: 'var(--radius-lg)',
        overflow: 'hidden', cursor: 'pointer',
        border: `1px solid ${hov ? 'var(--border2)' : 'var(--border)'}`,
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'transform .2s, border-color .2s, box-shadow .2s',
        boxShadow: hov ? '0 12px 40px rgba(0,0,0,.4)' : 'none',
        position: 'relative',
      }}>

      {/* Image / Banner */}
      <div style={{
        height: featured ? 220 : 170,
        background: event.posterUrl ? `url(${event.posterUrl}) center/cover no-repeat` : grad(event._id),
        position: 'relative',
      }}>
        {/* Overlay gradient */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.1) 60%, transparent 100%)' }} />

        {/* Top badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            background: cat?.color || 'var(--red)', color: '#fff',
            fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
            letterSpacing: .4, textTransform: 'uppercase',
          }}>
            {cat?.emoji} {event.category}
          </span>
          {isAlmostGone && !isSoldOut && (
            <span style={{
              background: 'rgba(245,166,35,.9)', color: '#111',
              fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20,
            }}>
              🔥 Almost Gone
            </span>
          )}
          {isSoldOut && (
            <span style={{
              background: 'rgba(0,0,0,.8)', color: 'var(--text2)',
              fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
            }}>
              SOLD OUT
            </span>
          )}
        </div>

        {/* Bottom price */}
        <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
          <span style={{
            background: 'rgba(0,0,0,.75)', color: '#f5a623',
            fontSize: 13, fontWeight: 800, padding: '4px 12px', borderRadius: 20,
            backdropFilter: 'blur(4px)',
          }}>
            ₹{minP(event.tiers).toLocaleString()}+
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        <h3 className="line-clamp-2" style={{
          fontSize: featured ? 16 : 14, fontWeight: 700, marginBottom: 10,
          lineHeight: 1.35, fontFamily: 'var(--font-head)', color: 'var(--text)',
        }}>
          {event.title}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 12 }}>
            <Icon d={ic.cal} size={13} color="var(--text3)" />
            {fmt(event.startTime)} · {fmtT(event.startTime)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 12 }}>
            <Icon d={ic.map} size={13} color="var(--text3)" />
            <span className="truncate">{event.venueName}</span>
          </div>
        </div>

        {/* Availability bar */}
        {rem !== null && !isSoldOut && (
          <div>
            <div style={{
              height: 3, background: 'var(--border)', borderRadius: 2,
              overflow: 'hidden', marginBottom: 5,
            }}>
              <div style={{
                height: '100%',
                width: `${soldPct}%`,
                background: isAlmostGone ? '#f5a623' : 'var(--red)',
                borderRadius: 2, transition: 'width .5s',
              }} />
            </div>
            <p style={{ fontSize: 10, color: isAlmostGone ? '#f5a623' : 'var(--text3)', fontWeight: 600 }}>
              {rem} tickets remaining
            </p>
          </div>
        )}
        {isSoldOut && (
          <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, marginBottom: 5 }}>
            <div style={{ height: '100%', width: '100%', background: 'var(--text3)', borderRadius: 2 }} />
          </div>
        )}
      </div>
    </div>
  );
}