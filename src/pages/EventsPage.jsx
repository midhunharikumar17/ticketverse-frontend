import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import Icon from '../components/ui/Icon';
import Btn from '../components/ui/Btn';
import { ic, CATS } from '../constants/data';
import { minP } from '../utils/helpers';

export default function EventsPage({ events, onEventClick, initCategory }) {
  const [search, setSearch]   = useState('');
  const [cat, setCat]         = useState(initCategory || '');
  const [sort, setSort]       = useState('date');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => setCat(initCategory || ''), [initCategory]);

  const filtered = events
    .filter(e => !cat || e.category === cat)
    .filter(e => !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venueAddress?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'price'
      ? minP(a.tiers) - minP(b.tiers)
      : new Date(a.startTime) - new Date(b.startTime));

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(20px,4vw,40px) var(--px)' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 900, fontFamily: 'var(--font-head)', marginBottom: 4 }}>
          {cat ? `${cat} Events` : 'All Events'}
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>
          {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Search + Filter row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <Icon d={ic.search} size={16} color="var(--text3)" />
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search events, venues, cities…"
            style={{ paddingLeft: 40, height: 44 }} />
        </div>
        <Btn onClick={() => setShowFilter(p => !p)} variant="dark" size="md"
          style={{ height: 44, gap: 6, borderColor: showFilter ? 'var(--red)' : 'var(--border)' }}>
          <Icon d={ic.filter} size={15} />
          Filter {cat && <span style={{ background: 'var(--red)', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 10, marginLeft: 2 }}>1</span>}
        </Btn>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ width: 'auto', minWidth: 140, height: 44, fontSize: 13 }}>
          <option value="date">Sort: Upcoming</option>
          <option value="price">Sort: Price ↑</option>
        </select>
      </div>

      {/* Category chips */}
      {showFilter && (
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20,
          padding: '16px', background: 'var(--card)', borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
        }}>
          <button onClick={() => setCat('')}
            style={{
              padding: '6px 16px', borderRadius: 20, border: '1.5px solid',
              borderColor: !cat ? 'var(--red)' : 'var(--border)',
              background: !cat ? 'var(--red-dim)' : 'transparent',
              color: !cat ? 'var(--red)' : 'var(--text2)',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
            }}>
            All
          </button>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              style={{
                padding: '6px 16px', borderRadius: 20, border: '1.5px solid',
                borderColor: cat === c.id ? c.color : 'var(--border)',
                background: cat === c.id ? `${c.color}18` : 'transparent',
                color: cat === c.id ? c.color : 'var(--text2)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
              }}>
              {c.emoji} {c.id}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text2)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: 8 }}>No events found</h3>
          <p style={{ color: 'var(--text3)', marginBottom: 20 }}>Try adjusting your search or filters</p>
          <Btn onClick={() => { setSearch(''); setCat(''); }} variant="outlineRed">
            Clear Filters
          </Btn>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
          gap: 16,
        }}>
          {filtered.map(e => <EventCard key={e._id} event={e} onClick={onEventClick} />)}
        </div>
      )}
    </div>
  );
}