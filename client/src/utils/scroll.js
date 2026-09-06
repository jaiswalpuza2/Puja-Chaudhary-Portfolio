/**
 * Scrolls smoothly to a section by selector (e.g. '#projects').
 * Uses the global Lenis instance (set up in SmoothScroll.jsx) when present,
 * so in-page nav links match the site's premium smooth-scroll feel.
 * Falls back to native scrollIntoView (touch devices / Lenis not mounted).
 */
export function scrollToSection(href, offset = -64) {
  const el = document.querySelector(href)
  if (!el) return

  if (typeof window !== 'undefined' && window.__lenis) {
    window.__lenis.scrollTo(el, { offset, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
