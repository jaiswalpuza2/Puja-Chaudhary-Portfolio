import React from 'react'
import { PRESETS, useTheme } from '../context/ThemeContext'

export default function ThemePicker() {
  const { activeId, setActiveId } = useTheme()

  return (
    <div className="flex items-center gap-1.5" aria-label="Color theme">
      {PRESETS.map(preset => {
        const isActive = preset.id === activeId
        // Build an inline swatch color from the preset's gold RGB triple
        const [r, g, b] = preset.gold.split(' ')
        const swatchColor = `rgb(${r}, ${g}, ${b})`

        return (
          <button
            key={preset.id}
            onClick={() => setActiveId(preset.id)}
            aria-label={`${preset.label} theme`}
            aria-pressed={isActive}
            title={preset.label}
            className={`w-4 h-4 rounded-full transition-all duration-200 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white/50
              ${isActive
                ? 'scale-125 ring-2 ring-white/60 ring-offset-1 ring-offset-bg-primary'
                : 'opacity-60 hover:opacity-90 hover:scale-110'
              }`}
            style={{ backgroundColor: swatchColor }}
          />
        )
      })}
    </div>
  )
}
