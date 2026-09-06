import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Wraps the app in buttery smooth inertia scrolling.
 * Skips itself on coarse-pointer (touch) devices — native scroll
 * already feels right there, and it saves battery/perf.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    window.__lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return children
}
