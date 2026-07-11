import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const ArrowRightIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const StarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const HeadphonesIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>;
const ChatIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;

const HelpAccordion = ({ title, content, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(89,225,255,0.1)', overflow: 'hidden', transition: 'all 0.3s' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '20px 24px', background: isOpen ? 'rgba(89,225,255,0.05)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: 'none', color: isOpen ? '#59e1ff' : '#f8fafc', fontSize: '16px', fontWeight: 600, textAlign: 'left', transition: 'all 0.2s ease-in-out' }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(89,225,255,0.02)' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
      >
        {title}
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: isOpen ? 'rgba(89,225,255,0.15)' : 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s', flexShrink: 0, marginLeft: 16 }}>
           <div style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', color: isOpen ? '#59e1ff' : '#94a3b8', display: 'flex' }}>
             <ChevronDown />
           </div>
        </div>
      </button>
      <div style={{ maxHeight: isOpen ? '250px' : '0px', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <div style={{ padding: '0px 24px 20px', fontSize: '15px', lineHeight: 1.6, color: '#94a3b8', opacity: 0.9 }}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#f8fafc', paddingBottom: '100px', fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '120px 24px 60px', display: 'flex', justifyContent: 'center', minHeight: '550px', alignItems: 'center' }}>
        <div style={{ position: 'absolute', right: '12%', top: '50%', transform: 'translateY(-50%)', opacity: 0.8, pointerEvents: 'none', zIndex: 0, mixBlendMode: 'screen' }}>
          <img src="/neon-doctor.png" alt="Doctor Outline" style={{ height: '500px', objectFit: 'contain', filter: 'contrast(1.2) brightness(1.2)', transform: 'scaleX(-1)' }} />
          <div style={{ position: 'absolute', bottom: '0', right: 0, width: '100vw', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.2), rgba(56,189,248,0.8), transparent)', filter: 'blur(2px)', transform: 'rotate(-5deg)' }}></div>
        </div>

        <div style={{ width: '100%', maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '500px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
              How can <span style={{ color: '#38bdf8' }}>we</span> help?
            </h1>
            <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px', lineHeight: 1.6 }}>
              Find answers to your questions and get the support you need.
            </p>

            {/* Search Input, Popular Links, and Featured Article have been removed per user request */}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#38bdf8' }}>We can help you with:</h2>
          <div style={{ marginBottom: '36px', border: '1px solid rgba(89,225,255,0.15)', borderRadius: '16px', background: 'rgba(15,23,42,0.5)', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            <HelpAccordion title="Finding nearby government hospitals" content="Use our location-based search on the homepage to discover the closest government healthcare facilities to your current area." />
            <HelpAccordion title="Searching hospitals by department or specialty" content="Filter your hospital search results by specific departments (like Cardiology, Neurology) to find specialized care that meets your needs." />
            <HelpAccordion title="Understanding OPD timings" content="View detailed Outpatient Department (OPD) schedules and availability for each hospital directly on their profile page." />
            <HelpAccordion title="Ayushman Bharat information" content="Access details about free services and treatments covered under the Ayushman Bharat PM-JAY scheme at participating hospitals." />
            <HelpAccordion title="AI Health Assistant support" content="Interact with our smart AI assistant to assess your symptoms and get recommendations on the appropriate hospital department." />
            <HelpAccordion title="Emergency services" content="Quickly locate hospitals with 24/7 emergency wards, trauma centers, and available blood banks in critical situations." />
            <HelpAccordion title="Technical issues" content="If you experience any bugs or glitches, please try refreshing the page, clearing your browser cache, or contacting our support team." />
            <HelpAccordion title="Account-related questions" content="Manage your saved hospitals and favorite locations by signing into your Arogya.ai account." isLast={true} />
          </div>
        </div>

        <div style={{ padding: '24px', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0 }}>
              <HeadphonesIcon />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Still need help?</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Our support team is available 24/7 to assist you.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}><ChatIcon /> Live Chat</a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}><PhoneIcon /> Call Us</a>
            <a href="mailto:support@arogya.ai" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}><MailIcon /> Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
