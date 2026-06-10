import { motion } from 'framer-motion'

interface ChannelViewProps {
  channel: string
  onBack: () => void
}

// Channel display labels for the loading screen
const CHANNEL_LABELS: Record<string, string> = {
  projects: 'CH 01 — PROJECTS',
  about: 'CH 02 — ABOUT ME',
  work: 'CH 03 — WORK WITH ME',
  game: 'CH 04 — GAME',
  easter: 'CH 05 — ???',
}

export default function ChannelView({ channel, onBack }: ChannelViewProps) {
  const label = CHANNEL_LABELS[channel] ?? 'CHANNEL'

  return (
    // layoutId matches the TVScreen wrapper in TVScene — Framer Motion projects
    // the element from the TV screen position to fill the full viewport
    <motion.div
      layoutId="channel-screen"
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // High z-index keeps channel view above TVScene (position:fixed, no z-index = 0)
        zIndex: 100,
        overflow: 'hidden',
      }}
      transition={{ type: 'spring', stiffness: 110, damping: 22 }}
    >
      {/* Back button — fades in after zoom animation settles */}
      <motion.button
        aria-label="Back to TV"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ delay: 0.45, duration: 0.25 }}
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '1.75rem',
          left: '2rem',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#E8500A',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        ← Back
      </motion.button>

      {/* Loading text — fades in after zoom animation settles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          userSelect: 'none',
        }}
      >
        {/* Channel label */}
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'rgba(240,240,240,0.35)',
          }}
        >
          {label}
        </div>

        {/* Loading message + blinking cursor */}
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#F0F0F0',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Channel Loading...
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
            style={{
              color: '#E8500A',
              marginLeft: '2px',
              display: 'inline-block',
            }}
          >
            |
          </motion.span>
        </div>

        {/* Subtle scanline divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(232,80,10,0.5), transparent)',
          }}
        />
      </motion.div>

      {/* Subtle corner scanline overlay — Phase 2 content replaces this area */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px)',
        }}
      />
    </motion.div>
  )
}
