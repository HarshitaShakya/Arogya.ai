import React from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'
import { Link } from 'react-router-dom'

export default function TermsOfUse() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: th.text, letterSpacing: '-2px', margin: '0 0 16px 0', lineHeight: 1.1 }}>
              Terms & <br /><span style={{ color: '#4F8CFF' }}>Conditions</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: th.muted, maxWidth: '400px', lineHeight: 1.6, margin: '24px 0 0 0' }}>
              By using Arogya.ai, you agree to these terms.
            </p>
          </div>
          
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', height: '350px' }}>
            {/* Glowing Document & Shield Graphic */}
            <div style={{ position: 'relative', width: '240px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              {/* Background Glows */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', background: '#4F8CFF', filter: 'blur(90px)', opacity: 0.3 }}></div>
              
              {/* Pedestal Base */}
              <div style={{ position: 'absolute', bottom: '-10px', width: '160px', height: '40px', borderRadius: '50%', border: '2px solid rgba(79,140,255,0.5)', background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.2) 0%, transparent 70%)', boxShadow: '0 0 30px rgba(79,140,255,0.3)' }}></div>
              <div style={{ position: 'absolute', bottom: '-5px', width: '200px', height: '50px', borderRadius: '50%', border: '1px solid rgba(79,140,255,0.2)', opacity: 0.5 }}></div>

              {/* Document SVG */}
              <svg width="180" height="240" viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 15px rgba(79,140,255,0.5))', position: 'absolute', top: '10px' }}>
                <path d="M20 20C20 8.9543 28.9543 0 40 0H110L160 50V220C160 231.046 151.046 240 140 240H40C28.9543 240 20 231.046 20 220V20Z" fill="rgba(15,23,42,0.8)" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M110 0V50H160" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="45" y1="60" x2="100" y2="60" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <line x1="45" y1="85" x2="135" y2="85" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <line x1="45" y1="110" x2="135" y2="110" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <line x1="45" y1="135" x2="135" y2="135" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <line x1="45" y1="160" x2="100" y2="160" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              </svg>

              {/* Glowing Shield floating over document */}
              <div style={{ position: 'absolute', right: '0px', bottom: '50px', filter: 'drop-shadow(0 0 20px rgba(79,140,255,0.9))' }}>
                <svg width="80" height="90" viewBox="0 0 80 90" fill="rgba(15,23,42,0.95)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 5L75 20C75 55 60 75 40 85C20 75 5 55 5 20L40 5Z" stroke="#59E1FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="25 45 35 55 55 35" stroke="#59E1FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Orbiting particles */}
              <div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#fff', top: '10%', right: '10%', boxShadow: '0 0 10px 2px #fff' }}></div>
              <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: '#4F8CFF', bottom: '30%', left: '-10%', boxShadow: '0 0 10px 2px #4F8CFF' }}></div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Users Agree To */}
        <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(79,140,255,0.25)', borderRadius: '24px', padding: '40px', marginBottom: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, margin: 0 }}>Users Agree To</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            
            <div>
              <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', boxShadow: '0 0 20px rgba(79,140,255,0.15)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4F8CFF', marginBottom: '12px' }}>Provide accurate<br/>information</h3>
              <p style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>You agree to provide accurate, current, and complete information while using Arogya.ai services.</p>
            </div>

            <div>
              <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', boxShadow: '0 0 20px rgba(168,85,247,0.15)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a855f7', marginBottom: '12px' }}>Use the platform<br/>responsibly</h3>
              <p style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>You agree to use the platform in a safe, ethical, and responsible manner for the benefit of yourself and others.</p>
            </div>

            <div>
              <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', boxShadow: '0 0 20px rgba(20,184,166,0.15)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path><polyline points="12 8 12 11 14 13"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#14b8a6', marginBottom: '12px' }}>Avoid misuse of<br/>healthcare resources</h3>
              <p style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>You agree not to misuse, abuse, or attempt to gain unauthorized access to any part of the platform or its services.</p>
            </div>

          </div>
        </div>

        {/* SECTION 2: Disclaimer */}
        <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '24px', padding: '40px', marginBottom: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(244,63,94,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(244,63,94,0.3)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, margin: 0 }}>Disclaimer</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Healthcare information provided by Arogya.ai is for <span style={{ color: '#4F8CFF', fontWeight: 600 }}>informational purposes only</span> and should not replace consultation with qualified medical professionals.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              </div>
              <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Arogya.ai is <span style={{ color: '#a855f7', fontWeight: 600 }}>not responsible</span> for medical decisions made solely based on AI recommendations.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION 3: Our Commitment Banner */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(20,184,166,0.25)', borderRadius: '24px', padding: '32px 40px', display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
          </div>
          <div style={{ flex: 1, zIndex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#14b8a6', margin: '0 0 8px 0' }}>Our Commitment</h3>
            <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, margin: 0, maxWidth: '600px' }}>
              We are committed to transparency, accuracy, and the responsible use of AI to improve healthcare access for all.
            </p>
          </div>
          
          {/* Abstract Wave Background */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', opacity: 0.15, pointerEvents: 'none' }}>
             <svg width="100%" height="100%" viewBox="0 0 500 120" preserveAspectRatio="none">
               <path d="M0 60 Q 125 10 250 60 T 500 60" fill="none" stroke="#14b8a6" strokeWidth="2" />
               <path d="M0 80 Q 125 30 250 80 T 500 80" fill="none" stroke="#14b8a6" strokeWidth="1" />
               <path d="M0 100 Q 125 50 250 100 T 500 100" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
             </svg>
          </div>
        </div>

        {/* SECTION 4: CTA Footer */}
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '24px', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '32px', boxShadow: '0 0 30px rgba(99,102,241,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: th.text, fontSize: '1.1rem', marginBottom: '4px' }}>By continuing to use Arogya.ai,</div>
              <div style={{ color: th.muted, fontSize: '0.9rem' }}>you acknowledge that you have read, understood, and agree to these Terms & Conditions.</div>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'}
            style={{ 
              background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', border: 'none', color: '#fff', 
              padding: '12px 32px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease', boxShadow: '0 8px 24px rgba(79,70,229,0.3)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(79,70,229,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.3)' }}
          >
            I Agree
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        {/* SECTION 5: Final Link */}
        <div style={{ textAlign: 'center', color: th.muted, fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Your trust matters. Read our <Link to="/info/privacy-policy" style={{ color: '#4F8CFF', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link> to learn how we protect your data.
        </div>

      </div>
    </div>
  )
}
