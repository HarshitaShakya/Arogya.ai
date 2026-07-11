import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  const handleSubmit = async () => {
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/')
      } else {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
        if (error) throw error
        setSuccess('Account created! Check your email to verify.')
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const inputStyle = { width: '100%', padding: '12px 16px', backgroundColor: th.inputBg, border: '1px solid ' + th.border, borderRadius: 12, color: th.text, fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'all 0.3s ease' }

  return (
    <div style={{ backgroundColor: th.bg, backgroundImage: darkMode ? th.bgGradient : 'none', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, transition: 'all 0.3s ease' }}>
      <div style={{ backgroundColor: th.card, backdropFilter: darkMode ? th.blur : 'none', WebkitBackdropFilter: darkMode ? th.blur : 'none', border: '1px solid ' + th.border, borderRadius: 28, padding: 40, width: '100%', maxWidth: 440, boxShadow: th.shadow }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: th.accentGradient, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>🏥</div>
          <h1 style={{ color: th.text, fontWeight: 900, fontSize: 24, letterSpacing: -1, margin: 0 }}>Arogya<span style={{ color: th.accent2 }}>.ai</span></h1>
          <p style={{ color: th.muted, fontSize: 14, marginTop: 6 }}>{mode === 'login' ? 'Welcome back!' : 'Create your account'}</p>
        </div>

        <div style={{ display: 'flex', backgroundColor: th.inputBg, borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {['login', 'signup'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }}
              style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'inherit', transition: 'all 0.2s', background: mode === m ? th.accentGradient : 'transparent', color: mode === m ? '#ffffff' : th.muted }}>
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'signup' && (
            <input type="text" placeholder="Full Name" value={name}
              onChange={e => setName(e.target.value)} style={inputStyle} />
          )}
          <input type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={inputStyle} />
        </div>

        {error && (
          <div style={{ marginTop: 12, padding: '10px 14px', backgroundColor: darkMode ? 'rgba(248,113,113,0.12)' : '#fef2f2', border: '1px solid ' + (darkMode ? 'rgba(248,113,113,0.3)' : '#fca5a5'), borderRadius: 10, color: darkMode ? '#fca5a5' : '#ef4444', fontSize: 13 }}>
            ❌ {error}
          </div>
        )}

        {success && (
          <div style={{ marginTop: 12, padding: '10px 14px', backgroundColor: darkMode ? 'rgba(52,211,153,0.12)' : '#ecfdf5', border: '1px solid ' + (darkMode ? 'rgba(52,211,153,0.3)' : '#6ee7b7'), borderRadius: 10, color: darkMode ? '#6ee7b7' : '#10b981', fontSize: 13 }}>
            ✅ {success}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: '100%', marginTop: 20, padding: '14px', background: loading ? '#64748b' : th.accentGradient, color: '#fff', borderRadius: 14, border: 'none', fontWeight: 800, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', letterSpacing: -0.3, transition: 'all 0.3s ease' }}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
        </button>

        <p style={{ textAlign: 'center', color: th.muted, fontSize: 13, marginTop: 20 }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess('') }}
            style={{ background: 'none', border: 'none', color: th.accent2, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}