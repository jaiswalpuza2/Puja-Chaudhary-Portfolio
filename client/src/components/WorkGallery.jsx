import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import Tilt from './Tilt'

import motorola  from '../assets/galary/MotorolaEdge60-Thumbnail.png'
import qyrus     from '../assets/galary/Qyrus-Thumbnail.png'
import beai      from '../assets/galary/Beai-Thumbnail.png'
import larisa    from '../assets/galary/LarisaReca-thumbnail.png'
import jobsphere from '../assets/galary/Jobsphere-Thumbnail.png'
import sasto     from '../assets/galary/Sastosaman-Thumbnail.png'
import veda      from '../assets/galary/VedaSalon-Thumbnail.png'
import portfolio from '../assets/galary/Portfolio-Thumbnail.png'
import journal   from '../assets/galary/JournalApp-Thumbnail.png'

const PROJECTS = [
  { title: 'Motorola Edge 60', image: motorola  },
  { title: 'Qyrus',            image: qyrus     },
  { title: 'Beai',             image: beai      },
  { title: 'Larisa Reca',      image: larisa    },
  { title: 'Jobsphere',        image: jobsphere },
  { title: 'Sastosaman',       image: sasto     },
  { title: 'Veda Salon',       image: veda      },
  { title: 'Portfolio',        image: portfolio },
  { title: 'Journal App',      image: journal   },
]

// ── Per-offset coverflow transform values ─────────────────────────────────────
// d = index - active  (negative = left side, positive = right side)
function getCardStyle(d) {
  const abs    = Math.abs(d)
  const sign   = Math.sign(d) || 1

  if (abs === 0) {
    return {
      translateX: '0px',
      translateZ: 0,
      rotateY:    0,
      scale:      1,
      opacity:    1,
      zIndex:     10,
      pointerEvents: 'auto',
    }
  }
  if (abs === 1) {
    return {
      translateX: `${sign * 54}%`,
      translateZ: -80,
      rotateY:    sign * -28,
      scale:      0.82,
      opacity:    0.72,
      zIndex:     8,
      pointerEvents: 'auto',
    }
  }
  if (abs === 2) {
    return {
      translateX: `${sign * 90}%`,
      translateZ: -160,
      rotateY:    sign * -44,
      scale:      0.64,
      opacity:    0.38,
      zIndex:     6,
      pointerEvents: 'auto',
    }
  }
  // abs >= 3 — hidden
  return {
    translateX: `${sign * 110}%`,
    translateZ: -220,
    rotateY:    sign * -55,
    scale:      0.5,
    opacity:    0,
    zIndex:     2,
    pointerEvents: 'none',
  }
}

