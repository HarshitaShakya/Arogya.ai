import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import AIChat from '../components/AIChat'

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

  const handleOAuthLogin = async (provider) => {
    setError('')
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider })
      if (error) throw error
    } catch (err) {
      setError(err.message)
    }
  }

  const inputStyle = { width: '100%', padding: '14px 16px 14px 44px', backgroundColor: 'rgba(15, 20, 35, 0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'all 0.3s ease' }

  return (
    <div style={{ backgroundColor: '#050710', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient glows matching the image */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(79,140,255,0.2) 0%, rgba(5,7,16,0) 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(157,78,221,0.2) 0%, rgba(5,7,16,0) 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(79,140,255,0.2) 0%, rgba(5,7,16,0) 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <style>{`
        .auth-input-container { position: relative; width: 100%; margin-top: 8px; }
        .auth-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); display: flex; align-items: center; pointer-events: none; }
        .auth-input-right-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); display: flex; align-items: center; cursor: pointer; transition: color 0.2s; }
        .auth-input-right-icon:hover { color: rgba(255,255,255,0.8); }
        .auth-input:focus { border-color: #5b73e8 !important; background-color: rgba(91, 115, 232, 0.05) !important; box-shadow: 0 0 0 1px #5b73e8 !important; }
        .auth-input:focus + .auth-input-icon { color: #5b73e8; }
        .auth-btn-hover { transition: all 0.2s ease; }
        .auth-btn-hover:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(91, 115, 232, 0.3); }
        .auth-btn-hover:active:not(:disabled) { transform: translateY(1px); }
        .social-btn { transition: all 0.2s ease; }
        .social-btn:hover { background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.2) !important; }
      `}</style>

      {/* Centered Form Container */}
      <div style={{ backgroundColor: 'rgba(12, 16, 28, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '40px 48px', width: '100%', maxWidth: 520, boxShadow: '0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)', position: 'relative', zIndex: 10, margin: '20px' }}>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#fff', fontWeight: 600, fontSize: 26, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: 0 }}>{mode === 'login' ? 'Sign in to your account to continue' : 'Sign up for an account to continue'}</p>
        </div>

        {/* Heart Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, rgba(79,140,255,0), #4F8CFF)' }} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, #9d4edd, rgba(157,78,221,0))' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {mode === 'signup' && (
            <div>
              <label style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>Full Name</label>
              <div className="auth-input-container">
                <input type="text" placeholder="Enter your full name" className="auth-input" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
                <div className="auth-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <label style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>Email Address</label>
            <div className="auth-input-container">
              <input type="email" placeholder="Enter your email" className="auth-input" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              <div className="auth-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </div>
          </div>

          <div>
            <label style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>Password</label>
            <div className="auth-input-container">
              <input type="password" placeholder="Enter your password" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} style={inputStyle} />
              <div className="auth-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <div className="auth-input-right-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </div>
            </div>
          </div>
        </div>

        {mode === 'login' && (
          <div style={{ textAlign: 'right', marginTop: 12 }}>
            <a href="#" style={{ color: '#5b73e8', fontSize: 12, textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>Forgot Password?</a>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 20, padding: '12px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 8, color: '#fca5a5', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>❌</span> {error}
          </div>
        )}

        {success && (
          <div style={{ marginTop: 20, padding: '12px 16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 8, color: '#6ee7b7', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✅</span> {success}
          </div>
        )}

        <button className="auth-btn-hover" onClick={handleSubmit} disabled={loading}
          style={{ width: '100%', marginTop: mode === 'login' ? 24 : 32, padding: '14px', background: loading ? '#334155' : 'linear-gradient(90deg, #5b73e8 0%, #9d4edd 100%)', color: '#fff', borderRadius: 8, border: 'none', fontWeight: 500, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          {!loading && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>}
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0 24px', gap: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <button className="social-btn" onClick={() => handleOAuthLogin('google')} style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontWeight: 500, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 16, height: 16 }} /> Google
          </button>
          <button className="social-btn" onClick={() => handleOAuthLogin('apple')} style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontWeight: 500, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.04C14.33 2 15.69 3.5 15.5 5.54C13.46 5.67 11.75 4 12 2.04M10.74 21.3C8.85 21.3 7.82 20.08 6.54 18.06C5 15.66 3 10.97 5.12 7.61C6.27 5.75 8.1 4.7 10 4.75C11.64 4.8 12.82 5.76 13.9 5.75C14.97 5.74 16.5 4.6 18.3 4.7C19.46 4.75 21.1 5.2 22.14 6.75C19 8.5 19.5 12.75 22 13.9C21.1 16.2 19.5 18.5 18.3 20.1C17.15 21.6 16 22 14.85 21.9C13.56 21.8 13.1 21 11.66 21C10.22 21 9.64 21.8 8.44 21.9C8 21.95 7.4 21.85 6.74 21.3Z"/></svg> Apple
          </button>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 32, marginBottom: 0 }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess('') }}
            style={{ background: 'none', border: 'none', color: '#5b73e8', fontWeight: 500, cursor: 'pointer', fontSize: 13, textDecoration: 'none', padding: 0 }}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>

      <AIChat />
    </div>
  )
}