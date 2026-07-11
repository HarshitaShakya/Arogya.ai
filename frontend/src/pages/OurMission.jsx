import React from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'
import { Link } from 'react-router-dom'

export default function OurMission() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ marginBottom: '64px', maxWidth: '800px' }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '8px', color: '#4F8CFF', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Our Mission
          </div>
          
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: th.text, letterSpacing: '-1.5px', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            Making <br/>
            <span style={{ color: '#818cf8', background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Healthcare Accessible</span>
          </h1>
          
          {/* Heartbeat divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '32px 0' }}>
             <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #60a5fa, #3b82f6)' }}></div>
             <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.8))' }}>
               <polyline points="0 10 10 10 15 5 20 18 25 10 40 10" />
             </svg>
             <div style={{ width: '80px', height: '2px', background: 'linear-gradient(270deg, transparent, #1e3a8a)' }}></div>
          </div>

          <p style={{ fontSize: '1.2rem', color: th.muted, lineHeight: 1.7, margin: 0, maxWidth: '600px' }}>
            Our mission is to bridge the gap between citizens and healthcare services through artificial intelligence and modern technology.
          </p>
        </div>
        
        {/* High-Contrast Glass Panel (replaces the harsh white background) */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '64px 40px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
          
          {/* We strive to Title */}
          <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', opacity: 0.5 }}></div>
             <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.5))' }}></div>
             <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: th.text, margin: 0 }}>We strive to:</h2>
             <div style={{ height: '1px', width: '40px', background: 'linear-gradient(270deg, transparent, rgba(79,140,255,0.5))' }}></div>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', opacity: 0.5 }}></div>
          </div>

          {/* Strive Grid (5 Columns) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '64px' }}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><path d="M16 11h6"></path><path d="M19 8v6"></path></svg>, title: 'Improve Healthcare Accessibility', color: '#6366f1', text: 'Ensure that every individual can easily find and access the healthcare services they need.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>, title: 'Simplify Hospital Discovery', color: '#10b981', text: 'Help users discover nearby government hospitals and healthcare facilities with ease.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="none" stroke="none"/><path d="M8 12a4 4 0 1 0 8 0H8z" stroke="#a855f7"></path></svg>, title: 'Increase Awareness of Free Services', color: '#a855f7', text: 'Promote government schemes and free healthcare services for every citizen.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>, title: 'Promote Preventive Healthcare', color: '#0ea5e9', text: 'Encourage early detection, healthy habits, and regular check-ups for a better tomorrow.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><path d="M9 10h6"></path><path d="M12 7v6"></path></svg>, title: 'Support Digital Healthcare Transformation', color: '#3b82f6', text: 'Leverage AI and technology to build a smarter, faster, and more efficient healthcare ecosystem.' },
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s, background 0.2s', cursor: 'default' }} onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}} onMouseLeave={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `rgba(${item.color === '#6366f1' ? '99,102,241' : item.color === '#10b981' ? '16,185,129' : item.color === '#a855f7' ? '168,85,247' : item.color === '#0ea5e9' ? '14,165,233' : '59,130,246'},0.1)`, border: `1px solid ${item.color}40`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: th.text, marginBottom: '12px', margin: '0 0 12px 0', minHeight: '40px' }}>{item.title}</h3>
                <p style={{ color: th.muted, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Deep Dark Quote Banner */}
          <div style={{ background: '#020617', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '24px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', marginBottom: '64px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            
            {/* Quote marks background */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '8rem', color: 'rgba(59,130,246,0.1)', fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none' }}>"</div>
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
              <p style={{ fontSize: '1.4rem', color: th.muted, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                Every feature we build is focused on helping people find the <span style={{ color: '#3b82f6', fontWeight: 700 }}>right treatment</span>, at the <span style={{ color: '#3b82f6', fontWeight: 700 }}>right place</span>, at the <span style={{ color: '#3b82f6', fontWeight: 700 }}>right time</span>.
              </p>
            </div>
            
            {/* Dotted India Map Graphic (Abstract approximation) */}
            <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1, opacity: 0.8 }}>
               <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 2px, transparent 2.5px)', backgroundSize: '12px 12px', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', transform: 'rotate(-15deg)' }}></div>
               <div style={{ position: 'absolute', width: 100, height: 100, background: '#3b82f6', filter: 'blur(50px)', opacity: 0.3 }}></div>
               <div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#fff', top: '30%', right: '30%', boxShadow: '0 0 10px 2px #fff, 0 0 20px 5px #3b82f6' }}></div>
               <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: '#fff', bottom: '40%', left: '40%', boxShadow: '0 0 8px 1px #fff, 0 0 15px 3px #3b82f6' }}></div>
            </div>
          </div>

          {/* Driving Impact Title */}
          <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', opacity: 0.5 }}></div>
             <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.5))' }}></div>
             <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: th.text, margin: 0 }}>Driving Impact, Creating Change</h2>
             <div style={{ height: '1px', width: '40px', background: 'linear-gradient(270deg, transparent, rgba(79,140,255,0.5))' }}></div>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', opacity: 0.5 }}></div>
          </div>

          {/* Stats Horizontal Grid (5 Columns) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '64px' }}>
            {[
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, value: '10M+', label: 'Users', sub: 'Trusting Arogya.ai', color: '#6366f1' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16h6"></path><path d="M12 13v6"></path></svg>, value: '30K+', label: 'Hospitals', sub: 'Information Available', color: '#10b981' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="none" stroke="none"/><path d="M8 12a4 4 0 1 0 8 0H8z" stroke="#a855f7"></path></svg>, value: '100+', label: 'Services', sub: 'Free & Government', color: '#a855f7' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>, value: '24/7', label: 'AI Assistance', sub: 'Always by your side', color: '#0ea5e9' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>, value: '100%', label: 'Commitment', sub: 'To a healthier India', color: '#10b981' },
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `rgba(${item.color === '#6366f1' ? '99,102,241' : item.color === '#10b981' ? '16,185,129' : item.color === '#a855f7' ? '168,85,247' : '14,165,233'},0.1)`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</div>
                    <div style={{ fontSize: '0.85rem', color: th.text, fontWeight: 600 }}>{item.label}</div>
                  </div>
                </div>
                <div style={{ color: th.muted, fontSize: '0.8rem', marginTop: '4px' }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '24px', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="none" stroke="none"/><path d="M8 12a4 4 0 1 0 8 0H8z" stroke="#3b82f6"></path></svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, margin: '0 0 8px 0' }}>
                  We believe healthcare is a <span style={{ color: '#3b82f6' }}>right</span>,<br/>not a privilege.
                </h3>
                <p style={{ color: th.muted, fontSize: '0.95rem', margin: 0 }}>
                  Together, we can build a healthier, smarter, and stronger India.
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={() => window.location.href = '/'}
                style={{ 
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', border: 'none', color: '#fff', 
                  padding: '16px 32px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease', boxShadow: '0 8px 24px rgba(79,70,229,0.3)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(79,70,229,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.3)' }}
              >
                Join Us in Our Mission
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <span style={{ color: th.muted, fontSize: '0.85rem' }}>Let's make a difference in millions of lives.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