export default function WorkGallery() {
  const [ref, visible]    = useInView()
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  const openLightbox  = (idx) => setLightbox(idx)
  const closeLightbox = ()    => setLightbox(null)

  const prev = () => setActive(i => Math.max(0, i - 1))
  const next = () => setActive(i => Math.min(PROJECTS.length - 1, i + 1))

  // Escape key closes lightbox
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // ── Drag / swipe ───────────────────────────────────────────────────────────
  const dragStartX = useRef(null)

  function onPointerDown(e) {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX
  }
  function onPointerUp(e) {
    if (dragStartX.current === null) return
    const endX  = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current
    const delta = endX - dragStartX.current
    if (delta < -40)       next()
    else if (delta > 40)   prev()
    dragStartX.current = null
  }

  return (
    <section id="gallery" className="relative py-24 bg-bg-elevated overflow-hidden" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">05 // GALLERY</p>
          <h2 className="section-heading">
            Work <span className="gold-text italic">Gallery</span>
          </h2>
        </motion.div>

        {/* Coverflow + caption */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center gap-10"
        >
          {/* Track */}
          <div className="relative w-full flex items-center justify-center">

            {/* Left arrow */}
            <button
              onClick={prev}
              disabled={active === 0}
              aria-label="Previous project"
              className="absolute left-0 z-20 w-11 h-11 rounded-full
                         border border-gold/25 bg-bg-card/70 backdrop-blur-sm
                         flex items-center justify-center text-gold
                         hover:border-gold/60 hover:text-amber
                         disabled:opacity-20 disabled:cursor-not-allowed
                         transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Perspective stage */}
            <div
              className="relative"
              style={{
                perspective:   '1100px',
                width:         'clamp(240px, 50vw, 320px)',
                height:        'clamp(160px, 32vw, 220px)',
              }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onTouchStart={onPointerDown}
              onTouchEnd={onPointerUp}
            >
              {PROJECTS.map((project, i) => {
                const d  = i - active
                const st = getCardStyle(d)

                return (
                  <motion.div
                    key={project.title}
                    animate={{
                      x:       st.translateX,
                      z:       st.translateZ,
                      rotateY: st.rotateY,
                      scale:   st.scale,
                      opacity: st.opacity,
                    }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 rounded-xl overflow-hidden cursor-pointer select-none"
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex:         st.zIndex,
                      pointerEvents:  st.pointerEvents,
                      border: d === 0
                        ? '1.5px solid rgba(201,162,74,0.45)'
                        : '1px solid rgba(201,162,74,0.15)',
                      boxShadow: d === 0
                        ? '0 8px 32px rgba(201,162,74,0.18)'
                        : 'none',
                    }}
                    onClick={() => {
                      if (d !== 0) setActive(i)
                      else openLightbox(i)
                    }}
                    data-cursor={d === 0 ? '' : undefined}
                    data-cursor-text={d === 0 ? 'View' : undefined}
                  >
                    {d === 0 ? (
                      <Tilt tiltMax={6} className="w-full h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </Tilt>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              disabled={active === PROJECTS.length - 1}
              aria-label="Next project"
              className="absolute right-0 z-20 w-11 h-11 rounded-full
                         border border-gold/25 bg-bg-card/70 backdrop-blur-sm
                         flex items-center justify-center text-gold
                         hover:border-gold/60 hover:text-amber
                         disabled:opacity-20 disabled:cursor-not-allowed
                         transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Caption + CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="font-bold text-body text-lg text-center">
                {PROJECTS[active].title}
              </p>
              <button
                onClick={() => openLightbox(active)}
                className="btn-outline text-xs py-2 px-5 flex items-center gap-2"
                data-cursor
                data-cursor-text="View"
              >
                View Project
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex items-center gap-1 flex-wrap justify-center" role="tablist" aria-label="Gallery navigation">
            {PROJECTS.map((p, i) => (
              <button
                key={p.title}
                role="tab"
                aria-selected={i === active}
                aria-label={p.title}
                onClick={() => setActive(i)}
                className={`p-3 rounded focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-gold/60`}
              >
                <span className={`rounded-full transition-all duration-300 block
                  ${i === active ? 'w-4 h-2 bg-gold' : 'w-2 h-2 bg-gold/25 hover:bg-gold/50'}`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: 'rgba(10,14,23,0.92)' }}
            onClick={closeLightbox}
            aria-modal="true"
            role="dialog"
            aria-label={PROJECTS[lightbox].title}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-5 right-6 w-11 h-11 flex items-center justify-center
                         text-gold hover:text-amber text-2xl font-light
                         transition-colors duration-200 focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-gold/60 rounded"
            >
              ×
            </button>

            {/* Image + caption */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4 px-4"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={PROJECTS[lightbox].image}
                alt={PROJECTS[lightbox].title}
                className="rounded-xl border border-gold/30 shadow-gold-glow object-contain"
                style={{ maxWidth: '85vw', maxHeight: '80vh' }}
                draggable={false}
              />
              <p className="font-mono text-xs text-muted tracking-widest uppercase text-center">
                {PROJECTS[lightbox].title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
