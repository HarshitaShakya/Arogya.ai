import React, { useRef, useEffect } from 'react'
import { useAppStore } from '../store/appStore'

export default function NeuralNetworkBackground({ style = {} }) {
  const { darkMode } = useAppStore()
  
  const COLORS = {
    bgA: '#020512',
    bgB: '#050a1f',
    primary: '#3b82f6',
    cyan: '#59e1ff',
    purple: '#8b5cf6'
  }
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canvas.parentElement) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let width, height
    let animationFrameId
    const particles = []
    
    const initParticles = () => {
      particles.length = 0
      const numParticles = Math.floor((width * height) / 10000)
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          baseColor: Math.random() > 0.6 ? COLORS.cyan : COLORS.primary,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2
        })
      }
    }

    const resize = () => {
      width = canvas.parentElement.clientWidth
      height = canvas.parentElement.clientHeight
      canvas.width = width
      canvas.height = height
      initParticles()
    }

    const draw = (time) => {
      // Clear with gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height)
      bgGrad.addColorStop(0, COLORS.bgA)
      bgGrad.addColorStop(1, COLORS.bgB)
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Update & draw particles
      ctx.lineWidth = 1.2
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        // Move
        p.x += p.vx
        p.y += p.vy
        
        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        
        // Pulse radius
        const currentRadius = p.radius + Math.sin(time * p.pulseSpeed + p.phase) * 0.5

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distSq = dx * dx + dy * dy
          const maxDist = 160
          
          if (distSq < maxDist * maxDist) {
            const opacity = 1 - Math.sqrt(distSq) / maxDist
            ctx.strokeStyle = `rgba(89, 225, 255, ${opacity * 0.4})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.1, currentRadius), 0, Math.PI * 2)
        ctx.fillStyle = p.baseColor
        ctx.shadowBlur = 12
        ctx.shadowColor = p.baseColor
        ctx.fill()
        ctx.shadowBlur = 0 // reset
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    draw(0)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [darkMode])

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', ...style }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
