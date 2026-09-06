import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function MyJourney() {
  const [ref, visible] = useInView()

  return (
    <section id="journey" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Faint decorative circle */}
      <div
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full
                   bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">03 // JOURNEY</p>
          <h2 className="section-heading">
            My <span className="gold-text italic">Journey</span>
          </h2>
        </motion.div>

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-full max-w-[440px] rounded-xl overflow-hidden
                          border border-gold/20 shadow-gold-md">
            <video
              src="/journey-video.mp4"
              muted
              autoPlay
              loop
              playsInline
              aria-label="My journey from first line of code to production"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Caption */}
          <p className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase text-center">
            From first line of code to production.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
