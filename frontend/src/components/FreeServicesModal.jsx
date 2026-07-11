import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

export default function FreeServicesModal({ isOpen, onClose, selectedState, selectedDistrict }) {
  const { darkMode } = useAppStore()
  const navigate = useNavigate()

  if (!isOpen) return null

  return createPortal(
    <>
      <style>{`
        @keyframes slide-up-fade {
          from { transform: translateY(60px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .free-services-modal {
          animation: slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .service-card {
          transition: all 0.2s ease;
        }
        .service-card:hover {
          transform: translateY(-4px) scale(1.02);
        }
        .service-card:active {
          transform: scale(0.98);
        }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflowY: 'auto', display: 'flex', padding: '20px' }}>
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} onClick={onClose}></div>
        
        <div className="free-services-modal" style={{ 
          position: 'relative', 
          margin: 'auto',
          width: '95%', maxWidth: 1000, 
          backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
          border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'), 
          borderRadius: 32, 
          padding: '48px 40px', 
          boxShadow: '0 25px 50px -12px rgba(245,158,11,0.25)',
          color: darkMode ? '#f8fafc' : '#0f172a'
        }}>
          {/* Close Button */}
          <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ 
              width: 88, height: 88, 
              backgroundColor: 'rgba(245,158,11,0.15)', 
              borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 20px',
            }}>
              <span style={{ fontSize: 40 }}>✨</span>
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#f59e0b', margin: '0 0 12px 0', letterSpacing: -0.5 }}>Free Govt. Services</h2>
            <p style={{ color: '#94a3b8', fontSize: 18, margin: 0 }}>Access 100% free healthcare facilities available to all citizens.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {/* Free Medicines */}
            <div className="service-card" onClick={() => { navigate(`/free-services-search?q=Free Medicines&state=${selectedState}&district=${selectedDistrict}`); onClose(); }} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
              padding: '32px', backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
              border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0'),
              borderRadius: 24, cursor: 'pointer', height: '100%'
            }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💊</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: darkMode ? '#fff' : '#0f172a', margin: '0 0 8px 0' }}>Free Medicines</h3>
                <p style={{ fontSize: 15, color: '#10b981', fontWeight: 600, margin: 0 }}>Available Today</p>
              </div>
              <div style={{ color: '#3b82f6', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
                Find nearest hospital <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </div>

            {/* Free Lab Tests */}
            <div className="service-card" onClick={() => { navigate(`/free-services-search?q=Free Lab Tests&state=${selectedState}&district=${selectedDistrict}`); onClose(); }} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
              padding: '32px', backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
              border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0'),
              borderRadius: 24, cursor: 'pointer', height: '100%'
            }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🧪</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: darkMode ? '#fff' : '#0f172a', margin: '0 0 8px 0' }}>Free Lab Tests</h3>
                <p style={{ fontSize: 15, color: '#94a3b8', margin: 0 }}>CBC, Sugar, etc.</p>
              </div>
              <div style={{ color: '#3b82f6', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
                Check availability <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </div>

            {/* Emergency Ambulance */}
            <a href="tel:108" className="service-card" style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
              padding: '32px', backgroundColor: darkMode ? 'rgba(239,68,68,0.1)' : '#fef2f2',
              border: '1px solid ' + (darkMode ? 'rgba(239,68,68,0.2)' : '#fecaca'),
              borderRadius: 24, textDecoration: 'none', height: '100%'
            }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🚑</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#ef4444', margin: '0 0 8px 0' }}>Emergency Ambulance</h3>
                <p style={{ fontSize: 15, color: '#ef4444', margin: 0, opacity: 0.8 }}>108 / 102</p>
              </div>
              <div style={{ color: '#ef4444', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
                Call now <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
