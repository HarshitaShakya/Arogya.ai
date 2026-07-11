import React from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'
import { useNavigate } from 'react-router-dom'

export default function PrivacyPolicy() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '60px' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: th.text, letterSpacing: '-2px', margin: '0 0 32px 0', lineHeight: 1.1 }}>
              Privacy <span style={{ color: '#4F8CFF' }}>Policy</span>
            </h1>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #4F8CFF, transparent)', marginBottom: '32px' }}></div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: th.text, margin: '0 0 16px 0' }}>
              Your Privacy Matters
            </h2>
            <p style={{ fontSize: '1.1rem', color: th.muted, maxWidth: '400px', lineHeight: 1.6, margin: 0 }}>
              At Arogya.ai, we respect and protect your personal information.
            </p>
          </div>
          
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', height: '300px' }}>
            {/* Glowing Shield Graphic */}
            <div style={{ position: 'relative', width: '240px', height: '260px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Background Glows */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '180px', height: '180px', background: '#4F8CFF', filter: 'blur(80px)', opacity: 0.4 }}></div>
              <div style={{ position: 'absolute', bottom: '-20px', width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, #4F8CFF, transparent)', boxShadow: '0 0 20px #4F8CFF' }}></div>
              <div style={{ position: 'absolute', bottom: '-40px', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.5), transparent)' }}></div>
              
              {/* Outer Shield Outline */}
              <svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 15px rgba(79,140,255,0.8))' }}>
                <path d="M100 10L180 40C180 120 160 190 100 230C40 190 20 120 20 40L100 10Z" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M100 10L180 40C180 120 160 190 100 230C40 190 20 120 20 40L100 10Z" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              </svg>
              
              {/* Inner Lock */}
              <div style={{ position: 'absolute' }}>
                <svg width="60" height="70" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  <circle cx="12" cy="16" r="1"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #4F8CFF)' }}></div>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: th.text }}>How We Handle Your Information</span>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(270deg, transparent, #4F8CFF)' }}></div>
        </div>

        {/* 3-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          
          {/* Card 1: Collect */}
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(89,225,255,0.2)', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(20, 184, 166, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 0 20px rgba(20,184,166,0.2)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <circle cx="9" cy="15" r="2"></circle>
                <line x1="14" y1="15" x2="18" y2="15"></line>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#14b8a6', marginBottom: '12px' }}>Information We Collect</h3>
            <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              We collect only the information necessary to provide you with a better experience.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Basic profile information', 'Search preferences', 'Hospital searches', 'Location (only with permission)', 'Device information'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: th.text, fontSize: '0.95rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Use */}
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(79,140,255,0.2)', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', border: '1px solid rgba(79,140,255,0.3)', boxShadow: '0 0 20px rgba(79,140,255,0.2)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#4F8CFF', marginBottom: '12px' }}>How We Use Your Data</h3>
            <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Your data helps us improve and personalize your healthcare journey.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Improve hospital recommendations', 'Personalize your experience', 'Enhance AI responses', 'Improve platform performance'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: th.text, fontSize: '0.95rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Never */}
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(244,63,94,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', border: '1px solid rgba(244,63,94,0.3)', boxShadow: '0 0 20px rgba(244,63,94,0.2)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f43f5e', marginBottom: '12px' }}>We Never</h3>
            <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              We are committed to keeping your information safe and private.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Sell your personal data', 'Share sensitive information without consent', 'Use your information for unauthorized purposes'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: th.text, fontSize: '0.95rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Encrypted Banner */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '24px', padding: '40px', display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79,140,255,0.1)', border: '2px solid rgba(79,140,255,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, boxShadow: '0 0 30px rgba(79,140,255,0.2)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div style={{ flex: 1, zIndex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: th.text, margin: '0 0 8px 0' }}>Your data remains encrypted and protected.</h3>
            <p style={{ color: th.muted, fontSize: '1rem', margin: 0 }}>We use industry-standard security measures to ensure your information is always safe with us.</p>
          </div>
          <div style={{ zIndex: 1 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(79,140,255,0.8))' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
          </div>
          
          {/* Abstract Data Lines Background */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', opacity: 0.3, pointerEvents: 'none' }}>
             <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none">
               <path d="M0 80 Q 100 10 200 80 T 400 80" fill="none" stroke="#4F8CFF" strokeWidth="1" strokeDasharray="4 4" />
               <path d="M0 120 Q 150 150 250 80 T 400 40" fill="none" stroke="#4F8CFF" strokeWidth="1" strokeDasharray="2 6" />
               <path d="M0 40 Q 50 100 200 60 T 400 120" fill="none" stroke="#4F8CFF" strokeWidth="0.5" />
             </svg>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', background: 'rgba(15,23,42,0.4)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '40px', marginBottom: '32px' }}>
          
          <div>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h4 style={{ color: th.text, fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>You're in Control</h4>
            <p style={{ color: th.muted, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>You can update or delete your information anytime from your account settings.</p>
          </div>

          <div>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h4 style={{ color: th.text, fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Secure & Encrypted</h4>
            <p style={{ color: th.muted, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>All data is encrypted and stored securely using advanced technologies.</p>
          </div>

          <div>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <h4 style={{ color: th.text, fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Transparency</h4>
            <p style={{ color: th.muted, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>We are open about our practices and how your data is used.</p>
          </div>

          <div>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
            </div>
            <h4 style={{ color: th.text, fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Trusted & Reliable</h4>
            <p style={{ color: th.muted, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>We follow strict privacy practices and comply with data protection laws.</p>
          </div>

        </div>

        {/* Support Footer */}
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid ' + th.border, borderRadius: '16px', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: th.text, fontSize: '1rem' }}>Your trust is our priority.</div>
              <div style={{ color: th.muted, fontSize: '0.9rem' }}>If you have any questions about our privacy practices, feel free to reach out.</div>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = 'mailto:support@arogya.ai'}
            style={{ 
              background: 'transparent', border: '1px solid rgba(79,140,255,0.5)', color: '#fff', 
              padding: '10px 24px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,140,255,0.1)'; e.currentTarget.style.borderColor = '#4F8CFF' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(79,140,255,0.5)' }}
          >
            Contact Support
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

      </div>
    </div>
  )
}
