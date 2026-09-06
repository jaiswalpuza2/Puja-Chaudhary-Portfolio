import React, { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import Tilt from './Tilt'

const CERTS = [
  {
    title: 'AWS Academy Graduate',
    subtitle: 'Cloud Foundations',
    date: 'Dec 2024',
    issuer: 'Amazon Web Services',
  },
  {
    title: 'AWS Academy Graduate',
    subtitle: 'Data Engineering',
    date: 'Dec 2024',
    issuer: 'Amazon Web Services',
  },
  {
    title: 'AWS Academy Graduate',
    subtitle: 'Machine Learning Foundations',
    date: 'Dec 2024',
    issuer: 'Amazon Web Services',
  },
  {
    title: 'AWS Academy Graduate',
    subtitle: 'ML for Natural Language Processing',
    date: 'Dec 2024',
    issuer: 'Amazon Web Services',
  },
]

function AWSBadge() {
  return (
    <div className="w-10 h-10 rounded-lg bg-amber/10 border border-amber/30
                    flex items-center justify-center flex-shrink-0">
      {/* Minimal AWS-style mark */}
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber" fill="currentColor" aria-hidden="true">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576a.346.346 0 0 1
                 .056.176c0 .08-.048.16-.152.24l-.504.336a.38.38 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.49
                 2.49 0 0 1-.288-.376 6.33 6.33 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672
                 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416
                 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376
                 -1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104a6.384 6.384 0 0 0-.864.272
                 6.41 6.41 0 0 1-.24.088.416.416 0 0 1-.112.016c-.096 0-.144-.072-.144-.224v-.352c0-.12.016
                 -.208.056-.264a.59.59 0 0 1 .224-.16 5.544 5.544 0 0 1 .96-.344 4.624 4.624 0 0 1
                 1.192-.144c.912 0 1.576.208 2 .624.416.416.624 1.048.624 1.896v2.496zm-3.248.896c.264
                 0 .536-.048.824-.144.288-.096.544-.272.76-.512a1.23 1.23 0 0 0 .288-.56c.048-.208.08
                 -.456.08-.744v-.36a6.8 6.8 0 0 0-.736-.136 6.027 6.027 0 0 0-.752-.048c-.536 0-.928.104
                 -1.192.32-.264.216-.392.52-.392.92 0 .376.096.656.296.848.192.2.472.296.824.296zm6.44.888c
                 -.136 0-.224-.024-.28-.08-.056-.048-.104-.16-.144-.312L8.1 7.208a1.415 1.415 0 0
                 1-.072-.32c0-.128.064-.2.192-.2h.784c.144 0 .24.024.288.08.056.048.096.16.136.312l1.176
                 4.64 1.088-4.64c.032-.16.072-.264.128-.312.056-.048.16-.08.296-.08h.64c.144 0 .24.024.296
                 .08.056.048.104.16.128.312l1.104 4.704 1.216-4.704c.04-.16.088-.264.136-.312.056-.048.152
                 -.08.288-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128-.008.048-.024.112-.056.2l-1.696
                 5.32c-.04.16-.08.264-.136.312-.056.048-.152.08-.28.08h-.688c-.144 0-.24-.024-.296-.08-.056
                 -.056-.104-.16-.128-.32l-1.08-4.496-1.072 4.488c-.032.16-.072.264-.128.32-.056.056-.16.08
                 -.296.08h-.688zm9.016.192a4.7 4.7 0 0 1-1.096-.128 3.263 3.263 0 0 1-.816-.296.504.504 0
                 0 1-.216-.192.484.484 0 0 1-.04-.2v-.368c0-.152.056-.224.16-.224.04 0 .08.008.12.024.04.016
                 .1.04.168.072.224.096.464.176.72.224.264.048.52.072.784.072.416 0 .736-.072.96-.216a.705.705
                 0 0 0 .336-.632.637.637 0 0 0-.176-.456c-.12-.12-.344-.232-.672-.336l-.96-.296c-.488-.152
                 -.848-.376-1.072-.672a1.578 1.578 0 0 1-.336-.976c0-.28.064-.528.184-.744a1.72 1.72 0 0 1
                 .504-.56c.216-.152.456-.272.744-.352.288-.08.592-.12.912-.12.16 0 .328.008.488.032.168.024
                 .32.056.464.096.136.04.264.088.384.136.12.048.216.096.288.144a.595.595 0 0 1 .2.168.378.378
                 0 0 1 .056.216v.336c0 .152-.056.232-.16.232-.056 0-.144-.032-.256-.096a3.088 3.088 0 0
                 0-1.312-.272c-.376 0-.672.064-.872.192-.2.128-.304.32-.304.584 0 .184.064.336.2.456.136.12
                 .384.24.736.352l.944.296c.48.152.832.368 1.048.648.216.28.32.6.32.952 0 .288-.056.544-.168
                 .768a1.8 1.8 0 0 1-.472.592 2.088 2.088 0 0 1-.736.376 3.12 3.12 0 0 1-.952.136z"/>
      </svg>
    </div>
  )
}

// ── Infinite-scroll marquee row (left-scrolling) ─────────────────────────────
function CertMarquee({ cards }) {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: { duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
    })
  }, [controls])

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          x: ['0%', '-50%'],
          transition: { duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
        })
      }
    >
      <motion.div
        animate={controls}
        className="flex gap-5 w-max"
        style={{ willChange: 'transform' }}
      >
        {/* Duplicate the array for a seamless loop */}
        {[...cards, ...cards].map((card, i) => (
          <div key={i} className="w-72 flex-shrink-0">
            {card}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Certifications() {
  const [ref, visible] = useInView()

  return (
    <section
      id="certifications"
      className="relative py-24 bg-bg-elevated overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">07 // CERTIFICATIONS</p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-3">
            <h2 className="section-heading">
              AWS <span className="gold-text italic">Credentials</span>
            </h2>
            <a
              href="https://www.credly.com/users/puja-chaudhary"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              data-cursor-text="Credly"
              className="font-mono text-xs text-gold hover:text-amber transition-colors duration-200
                         inline-flex items-center gap-1"
            >
              View on Credly
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4
                     M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </motion.div>

        <CertMarquee
          cards={CERTS.map(({ title, subtitle, date, issuer }, i) => (
            <motion.div
              key={subtitle}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <Tilt
                tiltMax={8}
                className="card-dark rounded-xl p-5 flex flex-col gap-3 h-full
                           hover:border-gold/50 hover:shadow-gold-md transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <AWSBadge />
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">
                      {issuer}
                    </p>
                    <p className="text-body/70 text-xs font-medium leading-snug">{title}</p>
                  </div>
                </div>

                <div className="h-px bg-gold/10" />

                <div>
                  <p className="font-semibold text-amber text-sm leading-snug">{subtitle}</p>
                  <p className="font-mono text-muted text-xs mt-1">{date}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        />
      </div>
    </section>
  )
}
