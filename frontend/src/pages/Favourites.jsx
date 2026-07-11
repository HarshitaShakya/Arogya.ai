import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'

export default function Favourites() {
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data?.user) { navigate('/auth'); return }
      const { data: favs } = await supabase.from('favourites').select('*').eq('user_id', data.user.id).order('created_at', { ascending: false })
      setFavourites(favs || [])
      setLoading(false)
    })
  }, [])

  const removeFavourite = async (id) => {
    await supabase.from('favourites').delete().eq('id', id)
    setFavourites(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div style={{ backgroundColor: th.bg, backgroundImage: darkMode ? th.bgGradient : 'none', minHeight: '100vh', transition: 'all 0.3s ease' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: th.text, letterSpacing: -1, marginBottom: 6 }}>❤️ My Favourites</h1>
          <p style={{ color: th.muted, fontSize: 14 }}>Your saved government hospitals</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: 40, height: 40, border: '3px solid ' + th.accent2, borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }}></div>
            <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
          </div>
        ) : favourites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', backgroundColor: th.card, borderRadius: 24, border: '1px solid ' + th.border }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>❤️</div>
            <p style={{ color: th.text, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>No favourites yet</p>
            <p style={{ color: th.muted, fontSize: 14, marginBottom: 24 }}>Save hospitals you visit frequently</p>
            <Link to="/search" style={{ padding: '12px 24px', background: th.accentGradient, color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>Find Hospitals →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {favourites.map(f => (
              <div key={f.id} style={{ backgroundColor: th.card, border: '1px solid ' + th.border, borderRadius: 20, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 44, height: 44, background: th.accentGradient, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏥</div>
                    <div>
                      <h3 style={{ color: th.text, fontWeight: 800, fontSize: 16, margin: 0 }}>{f.hospital_name}</h3>
                      <p style={{ color: th.muted, fontSize: 13, margin: 0 }}>📍 {f.hospital_district}</p>
                    </div>
                  </div>
                  <span style={{ padding: '4px 12px', backgroundColor: darkMode ? 'rgba(79,140,255,0.14)' : '#eff6ff', color: darkMode ? '#8ab4ff' : '#3b82f6', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{f.hospital_type}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to={'/hospital/' + f.hospital_id}
                    style={{ padding: '10px 16px', background: th.accentGradient, color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
                    View →
                  </Link>
                  <button onClick={() => removeFavourite(f.id)}
                    style={{ padding: '10px 14px', backgroundColor: darkMode ? 'rgba(248,113,113,0.12)' : '#fef2f2', color: darkMode ? '#fca5a5' : '#ef4444', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 18 }}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}