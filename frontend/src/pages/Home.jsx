import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, translations } from '../store/appStore'
import { INDIA_STATES_DISTRICTS, STATE_LIST } from '../utils/indiaData'
import { getTheme } from '../utils/theme'
import { SearchPinIcon, BotChatIcon, ShieldCheckIcon, HospitalIcon, ReviewStarsIcon, DocumentIcon } from '../components/FeatureIcons'
import HowItWorksInteractive from '../components/HowItWorksInteractive'
import NeuralNetworkBackground from '../components/NeuralNetworkBackground'
import HolographicCity from '../components/HolographicCity'
import FreeServicesModal from '../components/FreeServicesModal'
import { searchHospitals } from '../services/api'

const FEATURES_V2 = [
  { Icon: SearchPinIcon, title: 'Smart Hospital Search', desc: 'Find by state, district, symptom, or name. Filter by Ayushman, emergency, free services.', badge: 'Smart Search', badgeIcon: '🔍' },
  { Icon: BotChatIcon, title: 'AI Symptom Mapper', desc: 'Describe symptoms in Hindi or English — AI recommends the right department instantly.', badge: 'AI Powered', badgeIcon: '✨' },
  { Icon: ShieldCheckIcon, title: 'Ayushman Checker', desc: 'Instantly check if your treatment is covered under Ayushman Bharat scheme.', badge: 'Govt. Verified', badgeIcon: '🛡️' },
  { Icon: HospitalIcon, title: 'Department Navigator', desc: 'Full OPD schedules, timings, and free vs paid services for every department.', badge: 'All Departments', badgeIcon: '🏥' },
  { Icon: ReviewStarsIcon, title: 'Community Reviews', desc: 'Real patient feedback on wait times, cleanliness, and doctor availability.', badge: 'Trusted by Patients', badgeIcon: '⭐' },
  { Icon: DocumentIcon, title: 'Auto-Draft Letters', desc: 'Generate referral letters and RTI complaints with AI in under 2 minutes.', badge: 'AI Assistant', badgeIcon: '📄' },
]

const STATS = [
  { num: '500+', label: 'Govt Hospitals' },
  { num: '29', label: 'States Covered' },
  { num: '100%', label: 'Free OPD Info' },
  { num: '700+', label: 'Districts' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [districts, setDistricts] = useState([])
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false)
  const [showFreeServices, setShowFreeServices] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(2)
  const featureRefs = useRef([])
  const searchBoxRef = useRef(null)
  const [tilt, setTilt] = useState({ index: null, x: 0, y: 0 })
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0, px: 50, py: 50 })
  const navigate = useNavigate()
  const { darkMode, language } = useAppStore()
  const t = translations[language] || translations['en']
  const th = getTheme(darkMode)

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowStateDropdown(false)
        setShowDistrictDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length > 1) {
        try {
          const res = await searchHospitals(query)
          let filtered = res.data;
          if (state) filtered = filtered.filter(h => h.state === state);
          if (district) filtered = filtered.filter(h => h.district === district);
          
          setSuggestions(filtered.slice(0, 5))
          setShowSuggestions(true)
        } catch (e) {
          console.error(e)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }
    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [query, state, district])

  useEffect(() => {
    if (state) {
      setDistricts(INDIA_STATES_DISTRICTS[state] || [])
      if (district && !INDIA_STATES_DISTRICTS[state]?.includes(district)) {
        setDistrict('')
      }
    } else {
      let allDistricts = [];
      for (const st in INDIA_STATES_DISTRICTS) {
        allDistricts = [...allDistricts, ...INDIA_STATES_DISTRICTS[st]];
      }
      setDistricts([...new Set(allDistricts)].sort());
    }
  }, [state])

  const handleSearch = () => {
    if (query || district || state) {
      navigate('/search?q=' + query + '&district=' + district + '&state=' + state)
    }
  }

  const selectStyle = { padding: '12px 14px', backgroundColor: th.inputBg, color: '#fff', borderRadius: 14, border: 'none', fontSize: 14, cursor: 'pointer', outline: 'none', fontFamily: 'inherit', transition: 'all 0.3s ease' }

  const handleCardMove = (e, i) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  setTilt({ index: i, x: px * -14, y: py * 14 })
}
const handleCardLeave = () => setTilt({ index: null, x: 0, y: 0 })

const handleHeroMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  setHeroTilt({ x: x * 15, y: y * -15, px: (x + 0.5) * 100, py: (y + 0.5) * 100 })
}
const handleHeroMouseLeave = () => {
  setHeroTilt({ x: 0, y: 0, px: 50, py: 50 })
}

  return (
    <div style={{ backgroundColor: th.bg, backgroundImage: th.bgGradient, minHeight: '100vh' }}>
      <style>{`
        @media (max-width: 1024px) {
          .hero-showcase {
            display: none !important;
          }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-15px) scale(1.3); opacity: 0.85; }
        }
        @keyframes pulse-orange {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
      `}</style>

      {/* HERO — interactive 3D parallax layout */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          background: th.bgGradient,
        }}
      >

        {/* 3D Holographic City Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <HolographicCity />
        </div>

        {/* fade so text stays readable, text column on the left */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(90deg, rgba(5,7,13,1) 0%, rgba(5,7,13,0.97) 30%, rgba(5,7,13,0.75) 44%, rgba(5,7,13,0.25) 56%, rgba(5,7,13,0) 66%)', pointerEvents: 'none' }}></div>

        {/* Content */}
        <div style={{ width: '120%', padding: '80px 48px 80px 64px', marginLeft: '150px', position: 'relative', zIndex: 3 }}>
          {/* Ambient Glows Behind Text */}
          <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(79,140,255,0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: -1 }}></div>
          <div style={{ position: 'absolute', top: '40%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(123,92,255,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: -1 }}></div>

          <div style={{ maxWidth: 520 }}>
            {/* Tagline */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '6px 18px 6px 6px', backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, marginBottom: 32, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', backgroundColor: 'rgba(89,225,255,0.1)' }}>
                <span style={{ width: 8, height: 8, backgroundColor: th.accent2, borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 12px ' + th.accent2, animation: 'pulse-green 2s ease infinite' }}></span>
              </div>
              <span style={{ color: '#f8fafc', fontSize: 13, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>{t.tagline}</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: -2.5, color: th.text, marginBottom: 24, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s' }}>
              {t.hero1}<br/>
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ background: th.accentGradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', position: 'relative', zIndex: 2 }}>
                  {t.hero2}
                </span>
                {/* Intense Glow behind text */}
                <span style={{ position: 'absolute', inset: -10, background: th.accentGradientText, filter: 'blur(32px)', opacity: 0.4, zIndex: 1 }}></span>
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 460, lineHeight: 1.6, marginBottom: 40, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s', fontWeight: 400 }}>
              {t.subtitle}
            </p>

            {/* Premium Stat Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 48, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s', backgroundColor: th.card, backdropFilter: th.blur, WebkitBackdropFilter: th.blur, padding: '16px 32px', borderRadius: 28, border: '1px solid ' + th.border, width: 'fit-content', boxShadow: '0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              {[
                { num: '500+', label: 'Govt. Hospitals', color: '#59E1FF' },
                { num: '29', label: 'States Active', color: '#818cf8' },
                { num: '4.8', label: 'Patient Rating', color: '#fbbf24' }
              ].map((stat, i, arr) => (
                <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: th.text, letterSpacing: -1, display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1 }}>
                      {stat.num}
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: stat.color, display: 'inline-block', boxShadow: `0 0 12px ${stat.color}` }}></span>
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.08)' }}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Ultra-Premium Search Box */}
            <div ref={searchBoxRef} style={{ position: 'relative', zIndex: 50, marginBottom: 32, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s', maxWidth: 540 }}>
              {/* Outer animated gradient glow */}
              <div style={{ position: 'absolute', inset: -2, background: 'linear-gradient(120deg, rgba(79,140,255,0.4), rgba(123,92,255,0.4), rgba(52,211,153,0.3))', borderRadius: 28, filter: 'blur(16px)', opacity: 0.6, backgroundSize: '200% 200%', animation: 'gradientShift 8s ease infinite' }}></div>
              
              <div style={{ backgroundColor: 'rgba(10,15,30,0.85)', backdropFilter: th.blur, WebkitBackdropFilter: th.blur, border: '1px solid ' + th.border, borderRadius: 28, padding: 14, boxShadow: '0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)', position: 'relative', zIndex: 50 }}>
                
                {/* Search Input Container for Suggestions */}
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, backgroundColor: th.inputBg, borderRadius: 18, padding: '16px 20px', marginBottom: 12, border: '1px solid ' + th.border, transition: 'border 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" placeholder={t.placeholder} value={query}
                      onChange={e => setQuery(e.target.value)}
                      onFocus={() => { if(query.length > 1 && suggestions.length > 0) setShowSuggestions(true); }}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                      style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', color: th.text, fontSize: 16, fontFamily: 'inherit', minWidth: 0, fontWeight: 500 }} />
                  </div>
                  
                  {/* Autocomplete Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div style={{ position: 'absolute', top: 'calc(100% - 4px)', left: 0, right: 0, backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 20, overflow: 'hidden' }}>
                      {suggestions.map((s, idx) => (
                        <div key={s.id} 
                             onMouseDown={(e) => e.preventDefault()}
                             onClick={() => { setQuery(s.name); setShowSuggestions(false); }}
                             style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', cursor: 'pointer', borderBottom: idx === suggestions.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}
                             onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                             onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <span style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>{s.name}</span>
                          <span style={{ color: '#94a3b8', fontSize: 13 }}>📍 {s.district}, {s.state}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dropdowns & Button */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 120px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
                    </div>
                    <div 
                      onClick={() => { setShowStateDropdown(!showStateDropdown); setShowDistrictDropdown(false); }}
                      style={{ width: '100%', padding: '14px 14px 14px 42px', fontSize: 14, backgroundColor: th.inputBg, border: '1px solid ' + th.border, borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: state ? th.text : '#94a3b8', transition: 'border 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
                    >
                      <span>{state || 'Select State'}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'transform 0.2s', transform: showStateDropdown ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    
                    {showStateDropdown && (
                      <>
                        <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, width: '100%', minWidth: 240, maxHeight: 350, overflowY: 'auto', backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 11, padding: '12px 0' }} className="custom-scrollbar">
                          <div onClick={() => { setState(''); setShowStateDropdown(false); }} style={{ padding: '12px 20px', color: '#94a3b8', cursor: 'pointer', fontSize: 15 }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>Select State</div>
                          {STATE_LIST.map(s => (
                            <div key={s} onClick={() => { setState(s); setShowStateDropdown(false); }} style={{ padding: '12px 20px', color: state === s ? '#59e1ff' : '#fff', backgroundColor: state === s ? 'rgba(79,140,255,0.1)' : 'transparent', cursor: 'pointer', fontSize: 15 }} onMouseEnter={e => e.currentTarget.style.backgroundColor = state === s ? 'rgba(79,140,255,0.1)' : 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = state === s ? 'rgba(79,140,255,0.1)' : 'transparent'}>
                              {s}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div style={{ flex: '1 1 120px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={state ? "#94a3b8" : "#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div 
                      onClick={() => { setShowDistrictDropdown(!showDistrictDropdown); setShowStateDropdown(false); }}
                      style={{ width: '100%', padding: '14px 14px 14px 42px', fontSize: 14, backgroundColor: th.inputBg, border: '1px solid ' + th.border, borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: district ? th.text : '#94a3b8', transition: 'border 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
                    >
                      <span>{district || (state ? 'Select District' : 'District')}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'transform 0.2s', transform: showDistrictDropdown ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    
                    {showDistrictDropdown && (
                      <>
                        <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, width: '100%', minWidth: 240, maxHeight: 350, overflowY: 'auto', backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 11, padding: '12px 0' }} className="custom-scrollbar">
                          <div onClick={() => { setDistrict(''); setShowDistrictDropdown(false); }} style={{ padding: '12px 20px', color: '#94a3b8', cursor: 'pointer', fontSize: 15 }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>Select District</div>
                          {districts.map(dist => (
                            <div key={dist} onClick={() => { 
                                setDistrict(dist); 
                                setShowDistrictDropdown(false); 
                                if (!state) {
                                  for (const st in INDIA_STATES_DISTRICTS) {
                                    if (INDIA_STATES_DISTRICTS[st].includes(dist)) {
                                      setState(st);
                                      break;
                                    }
                                  }
                                }
                              }} style={{ padding: '12px 20px', color: district === dist ? '#59e1ff' : '#fff', backgroundColor: district === dist ? 'rgba(79,140,255,0.1)' : 'transparent', cursor: 'pointer', fontSize: 15 }} onMouseEnter={e => e.currentTarget.style.backgroundColor = district === dist ? 'rgba(79,140,255,0.1)' : 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = district === dist ? 'rgba(79,140,255,0.1)' : 'transparent'}>
                              {dist}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <button onClick={handleSearch}
                    style={{ position: 'relative', overflow: 'hidden', padding: '0 32px', height: 50, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: '#fff', borderRadius: 16, border: 'none', fontWeight: 800, fontSize: 15, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', letterSpacing: 0.5, flex: '0 0 auto', boxShadow: '0 8px 24px rgba(99,102,241,0.4)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(99,102,241,0.6)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.4)' }}
                  >
                    <span style={{ position: 'relative', zIndex: 2 }}>{t.search}</span>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 1 }}></div>
                  </button>
                </div>

                {/* Selected Filters Tags */}
                {(state || district) && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap', padding: '0 4px' }}>
                    {state && (
                      <span style={{ padding: '6px 16px', backgroundColor: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#fff', borderRadius: 999, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon></svg>
                        {state}
                        <button onClick={() => setState('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0, marginLeft: 4, display: 'flex' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>×</button>
                      </span>
                    )}
                    {district && (
                      <span style={{ padding: '6px 16px', backgroundColor: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#fff', borderRadius: 999, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {district}
                        <button onClick={() => setDistrict('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0, marginLeft: 4, display: 'flex' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>×</button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Filter Chips without emojis */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s' }}>
              {[
                { label: 'Emergency', filter: 'emergency', color: '#ef4444' }, 
                { label: 'OPD Today', query: 'OPD Today', color: '#10b981' }, 
                { label: 'Ayushman', filter: 'ayushman', color: '#3b82f6' }, 
                { label: 'Medical College', filter: 'medical', color: '#8b5cf6' }, 
                { label: 'Free Services', action: () => {
                    if (!state || !district) {
                      alert("Please select your State and District from the search bar first to check live availability in your area.");
                    } else {
                      setShowFreeServices(true);
                    }
                  }, color: '#f59e0b', highlight: true }
              ].map(chip => (
                <button key={chip.label} onClick={chip.action ? chip.action : () => chip.filter ? navigate('/search?filter=' + chip.filter) : navigate('/search?q=' + chip.query)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px', 
                    backgroundColor: chip.highlight ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)', 
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid ' + (chip.highlight ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.08)'), 
                    color: chip.highlight ? '#f59e0b' : '#94a3b8', 
                    borderRadius: 999, fontSize: 13, fontWeight: chip.highlight ? 700 : 600, 
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: chip.highlight ? '0 0 16px rgba(245,158,11,0.2)' : 'none',
                    animation: chip.highlight ? 'pulse-orange 2s infinite' : 'none'
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.borderColor = chip.highlight ? '#fcd34d' : 'rgba(255,255,255,0.2)'; 
                    e.currentTarget.style.color = chip.highlight ? '#fcd34d' : '#fff'; 
                    e.currentTarget.style.backgroundColor = chip.highlight ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)'; 
                    e.currentTarget.style.transform = 'translateY(-2px)' 
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.borderColor = chip.highlight ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.08)'; 
                    e.currentTarget.style.color = chip.highlight ? '#f59e0b' : '#94a3b8'; 
                    e.currentTarget.style.backgroundColor = chip.highlight ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)'; 
                    e.currentTarget.style.transform = 'translateY(0)' 
                  }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: chip.color, boxShadow: `0 0 8px ${chip.color}` }}></span>
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: th.cardSolid, borderTop: '1px solid ' + th.border, borderBottom: '1px solid ' + th.border }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 900, background: th.accentGradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: -2 }}>{s.num}</div>
              <div style={{ color: th.muted, fontSize: 14, marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: th.accent2, textTransform: 'uppercase', letterSpacing: 4 }}>Features</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: th.text, marginTop: 12, letterSpacing: -1.5 }}>
            What does <span style={{ background: th.accentGradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Arogya.ai</span> do?
          </h2>
          <p style={{ color: th.muted, marginTop: 12, fontSize: 16 }}>{t.featSub}</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, overflow: 'visible', padding: '20px 0', perspective: 1200 }}>
          {FEATURES_V2.map((f, i) => (
            <div key={f.title}
            ref={el => featureRefs.current[i] = el}
            onClick={() => setActiveFeature(i)}
            onMouseMove={e => handleCardMove(e, i)}
            onMouseLeave={handleCardLeave}
            style={{
                flex: '1 1 0',
                minWidth: 190,
                scrollSnapAlign: 'center',
                cursor: 'pointer',
                backgroundColor: activeFeature === i ? 'rgba(79,140,255,0.08)' : th.card,
                border: activeFeature === i ? '1px solid rgba(89,225,255,0.5)' : '1px solid ' + th.border,
                borderRadius: 20,
                padding: '32px 22px',
                textAlign: 'center',
                transform: `scale(${activeFeature === i ? 1.06 : 1}) rotateX(${tilt.index === i ? tilt.y : 0}deg) rotateY(${tilt.index === i ? tilt.x : 0}deg)`,
transformStyle: 'preserve-3d',
                boxShadow: activeFeature === i ? '0 0 40px rgba(79,140,255,0.25), 0 20px 40px rgba(0,0,0,0.3)' : 'none',
                zIndex: activeFeature === i ? 2 : 1,
                position: 'relative',
                transition: 'all 0.3s ease',
              }}>
              <div style={{
                width: 64, height: 64, margin: '0 auto 20px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(79,140,255,0.18) 0%, transparent 70%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <f.Icon />
              </div>
              {tilt.index === i && (
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none',
                  background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, rgba(255,255,255,0.10), transparent 60%)`,
                }}></div>
              )}
              <h3 style={{ color: th.text, fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: th.muted, fontSize: 12.5, lineHeight: 1.6, marginBottom: 18 }}>{f.desc}</p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                backgroundColor: activeFeature === i ? 'rgba(52,211,153,0.14)' : 'rgba(79,140,255,0.10)',
                color: activeFeature === i ? '#6ee7b7' : th.accent2,
              }}>
                {f.badgeIcon} {f.badge}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', gap: 16, marginTop: 4, height: 60, overflow: 'hidden',
          transform: 'scaleY(-1)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)',
          filter: 'blur(1px)', opacity: 0.5, pointerEvents: 'none',
        }}>
          {FEATURES_V2.map(f => (
            <div key={f.title + '-refl'} style={{ flex: '1 1 0', minWidth: 190, backgroundColor: th.card, borderRadius: 20, border: '1px solid ' + th.border }}></div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {FEATURES_V2.map((f, i) => (
            <span key={i}
              onClick={() => {
                setActiveFeature(i)
                featureRefs.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
              }}
              style={{
                width: activeFeature === i ? 22 : 7, height: 7, borderRadius: 999, cursor: 'pointer',
                backgroundColor: activeFeature === i ? th.accent2 : 'rgba(255,255,255,0.15)',
                boxShadow: activeFeature === i ? '0 0 8px rgba(89,225,255,0.7)' : 'none',
                transition: 'all 0.3s ease',
              }}></span>
          ))}
        </div>
      </section>
{/* HOW IT WORKS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: th.accent2, textTransform: 'uppercase', letterSpacing: 4 }}>How it works</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: th.text, marginTop: 12, letterSpacing: -1.5 }}>{t.howTitle}</h2>
        </div>
        <HowItWorksInteractive
          steps={[
            { title: t.step1, desc: t.step1d },
            { title: t.step2, desc: t.step2d },
            { title: t.step3, desc: t.step3d },
          ]}
        />
      </section>

      {/* CTA SECTION - REDESIGNED FROM IMAGE (FULL BLEED) */}
      <section style={{ position: 'relative', width: '100%', backgroundColor: '#020512', borderTop: '1px solid rgba(59,130,246,0.2)', borderBottom: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 0 100px rgba(37,99,235,0.1)' }}>
        
        {/* Neural Network 3D Canvas */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <NeuralNetworkBackground style={{ width: '100%', left: 0, right: 'auto' }} />
          {/* Fade the 3D model out on the left side so text is legible */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #020512 20%, rgba(2,5,18,0.8) 50%, transparent 100%)', zIndex: 1 }}></div>
          {/* Fade bottom for the stats grid */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #020512 15%, transparent 40%)', zIndex: 1 }}></div>
        </div>

        {/* Constrained Content Container */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '120px 24px 60px', display: 'flex', flexDirection: 'column', minHeight: 600 }}>
          
          {/* Floating Badges removed as per user request */}

          {/* Top Text Content */}
          <div style={{ maxWidth: 540, flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: th.card, backdropFilter: 'blur(12px)', borderRadius: 999, border: '1px solid ' + th.borderStrong, marginBottom: 32 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#59e1ff" strokeWidth="2.5"><path d="M12 2L2 22l10-4 10 4L12 2z"/></svg>
              <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>AI-Powered Healthcare Navigation</span>
            </div>
            
            <h2 style={{ fontSize: 'clamp(44px, 5.5vw, 64px)', fontWeight: 900, color: th.text, marginBottom: 24, letterSpacing: -2, lineHeight: 1.1 }}>
              Ready to find<br/>your <span style={{ color: '#59e1ff', textShadow: '0 0 40px rgba(89,225,255,0.4)' }}>hospital?</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: 48, lineHeight: 1.7, fontWeight: 400 }}>
              {t.ctaSub} Arogya.ai is built to help you find the right one, right when you need it.
            </p>
            
            <button onClick={() => { navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }} style={{ padding: '20px 40px', background: 'linear-gradient(135deg, #2563eb, #6366f1)', color: '#fff', borderRadius: 999, border: 'none', fontWeight: 800, fontSize: 18, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12, boxShadow: '0 12px 32px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Find Hospital Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4 }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

          {/* Bottom Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 80 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#59e1ff' }}>
                <HospitalIcon />
              </div>
              <div>
                <div style={{ color: th.text, fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: -0.5 }}>500+</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.4, fontWeight: 500 }}>Government Hospitals<br/>Across India</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                <SearchPinIcon />
              </div>
              <div>
                <div style={{ color: th.text, fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: -0.5 }}>29</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.4, fontWeight: 500 }}>States & UTs<br/>Covered</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <div style={{ color: th.text, fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: -0.5 }}>10L+</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.4, fontWeight: 500 }}>Lives Navigated<br/>Safely</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                <ShieldCheckIcon />
              </div>
              <div>
                <div style={{ color: th.text, fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: -0.5 }}>100%</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.4, fontWeight: 500 }}>Free & Secure<br/>For Everyone</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - REDESIGNED FROM IMAGE */}
      <footer style={{ backgroundColor: th.cardSolid, borderTop: '1px solid ' + th.border, padding: '80px 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 80 }}>
            {/* Logo & Social Column */}
            <div style={{ gridColumn: 'span 2', maxWidth: 300 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 20 }}>A</div>
                <span style={{ color: th.text, fontWeight: 900, fontSize: 26, letterSpacing: -1 }}>Arogya<span style={{ color: th.accent2 }}>.ai</span></span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>Right treatment, right place, right time.</p>
              <div style={{ display: 'flex', gap: 16 }}>
                {[
                  <svg key="x" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16M4 20L20 4"/></svg>,
                  <svg key="ig" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
                  <svg key="gh" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
                  <svg key="ml" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                ].map((icon, i) => (
                   <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }} onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
                     {icon}
                   </div>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 28 }}>Product</div>
              {[
                { label: 'Find Hospital', onClick: (e) => { e.preventDefault(); navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); } },
                { label: 'AI Assistant', onClick: (e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('triggerAIAttention')); } },
                { label: 'Features', onClick: (e) => { e.preventDefault(); navigate('/features'); window.scrollTo(0,0); } },
                { label: 'Community Reviews', onClick: (e) => { e.preventDefault(); navigate('/info/community-reviews'); window.scrollTo(0,0); } }
              ].map(l => (
                <div key={l.label} style={{ marginBottom: 18 }}><a href="#" onClick={l.onClick} style={{ color: '#cbd5e1', fontSize: 15, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#59e1ff'} onMouseLeave={e => e.target.style.color = '#cbd5e1'}>{l.label}</a></div>
              ))}
            </div>
            <div>
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 28 }}>Support</div>
              {[
                { label: 'Help Center', onClick: (e) => { e.preventDefault(); navigate('/help-center'); window.scrollTo(0,0); } },
                { label: 'FAQs', onClick: (e) => { e.preventDefault(); navigate('/info/faqs'); window.scrollTo(0,0); } },
                { label: 'Privacy Policy', onClick: (e) => { e.preventDefault(); navigate('/info/privacy-policy'); window.scrollTo(0,0); } },
                { label: 'Terms of Use', onClick: (e) => { e.preventDefault(); navigate('/info/terms-of-use'); window.scrollTo(0,0); } },
                { label: 'Contact Us', onClick: (e) => { e.preventDefault(); navigate('/info/contact-us'); window.scrollTo(0,0); } }
              ].map(l => (
                <div key={l.label} style={{ marginBottom: 18 }}><a href="#" onClick={l.onClick} style={{ color: '#cbd5e1', fontSize: 15, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#59e1ff'} onMouseLeave={e => e.target.style.color = '#cbd5e1'}>{l.label}</a></div>
              ))}
            </div>
            <div>
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 28 }}>About</div>
              {[
                { label: 'About Us', onClick: (e) => { e.preventDefault(); navigate('/info/about-us'); window.scrollTo(0,0); } },
                { label: 'Our Mission', onClick: (e) => { e.preventDefault(); navigate('/info/our-mission'); window.scrollTo(0,0); } },
                { label: 'Careers', onClick: (e) => { e.preventDefault(); navigate('/info/careers'); window.scrollTo(0,0); } },
                { label: 'Media Kit', onClick: (e) => { e.preventDefault(); navigate('/info/media-kit'); window.scrollTo(0,0); } }
              ].map(l => (
                <div key={l.label} style={{ marginBottom: 18 }}><a href="#" onClick={l.onClick} style={{ color: '#cbd5e1', fontSize: 15, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#59e1ff'} onMouseLeave={e => e.target.style.color = '#cbd5e1'}>{l.label}</a></div>
              ))}
            </div>

            {/* Built for India Card */}
            <div style={{ gridColumn: 'span 2', padding: 32, background: th.card, borderRadius: 24, border: '1px solid ' + th.border, position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', right: -20, bottom: -40, opacity: 0.1, pointerEvents: 'none' }}>
                  {/* Subtle map outline placeholder */}
                  <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#59e1ff" strokeWidth="1"><path d="M12 2L2 22l10-4 10 4L12 2z"/></svg>
               </div>
               <div style={{ position: 'relative', zIndex: 1 }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                   <div style={{ width: 32, height: 32, background: 'rgba(59,130,246,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#59e1ff' }}><ShieldCheckIcon /></div>
                   <span style={{ color: th.text, fontWeight: 800, fontSize: 18 }}>Built for India</span>
                 </div>
                 <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6, maxWidth: 220 }}>Empowering healthcare through AI & accessibility.</p>
               </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}>© 2025 Arogya.ai — Built with <span style={{ color: '#ef4444' }}>❤️</span> for India</span>
            <span style={{ color: '#64748b', fontSize: 14, display: 'flex', gap: 32, fontWeight: 500 }}>
              <a href="#" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#64748b'}>Open Source</a>
              <a href="#" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#64748b'}>Free Forever</a>
            </span>
          </div>
        </div>
      </footer>
      <FreeServicesModal isOpen={showFreeServices} onClose={() => setShowFreeServices(false)} selectedState={state} selectedDistrict={district} />
    </div>
  )
}