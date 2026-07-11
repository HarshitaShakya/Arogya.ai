import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAppStore } from '../store/appStore'

export default function EmergencyModal({ isOpen, onClose }) {
  const { darkMode } = useAppStore()
  const [locationStr, setLocationStr] = useState('Fetching live location...')
  const [mapLink, setMapLink] = useState('')
  const [locationStatus, setLocationStatus] = useState('loading') // loading, success, error

  useEffect(() => {
    if (isOpen) {
      setLocationStatus('loading')
      setLocationStr('Fetching live location...')
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            const link = `https://maps.google.com/?q=${lat},${lng}`
            setMapLink(link)
            setLocationStr(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`)
            setLocationStatus('success')
          },
          (error) => {
            console.error(error)
            setLocationStr('Location access denied or unavailable.')
            setLocationStatus('error')
            setMapLink('')
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
      } else {
        setLocationStr('Geolocation not supported by this browser.')
        setLocationStatus('error')
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  // MOCK MEDICAL HISTORY (In a real app, this would come from the user's profile)
  const medicalHistory = "Blood Type: O+, Diabetic (Type 2), No known allergies."
  
  const smsMessage = `EMERGENCY SOS: I need urgent medical help! ${
    mapLink ? `My live location is: ${mapLink}` : 'Location unavailable.'
  } Medical History: ${medicalHistory}`
  
  // URL Encode the body for the SMS URI
  const smsHref = `sms:?body=${encodeURIComponent(smsMessage)}`

  return createPortal(
    <>
      <style>{`
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .sos-modal {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .sos-btn:active {
          transform: scale(0.96);
        }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflowY: 'auto', display: 'flex', padding: '20px' }}>
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} onClick={onClose}></div>
        
        <div className="sos-modal" style={{ 
          position: 'relative', 
          margin: 'auto',
          width: '100%', maxWidth: 440, 
          backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
          border: '2px solid #ef4444', 
          borderRadius: 24, 
          padding: '32px 24px', 
          boxShadow: '0 25px 50px -12px rgba(239,68,68,0.25)',
          color: darkMode ? '#f8fafc' : '#0f172a'
        }}>
          {/* Close Button */}
          <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ 
              width: 80, height: 80, 
              backgroundColor: 'rgba(239,68,68,0.1)', 
              borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 20px',
              animation: 'pulse-red 2s infinite'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ef4444', margin: '0 0 8px 0', letterSpacing: 1 }}>EMERGENCY SOS</h2>
            <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>Tap below to immediately trigger emergency services.</p>
          </div>

          <div style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderRadius: 16, padding: 16, marginBottom: 24, border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>📍</span>
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Live Location</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: locationStatus === 'loading' ? '#eab308' : locationStatus === 'error' ? '#ef4444' : '#10b981' }}>
                  {locationStr}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>🏥</span>
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Medical Profile attached</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{medicalHistory}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="tel:108" className="sos-btn" style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              padding: '18px 24px', backgroundColor: '#ef4444', color: '#fff', 
              borderRadius: 16, textDecoration: 'none', fontSize: 18, fontWeight: 700,
              boxShadow: '0 8px 16px rgba(239,68,68,0.3)', transition: 'all 0.2s ease'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call Ambulance (108)
            </a>

            <a href={smsHref} className="sos-btn" style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              padding: '18px 24px', backgroundColor: '#3b82f6', color: '#fff', 
              borderRadius: 16, textDecoration: 'none', fontSize: 16, fontWeight: 700,
              boxShadow: '0 8px 16px rgba(59,130,246,0.3)', transition: 'all 0.2s ease'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Send SOS SMS to Family
            </a>
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 16, marginBottom: 0 }}>
            Tapping the buttons above will open your phone's native dialer or SMS app.
          </p>
        </div>
      </div>
    </>,
    document.body
  )
}
