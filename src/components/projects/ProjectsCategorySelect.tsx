import { useState, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/8bit/card'

interface CategoryDef {
  id: string
  name: string
  description: string
}

interface Props {
  onBack: () => void
  onCategorySelect: (id: string) => void
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'product-growth',
    name: '01 — PRODUCT & GROWTH',
    description: 'Professional work, campaigns, assets, case studies',
  },
  {
    id: 'side-projects',
    name: '02 — SIDE PROJECTS',
    description: 'Websites, apps, AI tools, automations',
  },
]

// ─── Pixel Starfield canvas ────────────────────────────────────────────────────

interface Star {
  x: number
  y: number
  size: 1 | 2
  phase: number
  speed: number
}

function makeStars(): Star[] {
  return Array.from({ length: 80 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: (Math.random() > 0.75 ? 2 : 1) as 1 | 2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 1.2,
  }))
}

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const starsRef = useRef<Star[]>(makeStars())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function draw(ts: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const star of starsRef.current) {
        const alpha = 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(ts * 0.001 * star.speed + star.phase))
        ctx.fillStyle = `rgba(240,240,240,${alpha.toFixed(3)})`
        ctx.fillRect(
          (star.x * canvas.width) | 0,
          (star.y * canvas.height) | 0,
          star.size,
          star.size
        )
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}

// ─── Category Card ─────────────────────────────────────────────────────────────
// CSS variables on the wrapper div override 8bitcn's Tailwind utility classes:
//   border-foreground → --foreground (green accent, always)
//   bg-card           → --card       (flips on hover)
//   text-card-foreground → --card-foreground (flips on hover)
//   text-muted-foreground → --muted-foreground (description text)

function CategoryCard({
  category,
  onClick,
}: {
  category: CategoryDef
  onClick: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const [arrowOn, setArrowOn] = useState(true)

  useEffect(() => {
    if (!hovered) { setArrowOn(true); return }
    const t = setInterval(() => setArrowOn((v) => !v), 500)
    return () => clearInterval(t)
  }, [hovered])

  const themeVars: CSSProperties = {
    '--foreground': '#00FF41',
    '--color-foreground': '#00FF41',
    '--card': hovered ? '#00FF41' : '#0A0A0A',
    '--color-card': hovered ? '#00FF41' : '#0A0A0A',
    '--card-foreground': hovered ? '#0A0A0A' : '#F0F0F0',
    '--color-card-foreground': hovered ? '#0A0A0A' : '#F0F0F0',
    '--muted-foreground': hovered ? 'rgba(10,10,10,0.7)' : 'rgba(240,240,240,0.5)',
    '--color-muted-foreground': hovered ? 'rgba(10,10,10,0.7)' : 'rgba(240,240,240,0.5)',
    width: '100%',
    maxWidth: '600px',
    cursor: 'pointer',
  } as CSSProperties

  return (
    <div
      style={themeVars}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(category.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(category.id) }}
    >
      <Card>
        {/* Extra paddingLeft clears the 8bitcn pixel border so no letter is cut off */}
        <CardHeader style={{ paddingLeft: '1.5rem' }}>
          <CardTitle
            style={{
              fontFamily: '"Press Start 2P", sans-serif',
              fontSize: '14px',
              color: hovered ? '#0A0A0A' : '#F0F0F0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              lineHeight: 1.6,
            }}
          >
            {/* Fixed-width arrow — doesn't shift text on appear/disappear */}
            <span
              style={{
                display: 'inline-block',
                width: '1em',
                color: hovered ? '#0A0A0A' : '#00FF41',
                opacity: hovered && arrowOn ? 1 : 0,
                flexShrink: 0,
              }}
            >
              ▶
            </span>
            {category.name}
          </CardTitle>
          <CardDescription
            style={{
              fontFamily: '"Press Start 2P", sans-serif',
              fontSize: '9px',
              color: hovered ? 'rgba(10,10,10,0.7)' : 'rgba(240,240,240,0.5)',
              lineHeight: 1.8,
              marginTop: '0.5rem',
            }}
          >
            {category.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProjectsCategorySelect({ onBack, onCategorySelect }: Props) {
  const [time, setTime] = useState(() => new Date())
  const [cursorOn, setCursorOn] = useState(true)
  const [flashActive, setFlashActive] = useState(false)
  const flashingRef = useRef(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 600)
    return () => clearInterval(t)
  }, [])

  function handleCategoryClick(id: string) {
    if (flashingRef.current) return
    flashingRef.current = true
    setFlashActive(true)
    setTimeout(() => {
      flashingRef.current = false
      setFlashActive(false)
      onCategorySelect(id)
    }, 100)
  }

  const timeString = time.toLocaleTimeString('en-US', { hour12: false })

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0A0A0A', overflow: 'hidden' }}>

      {/* Layer 1 — pixel starfield */}
      <StarfieldCanvas />

      {/* Layer 5 — all visible content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top broadcast bar */}
        <div
          style={{
            height: '40px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            borderBottom: '1px solid #2A2A2A',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={onBack}
              style={{
                fontFamily: '"Press Start 2P", sans-serif',
                fontSize: '10px',
                textTransform: 'uppercase',
                color: '#00FF41',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
              }}
            >
              ← BACK
            </button>
            <span style={{ color: '#2A2A2A', fontFamily: '"JetBrains Mono", monospace' }}>|</span>
            <span style={{ fontFamily: '"Press Start 2P", sans-serif', fontSize: '10px', lineHeight: 1 }}>
              <span style={{ color: '#00FF41' }}>●</span>
              <span style={{ color: '#F0F0F0', marginLeft: '0.5rem' }}>
                CH_01 — PROJECTS
              </span>
            </span>
          </div>
          <span
            style={{
              fontFamily: '"Press Start 2P", sans-serif',
              fontSize: '10px',
              color: '#00FF41',
              lineHeight: 1,
            }}
          >
            {timeString}
          </span>
        </div>

        {/* Main content — vertically centered */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '0 1.5rem',
          }}
        >
          {/* PROJECTS title */}
          <h1
            style={{
              fontFamily: '"Press Start 2P", sans-serif',
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              color: '#F0F0F0',
              fontWeight: 400,
              textAlign: 'center',
              textShadow: '0 0 10px rgba(0,255,65,0.8)',
              letterSpacing: '0.05em',
              lineHeight: 1.5,
            }}
          >
            PROJECTS
          </h1>

          {/* SELECT CATEGORY prompt */}
          <div
            style={{
              fontFamily: '"Press Start 2P", sans-serif',
              fontSize: '12px',
              color: '#00FF41',
              letterSpacing: '0.05em',
              lineHeight: 1.6,
            }}
          >
            {'> SELECT CATEGORY '}
            <span style={{ opacity: cursorOn ? 1 : 0 }}>_</span>
          </div>

          {/* Category cards — centered, max 600px, stacked */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: '100%',
              maxWidth: '600px',
              alignItems: 'center',
              marginTop: '0.5rem',
            }}
          >
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} onClick={handleCategoryClick} />
            ))}
          </div>
        </div>
      </div>

      {/* Layer 10 — near-invisible scanlines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 6px)',
        }}
      />

      {/* Layer 20 — white flash on card click */}
      {flashActive && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            background: 'white',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
