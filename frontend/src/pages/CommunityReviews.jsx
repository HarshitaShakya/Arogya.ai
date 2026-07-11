import React from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'

export default function CommunityReviews() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '80px' }}>
          <div style={{ flex: '1 1 500px', paddingRight: '40px', marginBottom: '40px' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '6px', color: '#60a5fa', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
              Community Reviews
            </div>
            
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: th.text, letterSpacing: '-1.5px', margin: '0 0 16px 0', lineHeight: 1.1 }}>
              Trusted by Patients <br/>
              <span style={{ color: '#10b981', background: 'linear-gradient(90deg, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Across India
              </span>
            </h1>

            {/* Heartbeat divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '32px 0' }}>
               <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, #10b981)' }}></div>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.8))' }}>
                 <polyline points="0 10 10 10 15 5 20 18 25 10 40 10" />
               </svg>
               <div style={{ width: '80px', height: '2px', background: 'linear-gradient(270deg, transparent, #10b981)' }}></div>
            </div>

            <p style={{ fontSize: '1.2rem', color: th.muted, lineHeight: 1.7, margin: '0 0 16px 0', maxWidth: '500px' }}>
              Thousands of users rely on Arogya.ai to discover healthcare services with confidence.
            </p>
            <p style={{ fontSize: '1.2rem', color: th.muted, lineHeight: 1.7, margin: 0, maxWidth: '500px' }}>
              Here's what our community has to say.
            </p>
          </div>
          
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative', height: '450px' }}>
            {/* Custom CSS/SVG Map Graphic */}
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Background Glow */}
              <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', zIndex: 0 }}></div>

              {/* Orbit Rings */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
                <svg width="500" height="400" viewBox="0 0 500 400" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                   <ellipse cx="250" cy="220" rx="220" ry="80" fill="none" stroke="rgba(96,165,250,0.15)" strokeWidth="1.5" transform="rotate(-10 250 220)" />
                   <ellipse cx="250" cy="220" rx="180" ry="60" fill="none" stroke="rgba(96,165,250,0.2)" strokeWidth="1" transform="rotate(5 250 220)" />
                   {/* Glowing dust */}
                   <circle cx="80" cy="180" r="2" fill="#60a5fa" filter="blur(1px)" />
                   <circle cx="420" cy="140" r="1.5" fill="#60a5fa" />
                   <circle cx="150" cy="280" r="2" fill="#3b82f6" />
                   <circle cx="380" cy="260" r="2.5" fill="#60a5fa" filter="blur(1px)" />
                </svg>
              </div>

              {/* 3D Pedestal */}
              <div style={{ position: 'absolute', bottom: '40px', zIndex: 2 }}>
                {/* Base shadow */}
                <div style={{ position: 'absolute', bottom: '-20px', left: '-150px', width: '300px', height: '40px', background: 'rgba(0,0,0,0.6)', filter: 'blur(15px)', borderRadius: '50%' }}></div>
                {/* Bottom layer */}
                <div style={{ position: 'absolute', bottom: '0px', left: '-140px', width: '280px', height: '40px', background: '#0f172a', border: '2px solid rgba(59,130,246,0.6)', borderRadius: '50%', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}></div>
                {/* Cylinder body */}
                <div style={{ position: 'absolute', bottom: '20px', left: '-135px', width: '270px', height: '30px', background: 'linear-gradient(90deg, #1e3a8a, #0f172a 50%, #1e3a8a)' }}></div>
                {/* Top layer */}
                <div style={{ position: 'absolute', bottom: '35px', left: '-135px', width: '270px', height: '50px', background: 'radial-gradient(ellipse at center, #1e3a8a, #0f172a)', border: '2px solid #3b82f6', borderRadius: '50%', boxShadow: 'inset 0 0 20px rgba(59,130,246,0.5), 0 0 15px rgba(59,130,246,0.4)' }}></div>
              </div>

              {/* Plant on Pedestal */}
              <div style={{ position: 'absolute', bottom: '70px', right: '40px', zIndex: 11, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}>
                <svg width="60" height="80" viewBox="0 0 60 80">
                  {/* Leaves */}
                  <path d="M30 50 Q10 30 20 10 Q35 25 30 50" fill="#059669" />
                  <path d="M30 50 Q45 20 50 25 Q35 45 30 50" fill="#10b981" />
                  <path d="M30 50 Q15 40 10 30 Q25 35 30 50" fill="#34d399" />
                  <path d="M30 50 Q45 40 50 35 Q40 45 30 50" fill="#059669" />
                  {/* Pot */}
                  <path d="M15 50 L45 50 Q50 70 40 70 L20 70 Q10 70 15 50 Z" fill="#f8fafc" />
                  <path d="M15 50 L45 50 Q50 70 40 70 L20 70 Q10 70 15 50 Z" fill="url(#pot-shadow)" />
                  <defs>
                    <linearGradient id="pot-shadow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
                      <stop offset="80%" stopColor="transparent" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Big Center Shield */}
              <div style={{ position: 'absolute', bottom: '75px', zIndex: 10, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(59,130,246,0.4))', animation: 'float-slow 4s ease-in-out infinite alternate' }}>
                <svg width="140" height="160" viewBox="0 0 24 24" fill="none">
                  {/* Outer Glowing Edge */}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5"></path>
                  {/* Inner Gradient */}
                  <path d="M12 21s7.5-3.5 7.5-9V5.5l-7.5-2.8-7.5 2.8V12c0 5.5 7.5 9 7.5 9z" fill="url(#main-shield-grad)"></path>
                  {/* Inner Highlight Line */}
                  <path d="M12 20s6.5-3 6.5-8V6l-6.5-2.5L5.5 6v6c0 5 6.5 8 6.5 8z" stroke="#3b82f6" strokeWidth="0.5"></path>
                  <defs>
                    <linearGradient id="main-shield-grad" x1="0" y1="0" x2="0" y2="24">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                  </defs>
                  {/* White Cross */}
                  <path d="M10.5 8 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 v-3 h3 v-3 z" fill="#f8fafc" filter="drop-shadow(0 0 10px rgba(255,255,255,0.5))" />
                </svg>
              </div>

              {/* Floating Element: 5 Stars */}
              <div style={{ position: 'absolute', top: '50px', left: '30px', background: 'rgba(30,58,138,0.7)', border: '1px solid rgba(59,130,246,0.4)', borderRadius: '16px', padding: '12px 16px', display: 'flex', gap: '4px', zIndex: 4, animation: 'float-slow 5s ease-in-out infinite alternate', boxShadow: '0 10px 20px rgba(0,0,0,0.4), inset 0 0 10px rgba(96,165,250,0.2)', backdropFilter: 'blur(8px)' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                <div style={{ position: 'absolute', bottom: '-8px', right: '24px', width: 14, height: 14, background: 'rgba(30,58,138,0.7)', borderBottom: '1px solid rgba(59,130,246,0.4)', borderRight: '1px solid rgba(59,130,246,0.4)', transform: 'rotate(45deg)' }}></div>
              </div>

              {/* Floating Element: Group/Community */}
              <div style={{ position: 'absolute', top: '160px', left: '10px', background: 'rgba(30,58,138,0.5)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '20px', width: '70px', height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 4, animation: 'float-slow 4.2s ease-in-out infinite alternate-reverse', boxShadow: '0 10px 20px rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#93c5fd" stroke="none">
                   <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                   <circle cx="9" cy="7" r="4"></circle>
                   <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                   <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>

              {/* Floating Element: Heart Bubble */}
              <div style={{ position: 'absolute', top: '40px', right: '40px', background: 'rgba(16,185,129,0.8)', border: '1px solid rgba(52,211,153,0.5)', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 4, animation: 'float-slow 3.8s ease-in-out infinite alternate', boxShadow: '0 10px 20px rgba(0,0,0,0.4), inset 0 0 15px rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <div style={{ position: 'absolute', bottom: '-8px', left: '16px', width: 14, height: 14, background: 'rgba(16,185,129,0.8)', borderBottom: '1px solid rgba(52,211,153,0.5)', borderLeft: '1px solid rgba(52,211,153,0.5)', transform: 'rotate(-45deg)' }}></div>
              </div>

              {/* Floating Element: Thumb Bubble */}
              <div style={{ position: 'absolute', top: '150px', right: '-10px', background: 'rgba(99,102,241,0.8)', border: '1px solid rgba(129,140,248,0.5)', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 4, animation: 'float-slow 4.5s ease-in-out infinite alternate-reverse', boxShadow: '0 10px 20px rgba(0,0,0,0.4), inset 0 0 15px rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                <div style={{ position: 'absolute', bottom: '-8px', left: '16px', width: 14, height: 14, background: 'rgba(99,102,241,0.8)', borderBottom: '1px solid rgba(129,140,248,0.5)', borderLeft: '1px solid rgba(129,140,248,0.5)', transform: 'rotate(-45deg)' }}></div>
              </div>



              <style>{`
                @keyframes float { 0% { transform: translateY(0px) } 100% { transform: translateY(-10px) } }
                @keyframes float-slow { 0% { transform: translateY(0px) } 100% { transform: translateY(-15px) } }
              `}</style>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{ marginBottom: '80px' }}>
          {/* Top Row: 3 Reviews */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {[
              { name: 'Priya Sharma', loc: 'Lucknow', text: 'Finding a nearby government hospital used to be difficult. With Arogya.ai, I found the right hospital in just a few minutes. The interface is simple and very helpful.', emoji: '👩🏽' },
              { name: 'Rahul Verma', loc: 'Delhi', text: 'The AI Health Assistant answered my questions instantly and helped me understand which department I should visit before going to the hospital.', emoji: '👨🏻' },
              { name: 'Sneha Patel', loc: 'Ahmedabad', text: 'The hospital search filters and OPD timing information saved me a lot of time. Everything I needed was available in one place.', emoji: '👩🏻' },
            ].map((review, idx) => (
              <ReviewCard key={idx} review={review} th={th} />
            ))}
          </div>
          {/* Bottom Row: 2 Reviews (Centered) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { name: 'Amit Kumar', loc: 'Patna', text: 'The platform is clean, fast, and easy to use. I especially liked the information about Ayushman Bharat hospitals.', emoji: '👨🏽' },
              { name: 'Neha Singh', loc: 'Jaipur', text: 'Arogya.ai helped my family locate an emergency hospital quickly. It has become one of my most useful healthcare websites.', emoji: '👩🏻‍🦱' },
            ].map((review, idx) => (
              <ReviewCard key={idx} review={review} th={th} />
            ))}
          </div>
        </div>

        {/* Community Impact Stats */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
             <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5))' }}></div>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', opacity: 0.5 }}></div>
             <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: th.text, margin: 0 }}>Community Impact</h2>
             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', opacity: 0.5 }}></div>
             <div style={{ height: '1px', width: '60px', background: 'linear-gradient(270deg, transparent, rgba(59,130,246,0.5))' }}></div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {[
              { val: '500+', lbl: 'Government\nHospitals Listed', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path><path d="M10 9h4"></path><path d="M12 7v4"></path></svg>, c: '#10b981' },
              { val: '29', lbl: 'States\nCovered', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, c: '#a855f7' },
              { val: '4.8/5', lbl: 'Average User\nRating', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>, c: '#f59e0b' },
              { val: '10,000+', lbl: 'Monthly\nHospital Searches', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>, c: '#3b82f6' },
              { val: '24×7', lbl: 'AI Healthcare\nAssistance', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>, c: '#14b8a6' },
            ].map((stat, idx) => (
              <div key={idx} style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: `rgba(${stat.c === '#10b981' ? '16,185,129' : stat.c === '#a855f7' ? '168,85,247' : stat.c === '#f59e0b' ? '245,158,11' : stat.c === '#3b82f6' ? '59,130,246' : '20,184,166'}, 0.1)`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                  {stat.icon}
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: th.text, margin: '0 0 8px 0' }}>{stat.val}</h3>
                <p style={{ color: th.muted, fontSize: '0.9rem', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-line' }}>{stat.lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,58,138,0.3))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '32px', padding: '0', display: 'flex', alignItems: 'center', flexWrap: 'wrap', overflow: 'hidden' }}>
          
          <div style={{ flex: '1 1 400px', position: 'relative', minHeight: '350px', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Custom 3D Chat Bubbles Graphic */}
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Leaves Background */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', opacity: 0.5 }}>
                <svg width="100" height="80" viewBox="0 0 100 80" fill="rgba(16,185,129,0.3)">
                   <path d="M10 80 Q20 40 50 30 Q40 60 10 80 Z" />
                   <path d="M30 80 Q50 20 90 20 Q70 50 30 80 Z" fill="rgba(52,211,153,0.3)" />
                </svg>
              </div>

              {/* Blue Bubble (Back) */}
              <div style={{ position: 'absolute', zIndex: 1, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))' }}>
                <svg width="180" height="150" viewBox="0 0 180 150" fill="none">
                  <rect x="20" y="20" width="140" height="100" rx="24" fill="url(#blue-grad)" />
                  <path d="M60 115 L40 140 L45 115 Z" fill="#3b82f6" />
                  <defs>
                    <linearGradient id="blue-grad" x1="0" y1="0" x2="140" y2="100">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                  {/* Heart inside blue bubble */}
                  <path d="M90 85l-2.18-1.98C80.4 75.3 75.3 70.67 75.3 64.9c0-4.63 3.63-8.26 8.25-8.26 2.61 0 5.12 1.22 6.75 3.14 1.63-1.92 4.14-3.14 6.75-3.14 4.62 0 8.25 3.63 8.25 8.26 0 5.77-5.1 10.4-12.52 18.12L90 85z" fill="#fff" />
                </svg>
              </div>

              {/* Green Bubble (Front) */}
              <div style={{ position: 'absolute', zIndex: 2, transform: 'translate(60px, 40px)', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }}>
                <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
                  <rect x="10" y="10" width="100" height="60" rx="16" fill="url(#green-grad)" />
                  <path d="M80 65 L95 85 L90 65 Z" fill="#10b981" />
                  <defs>
                    <linearGradient id="green-grad" x1="0" y1="0" x2="100" y2="60">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  {/* Dots inside green bubble */}
                  <circle cx="40" cy="40" r="4" fill="#fff" />
                  <circle cx="60" cy="40" r="4" fill="#fff" />
                  <circle cx="80" cy="40" r="4" fill="#fff" />
                </svg>
              </div>

              {/* Golden Stars at bottom */}
              <div style={{ position: 'absolute', bottom: '40px', display: 'flex', gap: '8px', zIndex: 3 }}>
                {[1,2,3,4].map((i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1" style={{ filter: 'drop-shadow(0 4px 8px rgba(245,158,11,0.4))', transform: i===4 ? 'translateY(-10px)' : i===3 ? 'translateY(-5px)' : 'translateY(0)' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>

            </div>
          </div>

          <div style={{ flex: '1 1 500px', padding: '64px' }}>
            <div style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Share Your Experience
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: th.text, margin: '0 0 20px 0' }}>We value every user's feedback.</h2>
            <p style={{ color: th.muted, fontSize: '1rem', lineHeight: 1.6, margin: '0 0 32px 0' }}>
              Help us improve Arogya.ai by sharing your experience and rating the healthcare services you received.
            </p>
            
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px', background: '#3b82f6', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 600, fontSize: '1.1rem', marginBottom: '24px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(59,130,246,0.3)', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='#2563eb'} onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              Share Your Experience
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: th.muted, fontSize: '0.9rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Your feedback helps others make informed healthcare decisions.
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function ReviewCard({ review, th }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(10px)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
      {/* 5 Stars */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
        {[1,2,3,4,5].map(i => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#10b981" stroke="#10b981" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
      </div>

      {/* User Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
          {review.emoji}
        </div>
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: th.text, margin: '0 0 4px 0' }}>{review.name}</h4>
          <p style={{ color: th.muted, fontSize: '0.85rem', margin: 0 }}>{review.loc}</p>
        </div>
      </div>

      {/* Quote text */}
      <p style={{ color: th.muted, fontSize: '0.95rem', lineHeight: 1.6, margin: 0, position: 'relative', zIndex: 2 }}>
        {review.text}
      </p>

      {/* Giant Quote Icon */}
      <div style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0.1, color: '#60a5fa', fontSize: '6rem', fontWeight: 900, lineHeight: 1, fontFamily: 'serif', zIndex: 1, pointerEvents: 'none' }}>
        “
      </div>
    </div>
  )
}
