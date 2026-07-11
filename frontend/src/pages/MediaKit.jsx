import React from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'

export default function MediaKit() {
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
              Media Kit
            </div>
            
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: th.text, letterSpacing: '-1.5px', margin: '0 0 16px 0', lineHeight: 1.1 }}>
              Media <br/><span style={{ color: '#818cf8', background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Resources</span>
            </h1>

            {/* Heartbeat divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '32px 0' }}>
               <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, #4F8CFF)' }}></div>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(79,140,255,0.8))' }}>
                 <polyline points="0 10 10 10 15 5 20 18 25 10 40 10" />
               </svg>
               <div style={{ width: '80px', height: '2px', background: 'linear-gradient(270deg, transparent, #4F8CFF)' }}></div>
            </div>

            <p style={{ fontSize: '1.2rem', color: th.text, lineHeight: 1.5, margin: '0 0 16px 0', fontWeight: 600 }}>
              Thank you for your interest in Arogya.ai.
            </p>

            <p style={{ fontSize: '1.05rem', color: th.muted, lineHeight: 1.7, margin: 0, maxWidth: '500px' }}>
              Here you'll find everything you need to learn more about our brand, mission, and platform.
            </p>
          </div>
          
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative', height: '400px', marginTop: '32px' }}>
            {/* Custom CSS/SVG Glowing Folder Graphic */}
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Background Glow */}
              <div style={{ position: 'absolute', width: '300px', height: '300px', background: '#3b82f6', filter: 'blur(100px)', opacity: 0.15 }}></div>
              
              {/* Dotted Abstract Circle */}
              <div style={{ position: 'absolute', width: '350px', height: '350px', border: '1px dashed rgba(59,130,246,0.3)', borderRadius: '50%', animation: 'spin 60s linear infinite' }}></div>
              <div style={{ position: 'absolute', width: '250px', height: '250px', border: '1px dashed rgba(59,130,246,0.2)', borderRadius: '50%', animation: 'spin 40s linear infinite reverse' }}></div>

              {/* Floating Icons */}
              <div style={{ position: 'absolute', top: '10%', left: '15%', width: 48, height: 48, borderRadius: '12px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(59,130,246,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(59,130,246,0.3)', animation: 'float 4s ease-in-out infinite alternate' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: 48, height: 48, borderRadius: '12px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(168,85,247,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(168,85,247,0.3)', animation: 'float 3.5s ease-in-out infinite alternate-reverse' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <div style={{ position: 'absolute', top: '15%', right: '15%', width: 48, height: 48, borderRadius: '12px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(16,185,129,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(16,185,129,0.3)', animation: 'float 4.5s ease-in-out infinite alternate' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
              </div>
              <div style={{ position: 'absolute', bottom: '30%', right: '10%', width: 48, height: 48, borderRadius: '12px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(14,165,233,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(14,165,233,0.3)', animation: 'float 3.8s ease-in-out infinite alternate-reverse' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>

              {/* Central Glowing Folder */}
              <div style={{ position: 'relative', width: '220px', height: '180px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))', zIndex: 10 }}>
                {/* Back of folder */}
                <svg width="220" height="180" viewBox="0 0 220 180" fill="none" style={{ position: 'absolute' }}>
                  <path d="M10 40 L60 40 L80 60 L210 60 C215 60 220 65 220 70 L220 170 C220 175 215 180 210 180 L10 180 C5 180 0 175 0 170 L0 50 C0 45 5 40 10 40 Z" fill="rgba(30,58,138,0.9)" stroke="#4F8CFF" strokeWidth="2"/>
                </svg>

                {/* Documents inside folder */}
                <div style={{ position: 'absolute', top: '-40px', left: '20px', width: '160px', height: '120px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.5)', borderRadius: '8px', backdropFilter: 'blur(8px)', transform: 'rotate(-5deg)' }}>
                  <div style={{ padding: '16px' }}>
                    <div style={{ width: '40px', height: '4px', background: '#60a5fa', marginBottom: '8px', borderRadius: '2px' }}></div>
                    <div style={{ width: '80px', height: '4px', background: 'rgba(96,165,250,0.5)', marginBottom: '8px', borderRadius: '2px' }}></div>
                    <div style={{ width: '60px', height: '4px', background: 'rgba(96,165,250,0.5)', borderRadius: '2px' }}></div>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '-20px', left: '40px', width: '140px', height: '100px', background: 'rgba(15,23,42,0.9)', border: '1px solid #60a5fa', borderRadius: '8px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', transform: 'rotate(5deg)' }}>
                  {/* Faux image inside document */}
                  <div style={{ margin: '8px', height: '50px', background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2))', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </div>
                  <div style={{ width: '60px', height: '4px', background: '#60a5fa', margin: '0 8px', borderRadius: '2px' }}></div>
                </div>

                {/* Front of folder */}
                <svg width="220" height="180" viewBox="0 0 220 180" fill="none" style={{ position: 'absolute' }}>
                  <path d="M0 80 L220 80 L210 180 L10 180 Z" fill="rgba(15,23,42,0.95)" stroke="#60a5fa" strokeWidth="2"/>
                </svg>

                {/* Arogya.ai Logo on folder */}
                <div style={{ position: 'absolute', bottom: '30px', left: '0', right: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><line x1="12" y1="8" x2="12" y2="14" stroke="#60a5fa"></line><line x1="9" y1="11" x2="15" y2="11" stroke="#60a5fa"></line></svg>
                  <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.5px' }}>Arogya<span style={{ color: '#60a5fa' }}>.ai</span></span>
                </div>
              </div>

              <style>{`
                @keyframes float { 0% { transform: translateY(0px) } 100% { transform: translateY(-15px) } }
                @keyframes spin { 100% { transform: rotate(360deg) } }
              `}</style>
            </div>
          </div>
        </div>

        {/* High-Contrast Glass Panel for Main Content */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '64px 40px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
          
          {/* Media Kit Includes Title */}
          <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', opacity: 0.5 }}></div>
             <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.5))' }}></div>
             <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: th.text, margin: 0 }}>Our Media Kit Includes</h2>
             <div style={{ height: '1px', width: '60px', background: 'linear-gradient(270deg, transparent, rgba(79,140,255,0.5))' }}></div>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8CFF', opacity: 0.5 }}></div>
          </div>

          {/* 8-Card Grid (4 Columns) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '80px' }}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="none" stroke="none"/><line x1="12" y1="9" x2="12" y2="15" stroke="#3b82f6"/><line x1="9" y1="12" x2="15" y2="12" stroke="#3b82f6"/></svg>, title: 'Official Logo', text: 'Download our official logos in various formats and sizes.', color: '#3b82f6' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><rect x="8" y="6" width="8" height="6" rx="1"></rect></svg>, title: 'Brand Guidelines', text: 'Learn how to use our brand assets, colors, typography, and more.', color: '#10b981' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><circle cx="12" cy="10" r="3"></circle></svg>, title: 'Product Screenshots', text: 'High-resolution screenshots of our platform and key features.', color: '#6366f1' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>, title: 'Company Overview', text: 'An overview of Arogya.ai, our mission, vision, and impact.', color: '#8b5cf6' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.53 4.53l-2.06-2.06a2 2 0 0 0-2.83 0L3.5 8.6a2 2 0 0 0 0 2.82l2.06 2.06"></path><path d="M16 11l4.5 4.5a2 2 0 0 1 0 2.83l-2.83 2.83a2 2 0 0 1-2.83 0L10.34 16"></path><path d="M16 11L10.34 16"></path><path d="M10 7l4 4"></path><path d="M12 21l3-3"></path><path d="M8 15l-3 3"></path></svg>, title: 'Press Releases', text: 'Latest announcements, news, and updates from Arogya.ai.', color: '#a855f7' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>, title: 'Founder Information', text: 'Meet our founders and learn about the team behind Arogya.ai.', color: '#60a5fa' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>, title: 'Brand Colors', text: 'Our official color palette to help maintain brand consistency.', color: '#d946ef' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><polyline points="9 14 12 17 15 14"></polyline></svg>, title: 'Marketing Assets', text: 'Banners, social media kits, icons, and other promotional resources.', color: '#8b5cf6' },
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s, background 0.2s', cursor: 'pointer' }} onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}} onMouseLeave={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: `rgba(${item.color === '#3b82f6' ? '59,130,246' : item.color === '#10b981' ? '16,185,129' : item.color === '#6366f1' ? '99,102,241' : item.color === '#8b5cf6' ? '139,92,246' : item.color === '#a855f7' ? '168,85,247' : item.color === '#60a5fa' ? '96,165,250' : '217,70,239'},0.1)`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', border: `1px solid ${item.color}40`, boxShadow: `0 0 20px ${item.color}20` }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: th.text, marginBottom: '12px', margin: '0 0 12px 0' }}>{item.title}</h3>
                <p style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Centered Media Inquiries Banner */}
          <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '32px', padding: '64px', textAlign: 'center', marginBottom: '64px', position: 'relative', overflow: 'hidden' }}>
            
            {/* Background pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5, pointerEvents: 'none' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                Media Inquiries
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: th.text, margin: '0 0 24px 0' }}>We're Here to Help</h2>
              <p style={{ color: th.muted, fontSize: '1rem', lineHeight: 1.6, margin: '0 0 32px 0' }}>
                For media inquiries, interview requests, partnership opportunities, or any other questions, feel free to contact our media team.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="mailto:media@arogya.ai" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(59,130,246,0.5)', borderRadius: '16px', color: '#60a5fa', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', marginBottom: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'background 0.2s, box-shadow 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.background='rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(59,130,246,0.2)'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(15,23,42,0.8)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(0,0,0,0.3)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  media@arogya.ai
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
              
              <p style={{ color: th.muted, fontSize: '0.9rem', margin: 0 }}>
                We'll get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Footer CTA Banner */}
          <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '24px', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path><path d="M9 12l2 2 4-4"></path></svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6', margin: '0 0 8px 0' }}>
                  Together, let's build a healthier future for all.
                </h3>
                <p style={{ color: th.muted, fontSize: '0.95rem', margin: 0 }}>
                  We appreciate your support in spreading our mission.
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => window.location.href = '/'}
              style={{ 
                background: 'transparent', border: '1px solid rgba(59,130,246,0.5)', color: '#60a5fa', 
                padding: '16px 32px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                transition: 'background 0.2s ease, color 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              Explore Arogya.ai
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
