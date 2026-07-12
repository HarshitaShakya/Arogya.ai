import React, { useState, useEffect } from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'

const JOURNEY_STEPS = [
  {
    id: 1,
    icon: '🩺',
    title: 'Symptoms',
    content: (
      <div>
        <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12, fontWeight: 600, textTransform: 'uppercase' }}>Symptoms Detected</div>
        <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#e2e8f0', fontSize: 15, marginBottom: 16 }}>
          <li>Fever (102°F)</li>
          <li>Dry Cough</li>
          <li>Headache</li>
          <li>Fatigue</li>
        </ul>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Duration</div>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>3 Days</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Severity</div>
            <div style={{ color: '#f59e0b', fontWeight: 'bold' }}>Moderate</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>AI Confidence</div>
            <div style={{ color: '#22c55e', fontWeight: 'bold' }}>96%</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Last Updated</div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>Today • 10:24 AM</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    icon: '🏥',
    title: 'Suggested Department',
    content: (
      <div>
        <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: 16, borderRadius: 12, marginBottom: 16 }}>
          <div style={{ color: '#60a5fa', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Recommended Department</div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>General Medicine</div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Alternative</div>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>Pulmonology</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Est. Waiting</div>
            <div style={{ color: '#facc15', fontWeight: 'bold' }}>18 minutes</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Reason</div>
          <div style={{ color: '#e2e8f0', fontSize: 14 }}>Persistent fever and respiratory symptoms.</div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    icon: '🧪',
    title: 'Suggested Tests',
    content: (
      <div>
        <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12, fontWeight: 600, textTransform: 'uppercase' }}>Recommended Tests</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {['CBC', 'Chest X-Ray', 'CRP', 'COVID / Flu Test'].map(test => (
            <span key={test} style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', padding: '6px 12px', borderRadius: 999, fontSize: 14, border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
              ✓ {test}
            </span>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#fca5a5', fontSize: 12 }}>Priority</div>
            <div style={{ color: '#ef4444', fontWeight: 'bold' }}>High</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Estimated Cost</div>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>₹600–₹1200</div>
          </div>
        </div>
        <div style={{ background: 'rgba(59,130,246,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(59,130,246,0.2)' }}>
          <div style={{ color: '#60a5fa', fontSize: 12, marginBottom: 4 }}>Why these tests?</div>
          <div style={{ color: '#e2e8f0', fontSize: 14 }}>AI explains each recommendation based on overlapping symptom profiles.</div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    icon: '🚑',
    title: 'Nearby Hospitals',
    content: (
      <div>
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: 16, borderRadius: 12, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ color: '#34d399', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Best Match</div>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            City Hospital
            <span style={{ fontSize: 16, background: '#10b981', color: '#fff', padding: '4px 10px', borderRadius: 999 }}>98% Match</span>
          </div>
          <div style={{ color: '#a7f3d0', fontSize: 14, marginTop: 4 }}>2.3 km away</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Emergency</div>
            <div style={{ color: '#22c55e', fontWeight: 'bold' }}>Available</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Beds</div>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>42 Available</div>
          </div>
        </div>
        <button style={{ width: '100%', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.5)', padding: 12, borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
          📍 Get Directions
        </button>
      </div>
    )
  },
  {
    id: 5,
    icon: '📅',
    title: 'Book Appointment',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 24, boxShadow: '0 4px 12px rgba(59,130,246,0.4)' }}>👨🏽‍⚕️</div>
          <div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Doctor</div>
            <div style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Dr. Sharma</div>
            <div style={{ color: '#60a5fa', fontSize: 14 }}>General Medicine</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Next Available</div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>11:30 AM</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Est. Waiting</div>
            <div style={{ color: '#facc15', fontWeight: 'bold', fontSize: 16 }}>20 mins</div>
          </div>
        </div>
        <button style={{ width: '100%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', color: '#fff', border: 'none', padding: 14, borderRadius: 8, fontWeight: 'bold', fontSize: 16, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, boxShadow: '0 8px 20px rgba(59,130,246,0.4)' }}>
          ⚡ Book Instantly
        </button>
      </div>
    )
  },
  {
    id: 6,
    icon: '💊',
    title: 'Medicine Reminder',
    content: (
      <div>
        <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12, fontWeight: 600, textTransform: 'uppercase' }}>Today's Schedule</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '12px 16px', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: '#10b981', color: '#fff', width: 24, height: 24, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 12 }}>✓</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 'bold' }}>Paracetamol</div>
                <div style={{ color: '#34d399', fontSize: 12 }}>8:00 AM</div>
              </div>
            </div>
            <span style={{ color: '#34d399', fontSize: 12, fontWeight: 'bold' }}>Taken</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.4)', padding: '12px 16px', borderRadius: 12, boxShadow: '0 0 15px rgba(59,130,246,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ border: '2px solid #60a5fa', width: 24, height: 24, borderRadius: '50%' }}></div>
              <div>
                <div style={{ color: '#fff', fontWeight: 'bold' }}>Antibiotic</div>
                <div style={{ color: '#60a5fa', fontSize: 12 }}>2:00 PM</div>
              </div>
            </div>
            <span style={{ color: '#60a5fa', fontSize: 12, fontWeight: 'bold' }}>Upcoming</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ border: '2px solid rgba(255,255,255,0.2)', width: 24, height: 24, borderRadius: '50%' }}></div>
              <div>
                <div style={{ color: '#cbd5e1', fontWeight: 'bold' }}>Vitamin C</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>9:00 PM</div>
              </div>
            </div>
            <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 'bold' }}>Reminder</span>
          </div>

        </div>
        <div style={{ textAlign: 'center', color: '#60a5fa', fontSize: 14, fontWeight: 'bold' }}>
          Next Dose in 2 Hours
        </div>
      </div>
    )
  },
  {
    id: 7,
    icon: '📈',
    title: 'Recovery Tracking',
    content: (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Recovery Progress</span>
          <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: 24 }}>82%</span>
        </div>
        <div style={{ height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 999, marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ width: '82%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)', borderRadius: 999, boxShadow: '0 0 10px rgba(16,185,129,0.5)' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Temperature</div>
            <div style={{ color: '#22c55e', fontWeight: 'bold' }}>Normal</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Symptoms</div>
            <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>Improving</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          <div style={{ color: '#94a3b8', fontSize: 12 }}>Expected Recovery</div>
          <div style={{ color: '#fff', fontWeight: 'bold' }}>3 Days</div>
        </div>

        <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: 16, borderRadius: 12 }}>
          <div style={{ color: '#60a5fa', fontSize: 12, fontWeight: 'bold', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>✨</span> AI Advice
          </div>
          <div style={{ color: '#e2e8f0', fontSize: 14 }}>
            Continue medication and stay hydrated. Your vitals are returning to baseline.
          </div>
        </div>
      </div>
    )
  }
]

