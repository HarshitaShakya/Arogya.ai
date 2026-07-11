import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '../store/appStore'
import FloatingRobot from './FloatingRobot'

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [chatState, setChatState] = useState('initial') // 'initial', 'asking_type', 'asking_duration', 'done'
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Namaste! I am Arogya Assistant. Where do you feel pain or discomfort?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const bottomRef = useRef(null)
  const recognitionRef = useRef(null)
  const { darkMode } = useAppStore()

  // Premium colors
  const glassBg = darkMode ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.7)'
  const glassBorder = darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'
  const text = darkMode ? '#f8fafc' : '#0f172a'
  const muted = darkMode ? '#94a3b8' : '#64748b'
  const assistantMsgBg = darkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(241, 245, 249, 0.8)'
  const inputBg = darkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)'
  const headerGradient = 'linear-gradient(135deg, rgba(79, 140, 255, 0.15), rgba(89, 225, 255, 0.15))'
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-IN'

      recognition.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript
        }
        setInput(transcript)
      }

      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)

      recognitionRef.current = recognition
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start()
        setIsListening(true)
      } else {
        alert("Your browser does not support Voice Recognition. Please use Chrome or Edge.")
      }
    }
  }

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1000))
    
    // Step-by-step Mock Logic
    let botReply = ''
    if (chatState === 'initial') {
      botReply = 'Is the pain sharp or dull?'
      setChatState('asking_type')
    } else if (chatState === 'asking_type') {
      botReply = 'Since when have you been experiencing this?'
      setChatState('asking_duration')
    } else if (chatState === 'asking_duration') {
      botReply = 'Based on your symptoms, it could be related to muscle strain, acid reflux, or a potential cardiac issue. With a confidence of 87%, I recommend visiting the **Cardiology** or **General Medicine** department for a proper checkup. \n\nWould you like me to find the nearest government hospitals with these free departments?'
      setChatState('done')
    } else {
      botReply = 'I can help you search for the nearest hospitals with those departments. Just click "Find Hospital" in the navigation bar!'
    }

    setMessages(prev => [...prev, { role: 'assistant', text: botReply }])
    setLoading(false)
  }

  return (
    <div>
      <style>{`
        @keyframes fadeUpScale { 
          from { opacity: 0; transform: translateY(20px) scale(0.95); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes dotPulse { 0%, 100% { transform: scale(0.8); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 1; } }
        @keyframes micPulse { 
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 
          70% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); } 
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } 
        }
        
        .chat-window { 
          animation: fadeUpScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        
        .msg-user { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .msg-assistant { animation: slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .chat-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.3); border-radius: 10px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.5); }
        
        .chip-btn {
          transition: all 0.2s ease;
        }
        .chip-btn:hover {
          transform: translateY(-2px);
          background: rgba(89, 225, 255, 0.15) !important;
          color: #59e1ff !important;
          border-color: rgba(89, 225, 255, 0.3) !important;
        }
        
        .send-btn {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(89,225,255,0.4);
        }
        .send-btn:active:not(:disabled) {
          transform: scale(0.95);
        }
      `}</style>

      <div style={{ position: 'fixed', bottom: 28, right: 40, zIndex: 999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <FloatingRobot onClick={() => setOpen(!open)} isOpen={open} />
      </div>

      {open && (
        <div className="chat-window" style={{ 
          position: 'fixed', bottom: 100, right: 28, width: 380, 
          height: isExpanded ? 'calc(100vh - 130px)' : 560, 
          maxHeight: '85vh',
          backgroundColor: glassBg, 
          border: '1px solid ' + glassBorder, 
          borderRadius: 28, 
          boxShadow: '0 32px 64px rgba(0,0,0,0.2), 0 0 0 1px inset rgba(255,255,255,0.1)', 
          display: 'flex', flexDirection: 'column', zIndex: 998, overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '20px 24px', 
            background: headerGradient, 
            borderBottom: '1px solid ' + glassBorder,
            display: 'flex', alignItems: 'center', gap: 14,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.8)',
              position: 'relative'
            }}>
              {/* Mini Robot Head */}
              <div style={{
                width: 28, height: 22,
                background: 'radial-gradient(circle at 35% 25%, #ffffff, #e2e8f0 70%, #cbd5e1)',
                borderRadius: '16px 16px 12px 12px',
                boxShadow: '-2px -2px 4px rgba(255,255,255,0.9) inset, 2px 2px 4px rgba(0,0,0,0.1) inset, 0 4px 8px rgba(0,0,0,0.1)',
                position: 'relative',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                {/* Visor */}
                <div style={{
                  width: 22, height: 10,
                  background: '#0f172a',
                  borderRadius: '10px',
                  position: 'absolute', top: 5,
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.8)',
                  overflow: 'hidden',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  gap: 4
                }}>
                  {/* Glare */}
                  <div style={{
                    position: 'absolute', top: -2, left: 2,
                    width: 14, height: 4,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
                    borderRadius: 4, transform: 'rotate(-10deg)', pointerEvents: 'none'
                  }} />
                  {/* Eyes */}
                  <div style={{ width: 4, height: 4, background: '#59e1ff', borderRadius: '50%', boxShadow: '0 0 4px #59e1ff', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 1, left: 1, width: 1.5, height: 1.5, background: '#fff', borderRadius: '50%' }} />
                  </div>
                  <div style={{ width: 4, height: 4, background: '#59e1ff', borderRadius: '50%', boxShadow: '0 0 4px #59e1ff', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 1, left: 1, width: 1.5, height: 1.5, background: '#fff', borderRadius: '50%' }} />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, background: '#10b981', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 0 8px #10b981' }} />
            </div>
            <div>
              <div style={{ color: text, fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px' }}>Arogya Assistant</div>
              <div style={{ color: '#59e1ff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, background: '#59e1ff', borderRadius: '50%', boxShadow: '0 0 6px #59e1ff' }} />
                AI Online
              </div>
            </div>
            
            {/* Expand Toggle */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                marginLeft: 'auto',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: text,
                opacity: 0.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.background = 'transparent' }}
              title={isExpanded ? "Collapse" : "Expand Vertically"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'msg-user' : 'msg-assistant'} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ 
                  maxWidth: '82%', padding: '12px 16px', 
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px', 
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #4F8CFF 0%, #59E1FF 100%)' : assistantMsgBg, 
                  color: msg.role === 'user' ? '#fff' : text, 
                  fontSize: 14, lineHeight: 1.5,
                  boxShadow: msg.role === 'user' ? '0 8px 16px rgba(79,140,255,0.2)' : '0 4px 12px rgba(0,0,0,0.05)',
                  border: msg.role === 'user' ? 'none' : '1px solid ' + glassBorder
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="msg-assistant" style={{ display: 'flex', gap: 6, padding: '16px', background: assistantMsgBg, borderRadius: '20px 20px 20px 4px', width: 'fit-content', border: '1px solid ' + glassBorder }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 6, height: 6, backgroundColor: '#59e1ff', borderRadius: '50%', display: 'inline-block', animation: 'dotPulse 1.4s ease-in-out infinite', animationDelay: i * 0.15 + 's', boxShadow: '0 0 4px #59e1ff' }}></span>
                ))}
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* Suggestions */}
          <div className="chat-scroll" style={{ padding: '0 20px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {['Severe Chest Pain', 'High Fever for 3 days', 'Stomach Ache', 'Difficulty Breathing', 'Nearest Emergency'].map(s => (
              <button key={s} className="chip-btn" onClick={() => setInput(s)}
                style={{ 
                  padding: '8px 16px', 
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', 
                  color: text, 
                  borderRadius: 999, 
                  border: '1px solid ' + glassBorder, 
                  fontSize: 13, 
                  cursor: 'pointer', 
                  whiteSpace: 'nowrap',
                  fontWeight: 500
                }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid ' + glassBorder, background: darkMode ? 'rgba(15,23,42,0.8)' : 'rgba(255,255,255,0.9)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <input type="text" placeholder="Describe your symptoms..."
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              style={{ 
                flex: 1, padding: '14px 20px', 
                backgroundColor: inputBg, 
                border: '1px solid ' + glassBorder, 
                borderRadius: 999, 
                color: text, 
                fontSize: 14, 
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }} 
              onFocus={e => e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.05), 0 0 0 2px rgba(89,225,255,0.3)'}
              onBlur={e => e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.05)'}
            />
            
            <button onClick={toggleListening} 
              style={{
                width: 46, height: 46, flexShrink: 0,
                background: isListening ? '#ef4444' : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                color: isListening ? '#fff' : text,
                borderRadius: '50%', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: isListening ? 'micPulse 1.5s infinite' : 'none',
                transition: 'all 0.2s ease',
              }}
              title="Voice Doctor"
            >
              {isListening ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="6" height="6"></rect></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              )}
            </button>
            <button className="send-btn" onClick={send} disabled={loading || !input.trim()}
              style={{ 
                width: 46, height: 46, flexShrink: 0,
                background: (!input.trim() || loading) ? (darkMode ? '#334155' : '#e2e8f0') : 'linear-gradient(135deg, #4F8CFF 0%, #59E1FF 100%)', 
                color: (!input.trim() || loading) ? muted : '#fff', 
                borderRadius: '50%', 
                border: 'none', 
                cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: (!input.trim() || loading) ? 'none' : '0 4px 12px rgba(79,140,255,0.3)'
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(1px)' }}>
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

