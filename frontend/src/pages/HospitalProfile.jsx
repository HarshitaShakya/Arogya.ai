import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHospital, getDepartments, getReviews, addReview } from '../services/api'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'

export default function HospitalProfile() {
  const { id } = useParams()
  const [hospital, setHospital] = useState(null)
  const [departments, setDepartments] = useState([])
  const [reviews, setReviews] = useState([])
  const [tab, setTab] = useState('departments')
  const [reviewForm, setReviewForm] = useState({ comment: '', wait_time_rating: 3, cleanliness_rating: 3, doctor_available: true })
  const [submitting, setSubmitting] = useState(false)
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  useEffect(() => {
    getHospital(id).then(r => setHospital(r.data))
    getDepartments(id).then(r => setDepartments(r.data))
    getReviews(id).then(r => setReviews(r.data))
  }, [id])

  const handleReview = async () => {
    setSubmitting(true)
    try {
      await addReview(id, reviewForm)
      const r = await getReviews(id)
      setReviews(r.data)
      setReviewForm({ comment: '', wait_time_rating: 3, cleanliness_rating: 3, doctor_available: true })
    } catch (e) { console.error(e) }
    setSubmitting(false)
  }

  if (!hospital) return (
    <div style={{ backgroundColor: th.bg, backgroundImage: darkMode ? th.bgGradient : 'none', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid ' + th.accent2, borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }}></div>
        <style>{'@keyframes spin { to { transform: rotate(360deg) } }'}</style>
        <p style={{ color: th.muted }}>Loading hospital...</p>
      </div>
    </div>
  )

  const tabs = ['departments', 'reviews']

  return (
    <div style={{ backgroundColor: th.bg, backgroundImage: darkMode ? th.bgGradient : 'none', minHeight: '100vh', transition: 'all 0.3s ease' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ backgroundColor: th.card, backdropFilter: darkMode ? th.blur : 'none', WebkitBackdropFilter: darkMode ? th.blur : 'none', border: '1px solid ' + th.border, borderRadius: 24, padding: 32, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 52, height: 52, background: th.accentGradient, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏥</div>
                <div>
                  <h1 style={{ color: th.text, fontWeight: 900, fontSize: 22, margin: 0, letterSpacing: -0.5 }}>{hospital.name}</h1>
                  <p style={{ color: th.muted, fontSize: 14, margin: 0 }}>{hospital.district}, {hospital.state}</p>
                </div>
              </div>
              <p style={{ color: th.muted, fontSize: 14, margin: '0 0 16px' }}>📍 {hospital.address}</p>
              {hospital.phone && <p style={{ color: th.muted, fontSize: 14, margin: '0 0 16px' }}>📞 {hospital.phone}</p>}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ padding: '6px 14px', backgroundColor: darkMode ? 'rgba(79,140,255,0.14)' : '#eff6ff', color: darkMode ? '#8ab4ff' : '#3b82f6', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{hospital.type}</span>
                {hospital.is_ayushman_empanelled && <span style={{ padding: '6px 14px', backgroundColor: darkMode ? 'rgba(52,211,153,0.14)' : '#ecfdf5', color: darkMode ? '#6ee7b7' : '#10b981', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>✅ Ayushman Empanelled</span>}
                {hospital.emergency_available && <span style={{ padding: '6px 14px', backgroundColor: darkMode ? 'rgba(248,113,113,0.14)' : '#fef2f2', color: darkMode ? '#fca5a5' : '#ef4444', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>🚨 24/7 Emergency</span>}
                {hospital.total_beds && <span style={{ padding: '6px 14px', backgroundColor: darkMode ? 'rgba(255,255,255,0.06)' : '#f8fafc', color: th.muted, borderRadius: 999, fontSize: 12, fontWeight: 700, border: '1px solid ' + th.border }}>🛏 {hospital.total_beds} Beds</span>}
              </div>
            </div>
            <a href={'https://www.google.com/maps?q=' + hospital.lat + ',' + hospital.lng}
              target="_blank" rel="noreferrer"
              style={{ padding: '12px 20px', background: th.accentGradient, color: '#fff', borderRadius: 14, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              📍 Get Directions
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '10px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: tab === t ? th.accent : th.card, color: tab === t ? '#ffffff' : th.muted, boxShadow: tab === t ? '0 4px 12px rgba(79,140,255,0.3)' : 'none', borderWidth: tab === t ? 0 : 1, borderStyle: 'solid', borderColor: th.border }}>
              {t === 'departments' ? '🏥 Departments' : '⭐ Reviews'}
            </button>
          ))}
        </div>

        {tab === 'departments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {departments.map(d => (
              <div key={d.id} style={{ backgroundColor: th.card, border: '1px solid ' + th.border, borderRadius: 16, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: th.text, fontWeight: 700, fontSize: 15, margin: '0 0 6px' }}>{d.name}</h3>
                  <p style={{ color: th.muted, fontSize: 13, margin: '0 0 4px' }}>📅 {d.opd_days}</p>
                  <p style={{ color: th.muted, fontSize: 13, margin: 0 }}>⏰ {d.opd_timing}</p>
                </div>
                <span style={{ padding: '6px 16px', backgroundColor: d.is_free ? (darkMode ? 'rgba(52,211,153,0.14)' : '#ecfdf5') : (darkMode ? 'rgba(251,191,36,0.14)' : '#fffbeb'), color: d.is_free ? (darkMode ? '#6ee7b7' : '#10b981') : '#f59e0b', borderRadius: 999, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  {d.is_free ? '🆓 Free' : '₹' + d.charges_if_paid}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div>
            <div style={{ backgroundColor: th.card, border: '1px solid ' + th.border, borderRadius: 20, padding: 24, marginBottom: 20 }}>
              <h3 style={{ color: th.text, fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Add Your Review</h3>
              <textarea
                placeholder="Share your experience..."
                value={reviewForm.comment}
                onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                style={{ width: '100%', padding: 12, backgroundColor: th.inputBg, border: '1px solid ' + th.border, borderRadius: 12, color: th.text, fontSize: 14, resize: 'vertical', minHeight: 80, outline: 'none', boxSizing: 'border-box' }}
              />
              <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <label style={{ color: th.muted, fontSize: 13 }}>
                  Wait time: <select value={reviewForm.wait_time_rating} onChange={e => setReviewForm({ ...reviewForm, wait_time_rating: Number(e.target.value) })}
                    style={{ marginLeft: 8, backgroundColor: th.inputBg, color: th.text, border: '1px solid ' + th.border, borderRadius: 8, padding: '4px 8px' }}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}/5</option>)}
                  </select>
                </label>
                <label style={{ color: th.muted, fontSize: 13 }}>
                  Cleanliness: <select value={reviewForm.cleanliness_rating} onChange={e => setReviewForm({ ...reviewForm, cleanliness_rating: Number(e.target.value) })}
                    style={{ marginLeft: 8, backgroundColor: th.inputBg, color: th.text, border: '1px solid ' + th.border, borderRadius: 8, padding: '4px 8px' }}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}/5</option>)}
                  </select>
                </label>
                <label style={{ color: th.muted, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="checkbox" checked={reviewForm.doctor_available} onChange={e => setReviewForm({ ...reviewForm, doctor_available: e.target.checked })} />
                  Doctor available
                </label>
              </div>
              <button onClick={handleReview} disabled={submitting || !reviewForm.comment}
                style={{ marginTop: 16, padding: '10px 24px', background: submitting || !reviewForm.comment ? '#64748b' : th.accentGradient, color: '#fff', borderRadius: 12, border: 'none', fontWeight: 700, fontSize: 14, cursor: submitting || !reviewForm.comment ? 'not-allowed' : 'pointer' }}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>

            {reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: th.muted }}>No reviews yet — be the first!</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {reviews.map(r => (
                  <div key={r.id} style={{ backgroundColor: th.card, border: '1px solid ' + th.border, borderRadius: 16, padding: 20 }}>
                    <p style={{ color: th.text, fontSize: 14, margin: '0 0 10px' }}>{r.comment}</p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ color: th.muted, fontSize: 12 }}>⏱ Wait: {r.wait_time_rating}/5</span>
                      <span style={{ color: th.muted, fontSize: 12 }}>🧹 Clean: {r.cleanliness_rating}/5</span>
                      {r.doctor_available && <span style={{ color: th.accent2, fontSize: 12 }}>✅ Doctor Available</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}