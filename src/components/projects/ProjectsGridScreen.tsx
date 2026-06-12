import { useState, useEffect, useRef } from 'react'
import ActivationProblemDetail from './ActivationProblemDetail'
import GrowthFromZeroDetail from './GrowthFromZeroDetail'

type Category = 'product-growth' | 'side-projects'

interface Props {
  category: Category
  onBack: () => void
}

// ─── Starfield (less dense than category screen) ──────────────────────────────

interface Star {
  x: number
  y: number
  size: 1 | 2
  phase: number
  speed: number
}

function makeStars(): Star[] {
  return Array.from({ length: 40 }, () => ({
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

// ─── Project data ─────────────────────────────────────────────────────────────

interface Project {
  id: string
  name: string
  metric: string
  thumbnail?: string
}

const PROJECTS: Record<Category, Project[]> = {
  'product-growth': [
    { id: 'pg-0', name: 'ACTIVATION PROBLEM',                metric: '22% → 38% retention', thumbnail: '/images/activation-problem/thumbnail.webp' },
    { id: 'pg-1', name: 'GROWTH FROM ZERO',                  metric: '0 → 20,000 users',                    thumbnail: '/images/activation-problem/thumb2.webp' },
    { id: 'pg-2', name: 'MAKING TRADERS UNDERSTAND AI',      metric: '500 user interviews',                   thumbnail: '/images/activation-problem/thumb3.webp' },
    { id: 'pg-3', name: 'SHIPPING CREATIVE END TO END',      metric: 'Videos, ads, brand — all owned',        thumbnail: '/images/activation-problem/thumb4.webp' },
    { id: 'pg-4', name: 'AUTOMATING THE GROWTH STACK',       metric: 'Email, Telegram, CRM — built in-house', thumbnail: '/images/activation-problem/thumb5.webp' },
    { id: 'pg-5', name: 'BUILDING CREDIT FOR THE INVISIBLE', metric: '18% → 42% conversion',                  thumbnail: '/images/activation-problem/thumb6.webp' },
    { id: 'pg-6', name: 'CLOSING THE FUNDING GAP',           metric: '2 NBFC partnerships closed',            thumbnail: '/images/activation-problem/thumb7.webp' },
  ],
  'side-projects': Array.from({ length: 6 }, (_, i) => ({
    id: `sp-${i}`,
    name: 'PROJECT NAME',
    metric: 'One line metric here',
  })),
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onView,
}: {
  project: Project
  onView: (p: Project) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onView(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onView(project) }}
      style={{
        background: '#0A0A0A',
        border: `2px solid ${hovered ? '#00FF41' : 'rgba(0,255,65,0.3)'}`,
        boxShadow: hovered ? '0 0 18px rgba(0,255,65,0.4)' : 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Thumbnail — 16:9 */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: hovered ? 1 : 0.85,
              transition: 'opacity 0.15s',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: hovered ? '#242424' : '#1A1A1A',
              transition: 'background 0.15s',
            }}
          />
        )}
        {/* Scanline overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 6px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Card body */}
      <div
        style={{
          padding: '0.85rem 0.85rem 0.75rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
        }}
      >
        {/* Project name */}
        <span
          style={{
            fontFamily: '"Press Start 2P", sans-serif',
            fontSize: '11px',
            color: '#F0F0F0',
            lineHeight: 1.6,
          }}
        >
          {project.name}
        </span>

        {/* Metric hook */}
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '10px',
            color: 'rgba(240,240,240,0.5)',
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {project.metric}
        </span>

        {/* VIEW button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.6rem' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onView(project) }}
            style={{
              fontFamily: '"Press Start 2P", sans-serif',
              fontSize: '9px',
              color: '#00FF41',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
            }}
          >
            ▶ VIEW
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(10,10,10,0.96)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
      >
        <span
          style={{
            fontFamily: '"Press Start 2P", sans-serif',
            fontSize: 'clamp(14px, 2.5vw, 24px)',
            color: '#F0F0F0',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          {project.name}
        </span>
        <button
          onClick={onClose}
          style={{
            fontFamily: '"Press Start 2P", sans-serif',
            fontSize: '10px',
            color: '#00FF41',
            background: 'none',
            border: '2px solid rgba(0,255,65,0.4)',
            cursor: 'pointer',
            padding: '0.6rem 1.2rem',
            lineHeight: 1,
          }}
        >
          ✕ CLOSE
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const CHANNEL_LABEL: Record<Category, string> = {
  'product-growth': 'CH_01 — PRODUCT & GROWTH',
  'side-projects': 'CH_02 — SIDE PROJECTS',
}

export default function ProjectsGridScreen({ category, onBack }: Props) {
  const [time, setTime] = useState(() => new Date())
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeString = time.toLocaleTimeString('en-US', { hour12: false })
  const projects = PROJECTS[category]

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0A0A0A', overflow: 'hidden' }}>

      {/* Layer 1 — starfield */}
      <StarfieldCanvas />

      {/* Layer 5 — content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top bar */}
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
                {CHANNEL_LABEL[category]}
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

        {/* Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem 1.5rem',
          }}
        >
          <div className="projects-grid" style={{ gap: '1.75rem' }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onView={setActiveProject} />
            ))}
          </div>
        </div>
      </div>

      {/* Layer 10 — scanlines */}
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

      {/* Detail pages */}
      {activeProject?.id === 'pg-0' && (
        <ActivationProblemDetail onClose={() => setActiveProject(null)} thumbnail={activeProject.thumbnail} />
      )}
      {activeProject?.id === 'pg-1' && (
        <GrowthFromZeroDetail onClose={() => setActiveProject(null)} thumbnail={activeProject.thumbnail} />
      )}

      {/* Generic modal for cards without a detail page yet */}
      {activeProject && !['pg-0', 'pg-1'].includes(activeProject.id) && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  )
}
