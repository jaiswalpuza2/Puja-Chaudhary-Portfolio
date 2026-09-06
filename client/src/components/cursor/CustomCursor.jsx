import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Two-part cursor: a tight dot that tracks instantly, and a spring-lagged
 * ring that expands + shows a label over interactive elements. Only mounts
 * on fine-pointer (mouse/trackpad) devices — touch devices keep native UX.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setEnabled(mq.matches)
    const onChange = (e) => setEnabled(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    const over = (e) => {
      const el = e.target.closest?.('a, button, [data-cursor]')
      if (el) {
        setHovering(true)
        setLabel(el.getAttribute('data-cursor-text') || '')
      }
    }
    const out = (e) => {
      const el = e.target.closest?.('a, button, [data-cursor]')
      if (el) { setHovering(false); setLabel('') }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    document.body.classList.add('cursor-none-desktop')

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.body.classList.remove('cursor-none-desktop')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[999] w-1.5 h-1.5 rounded-full bg-gold pointer-events-none"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : clicking ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed top-0 left-0 z-[998] rounded-full border border-gold/70
                   pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 60 : 30,
          height: hovering ? 60 : 30,
          backgroundColor: hovering ? 'rgba(201,162,74,0.12)' : 'rgba(201,162,74,0)',
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        aria-hidden="true"
      >
        {label && (
          <span className="font-mono text-[8px] tracking-widest uppercase text-gold whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
