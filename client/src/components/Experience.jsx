import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const HIGHLIGHTS = [
  'Built responsive UIs with React and Tailwind CSS',
  'Developed backend REST APIs with Node.js, Express, and MongoDB',
  'Integrated JWT authentication and Socket.IO for real-time features',
  'Managed version control and team collaboration via Git and GitHub',
]

export default function Experience() {
  const [ref, visible] = useInView()

  return (
    <section id="experience" className="relative py-24 bg-bg-elevated overflow-hidden" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">09 // EXPERIENCE</p>
          <h2 className="section-heading">
            Work <span className="gold-text italic">History</span>
          </h2>
        </motion.div>

        {/* Single experience card — styled as a timeline entry */}
        <div className="relative max-w-3xl">
          {/* Left gold bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #c9a24a, rgba(201,162,74,0.1))',
              boxShadow: '0 0 10px rgba(201,162,74,0.3)',
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pl-8"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-gold-sm animate-pulse-gold"
                       aria-hidden="true" />
                  <p className="font-mono text-gold text-xs tracking-widest uppercase">
                    Current Position
                  </p>
                </div>
                <h3 className="text-xl font-bold text-body">Full Stack Developer Intern</h3>
                <p className="text-gold mt-1">
                  <a
                    href="https://lunaritsolution.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    data-cursor-text="Visit"
                    className="hover:text-amber transition-colors duration-200"
                  >Lunar IT Solution</a>
                  <span className="text-muted font-normal"> · Itahari, Nepal</span>
                </p>
              </div>
              <span className="font-mono text-xs text-muted bg-bg-card border border-gold/10
                               rounded px-3 py-1.5 h-fit flex-shrink-0 whitespace-nowrap">
                June 2025 – Present
              </span>
            </div>

            {/* Highlights */}
            <ul className="flex flex-col gap-3" role="list">
              {HIGHLIGHTS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 text-body/75 text-sm"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0"
                        aria-hidden="true" />
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* Tech used */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gold/10"
            >
              {['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.IO', 'Git'].map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
