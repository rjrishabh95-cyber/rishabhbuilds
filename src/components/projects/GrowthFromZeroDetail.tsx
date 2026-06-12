import { useEffect } from 'react'

interface Props {
  onClose: () => void
  thumbnail?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '0 → 20,000+', label: 'Users Acquired' },
  { value: '40%',          label: 'Acquisition Through Organic Channels' },
  { value: '20+',          label: 'Platforms Listed On' },
]

const PROBLEM = `When the growth engine needed to be built, nothing existed. No paid campaigns, no content calendar, no influencer relationships, no SEO foundation, no community presence. Draconic was a genuinely new product in a category that did not exist yet, an AI co-pilot for traders, which meant there was no established playbook to follow and no obvious audience to target.

The challenge was not just acquiring users. It was finding and convincing an audience that had never used anything like this before, across every channel simultaneously, starting from zero.`

const APPROACH_INTRO = `Every channel was built from scratch. Before anything was executed, a playbook was built for each one. Execution followed the playbook, and the playbook evolved based on what the data showed.`

const CHANNELS: { name: string; description: string; image?: string }[] = [
  {
    name: 'Paid: Google and Meta',
    description: `Built and ran Search, PMAX, and Meta campaigns across three creative themes, each with its own visuals, ad copy, and messaging. 15 to 20 ads tested per campaign with multiple headline and description variations. Weekly optimization using Claude with MCP integration, pulling performance data and making changes based on what was working. Google Ads cost per lead came down to 47 INR.`,
    image: '/images/growth-from-zero/google-ads.webp',
  },
  {
    name: 'Twitter',
    description: `Exported and analyzed the full tweet history of competitor AI companies and trading platforms using Claude before writing a single tweet. Built a monthly content calendar of 40 high-impact pieces across six formats based on what the analysis showed actually worked. High quality images generated and paired with every visual tweet. Every piece written to make users feel understood, not sold to.`,
    image: '/images/growth-from-zero/twitter.webp',
  },
  {
    name: 'Content',
    description: `Built three separate playbooks before posting anything: one for carousels, one for statics, one for reels. A unified monthly content calendar tied everything into a four week posting plan. At the end of every month, performance was analyzed and the next month doubled down on what worked.`,
    image: '/images/growth-from-zero/content.webp',
  },
  {
    name: 'Influencer Partnerships',
    description: `Partnered with influencers across YouTube, Telegram, Instagram, and Reddit through both agencies and direct outreach. Every partnership evaluated on audience fit, not follower count.`,
    image: '/images/growth-from-zero/influencers.webp',
  },
  {
    name: 'SEO, AEO and PR',
    description: `Built a keyword-driven blog playbook with every article written to be SEO friendly and backed with backlinks. A separate playbook was built for what to write on each listing platform. Listed Draconic on more than 20 discovery platforms including Product Hunt and BetaList. Articles placed through PR agencies for press coverage and high quality backlinks simultaneously.`,
    image: '/images/growth-from-zero/seo-pr.webp',
  },
  {
    name: 'Reddit',
    description: `Ran multiple Reddit campaigns to build organic presence within trading communities. Partnered with Indian Street Bets securing a pinned post and logo placement as the community cover photo.`,
    image: '/images/growth-from-zero/reddit.webp',
  },
  {
    name: 'Telegram Community',
    description: `Built a content playbook for the Telegram community covering what gets posted, when, and why. Treated as a product touchpoint, not a broadcast channel.`,
  },
]

const RESULT = `Built the entire growth engine from zero across every channel simultaneously. Organic and content channels drove 40% of all customer acquisition. Google Ads cost per lead came down to 47 INR. The growth was not the result of one channel working. It was the result of every channel being built on a playbook, executed consistently, and optimized based on data every single month.`

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

export default function GrowthFromZeroDetail({ onClose, thumbnail }: Props) {
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
          Draconic AI · Growth
        </span>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Hero image — constrained to content column */}
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
            Growth from Zero
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
              {CHANNELS.map((channel) => (
                <div key={channel.name}>
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
                    {channel.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Hanken Grotesk", sans-serif',
                      fontSize: '16px',
                      color: 'rgba(240,240,240,0.85)',
                      lineHeight: 1.8,
                    }}
                  >
                    {channel.description}
                  </p>
                  {channel.image ? (
                    <img
                      src={channel.image}
                      alt={channel.name}
                      style={{
                        display: 'block',
                        width: '100%',
                        maxWidth: '800px',
                        height: 'auto',
                        margin: '1.5rem auto 0',
                      }}
                    />
                  ) : null}
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
