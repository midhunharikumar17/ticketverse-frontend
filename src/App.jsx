import { useState, useEffect, useCallback } from 'react';
import API from './api/axios';
import { DUMMY } from './constants/data';
import Toast, { toast } from './components/ui/Toast';
import Btn from './components/ui/Btn';
import Icon from './components/ui/Icon';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import EventDetailModal from './components/EventDetailModal';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import CategoriesPage from './pages/CategoriesPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';
import VenuesPage from './pages/VenuesPage';
import { ic } from './constants/data';
import { uname } from './utils/helpers';

export default function App() {
  const [page, setPage]             = useState('home');
  const [catFilter, setCatFilter]   = useState('');
  const [events, setEvents]         = useState(DUMMY);
  const [user, setUser]             = useState(null);
  const [authOpen, setAuthOpen]     = useState(false);
  const [selEvent, setSelEvent]     = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [loading, setLoading]       = useState(true);

  // Restore session
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      API.get('/users/me')
        .then(r => setUser(r.data.data || r.data.user || r.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Load events
  useEffect(() => {
    API.get('/events?limit=50')
      .then(r => { const d = r.data.events || r.data.data || []; if (d.length) setEvents(d); })
      .catch(() => {});
  }, []);

  const logout = () => {
    API.post('/auth/logout').catch(() => {});
    localStorage.removeItem('token');
    setUser(null); setPage('home');
    toast('Logged out successfully', 'info');
  };

  const nav = useCallback((p, cat = '') => {
    setPage(p); setCatFilter(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openEvent = e => { setSelEvent(e); setDetailOpen(true); };

  // Guard admin
  useEffect(() => { if (page === 'admin' && user?.role !== 'admin') setPage('home'); }, [page, user]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon d={ic.ticket} size={22} color="#fff" />
      </div>
      <p style={{ color: 'var(--text2)', fontSize: 14 }}>Loading TicketVerse…</p>
    </div>
  );

  return (
    <>
      <Toast />
      <Navbar user={user} onLogin={() => setAuthOpen(true)} onLogout={logout} onNav={nav} page={page} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={setUser} />
      <EventDetailModal
        event={selEvent} open={detailOpen}
        onClose={() => setDetailOpen(false)}
        user={user}
        onLoginNeeded={() => { setDetailOpen(false); setAuthOpen(true); }}
        onBooked={() => {}}
      />

      <main style={{ minHeight: 'calc(100vh - 60px)' }}>
        {page === 'home'       && <HomePage events={events} onEventClick={openEvent} onNav={nav} />}
        {page === 'events'     && <EventsPage events={events} onEventClick={openEvent} initCategory={catFilter} />}
        {page === 'categories' && <CategoriesPage events={events} onEventClick={openEvent} onNav={nav} />}
        {page === 'venues'     && <VenuesPage user={user} onNav={nav} />}
        {page === 'admin'      && user?.role === 'admin' && <AdminPanel />}
        {page === 'profile'    && user && <ProfilePage user={user} onUpdate={setUser} onLogout={logout} onNav={nav} />}
        {page === 'profile'    && !user && (
          <div style={{ textAlign: 'center', padding: '80px var(--px)', color: 'var(--text2)' }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon d={ic.user} size={28} color="var(--text3)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-head)', marginBottom: 8 }}>Sign in to continue</h2>
            <p style={{ color: 'var(--text3)', marginBottom: 24, fontSize: 14 }}>
              Access your bookings, resale listings and more
            </p>
            <Btn onClick={() => setAuthOpen(true)} size="lg">Sign In or Create Account</Btn>
          </div>
        )}
      </main>

      {page !== 'home' && <Footer onNav={nav} />}
    </>
  );
}