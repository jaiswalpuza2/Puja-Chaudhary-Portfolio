import { useState, useEffect, useRef } from 'react'

/**
 * useTypewriter
 *
 * Types an array of strings sequentially, erases them, and repeats.
 * The cycle starts (or restarts from scratch) whenever `startSignal`
 * increments — pass a counter from the parent to sync with external events.
 *
 * @param {string[]} lines          - Array of strings to type in order.
 * @param {object}   opts
 * @param {number}   opts.speed       - Ms per character while typing (default 60).
 * @param {number}   opts.eraseSpeed  - Ms per character while erasing (default 28).
 * @param {number}   opts.lineDelay   - Extra pause between lines (default 110).
 * @param {number}   opts.pauseAfter  - Pause (ms) after fully typed before erasing (default 1800).
 * @param {number}   opts.pauseEmpty  - Pause (ms) after fully erased before retyping (default 600).
 * @param {boolean}  opts.loop        - Whether to loop forever (default true).
 * @param {number}   opts.startSignal - Increment this value to restart the cycle immediately.
 *
 * @returns {{ revealed: string[], phase: string }}
 *   revealed — currently-revealed strings, same length as `lines`.
 *   phase    — 'idle' | 'typing' | 'pause-after-type' | 'erasing' | 'pause-after-erase'
 */
export function useTypewriter(lines, {
  speed       = 60,
  eraseSpeed  = 28,
  lineDelay   = 110,
  pauseAfter  = 1800,
  pauseEmpty  = 600,
  loop        = true,
  startSignal = 0,
} = {}) {
  const [revealed, setRevealed] = useState(() => lines.map(() => ''))
  const [phase,    setPhase]    = useState('idle')
  const timeoutRef              = useRef(null)

  useEffect(() => {
    // Clear any in-flight timer from a previous cycle
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Reset display to blank at the start of every new signal
    setRevealed(lines.map(() => ''))
    setPhase('typing')

    let lineIndex = 0
    let charIndex = 0
    let cancelled = false   // guards against state updates after cleanup

    function schedule(fn, delay) {
      if (cancelled) return
      timeoutRef.current = setTimeout(fn, delay)
    }

    function startTyping() {
      if (cancelled) return
      lineIndex = 0
      charIndex = 0
      setPhase('typing')
      typeNext()
    }

    function startErasing() {
      if (cancelled) return
      lineIndex = lines.length - 1
      charIndex = lines[lineIndex].length
      setPhase('erasing')
      eraseNext()
    }

    // ── Typing ───────────────────────────────────────────────────────────
    function typeNext() {
      if (cancelled) return
      if (lineIndex >= lines.length) {
        setPhase('pause-after-type')
        if (loop) schedule(startErasing, pauseAfter)
        return
      }

      const target = lines[lineIndex]
      if (charIndex <= target.length) {
        const slice = target.slice(0, charIndex)
        setRevealed(prev => {
          const next = [...prev]
          next[lineIndex] = slice
          return next
        })
        charIndex++
        schedule(typeNext, speed)
      } else {
        lineIndex++
        charIndex = 0
        schedule(typeNext, lineDelay)
      }
    }

    // ── Erasing ──────────────────────────────────────────────────────────
    function eraseNext() {
      if (cancelled) return
      if (lineIndex < 0) {
        setPhase('pause-after-erase')
        if (loop) schedule(startTyping, pauseEmpty)
        return
      }

      if (charIndex >= 0) {
        const slice = lines[lineIndex].slice(0, charIndex)
        setRevealed(prev => {
          const next = [...prev]
          next[lineIndex] = slice
          return next
        })
        charIndex--
        schedule(eraseNext, eraseSpeed)
      } else {
        lineIndex--
        charIndex = lineIndex >= 0 ? lines[lineIndex].length : -1
        schedule(eraseNext, lineDelay)
      }
    }

    // Kick off
    typeNext()

    return () => {
      cancelled = true
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // Re-run whenever startSignal increments — that's the only external trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startSignal])

  return { revealed, phase }
}
