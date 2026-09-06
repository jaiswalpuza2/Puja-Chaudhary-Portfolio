import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import api from '../utils/api'
import Tilt from './Tilt'
import Magnetic from './Magnetic'
import instagramQr from '../assets/instagram-qr.png'
import linkedinQr  from '../assets/linkedin-qr.jpeg'

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'jaiswalpuza@gmail.com',
    href:  'mailto:jaiswalpuza@gmail.com',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+977 9829370363',
    href:  'tel:+9779829370363',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Itahari, Nepal',
    href:  null,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'jaiswalpuza2',
    href:  'https://github.com/jaiswalpuza2',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                 -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                 .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                 -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004
                 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7
                 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338
                 -.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Puja Chaudhary',
    href:  'https://www.linkedin.com/in/puja-chaudhary-638106430',
    qrImage: linkedinQr,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
                 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
                 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
                 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782
                 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0
                 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@puja_chaudhary49',
    href:  'https://instagram.com/puja_chaudhary49',
    qrImage: instagramQr,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069
                 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058
                 -1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265
                 -.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057
                 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98
                 -.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98
                 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98
                 .059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98
                 -1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324z
                 M12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
]

const INITIAL = { name: '', email: '', message: '' }

export default function Contact() {
  const [ref, visible] = useInView()
  const [form, setForm]   = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [qrOpen, setQrOpen] = useState(null) // label of the open QR card, or null
  const qrRefs = useRef({}) // { [label]: domNode } for QR-capable cards

  // Close QR popover when clicking outside the open card
  useEffect(() => {
    if (!qrOpen) return
    function handleClickOutside(e) {
      const node = qrRefs.current[qrOpen]
      if (node && !node.contains(e.target)) {
        setQrOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [qrOpen])

  const validate = () => {
    const e = {}
    if (!form.name.trim())          e.name    = 'Name is required'
    if (!form.email.trim())         e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim())       e.message = 'Message is required'
    else if (form.message.trim().length < 10)  e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(ev => ({ ...ev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    try {
      await api.post('/api/contact', form)
      setStatus('success')
      setForm(INITIAL)
    } catch (err) {
      const serverErrors = err.response?.data?.errors
      if (serverErrors) {
        const mapped = {}
        serverErrors.forEach(({ field, message }) => { mapped[field] = message })
        setErrors(mapped)
        setStatus('idle')
      } else {
        setStatus('error')
      }
    }
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden" ref={ref}>
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
          <p className="section-label mb-3">11 // CONTACT</p>
          <h2 className="section-heading">
            <span className="gold-text italic">INITIALIZE</span>{' '}
            <span className="text-body">CONNECTION</span>
          </h2>
          <p className="text-muted mt-4 max-w-lg">
            Have a project in mind or want to collaborate? Drop a message and I'll get back to you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="card-dark rounded-xl p-8 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30
                                flex items-center justify-center">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-body text-lg">Message Sent!</h3>
                <p className="text-muted text-sm">Thanks for reaching out. I'll respond within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline text-xs py-2 px-4 mt-2"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-label="Contact form">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Puja Chaudhary"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-err' : undefined}
                    className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-body text-sm
                                placeholder:text-muted/40 outline-none transition-all duration-200
                                focus:border-gold focus:shadow-gold-sm
                                ${errors.name ? 'border-red-500/60' : 'border-gold/15'}`}
                  />
                  {errors.name && (
                    <p id="name-err" className="font-mono text-red-400 text-xs mt-1.5" role="alert">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-err' : undefined}
                    className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-body text-sm
                                placeholder:text-muted/40 outline-none transition-all duration-200
                                focus:border-gold focus:shadow-gold-sm
                                ${errors.email ? 'border-red-500/60' : 'border-gold/15'}`}
                  />
                  {errors.email && (
                    <p id="email-err" className="font-mono text-red-400 text-xs mt-1.5" role="alert">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'msg-err' : undefined}
                    className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-body text-sm
                                placeholder:text-muted/40 outline-none transition-all duration-200
                                focus:border-gold focus:shadow-gold-sm resize-none
                                ${errors.message ? 'border-red-500/60' : 'border-gold/15'}`}
                  />
                  {errors.message && (
                    <p id="msg-err" className="font-mono text-red-400 text-xs mt-1.5" role="alert">{errors.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="font-mono text-red-400 text-xs" role="alert">
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

                <Magnetic strength={0.15} className="w-full">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    data-cursor
                    data-cursor-text="Send"
                    className="btn-primary justify-center w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </Magnetic>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">
              Get in touch
            </p>

            {CONTACT_INFO.map(({ label, value, href, icon, qrImage }) => (
              <div
                key={label}
                className="relative"
                ref={qrImage ? (node) => { qrRefs.current[label] = node } : undefined}
              >
                <Tilt
                  tiltMax={5}
                  className="card-dark rounded-xl p-4 flex items-center gap-4
                             hover:border-gold/40 transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20
                                  flex items-center justify-center text-gold flex-shrink-0
                                  group-hover:bg-gold/20 transition-colors duration-200">
                    {icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-muted text-[10px] tracking-widest uppercase">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        data-cursor
                        data-cursor-text={label}
                        className="text-body text-sm hover:text-amber transition-colors truncate block"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-body text-sm truncate">{value}</p>
                    )}
                  </div>
                  {/* QR toggle button — only rendered for entries that supply a qrImage */}
                  {qrImage && (
                    <button
                      type="button"
                      onClick={() => setQrOpen(o => o === label ? null : label)}
                      aria-expanded={qrOpen === label}
                      aria-label={`Show ${label} QR code`}
                      className="w-11 h-11 rounded-md border border-gold/20 bg-gold/5
                                 flex items-center justify-center text-muted flex-shrink-0
                                 hover:border-gold/50 hover:text-gold hover:bg-gold/15
                                 transition-colors duration-200"
                    >
                      {/* Small QR grid glyph */}
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <rect x="1" y="1" width="5" height="5" rx="0.5"/>
                        <rect x="3" y="3" width="1" height="1" fill="var(--color-bg-card, #0f1117)"/>
                        <rect x="10" y="1" width="5" height="5" rx="0.5"/>
                        <rect x="12" y="3" width="1" height="1" fill="var(--color-bg-card, #0f1117)"/>
                        <rect x="1" y="10" width="5" height="5" rx="0.5"/>
                        <rect x="3" y="12" width="1" height="1" fill="var(--color-bg-card, #0f1117)"/>
                        <rect x="10" y="10" width="2" height="2" rx="0.25"/>
                        <rect x="13" y="10" width="2" height="2" rx="0.25"/>
                        <rect x="10" y="13" width="2" height="2" rx="0.25"/>
                        <rect x="13" y="13" width="2" height="2" rx="0.25"/>
                      </svg>
                    </button>
                  )}
                </Tilt>

                {/* QR popover — absolutely positioned above the card */}
                {qrImage && qrOpen === label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    role="tooltip"
                    aria-label={`${label} QR code`}
                    className="absolute bottom-full right-0 mb-2 z-50
                               card-dark rounded-xl border border-gold/20
                               p-3 shadow-gold-glow w-44"
                  >
                    <p className="font-mono text-[9px] text-muted tracking-widest uppercase text-center mb-2">
                      Scan to follow
                    </p>
                    <img
                      src={qrImage}
                      alt={`${label} QR code for ${value}`}
                      className="w-full rounded-lg border border-gold/10"
                    />
                    <p className="font-mono text-[9px] text-gold/70 tracking-wide text-center mt-2">
                      {value}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
