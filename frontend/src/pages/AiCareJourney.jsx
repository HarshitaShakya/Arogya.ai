import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Check, Clock, Stethoscope, Hospital, FileText, 
  ShieldCheck, AlertTriangle, AlertCircle, Calendar, Droplets,
  MapPin, Star, Upload, FileSignature, ArrowRight, Loader2, Video, X, ChevronDown, Bell, Pill, BellRing
} from 'lucide-react';

const COMMON_SYMPTOMS = [
  'Fever', 'Cough', 'Headache', 'Chest Pain', 'Stomach Pain', 
  'Fatigue', 'Nausea', 'Shortness of Breath', 'Dizziness'
];

const ONLINE_DOCTORS = [
  { name: 'Dr. Ananya Sharma', initials: 'AS', exp: '12 yrs exp', rating: '4.9', reviews: '120+', fee: '₹149', color: '#3b82f6' },
  { name: 'Dr. Rahul Verma', initials: 'RV', exp: '8 yrs exp', rating: '4.7', reviews: '85+', fee: '₹99', color: '#10b981' },
  { name: 'Dr. Sneha Gupta', initials: 'SG', exp: '15 yrs exp', rating: '4.9', reviews: '200+', fee: '₹199', color: '#a855f7' },
  { name: 'Dr. Vikram Singh', initials: 'VS', exp: '10 yrs exp', rating: '4.8', reviews: '150+', fee: '₹129', color: '#f59e0b' },
  { name: 'Dr. Priya Desai', initials: 'PD', exp: '6 yrs exp', rating: '4.6', reviews: '60+', fee: '₹99', color: '#ec4899' }
];

