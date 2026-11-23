'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ExternalLink, RotateCcw, X } from 'lucide-react'
import type { PlayableAd } from '@/data/playables'

interface PlayableModalProps {
  playable: PlayableAd
  onClose: () => void
}

export const PLAYABLE_SANDBOX =
  'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-pointer-lock'

const PlayableModal = ({ playable, onClose }: PlayableModalProps) => {
  const [session, setSession] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const isLandscape = playable.orientation === 'landscape'

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const restart = () => {
    setLoaded(false)
    setSession((value) => value + 1)
  }

  const heading = playable.version ? `${playable.title} — ${playable.version}` : playable.title

  return createPortal(
    <div
      className="playable-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${heading} playable ad`}
    >
      <div className="playable-modal" onClick={(e) => e.stopPropagation()}>
        <div className="playable-modal-bar">
          <div className="playable-modal-heading">
            <span className="playable-badge">
              <span className="playable-badge-dot" aria-hidden="true" />
              Playable
            </span>
            <h3 className="playable-modal-title">{heading}</h3>
          </div>

          <div className="playable-modal-actions">
            <button
              type="button"
              onClick={restart}
              className="playable-modal-btn"
              aria-label="Restart playable"
              title="Restart"
            >
              <RotateCcw size={17} />
            </button>
            <a
              href={playable.url}
              target="_blank"
              rel="noopener noreferrer"
              className="playable-modal-btn"
              aria-label="Open playable in a new tab"
              title="Open in new tab"
            >
              <ExternalLink size={17} />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="playable-modal-btn playable-modal-btn--close"
              aria-label="Close playable"
              title="Close"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div className={`playable-device ${isLandscape ? 'playable-device--landscape' : ''}`}>
          <div className="playable-device-screen">
            {!loaded && (
              <div className="playable-device-loading" aria-hidden="true">
                <span className="playable-spinner" />
                <span>Loading playable…</span>
              </div>
            )}
            <iframe
              key={session}
              src={playable.url}
              title={heading}
              className={`playable-device-iframe ${loaded ? 'is-loaded' : ''}`}
              sandbox={PLAYABLE_SANDBOX}
              allow="autoplay; fullscreen; accelerometer; gyroscope"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>

        <p className="playable-modal-hint">Interact with the ad just like players would on their phone.</p>
      </div>
    </div>,
    document.body
  )
}

export default PlayableModal
