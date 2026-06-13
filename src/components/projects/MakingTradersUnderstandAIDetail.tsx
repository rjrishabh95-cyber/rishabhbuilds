import { useEffect } from 'react'

interface Props {
  onClose: () => void
  thumbnail?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '22% → 38%', label: '7-Day Retention' },
  { value: '500+',       label: 'User Interviews Conducted' },
  { value: '3',          label: 'Video Series Produced' },
]

const PROBLEM = `Draconic was a genuinely new product in a category that did not exist yet. The challenge was not just getting users to open the app. It was getting them to understand what AI-assisted trading even meant, what kind of questions were worth asking, and why the answers they were getting were fundamentally different from anything a chart or indicator could show them. Without that understanding, the product could not retain anyone regardless of how good it was.`

const APPROACH_INTRO = `Before anything was built or written, a playbook was made for each channel. The thinking came first, always. Every touchpoint a user would encounter — inside the product, in their inbox, in videos — was designed around one question: does this help someone understand AI-assisted trading better than they did before they saw it?`

const FEATURES: { name: string; description: string; image?: string }[] = [
  {
    name: 'In-product Playbook',
    description: `The realization was simple: users were walking into a product category that had no reference point. There was nothing to compare it to, no existing mental model to borrow from. A tooltip tour would not fix that. What was needed was a proper learning system, a structured guidebook built the way SaaS companies build their documentation, covering every concept, every piece of jargon, every feature, and every real-world use case. The goal was not to explain the product. It was to give users the foundation to teach themselves.`,
    image: '/images/activation-problem/playbook.webp',
  },
  {
    name: 'Prompt Launcher as Education',
    description: `The prompt launcher solved two problems at once. On the surface it removed friction from the first interaction. But the deeper thinking was that every category, every subcategory, and every ready-to-use prompt inside it was a lesson in disguise. Users were learning what questions were worth asking, what use cases existed, and what AI-assisted trading could actually do, without ever feeling like they were being taught. The curriculum was baked into the interface.`,
    image: '/images/activation-problem/prompt-launcher.webp',
  },
  {
    name: 'Gamified Onboarding Journey',
    description: `The thinking behind this was that understanding does not happen in one session. It builds over time. A one-shot tutorial on day one gets ignored because the user has not had enough experience with the product to know what they do not know yet. Built a progressive discovery system instead: one that surfaces the right concept at the right moment based on where the user actually is in their journey. The more someone used the product, the more they unlocked. Guidance that felt like discovery rather than instruction.`,
    image: '/images/activation-problem/onboarding-journey.webp',
  },
  {
    name: 'Visual Templates',
    description: `The insight came from watching how users consumed responses: walls of text were being skipped. Traders are visual by nature. They read charts, not paragraphs. Ideated a first-of-its-kind interface where Draconic would show annotated charts alongside its analysis: swing highs, swing lows, key levels already marked and labeled. Two instruments compared side by side on different timeframes. The visual and the explanation together, not one after the other. Users could see what the AI was reading, not just what it was concluding. The ideation and product direction were owned completely, execution was handed to the team.`,
    image: '/images/making-traders-understand-ai/visual-templates.webp',
  },
  {
    name: 'Demo and Feature Videos',
    description: `Videos were built because some things cannot be explained in text. Three formats were developed for three different purposes: feature videos for users who wanted to understand one specific capability in depth, demo videos for users who needed to see the full product experience end to end, and workflow videos for users who wanted to see how Draconic fits into an actual trading session. One workflow series was conceptualized, scripted, and blueprinted as a complete episode guide then handed to a professional trader to execute. Every video was scripted and storyboarded before a single frame was recorded.`,
    image: '/images/making-traders-understand-ai/videos.webp',
  },
  {
    name: 'Weekly Educational Email Series',
    description: `The thinking behind the email program was that education cannot happen in one email. Built a full editorial system structured around weekly themes, with three emails per week serving three different purposes: one to introduce a concept, one to show it in action, one to show Draconic surfacing it so users could replicate it themselves. Before any email was written, a full playbook governed every decision: the tone for each email type, the structure, how Draconic should appear in the explanation, what subject lines should do, and what the sign-off should never say. The emails were not plain text blasts. Each one was designed as a proper HTML email, built and imported into Kit, with user segments determining who received what based on their market preference, usage behavior, and where they were in their journey with the product. The discipline came from the playbook. The playbook came from the thinking.`,
    image: '/images/making-traders-understand-ai/emails.webp',
  },
]

const RESULT = `Seven-day retention moved from 22% to 38%. Users who previously churned after a few sessions started coming back consistently. The education system worked not because it was comprehensive, but because every piece of it was built with a clear point of view on what users needed to understand and when they needed to understand it.`

// ─── Sub-components ───────────────────────────────────────────────────────────

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

export default function MakingTradersUnderstandAIDetail({ onClose, thumbnail }: Props) {
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
          Draconic AI · Product &amp; Growth
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
            Making Traders Understand AI
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
            <div style={{ marginBottom: '3rem' }}>
              <Prose text={APPROACH_INTRO} />
            </div>

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
