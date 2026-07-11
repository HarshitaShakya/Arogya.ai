import React, { useState } from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'

export default function ContactUs() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '20px', color: '#4F8CFF', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
              Contact Us
            </div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: th.text, letterSpacing: '-2px', margin: '0 0 16px 0', lineHeight: 1.1 }}>
              We'd Love to <br/>Hear From <span style={{ color: '#4F8CFF' }}>You</span>
            </h1>
            
            {/* Heartbeat divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '24px 0' }}>
               <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #4F8CFF, transparent)' }}></div>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(79,140,255,0.8))' }}>
                 <polyline points="0 10 10 10 15 5 20 18 25 10 40 10" />
               </svg>
               <div style={{ width: '40px', height: '2px', background: 'linear-gradient(270deg, #4F8CFF, transparent)' }}></div>
            </div>

            <p style={{ fontSize: '1.15rem', color: th.muted, maxWidth: '400px', lineHeight: 1.6, margin: 0 }}>
              Whether you have questions, feedback, or need support, our team is here to help.
            </p>
          </div>
          
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', height: '350px', marginTop: '24px' }}>
            {/* Glowing Envelope Graphic */}
            <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Background Glows */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '220px', height: '220px', background: '#4F8CFF', filter: 'blur(90px)', opacity: 0.25 }}></div>
              
              {/* Orbiting rings */}
              <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(79,140,255,0.2)', transform: 'rotateX(60deg) rotateY(20deg)' }}></div>
              <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(79,140,255,0.1)', transform: 'rotateX(70deg) rotateY(-20deg)' }}></div>
              
              {/* Pedestal Base */}
              <div style={{ position: 'absolute', bottom: '0px', width: '200px', height: '50px', borderRadius: '50%', border: '2px solid rgba(79,140,255,0.5)', background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.2) 0%, transparent 70%)', boxShadow: '0 0 30px rgba(79,140,255,0.3)' }}></div>

              {/* Envelope SVG (Open with letter inside) */}
              <div style={{ position: 'relative', top: '-20px', filter: 'drop-shadow(0 0 20px rgba(79,140,255,0.5))' }}>
                <svg width="220" height="200" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Letter popping out */}
                  <path d="M40 70H180V170H40V70Z" fill="rgba(79,140,255,0.1)" stroke="#4F8CFF" strokeWidth="2" strokeLinejoin="round"/>
                  <line x1="60" y1="90" x2="160" y2="90" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="60" y1="110" x2="140" y2="110" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="60" y1="130" x2="160" y2="130" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="60" y1="150" x2="120" y2="150" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round"/>
                  
                  {/* Back of envelope */}
                  <path d="M10 110V180C10 185.5 14.5 190 20 190H200C205.5 190 210 185.5 210 180V110" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Flap open (pointing up) */}
                  <path d="M10 110L110 30L210 110" fill="rgba(15,23,42,0.9)" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Front of envelope flaps */}
                  <path d="M10 110L110 190L210 110" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Floating icons */}
              <div style={{ position: 'absolute', top: '20px', left: '30px', width: 32, height: 32, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(79,140,255,0.4)' }}>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#59E1FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><circle cx="8" cy="10" r="1" fill="#59E1FF"/><circle cx="12" cy="10" r="1" fill="#59E1FF"/><circle cx="16" cy="10" r="1" fill="#59E1FF"/></svg>
              </div>
              
              <div style={{ position: 'absolute', bottom: '80px', left: '-20px', width: 24, height: 24, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(79,140,255,0.4)' }}>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>

              <div style={{ position: 'absolute', top: '10px', right: '10px', width: 28, height: 28, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(79,140,255,0.4)' }}>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#59E1FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(79,140,255,0.2)', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', boxShadow: '0 0 20px rgba(79,140,255,0.15)' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: th.text, marginBottom: '12px' }}>Email</h3>
            <a href="mailto:support@arogya.ai" style={{ color: '#4F8CFF', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>support@arogya.ai</a>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(79,140,255,0.2)', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', boxShadow: '0 0 20px rgba(20,184,166,0.15)' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: th.text, marginBottom: '12px' }}>Support Hours</h3>
            <div style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6 }}>Monday – Sunday<br/>24x7 AI Assistance</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(79,140,255,0.2)', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', boxShadow: '0 0 20px rgba(168,85,247,0.15)' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: th.text, marginBottom: '12px' }}>AI Assistance</h3>
            <div style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6 }}>Available 24x7<br/>Instant Support</div>
          </div>

        </div>

        {/* Main Form & Sidebar Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', marginBottom: '40px' }}>
          
          {/* Contact Form */}
          <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: th.text, marginBottom: '8px', margin: 0 }}>Send us a message</h2>
            <p style={{ color: th.muted, fontSize: '0.95rem', marginBottom: '32px', margin: '8px 0 32px 0' }}>Fill out the form below and our team will get back to you.</p>

            {isSent ? (
              <div style={{ padding: '32px', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.3)', borderRadius: '16px', textAlign: 'center', color: '#14b8a6', animation: 'fadeIn 0.5s ease-out' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h3 style={{ margin: '0 0 8px 0' }}>Message Sent!</h3>
                <p style={{ margin: 0, color: th.muted, fontSize: '0.9rem' }}>Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', top: '16px', left: '16px', color: th.muted }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <input type="text" placeholder="Your Name" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '12px', color: th.text, fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#4F8CFF'}
                    onBlur={e => e.target.style.borderColor = 'rgba(79,140,255,0.3)'}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', top: '16px', left: '16px', color: th.muted }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <input type="email" placeholder="Email Address" required
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '12px', color: th.text, fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#4F8CFF'}
                    onBlur={e => e.target.style.borderColor = 'rgba(79,140,255,0.3)'}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', top: '16px', left: '16px', color: th.muted }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  <input type="text" placeholder="Subject" required
                    value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '12px', color: th.text, fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#4F8CFF'}
                    onBlur={e => e.target.style.borderColor = 'rgba(79,140,255,0.3)'}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', top: '16px', left: '16px', color: th.muted }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  <textarea placeholder="Your Message" required rows="5"
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: '12px', color: th.text, fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#4F8CFF'}
                    onBlur={e => e.target.style.borderColor = 'rgba(79,140,255,0.3)'}
                  />
                </div>

                <button 
                  type="submit"
                  style={{ 
                    background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', border: 'none', color: '#fff', 
                    padding: '16px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease', boxShadow: '0 8px 24px rgba(79,70,229,0.3)',
                    marginTop: '8px'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(79,70,229,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.3)' }}
                >
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
            {/* Background pattern */}
            <div style={{ position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, background: 'radial-gradient(circle, rgba(79,140,255,0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
            
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(79,140,255,0.05)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', boxShadow: '0 0 20px rgba(79,140,255,0.15)' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="none" stroke="none"/><path d="M8 12a4 4 0 1 0 8 0H8z" stroke="#4F8CFF"></path></svg>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: th.text, marginBottom: '24px' }}>We're here to help</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
              {[
                'Get assistance with hospital searches',
                'Report issues or bugs',
                'Share feedback and suggestions',
                'Partnerships and collaborations',
                'General inquiries'
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: th.muted, fontSize: '0.95rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Social Media Banner */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(79,140,255,0.25)', borderRadius: '24px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: th.text, marginBottom: '8px', margin: '0 0 8px 0' }}>Connect with us</h2>
            <p style={{ color: th.muted, fontSize: '0.95rem', marginBottom: '24px', margin: '0 0 24px 0' }}>You can also reach us through our social media channels.</p>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>,
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              ].map((icon, idx) => (
                <div key={idx} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#4F8CFF', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} onMouseEnter={e => { e.currentTarget.style.background = '#4F8CFF'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79,140,255,0.1)'; e.currentTarget.style.color = '#4F8CFF' }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
          
          {/* Smartphone Graphic */}
          <div style={{ position: 'relative', width: 200, height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1, filter: 'drop-shadow(0 0 15px rgba(79,140,255,0.3))' }}>
             {/* Phone outline */}
             <div style={{ position: 'absolute', width: 90, height: 160, borderRadius: 20, border: '2px solid #4F8CFF', transform: 'rotate(15deg)', background: 'rgba(15,23,42,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0' }}>
               <div style={{ width: 30, height: 4, borderRadius: 2, background: 'rgba(79,140,255,0.5)', marginBottom: 'auto' }}></div>
               <div style={{ width: 30, height: 4, borderRadius: 2, background: 'rgba(79,140,255,0.5)', marginTop: 'auto' }}></div>
             </div>
             
             {/* Floating bubbles */}
             <div style={{ position: 'absolute', top: 10, left: 10, width: 40, height: 40, borderRadius: '50%', background: 'rgba(79,140,255,0.2)', border: '1px solid rgba(79,140,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)', animation: 'float 3s ease-in-out infinite' }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="#4F8CFF" stroke="none"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
             </div>
             
             <div style={{ position: 'absolute', bottom: 10, right: 10, width: 44, height: 44, borderRadius: '50%', background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)', animation: 'float 4s ease-in-out infinite alternate' }}>
               <svg width="22" height="22" viewBox="0 0 24 24" fill="#a855f7" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
             </div>
             
             <style>{`
               @keyframes float { 0% { transform: translateY(0px) } 50% { transform: translateY(-10px) } 100% { transform: translateY(0px) } }
             `}</style>
          </div>

          {/* Abstract wave in banner */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', opacity: 0.15, pointerEvents: 'none' }}>
             <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none">
               <path d="M0 80 Q 100 10 200 80 T 400 80" fill="none" stroke="#4F8CFF" strokeWidth="1" />
               <path d="M0 120 Q 150 150 250 80 T 400 40" fill="none" stroke="#4F8CFF" strokeWidth="0.5" />
             </svg>
          </div>
        </div>

        {/* Footer Banner */}
        <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid ' + th.border, borderRadius: '24px', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(79,140,255,0.1)', border: '1px solid rgba(79,140,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: th.text, fontSize: '1rem', marginBottom: '4px' }}>Your trust matters to us.</div>
              <div style={{ color: th.muted, fontSize: '0.9rem' }}>We are committed to providing the best support experience with privacy and care.</div>
            </div>
          </div>
          
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: th.muted }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
          </div>
        </div>

      </div>
    </div>
  )
}
