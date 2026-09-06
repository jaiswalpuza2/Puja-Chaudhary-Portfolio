import React from 'react'

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10 bg-bg-elevated py-12 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="section-container flex flex-col items-center gap-8">

        {/* Map — Find Me */}
        <div className="w-full max-w-md flex flex-col gap-3 items-center">
          <div className="text-center">
            <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase">
              Find Me
            </p>
          </div>
          <div className="w-full rounded-xl overflow-hidden border border-gold/20">
            <iframe
              src="https://www.google.com/maps?q=Itahari,+Nepal&output=embed"
              width="100%"
              height="340"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location - Itahari, Nepal"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gold/30" aria-hidden="true" />

        {/* Copyright */}
        <p className="font-mono text-muted text-xs text-center">
          © {new Date().getFullYear()}{' '}
          <span className="text-gold">Puja Chaudhary</span>
          {' '}— Built with React · Tailwind CSS · Framer Motion
        </p>
      </div>
    </footer>
  )
}
