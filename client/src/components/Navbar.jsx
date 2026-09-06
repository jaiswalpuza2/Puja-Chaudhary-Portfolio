import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'
import { scrollToSection } from '../utils/scroll'
import ThemePicker from './ThemePicker'

const NAV_LINKS = [
  { label: 'About',       href: '#about'       },
  { label: 'Projects',    href: '#projects'     },
  { label: 'Skills',      href: '#skills'       },
  { label: 'Experience',  href: '#experience'   },
  { label: 'Contact',     href: '#contact'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    scrollToSection(href)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-md border-b border-gold/10 shadow-gold-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="font-mono text-sm text-gold tracking-widest hover:text-amber transition-colors"
          aria-label="Go to top"
        >
          PC
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className="font-mono text-xs tracking-widest text-muted uppercase
                           hover:text-amber transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold
                                 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* Hire CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemePicker />
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="btn-primary text-xs py-2 px-4"
              data-cursor
              data-cursor-text="Say hi"
            >
              Hire Me
            </a>
          </Magnetic>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-11 h-11 flex items-center justify-center group"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-1.5">
          <span className={`block h-px w-6 bg-gold transition-all duration-300
            ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-gold transition-all duration-300
            ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-gold transition-all duration-300
            ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg-primary/95 backdrop-blur-md border-b border-gold/10"
          >
            <ul className="section-container py-4 flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="font-mono text-sm tracking-widest text-muted uppercase
                               hover:text-amber transition-colors w-full text-left py-3 min-h-[44px]"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <div className="flex items-center gap-3 py-2">
                  <span className="font-mono text-xs text-muted tracking-widest uppercase">Theme</span>
                  <ThemePicker />
                </div>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="btn-primary text-xs py-3 px-4 w-full justify-center min-h-[44px]"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
