import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

export default function MapView({ hospitals }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const { darkMode } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window === 'undefined') return

    import('leaflet').then(L => {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }

      if (!mapRef.current) return

      const map = L.default.map(mapRef.current, {
        center: [26.8467, 80.9462],
        zoom: 7,
        zoomControl: true,
      })

      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map)

      const makeIcon = (color, shadow) => L.default.divIcon({
        html: `<div style="
          width: 30px; height: 30px;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 16px ${shadow};
        "></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
        className: '',
      })

      const greenIcon = makeIcon('linear-gradient(135deg,#059669,#10b981)', 'rgba(5,150,105,0.5)')
      const redIcon = makeIcon('linear-gradient(135deg,#dc2626,#ef4444)', 'rgba(220,38,38,0.5)')
      const blueIcon = makeIcon('linear-gradient(135deg,#2563eb,#3b82f6)', 'rgba(37,99,235,0.5)')

      const validHospitals = (hospitals || []).filter(h => h.lat && h.lng)

      if (validHospitals.length === 0) {
        map.setView([22.9734, 78.6569], 5)
      }

      validHospitals.forEach(h => {
        let icon = greenIcon
        if (h.emergency_available) icon = redIcon
        if (h.type === 'Medical College') icon = blueIcon

        const marker = L.default.marker([h.lat, h.lng], { icon }).addTo(map)

        marker.bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:220px;padding:8px">
            <div style="font-weight:800;font-size:15px;color:#0f172a;margin-bottom:4px">${h.name}</div>
            <div style="font-size:12px;color:#64748b;margin-bottom:10px">📍 ${h.district}, ${h.state}</div>
            <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px">
              <span style="padding:3px 10px;background:#eff6ff;color:#3b82f6;border-radius:999px;font-size:11px;font-weight:700">${h.type}</span>
              ${h.is_ayushman_empanelled ? '<span style="padding:3px 10px;background:#ecfdf5;color:#059669;border-radius:999px;font-size:11px;font-weight:700">✅ Ayushman</span>' : ''}
              ${h.emergency_available ? '<span style="padding:3px 10px;background:#fef2f2;color:#dc2626;border-radius:999px;font-size:11px;font-weight:700">🚨 Emergency</span>' : ''}
              ${h.total_beds ? '<span style="padding:3px 10px;background:#f8fafc;color:#64748b;border-radius:999px;font-size:11px;font-weight:700">🛏 ' + h.total_beds + ' beds</span>' : ''}
            </div>
            <div style="display:flex;gap:8px">
              <button onclick="window.arogyaNav('${h.id}')" style="flex:1;padding:9px;background:linear-gradient(135deg,#059669,#10b981);color:white;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer">View Details →</button>
              <a href="https://www.google.com/maps?q=${h.lat},${h.lng}" target="_blank" style="padding:9px 12px;background:#f1f5f9;color:#64748b;border-radius:8px;font-size:13px;text-decoration:none;display:flex;align-items:center">📍</a>
            </div>
          </div>
        `, { maxWidth: 260 })
      })

      if (validHospitals.length > 0) {
        const bounds = L.default.latLngBounds(validHospitals.map(h => [h.lat, h.lng]))
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 })
      }

      mapInstanceRef.current = map
    })

    window.arogyaNav = (id) => navigate('/hospital/' + id)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [hospitals, darkMode])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 1000, backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '12px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', fontSize: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 8, color: '#0f172a', fontSize: 13 }}>Map Legend</div>
        {[['#10b981', 'Govt Hospital'], ['#ef4444', 'Emergency Available'], ['#3b82f6', 'Medical College']].map(([color, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }}></div>
            <span style={{ color: '#475569' }}>{label}</span>
          </div>
        ))}
      </div>
      {(!hospitals || hospitals.length === 0) && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1000, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '24px 32px', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>No hospitals to show</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>Search for hospitals first</div>
        </div>
      )}
    </div>
  )
}
