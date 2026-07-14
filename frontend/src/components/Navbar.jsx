import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAppStore, languages } from '../store/appStore'
import { supabase } from '../services/supabase'
import { getTheme } from '../utils/theme'
import { HeartPulse } from 'lucide-react'
import AppLogo from './AppLogo'
import EmergencyModal from './EmergencyModal'

export default function Navbar() {
  const { darkMode, toggleDark, language, setLanguage } = useAppStore()
  const [showLang, setShowLang] = useState(false)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showEmergency, setShowEmergency] = useState(false)
  const current = languages.find(l => l.code === language)
  const navigate = useNavigate()
  const location = useLocation()
  const th = getTheme(darkMode)

  useEffect(() => {
    document.body.style.backgroundColor = th.bg
    document.body.style.backgroundImage = th.bgGradient
    document.body.style.color = th.text
  }, [darkMode])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null))
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })
    return () => listener?.subscription?.unsubscribe()
  }, [])

  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); setShowUserMenu(false) }

  const nav = { position: 'sticky', top: 0, zIndex: 50, backgroundColor: darkMode ? 'rgba(11,16,32,0.65)' : 'rgba(253,252,248,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid ' + th.border, boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.04)', transition: 'all 0.3s ease' }
  const navLink = { color: th.muted, fontSize: 14, padding: '8px 16px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.2s ease' }
  const langBtn = { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', backgroundColor: th.inputBg, color: th.mutedStrong, borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all 0.2s ease', whiteSpace: 'nowrap' }
  const dropdown = { position: 'absolute', right: 0, top: '110%', width: 208, backgroundColor: th.cardSolid, border: '1px solid ' + th.border, borderRadius: 16, boxShadow: th.shadow, overflow: 'hidden', zIndex: 100 }

  const isActive = (path) => location.pathname === path;
  const getBasicLinkStyle = (path) => ({
    ...navLink,
    color: isActive(path) ? th.text : th.muted,
    fontWeight: isActive(path) ? 700 : 400,
    background: 'transparent',
    borderBottom: isActive(path) ? (darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(0,0,0,0.3)') : '2px solid transparent',
    borderRadius: 0
  });

  return (
    <nav style={nav}>
      <style>{`
        .emergency-btn { animation: pulse-emergency 2s ease infinite; white-space: nowrap; }
        @keyframes pulse-emergency { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); } }
      `}</style>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <AppLogo />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Link to="/" style={getBasicLinkStyle('/')}>Home</Link>
          <Link to="/search" style={getBasicLinkStyle('/search')}>Health Streak</Link>
          <Link to="/ai-analysis" style={{ ...navLink, color: '#3b82f6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', background: isActive('/ai-analysis') ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.05)', boxShadow: isActive('/ai-analysis') ? 'inset 0 0 0 1px rgba(59,130,246,0.5)' : 'none' }}>
            <span style={{ fontSize: '1.2em' }}>✨</span> AI Analysis
          </Link>
          <Link to="/ai-care-journey" style={{ ...navLink, color: '#a855f7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', background: isActive('/ai-care-journey') ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.05)', boxShadow: isActive('/ai-care-journey') ? 'inset 0 0 0 1px rgba(168,85,247,0.5)' : 'none' }}>
            <HeartPulse size={18} /> AI Care Workspace
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

          <button className="emergency-btn" onClick={() => setShowEmergency(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', backgroundColor: '#dc2626', color: '#ffffff', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
            🚨 Emergency
          </button>

          <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button style={langBtn} onClick={() => setShowLang(!showLang)}>
              🌐 {current?.native} <span style={{ fontSize: 10 }}>▾</span>
            </button>
            {showLang && (
              <div style={dropdown}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid ' + th.border }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: th.muted, textTransform: 'uppercase', letterSpacing: 2, margin: 0 }}>Language</p>
                </div>
                <div style={{ maxHeight: 256, overflowY: 'auto' }}>
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setShowLang(false) }}
                      style={{ width: '100%', textAlign: 'left', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, border: 'none', cursor: 'pointer', backgroundColor: language === lang.code ? 'rgba(79,140,255,0.12)' : 'transparent', color: language === lang.code ? th.accent2 : th.mutedStrong, fontWeight: language === lang.code ? 700 : 400 }}>
                      <span>{lang.native}</span>
                      {language === lang.code && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {user ? (
            <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ width: 38, height: 38, borderRadius: '50%', background: th.accentGradient, border: 'none', cursor: 'pointer', color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {user.email?.[0]?.toUpperCase()}
              </button>
              {showUserMenu && (
                <div style={{ ...dropdown, width: 200 }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid ' + th.border }}>
                    <p style={{ fontSize: 12, color: th.muted, margin: 0, fontWeight: 600 }}>{user.email}</p>
                  </div>
                  <Link to="/favourites" onClick={() => setShowUserMenu(false)}
                    style={{ display: 'block', padding: '12px 16px', color: th.mutedStrong, textDecoration: 'none', fontSize: 14, borderBottom: '1px solid ' + th.border }}>
                    ❤️ My Favourites
                  </Link>
                  <button onClick={handleLogout}
                    style={{ width: '100%', padding: '12px 16px', textAlign: 'left', backgroundColor: 'transparent', border: 'none', color: '#ef4444', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: th.accentGradient, color: '#ffffff', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Sign In →
            </Link>
          )}
        </div>
      </div>
      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
    </nav>
  )
}