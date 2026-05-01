import React, { useState } from 'react'
import { FileDown } from 'lucide-react'
import Section from './Section'

function readPref(key: string): boolean {
  return localStorage.getItem(key) !== 'false'
}

function writePref(key: string, value: boolean): void {
  localStorage.setItem(key, value ? 'true' : 'false')
}

interface ToggleRowProps {
  label: string
  description: string
  value: boolean
  onChange: (v: boolean) => void
}

function ToggleRow({ label, description, value, onChange }: ToggleRowProps): React.ReactElement {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{description}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          flexShrink: 0,
          width: 40,
          height: 22,
          borderRadius: 11,
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          background: value ? 'var(--accent)' : 'var(--border-primary)',
          transition: 'background 0.2s',
          padding: 0,
        }}
        aria-pressed={value}
        aria-label={label}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: value ? 21 : 3,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left 0.2s',
            display: 'block',
          }}
        />
      </button>
    </div>
  )
}

export default function ExportSettingsTab(): React.ReactElement {
  const [includeMaps, setIncludeMaps] = useState(() => readPref('pdf_include_maps'))
  const [coloredRoutes, setColoredRoutes] = useState(() => readPref('pdf_colored_routes'))
  const [showTimeBadges, setShowTimeBadges] = useState(() => readPref('pdf_show_time_badges'))

  function toggle(key: string, setter: (v: boolean) => void) {
    return (v: boolean) => {
      writePref(key, v)
      setter(v)
    }
  }

  return (
    <Section title="PDF Export" icon={FileDown}>
      <ToggleRow
        label="Include daily maps"
        description="Show a map for each day with the planned stops and routes."
        value={includeMaps}
        onChange={toggle('pdf_include_maps', setIncludeMaps)}
      />
      <ToggleRow
        label="Color-coded routes"
        description="Give each route segment between stops its own color, with a legend below the map."
        value={coloredRoutes}
        onChange={toggle('pdf_colored_routes', setColoredRoutes)}
      />
      <ToggleRow
        label="Show travel time estimates"
        description="Display estimated walking and driving times on the route segments."
        value={showTimeBadges}
        onChange={toggle('pdf_show_time_badges', setShowTimeBadges)}
      />
    </Section>
  )
}
