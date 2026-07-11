import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'

const HelpAccordion = ({ title, content, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(89,225,255,0.1)', overflow: 'hidden', transition: 'all 0.3s' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '20px 24px', background: isOpen ? 'rgba(89,225,255,0.05)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: 'none', color: isOpen ? '#59e1ff' : 'inherit', fontSize: '16px', fontWeight: 600, textAlign: 'left', transition: 'all 0.2s ease-in-out' }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(89,225,255,0.02)' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
      >
        {title}
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: isOpen ? 'rgba(89,225,255,0.15)' : 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s', flexShrink: 0, marginLeft: 16 }}>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', color: isOpen ? '#59e1ff' : '#94a3b8' }}>
             <polyline points="6 9 12 15 18 9"></polyline>
           </svg>
        </div>
      </button>
      <div style={{ maxHeight: isOpen ? '250px' : '0px', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <div style={{ padding: '0px 24px 20px', fontSize: '15px', lineHeight: 1.6, color: '#cbd5e1', opacity: 0.9 }}>
          {content}
        </div>
      </div>
    </div>
  );
};

const PAGE_DATA = {
  'help-center': {
    title: 'Help Center',
    content: (
      <>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', color: 'inherit' }}>Welcome to Arogya.ai Help Center</h2>
        <p style={{ marginBottom: '24px', fontSize: '16px', lineHeight: 1.6 }}>Need assistance? We're here to help you get the most out of Arogya.ai.</p>
        
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#59e1ff' }}>We can help you with:</h3>
        
        <div style={{ marginBottom: '36px', border: '1px solid rgba(89,225,255,0.15)', borderRadius: '16px', background: 'rgba(15,23,42,0.3)', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
          <HelpAccordion 
            title="Finding nearby government hospitals" 
            content="Use our location-based search on the homepage to discover the closest government healthcare facilities to your current area." 
          />
          <HelpAccordion 
            title="Searching hospitals by department or specialty" 
            content="Filter your hospital search results by specific departments (like Cardiology, Neurology) to find specialized care that meets your needs." 
          />
          <HelpAccordion 
            title="Understanding OPD timings" 
            content="View detailed Outpatient Department (OPD) schedules and availability for each hospital directly on their profile page." 
          />
          <HelpAccordion 
            title="Ayushman Bharat information" 
            content="Access details about free services and treatments covered under the Ayushman Bharat PM-JAY scheme at participating hospitals." 
          />
          <HelpAccordion 
            title="AI Health Assistant support" 
            content="Interact with our smart AI assistant to assess your symptoms and get recommendations on the appropriate hospital department." 
          />
          <HelpAccordion 
            title="Emergency services" 
            content="Quickly locate hospitals with 24/7 emergency wards, trauma centers, and available blood banks in critical situations." 
          />
          <HelpAccordion 
            title="Technical issues" 
            content="If you experience any bugs or glitches, please try refreshing the page, clearing your browser cache, or contacting our support team." 
          />
          <HelpAccordion 
            title="Account-related questions" 
            content="Manage your saved hospitals and favorite locations by signing into your Arogya.ai account." 
            isLast={true}
          />
        </div>

        <div style={{ padding: '24px', background: 'rgba(89, 225, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(89, 225, 255, 0.2)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: 'inherit' }}>Still need help?</h3>
          <p style={{ marginBottom: '8px', fontSize: '16px' }}><strong>Email:</strong> <a href="mailto:support@arogya.ai" style={{ color: '#59e1ff', textDecoration: 'none' }}>support@arogya.ai</a></p>
          <p style={{ fontSize: '16px' }}><strong>Response Time:</strong> Within 24 Hours</p>
        </div>
      </>
    )
  }
}

export default function InfoPage() {
  const { pageId } = useParams()
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  const page = PAGE_DATA[pageId] || { title: 'Page Not Found', content: <p>The page you are looking for does not exist.</p> }

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
      {pageId === 'help-center' && (
        <div style={{ position: 'absolute', right: '12%', top: '50%', transform: 'translateY(-50%)', opacity: 0.7, pointerEvents: 'none', zIndex: 0, mixBlendMode: 'screen' }}>
          <img src="/neon-doctor.png" alt="Doctor" style={{ height: '500px', objectFit: 'contain', filter: 'contrast(1.2) brightness(1.2)', transform: 'scaleX(-1)' }} />
          {/* Subtle glow behind the doctor */}
          <div style={{ position: 'absolute', top: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0) 70%)', filter: 'blur(40px)', zIndex: -1 }}></div>
        </div>
      )}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: th.text, marginBottom: '32px', letterSpacing: '-1px' }}>
          {page.title}
        </h1>
        <div style={{ color: th.muted, background: th.card, padding: 'clamp(24px, 5vw, 40px)', borderRadius: '24px', border: '1px solid ' + th.border, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          {page.content}
        </div>
      </div>
    </div>
  )
}