export default function AiCareJourney() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [activeSection, setActiveSection] = useState('symptoms');
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [prescriptionState, setPrescriptionState] = useState('idle');
  const [toastMessage, setToastMessage] = useState('');
  const [activeAlerts, setActiveAlerts] = useState([]);
  const fileInputRef = useRef(null);
  const [analysisData, setAnalysisData] = useState({
    conditions: ['Viral Fever', 'Common Cold', 'Seasonal Allergy'],
    department: 'General Physician',
    alternative: 'ENT Specialist',
    urgency: { level: 'Visit within 24 hours', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' }
  });

  const getMockAnalysis = (symptomsText) => {
    const text = symptomsText.toLowerCase();
    if (text.includes('stomach') || text.includes('nausea') || text.includes('vomiting')) {
      return {
        conditions: ['Gastritis', 'Food Poisoning', 'Acid Reflux'],
        department: 'Gastroenterology',
        alternative: 'General Physician',
        urgency: { level: 'Visit within 24 hours', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' }
      };
    } else if (text.includes('chest') || text.includes('breath')) {
      return {
        conditions: ['Angina', 'Respiratory Infection', 'Asthma'],
        department: 'Cardiology',
        alternative: 'Pulmonology',
        urgency: { level: 'Emergency Recommended', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }
      };
    } else {
      return {
        conditions: ['Viral Fever', 'Common Cold', 'Seasonal Allergy'],
        department: 'General Physician',
        alternative: 'ENT Specialist',
        urgency: { level: 'Visit within 24 hours', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' }
      };
    }
  };

  // Refs for scrolling
  const sectionRefs = {
    symptoms: useRef(null),
    summary: useRef(null),
    analysis: useRef(null),
    consultation: useRef(null),
    schemes: useRef(null),
    prep: useRef(null),
    meds: useRef(null)
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0 && !customSymptom.trim()) return;
    setIsAnalyzing(true);
    // Simulate AI processing delay
    setTimeout(() => {
      const text = [...selectedSymptoms, customSymptom].filter(Boolean).join(', ');
      setAnalysisData(getMockAnalysis(text));
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      setActiveSection('summary');
    }, 2500);
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    if (sectionRefs[id].current) {
      const yOffset = -100; // Account for sticky header
      const element = sectionRefs[id].current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Observe active section on scroll
  useEffect(() => {
    if (!hasAnalyzed) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset
      
      let currentActive = 'summary';
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current && ref.current.offsetTop <= scrollPosition) {
          currentActive = id;
        }
      });
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnalyzed, activeSection]);

  const timelineItems = hasAnalyzed ? [
    { id: 'summary', label: 'AI Summary', icon: <Activity size={16} /> },
    { id: 'analysis', label: 'Diagnosis & Dept', icon: <Stethoscope size={16} /> },
    { id: 'consultation', label: 'Online Consultation', icon: <Video size={16} /> },
    { id: 'schemes', label: 'Government Schemes', icon: <ShieldCheck size={16} /> },
    { id: 'prep', label: 'Preparation & Docs', icon: <FileText size={16} /> },
    { id: 'meds', label: 'Medication Tracker', icon: <FileSignature size={16} /> }
  ] : [
    { id: 'symptoms', label: 'Symptoms', icon: <Activity size={16} /> }
  ];

  const allSymptomsText = [...selectedSymptoms, customSymptom].filter(Boolean).join(', ');

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPrescriptionState('uploading');
      setTimeout(() => {
        setPrescriptionState('analyzing');
        setTimeout(() => {
          setPrescriptionState('complete');
        }, 2000);
      }, 1500);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const MOCK_MEDS = [
    { name: 'Paracetamol 500mg', dosage: '1 Tablet', timing: 'After Food (Morning, Night)', days: '5 Days' },
    { name: 'Azithromycin 250mg', dosage: '1 Tablet', timing: 'Before Food (Morning)', days: '3 Days' },
    { name: 'Pantoprazole 40mg', dosage: '1 Tablet', timing: 'Before Breakfast', days: '5 Days' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff', fontFamily: 'Inter, sans-serif', paddingTop: 100, paddingBottom: 100 }}>
      
      {/* Dynamic Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 60%)', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 60%)', filter: 'blur(80px)' }}></div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-1px' }}>
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Care</span> Workspace
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Let's help you find the right care. Estimated Time • 3-5 mins
          </p>
        </div>

        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          
          {/* Left Sidebar: Timeline Navigation */}
          <div style={{ width: 280, position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>Journey Timeline</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 15, top: 20, bottom: 20, width: 2, background: 'rgba(255,255,255,0.05)' }}></div>
                
                {timelineItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  const isPast = timelineItems.findIndex(i => i.id === activeSection) > idx;
                  
                  return (
                    <div key={item.id} onClick={() => scrollToSection(item.id)} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', cursor: 'pointer', position: 'relative', zIndex: 1, opacity: isActive ? 1 : 0.6, transition: 'all 0.3s' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: isActive ? 'rgba(168,85,247,0.2)' : isPast ? 'rgba(59,130,246,0.2)' : '#1e293b', border: `2px solid ${isActive ? '#a855f7' : isPast ? '#3b82f6' : '#334155'}`, display: 'flex', justifyContent: 'center', alignItems: 'center', color: isActive ? '#a855f7' : isPast ? '#3b82f6' : '#94a3b8', transition: 'all 0.3s' }}>
                        {isActive ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 10px #a855f7' }}></div> : item.icon}
                      </div>
                      <div style={{ color: isActive ? '#fff' : '#cbd5e1', fontSize: 15, fontWeight: isActive ? 600 : 400 }}>
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {hasAnalyzed && (
               <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), transparent)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                 <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0, mt: 2 }} />
                 <div>
                   <div style={{ color: '#10b981', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>AI ASSISTANT ACTIVE</div>
                   <div style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>Analysis complete. You can jump to any section to explore your options.</div>
                 </div>
               </div>
            )}
          </div>

          {/* Right Content Area: Workspace */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {!hasAnalyzed && (
              <div ref={sectionRefs.symptoms} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)' }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>How are you feeling today?</h2>
                <p style={{ color: '#94a3b8', marginBottom: 24 }}>Select common symptoms or describe how you feel in your own words.</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                  {COMMON_SYMPTOMS.map(sym => (
                    <button 
                      key={sym} 
                      onClick={() => toggleSymptom(sym)}
                      style={{ padding: '10px 16px', background: selectedSymptoms.includes(sym) ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)', color: selectedSymptoms.includes(sym) ? '#60a5fa' : '#cbd5e1', border: `1px solid ${selectedSymptoms.includes(sym) ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`, borderRadius: 999, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      {selectedSymptoms.includes(sym) ? '✓ ' : '○ '}{sym}
                    </button>
                  ))}
                </div>

                <div style={{ position: 'relative', marginBottom: 24 }}>
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', padding: '0 12px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>OR</div>
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                </div>

                <textarea 
                  value={customSymptom}
                  onChange={e => setCustomSymptom(e.target.value)}
                  placeholder="Describe your symptoms in detail..."
                  style={{ width: '100%', minHeight: 120, padding: 16, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, color: '#fff', fontSize: 16, resize: 'vertical', outline: 'none', fontFamily: 'inherit', marginBottom: 24 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />

                <button 
                  onClick={handleAnalyze}
                  disabled={selectedSymptoms.length === 0 && !customSymptom.trim() || isAnalyzing}
                  style={{ width: '100%', padding: 16, background: (selectedSymptoms.length > 0 || customSymptom.trim()) ? 'linear-gradient(90deg, #a855f7, #3b82f6)' : 'rgba(255,255,255,0.05)', color: (selectedSymptoms.length > 0 || customSymptom.trim()) ? '#fff' : '#64748b', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 700, cursor: (selectedSymptoms.length > 0 || customSymptom.trim()) ? 'pointer' : 'not-allowed', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, transition: 'all 0.3s' }}
                >
                  {isAnalyzing ? <><Loader2 size={20} className="animate-spin" /> Analyzing Symptoms...</> : <><Activity size={20} /> Analyze Symptoms</>}
                </button>
              </div>
            )}

            {hasAnalyzed && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32, animation: 'fadeIn 0.5s ease-out' }}>
                
                {/* AI Summary Header */}
                <div ref={sectionRefs.summary} style={{ background: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9))', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 24, padding: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{ background: 'rgba(168,85,247,0.2)', padding: 8, borderRadius: 12 }}><Activity size={24} color="#a855f7" /></div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Your Health Summary</h2>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Symptoms</div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{allSymptomsText}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Suggested Department</div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{analysisData?.department || 'General Medicine'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Urgency</div>
                      <div style={{ color: analysisData?.urgency?.color || '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={16}/> {analysisData?.urgency?.level || 'Visit within 24 hours'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Gov Scheme Eligibility</div>
                      <div style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Check size={16}/> Ayushman Eligible</div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis & Urgency */}
                <div ref={sectionRefs.analysis} style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24 }}>
                  <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24 }}>
                    <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Likely Conditions</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                      {(analysisData?.conditions || ['Viral Fever', 'Common Cold', 'Seasonal Allergy']).map((cond, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                          <Check size={18} color="#3b82f6" /> <span style={{ color: '#fff', fontSize: 16 }}>{cond}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <AlertTriangle size={16} color="#f59e0b" style={{ flexShrink: 0, mt: 2 }} />
                      <div style={{ color: '#d97706', fontSize: 13, lineHeight: 1.5 }}><strong>Not a diagnosis.</strong> This analysis is AI-generated based on statistical patterns. Always consult a certified medical professional.</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24, flex: 1 }}>
                      <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Should you seek care?</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ opacity: analysisData?.urgency?.level === 'Home Care' ? 1 : 0.4, background: analysisData?.urgency?.level === 'Home Care' ? 'rgba(16,185,129,0.1)' : 'transparent', padding: analysisData?.urgency?.level === 'Home Care' ? '12px 16px' : '0', borderRadius: 12, border: analysisData?.urgency?.level === 'Home Care' ? '1px solid rgba(16,185,129,0.3)' : 'none', display: 'flex', alignItems: 'center', gap: 12, color: analysisData?.urgency?.level === 'Home Care' ? '#10b981' : '#fff', fontWeight: analysisData?.urgency?.level === 'Home Care' ? 600 : 400 }}>
                          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981', boxShadow: analysisData?.urgency?.level === 'Home Care' ? '0 0 10px #10b981' : 'none' }}></div> 🟢 Home Care
                        </div>
                        <div style={{ opacity: analysisData?.urgency?.level?.includes('Visit') ? 1 : 0.4, background: analysisData?.urgency?.level?.includes('Visit') ? 'rgba(245,158,11,0.1)' : 'transparent', padding: analysisData?.urgency?.level?.includes('Visit') ? '12px 16px' : '0', borderRadius: 12, border: analysisData?.urgency?.level?.includes('Visit') ? '1px solid rgba(245,158,11,0.3)' : 'none', display: 'flex', alignItems: 'center', gap: 12, color: analysisData?.urgency?.level?.includes('Visit') ? '#f59e0b' : '#fff', fontWeight: analysisData?.urgency?.level?.includes('Visit') ? 600 : 400 }}>
                          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b', boxShadow: analysisData?.urgency?.level?.includes('Visit') ? '0 0 10px #f59e0b' : 'none' }}></div> 🟡 Visit OPD Today
                        </div>
                        <div style={{ opacity: analysisData?.urgency?.level?.includes('Emergency') ? 1 : 0.4, background: analysisData?.urgency?.level?.includes('Emergency') ? 'rgba(239,68,68,0.1)' : 'transparent', padding: analysisData?.urgency?.level?.includes('Emergency') ? '12px 16px' : '0', borderRadius: 12, border: analysisData?.urgency?.level?.includes('Emergency') ? '1px solid rgba(239,68,68,0.3)' : 'none', display: 'flex', alignItems: 'center', gap: 12, color: analysisData?.urgency?.level?.includes('Emergency') ? '#ef4444' : '#fff', fontWeight: analysisData?.urgency?.level?.includes('Emergency') ? 600 : 400 }}>
                          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', boxShadow: analysisData?.urgency?.level?.includes('Emergency') ? '0 0 10px #ef4444' : 'none' }}></div> 🔴 Emergency Recommended
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(15,23,42,0.8))', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 24, padding: 24 }}>
                      <div style={{ color: '#60a5fa', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Recommended Dept</div>
                      <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🩺 {analysisData?.department || 'General Physician'}</div>
                      <div style={{ color: '#94a3b8', fontSize: 14 }}>Alternative: {analysisData?.alternative || 'ENT Specialist'}</div>
                    </div>
                  </div>
                </div>

                {/* Online Consultation */}
                <div ref={sectionRefs.consultation} style={{ background: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9))', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 24, padding: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}><Video color="#a855f7" size={24}/> Online Consultation</h3>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontSize: 14, fontWeight: 600 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span> Available Now
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {ONLINE_DOCTORS.map((doc, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                          <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, ${doc.color}, ${doc.color}99)`, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 700, color: '#fff' }}>
                            {doc.initials}
                          </div>
                          <div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{doc.name}</div>
                            <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>{analysisData?.department || 'General Physician'} • {doc.exp}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#eab308', fontSize: 13, fontWeight: 600 }}>
                              <Star size={14} fill="currentColor" /> {doc.rating} <span style={{ color: '#64748b', fontWeight: 400 }}>({doc.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Consultation Fee</div>
                            <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{doc.fee}</div>
                          </div>
                          <button onClick={() => { setBookingDoctor(doc); setSelectedTimeSlot(''); setIsDropdownOpen(false); }} style={{ padding: '12px 24px', background: 'linear-gradient(90deg, #a855f7, #7e22ce)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Video size={18} /> Book Demo Call
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid: Schemes & Preparation */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  
                  {/* Schemes */}
                  <div ref={sectionRefs.schemes} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><ShieldCheck size={20} color="#10b981" /> Government Schemes</h3>
                    <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', padding: 16, borderRadius: 12, marginBottom: 16 }}>
                      <div style={{ color: '#34d399', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>ELIGIBLE SCHEME</div>
                      <div style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>✓ Ayushman Bharat</div>
                      <div style={{ color: '#94a3b8', fontSize: 14 }}>Coverage up to ₹5,00,000</div>
                    </div>
                    
                    {showBenefits && (
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 12, marginBottom: 16, border: '1px solid rgba(255,255,255,0.05)', animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Key Benefits Included:</div>
                        <ul style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <li>Cashless cover of up to <b>₹5,00,000</b> per family per year.</li>
                          <li>Covers up to <b>3 days pre-hospitalization</b> & <b>15 days post-hospitalization</b>.</li>
                          <li>No restriction on family size, age, or gender.</li>
                          <li>Valid across any empanelled hospital in India.</li>
                        </ul>
                      </div>
                    )}
                    
                    <button onClick={() => setShowBenefits(!showBenefits)} style={{ width: '100%', padding: 12, background: showBenefits ? 'rgba(16,185,129,0.1)' : 'transparent', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                      {showBenefits ? 'Hide Benefits' : 'View Benefits →'}
                    </button>
                  </div>

                  {/* Preparation */}
                  <div ref={sectionRefs.prep} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><FileText size={20} color="#3b82f6" /> Before You Visit</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <div style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.1)', padding: 8, borderRadius: 8, height: 'fit-content' }}><Droplets size={16} /></div>
                        <div>
                          <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Stay Hydrated</div>
                          <div style={{ color: '#94a3b8', fontSize: 13 }}>Drink water before you arrive.</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <div style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: 8, borderRadius: 8, height: 'fit-content' }}><FileSignature size={16} /></div>
                        <div>
                          <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Documents to Carry</div>
                          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>
                            • Aadhaar Card<br/>
                            • Previous Reports<br/>
                            • Insurance Card
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medication Tracker */}
                <div ref={sectionRefs.meds} style={{ background: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9))', border: prescriptionState === 'complete' ? '1px solid rgba(16,185,129,0.3)' : '1px dashed rgba(255,255,255,0.2)', borderRadius: 24, padding: 40, textAlign: 'center', transition: 'all 0.3s' }}>
                  
                  {prescriptionState === 'idle' && (
                    <>
                      <div style={{ width: 64, height: 64, background: 'rgba(168,85,247,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px auto' }}>
                        <Upload size={28} color="#a855f7" />
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Medication Tracker</h3>
                      <p style={{ color: '#94a3b8', maxWidth: 400, margin: '0 auto 24px auto' }}>
                        After your visit, upload your doctor's prescription. AI will automatically extract medicines and set up your daily reminders.
                      </p>
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,.pdf" style={{ display: 'none' }} />
                      <button onClick={() => fileInputRef.current?.click()} style={{ padding: '12px 24px', background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Upload size={16} /> Upload Prescription
                      </button>
                      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 24, color: '#64748b', fontSize: 13 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14}/> Auto-Reminders</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14}/> Dosage Timing</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14}/> Refill Alerts</span>
                      </div>
                    </>
                  )}

                  {(prescriptionState === 'uploading' || prescriptionState === 'analyzing') && (
                    <div style={{ padding: '40px 0', animation: 'fadeIn 0.3s' }}>
                      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', border: '2px solid rgba(59,130,246,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 24px auto' }}>
                        <Loader2 size={32} color="#60a5fa" className="animate-spin" />
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                        {prescriptionState === 'uploading' ? 'Uploading Prescription...' : 'Extracting Medicines with AI...'}
                      </h3>
                      <p style={{ color: '#94a3b8', maxWidth: 400, margin: '0 auto' }}>
                        {prescriptionState === 'uploading' ? 'Securely transmitting your document...' : 'Analyzing handwriting and generating your dosage schedule...'}
                      </p>
                    </div>
                  )}

                  {prescriptionState === 'complete' && (
                    <div style={{ textAlign: 'left', animation: 'fadeIn 0.5s ease-out' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ background: 'rgba(16,185,129,0.2)', padding: 8, borderRadius: 12 }}><ShieldCheck size={24} color="#10b981" /></div>
                          <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Active Medications</h3>
                        </div>
                        <span style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', padding: '6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Bell size={14} /> Reminders Active
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {MOCK_MEDS.map((med, idx) => (
                          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(168,85,247,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Pill size={24} color="#a855f7" />
                              </div>
                              <div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{med.name}</div>
                                <div style={{ color: '#94a3b8', fontSize: 14 }}>{med.dosage} • {med.timing}</div>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                              <div>
                                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Duration</div>
                                <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{med.days}</div>
                              </div>
                              <button 
                                onClick={() => {
                                  if (!activeAlerts.includes(idx)) {
                                    showToast(`Alert set! You'll be notified for ${med.name} at ${med.timing.split('(')[1]?.replace(')','') || '8:00 AM'}`);
                                  }
                                  setActiveAlerts(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
                                }} 
                                style={{ 
                                  padding: '6px 12px', 
                                  background: activeAlerts.includes(idx) ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)', 
                                  color: activeAlerts.includes(idx) ? '#10b981' : '#60a5fa', 
                                  border: `1px solid ${activeAlerts.includes(idx) ? 'rgba(16,185,129,0.3)' : 'rgba(59,130,246,0.3)'}`, 
                                  borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.2s' 
                                }}
                              >
                                {activeAlerts.includes(idx) ? <Check size={12} /> : <BellRing size={12} />} 
                                {activeAlerts.includes(idx) ? 'Alert Active' : 'Set Alert'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <button style={{ padding: '10px 20px', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 14, cursor: 'pointer' }} onClick={() => setPrescriptionState('idle')}>
                          Upload Another
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {bookingDoctor && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24, animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 32, width: '100%', maxWidth: 480, position: 'relative' }}>
            <button onClick={() => { setBookingDoctor(null); setBookingStatus('idle'); }} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', borderRadius: '50%', width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${bookingDoctor.color}, ${bookingDoctor.color}99)`, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>
                {bookingDoctor.initials}
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{bookingDoctor.name}</h3>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{analysisData?.department || 'General Physician'} Consultation</div>
              </div>
            </div>

            {bookingStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px', border: '2px solid rgba(16,185,129,0.3)' }}>
                  <Check size={32} color="#10b981" />
                </div>
                <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Booking Confirmed!</h4>
                <p style={{ color: '#94a3b8', marginBottom: 24 }}>An SMS with the video call link has been sent to your number.</p>
                <button onClick={() => { setBookingDoctor(null); setBookingStatus('idle'); }} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontWeight: 600, cursor: 'pointer', width: '100%' }}>Done</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBookingStatus('submitting'); setTimeout(() => setBookingStatus('success'), 1500); }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Patient Name</label>
                    <input type="text" required placeholder="Enter full name" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Phone Number</label>
                    <input type="tel" required pattern="[0-9]{10}" minLength="10" maxLength="10" title="Please enter a valid 10-digit phone number" placeholder="10-digit mobile number" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Preferred Time (Today)</label>
                    <div style={{ position: 'relative' }}>
                      <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: selectedTimeSlot ? '#fff' : '#64748b', outline: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      >
                        {selectedTimeSlot || 'Select time slot'}
                        <ChevronDown size={16} color="#94a3b8" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                      </div>
                      
                      {isDropdownOpen && (
                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden', zIndex: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                          {['As soon as possible', 'Evening (5 PM - 8 PM)', 'Night (8 PM - 11 PM)'].map(slot => (
                            <div 
                              key={slot}
                              onClick={() => { setSelectedTimeSlot(slot); setIsDropdownOpen(false); }}
                              style={{ padding: '12px 16px', color: '#fff', cursor: 'pointer', background: selectedTimeSlot === slot ? 'rgba(59,130,246,0.2)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                              onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
                              onMouseLeave={e => e.target.style.background = selectedTimeSlot === slot ? 'rgba(59,130,246,0.2)' : 'transparent'}
                            >
                              {slot}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 24 }}>
                  <span style={{ color: '#94a3b8' }}>Consultation Fee</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{bookingDoctor.fee}</span>
                </div>

                <button type="submit" disabled={bookingStatus === 'submitting'} style={{ width: '100%', padding: 16, background: 'linear-gradient(90deg, #a855f7, #7e22ce)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: bookingStatus === 'submitting' ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, opacity: bookingStatus === 'submitting' ? 0.7 : 1 }}>
                  {bookingStatus === 'submitting' ? <Loader2 size={20} className="animate-spin" /> : 'Confirm & Pay Later'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#fff', padding: '12px 24px', borderRadius: 999, fontWeight: 600, fontSize: 14, boxShadow: '0 10px 25px rgba(16,185,129,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: 8, animation: 'fadeIn 0.3s ease-out' }}>
          <BellRing size={16} /> {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
