import { useState, useEffect, useRef } from 'react'

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

// ─── Placeholder data ─────────────────────────────────────────────────────────

interface Project {
  id: string
  name: string
  description: string
}

const PROJECTS: Record<Category, Project[]> = {
  'product-growth': Array.from({ length: 6 }, (_, i) => ({
    id: `pg-${i}`,
    name: 'PROJECT NAME',
    description: 'One line description here',
  })),
  'side-projects': Array.from({ length: 6 }, (_, i) => ({
    id: `sp-${i}`,
    name: 'PROJECT NAME',
    description: 'One line description here',
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
        border: `2px solid ${hovered ? '#00FF41' : 'rgba(0,255,65,0.4)'}`,
        boxShadow: hovered ? '0 0 12px rgba(0,255,65,0.35)' : 'none',
        background: '#111',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Thumbnail — 16:9 */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hovered ? '#2a2a2a' : '#1a1a1a',
            transition: 'background 0.15s',
          }}
        />
        {/* Scanline overlay on thumbnail */}
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
          padding: '0.75rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}
      >
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
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            color: 'rgba(240,240,240,0.6)',
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {project.description}
        </span>

        {/* VIEW button row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
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
        background: 'rgba(10,10,10,0.92)',
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
  'side-projects': 'CH_01 — SIDE PROJECTS',
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
            padding: '1.5rem',
          }}
        >
          <div className="projects-grid">
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

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  )
}
