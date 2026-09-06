import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import Tilt from './Tilt'

const EDUCATION = [
  {
    degree:      'BSc (Hons) Computing',
    institution: 'Itahari International College',
    url:         'https://iic.edu.np/',
    affiliation: 'London Metropolitan University',
    period:      '2023 – Present',
    current:     true,
  },
  {
    degree:      'Bachelor of Business Management',
    institution: 'Kasturi Management College',
    url:         'https://www.kasturicollege.com/',
    affiliation: null,
    period:      '2019 – 2021',
    current:     false,
  },
  {
    degree:      'SEE — Secondary Education Examination',
    institution: 'Sushma Secondary School',
    url:         'https://sushmasecondary.edu.np/',
    affiliation: null,
    period:      '2075 BS',
    current:     false,
  },
]

export default function Education() {
  const [ref, visible] = useInView()

  return (
    <section id="education" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">08 // EDUCATION</p>
          <h2 className="section-heading">
            Academic <span className="gold-text italic">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical glowing gold line */}
          <div
            className="absolute left-5 top-2 bottom-2 w-px md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(to bottom, #c9a24a 0%, #e8c874 50%, rgba(201,162,74,0.2) 100%)',
              boxShadow: '0 0 12px rgba(201,162,74,0.3)',
            }}
          />

          <div className="flex flex-col gap-10">
            {EDUCATION.map(({ degree, institution, url, affiliation, period, current }, i) => (
              <motion.div
                key={degree}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className={`relative flex items-start gap-6 md:w-5/12
                  ${i % 2 === 0
                    ? 'md:ml-0 md:mr-auto md:pr-8 md:text-right md:flex-row-reverse pl-14 md:pl-0'
                    : 'md:ml-auto md:pl-8 pl-14'
                  }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-3 md:left-auto md:right-auto
                    ${i % 2 === 0 ? 'md:-right-[calc(50%+3px+theme(spacing.5))] md:translate-x-full' : 'md:-left-[calc(50%+3px+theme(spacing.5))] md:-translate-x-full'}
                    top-3 w-5 h-5 rounded-full border-2 flex-shrink-0 z-10 transition-all duration-300`}
                  style={{
                    background: current ? '#c9a24a' : '#131929',
                    borderColor: '#c9a24a',
                    boxShadow: current ? '0 0 12px rgba(201,162,74,0.6)' : 'none',
                  }}
                  aria-hidden="true"
                />

                {/* Card */}
                <Tilt
                  tiltMax={4}
                  className="card-dark rounded-xl p-5 flex-1
                             hover:border-gold/40 hover:shadow-gold-md transition-colors duration-300"
                >
                  <div className={`flex items-start justify-between gap-3 flex-wrap
                    ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={i % 2 === 0 ? 'md:text-right' : ''}>
                      <p className="font-bold text-body text-base leading-tight">{degree}</p>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor
                          data-cursor-text="Visit"
                          className="text-gold text-sm mt-1 hover:text-amber
                                     transition-colors duration-200 inline-flex items-center gap-1"
                        >
                          {institution}
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor"
                               viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4
                                 M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <p className="text-gold text-sm mt-1">{institution}</p>
                      )}
                      {affiliation && (
                        <p className="text-muted text-xs mt-0.5">{affiliation}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-1 flex-shrink-0">
                      <span className="font-mono text-xs text-muted bg-bg-card
                                       border border-gold/10 rounded px-2 py-0.5">
                        {period}
                      </span>
                      {current && (
                        <span className="font-mono text-[10px] text-gold tracking-widest uppercase">
                          ● current
                        </span>
                      )}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
