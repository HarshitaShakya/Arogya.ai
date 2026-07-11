import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../store/appStore'

// Virtual canvas the whole scene is designed at — both the SVG viewBox and the
// percentage-positioned DOM platforms below share these coordinates, so
// everything scales together responsively.
const VB_W = 1200
const VB_H = 460
const NODES = [
  { x: 150, y: 230 },
  { x: 600, y: 230 },
  { x: 1050, y: 230 },
]
const PATH1_D = 'M150,230 L230,230 L300,160 L450,160 L520,230 L600,230'
const PATH2_D = 'M600,230 L680,230 L750,300 L900,300 L970,230 L1050,230'

const ICONS = {
  search: (glowing) => (
    <svg width="34" height="34" viewBox="0 0 34 34" style={{ overflow: 'visible' }}>
      <g className={'icon-search' + (glowing ? ' icon-hover' : '')}>
        <circle cx="14" cy="14" r="8.5" fill="none" stroke="#59E1FF" strokeWidth="2" />
        <line x1="20" y1="20" x2="28" y2="28" stroke="#59E1FF" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  ),
  hospital: (glowing) => (
    <svg width="34" height="34" viewBox="0 0 34 34" style={{ overflow: 'visible' }}>
      <rect x="6" y="10" width="22" height="20" rx="2" fill="none" stroke="#59E1FF" strokeWidth="1.8" />
      <g className={'icon-cross' + (glowing ? ' icon-hover' : '')} style={{ transformOrigin: '17px 20px' }}>
        <line x1="17" y1="14" x2="17" y2="26" stroke="#59E1FF" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="11" y1="20" x2="23" y2="20" stroke="#59E1FF" strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  ),
  go: (glowing) => (
    <svg width="34" height="34" viewBox="0 0 34 34" style={{ overflow: 'visible' }}>
      <g className={'icon-plane' + (glowing ? ' icon-hover' : '')}>
        <path d="M5 17 L28 8 L19 29 L16 19 L5 17z" fill="none" stroke="#59E1FF" strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  ),
}

