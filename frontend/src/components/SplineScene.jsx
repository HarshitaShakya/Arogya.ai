import React, { useRef, useEffect, useState } from 'react'

// SplineScene: lightweight iframe wrapper for a Spline project.
// Usage: <SplineScene url="https://prod.spline.design/your-scene-url/scene.splinecode" />
// The iframe is sized to the right side of the hero and blends with the page.

export default function SplineScene({ url = 'https://prod.spline.design/REPLACE_WITH_YOUR_SCENE/scene.splinecode' }) {
  const containerRef = useRef(null)
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    function onMouseMove(e) {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      // apply a subtle parallax transform
      el.style.transform = `translate3d(${dx * 8}px, ${dy * 6}px, 0) translateZ(0) rotateX(${dy * 1.2}deg) rotateY(${dx * 1.2}deg)`
    }

    function onLeave() {
      const el = containerRef.current
      if (!el) return
      el.style.transform = ''
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%', pointerEvents: 'none', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        ref={containerRef}
        onMouseEnter={() => setInteractive(true)}
        onMouseLeave={() => setInteractive(false)}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: 1200,
          pointerEvents: interactive ? 'auto' : 'none',
          transition: 'transform 300ms cubic-bezier(.2,.9,.2,1)',
          willChange: 'transform'
        }}>
        <iframe
          title="Arogya.ai 3D Scene"
          src={url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'transparent',
            display: 'block'
          }}
          allow="fullscreen; autoplay; vr; xr-spatial-tracking"
        />
      </div>
    </div>
  )
}
