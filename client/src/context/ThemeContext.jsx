import React, { createContext, useContext, useState, useEffect } from 'react'

// ── Presets ───────────────────────────────────────────────────────────────────
export const PRESETS = [
  { id: 'gold',    label: 'Gold',    gold: '201 162 74',  amber: '232 200 116' },
  { id: 'azure',   label: 'Azure',   gold: '74 144 201',  amber: '116 200 232' },
  { id: 'emerald', label: 'Emerald', gold: '74 201 138',  amber: '116 232 184' },
  { id: 'rose',    label: 'Rose',    gold: '201 74 111',  amber: '232 116 148' },
  { id: 'red',     label: 'Red',     gold: '158 27 50',   amber: '214 69 92'  },
  { id: 'purple',  label: 'Purple',  gold: '138 74 201',  amber: '184 116 232' },
]

const STORAGE_KEY = 'pc-accent-theme'

function applyPreset(preset) {
  const root = document.documentElement
  root.style.setProperty('--color-gold',  preset.gold)
  root.style.setProperty('--color-amber', preset.amber)
}

// ── Context ───────────────────────────────────────────────────────────────────
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [activeId, setActiveId] = useState(() => {
    // Restore persisted choice, fall back to default
    const saved = localStorage.getItem(STORAGE_KEY)
    return PRESETS.find(p => p.id === saved) ? saved : 'gold'
  })

  // Apply on mount and whenever activeId changes
  useEffect(() => {
    const preset = PRESETS.find(p => p.id === activeId) ?? PRESETS[0]
    applyPreset(preset)
    localStorage.setItem(STORAGE_KEY, activeId)
  }, [activeId])

  return (
    <ThemeContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
