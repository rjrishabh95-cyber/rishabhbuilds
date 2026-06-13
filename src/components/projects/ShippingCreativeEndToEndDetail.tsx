import { useEffect } from 'react'

interface Props {
  onClose: () => void
  thumbnail?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '3',           label: 'Video Formats Produced' },
  { value: 'End to End',  label: 'Creative Ownership' },
  { value: '0',           label: 'External Creative Agencies' },
]

const PROBLEM = `Every channel being built simultaneously needed a constant supply of assets. Videos, creatives, a signup page, a website. None of it could be outsourced entirely because the product was too new and too nuanced for anyone outside the team to get it right. Everything had to be owned.`

const APPROACH_INTRO = ``

interface Feature {
  name: string
  description: string
  image?: string
  button?: { label: string; href: string }
}

const FEATURES: Feature[] = [
  {
    name: 'Demo and Feature Videos',
    description: `Started with scripting and storyboarding every video before recording anything. Screen recordings were captured using a dedicated recording tool, then edited in iMovie with zoom effects and cuts to keep the pacing tight. Voiceovers were generated using ElevenLabs and layered in with background music. Final polish happened in Canva: text overlays, transitions, visual consistency. Every video shipped end to end without an external production team.`,
    image: '/images/shipping-creative-end-to-end/demo-feature-videos.webp',
    button: {
      label: 'Watch Playlist',
      href: 'https://www.youtube.com/playlist?list=PLqsICc3ld83mwQGoXD6-Ja6JNx1_0rU4P',
    },
  },
  {
    name: 'Brand Videos',
    description: `Watched 50 to 60 brand videos from companies like Apple and other top tier brands before writing a single word. The research informed every creative decision: what effects work, what pacing feels premium, what transitions communicate the right energy. Built a full storyboard using Pinterest references, scripted the complete video with scene by scene direction, specified every effect, every sound, every on-screen element, and handed the complete blueprint to a motion graphics team to execute.`,
    image: '/images/shipping-creative-end-to-end/brand-videos.webp',
  },
  {
    name: 'Social Media Carousels',
    description: `Built a full content playbook defining the narrative structure, visual language, and story arc for every carousel format. Used Claude to ship the actual carousel content from the playbook. Measured performance every week: what formats got engagement, what topics resonated, what fell flat. Boosted what worked, iterated on what did not, and fed the learnings back into the next cycle.`,
    image: '/images/shipping-creative-end-to-end/carousels.webp',
  },
  {
    name: 'Ad Creatives',
    description: `The creative strategy for paid ads was built around three themes developed from research into what resonates with traders. Every theme had its own visual direction, messaging, and creative treatment. Designed and shipped all creatives independently for both Google and Meta campaigns.`,
    image: '/images/growth-from-zero/google-ads.webp',
  },
  {
    name: 'Website and Signup Page',
    description: `Owned all copy and visual direction on the Draconic website throughout. Every element on the site, from headline to microcopy, was written and maintained in house. The signup page was a separate project: built completely from scratch using Claude Code, with every design decision, layout choice, and line of copy owned end to end.`,
    image: '/images/shipping-creative-end-to-end/website-signup-page.webp',
    button: {
      label: 'View Signup Page',
      href: 'https://draconicsignuppage.vercel.app',
    },
  },
  {
    name: 'Interactive Prototypes',
    description: `Every product feature was prototyped before it went to design. Not flat wireframes but fully interactive prototypes showing every interaction state, every edge case, every flow. The prototypes were the communication layer between idea and execution: design used them to understand how something should feel, frontend used them alongside documentation to understand what needed to be built. They compressed weeks of back and forth into days.`,
    image: '/images/shipping-creative-end-to-end/prototypes.webp',
  },
]

