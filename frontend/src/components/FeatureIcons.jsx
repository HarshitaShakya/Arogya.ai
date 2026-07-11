// Glowing line-art icons for the Features section, styled to echo the
// hero's blue/violet holographic look. Each returns an <svg> sized 44x44.

const stroke = { stroke: '#59E1FF', strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }
const glow = { filter: 'drop-shadow(0 0 6px rgba(89,225,255,0.65))' }

export function SearchPinIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={glow}>
      <circle cx="17" cy="16" r="9" {...stroke} />
      <line x1="23.5" y1="22.5" x2="31" y2="30" {...stroke} />
      <path d="M17 11v10M12 16h10" {...stroke} strokeWidth="1.2" opacity="0.6" />
    </svg>
  )
}

export function BotChatIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={glow}>
      <rect x="10" y="9" width="20" height="15" rx="4" {...stroke} />
      <circle cx="16" cy="16.5" r="1.6" fill="#59E1FF" />
      <circle cx="24" cy="16.5" r="1.6" fill="#59E1FF" />
      <path d="M15 20.5h10" {...stroke} strokeWidth="1.2" />
      <path d="M20 4v5" {...stroke} />
      <circle cx="20" cy="3.2" r="1.4" fill="#59E1FF" />
      <path d="M14 30l4-4M26 30l-4-4" {...stroke} strokeWidth="1.2" opacity="0.7" />
    </svg>
  )
}

export function ShieldCheckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={glow}>
      <path d="M20 5l11 4v9c0 8-5 13-11 17-6-4-11-9-11-17V9l11-4z" {...stroke} />
      <path d="M14.5 20l4 4 7-8" {...stroke} strokeWidth="1.8" />
    </svg>
  )
}

export function HospitalIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={glow}>
      <rect x="8" y="17" width="9" height="14" {...stroke} />
      <rect x="23" y="12" width="10" height="19" {...stroke} />
      <path d="M27 17v9M22.5 21.5h9" {...stroke} strokeWidth="1.6" />
      <path d="M12.5 20.5h2M12.5 24h2" {...stroke} strokeWidth="1.2" opacity="0.6" />
      <line x1="6" y1="31" x2="35" y2="31" {...stroke} strokeWidth="1.4" />
    </svg>
  )
}

export function ReviewStarsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={glow}>
      <path d="M9 10h22a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H19l-6 5v-5h-4a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z" {...stroke} />
      {[0, 1, 2].map(i => (
        <path key={i} transform={`translate(${14 + i * 6},15)`}
          d="M2 0l0.6 1.3 1.4 0.2-1 1 0.3 1.4L2 3.2 0.7 3.9 1 2.5 0 1.5l1.4-0.2z"
          fill="#59E1FF" opacity="0.9" />
      ))}
    </svg>
  )
}

export function DocumentIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={glow}>
      <path d="M13 6h10l6 6v20a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" {...stroke} />
      <path d="M23 6v6h6" {...stroke} strokeWidth="1.4" />
      <line x1="15.5" y1="20" x2="24.5" y2="20" {...stroke} strokeWidth="1.2" opacity="0.7" />
      <line x1="15.5" y1="24" x2="24.5" y2="24" {...stroke} strokeWidth="1.2" opacity="0.7" />
      <line x1="15.5" y1="28" x2="21" y2="28" {...stroke} strokeWidth="1.2" opacity="0.7" />
    </svg>
  )
}