/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':  '#0a0e17',
        'bg-card':     '#0f1420',
        'bg-elevated': '#131929',
        'gold':        'rgb(var(--color-gold) / <alpha-value>)',
        'amber':       'rgb(var(--color-amber) / <alpha-value>)',
        'body':        '#e8e8e8',
        'muted':       '#8b95a7',
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, rgb(var(--color-gold)) 0%, rgb(var(--color-amber)) 100%)',
        'hero-overlay':  'linear-gradient(to right, rgba(10,14,23,0.90) 40%, rgba(10,14,23,0.20) 100%)',
      },
      boxShadow: {
        'gold-sm':   '0 0 0 1px rgb(var(--color-gold) / 0.3)',
        'gold-md':   '0 0 16px rgb(var(--color-gold) / 0.15)',
        'gold-glow': '0 0 32px rgb(var(--color-gold) / 0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
