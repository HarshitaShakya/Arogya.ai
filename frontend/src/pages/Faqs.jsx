import React, { useState } from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'

const FaqAccordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  return (
    <div style={{ 
      marginBottom: '16px', 
      background: th.card, 
      border: '1px solid ' + th.border,
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: isOpen ? '0 8px 32px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', padding: '20px 24px', background: 'transparent', 
          display: 'flex', alignItems: 'center', cursor: 'pointer', border: 'none', 
          textAlign: 'left', transition: 'all 0.2s ease-in-out' 
        }}
      >
        <div style={{ 
          width: 32, height: 32, borderRadius: '50%', 
          background: 'rgba(89,225,255,0.15)', 
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          flexShrink: 0, marginRight: 16 
        }}>
          <span style={{ color: '#59e1ff', fontWeight: 'bold', fontSize: '16px' }}>?</span>
        </div>
        
        <div style={{ flex: 1, color: isOpen ? '#59e1ff' : th.text, fontSize: '16px', fontWeight: 600, transition: 'color 0.2s ease' }}>
          {title}
        </div>

        <div style={{ flexShrink: 0, marginLeft: 16 }}>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', color: '#59e1ff' }}>
             <polyline points="6 9 12 15 18 9"></polyline>
           </svg>
        </div>
      </button>
      
      <div style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <div style={{ padding: '0px 24px 24px 72px', fontSize: '15px', lineHeight: 1.6, color: th.muted }}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default function Faqs() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);
  
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  
  const faqsList = [
    {
      title: "What is Arogya.ai?",
      content: "Arogya.ai is an AI-powered healthcare platform that helps users discover government hospitals, check OPD timings, explore free healthcare services, and receive intelligent healthcare guidance."
    },
    {
      title: "Is Arogya.ai free?",
      content: "Yes. Searching hospitals and accessing government healthcare information is completely free."
    },
    {
      title: "Can I book appointments?",
      content: "Appointment booking is available only for hospitals that support online scheduling."
    },
    {
      title: "Does Arogya.ai provide medical treatment?",
      content: "No. We provide healthcare information and AI assistance but do not replace professional medical advice."
    },
    {
      title: "Is my data secure?",
      content: "Yes. User privacy and data security are our highest priorities."
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setAiAnswer('');
    
    try {
      const response = await fetch('http://localhost:8000/api/ai/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await response.json();
      setAiAnswer(data.answer || 'Sorry, I could not find an answer.');
    } catch (err) {
      console.error(err);
      setAiAnswer('An error occurred while connecting to the AI assistant.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ backgroundColor: th.bg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <PageGlow />
      
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 900, color: th.text, letterSpacing: '-2px', margin: 0 }}>
              FAQs
            </h1>
            {/* Heartbeat SVG */}
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none" stroke="url(#heartbeat-gradient)" strokeWidth="2" strokeLinejoin="round">
              <defs>
                <linearGradient id="heartbeat-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0" />
                  <stop offset="20%" stopColor="#4F8CFF" />
                  <stop offset="50%" stopColor="#59E1FF" />
                  <stop offset="80%" stopColor="#4F8CFF" />
                  <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline points="0 20 30 20 40 10 50 35 60 5 70 20 100 20" style={{ filter: 'drop-shadow(0 0 4px rgba(89,225,255,0.8))' }} />
            </svg>
          </div>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#4F8CFF', marginBottom: '16px', marginTop: 0 }}>
            Frequently Asked Questions
          </h2>
          
          <p style={{ fontSize: '1.1rem', color: th.muted, maxWidth: '500px', lineHeight: 1.6 }}>
            Find quick answers to the most common questions about Arogya.ai and how we help you.
          </p>
        </div>

        {/* AI Search Bar */}
        <div style={{ 
          display: 'flex', alignItems: 'center', background: 'rgba(15,23,42,0.6)', 
          border: '1px solid ' + th.border, borderRadius: '99px', padding: '8px 8px 8px 24px',
          marginBottom: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={th.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search your question..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{ 
              flex: 1, background: 'transparent', border: 'none', color: th.text, 
              fontSize: '16px', padding: '0 16px', outline: 'none' 
            }}
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            style={{ 
              width: '48px', height: '48px', borderRadius: '50%', border: 'none', 
              background: 'linear-gradient(135deg, #4F8CFF 0%, #59E1FF 100%)', 
              color: '#fff', cursor: isSearching ? 'not-allowed' : 'pointer', 
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              boxShadow: '0 4px 12px rgba(89,225,255,0.4)',
              transition: 'transform 0.2s ease',
              opacity: isSearching ? 0.7 : 1
            }}
            onMouseEnter={e => !isSearching && (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => !isSearching && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {isSearching ? (
              <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>
        </div>

        {/* AI Answer Container */}
        {aiAnswer && (
          <div style={{ 
            marginBottom: '40px', padding: '24px', background: 'rgba(89,225,255,0.05)', 
            border: '1px solid rgba(89,225,255,0.2)', borderRadius: '16px', 
            animation: 'fadeIn 0.4s ease-out'
          }}>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>✨</span>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#59e1ff', fontWeight: 600 }}>AI Answer</h3>
            </div>
            <p style={{ margin: 0, fontSize: '16px', color: th.text, lineHeight: 1.6 }}>
              {aiAnswer}
            </p>
          </div>
        )}

        {/* Accordions */}
        <div>
          {faqsList.map((faq, index) => (
            <FaqAccordion key={index} title={faq.title} content={faq.content} />
          ))}
        </div>
        
      </div>
    </div>
  )
}
