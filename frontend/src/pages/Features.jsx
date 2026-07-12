import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'

export default function Features() {
  const navigate = useNavigate();
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '100px' }}>
          <div style={{ flex: '1 1 500px', paddingRight: '40px', marginBottom: '40px' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '6px', color: '#4F8CFF', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
              Features
            </div>
            
            <h1 style={{ fontSize: '4rem', fontWeight: 900, color: th.text, letterSpacing: '-1.5px', margin: '0 0 16px 0', lineHeight: 1.1 }}>
              Powerful Features <br/>of <span style={{ color: '#4F8CFF' }}>Arogya.ai</span>
            </h1>

            {/* Heartbeat divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '32px 0' }}>
               <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, #4F8CFF)' }}></div>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(79,140,255,0.8))' }}>
                 <polyline points="0 10 10 10 15 5 20 18 25 10 40 10" />
               </svg>
               <div style={{ width: '80px', height: '2px', background: 'linear-gradient(270deg, transparent, #4F8CFF)' }}></div>
            </div>

            <p style={{ fontSize: '1.2rem', color: th.muted, lineHeight: 1.7, margin: 0, maxWidth: '500px' }}>
              Arogya.ai brings together intelligent technology and trusted healthcare information to help users find the right medical services quickly and easily.
            </p>
          </div>
          
          <div style={{ flex: '1 1 600px', display: 'flex', justifyContent: 'center', position: 'relative', height: '550px' }}>
            {/* Custom CSS/SVG Smartphone & Hospital Graphic */}
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Background Glow */}
              <div style={{ position: 'absolute', width: '400px', height: '400px', background: '#3b82f6', filter: 'blur(120px)', opacity: 0.15, zIndex: 0 }}></div>

              {/* Background 3D Hospital (SVG) */}
              <div style={{ position: 'absolute', zIndex: 1, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))', transform: 'translateY(-20px)' }}>
                <svg width="450" height="250" viewBox="0 0 450 250" fill="none">
                  {/* Base shadow */}
                  <ellipse cx="225" cy="230" rx="180" ry="20" fill="rgba(15,23,42,0.6)" filter="blur(10px)"/>
                  
                  {/* Left Wing */}
                  <rect x="50" y="100" width="100" height="120" fill="rgba(30,41,59,0.9)" stroke="rgba(96,165,250,0.3)" strokeWidth="2"/>
                  <rect x="50" y="90" width="100" height="10" fill="rgba(51,65,85,1)" stroke="rgba(96,165,250,0.3)" strokeWidth="2"/>
                  {[110, 150, 190].map(y => (
                    <g key={`l-${y}`}>
                      <rect x="65" y={y} width="20" height="20" fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.4)"/>
                      <rect x="115" y={y} width="20" height="20" fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.4)"/>
                    </g>
                  ))}

                  {/* Right Wing */}
                  <rect x="300" y="100" width="100" height="120" fill="rgba(30,41,59,0.9)" stroke="rgba(96,165,250,0.3)" strokeWidth="2"/>
                  <rect x="300" y="90" width="100" height="10" fill="rgba(51,65,85,1)" stroke="rgba(96,165,250,0.3)" strokeWidth="2"/>
                  {[110, 150, 190].map(y => (
                    <g key={`r-${y}`}>
                      <rect x="315" y={y} width="20" height="20" fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.4)"/>
                      <rect x="365" y={y} width="20" height="20" fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.4)"/>
                    </g>
                  ))}

                  {/* Main Building */}
                  <rect x="150" y="50" width="150" height="170" fill="rgba(15,23,42,0.95)" stroke="rgba(96,165,250,0.4)" strokeWidth="2"/>
                  <rect x="140" y="40" width="170" height="10" fill="rgba(30,41,59,1)" stroke="rgba(96,165,250,0.4)" strokeWidth="2"/>
                  
                  {/* Medical Cross */}
                  <rect x="210" y="60" width="30" height="30" fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.6)" strokeWidth="2"/>
                  <path d="M225 65 L225 85 M215 75 L235 75" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round"/>
                  
                  {/* Main Windows */}
                  {[100, 140].map(y => (
                    <g key={`m-${y}`}>
                      <rect x="170" y={y} width="30" height="25" fill="rgba(96,165,250,0.15)" stroke="rgba(96,165,250,0.5)"/>
                      <rect x="210" y={y} width="30" height="25" fill="rgba(96,165,250,0.15)" stroke="rgba(96,165,250,0.5)"/>
                      <rect x="250" y={y} width="30" height="25" fill="rgba(96,165,250,0.15)" stroke="rgba(96,165,250,0.5)"/>
                    </g>
                  ))}
                  
                  {/* Entrance */}
                  <path d="M190 220 L190 180 Q225 160 260 180 L260 220 Z" fill="rgba(96,165,250,0.05)" stroke="rgba(96,165,250,0.6)" strokeWidth="2"/>
                  <rect x="205" y="185" width="40" height="35" fill="rgba(96,165,250,0.2)"/>
                  
                  {/* Trees */}
                  <path d="M40 220 Q50 160 60 220 Z" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.5)"/>
                  <path d="M390 220 Q400 160 410 220 Z" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.5)"/>
                </svg>
              </div>

              {/* Floating Shield (Right) */}
              <div style={{ position: 'absolute', right: '40px', bottom: '80px', zIndex: 3, filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))', animation: 'float-slow 4s ease-in-out infinite alternate' }}>
                <svg width="80" height="90" viewBox="0 0 24 24" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(15,23,42,0.9)"></path>
                   <polyline points="9 12 11 14 15 10" stroke="#10b981" strokeWidth="2"></polyline>
                </svg>
              </div>

              {/* Floating Pin (Left) */}
              <div style={{ position: 'absolute', left: '60px', bottom: '120px', zIndex: 3, filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))', animation: 'float-slow 3.5s ease-in-out infinite alternate-reverse' }}>
                <svg width="70" height="70" viewBox="0 0 24 24" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="rgba(15,23,42,0.9)"></path>
                   <circle cx="12" cy="10" r="3" stroke="#0ea5e9" strokeWidth="2"></circle>
                </svg>
              </div>

              {/* Foreground Smartphone */}
              <div style={{ position: 'relative', zIndex: 10, width: '260px', height: '520px', background: 'rgba(15,23,42,0.85)', border: '8px solid rgba(51,65,85,1)', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(96,165,250,0.1)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100px', height: '24px', background: 'rgba(51,65,85,1)', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 11 }}></div>

                {/* Status Bar */}
                <div style={{ height: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', fontSize: '10px', color: '#cbd5e1', fontWeight: 600, paddingTop: '4px' }}>
                  <span>9:41</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                  </div>
                </div>

                {/* App Header */}
                <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>Arogya<span style={{ color: '#60a5fa' }}>.ai</span></span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </div>

                {/* Search Bar Faux */}
                <div style={{ padding: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', height: '36px', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '8px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style={{ width: '120px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}></div>
                  </div>
                </div>

                {/* App Grid */}
                <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {[
                    { c: '#3b82f6', t: 'Hospitals', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
                    { c: '#a855f7', t: 'AI Assistant', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg> },
                    { c: '#10b981', t: 'Nearby', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> },
                    { c: '#ef4444', t: 'Emergency', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> },
                    { c: '#6366f1', t: 'Departments', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
                    { c: '#14b8a6', t: 'Ayushman', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
                  ].map((btn, idx) => (
                    <div key={idx} style={{ background: `rgba(${btn.c === '#3b82f6' ? '59,130,246' : btn.c === '#a855f7' ? '168,85,247' : btn.c === '#10b981' ? '16,185,129' : btn.c === '#ef4444' ? '239,68,68' : btn.c === '#6366f1' ? '99,102,241' : '20,184,166'}, 0.05)`, border: `1px solid ${btn.c}40`, borderRadius: '16px', padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', boxShadow: `0 4px 12px ${btn.c}10` }}>
                      <div style={{ width: 36, height: 36, borderRadius: '12px', background: `rgba(${btn.c === '#3b82f6' ? '59,130,246' : btn.c === '#a855f7' ? '168,85,247' : btn.c === '#10b981' ? '16,185,129' : btn.c === '#ef4444' ? '239,68,68' : btn.c === '#6366f1' ? '99,102,241' : '20,184,166'}, 0.1)`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {btn.i}
                      </div>
                      <span style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: 600 }}>{btn.t}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Home Indicator */}
                <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}></div>
              </div>

              <style>{`
                @keyframes float-slow { 0% { transform: translateY(0px) } 100% { transform: translateY(-10px) } }
              `}</style>
            </div>
          </div>
        </div>

        {/* Key Features Title */}
        <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
           <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.5))' }}></div>
           <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', opacity: 0.5, transform: 'rotate(45deg)' }}></div>
           <h2 style={{ fontSize: '2rem', fontWeight: 800, color: th.text, margin: 0 }}>Key Features</h2>
           <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', opacity: 0.5, transform: 'rotate(45deg)' }}></div>
           <div style={{ height: '1px', width: '60px', background: 'linear-gradient(270deg, transparent, rgba(79,140,255,0.5))' }}></div>
        </div>

        {/* 9-Card Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {[
            { num: '01', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>, title: 'Smart Hospital Search', text: 'Find government and private hospitals by name, specialty, location, district, or state.', color: '#3b82f6' },
            { num: '02', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>, title: 'AI Health Assistant', text: 'Get instant answers to general healthcare questions through our intelligent AI chatbot.', color: '#10b981' },
            { num: '03', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, title: 'Nearby Hospital Finder', text: 'Locate hospitals near your current location with distance and navigation support.', color: '#8b5cf6' },
            { num: '04', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>, title: 'Emergency Services', text: 'Quickly access emergency hospitals, trauma centers, and important emergency contacts.', color: '#ef4444' },
            { num: '05', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path><circle cx="12" cy="8" r="4"></circle></svg>, title: 'Department Finder', text: 'Search hospitals by medical department such as Cardiology, Orthopedics, Pediatrics, Oncology, and more.', color: '#f97316' },
            { num: '06', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>, title: 'OPD Timings', text: 'View outpatient department schedules and hospital working hours.', color: '#0ea5e9' },
            { num: '07', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"></path><path d="M12 8c-2 0-3 1.5-3 3 0 2.5 3 4 3 4s3-1.5 3-4c0-1.5-1-3-3-3z"></path></svg>, title: 'Ayushman Bharat Information', text: 'Check eligibility, covered hospitals, and healthcare benefits under government schemes.', color: '#14b8a6' },
            { num: '08', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>, title: 'Hospital Ratings', text: 'Explore community ratings and reviews to make informed healthcare decisions.', color: '#eab308' },
            { num: '09', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><rect x="9" y="11" width="6" height="6" rx="1"></rect><path d="M12 11V9a2 2 0 1 0-4 0v2"></path></svg>, title: 'Secure & Reliable', text: 'Your privacy and data security are protected with modern security standards.', color: '#6366f1' },
            { num: '10', icon: <span style={{ fontSize: 24, filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.5))' }}>🧠</span>, title: 'AI Treatment Journey', text: 'An immersive, premium roadmap from symptom detection to complete recovery.', color: '#38bdf8', route: '/ai-treatment-journey' },
          ].map((item, idx) => (
            <div key={idx} onClick={() => { if (item.route) navigate(item.route) }} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s, background 0.2s', cursor: 'pointer', backdropFilter: 'blur(10px)' }} onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}} onMouseLeave={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}}>
              
              {/* Badge */}
              <div style={{ position: 'absolute', top: '24px', left: '24px', background: `rgba(${item.color === '#3b82f6' ? '59,130,246' : item.color === '#10b981' ? '16,185,129' : item.color === '#8b5cf6' ? '139,92,246' : item.color === '#ef4444' ? '239,68,68' : item.color === '#f97316' ? '249,115,22' : item.color === '#0ea5e9' ? '14,165,233' : item.color === '#14b8a6' ? '20,184,166' : item.color === '#eab308' ? '234,179,8' : '99,102,241'}, 0.15)`, color: item.color, padding: '4px 8px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
                {item.num}
              </div>

              {/* Icon */}
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: `rgba(${item.color === '#3b82f6' ? '59,130,246' : item.color === '#10b981' ? '16,185,129' : item.color === '#8b5cf6' ? '139,92,246' : item.color === '#ef4444' ? '239,68,68' : item.color === '#f97316' ? '249,115,22' : item.color === '#0ea5e9' ? '14,165,233' : item.color === '#14b8a6' ? '20,184,166' : item.color === '#eab308' ? '234,179,8' : '99,102,241'}, 0.05)`, border: `1px solid ${item.color}40`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', boxShadow: `0 0 30px ${item.color}20` }}>
                {item.icon}
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, marginBottom: '16px', margin: '0 0 16px 0', lineHeight: 1.4 }}>{item.title}</h3>
              <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
