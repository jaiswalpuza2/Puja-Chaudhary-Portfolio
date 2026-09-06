import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import photo from '../assets/photo.png'
import Tilt from './Tilt'

export default function About() {
  const [ref, visible] = useInView()

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Faint decorative circle */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full
                      bg-gold/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-label mb-3">02 // ABOUT_ME</p>
          <h2 className="section-heading">
            The <span className="gold-text italic">Developer</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center lg:justify-start"
          >
            <Tilt tiltMax={12} glare className="w-72 h-80 sm:w-96 sm:h-[26rem]">
              <div className="relative w-full h-full">
                {/* Gold border frame */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/60
                                shadow-gold-glow rotate-3" aria-hidden="true" />
                <div className="absolute inset-0 rounded-2xl border border-gold/20
                                -rotate-3" aria-hidden="true" />
                {/* Profile photo */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold/30">
                  <img
                    src={photo}
                    alt="Puja Chaudhary"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Corner accent */}
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2
                                border-gold/60 rounded-br" aria-hidden="true" />
                <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2
                                border-gold/60 rounded-tl" aria-hidden="true" />
              </div>
            </Tilt>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-6"
          >
            <p className="text-body/80 text-lg leading-relaxed">
              6+ shipped projects. 4 AWS certifications. 1 live internship building
              production features. I'm a Full Stack Developer who works comfortably
              across the whole stack — React on the front, Node/Express and MongoDB
              on the back — and I'm most useful when a problem doesn't have an
              obvious answer yet.
            </p>

            {/* Current role */}
            <Tilt tiltMax={4} className="card-dark p-5 rounded-xl flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0 animate-pulse-gold" />
              <div>
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
                  Current Role
                </p>
                <p className="font-semibold text-body">Full Stack Developer Intern</p>
                <p className="text-gold text-sm">
                  <a
                    href="https://lunaritsolution.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    data-cursor-text="Visit"
                    className="hover:text-amber transition-colors duration-200"
                  >Lunar IT Solution</a>
                  {' · Itahari, Nepal'}
                </p>
                <p className="font-mono text-xs text-muted mt-1">June 2025 – Present</p>
              </div>
            </Tilt>

            {/* Highlights */}
            <Tilt tiltMax={4} className="card-dark p-5 rounded-xl flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-amber mt-2 flex-shrink-0" />
              <div>
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
                  Highlights
                </p>
                <p className="font-semibold text-body">AWS-Certified Full Stack Developer</p>
                <p className="text-gold text-sm">6 Live Projects · 4 AWS Certifications</p>
                <p className="font-mono text-xs text-muted mt-1">Fast learner · Detail-oriented · Reliable under deadlines</p>
              </div>
            </Tilt>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-3">
              {['React', 'Node.js', 'MongoDB', 'Python', 'AWS'].map(tag => (
                <span key={tag} className="tech-pill">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
