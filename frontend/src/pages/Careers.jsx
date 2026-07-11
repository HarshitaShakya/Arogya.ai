import React from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'

export default function Careers() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '80px' }}>
          <div style={{ flex: '1 1 500px', paddingRight: '40px' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '6px', color: '#4F8CFF', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
              Careers
            </div>
            
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: th.text, letterSpacing: '-1.5px', margin: '0 0 16px 0', lineHeight: 1.1 }}>
              Join Our <span style={{ color: '#4F8CFF' }}>Team</span>
            </h1>
            
            <p style={{ fontSize: '1.4rem', color: th.muted, lineHeight: 1.5, margin: '0 0 16px 0', fontWeight: 500 }}>
              We're building the future of healthcare technology.
            </p>

            {/* Heartbeat divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '32px 0' }}>
               <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, #4F8CFF)' }}></div>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(79,140,255,0.8))' }}>
                 <polyline points="0 10 10 10 15 5 20 18 25 10 40 10" />
               </svg>
               <div style={{ width: '80px', height: '2px', background: 'linear-gradient(270deg, transparent, #4F8CFF)' }}></div>
            </div>

            <p style={{ fontSize: '1.05rem', color: th.muted, lineHeight: 1.7, margin: 0, maxWidth: '500px' }}>
              We're on a mission to make healthcare accessible, intelligent, and easy for everyone. Join us in creating real impact through technology.
            </p>
          </div>
          
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative', height: '400px', marginTop: '32px' }}>
            {/* Custom CSS/SVG Office Neon Graphic */}
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', filter: 'drop-shadow(0 0 20px rgba(79,140,255,0.2))' }}>
              
              {/* Background Glow */}
              <div style={{ position: 'absolute', width: '300px', height: '200px', background: '#4F8CFF', filter: 'blur(100px)', opacity: 0.15 }}></div>
              
              {/* City Window Background */}
              <div style={{ position: 'absolute', top: '10%', right: '5%', width: '350px', height: '220px', border: '2px solid rgba(79,140,255,0.3)', borderRadius: '24px', background: 'rgba(15,23,42,0.8)', overflow: 'hidden', boxShadow: 'inset 0 0 40px rgba(79,140,255,0.1)' }}>
                 {/* City Skyline Silhouette */}
                 <svg width="350" height="150" viewBox="0 0 350 150" fill="rgba(79,140,255,0.1)" style={{ position: 'absolute', bottom: 0 }}>
                   <path d="M0 150 V80 H20 V60 H50 V100 H80 V40 H110 V90 H140 V50 H180 V110 H220 V30 H260 V90 H290 V70 H320 V120 H350 V150 Z" stroke="rgba(79,140,255,0.3)" strokeWidth="2"/>
                   <path d="M10 150 V100 H30 V90 H60 V120 H90 V70 H120 V110 H150 V80 H190 V130 H230 V60 H270 V110 H300 V90 H330 V130 H350 V150 Z" fill="rgba(79,140,255,0.05)"/>
                 </svg>
                 {/* Floating Heart Moon */}
                 <div style={{ position: 'absolute', top: '20px', right: '40px', filter: 'drop-shadow(0 0 15px rgba(79,140,255,0.8))' }}>
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                     <line x1="12" y1="8" x2="12" y2="14" stroke="#4F8CFF"></line>
                     <line x1="9" y1="11" x2="15" y2="11" stroke="#4F8CFF"></line>
                   </svg>
                 </div>
              </div>

              {/* Desk */}
              <div style={{ position: 'absolute', bottom: '15%', right: '0%', width: '400px', height: '10px', background: 'rgba(79,140,255,0.2)', border: '1px solid rgba(79,140,255,0.5)', borderRadius: '4px', boxShadow: '0 0 20px rgba(79,140,255,0.3)' }}></div>
              <div style={{ position: 'absolute', bottom: '0%', right: '320px', width: '8px', height: '15%', background: 'rgba(79,140,255,0.2)', border: '1px solid rgba(79,140,255,0.4)' }}></div>
              <div style={{ position: 'absolute', bottom: '0%', right: '40px', width: '8px', height: '15%', background: 'rgba(79,140,255,0.2)', border: '1px solid rgba(79,140,255,0.4)' }}></div>
              <div style={{ position: 'absolute', bottom: '0%', right: '180px', width: '8px', height: '15%', background: 'rgba(79,140,255,0.2)', border: '1px solid rgba(79,140,255,0.4)' }}></div>

              {/* Laptop */}
              <div style={{ position: 'absolute', bottom: '15%', right: '80px', width: '100px', height: '60px', background: 'rgba(15,23,42,0.9)', border: '2px solid #4F8CFF', borderRadius: '4px 4px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(79,140,255,0.4)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#59E1FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(89,225,255,0.8))' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><polyline points="12 8 12 11 14 13"></polyline></svg>
              </div>
              <div style={{ position: 'absolute', bottom: '13%', right: '60px', width: '140px', height: '6px', background: '#4F8CFF', borderRadius: '2px', boxShadow: '0 0 15px rgba(79,140,255,0.5)' }}></div>

              {/* Coffee Mug */}
              <div style={{ position: 'absolute', bottom: '15%', right: '30px', width: '20px', height: '24px', border: '2px solid rgba(79,140,255,0.6)', borderRadius: '2px', borderTop: 'none' }}></div>
              <div style={{ position: 'absolute', bottom: '17%', right: '24px', width: '6px', height: '14px', border: '2px solid rgba(79,140,255,0.6)', borderRadius: '2px', borderRight: 'none' }}></div>

              {/* Plant */}
              <div style={{ position: 'absolute', bottom: '15%', right: '220px', width: '30px', height: '20px', border: '2px solid rgba(79,140,255,0.6)', borderRadius: '0 0 15px 15px' }}></div>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="rgba(79,140,255,0.8)" strokeWidth="2" style={{ position: 'absolute', bottom: '22%', right: '215px' }}>
                <path d="M20 40 Q 10 20 20 10 Q 30 20 20 40" />
                <path d="M20 35 Q 5 25 10 15 Q 25 25 20 35" />
                <path d="M20 35 Q 35 25 30 15 Q 15 25 20 35" />
              </svg>

              {/* Ergonomic Office Chair */}
              <div style={{ position: 'absolute', bottom: '0%', left: '40px', zIndex: 2, filter: 'drop-shadow(0 0 15px rgba(79,140,255,0.3))' }}>
                <svg width="150" height="220" viewBox="0 0 150 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Backrest */}
                  <path d="M50 20 C 50 0, 100 0, 100 20 L 105 120 C 105 130, 45 130, 45 120 Z" fill="rgba(15,23,42,0.9)" stroke="#4F8CFF" strokeWidth="3"/>
                  <path d="M60 30 H 90 M 55 50 H 95 M 52 70 H 98 M 50 90 H 100" stroke="rgba(79,140,255,0.3)" strokeWidth="2"/>
                  {/* Seat */}
                  <path d="M40 120 C 30 120, 30 140, 40 140 H 120 C 130 140, 130 120, 120 120 Z" fill="rgba(15,23,42,0.9)" stroke="#4F8CFF" strokeWidth="3"/>
                  {/* Armrests */}
                  <path d="M 40 120 L 30 100 H 10 M 110 120 L 120 100 H 140" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Base pole */}
                  <line x1="80" y1="140" x2="80" y2="190" stroke="#4F8CFF" strokeWidth="6"/>
                  {/* Legs */}
                  <path d="M80 190 L 50 210 M80 190 L 110 210 M80 190 L 80 220" stroke="#4F8CFF" strokeWidth="4" strokeLinecap="round"/>
                  {/* Wheels */}
                  <circle cx="50" cy="210" r="4" fill="#4F8CFF"/>
                  <circle cx="110" cy="210" r="4" fill="#4F8CFF"/>
                  <circle cx="80" cy="220" r="4" fill="#4F8CFF"/>
                </svg>
              </div>

            </div>
          </div>
        </div>

        {/* Roles & Perks Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
             <div style={{ height: '2px', width: '60px', background: 'linear-gradient(90deg, transparent, #4F8CFF)' }}></div>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', boxShadow: '0 0 10px #4F8CFF' }}></div>
             <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, margin: 0 }}>We're always looking for passionate individuals in:</h2>
          </div>

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            
            {/* Roles Grid (Left Side) */}
            <div style={{ flex: '3 1 800px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
              {[
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>, title: 'Software Development', text: 'Build scalable, reliable, and impactful software solutions.', color: '#4F8CFF' },
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z"></path><path d="M12 3v18"></path><path d="M12 8h8"></path><path d="M12 16h8"></path><path d="M4 12h8"></path></svg>, title: 'Artificial Intelligence', text: 'Create intelligent systems that make healthcare smarter.', color: '#a855f7' },
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>, title: 'Data Science', text: 'Turn data into insights that drive better healthcare decisions.', color: '#14b8a6' },
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>, title: 'UI/UX Design', text: 'Design beautiful, intuitive experiences that users love.', color: '#d946ef' },
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><line x1="12" y1="8" x2="12" y2="14"></line><line x1="9" y1="11" x2="15" y2="11"></line></svg>, title: 'Healthcare Technology', text: 'Innovate at the intersection of healthcare and technology.', color: '#10b981' },
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>, title: 'Product Management', text: 'Build products that solve real problems for millions of people.', color: '#6366f1' },
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>, title: 'Research', text: 'Explore new ideas and technologies that shape the future.', color: '#ec4899' },
              ].map((role, idx) => (
                <div key={idx} style={{ background: 'rgba(15,23,42,0.6)', border: `1px solid ${role.color}40`, borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 10px 20px ${role.color}20`}} onMouseLeave={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'}}>
                  <div style={{ width: 64, height: 64, borderRadius: '20px', background: `${role.color}10`, border: `1px solid ${role.color}40`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', boxShadow: `0 0 20px ${role.color}20` }}>
                    {role.icon}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: role.color, marginBottom: '12px', margin: '0 0 12px 0', lineHeight: 1.4 }}>{role.title}</h3>
                  <p style={{ color: th.muted, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{role.text}</p>
                </div>
              ))}
            </div>

            {/* Why Join Us? Sidebar (Right Side) */}
            <div style={{ flex: '1 1 350px', background: 'rgba(15,23,42,0.8)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '40px 32px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, marginBottom: '32px' }}>Why Join Us?</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>, title: 'Meaningful Impact', text: 'Your work directly improves lives and communities.' },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, title: 'Collaborative Culture', text: 'Work with amazing people who care and support.' },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>, title: 'Continuous Learning', text: 'Grow your skills with learning and development.' },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.45.62 2.84 1.5 3.5.76.75 1.23 1.51 1.41 2.5"></path></svg>, title: 'Innovation-Driven Environment', text: 'Be part of a team that loves to innovate and experiment.' },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>, title: 'Flexible Work Opportunities', text: 'We value flexibility and work-life balance.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', margin: '0 0 4px 0' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: th.muted, margin: 0, lineHeight: 1.5 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Interested Application Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,58,138,0.4))', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '32px', padding: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '48px', marginBottom: '32px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
          
          {/* Abstract dotted background pattern */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(79,140,255,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5, WebkitMaskImage: 'linear-gradient(to right, transparent, black)', pointerEvents: 'none' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, flex: '1 1 400px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(79,140,255,0.15)', border: '1px solid rgba(79,140,255,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', boxShadow: '0 0 20px rgba(79,140,255,0.2)' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4F8CFF', margin: '0 0 12px 0' }}>Interested?</h2>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: th.text, margin: '0 0 24px 0' }}>We'd love to hear from you!</h3>
            
            <p style={{ color: th.muted, fontSize: '0.95rem', margin: '0 0 12px 0' }}>Email your resume to:</p>
            <a href="mailto:careers@arogya.ai" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px', background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)', border: '1px solid rgba(79,140,255,0.5)', borderRadius: '16px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem', marginBottom: '32px', boxShadow: '0 10px 30px rgba(59,130,246,0.3)', transition: 'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
              careers@arogya.ai
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            
            <p style={{ color: th.muted, fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
              Be a part of something bigger.<br/>Let's build the future of healthcare together.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            {/* Massive Glowing Envelope Graphic */}
            <div style={{ position: 'relative', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
              
              {/* Envelope Body */}
              <svg width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back flap */}
                <path d="M0 80L140 0L280 80V180H0V80Z" fill="rgba(30,58,138,0.8)" stroke="#4F8CFF" strokeWidth="2"/>
                {/* Document sticking out */}
                <rect x="50" y="-80" width="180" height="200" rx="12" fill="rgba(59,130,246,0.1)" stroke="#59E1FF" strokeWidth="2" style={{ backdropFilter: 'blur(8px)' }} />
                {/* Document details (Profile picture, lines, heart) */}
                <circle cx="100" cy="-30" r="24" stroke="#59E1FF" strokeWidth="2" fill="rgba(59,130,246,0.2)"/>
                <circle cx="100" cy="-35" r="8" fill="#59E1FF"/>
                <path d="M85 -15 Q 100 -25 115 -15" stroke="#59E1FF" strokeWidth="2"/>
                <line x1="140" y1="-40" x2="200" y2="-40" stroke="#59E1FF" strokeWidth="4" strokeLinecap="round"/>
                <line x1="140" y1="-20" x2="180" y2="-20" stroke="#59E1FF" strokeWidth="4" strokeLinecap="round"/>
                <line x1="70" y1="20" x2="210" y2="20" stroke="#59E1FF" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
                <line x1="70" y1="40" x2="210" y2="40" stroke="#59E1FF" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
                {/* Plus/Heart icon on document */}
                <circle cx="190" cy="50" r="16" fill="rgba(59,130,246,0.3)" stroke="#4F8CFF" strokeWidth="2"/>
                <line x1="190" y1="42" x2="190" y2="58" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round"/>
                <line x1="182" y1="50" x2="198" y2="50" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round"/>
                
                {/* Front Envelope flaps */}
                <path d="M0 80L140 150L280 80V180H0V80Z" fill="rgba(15,23,42,0.95)" stroke="#4F8CFF" strokeWidth="2"/>
                <path d="M0 180L140 100L280 180" fill="rgba(15,23,42,0.7)" stroke="#4F8CFF" strokeWidth="2"/>
              </svg>

              {/* Glowing Paper Airplane */}
              <div style={{ position: 'absolute', top: '-10px', left: '-120px', animation: 'fly 4s ease-in-out infinite alternate', filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.8))' }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-45deg)' }}>
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                {/* Airplane trail */}
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', top: '50px', left: '-40px', zIndex: -1 }}>
                   <path d="M 80 0 Q 30 50 0 100" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Twinkling stars */}
              <div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#fff', top: '-60px', left: '-40px', boxShadow: '0 0 10px 2px #fff', animation: 'twinkle 2s infinite alternate' }}></div>
              <div style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', top: '-80px', right: '-20px', boxShadow: '0 0 15px 3px #4F8CFF', animation: 'twinkle 3s infinite alternate' }}></div>
              <div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#a855f7', bottom: '40px', left: '-80px', boxShadow: '0 0 10px 2px #a855f7', animation: 'twinkle 2.5s infinite alternate' }}></div>

              <style>{`
                @keyframes fly { 0% { transform: translate(0, 0) rotate(-10deg) } 100% { transform: translate(20px, -20px) rotate(10deg) } }
                @keyframes twinkle { 0% { opacity: 0.2 } 100% { opacity: 1 } }
              `}</style>
            </div>
          </div>
        </div>

        {/* Diversity & Inclusion Footer */}
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: th.text, margin: '0 0 4px 0' }}>Diversity & Inclusion</h3>
              <p style={{ color: th.muted, fontSize: '0.85rem', margin: 0, maxWidth: '600px', lineHeight: 1.5 }}>
                We are an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all.
              </p>
            </div>
          </div>
          
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#3b82f6' }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
          </div>
        </div>

      </div>
    </div>
  )
}
