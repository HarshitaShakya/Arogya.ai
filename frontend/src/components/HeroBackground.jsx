import React, { useRef, useEffect } from 'react'
import { useAppStore } from '../store/appStore'

const COLORS = {
  bgA: '#05070D',
  bgB: '#0B1020',
  primary: '#4F8CFF',
  cyan: '#59E1FF',
  violet: '#7B5CFF',
  glassTint: 'rgba(80,140,255,0.06)'
}

// Simple 3D utilities for projection and rotation (small, no external lib)
function rotateY(p, ang) {
  const c = Math.cos(ang), s = Math.sin(ang)
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c }
}

function rotateX(p, ang) {
  const c = Math.cos(ang), s = Math.sin(ang)
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c }
}

function project(p, cx, cy, focal, scale) {
  const k = focal / (focal + p.z)
  return { x: cx + p.x * k * scale, y: cy + p.y * k * scale, k }
}

export default function HeroBackground({ style = {} }) {
  const { darkMode } = useAppStore()
  const ref = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })

  const currentBgA = '#05070D'
  const currentBgB = '#0B1020'

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0
    const DPR = Math.max(1, window.devicePixelRatio || 1)
    let raf = null

    // scene objects
    const octa = { size: 1.0, rot: { x: 0.3, y: 0.2 }, edges: [], joints: [] }
    const rings = []
    const nodes = []
    const particles = []
    const capsules = []

    const focal = 800
    const sceneScale = 420

    function resize() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * DPR)
      canvas.height = Math.round(h * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    function makeOctahedron() {
      // 6 vertices of octahedron
      const s = octa.size
      const verts = [
        { x: s, y: 0, z: 0 }, { x: -s, y: 0, z: 0 },
        { x: 0, y: s, z: 0 }, { x: 0, y: -s, z: 0 },
        { x: 0, y: 0, z: s }, { x: 0, y: 0, z: -s }
      ]
      // edges indices
      const edgesIdx = [
        [0,2],[0,3],[0,4],[0,5],
        [1,2],[1,3],[1,4],[1,5],
        [2,4],[2,5],[3,4],[3,5]
      ]
      octa.edges = edgesIdx.map(e => ({ a: verts[e[0]], b: verts[e[1]] }))
      octa.joints = verts
    }

    function initScene() {
      makeOctahedron()
      rings.length = 0
      nodes.length = 0
      particles.length = 0
      capsules.length = 0

      // orbit rings
      for (let i = 0; i < 5; i++) {
        rings.push({ r: 120 + i * 60, tilt: (i % 2 ? 0.4 : -0.25) + i * 0.02, speed: 0.0006 + i * 0.00035, hue: i % 2 ? COLORS.violet : COLORS.primary, phase: Math.random() * Math.PI * 2 })
      }

      // nodes (navigation nodes) connected with glowing lines
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2
        const r = 160 + Math.random() * 160
        nodes.push({ ang, r, speed: 0.0008 + Math.random() * 0.0014, size: 2 + Math.random() * 3, hue: Math.random() > 0.7 ? COLORS.cyan : COLORS.primary })
      }

      // small particles
      for (let i = 0; i < 220; i++) {
        particles.push({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 0.5, size: Math.random() * 1.8 + 0.4, speed: 0.0001 + Math.random() * 0.0007, hue: Math.random() > 0.92 ? COLORS.cyan : COLORS.primary })
      }

      // capsules
      for (let i = 0; i < 10; i++) {
        capsules.push({ t: Math.random() * Math.PI * 2, r: 120 + Math.random() * 260, speed: 0.0008 + Math.random() * 0.0016, size: 12 + Math.random() * 18 })
      }
    }

    // draw helpers
    function clear() { ctx.clearRect(0, 0, w, h) }

    function drawBackground() {
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, currentBgA)
      g.addColorStop(1, currentBgB)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // faint radial glow behind sculpture
      const cx = w * 0.72 + (mouse.current.x - w/2) * 0.02
      const cy = h * 0.5 + (mouse.current.y - h/2) * 0.02
      const rg = ctx.createRadialGradient(cx, cy, 40, cx, cy, Math.max(w,h) * 0.9)
      rg.addColorStop(0, 'rgba(79,140,255,0.06)')
      rg.addColorStop(0.25, 'rgba(91,110,255,0.02)')
      rg.addColorStop(1, 'rgba(2,6,16,0.6)')
      ctx.fillStyle = rg
      ctx.fillRect(0, 0, w, h)
    }

    function drawRings(cx, cy, time) {
      rings.forEach(r => {
        r.phase += r.speed * time
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(r.phase)
        ctx.globalAlpha = 0.9
        const grd = ctx.createLinearGradient(-r.r, -r.r, r.r, r.r)
        grd.addColorStop(0, 'rgba(0,0,0,0)')
        grd.addColorStop(0.45, r.hue)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.strokeStyle = grd
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.ellipse(0, 0, r.r, r.r * 0.62, r.tilt, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      })
    }

    function drawOctahedron(cx, cy, time) {
      // rotate octahedron slowly
      octa.rot.y += 0.00018 * time
      octa.rot.x = 0.25 + Math.sin(time * 0.00008) * 0.02

      // draw edges as glass tubes
      octa.edges.forEach(e => {
        const pa = rotateX(rotateY({ x: e.a.x * 160, y: e.a.y * 160, z: e.a.z * 160 }, octa.rot.y), octa.rot.x)
        const pb = rotateX(rotateY({ x: e.b.x * 160, y: e.b.y * 160, z: e.b.z * 160 }, octa.rot.y), octa.rot.x)
        const pA = project(pa, cx, cy, focal, 1)
        const pB = project(pb, cx, cy, focal, 1)

        // depth-based width
        const depth = (pa.z + pb.z) * 0.5
        const width = Math.max(2, 12 - depth * 0.02)

        // glass stroke with inner highlight
        ctx.lineWidth = width
        const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y)
        grad.addColorStop(0, 'rgba(200,220,255,0.04)')
        grad.addColorStop(0.45, 'rgba(130,180,255,0.24)')
        grad.addColorStop(1, 'rgba(200,220,255,0.06)')
        ctx.strokeStyle = grad
        ctx.beginPath()
        ctx.moveTo(pA.x, pA.y)
        ctx.lineTo(pB.x, pB.y)
        ctx.stroke()

        // inner glossy highlight
        ctx.lineWidth = Math.max(1, width * 0.28)
        ctx.strokeStyle = 'rgba(255,255,255,0.18)'
        ctx.beginPath()
        ctx.moveTo(pA.x, pA.y)
        ctx.lineTo(pB.x, pB.y)
        ctx.stroke()
      })

      // joints
      octa.joints.forEach(v => {
        const pv = rotateX(rotateY({ x: v.x * 160, y: v.y * 160, z: v.z * 160 }, octa.rot.y), octa.rot.x)
        const p = project(pv, cx, cy, focal, 1)
        const rad = Math.max(6, 18 - pv.z * 0.02)
        const g = ctx.createRadialGradient(p.x - rad/3, p.y - rad/3, 1, p.x, p.y, rad * 1.6)
        g.addColorStop(0, 'rgba(255,255,255,0.9)')
        g.addColorStop(0.3, 'rgba(200,220,255,0.7)')
        g.addColorStop(1, 'rgba(100,110,140,0.15)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawNavPinCross(cx, cy, time) {
      // position slightly in front of center
      const depth = -40 + Math.sin(time * 0.0006) * 8
      const p = project({ x: 0, y: 20, z: depth }, cx, cy, focal, 1)

      // pin outline (glass)
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(Math.sin(time * 0.0007) * 0.02)
      // outer glow
      const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 120)
      glow.addColorStop(0, 'rgba(79,140,255,0.16)')
      glow.addColorStop(1, 'rgba(79,140,255,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(0, 0, 62, 0, Math.PI * 2)
      ctx.fill()

      // pin shape
      ctx.beginPath()
      ctx.moveTo(0, -36)
      ctx.quadraticCurveTo(28, -36, 28, -6)
      ctx.arc(0, -6, 28, 0, Math.PI, true)
      ctx.closePath()
      ctx.fillStyle = 'rgba(255,255,255,0.02)'
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(95,150,255,0.28)'
      ctx.stroke()

      // inner sapphire cross
      ctx.beginPath()
      const crossS = 18
      ctx.fillStyle = 'rgba(79,140,255,0.96)'
      // cross vertical
      ctx.fillRect(-6, -18, 12, 36)
      // cross horizontal
      ctx.fillRect(-18, -6, 36, 12)
      // soft inner glow
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = 'rgba(89,225,255,0.18)'
      ctx.fillRect(-6, -18, 12, 36)
      ctx.fillRect(-18, -6, 36, 12)
      ctx.globalCompositeOperation = 'source-over'

      ctx.restore()
    }

    function drawECGSphere(cx, cy, time) {
      // small sphere to left of center
      const t = time * 0.001
      const x = cx - 120 + Math.sin(t * 0.9) * 8
      const y = cy - 40 + Math.cos(t * 0.7) * 6
      const r = 44

      // sphere base
      const g = ctx.createRadialGradient(x - r*0.3, y - r*0.3, r*0.2, x, y, r*1.6)
      g.addColorStop(0, 'rgba(89,225,255,0.14)')
      g.addColorStop(0.5, 'rgba(79,140,255,0.06)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()

      // ECG pulse waveform inside
      ctx.save()
      ctx.beginPath()
      const waveLen = 180
      const phase = (time * 0.003) % waveLen
      ctx.moveTo(x - r + 8, y)
      for (let i = 0; i < waveLen; i += 4) {
        const px = x - r + 8 + i
        const py = y + Math.sin((i + phase) * 0.06) * (i % 40 === 0 ? 8 : 3)
        ctx.lineTo(px, py)
      }
      ctx.lineWidth = 1.8
      ctx.strokeStyle = 'rgba(89,225,255,0.95)'
      ctx.stroke()
      ctx.restore()

      // subtle outer rim
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.beginPath()
      ctx.arc(x, y, r + 10, 0, Math.PI * 2)
      ctx.stroke()
    }

    function drawDnaRibbon(cx, cy, time) {
      const len = 420
      const steps = 120
      const tilt = 0.6
      ctx.save()
      ctx.translate(cx + 80, cy - 40)
      ctx.rotate(-0.18)
      for (let i = 0; i < 2; i++) {
        ctx.beginPath()
        for (let t = 0; t <= steps; t++) {
          const u = t / steps
          const ang = u * Math.PI * 2 + time * 0.0007 * (i === 0 ? 1 : -1)
          const x = Math.cos(ang) * (30 + u * 60) + u * 220
          const y = Math.sin(ang) * 12 + Math.sin(u * Math.PI * 2 + time * 0.0004) * 8
          if (t === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.lineWidth = 6
        ctx.strokeStyle = i === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(79,140,255,0.12)'
        ctx.stroke()
      }
      ctx.restore()
    }

    function drawCapsulesAndMolecules(cx, cy, time) {
      capsules.forEach(c => {
        c.t += c.speed * time
        const x = cx + Math.cos(c.t) * c.r + (mouse.current.x - w/2) * 0.02
        const y = cy + Math.sin(c.t * 0.7) * (c.r * 0.45) + (mouse.current.y - h/2) * 0.02
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.sin(c.t) * 0.5)
        // capsule body
        ctx.fillStyle = 'rgba(255,255,255,0.03)'
        roundCapsule(ctx, -c.size/2, -c.size/4, c.size, c.size/2, c.size/2)
        ctx.fill()
        // chrome highlight
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.stroke()
        ctx.restore()
      })
    }

    function drawNodes(cx, cy, time) {
      // nodes + connecting lines
      // compute positions
      const pts = nodes.map(n => {
        n.ang += n.speed * time
        const x = cx + Math.cos(n.ang) * n.r + (mouse.current.x - w/2) * 0.03
        const y = cy + Math.sin(n.ang * 0.76) * (n.r * 0.52) + (mouse.current.y - h/2) * 0.03
        return { x, y, n }
      })

      // Glow lines
      ctx.beginPath()
      pts.forEach((p, i) => {
        const next = pts[(i + 1) % pts.length]
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(next.x, next.y)
      })
      ctx.lineWidth = 0.8
      ctx.strokeStyle = 'rgba(89,225,255,0.06)'
      ctx.stroke()

      // nodes
      pts.forEach(p => {
        const rad = p.n.size + 1.2
        const g = ctx.createRadialGradient(p.x - rad/2, p.y - rad/2, 0, p.x, p.y, rad * 2)
        g.addColorStop(0, 'rgba(89,225,255,0.9)')
        g.addColorStop(1, 'rgba(89,225,255,0.02)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawParticles(cx, cy, time) {
      particles.forEach(p => {
        p.z -= p.speed * time * 0.08
        if (p.z < -1.2) p.z = 1.6
        const px = cx + p.x * sceneScale * (1 + p.z) + (mouse.current.x - w/2) * 0.02
        const py = cy + p.y * sceneScale * (0.45 + p.z * 0.25) + (mouse.current.y - h/2) * 0.02
        const rad = p.size * (1 + p.z * 0.8)
        const grd = ctx.createRadialGradient(px, py, 0, px, py, rad * 2)
        grd.addColorStop(0, p.hue)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(px, py, rad, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawVolumetricFog(cx, cy, time) {
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const grd = ctx.createRadialGradient(cx, cy, 40, cx, cy, Math.max(w,h) * 0.9)
      grd.addColorStop(0, 'rgba(79,140,255,0.02)')
      grd.addColorStop(0.3, 'rgba(123,92,255,0.01)')
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)
      ctx.restore()
    }

    function render(time) {
      clear()
      drawBackground()
      const cx = w * 0.72 + (mouse.current.x - w/2) * 0.02
      const cy = h * 0.5 + (mouse.current.y - h/2) * 0.02

      // depth layers: background rings, particles, octahedron, pin & cross, dna, capsules, nodes
      drawRings(cx, cy, time)
      drawParticles(cx, cy, time)
      drawOctahedron(cx, cy, time)
      drawNavPinCross(cx, cy, time)
      drawECGSphere(cx, cy, time)
      drawDnaRibbon(cx, cy, time)
      drawCapsulesAndMolecules(cx, cy, time)
      drawNodes(cx, cy, time)
      drawVolumetricFog(cx, cy, time)

      // subtle streaks (parallax light flow)
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = 'rgba(95,150,255,0.03)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(cx - 220, cy + 160)
      ctx.quadraticCurveTo(cx - 40, cy + 40, cx + 240, cy + 120)
      ctx.stroke()
      ctx.globalCompositeOperation = 'source-over'
    }

    function loop(t) {
      render(t)
      raf = requestAnimationFrame(loop)
    }

    function handleMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = (e.clientX - rect.left)
      mouse.current.y = (e.clientY - rect.top)
    }

    // capsule helper
    function roundCapsule(ctx, x, y, w, h, r) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h/2, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }

    // polyfill roundRect
    (function () {
      if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
          if (w < 2 * r) r = w / 2
          if (h < 2 * r) r = h / 2
          this.beginPath()
          this.moveTo(x + r, y)
          this.arcTo(x + w, y, x + w, y + h, r)
          this.arcTo(x + w, y + h, x, y + h, r)
          this.arcTo(x, y + h, x, y, r)
          this.arcTo(x, y, x + w, y, r)
          this.closePath()
        }
      }
    })()

    // init
    resize()
    initScene()
    loop(0)
    window.addEventListener('resize', () => { resize(); initScene() })
    window.addEventListener('mousemove', handleMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', () => {})
      window.removeEventListener('mousemove', handleMove)
    }
  }, [darkMode])

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '60%', pointerEvents: 'none', overflow: 'hidden', ...style }}>
      <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
