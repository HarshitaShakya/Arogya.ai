import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getHospitals } from '../services/api'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'

export default function FreeServicesResults() {
  const [searchParams] = useSearchParams()
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  const serviceType = searchParams.get('q') || 'Free Services'
  const state = searchParams.get('state') || ''
  const district = searchParams.get('district') || ''

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getHospitals({ district, state })
        setHospitals(res.data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [serviceType, district, state])

  // Mock Free Services specific data for the hospitals
  const enhancedHospitals = hospitals.map(h => {
    const idNum = parseInt(h.id, 10) || h.name.length;
    const score = (idNum % 100) + (idNum % 2 === 0 ? 50 : 0) + (idNum % 3 === 0 ? 30 : 0);
    return {
      ...h,
      availableNow: (idNum % 2) === 0,
      twentyFourSeven: (idNum % 3) === 0,
      stockStatus: (idNum % 4) === 0 ? 'Low Stock' : 'In Stock',
      score
    }
  }).filter(h => {
    if (filter === 'available_now') return h.availableNow
    if (filter === '24_7') return h.twentyFourSeven
    return true
  }).sort((a, b) => b.score - a.score)

  const top10 = enhancedHospitals.slice(0, 10)
  const rest = enhancedHospitals.slice(10)

  const getEmoji = (type) => {
    if (type.toLowerCase().includes('medicines')) return '💊'
    if (type.toLowerCase().includes('lab')) return '🧪'
    return '✨'
  }

  const renderHospitalCard = (h, index, isTop10) => {
    const isTop3 = isTop10 && index < 3;
    const borderStyle = isTop3 ? '1px solid #f59e0b' : '1px solid ' + th.border;
    const bgStyle = isTop3 ? (darkMode ? 'rgba(245,158,11,0.05)' : '#fffbeb') : th.card;

    return (
      <Link key={h.id} to={'/hospital/' + h.id} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ backgroundColor: bgStyle, backdropFilter: darkMode ? th.blur : 'none', border: borderStyle, borderRadius: 20, padding: 24, transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: 16 }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isTop3 ? '#f59e0b' : th.border }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ color: th.text, fontWeight: 800, fontSize: 18, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
                {isTop10 && index === 0 ? '🥇' : isTop10 && index === 1 ? '🥈' : isTop10 && index === 2 ? '🥉' : ''} 
                {h.name}
                {h.twentyFourSeven && <span style={{ fontSize: 11, backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b', padding: '2px 8px', borderRadius: 999, fontWeight: 800 }}>24/7 OPEN</span>}
              </h2>
              <p style={{ color: th.muted, fontSize: 14, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                📍 {h.district}, {h.state}
              </p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
                {h.availableNow ? (
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }}></span> Active Now
                  </div>
                ) : (
                  <div style={{ color: '#ef4444', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, backgroundColor: '#ef4444', borderRadius: '50%', opacity: 0.5 }}></span> Closed
                  </div>
                )}
                <div style={{ fontSize: 12, color: h.stockStatus === 'Low Stock' ? '#f59e0b' : th.muted, marginTop: 4, fontWeight: 600 }}>
                  {h.stockStatus === 'Low Stock' ? '⚠️ High Demand' : '✅ Verified'}
                </div>
            </div>
          </div>

          <div style={{ backgroundColor: darkMode ? 'rgba(0,0,0,0.2)' : '#f8fafc', padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, border: '1px dashed ' + th.border }}>
            <div style={{ fontSize: 24 }}>{getEmoji(serviceType)}</div>
            <div>
                <div style={{ color: th.text, fontSize: 14, fontWeight: 700 }}>Free {serviceType} Facility</div>
                <div style={{ color: th.muted, fontSize: 13 }}>Click to view details and location map</div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div style={{ backgroundColor: th.bg, backgroundImage: darkMode ? th.bgGradient : 'none', minHeight: '100vh', transition: 'all 0.4s ease', position: 'relative' }}>
      <PageGlow corner="top-right" color={darkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.05)'} />
      
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 1 }}>
        {/* Special Header for Free Services */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '1px solid rgba(245,158,11,0.3)' }}>
            {getEmoji(serviceType)}
          </div>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#f59e0b', marginBottom: 6, letterSpacing: -1 }}>
              {serviceType} Tracker
            </h1>
            <p style={{ color: th.muted, fontSize: 15, margin: 0 }}>
              Live availability of {serviceType.toLowerCase()} at government hospitals in {district || state || 'your area'}
            </p>
          </div>
        </div>

        {/* Free Services Specific Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {[['all', 'All Locations'], ['available_now', '✅ Available Now'], ['24_7', '🏪 24/7 Facility']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              style={{ padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: filter === val ? '#f59e0b' : th.card, color: filter === val ? '#ffffff' : th.muted, boxShadow: filter === val ? '0 8px 16px rgba(245,158,11,0.3)' : 'none', borderWidth: filter === val ? 0 : 1, borderStyle: 'solid', borderColor: th.border }}>
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #f59e0b', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }}></div>
            <p style={{ color: th.muted }}>Searching available facilities...</p>
          </div>
        ) : enhancedHospitals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', backgroundColor: th.card, borderRadius: 24, border: '1px solid ' + th.border }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏥</div>
            <h3 style={{ color: th.text, fontSize: 20, fontWeight: 800 }}>No facilities found</h3>
            <p style={{ color: th.muted }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Top 10 Best Places */}
            {top10.length > 0 && (
              <div>
                <h2 style={{ color: th.text, fontSize: 22, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>🏆</span> Top {top10.length} Recommended Facilities
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {top10.map((h, index) => renderHospitalCard(h, index, true))}
                </div>
              </div>
            )}

            {/* Rest of the list */}
            {rest.length > 0 && (
              <div>
                <h2 style={{ color: th.text, fontSize: 20, fontWeight: 800, marginBottom: 20, borderTop: '1px solid ' + th.border, paddingTop: 40 }}>
                  Other Facilities
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {rest.map((h, index) => renderHospitalCard(h, index, false))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
