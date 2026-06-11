import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '35%',       label: 'Activation Improvement' },
  { value: '22% → 38%', label: '7-Day Retention' },
  { value: '500+',      label: 'User Interviews Conducted' },
]

const PROBLEM = `Draconic was one of the first AI co-pilots built for the full intraday trading cycle. The idea was genuinely new, a chat-based system that could sit alongside a trader through pre-trade research, live execution, and post-trade analysis. Nobody had built this before.

The problem was that traders had no mental model for it. They would open the app, see a blank chat interface, and freeze. Trading tools had always been transactional: charts, alerts, watchlists, order buttons. A conversational AI felt completely alien. Users did not know what to ask, did not understand what was possible, and left before they found out.

Activation sat at 22%. Retention was not following. The product worked. The users just could not see it yet.`

const APPROACH_INTRO = `Solving activation was not a one-time project. It was a continuous process of talking to users, identifying patterns, building solutions, measuring what changed, and going back to users again. More than 500 user interviews conducted over time shaped every decision made on this problem.

Every feature went through the same process: user research to PRD to fully interactive prototype showing every interaction state, handed to design with documentation, translated into brand language, shipped to frontend.

The work happened across two layers: inside the product and outside it through email.`

const FEATURES: { name: string; description: string; image?: string; screenshotLabel?: string }[] = [
  {
    name: 'Prompt Launcher',
    description: `The blank chat input was the single biggest drop-off point. Users had no idea where to start. Built a layered use case system living inside the text input itself: categories of trading scenarios, each breaking down into specific situations, each with ready-to-use prompts pre-filled with placeholder text. A user could go from opening the app to asking a meaningful, well-structured question in under ten seconds.`,
    image: '/images/activation-problem/prompt-launcher.webp',
  },
  {
    name: 'Gamified Onboarding Journey',
    description: `A one-shot tutorial on day one gets ignored. Built a progressive discovery system instead, a persistent companion that surfaces the right nudge at the right stage of a user's journey. The more someone used the product, the more they unlocked. Guidance that felt earned rather than forced.`,
    image: '/images/activation-problem/onboarding-journey.webp',
  },
  {
    name: 'In-product Playbook',
    description: `Built a structured documentation system covering every concept, every piece of jargon, every feature, and every real-world use case in the product. Gave users the foundation to understand what they were using without needing to ask anyone.`,
    image: '/images/activation-problem/playbook.webp',
  },
  {
    name: 'Draconic Pulse',
    description: `Users were approaching Draconic the way people approach a general LLM: blank slate, figuring out what to ask, how to phrase it, whether they were doing it right. Pulse was built to change that perception entirely. A live pulsating chip on the home screen signals that real-time data is active and the product is always on. Greetings, suggested prompts, and the action button all shift based on market hours: a pre-market scan before open, live opportunity prompts during market hours, post-market analysis after close. A one-tap introductory button shows new users exactly how to interact with Draconic and what kind of responses to expect. The goal was simple: make users feel that Draconic is alive, not waiting to be told what to do.`,
    image: '/images/activation-problem/pulse.webp',
  },
  {
    name: 'Sparks',
    description: `Came directly from a pattern spotted across user interviews. Experienced traders said trading tools do not start from a blank slate. Brokers always give you something to react to. Built Sparks as a live feed running alongside the screen, surfacing market opportunities automatically so users always have a starting point without having to ask for one.`,
    image: '/images/activation-problem/sparks.webp',
  },
  {
    name: 'Alerts Redesign',
    description: `User research kept surfacing the same frustration: the alerts flow was confusing people. Where to start, what to tap, what would happen next. Rebuilt the entire UX and UI from the ground up with clearer flows, copy that matched how traders actually talk about alerts, and an interface that removed every point of hesitation.`,
    image: '/images/activation-problem/alerts.webp',
  },
  {
    name: 'Watchlist',
    description: `Every trader has a watchlist in their broker. Built one inside Draconic that felt familiar but worked differently. Users save their instruments and can reference them directly inside any prompt using an @ tag, the same way you would mention someone in Slack. Made the product feel like it understood trading workflows instead of asking traders to abandon them.`,
    image: '/images/activation-problem/watchlist.webp',
  },
  {
    name: 'Activation Email Sequences',
    description: `The work did not stop at the product boundary. Built a full email automation system to reach users before they churned. A five-day onboarding sequence walked new users through the product gradually, one concept at a time. A separate activation email fired for anyone who signed up but never sent a query. A mid-funnel drop-off sequence targeted users who had sent a few prompts and gone quiet. Each email was written to drive a specific behaviour, not just remind someone the product existed.`,
    image: '/images/activation-problem/email.webp',
  },
]

const RESULT = `Activation improved by 35%. Seven-day retention moved from 22% to 38%. Users who previously churned in the first session started coming back daily. The blank slate problem was solved not by explaining the product better, but by rebuilding the entire experience around how traders actually think and work.`

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScreenshotPlaceholder({ label, singleLine }: { label: string; singleLine?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '1.5rem auto 0',
        position: 'relative',
        paddingTop: '56.25%',
        background: '#1A1A1A',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        {!singleLine && (
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              color: 'rgba(240,240,240,0.3)',
              letterSpacing: '0.05em',
            }}
          >
            [ SCREENSHOT ]
          </span>
        )}
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: singleLine ? '11px' : '10px',
            color: singleLine ? 'rgba(240,240,240,0.3)' : 'rgba(240,240,240,0.2)',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </span>
      </div>
    </div>
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
  return (
    <>
      {text.split('\n\n').map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: '"Hanken Grotesk", sans-serif',
            fontSize: '16px',
            color: 'rgba(240,240,240,0.85)',
            lineHeight: 1.8,
            marginBottom: i < text.split('\n\n').length - 1 ? '1.25rem' : 0,
          }}
        >
          {para}
        </p>
      ))}
    </>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ActivationProblemDetail({ onClose }: Props) {
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
          Draconic AI · Product
        </span>
      </div>

      {/* Scrollable body */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '4rem 2rem 6rem',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Logo */}
          <img
            src="/images/activation-problem/logo.png"
            alt="Draconic AI"
            style={{ height: '40px', width: 'auto', display: 'block', marginBottom: '2rem' }}
          />

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
            Activation Problem
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
                    fontSize: 'clamp(32px, 4vw, 48px)',
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
            <div style={{ marginBottom: '3rem' }}>
              <Prose text={APPROACH_INTRO} />
            </div>

            {/* Features */}
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
                  {feature.image ? (
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
                  ) : (
                    <ScreenshotPlaceholder
                      label={feature.screenshotLabel ?? feature.name}
                      singleLine={!!feature.screenshotLabel}
                    />
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
