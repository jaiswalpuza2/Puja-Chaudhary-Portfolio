import React, { useEffect, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import api from '../utils/api'
import Tilt from './Tilt'

// Fallback data — shown if the API is unreachable (e.g. during static preview)
const FALLBACK = [
  {
    _id: '1', order: 1,
    title: 'JobSphere',
    description: 'AI-powered job marketplace connecting freelancers and employers with role-based dashboards.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Google Gemini API', 'JWT', 'Tailwind CSS'],
    githubUrl: 'https://github.com/jaiswalpuza2/puja-chaudhary-jobsphere',
  },
  {
    _id: '2', order: 2,
    title: 'Veda Salon',
    description: 'Full-stack business website for a premium salon featuring services, gallery, reviews, contact info, and appointment booking.',
    techStack: ['Node.js', 'Express', 'HTML5', 'CSS3', 'JavaScript', 'JSON', 'Nodemailer'],
    githubUrl: 'https://github.com/jaiswalpuza2/VedaSalon',
  },
  {
    _id: '3', order: 3,
    title: 'JournalSphere',
    description: 'Secure desktop journaling application supporting daily journal management and mood tracking.',
    techStack: ['.NET MAUI', 'Blazor Hybrid', 'C#'],
    githubUrl: 'https://github.com/jaiswalpuza2/JournalSphere-PujaChaudhary',
  },
  {
    _id: '4', order: 4,
    title: 'Fake News Detection',
    description: 'Machine-learning solution to classify news articles as real or fake using Natural Language Processing.',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'NLP', 'TF-IDF', 'Jupyter Notebook'],
    githubUrl: 'https://github.com/jaiswalpuza2/FakeNewsDetection_PujaChaudhary',
  },
  {
    _id: '5', order: 5,
    title: 'Kumari Cinemas',
    description: 'Cinema management system built as an ASP.NET Web Forms application.',
    techStack: ['ASP.NET Web Forms', 'C#', 'Oracle Database', 'SQL', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/jaiswalpuza2/KumariCinemas',
  },
  {
    _id: '6', order: 6,
    title: 'E-Commerce Website',
    description: 'Full e-commerce web application with DOM-driven interactivity.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    githubUrl: 'https://github.com/jaiswalpuza2/ecommerceWebsite',
  },
]

function ProjectCard({ project, index, visible }) {
  const padded = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Tilt
        tiltMax={7}
        className="card-dark rounded-xl p-6 flex flex-col gap-4 h-full
                   hover:border-gold/50 hover:shadow-gold-md transition-colors duration-300 group"
      >
        {/* Terminal-style header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-gold/60 text-xs tracking-widest mb-1">
              {padded} // PROJECT
            </p>
            <h3 className="text-body font-bold text-lg leading-tight group-hover:text-amber
                           transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              data-cursor
              data-cursor-text="GitHub"
              className="flex-shrink-0 w-11 h-11 rounded-lg border border-gold/20 flex items-center
                         justify-center text-muted hover:text-amber hover:border-gold/50
                         transition-all duration-200"
            >
              {/* GitHub icon */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                         0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                         -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                         .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                         -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004
                         1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7
                         1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338
                         -.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2
                         12 2z" />
              </svg>
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gold/10">
          {project.techStack.map(tech => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

// ── Infinite-scroll marquee row ───────────────────────────────────────────────
// `cards`     — the half-set of ProjectCard elements to repeat
// `direction` — 'left' (top row) or 'right' (bottom row)
// `duration`  — seconds for one full cycle (one copy-width)
function MarqueeRow({ cards, direction, duration, visible }) {
  const controls = useAnimationControls()
  // direction determines which way translateX travels
  const fromX = direction === 'left' ? '0%' : '-50%'
  const toX   = direction === 'left' ? '-50%' : '0%'

  useEffect(() => {
    controls.start({
      x: [fromX, toX],
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    })
  }, [controls, fromX, toX, duration])

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          x: [fromX, toX],
          transition: { duration, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
        })
      }
    >
      <motion.div
        animate={controls}
        className="flex gap-5 w-max"
        style={{ willChange: 'transform' }}
      >
        {/* Render the half-array twice for a seamless loop */}
        {[...cards, ...cards].map((card, i) => (
          <div key={i} className="w-80 flex-shrink-0">
            {card}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)
  const [ref, visible]          = useInView()

  useEffect(() => {
    api.get('/api/projects')
      .then(res => {
        const data = res.data?.data || res.data
        setProjects(Array.isArray(data) ? data : FALLBACK)
      })
      .catch(() => {
        setProjects(FALLBACK)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="relative py-24 bg-bg-elevated" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p className="section-label mb-3">04 // PROJECTS</p>
            <h2 className="section-heading">
              Selected <span className="gold-text italic">Work</span>
            </h2>
          </div>
          {error && (
            <p className="font-mono text-xs text-muted/60">
              ⚡ Showing cached data
            </p>
          )}
        </motion.div>

        {/* Marquee rows */}
        {loading ? (
          // Skeleton — two rows of placeholder cards
          <div className="flex flex-col gap-6 overflow-hidden">
            {[0, 1].map(row => (
              <div key={row} className="flex gap-5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-80 flex-shrink-0 card-dark rounded-xl p-6 h-56 animate-pulse">
                    <div className="h-3 bg-gold/10 rounded w-1/4 mb-3" />
                    <div className="h-5 bg-gold/10 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gold/10 rounded w-full mb-2" />
                    <div className="h-3 bg-gold/10 rounded w-5/6" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Split projects into two halves */}
            {(() => {
              const mid   = Math.ceil(projects.length / 2)
              const top   = projects.slice(0, mid)
              const bottom = projects.slice(mid)

              const makeCards = (half) =>
                half.map((project, i) => (
                  <ProjectCard
                    key={project._id || project.title}
                    project={project}
                    index={i}
                    visible={visible}
                  />
                ))

              return (
                <>
                  <MarqueeRow
                    cards={makeCards(top)}
                    direction="left"
                    duration={28}
                    visible={visible}
                  />
                  <MarqueeRow
                    cards={makeCards(bottom)}
                    direction="right"
                    duration={32}
                    visible={visible}
                  />
                </>
              )
            })()}
          </div>
        )}
      </div>
    </section>
  )
}
