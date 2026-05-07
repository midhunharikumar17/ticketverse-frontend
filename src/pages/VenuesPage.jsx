import { useState, useEffect } from 'react';
import API from '../api/axios';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';
import { ic } from '../constants/data';
import { grad } from '../utils/helpers';

export default function VenuesPage({ user, onNav }) {
  const [venues, setVenues]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    API.get('/venues').then(r => setVenues(r.data.venues || [])).finally(() => setLoading(false));
  }, []);

  const filtered = venues.filter(v =>
    !search || v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(24px,4vw,48px) var(--px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 900, fontFamily: 'var(--font-head)', marginBottom: 4 }}>Venues</h1>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>Discover iconic event spaces across India</p>
        </div>
        {(user?.role === 'organizer' || user?.role === 'admin') && (
          <Btn onClick={() => onNav('profile')} size="sm">
            <Icon d={ic.plus} size={14} /> Register Venue
          </Btn>
        )}
      </div>

      <div style={{ position: 'relative', maxWidth: 420, marginBottom: 28 }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <Icon d={ic.search} size={16} color="var(--text3)" />
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search venues or cities…" style={{ paddingLeft: 40, height: 44 }} />
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 16 }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 200, borderRadius: 'var(--radius-lg)' }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text2)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏟</div>
          <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: 8 }}>No venues found</h3>
          <p style={{ color: 'var(--text3)' }}>Be the first to register a venue!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%), 1fr))', gap: 16 }}>
          {filtered.map(v => (
            <div key={v._id}
              style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ height: 100, background: grad(v._id), position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)' }} />
                <p style={{ position: 'absolute', bottom: 12, left: 14, fontWeight: 800, fontSize: 16, fontFamily: 'var(--font-head)' }}>
                  {v.name}
                </p>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 12, marginBottom: 10 }}>
                  <Icon d={ic.map} size={13} color="var(--text3)" />
                  {v.address}, {v.city}
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span style={{ background: 'var(--red-dim)', color: 'var(--red)', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>
                    {v.capacity.toLocaleString()} cap
                  </span>
                  <span style={{ background: 'rgba(0,200,83,.1)', color: 'var(--green)', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>
                    {v.layouts?.length || 0} layout{v.layouts?.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {v.layouts?.slice(0, 1).map(l => (
                  <div key={l._id} style={{ background: 'var(--bg)', borderRadius: 8, padding: '8px 12px', border: '1px solid var(--border)' }}>
                    <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 4 }}>{l.name}</p>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {l.zones?.slice(0, 3).map(z => (
                        <span key={z._id || z.name} style={{ fontSize: 10, color: z.color || 'var(--text2)', fontWeight: 600 }}>
                          {z.name} ({z.totalCapacity})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 10 }}>
                  by {v.ownerId?.displayName || 'Organizer'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}