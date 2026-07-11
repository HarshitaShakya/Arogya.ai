import React, { Suspense, useMemo, useRef, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import { Float, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// --- Error Boundary for Debugging ---
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position: 'absolute', top: 50, right: 50, background: 'red', color: 'white', padding: 20, zIndex: 9999 }}>
          <h1>Canvas Error</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
// ------------------------------------

function InstancedCircularCity() {
  const instanceData = useMemo(() => {
    const data = []
    
    // Define 4 concentric rings of buildings
    const rings = [
      { rStart: 2.5, rEnd: 5.5, count: 14, heightMax: 7.0, heightMin: 3.5 },
      { rStart: 6.5, rEnd: 11.5, count: 28, heightMax: 5.0, heightMin: 2.0 },
      { rStart: 12.5, rEnd: 17.5, count: 42, heightMax: 3.5, heightMin: 1.5 },
      { rStart: 18.5, rEnd: 23.0, count: 56, heightMax: 2.5, heightMin: 1.0 },
    ]

    rings.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2
        
        // Pseudo-random jitter based on ring and index
        const seed = ring.rStart * 17 + i * 31
        
        // Jitter radius within the ring boundaries
        const rJitter = Math.sin(seed) * (ring.rEnd - ring.rStart) * 0.35
        const r = (ring.rStart + ring.rEnd) / 2 + rJitter
        
        // Jitter angle slightly
        const aJitter = Math.cos(seed) * (Math.PI * 2 / ring.count) * 0.3
        const a = angle + aJitter
        
        const x = Math.cos(a) * r
        const z = Math.sin(a) * r
        
        const h = ring.heightMin + Math.abs(Math.sin(seed * 4)) * (ring.heightMax - ring.heightMin)
        const w = 0.9 + Math.abs(Math.cos(seed * 2)) * 0.7
        const d = 0.9 + Math.abs(Math.sin(seed * 3)) * 0.7
        
        // Align the building facing the center
        const rot = -a + Math.PI / 2
        
        data.push({ x, z, w, h, d, rot, isAccent: i % 5 === 0, seed })
      }
    })
    return data
  }, [])

  const count = instanceData.length
  const buildingRef = useRef(null)
  const windowRef = useRef(null)
  const roofRef = useRef(null)
  const spireRef = useRef(null)
  const beaconRef = useRef(null)

  useEffect(() => {
    if (!buildingRef.current) return
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    instanceData.forEach((b, i) => {
      // 1. Main Building Body
      dummy.position.set(b.x, b.h / 2, b.z)
      dummy.rotation.set(0, b.rot, 0)
      dummy.scale.set(b.w, b.h, b.d)
      dummy.updateMatrix()
      buildingRef.current.setMatrixAt(i, dummy.matrix)
      
      const bColor = b.isAccent ? '#11294d' : '#030814'
      color.set(bColor)
      buildingRef.current.setColorAt(i, color)

      // 2. Window Glass Facade (Wrapping the whole building)
      dummy.position.set(b.x, b.h / 2, b.z)
      dummy.rotation.set(0, b.rot, 0)
      dummy.scale.set(b.w * 1.01, b.h * 0.99, b.d * 1.01)
      dummy.updateMatrix()
      windowRef.current.setMatrixAt(i, dummy.matrix)

      const wColor = b.isAccent ? '#59e1ff' : '#2a6dd1'
      color.set(wColor).multiplyScalar(2.5) // Multiply for Bloom glow
      windowRef.current.setColorAt(i, color)

      // 3. Rooftop Equipment Box
      const roofH = 0.4
      dummy.position.set(b.x, b.h + roofH / 2, b.z)
      dummy.rotation.set(0, b.rot, 0)
      dummy.scale.set(b.w * 0.6, roofH, b.d * 0.6)
      dummy.updateMatrix()
      roofRef.current.setMatrixAt(i, dummy.matrix)

      // 4. Spire Antenna
      const spireH = 1.0 + Math.abs(Math.sin(b.seed)) * 1.5
      dummy.position.set(b.x, b.h + roofH + spireH / 2, b.z)
      dummy.rotation.set(0, b.rot, 0)
      dummy.scale.set(0.04, spireH, 0.04)
      dummy.updateMatrix()
      spireRef.current.setMatrixAt(i, dummy.matrix)

      // 5. Spire Beacon
      dummy.position.set(b.x, b.h + roofH + spireH, b.z)
      dummy.rotation.set(0, b.rot, 0)
      dummy.scale.set(0.12, 0.12, 0.12)
      dummy.updateMatrix()
      beaconRef.current.setMatrixAt(i, dummy.matrix)
      
      const emitColor = b.isAccent ? '#59e1ff' : '#4f8cff'
      color.set(emitColor).multiplyScalar(4.0) // Intense beacon glow
      beaconRef.current.setColorAt(i, color)
    })
    
    buildingRef.current.instanceMatrix.needsUpdate = true
    if (buildingRef.current.instanceColor) buildingRef.current.instanceColor.needsUpdate = true
    
    windowRef.current.instanceMatrix.needsUpdate = true
    if (windowRef.current.instanceColor) windowRef.current.instanceColor.needsUpdate = true
    
    roofRef.current.instanceMatrix.needsUpdate = true
    spireRef.current.instanceMatrix.needsUpdate = true
    
    beaconRef.current.instanceMatrix.needsUpdate = true
    if (beaconRef.current.instanceColor) beaconRef.current.instanceColor.needsUpdate = true
  }, [instanceData])

  return (
    <group>
      <instancedMesh ref={buildingRef} args={[null, null, count]} castShadow receiveShadow>
        <boxGeometry />
        <meshPhysicalMaterial roughness={0.1} metalness={0.9} clearcoat={1.0} transmission={0.6} thickness={2.0} ior={1.5} />
      </instancedMesh>
      
      <instancedMesh ref={windowRef} args={[null, null, count]}>
        <boxGeometry />
        <meshBasicMaterial 
          toneMapped={false} 
          transparent
          side={THREE.DoubleSide}
          onBeforeCompile={(shader) => {
            shader.vertexShader = `
              varying vec3 vLocalScaled;
              varying vec3 vLocalNormal;
              ${shader.vertexShader}
            `.replace(
              '#include <begin_vertex>',
              `
              #include <begin_vertex>
              vec3 instanceScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
              vLocalScaled = position * instanceScale;
              vLocalNormal = abs(normal);
              `
            );
            shader.fragmentShader = `
              varying vec3 vLocalScaled;
              varying vec3 vLocalNormal;
              ${shader.fragmentShader}
            `.replace(
              '#include <color_fragment>',
              `
              #include <color_fragment>
              vec2 gridUV;
              if (vLocalNormal.z > 0.5) gridUV = vLocalScaled.xy;
              else if (vLocalNormal.x > 0.5) gridUV = vLocalScaled.zy;
              else gridUV = vLocalScaled.xz;
              
              // 4 windows per spatial unit
              vec2 gridPos = gridUV * vec2(4.0, 4.0);
              vec2 grid = fract(gridPos);
              
              // Draw sharp windows
              float windowX = step(0.15, grid.x) * step(grid.x, 0.85);
              float windowY = step(0.15, grid.y) * step(grid.y, 0.85);
              float window = windowX * windowY;
              
              // Randomly turn off 40% of windows for a realistic night city look
              vec2 cell = floor(gridPos);
              float randomVal = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
              if (randomVal > 0.6) window *= 0.05; 
              
              // No windows on the roof
              if (vLocalNormal.y > 0.5) window = 0.0;
              
              diffuseColor.rgb *= window;
              
              // Discard black frames so the gorgeous physical glass building underneath shows through!
              if (window < 0.1) discard;
              `
            );
          }}
        />
      </instancedMesh>

      <instancedMesh ref={roofRef} args={[null, null, count]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="#050a14" roughness={0.8} />
      </instancedMesh>

      <instancedMesh ref={spireRef} args={[null, null, count]} castShadow>
        <cylinderGeometry args={[1, 1, 1, 4]} />
        <meshStandardMaterial color="#3f8cff" roughness={0.3} metalness={0.9} />
      </instancedMesh>

      <instancedMesh ref={beaconRef} args={[null, null, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

function BasePlatform() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Main black cylinder disc */}
      <mesh receiveShadow>
        <cylinderGeometry args={[24.5, 25, 1, 64]} />
        <meshStandardMaterial color="#020612" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Outer glowing rim */}
      <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[24.2, 24.5, 128]} />
        <meshBasicMaterial color="#59e1ff" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function CircularRoads() {
  const radii = [6.0, 12.0, 18.0, 23.5]
  
  return (
    <group position={[0, 0.05, 0]}>
      {/* Soft outer glow for roads */}
      {radii.map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.25, r + 0.25, 128]} />
          <meshBasicMaterial color="#4f8cff" transparent opacity={0.3} />
        </mesh>
      ))}
      
      {/* Intense bright core for roads */}
      {radii.map((r, i) => (
        <mesh key={`glow-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[r - 0.08, r + 0.08, 128]} />
          <meshBasicMaterial color={[1.5, 3.5, 6.0]} toneMapped={false} />
        </mesh>
      ))}

      {/* Radial Cross roads */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <group key={`cross-${i}`} rotation={[0, angle, 0]} position={[0, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[12, 0, 0]}>
            <planeGeometry args={[24, 0.5]} />
            <meshBasicMaterial color="#4f8cff" transparent opacity={0.2} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[12, 0.01, 0]}>
            <planeGeometry args={[24, 0.1]} />
            <meshBasicMaterial color={[1.5, 3.5, 6.0]} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function HospitalTower() {
  const size = [3.0, 10.0, 3.0]
  return (
    <group position={[0, size[1] / 2, 0]}>
      {/* Tier 3 Main Tower */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshPhysicalMaterial color="#c0d8ff" roughness={0.1} metalness={0.85} clearcoat={1.0} transmission={0.7} thickness={3.0} ior={1.48} emissive="#102e66" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Glowing neon edges for the hospital */}
      <mesh>
        <boxGeometry args={[size[0] * 1.02, size[1] * 0.98, size[2] * 1.02]} />
        <meshBasicMaterial color={[0.5, 1.5, 3.0]} toneMapped={false} wireframe transparent opacity={0.4} />
      </mesh>

      {/* Tier 2 Base */}
      <mesh position={[0, -size[1] * 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[size[0] * 1.6, size[1] * 0.3, size[2] * 1.6]} />
        <meshPhysicalMaterial color="#9fc4ff" roughness={0.15} metalness={0.8} transmission={0.5} emissive="#081c45" emissiveIntensity={0.6} />
      </mesh>

      {/* Clean, simple white roof */}
      <mesh position={[0, size[1] / 2 + 0.05, 0]}>
        <boxGeometry args={[size[0] * 0.8, 0.1, size[2] * 0.8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>

      <Float speed={2.0} rotationIntensity={0} floatIntensity={0.5}>
        <HospitalPin yPos={size[1] * 0.5 + 2.2} />
      </Float>
    </group>
  )
}

function HospitalPin({ yPos }) {
  const crossRef = useRef(null)
  
  useFrame(({ clock }) => {
    if (crossRef.current) {
      // Gentle, subtle sway instead of full spinning
      crossRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.2
    }
  })

  return (
    <group position={[0, yPos, 0]} ref={crossRef}>
      {/* Simple, minimalist glowing medical cross */}
      <mesh>
        <boxGeometry args={[0.6, 2.4, 0.6]} />
        <meshBasicMaterial color={[1.0, 3.0, 6.0]} toneMapped={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[2.4, 0.6, 0.6]} />
        <meshBasicMaterial color={[1.0, 3.0, 6.0]} toneMapped={false} />
      </mesh>
      
      {/* Inner pure white core for maximum brightness */}
      <mesh>
        <boxGeometry args={[0.3, 2.45, 0.3]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[2.45, 0.3, 0.3]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </group>
  )
}

function CircularCityScene() {
  const rootRef = useRef(null)

  useFrame(({ clock, pointer, camera }) => {
    const time = clock.getElapsedTime()
    if (rootRef.current) {
      rootRef.current.rotation.y = time * 0.05 // Gentle continuous rotation of the entire disc
    }

    // PERFECT DIORAMA CAMERA POSITION
    // Shifted left (-15) so the city appears on the right side of the screen
    const targetX = pointer.x * 6.0 - 15.0
    const targetY = 45.0 + pointer.y * 3.0
    const targetZ = 65.0

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04)
    camera.lookAt(-15, 0, 0)
  })

  return (
    <group ref={rootRef}>
      <BasePlatform />
      <CircularRoads />
      <InstancedCircularCity />
      <HospitalTower />
    </group>
  )
}

export default function HolographicCity() {
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0, background: darkMode ? '#010308' : th.bg }}>
      <CanvasErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 45, 65], fov: 35, near: 0.1, far: 500 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <ambientLight intensity={1.0} color="#1a2235" />
          <directionalLight position={[20, 40, 20]} intensity={1.5} color="#c0e8ff" castShadow shadow-mapSize={[2048, 2048]} />
          <pointLight position={[0, 15, 0]} intensity={2.0} color="#2b6bba" distance={80} />
          
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <CircularCityScene />
            
            <EffectComposer multisampling={4}>
              <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.8} intensity={1.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}