export default function AiTreatmentJourney() {
  const [activeStep, setActiveStep] = useState(1)
  const [expandedStep, setExpandedStep] = useState(1)

  useEffect(() => {
    // Automatically open the expanded card for the active step
    setExpandedStep(activeStep)
  }, [activeStep])

  const progressPercent = ((activeStep - 1) / (JOURNEY_STEPS.length - 1)) * 100

  // Contextual smart notifications based on step
  const smartNotifications = {
    1: "AI is analyzing your symptom profile...",
    2: "Matching symptoms to optimal medical departments.",
    3: "Compiling necessary preliminary tests.",
    4: "📍 Hospital is only 8 minutes away.",
    5: "📅 Appointment starts in 20 minutes.",
    6: "💊 Your next medicine is due in 45 minutes.",
    7: "🎉 Recovery is on track. Keep resting!"
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '100px 24px', overflowX: 'hidden' }}>
      
      {/* Dynamic Background Effects */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 60%)', filter: 'blur(60px)' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)', filter: 'blur(60px)' }}></div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 24 }}>
            <span style={{ fontSize: 16 }}>🧠</span>
            <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>Interactive Roadmap</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-1px' }}>
            Your <span style={{ background: 'linear-gradient(135deg, #3b82f6, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Treatment</span> Journey
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Like Google Maps, but for healthcare. We guide you at every step, from the first symptom to complete recovery.
          </p>
        </div>

        {/* Floating Top Progress Bar */}
        <div style={{ position: 'sticky', top: 80, zIndex: 50, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', borderRadius: 20, marginBottom: 48, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 'bold', whiteSpace: 'nowrap', color: '#e2e8f0' }}>Treatment Progress</div>
          <div style={{ flex: 1, position: 'relative', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #3b82f6, #10b981)', borderRadius: 2, transition: 'width 0.5s ease', boxShadow: '0 0 10px rgba(59,130,246,0.5)' }}></div>
            {/* Dots */}
            {JOURNEY_STEPS.map((s, i) => {
              const p = (i / (JOURNEY_STEPS.length - 1)) * 100;
              return (
                <div key={i} onClick={() => setActiveStep(i + 1)} style={{ position: 'absolute', left: `${p}%`, top: '50%', transform: 'translate(-50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: i < activeStep ? (i === activeStep - 1 ? '#38bdf8' : '#10b981') : '#334155', border: '2px solid #0f172a', cursor: 'pointer', transition: 'all 0.3s' }}></div>
              )
            })}
          </div>
          <div style={{ fontSize: 14, fontWeight: 'bold', color: '#38bdf8', minWidth: 40, textAlign: 'right' }}>{Math.round(progressPercent)}%</div>
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          
          {/* Timeline Nodes */}
          <div style={{ flex: 1, position: 'relative' }}>
            
            {/* Animated SVG ECG Path connecting nodes */}
            <div style={{ position: 'absolute', top: 20, bottom: 20, left: 24, width: 2, background: 'rgba(255,255,255,0.05)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: 20, height: `calc(${progressPercent}% - 40px)`, left: 24, width: 2, background: 'linear-gradient(180deg, #3b82f6, #10b981)', zIndex: 1, transition: 'height 0.5s ease', boxShadow: '0 0 15px rgba(59,130,246,0.6)' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {JOURNEY_STEPS.map((step) => {
                const isCompleted = step.id < activeStep;
                const isActive = step.id === activeStep;
                const isExpanded = expandedStep === step.id;

                let statusColor = '#334155'; // upcoming
                if (isCompleted) statusColor = '#10b981'; // green
                if (isActive) statusColor = '#38bdf8'; // cyan

                return (
                  <div key={step.id} style={{ display: 'flex', gap: 24, position: 'relative', zIndex: 2 }}>
                    
                    {/* Node Icon */}
                    <div 
                      onClick={() => {
                        setActiveStep(step.id);
                      }}
                      style={{ 
                        flex: '0 0 50px', height: 50, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 22, cursor: 'pointer',
                        background: isActive ? 'rgba(56,189,248,0.2)' : isCompleted ? 'rgba(16,185,129,0.1)' : 'rgba(30,41,59,0.5)',
                        border: `2px solid ${statusColor}`,
                        boxShadow: isActive ? '0 0 20px rgba(56,189,248,0.4), inset 0 0 10px rgba(56,189,248,0.2)' : 'none',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}>
                      {step.icon}
                      {isActive && (
                        <div style={{ position: 'absolute', inset: -6, border: '1px solid rgba(56,189,248,0.5)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                      )}
                    </div>

                    {/* Node Card */}
                    <div 
                      onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                      style={{ 
                        flex: 1, 
                        background: isActive ? 'rgba(30,41,59,0.7)' : 'rgba(15,23,42,0.4)', 
                        backdropFilter: 'blur(20px)', 
                        border: `1px solid ${isActive ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.05)'}`, 
                        borderRadius: 20, 
                        padding: '20px 24px', 
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                        transform: isActive ? 'scale(1.02)' : 'scale(1)',
                        opacity: (isCompleted || isActive) ? 1 : 0.5
                      }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <h3 style={{ fontSize: 18, fontWeight: isActive ? 800 : 600, color: isActive ? '#fff' : '#cbd5e1', margin: 0 }}>
                            {step.id}. {step.title}
                          </h3>
                          {isCompleted && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                        <div style={{ color: '#64748b', transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <div style={{ 
                        maxHeight: isExpanded ? 500 : 0, 
                        overflow: 'hidden', 
                        opacity: isExpanded ? 1 : 0, 
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        marginTop: isExpanded ? 24 : 0
                      }}>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24 }}>
                          {step.content}
                        </div>
                        
                        {isActive && step.id < JOURNEY_STEPS.length && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveStep(step.id + 1); }}
                            style={{ marginTop: 24, width: '100%', padding: 14, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          >
                            Mark Complete & Continue ↓
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Panel: Floating AI Insights & Smart Notifications */}
          <div style={{ width: 340, position: 'relative' }}>
            <div style={{ position: 'sticky', top: 200, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Smart Notification context based */}
              <div style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(59,130,246,0.1))', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 20, padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 0 20px rgba(56,189,248,0.1)', backdropFilter: 'blur(20px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8', animation: 'pulse-cyan 2s infinite' }}></div>
                  <div style={{ color: '#38bdf8', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Live Update</div>
                </div>
                <div style={{ fontSize: 16, color: '#f8fafc', lineHeight: 1.5, fontWeight: 500 }}>
                  {smartNotifications[activeStep]}
                </div>
              </div>

              {/* AI Insights Card */}
              <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)' }}>
                <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>✨</span> AI Insight
                </div>
                <p style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.6, marginBottom: 20 }}>
                  {activeStep <= 3 && "Based on your symptoms, we are gathering the best diagnostic options."}
                  {activeStep > 3 && activeStep < 7 && "Everything is set up. Ensure you carry your past medical records to the appointment."}
                  {activeStep === 7 && "Recovery is progressing well. Continue prescribed medication."}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ color: '#64748b', fontSize: 12 }}>Confidence</div>
                  <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                    <div style={{ width: '97%', height: '100%', background: '#10b981', borderRadius: 2 }}></div>
                  </div>
                  <div style={{ color: '#10b981', fontSize: 13, fontWeight: 'bold' }}>97%</div>
                </div>
              </div>

              {/* Estimated Timeline Mini Map */}
              <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)' }}>
                <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>Estimated Timeline</div>
                
                {[
                  { lbl: 'Symptoms', time: 'Today', act: activeStep >= 1 },
                  { lbl: 'AI Analysis', time: '5 mins', act: activeStep >= 2 },
                  { lbl: 'Hospital Visit', time: '15 mins', act: activeStep >= 4 },
                  { lbl: 'Tests', time: '30 mins', act: activeStep >= 5 },
                  { lbl: 'Medication', time: '1 Day', act: activeStep >= 6 },
                  { lbl: 'Recovery', time: '3 Days', act: activeStep >= 7 },
                ].map((t, idx, arr) => (
                  <div key={idx} style={{ display: 'flex', gap: 16, opacity: t.act ? 1 : 0.4 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.act ? '#3b82f6' : '#334155', marginTop: 4 }}></div>
                      {idx < arr.length - 1 && <div style={{ width: 2, height: 24, background: t.act ? 'rgba(59,130,246,0.5)' : '#334155', margin: '4px 0' }}></div>}
                    </div>
                    <div style={{ paddingBottom: 20 }}>
                      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{t.lbl}</div>
                      <div style={{ color: '#64748b', fontSize: 12 }}>{t.time}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pulse-cyan {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
