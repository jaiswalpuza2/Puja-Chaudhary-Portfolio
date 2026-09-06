import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useTheme } from '../../context/ThemeContext'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Read a CSS variable like "201 162 74" from :root and return "#c9a24a". */
function cssVarToHex(varName) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()                        // "201 162 74"
  if (!raw) return '#ffffff'
  const [r, g, b] = raw.split(' ').map(Number)
  return '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')
}

// ── Shapes ────────────────────────────────────────────────────────────────────

function ParallaxShape({ position, scale, speed, rotationIntensity, floatIntensity, color, children }) {
  const ref = useRef(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.07
    ref.current.rotation.y += delta * 0.11
    const { pointer } = state
    ref.current.rotation.y += (pointer.x * 0.35 - ref.current.rotation.y) * 0.012
    ref.current.rotation.x += (-pointer.y * 0.2 - ref.current.rotation.x) * 0.012
  })

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity} position={position}>
      <mesh ref={ref} scale={scale}>
        {children}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.2}
          roughness={0.4}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function ScatteredShapes({ gold, amber }) {
  return (
    <>
      {/* ── Pointer-reactive shapes ──────────────────── */}

      {/* Small icosahedron — right-center */}
      <ParallaxShape position={[2.2, 0.4, -1]} scale={0.38} speed={1.4} rotationIntensity={0.7} floatIntensity={1.1} color={gold}>
        <icosahedronGeometry args={[1, 1]} />
      </ParallaxShape>

      {/* Torus — upper right */}
      <ParallaxShape position={[3.0, 1.6, -1.8]} scale={0.32} speed={1.7} rotationIntensity={1.0} floatIntensity={1.3} color={amber}>
        <torusGeometry args={[1, 0.35, 16, 32]} />
      </ParallaxShape>

      {/* ── Freely floating shapes ───────────────────── */}

      {/* Octahedron — far right, mid-height */}
      <Float speed={2.1} rotationIntensity={1.2} floatIntensity={1.5} position={[3.5, -0.5, -1.2]}>
        <mesh scale={0.34}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={amber} emissive={amber} emissiveIntensity={0.4} metalness={0.2} roughness={0.4} wireframe />
        </mesh>
      </Float>

      {/* Tetrahedron — upper right, slightly inward */}
      <Float speed={1.8} rotationIntensity={0.9} floatIntensity={1.2} position={[1.6, 2.2, -1.5]}>
        <mesh scale={0.24}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.4} metalness={0.2} roughness={0.4} wireframe />
        </mesh>
      </Float>

      {/* Small octahedron — lower right */}
      <Float speed={1.5} rotationIntensity={1.4} floatIntensity={1.0} position={[2.8, -1.8, -2]}>
        <mesh scale={0.22}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.4} metalness={0.2} roughness={0.4} wireframe />
        </mesh>
      </Float>

      {/* Tiny icosahedron — top edge, right */}
      <Float speed={2.3} rotationIntensity={1.1} floatIntensity={1.6} position={[0.8, 2.8, -2.2]}>
        <mesh scale={0.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={amber} emissive={amber} emissiveIntensity={0.4} metalness={0.2} roughness={0.4} wireframe />
        </mesh>
      </Float>
    </>
  )
}

export default function HeroScene() {
  // Re-renders whenever the user switches theme, giving us fresh CSS var values
  useTheme()

  const gold  = cssVarToHex('--color-gold')
  const amber = cssVarToHex('--color-amber')

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]}  intensity={1.3} color={gold}  />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color={amber} />
      <Suspense fallback={null}>
        <ScatteredShapes gold={gold} amber={amber} />
      </Suspense>
    </Canvas>
  )
}
