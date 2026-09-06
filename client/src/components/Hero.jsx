import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroScene from './canvas/HeroScene'
import Magnetic from './Magnetic'
import { scrollToSection } from '../utils/scroll'
import { useTypewriter } from '../hooks/useTypewriter'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export default function Hero() {
  const videoRef = useRef(null)
  const scrollTo = scrollToSection

  // ── Video-sync typewriter ────────────────────────────────────────────
  // startSignal increments each time the video starts a new cycle, so
  // the typewriter restarts from scratch in sync with the footage.
  const [startSignal, setStartSignal] = useState(0)
  const prevTimeRef = useRef(null)
  const startTimerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    function triggerStart() {
      // Clear any pending 1-second delay from a previous loop
      if (startTimerRef.current) clearTimeout(startTimerRef.current)
      // Wait 1 s (she starts typing ~1 s into the footage) then kick typewriter
      startTimerRef.current = setTimeout(() => {
        setStartSignal(n => n + 1)
      }, 1000)
    }

    function onTimeUpdate() {
      const current = video.currentTime
      const prev    = prevTimeRef.current

      // Loop-back detected: currentTime jumped backwards significantly
      if (prev !== null && current < prev - 1) {
        triggerStart()
      }
      prevTimeRef.current = current
    }

    // Fire on first play (canplay fires before the first timeupdate)
    function onCanPlay() {
      if (prevTimeRef.current === null) triggerStart()
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('canplay',    onCanPlay)

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('canplay',    onCanPlay)
      if (startTimerRef.current) clearTimeout(startTimerRef.current)
    }
  }, [])

  const HEADLINE    = ['I BUILD', 'DIGITAL', 'EXPERIENCES']
  const LINE_COLORS = ['text-body', 'gold-text', 'gold-text']

  const { revealed, phase } = useTypewriter(HEADLINE, {
    speed:       60,
    eraseSpeed:  28,
    lineDelay:   110,
    pauseAfter:  1800,
    pauseEmpty:  600,
    loop:        true,
    startSignal,
  })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Video background ───────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/myvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.78) contrast(1.1) saturate(0.85)',
            objectPosition: 'center center',
          }}
        />
        {/* Dark gradient — keeps text readable on left side */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,14,23,0.75) 0%, rgba(10,14,23,0.50) 55%, rgba(10,14,23,0.15) 100%)',
          }}
        />
        {/* Bottom fade into the next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: 'linear-gradient(to bottom, transparent, #0a0e17)',
          }}
        />
      </div>

      {/* ── 3D scene layer ──────────────────────────────── */}
      <div
        className="absolute inset-y-0 right-0 w-full sm:w-3/5 lg:w-1/2 z-[5] hidden sm:block"
        aria-hidden="true"
      >
        <HeroScene />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 section-container w-full pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Terminal label */}
          <p className="section-label mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
            Available for opportunities
          </p>

          {/* Main headline — typewriter effect */}
          <style>{`
            @keyframes tw-blink {
              0%, 100% { opacity: 1; }
              50%       { opacity: 0; }
            }
            .tw-cursor {
              display: inline-block;
              animation: tw-blink 0.65s step-start infinite;
            }
            .tw-cursor-pause {
              animation: tw-blink 1.2s ease-in-out infinite;
              opacity: 0.45;
            }
          `}</style>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none mb-4
                         min-h-[108px] sm:min-h-[144px] lg:min-h-[216px]">
            {HEADLINE.map((line, i) => {
              // During typing/erasing: cursor sits on the line currently changing.
              // During pauses: cursor sits on the last line.
              let activeIndex
              if (phase === 'typing') {
                activeIndex = revealed.findIndex((r, j) => r.length < HEADLINE[j].length)
                if (activeIndex === -1) activeIndex = HEADLINE.length - 1
              } else if (phase === 'erasing') {
                // Last line that still has content (or the first line when all empty)
                let last = 0
                for (let j = 0; j < revealed.length; j++) {
                  if (revealed[j].length > 0) last = j
                }
                activeIndex = last
              } else {
                // pause-after-type or pause-after-erase
                activeIndex = HEADLINE.length - 1
              }

              const isPause    = phase === 'pause-after-type' || phase === 'pause-after-erase'
              const showCursor = i === activeIndex

              return (
                <span key={line} className={`block ${LINE_COLORS[i]}`}>
                  {revealed[i]}
                  {showCursor && (
                    <span
                      className={`tw-cursor${isPause ? ' tw-cursor-pause' : ''}`}
                      aria-hidden="true"
                    >|</span>
                  )}
                </span>
              )
            })}
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-muted text-sm sm:text-base tracking-widest uppercase mb-8">
            Full Stack Developer
          </p>

          {/* Bio teaser */}
          <p className="text-body/70 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
            Crafting responsive web applications and practical software solutions
            using modern development technologies — from pixel-perfect UIs to
            scalable backend APIs.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Magnetic>
              <button
                onClick={() => scrollTo('#projects')}
                className="btn-primary"
                data-cursor
                data-cursor-text="View"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 9l-7 7-7-7" />
                </svg>
                Explore My Work
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href="/Puja_Chaudhary_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                data-cursor
                data-cursor-text="Open"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z" />
                </svg>
                View CV
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="font-mono text-muted text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  )
}
