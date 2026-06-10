import { useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import TVScene from './components/TVScene'
import ChannelView from './components/ChannelView'

type Channel = 'projects' | 'about' | 'work' | 'game' | 'easter' | null

const VOLUME_STEP = 0.1

export default function App() {
  const [activeChannel, setActiveChannel] = useState<Channel>(null)
  const [isPowered, setIsPowered] = useState(true)
  const [loadingChannel, setLoadingChannel] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.5)
  const cancelRef = useRef(false)

  function handleVolumeUp() {
    setVolume((v) => Math.min(1, parseFloat((v + VOLUME_STEP).toFixed(2))))
  }

  function handleVolumeDown() {
    setVolume((v) => Math.max(0, parseFloat((v - VOLUME_STEP).toFixed(2))))
  }

  async function handleChannelSelect(channel: string) {
    if (loadingChannel || activeChannel || !isPowered) return
    cancelRef.current = false
    setLoadingChannel(channel)
    await new Promise<void>((r) => setTimeout(r, 800))
    if (cancelRef.current) return
    setLoadingChannel(null)
    setActiveChannel(channel as Channel)
  }

  function handlePowerToggle() {
    cancelRef.current = true
    setLoadingChannel(null)
    if (activeChannel) setActiveChannel(null)
    setIsPowered((prev) => !prev)
  }

  function handleBack() {
    setActiveChannel(null)
  }

  return (
    <LayoutGroup>
      <TVScene
        isPowered={isPowered}
        isFlickering={false}
        showScreen={activeChannel === null}
        loadingChannel={loadingChannel}
        onChannelSelect={handleChannelSelect}
        onPowerToggle={handlePowerToggle}
        volume={volume}
        onVolumeUp={handleVolumeUp}
        onVolumeDown={handleVolumeDown}
      />

      <AnimatePresence>
        {activeChannel && (
          <ChannelView
            key={activeChannel}
            channel={activeChannel}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
