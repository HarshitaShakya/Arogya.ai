import React, { useState, useEffect, useRef } from 'react';

export default function FloatingRobot({ onClick, isOpen }) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isOpen) return; // don't track when hidden
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Center of the robot
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      // Limit the eye movement
      const maxMove = 4;
      // Normalize and scale
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return;
      
      const moveX = (dx / dist) * Math.min(Math.abs(dx) * 0.02, maxMove);
      const moveY = (dy / dist) * Math.min(Math.abs(dy) * 0.02, maxMove);
      
      setEyeOffset({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  if (isOpen) {
    return (
      <button 
        onClick={onClick}
        style={{
          width: 56, height: 56, 
          borderRadius: '50%', 
          backgroundColor: '#0f172a', 
          border: '1px solid #334155', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 20px rgba(89,225,255,0.2)', 
          fontSize: 20, 
          color: '#59e1ff',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.5), 0 0 30px rgba(89,225,255,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4), 0 0 20px rgba(89,225,255,0.2)';
        }}
      >
        ✕
      </button>
    );
  }

  return (
    <div 
      ref={containerRef}
      onClick={onClick}
      style={{
        position: 'relative',
        width: 100,
        height: 120,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 1000,
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <style>{`
        @keyframes floatRobot {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes breatheGlow {
          0%, 100% { filter: drop-shadow(0 10px 15px rgba(89,225,255,0.2)); }
          50% { filter: drop-shadow(0 15px 25px rgba(89,225,255,0.5)); }
        }
        @keyframes blinkEyes {
          0%, 46%, 48%, 100% { transform: scaleY(1); }
          47%, 49% { transform: scaleY(0.1); }
        }
        @keyframes swayLeftArm {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes swayRightArm {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes pulseCore {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; box-shadow: 0 0 10px #59e1ff, inset 0 0 5px #fff; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; box-shadow: 0 0 20px #59e1ff, inset 0 0 8px #fff; }
        }
        @keyframes rotateRing {
          0% { transform: rotateX(70deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-40px) scale(0); opacity: 0; }
        }
        
        .robot-wrapper {
          animation: floatRobot 4s ease-in-out infinite, breatheGlow 4s ease-in-out infinite;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }

        .robot-head {
          width: 56px;
          height: 44px;
          background: radial-gradient(circle at 35% 25%, #ffffff, #e2e8f0 70%, #cbd5e1);
          border-radius: 40px 40px 30px 30px;
          box-shadow: 
            -3px -3px 8px rgba(255, 255, 255, 0.9) inset,
            3px 4px 10px rgba(0, 0, 0, 0.1) inset,
            0 8px 16px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .robot-visor {
          width: 44px;
          height: 22px;
          background: #0f172a;
          border-radius: 20px;
          position: absolute;
          top: 10px;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.8), 0 1px 2px rgba(255,255,255,0.8);
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visor-glass-glare {
          position: absolute;
          top: -5px;
          left: 5px;
          width: 30px;
          height: 10px;
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
          border-radius: 10px;
          transform: rotate(-10deg);
          pointer-events: none;
        }

        .eyes-container {
          display: flex;
          gap: 10px;
          animation: blinkEyes 5s infinite;
          transition: transform 0.1s ease-out;
        }

        .eye {
          width: 10px;
          height: 10px;
          background: #59e1ff;
          border-radius: 50%;
          box-shadow: 0 0 8px #59e1ff, 0 0 12px #4f8cff;
          position: relative;
        }
        
        .eye::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 3px;
          height: 3px;
          background: #fff;
          border-radius: 50%;
        }

        .robot-smile {
          position: absolute;
          bottom: 6px;
          width: 10px;
          height: 4px;
          border-bottom: 2px solid rgba(15, 23, 42, 0.3);
          border-radius: 50%;
        }

        .robot-body {
          width: 40px;
          height: 36px;
          background: radial-gradient(circle at 35% 25%, #ffffff, #e2e8f0 70%, #94a3b8);
          border-radius: 20px 20px 24px 24px;
          box-shadow: 
            -2px -2px 6px rgba(255, 255, 255, 0.9) inset,
            2px 3px 8px rgba(0, 0, 0, 0.15) inset;
          margin-top: -4px;
          position: relative;
          z-index: 2;
        }

        .chest-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 12px;
          background: #e0ffff;
          border-radius: 50%;
          animation: pulseCore 3s ease-in-out infinite;
        }

        .robot-arm {
          width: 10px;
          height: 22px;
          background: radial-gradient(circle at 30% 30%, #ffffff, #cbd5e1);
          border-radius: 10px;
          position: absolute;
          top: 48px;
          box-shadow: inset -1px -2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1);
          z-index: 1;
        }

        .left-arm {
          left: -4px;
          transform-origin: top center;
          animation: swayLeftArm 4s ease-in-out infinite;
        }

        .right-arm {
          right: -4px;
          transform-origin: top center;
          animation: swayRightArm 4s ease-in-out infinite reverse;
        }

        .energy-ring-container {
          position: absolute;
          bottom: 10px;
          width: 60px;
          height: 20px;
          z-index: 1;
          perspective: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .energy-ring {
          width: 60px;
          height: 60px;
          border: 2px solid rgba(89,225,255,0.4);
          border-radius: 50%;
          animation: rotateRing 6s linear infinite;
          box-shadow: 0 0 10px rgba(89,225,255,0.3), inset 0 0 10px rgba(89,225,255,0.2);
          position: absolute;
        }
        
        .energy-ring-2 {
          width: 44px;
          height: 44px;
          border: 1px dashed rgba(89,225,255,0.6);
          border-radius: 50%;
          animation: rotateRing 4s linear infinite reverse;
          position: absolute;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #59e1ff;
          border-radius: 50%;
          box-shadow: 0 0 6px #59e1ff;
        }
      `}</style>

      {/* Floating Particles */}
      <div style={{ position: 'absolute', bottom: 15, left: '20%', animation: 'floatParticle 2s ease-in infinite' }} className="particle" />
      <div style={{ position: 'absolute', bottom: 10, left: '50%', animation: 'floatParticle 2.5s ease-in infinite 0.5s' }} className="particle" />
      <div style={{ position: 'absolute', bottom: 15, right: '25%', animation: 'floatParticle 2.2s ease-in infinite 1.2s' }} className="particle" />
      <div style={{ position: 'absolute', bottom: 5, left: '75%', animation: 'floatParticle 1.8s ease-in infinite 0.8s' }} className="particle" />

      <div className="robot-wrapper">
        <div className="robot-head">
          <div className="robot-visor">
            <div className="visor-glass-glare" />
            <div 
              className="eyes-container"
              style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}
            >
              <div className="eye" />
              <div className="eye" />
            </div>
          </div>
          <div className="robot-smile" />
        </div>
        
        <div className="robot-arm left-arm" />
        <div className="robot-arm right-arm" />
        
        <div className="robot-body">
          <div className="chest-core" />
        </div>
      </div>

      <div className="energy-ring-container">
        <div className="energy-ring" />
        <div className="energy-ring-2" />
      </div>

    </div>
  );
}