export default function HowItWorksInteractive({ steps }) {
  const { darkMode } = useAppStore()
  const containerRef = useRef(null)
  const path1Ref = useRef(null)
  const path2Ref = useRef(null)
  const particleGroupRef = useRef(null)

  const [hoveredStep, setHoveredStep] = useState(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })
  const [burstNode, setBurstNode] = useState(null)

  const hoveredRef = useRef(hoveredStep)
  useEffect(() => { hoveredRef.current = hoveredStep }, [hoveredStep])

  useEffect(() => {
    const NUM_PARTICLES = 4
    let raf
    let lastTime = performance.now()

    const particles = Array.from({ length: NUM_PARTICLES }).map((_, i) => ({
      progress: (i / NUM_PARTICLES),
      trail: [],
    }))

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 50) / 1000
      lastTime = now

      const p1 = path1Ref.current
      const p2 = path2Ref.current
      if (!p1 || !p2 || !particleGroupRef.current) { raf = requestAnimationFrame(tick); return }

      const len1 = p1.getTotalLength()
      const len2 = p2.getTotalLength()
      const total = len1 + len2

      const hs = hoveredRef.current
      let baseSpeed = 0.14

      if (hs === 2) baseSpeed = 0.42
      if (hs === 0) baseSpeed = 0.015

      particles.forEach((particle, idx) => {
        let speed = baseSpeed

        if (hs === 1) {
          const distFromMid = Math.abs(particle.progress - len1 / total)
          if (distFromMid < 0.06) speed = baseSpeed * 0.1
        }

        particle.progress += (speed * dt)
        if (particle.progress >= 1) {
          particle.progress -= 1
          if (hs === 2) setBurstNode(2)
        }

        const arcLen = particle.progress * total
        const point = arcLen <= len1
          ? p1.getPointAtLength(arcLen)
          : p2.getPointAtLength(Math.max(0, arcLen - len1))

        particle.trail.unshift({ x: point.x, y: point.y })
        if (particle.trail.length > 7) particle.trail.pop()

        const groupEl = particleGroupRef.current.children[idx]
        if (groupEl) {
          particle.trail.forEach((pt, ti) => {
            const dot = groupEl.children[ti]
            if (dot) {
              dot.setAttribute('cx', pt.x)
              dot.setAttribute('cy', pt.y)
              dot.setAttribute('opacity', (1 - ti / particle.trail.length) * (hs === 0 ? 0.3 : 0.9))
            }
          })
        }
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (burstNode === null) return
    const t = setTimeout(() => setBurstNode(null), 700)
    return () => clearTimeout(t)
  }, [burstNode])

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    })
  }

  const wireGlow = hoveredStep !== null ? 0.9 : 0.4

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight(s => ({ ...s, active: false }))}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        aspectRatio: `${VB_W} / ${VB_H}`,
        /* transparent — this component now sits INSIDE a full-bleed ambient
           background provided by the wrapping section in Home.jsx, so it no
           longer paints its own boxed background here. */
      }}
    >
      <style>{`
        @keyframes breathe { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.08); opacity: 0.85; } }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes heartbeat { 0%,100% { transform: scale(1); } 25% { transform: scale(1.18); } 40% { transform: scale(1); } 55% { transform: scale(1.1); } 70% { transform: scale(1); } }
        @keyframes plane-nudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        @keyframes sway { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
        @keyframes burst-ring { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.4); opacity: 0; } }
        .icon-cross { animation: heartbeat 2.4s ease-in-out infinite; transform-origin: center; }
        .icon-cross.icon-hover { animation: heartbeat 1s ease-in-out infinite; }
        .icon-plane { transform-origin: center; }
        .icon-plane.icon-hover { animation: plane-nudge 0.8s ease-in-out infinite; }
        .icon-search { transform-origin: 14px 14px; }
        .icon-search.icon-hover { animation: sway 1.4s ease-in-out infinite; }
        .step-title { transition: color 0.3s ease, text-shadow 0.3s ease; }
        .step-desc { transition: color 0.3s ease; }
        .step-card { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
      `}</style>

      {/* mouse-follow spotlight, local to this component's hover area */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: spotlight.active ? 1 : 0,
        transition: 'opacity 0.4s ease',
        background: `radial-gradient(circle 220px at ${spotlight.x}% ${spotlight.y}%, rgba(89,225,255,0.10), transparent 70%)`,
      }}></div>

      {/* SVG wires + particles */}
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#4DA3FF" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="9" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path ref={path1Ref} d={PATH1_D} fill="none" stroke="url(#wireGrad)" strokeWidth={4 + wireGlow * 2} strokeDasharray="8 8"
          opacity={wireGlow} filter="url(#softGlow)" style={{ transition: 'opacity 0.4s ease, stroke-width 0.4s ease' }} />
        <path ref={path2Ref} d={PATH2_D} fill="none" stroke="url(#wireGrad)" strokeWidth={4 + wireGlow * 2} strokeDasharray="8 8"
          opacity={wireGlow} filter="url(#softGlow)" style={{ transition: 'opacity 0.4s ease, stroke-width 0.4s ease' }} />

        <g ref={particleGroupRef}>
          {Array.from({ length: 4 }).map((_, pIdx) => (
            <g key={pIdx}>
              {Array.from({ length: 7 }).map((__, tIdx) => (
                <circle key={tIdx} r={tIdx === 0 ? 6 : 3.5} fill="#59E1FF" filter={tIdx === 0 ? 'url(#strongGlow)' : 'url(#softGlow)'} />
              ))}
            </g>
          ))}
        </g>

        {burstNode !== null && (
          <circle cx={NODES[2].x} cy={NODES[2].y} r="20" fill="none" stroke="#00E5FF" strokeWidth="4"
            style={{ animation: 'burst-ring 0.7s ease-out forwards' }} />
        )}
      </svg>

      {/* three premium glass cards */}
      {NODES.map((node, i) => {
        const isHovered = hoveredStep === i
        return (
          <div
            key={i}
            className="step-card group"
            onMouseEnter={() => setHoveredStep(i)}
            onMouseLeave={() => setHoveredStep(null)}
            style={{
              position: 'absolute',
              left: (node.x / VB_W) * 100 + '%',
              top: (node.y / VB_H) * 100 + '%',
              transform: `translate(-50%, -50%) translateY(${isHovered ? -16 : 0}px) scale(${isHovered ? 1.03 : 1})`,
              cursor: 'pointer',
              textAlign: 'left',
              width: 'clamp(220px, 26vw, 320px)',
              padding: 'clamp(20px, 2.5vw, 32px)',
              backgroundColor: isHovered ? (darkMode ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)') : (darkMode ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.55)'),
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              borderRadius: '40px 12px 40px 12px',
              border: isHovered ? (darkMode ? '1px solid rgba(89,225,255,0.5)' : '1px solid rgba(79,140,255,0.5)') : (darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)'),
              boxShadow: isHovered ? (darkMode ? '0 24px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)' : '0 24px 48px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)') : (darkMode ? '0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)' : '0 10px 30px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.3)'),
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Inner dynamic spotlight/glow */}
            <div style={{ position: 'absolute', inset: 0, background: isHovered ? 'radial-gradient(circle at top right, rgba(89,225,255,0.15) 0%, transparent 60%)' : 'none', pointerEvents: 'none' }}></div>
            
            {/* Large Watermark Number */}
            <div style={{
              position: 'absolute',
              right: -5,
              bottom: -20,
              fontSize: 'clamp(80px, 10vw, 140px)',
              fontWeight: 900,
              color: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              lineHeight: 1,
              userSelect: 'none',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'scale(1.1) translate(-5px, -5px)' : 'scale(1)',
              ...(isHovered ? {
                background: 'linear-gradient(135deg, rgba(89,225,255,0.15) 0%, transparent 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              } : {})
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Icon Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 2 }}>
              <div style={{
                width: 'clamp(44px, 5vw, 56px)', height: 'clamp(44px, 5vw, 56px)',
                borderRadius: 16,
                background: isHovered ? (darkMode ? 'rgba(89,225,255,0.1)' : 'rgba(79,140,255,0.1)') : (darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'),
                border: isHovered ? (darkMode ? '1px solid rgba(89,225,255,0.3)' : '1px solid rgba(79,140,255,0.3)') : (darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isHovered ? (darkMode ? '0 0 20px rgba(89,225,255,0.2)' : '0 0 20px rgba(79,140,255,0.2)') : 'none',
                transition: 'all 0.4s ease',
              }}>
                <div style={{ transform: 'scale(0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {i === 0 && ICONS.search(isHovered)}
                  {i === 1 && ICONS.hospital(isHovered)}
                  {i === 2 && ICONS.go(isHovered)}
                </div>
              </div>
              <div style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 700, color: isHovered ? '#59E1FF' : '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, transition: 'color 0.3s ease' }}>
                Step 0{i + 1}
              </div>
            </div>

            {/* Text Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="step-title" style={{
                fontWeight: 800, fontSize: 'clamp(16px, 2vw, 22px)',
                color: isHovered ? (darkMode ? '#ffffff' : '#000000') : (darkMode ? '#f8fafc' : '#1c1917'),
                marginBottom: 8,
                transition: 'color 0.3s ease',
              }}>
                {steps[i].title}
              </div>
              <div className="step-desc" style={{
                fontSize: 'clamp(12px, 1.4vw, 15px)', lineHeight: 1.6,
                color: isHovered ? (darkMode ? '#e0f2fe' : '#44403c') : (darkMode ? '#94a3b8' : '#78716c'),
                transition: 'color 0.3s ease',
                fontWeight: 400
              }}>
                {steps[i].desc}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}