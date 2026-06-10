import { motion } from 'framer-motion'

interface RemoteControlProps {
  onChannelSelect: (channel: string) => void
  onPowerToggle: () => void
  isPowered: boolean
  onVolumeUp: () => void
  onVolumeDown: () => void
}

const btnVariants = {
  rest:  { scale: 1,    y: 0, filter: 'brightness(1)',    background: 'rgba(0,0,0,0)' },
  hover: { scale: 1,    y: 0, filter: 'brightness(1.35)', background: 'rgba(0,0,0,0)' },
  tap:   { scale: 0.95, y: 1, filter: 'brightness(0.8)', background: 'rgba(0,0,0,0.4)' },
}

const tapTransition = { duration: 0.08, ease: 'easeInOut' as const }

// Remote image: 1024 × 1536 px
// Channel buttons: x ≈ 237–794 → left 23%, width 54%
// Slot height: ≈ 10% of image height
const SLOT_LEFT  = 23.0
const SLOT_WIDTH = 54.0
const SLOT_H     = 10.0

// Per-slot top values (% of image height) — 5 channel buttons.
// Gaps detected at y≈28%, 40%, 52%, 64%, 75.5%.
const SLOT_TOPS = [
  17.5,  // 0 — PROJECTS
  30.5,  // 1 — ABOUT ME
  42.5,  // 2 — WORK W/ME
  54.5,  // 3 — GAMES
  66.5,  // 4 — YOUTUBE
] as const

const slotTop = (n: number) => `${SLOT_TOPS[n]}%`

// Vol buttons are side-by-side at the bottom (y ≈ 76–86%)
// Left:  x=310–490 px → 30.3%–47.9%  (width 17.6%)
// Right: x=540–780 px → 52.7%–76.2%  (width 23.5%)
const VOL_TOP    = 76.0
const VOL_H      = 10.0
const VOL_L_LEFT = 30.0
const VOL_L_W    = 18.0
const VOL_R_LEFT = 50.0
const VOL_R_W    = 23.0

const rectBtnBase: React.CSSProperties = {
  position:       'absolute',
  left:           `${SLOT_LEFT}%`,
  width:          `${SLOT_WIDTH}%`,
  height:         `${SLOT_H}%`,
  background:     'rgba(0,0,0,0)',
  border:         'none',
  outline:        'none',
  boxShadow:      'none',
  borderRadius:   '3px',
  color:          '#E0D5C5',
  fontFamily:     '"JetBrains Mono", monospace',
  fontSize:       'clamp(0.4rem, 1.1vh, 0.7rem)',
  textTransform:  'uppercase' as const,
  letterSpacing:  '0.12em',
  textShadow:     '0px 1px 3px rgba(0,0,0,0.9)',
  cursor:         'pointer',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  padding:        '0',
  whiteSpace:     'nowrap' as const,
  overflow:       'hidden',
  lineHeight:     1,
}

// Larger font for the 5 channel buttons (not vol)
const chanBtnBase: React.CSSProperties = {
  ...rectBtnBase,
  fontSize:      'clamp(0.49rem, 1.5vh, 0.83rem)',
  letterSpacing: '0.18em',
}

export default function RemoteControl({
  onChannelSelect,
  onPowerToggle,
  onVolumeUp,
  onVolumeDown,
}: RemoteControlProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src="/newremote.png"
        alt="Remote control"
        draggable={false}
        style={{ display: 'block', width: '100%', height: '100%', userSelect: 'none' }}
      />

      {/* Power — transparent overlay, brightness-only hover (image already draws the red button) */}
      <motion.button
        aria-label="Power"
        variants={btnVariants} initial="rest" whileHover="hover"
        whileTap="tap"
        transition={tapTransition}
        onClick={onPowerToggle}
        style={{
          position:     'absolute',
          top:          '5.0%',
          left:         '43.0%',
          width:        '14.0%',
          height:       '12.0%',
          borderRadius: '50%',
          border:       'none',
          outline:      'none',
          background:   'rgba(0,0,0,0)',
          cursor:       'pointer',
        }}
      />

      {/* Slot 0 — PROJECTS */}
      <motion.button
        variants={btnVariants} initial="rest" whileHover="hover"
        whileTap="tap"
        transition={tapTransition}
        onClick={() => onChannelSelect('projects')}
        style={{ ...chanBtnBase, top: slotTop(0) }}
      >
        Projects
      </motion.button>

      {/* Slot 1 — ABOUT ME */}
      <motion.button
        variants={btnVariants} initial="rest" whileHover="hover"
        whileTap="tap"
        transition={tapTransition}
        onClick={() => onChannelSelect('about')}
        style={{ ...chanBtnBase, top: slotTop(1) }}
      >
        About Me
      </motion.button>

      {/* Slot 2 — WORK W/ME */}
      <motion.button
        variants={btnVariants} initial="rest" whileHover="hover"
        whileTap="tap"
        transition={tapTransition}
        onClick={() => onChannelSelect('work')}
        style={{ ...chanBtnBase, top: slotTop(2) }}
      >
        Work W/Me
      </motion.button>

      {/* Slot 3 — GAMES */}
      <motion.button
        variants={btnVariants} initial="rest" whileHover="hover"
        whileTap="tap"
        transition={tapTransition}
        onClick={() => onChannelSelect('game')}
        style={{ ...chanBtnBase, top: slotTop(3) }}
      >
        Games
      </motion.button>

      {/* Slot 4 — YOUTUBE */}
      <motion.button
        variants={btnVariants} initial="rest" whileHover="hover"
        whileTap="tap"
        transition={tapTransition}
        onClick={() => window.open('https://youtube.com', '_blank')}
        style={{ ...chanBtnBase, top: slotTop(4) }}
      >
        YouTube
      </motion.button>

      {/* VOL ▲ — left side-by-side button */}
      <motion.button
        aria-label="Volume up"
        variants={btnVariants} initial="rest" whileHover="hover"
        whileTap="tap"
        transition={tapTransition}
        onClick={onVolumeUp}
        style={{
          ...rectBtnBase,
          top:    `${VOL_TOP}%`,
          left:   `${VOL_L_LEFT}%`,
          width:  `${VOL_L_W}%`,
          height: `${VOL_H}%`,
        }}
      >
        Vol ▲
      </motion.button>

      {/* VOL ▼ — right side-by-side button */}
      <motion.button
        aria-label="Volume down"
        variants={btnVariants} initial="rest" whileHover="hover"
        whileTap="tap"
        transition={tapTransition}
        onClick={onVolumeDown}
        style={{
          ...rectBtnBase,
          top:    `${VOL_TOP}%`,
          left:   `${VOL_R_LEFT}%`,
          width:  `${VOL_R_W}%`,
          height: `${VOL_H}%`,
        }}
      >
        Vol ▼
      </motion.button>
    </div>
  )
}