const RESULT = `Every asset that went out carried the same level of intentionality: scripted, storyboarded, measured, and iterated. The creative output was not a side function. It was the engine that made every other channel work.`

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExternalButton({ label, href }: { label: string; href: string }) {
  const isExternal = href !== '#'
  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      style={{
        display: 'inline-block',
        marginTop: '1.25rem',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '12px',
        color: '#00FF41',
        background: '#0A0A0A',
        border: '1px solid #00FF41',
        borderRadius: 0,
        padding: '12px 24px',
        textDecoration: 'none',
        lineHeight: 1,
        cursor: 'pointer',
      }}
    >
      {label}
    </a>
  )
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2
      style={{
        fontFamily: '"EB Garamond", serif',
        fontSize: '32px',
        fontWeight: 400,
        color: '#F0F0F0',
        lineHeight: 1.3,
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </h2>
  )
}

function Prose({ text }: { text: string }) {
  const paras = text.split('\n\n')
  return (
    <>
      {paras.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: '"Hanken Grotesk", sans-serif',
            fontSize: '16px',
            color: 'rgba(240,240,240,0.85)',
            lineHeight: 1.8,
            marginBottom: i < paras.length - 1 ? '1.25rem' : 0,
          }}
        >
          {para}
        </p>
      ))}
    </>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ShippingCreativeEndToEndDetail({ onClose, thumbnail }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          height: '48px',
          borderBottom: '1px solid #1A1A1A',
          background: '#0A0A0A',
          zIndex: 5,
        }}
      >
        <button
          onClick={onClose}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            color: '#00FF41',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
          }}
        >
          ← BACK TO PROJECTS
        </button>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '10px',
            color: 'rgba(0,255,65,0.5)',
            lineHeight: 1,
          }}
        >
          Draconic AI · Creative
        </span>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Hero image */}
          {thumbnail && (
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', marginBottom: '3rem' }}>
              <img
                src={thumbnail}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 6px)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontFamily: '"EB Garamond", serif',
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: 400,
              color: '#F0F0F0',
              lineHeight: 1.15,
              marginBottom: '3rem',
            }}
          >
            Shipping Creative End to End
          </h1>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '3rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span
                  style={{
                    fontFamily: '"EB Garamond", serif',
                    fontSize: 'clamp(28px, 3.5vw, 48px)',
                    fontWeight: 400,
                    color: '#00FF41',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '11px',
                    color: 'rgba(240,240,240,0.6)',
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', background: '#2A2A2A', marginBottom: '4rem' }} />

          {/* The Problem */}
          <section style={{ marginBottom: '4rem' }}>
            <SectionHeading>The Problem</SectionHeading>
            <Prose text={PROBLEM} />
          </section>

          {/* The Approach */}
          <section style={{ marginBottom: '4rem' }}>
            <SectionHeading>The Approach</SectionHeading>
            {APPROACH_INTRO && (
              <div style={{ marginBottom: '3rem' }}>
                <Prose text={APPROACH_INTRO} />
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {FEATURES.map((feature) => (
                <div key={feature.name}>
                  <h3
                    style={{
                      fontFamily: '"EB Garamond", serif',
                      fontSize: '24px',
                      fontWeight: 400,
                      color: '#F0F0F0',
                      lineHeight: 1.3,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {feature.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Hanken Grotesk", sans-serif',
                      fontSize: '16px',
                      color: 'rgba(240,240,240,0.85)',
                      lineHeight: 1.8,
                    }}
                  >
                    {feature.description}
                  </p>
                  {feature.image && (
                    <img
                      src={feature.image}
                      alt={feature.name}
                      style={{
                        display: 'block',
                        width: '100%',
                        maxWidth: '800px',
                        height: 'auto',
                        margin: '1.5rem auto 0',
                      }}
                    />
                  )}
                  {feature.button && (
                    <ExternalButton label={feature.button.label} href={feature.button.href} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* The Result */}
          <section>
            <SectionHeading>The Result</SectionHeading>
            <Prose text={RESULT} />
          </section>

        </div>
        </div>
      </div>

      {/* Scanline overlay */}
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
    </div>
  )
}
