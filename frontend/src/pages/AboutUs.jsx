import React from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '64px' }}>
          <div style={{ flex: '1 1 500px', paddingRight: '40px' }}>
            <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '20px', color: '#4F8CFF', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
              About Us
            </div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: th.text, letterSpacing: '-2px', margin: '0 0 16px 0', lineHeight: 1.1 }}>
              About <span style={{ color: '#4F8CFF' }}>Arogya.ai</span>
            </h1>
            
            {/* Heartbeat divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '24px 0' }}>
               <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #4F8CFF)' }}></div>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(79,140,255,0.8))' }}>
                 <polyline points="0 10 10 10 15 5 20 18 25 10 40 10" />
               </svg>
               <div style={{ width: '60px', height: '2px', background: 'linear-gradient(270deg, transparent, #4F8CFF)' }}></div>
            </div>

            <p style={{ fontSize: '1.25rem', color: th.muted, lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Arogya.ai is an AI-powered healthcare platform designed to simplify access to government healthcare services across India.
            </p>
            <p style={{ fontSize: '1.1rem', color: th.muted, lineHeight: 1.6, margin: 0 }}>
              We bridge the gap between people and public healthcare by providing accurate information, intelligent assistance, and easy access to essential services.
            </p>
          </div>
          
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative', height: '450px', marginTop: '24px' }}>
            {/* Elaborate Glowing Graphic */}
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Pedestal Base */}
              <div style={{ position: 'absolute', bottom: '20px', width: '300px', height: '80px', borderRadius: '50%', border: '2px solid rgba(79,140,255,0.5)', background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.2) 0%, transparent 70%)', boxShadow: '0 0 40px rgba(79,140,255,0.4)', transform: 'rotateX(75deg)' }}></div>
              <div style={{ position: 'absolute', bottom: '15px', width: '340px', height: '90px', borderRadius: '50%', border: '1px solid rgba(79,140,255,0.2)', transform: 'rotateX(75deg)' }}></div>

              {/* Glass Panel */}
              <div style={{ position: 'absolute', bottom: '60px', width: '260px', height: '320px', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '24px', backdropFilter: 'blur(8px)', boxShadow: 'inset 0 0 40px rgba(79,140,255,0.1), 0 0 50px rgba(79,140,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                 {/* Dotted Abstract Map/Network inside panel */}
                 <div style={{ position: 'absolute', inset: 0, opacity: 0.6, backgroundImage: 'radial-gradient(circle at 50% 50%, #4F8CFF 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                 
                 {/* Large Heartbeat across the panel */}
                 <svg width="260" height="150" viewBox="0 0 260 150" fill="none" stroke="#59E1FF" strokeWidth="4" strokeLinejoin="round" style={{ position: 'absolute', filter: 'drop-shadow(0 0 10px rgba(89,225,255,0.8))' }}>
                   <polyline points="0 75 80 75 100 30 130 120 160 40 180 75 260 75" />
                 </svg>
              </div>

              {/* Floating Orbiting Icons */}
              <div style={{ position: 'absolute', top: '10%', left: '10%', width: 50, height: 50, borderRadius: '16px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(79,140,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(79,140,255,0.3)', animation: 'float 4s ease-in-out infinite alternate' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16h6"></path><path d="M12 13v6"></path></svg>
              </div>
              
              <div style={{ position: 'absolute', top: '20%', right: '5%', width: 50, height: 50, borderRadius: '16px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(244,63,94,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(244,63,94,0.3)', animation: 'float 3.5s ease-in-out infinite alternate-reverse' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><polyline points="8 12 11 15 16 9"></polyline></svg>
              </div>

              <div style={{ position: 'absolute', bottom: '30%', left: '5%', width: 50, height: 50, borderRadius: '16px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(168,85,247,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(168,85,247,0.3)', animation: 'float 4.5s ease-in-out infinite alternate' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>

              <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: 50, height: 50, borderRadius: '16px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(20,184,166,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(20,184,166,0.3)', animation: 'float 3.8s ease-in-out infinite alternate-reverse' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              
              <style>{`@keyframes float { 0% { transform: translateY(0px) } 100% { transform: translateY(-15px) } }`}</style>
            </div>
          </div>
        </div>

        {/* Stats Grid (4 Columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(79,140,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#4F8CFF', marginBottom: '4px', margin: 0 }}>10M+</h3>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: th.text, marginBottom: '8px' }}>Users</div>
            <div style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.5 }}>Trusted by millions across India</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(20,184,166,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16h6"></path><path d="M12 13v6"></path></svg>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#14b8a6', marginBottom: '4px', margin: 0 }}>30K+</h3>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: th.text, marginBottom: '8px' }}>Government Hospitals</div>
            <div style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.5 }}>Information from verified sources</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(168,85,247,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="none" stroke="none"/><path d="M8 12a4 4 0 1 0 8 0H8z" stroke="#a855f7"></path></svg>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginBottom: '4px', margin: 0 }}>100+</h3>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: th.text, marginBottom: '8px' }}>Healthcare Services</div>
            <div style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.5 }}>Free and government healthcare services</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(244,63,94,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginBottom: '4px', margin: 0 }}>24/7</h3>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: th.text, marginBottom: '8px' }}>AI Assistance</div>
            <div style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.5 }}>Intelligent support, anytime</div>
          </div>

        </div>

        {/* Mission & Vision Panel */}
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '40px', display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '64px', position: 'relative', flexWrap: 'wrap' }}>
          {/* Mission */}
          <div style={{ flex: '1 1 350px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, boxShadow: '0 0 20px rgba(79,140,255,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, marginBottom: '12px', margin: '0 0 12px 0' }}>Our Mission</h3>
              <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                To empower every individual with accurate healthcare information and AI-powered guidance, helping them make better health decisions and access the right care at the right time.
              </p>
            </div>
          </div>

          {/* Plus separator */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, padding: '0 16px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px dashed rgba(79,140,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px rgba(79,140,255,0.8))' }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
          </div>

          {/* Vision */}
          <div style={{ flex: '1 1 350px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, boxShadow: '0 0 20px rgba(168,85,247,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, marginBottom: '12px', margin: '0 0 12px 0' }}>Our Vision</h3>
              <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                To build India's most trusted and intelligent healthcare platform where technology meets compassion, making healthcare information accessible, inclusive, and easy for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
           <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #4F8CFF)' }}></div>
           <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: th.text, margin: 0 }}>What We Do</h2>
           <div style={{ height: '1px', width: '60px', background: 'linear-gradient(270deg, transparent, #4F8CFF)' }}></div>
        </div>

        {/* What We Do Grid (5 Columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '64px' }}>
          
          {[
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>, title: 'Discover', color: '#4F8CFF', text: 'Find nearby government hospitals and healthcare services with ease.' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="none" stroke="none"/><path d="M8 12a4 4 0 1 0 8 0H8z" stroke="#14b8a6"></path></svg>, title: 'Explore', color: '#14b8a6', text: 'Explore free healthcare services and government schemes.' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>, title: 'Get AI Guidance', color: '#a855f7', text: 'Receive intelligent healthcare guidance powered by AI.' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>, title: 'Trusted Information', color: '#3b82f6', text: 'Access accurate, verified, and up-to-date healthcare information.' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, title: 'Empower Everyone', color: '#10b981', text: 'We work towards making healthcare accessible for all.' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid ' + th.border, borderRadius: '20px', padding: '24px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: `rgba(${item.color === '#4F8CFF' ? '79,140,255' : item.color === '#14b8a6' ? '20,184,166' : item.color === '#a855f7' ? '168,85,247' : item.color === '#3b82f6' ? '59,130,246' : '16,185,129'},0.05)`, border: `1px solid rgba(${item.color === '#4F8CFF' ? '79,140,255' : item.color === '#14b8a6' ? '20,184,166' : item.color === '#a855f7' ? '168,85,247' : item.color === '#3b82f6' ? '59,130,246' : '16,185,129'},0.3)`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: item.color, marginBottom: '12px', margin: '0 0 12px 0' }}>{item.title}</h3>
              <p style={{ color: th.muted, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{item.text}</p>
            </div>
          ))}

        </div>

        {/* Why Choose Arogya Banner */}
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '0', display: 'flex', flexWrap: 'wrap', overflow: 'hidden', marginBottom: '32px' }}>
          {/* Left Graphic */}
          <div style={{ flex: '1 1 300px', background: 'radial-gradient(circle at center, rgba(79,140,255,0.1) 0%, transparent 70%)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', position: 'relative' }}>
             
             {/* Base */}
             <div style={{ position: 'absolute', bottom: '20px', width: '200px', height: '40px', borderRadius: '50%', border: '2px solid rgba(79,140,255,0.5)', background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.2) 0%, transparent 70%)', boxShadow: '0 0 30px rgba(79,140,255,0.3)' }}></div>
             
             {/* Shield */}
             <div style={{ filter: 'drop-shadow(0 0 20px rgba(79,140,255,0.6))', marginBottom: '20px' }}>
               <svg width="120" height="140" viewBox="0 0 120 140" fill="rgba(15,23,42,0.9)" xmlns="http://www.w3.org/2000/svg">
                 <path d="M60 5L110 25C110 75 85 115 60 135C35 115 10 75 10 25L60 5Z" stroke="#4F8CFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                 {/* Plus inside */}
                 <line x1="60" y1="45" x2="60" y2="85" stroke="#4F8CFF" strokeWidth="8" strokeLinecap="round" />
                 <line x1="40" y1="65" x2="80" y2="65" stroke="#4F8CFF" strokeWidth="8" strokeLinecap="round" />
               </svg>
             </div>
             
             {/* Orbiting particles */}
             <div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#fff', top: '30%', right: '20%', boxShadow: '0 0 10px 2px #fff' }}></div>
             <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: '#4F8CFF', bottom: '40%', left: '20%', boxShadow: '0 0 10px 2px #4F8CFF' }}></div>
          </div>
          
          {/* Right Checklist */}
          <div style={{ flex: '2 1 500px', padding: '48px 40px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: th.text, marginBottom: '32px', margin: '0 0 32px 0' }}>
              Why Choose <span style={{ color: '#4F8CFF' }}>Arogya.ai</span>?
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                'AI-powered intelligent assistance',
                'Focused on public healthcare',
                'Trusted government data sources',
                'Secure, private and reliable',
                'User-friendly and easy to use',
                'Always improving for you'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span style={{ color: th.muted, fontSize: '0.95rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Mission CTA */}
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="none" stroke="none"/><path d="M8 12a4 4 0 1 0 8 0H8z" stroke="#4F8CFF"></path></svg>
            </div>
            <div>
              <div style={{ color: th.text, fontSize: '1rem', lineHeight: 1.5 }}>
                At Arogya.ai, we are committed to using technology and AI for good—<br/>
                helping people lead healthier lives by simplifying access to healthcare.
              </div>
            </div>
          </div>
          
          <button 
            style={{ 
              background: 'transparent', border: '1px solid rgba(79,140,255,0.5)', color: '#4F8CFF', 
              padding: '12px 24px', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'background 0.2s ease, color 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,140,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Join Us in Our Mission
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

      </div>
    </div>
  )
}
