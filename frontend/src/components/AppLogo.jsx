
export default function AppLogo({ style = {}, textStyle = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <style>{`
        @keyframes drawLifeline {
          0% { stroke-dashoffset: 130; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          10% { transform: scale(1.04); }
          20% { transform: scale(1); }
          30% { transform: scale(1.04); }
          40% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        @keyframes ripple {
          0% { stroke-dashoffset: 200; opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-3px) translateX(2px); opacity: 0.8; }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-4px) translateX(-1px); opacity: 0.7; }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-2px) translateX(1px); opacity: 0.9; }
        }
      `}</style>
      <svg viewBox="0 0 100 100" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))' }}>
        <defs>
          <linearGradient id="leg1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="leg2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="heartGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#67e8f9" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
          </linearGradient>
          <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.5"/>
          </filter>
          <filter id="glowBloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Right Leg (Behind) */}
        <path d="M 50 10 L 85 85 A 5 5 0 0 1 80 90 L 65 90 A 5 5 0 0 1 60 85 L 35 30 Z" fill="url(#leg2)" opacity="0.95" />

        {/* Left Leg (In Front with Shadow) */}
        <path d="M 50 10 L 15 85 A 5 5 0 0 0 20 90 L 35 90 A 5 5 0 0 0 40 85 L 65 30 Z" fill="url(#leg1)" filter="url(#shadow3d)" />

        {/* Particle and Glow Layer */}
        <g style={{ animation: 'heartbeat 1.7s cubic-bezier(0.2, 0, 0.2, 1) infinite', transformOrigin: '50px 65px' }}>
          {/* Inner Glow Bloom */}
          <path d="M 50 85 C 20 85 20 50 35 45 C 43 42 48 48 50 52 C 52 48 57 42 65 45 C 80 50 80 85 50 85 Z" stroke="#67e8f9" strokeWidth="12" fill="none" opacity="0.1" filter="url(#glowBloom)" />
          
          {/* Base Heart */}
          <path d="M 50 85 C 20 85 20 50 35 45 C 43 42 48 48 50 52 C 52 48 57 42 65 45 C 80 50 80 85 50 85 Z" stroke="url(#heartGlow)" strokeWidth="5" fill="none" filter="url(#shadow3d)" style={{ strokeDasharray: '200', animation: 'ripple 1.7s linear infinite' }} />
        </g>
        
        {/* Floating Particles inside A */}
        <circle cx="45" cy="55" r="0.8" fill="#a5f3fc" style={{ animation: 'float1 4s ease-in-out infinite' }} filter="url(#glowBloom)" />
        <circle cx="55" cy="70" r="1.2" fill="#22d3ee" style={{ animation: 'float2 5s ease-in-out infinite' }} filter="url(#glowBloom)" />
        <circle cx="38" cy="65" r="0.5" fill="#cffafe" style={{ animation: 'float3 3s ease-in-out infinite' }} filter="url(#glowBloom)" />

        {/* EKG - Animated Lifeline */}
        <path d="M 28 65 L 38 65 L 43 50 L 50 80 L 57 55 L 62 65 L 72 65" 
          stroke="#67e8f9" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
          pathLength="100"
          style={{
            strokeDasharray: '30 100',
            strokeDashoffset: 130,
            animation: 'drawLifeline 1.7s linear infinite',
            filter: 'drop-shadow(0 0 3px rgba(103,232,249,0.8))'
          }}
        />
      </svg>
      <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px', ...textStyle }}>
        Arogya<span style={{ color: '#59e1ff' }}>.ai</span>
      </span>
    </div>
  )
}
