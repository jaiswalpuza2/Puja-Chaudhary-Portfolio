import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Wraps any card content and tilts it in 3D toward the cursor on hover,
 * with a soft gold glare that follows the pointer. Purely additive —
 * pass your existing card className straight through.
 */
export default function Tilt({ children, className = '', tiltMax = 10, glare = true, ...rest }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [tiltMax, -tiltMax]), {
    stiffness: 300,
    damping: 28,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-tiltMax, tiltMax]), {
    stiffness: 300,
    damping: 28,
  })

  const glareBackground = useTransform([px, py], ([gx, gy]) =>
    `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(232,200,116,0.16), transparent 60%)`
  )

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const handleLeave = () => { px.set(0.5); py.set(0.5) }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="h-full" style={{ perspective: 1000 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`relative ${className}`}
        {...rest}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  )
}
