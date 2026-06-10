import { useEffect, useRef, useState } from 'react'

interface TVScreenProps {
  isPowered: boolean
  isFlickering: boolean
  volume: number
}

function IconMuted() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function IconUnmuted() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

export default function TVScreen({ isPowered, volume }: TVScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  // All video control is imperative — no muted/autoPlay in JSX so React never
  // touches those properties and can't override our state.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.volume = volume
    video.play().catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // mount only

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPowered) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isPowered])

  useEffect(() => {
    const video = videoRef.current
    if (video) video.volume = volume
  }, [volume])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isMuted
    if (!isMuted && video.paused && isPowered) {
      video.play().catch(() => {})
    }
  }, [isMuted, isPowered])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Power-on flash */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: '#ffffff',
          opacity: 0,
          animation: isPowered ? 'tvFlash 0.15s ease-out forwards' : 'none',
        }}
      />

      <video
        ref={videoRef}
        src="/homevideo3.mp4"
        loop
        playsInline
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Mute / unmute toggle */}
      <button
        onClick={() => setIsMuted((m) => !m)}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        style={{
          position: 'absolute',
          bottom: '6px',
          right: '7px',
          zIndex: 10,
          background: 'none',
          border: 'none',
          padding: '2px',
          cursor: 'pointer',
          color: 'rgba(240,240,240,0.65)',
          lineHeight: 0,
          display: 'flex',
        }}
      >
        {isMuted ? <IconMuted /> : <IconUnmuted />}
      </button>

      {/* CRT scanlines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Brand vignette glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(232,80,10,0.25) 100%)',
        }}
      />

      {/* Power-off fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: '#000000',
          opacity: isPowered ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      />

      <style>{`
        @keyframes tvFlash {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
