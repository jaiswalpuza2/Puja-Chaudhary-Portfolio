import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const STATS = [
  { value: 40,  suffix: '+', label: 'Projects & Learning\nMilestones' },
  { value: 4,   suffix: '',  label: 'AWS\nCertifications'              },
  { value: 1,   suffix: '',  label: 'Live\nInternship'                  },
  { value: 3,   suffix: '',  label: 'Languages\nSpoken'                 },
]

function AnimatedNumber({ target, suffix, running }) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!running) return
    const duration = 1400
    const start = performance.now()

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }
    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [running, target])

  return (
    <span className="text-4xl sm:text-5xl font-black gold-text tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const [ref, visible] = useInView()

  return (
    <section
      ref={ref}
      id="stats"
      className="relative py-16 border-y border-gold/10 bg-bg-elevated"
      aria-label="Key statistics"
    >
      {/* Subtle top/bottom glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gold/10"
        >
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-4 gap-2"
            >
              <AnimatedNumber target={value} suffix={suffix} running={visible} />
              <p className="font-mono text-muted text-xs tracking-widest uppercase leading-relaxed whitespace-pre-line">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
