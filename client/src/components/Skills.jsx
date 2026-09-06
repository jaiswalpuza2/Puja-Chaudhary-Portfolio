import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import Tilt from './Tilt'

const SKILL_GROUPS = [
  {
    id: 'lang',
    label: '01 // LANGUAGES_&_FRAMEWORKS',
    heading: 'Languages & Frameworks',
    tags: [
      'JavaScript', 'Python', 'C++', 'C#',
      'React.js', 'Node.js', 'Express.js', 'Django',
      'ASP.NET', 'HTML5', 'CSS3', 'Tailwind CSS',
    ],
  },
  {
    id: 'db',
    label: '02 // DATABASES_&_PROTOCOLS',
    heading: 'Databases & Protocols',
    tags: [
      'MongoDB', 'SQL', 'Oracle DB',
      'REST APIs', 'Socket.IO', 'JWT',
    ],
  },
  {
    id: 'tools',
    label: '03 // TOOLS_&_DESIGN',
    heading: 'Tools & Design',
    tags: [
      'Git', 'GitHub', 'VS Code', 'Visual Studio',
      'Figma', 'Wireframing',
    ],
  },
]

export default function Skills() {
  const [ref, visible] = useInView()

  return (
    <section id="skills" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">06 // SKILLS</p>
          <h2 className="section-heading">
            Tech <span className="gold-text italic">Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map(({ id, label, heading, tags }, groupIdx) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIdx * 0.12 }}
              className="h-full"
            >
              <Tilt
                tiltMax={6}
                className="card-dark rounded-xl p-6 flex flex-col gap-4 h-full
                           hover:border-gold/40 hover:shadow-gold-md transition-colors duration-300"
              >
                <div>
                  <p className="font-mono text-gold/50 text-[10px] tracking-widest mb-2">
                    {label}
                  </p>
                  <h3 className="font-bold text-body text-base">{heading}</h3>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-gold/40 to-transparent" />

                {/* Tag cloud */}
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="tech-pill hover:bg-gold/20 hover:border-gold/40
                                               transition-colors duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
