// Shared ambient background layer — drop this as the FIRST child inside any
// page's outermost div to visually connect it to the homepage hero.
// Usage:
//   <div style={{ position: 'relative', ...your existing outer styles }}>
//     <PageGlow />
//     ...rest of your existing page content unchanged...
//   </div>
//
// Make sure the outer wrapping div has position: 'relative' (or 'fixed'/'absolute'
// ancestor) so this layer positions itself correctly behind your content.

export default function PageGlow({ corner = 'top-right', intensity = 1 }) {
  const cornerStyles = {
    'top-right':    { top: '-10%', right: '-8%' },
    'bottom-right': { bottom: '-10%', right: '-8%' },
    'top-left':     { top: '-10%', left: '-8%' },
  }
  const pos = cornerStyles[corner] || cornerStyles['top-right']

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* soft ambient glow blobs, same palette as hero */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at 15% 10%, rgba(79,140,255,${0.10 * intensity}) 0%, transparent 45%),
                     radial-gradient(ellipse at 85% 85%, rgba(123,92,255,${0.08 * intensity}) 0%, transparent 45%)`,
      }}></div>

      {/* faint echo of the cityscape image in one corner, heavily faded */}
      <div style={{
        position: 'absolute',
        width: '38%',
        maxWidth: 420,
        aspectRatio: '3 / 2',
        ...pos,
        backgroundImage: 'url(/hero-cityscape.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.10 * intensity,
        filter: 'blur(1px)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
      }}></div>

      {/* faint dot grid texture, matches hero's premium feel */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(148,163,184,0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.4 * intensity,
      }}></div>
    </div>
  )
}