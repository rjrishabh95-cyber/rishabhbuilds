import { motion } from 'framer-motion'
import TVScreen from './TVScreen'
import RemoteControl from './RemoteControl'

// Measured pixel bounds of the CRT glass on tv.png (1672×941):
//   left ≈ 234 px → 14%   right ≈ 1153 px → 69%   width ≈ 55%
//   top  ≈ 155 px → 16.5% bottom ≈ 762  px → 81%   height ≈ 64.5%
const SCREEN = {
  left: '14%',
  top: '16.5%',
  width: '55%',
  height: '64.5%',
  borderRadius: '3px',
}

const CHANNEL_LABELS: Record<string, string> = {
  projects: 'CH 01 — PROJECTS',
  about: 'CH 02 — ABOUT ME',
  work: 'CH 03 — WORK WITH ME',
  game: 'CH 04 — GAME',
  easter: 'CH 05 — ???',
}

interface TVSceneProps {
  isPowered: boolean
  isFlickering: boolean
  showScreen: boolean
  loadingChannel: string | null
  onChannelSelect: (channel: string) => void
  onPowerToggle: () => void
  volume: number
  onVolumeUp: () => void
  onVolumeDown: () => void
}

export default function TVScene({
  isPowered,
  isFlickering,
  showScreen,
  loadingChannel,
  onChannelSelect,
  onPowerToggle,
  volume,
  onVolumeUp,
  onVolumeDown,
}: TVSceneProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0A0A0A url(/background.png) center/cover no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ── TV body + screen overlay — 54vh ── */}
      <div
        style={{
          height: '54vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src="/tv.png"
            alt=""
            draggable={false}
            style={{
              display: 'block',
              maxHeight: '54vh',
              maxWidth: '90vw',
              width: 'auto',
              height: 'auto',
              mixBlendMode: 'screen',
              userSelect: 'none',
            }}
          />

          {showScreen && (
            <motion.div
              layoutId="channel-screen"
              style={{
                position: 'absolute',
                left: SCREEN.left,
                top: SCREEN.top,
                width: SCREEN.width,
                height: SCREEN.height,
                borderRadius: SCREEN.borderRadius,
                overflow: 'hidden',
              }}
              transition={{ type: 'spring', stiffness: 110, damping: 22 }}
            >
              {loadingChannel ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: '#0A0A0A',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: '"Press Start 2P", sans-serif',
                      fontSize: 'clamp(0.35rem, 0.55vw, 0.5rem)',
                      color: '#00FF41',
                      textShadow: '0 0 10px rgba(0,255,65,0.8)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {CHANNEL_LABELS[loadingChannel] ?? 'CHANNEL'}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Press Start 2P", sans-serif',
                      fontSize: 'clamp(0.4rem, 0.65vw, 0.6rem)',
                      color: '#00FF41',
                      textShadow: '0 0 10px rgba(0,255,65,0.8)',
                      textTransform: 'uppercase',
                    }}
                  >
                    CHANNEL LOADING...
                  </div>
                </div>
              ) : (
                <TVScreen isPowered={isPowered} isFlickering={isFlickering} volume={volume} />
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Remote — 46vh ── */}
      <div
        style={{
          height: '46vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: '100%',
            aspectRatio: '1024 / 1536',
            position: 'relative',
            transform: 'rotate(4deg)',
          }}
        >
          <RemoteControl
            onChannelSelect={onChannelSelect}
            onPowerToggle={onPowerToggle}
            isPowered={isPowered}
            onVolumeUp={onVolumeUp}
            onVolumeDown={onVolumeDown}
          />
        </div>
      </div>
    </div>
  )
}
