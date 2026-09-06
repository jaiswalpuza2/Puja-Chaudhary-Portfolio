import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import Tilt from './Tilt'
import Magnetic from './Magnetic'
import { scrollToSection } from '../utils/scroll'
import myphoto from '../assets/myphoto.jpeg'

export default function CallToAction() {
  const [ref, visible] = useInView()

  return (
    <section id="availability" className="relative py-24 bg-bg-elevated overflow-hidden" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      {/* Faint decorative circle */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full
                      bg-gold/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">10 // AVAILABILITY</p>
          <h2 className="section-heading">
            Ready to <span className="gold-text italic">Contribute</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text — left column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <p className="text-body/80 text-lg leading-relaxed">
              Looking for an opportunity to turn complex ideas into clean,
              reliable, and high-performing software solutions. Driven by a
              passion for continuous learning and modern engineering practices, I
              thrive in collaborative, fast-paced environments where I can
              immediately contribute to real-world projects. Whether it is
              solving challenging algorithmic problems, optimizing system
              workflows, or engineering intuitive user experiences, I am fully
              equipped, eager to take ownership, and always ready to make an
              immediate, meaningful impact on your engineering team.
            </p>

            <Magnetic strength={0.15}>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary"
                data-cursor
                data-cursor-text="Contact"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Let's Talk
              </button>
            </Magnetic>
          </motion.div>

          {/* Photo — right column */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex justify-center lg:justify-end"
          >
            <Tilt tiltMax={12} glare className="w-72 h-80 sm:w-96 sm:h-[26rem]">
              <div className="relative w-full h-full">
                {/* Gold border frame */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/60
                                shadow-gold-glow rotate-3" aria-hidden="true" />
                <div className="absolute inset-0 rounded-2xl border border-gold/20
                                -rotate-3" aria-hidden="true" />
                {/* Photo */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold/30">
                  <img
                    src={myphoto}
                    alt="Puja Chaudhary"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Corner accents */}
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2
                                border-gold/60 rounded-br" aria-hidden="true" />
                <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2
                                border-gold/60 rounded-tl" aria-hidden="true" />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
