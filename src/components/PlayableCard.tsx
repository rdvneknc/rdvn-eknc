'use client'

import { useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { Hand } from 'lucide-react'
import type { PlayableAd } from '@/data/playables'
import PlayableModal from './PlayableModal'

interface PlayableCardProps {
  playable: PlayableAd
}

/**
 * Lightweight card: shows a static poster (image or styled cover).
 * The playable itself only loads when the visitor opens it.
 */
const PlayableCard = ({ playable }: PlayableCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const posterStyle = { '--playable-accent': playable.accent ?? '#9b5cff' } as CSSProperties

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="work-card playable-card group"
        aria-label={`Play ${playable.title}${playable.version ? ` ${playable.version}` : ''} playable ad`}
      >
        <div className="work-thumb playable-thumb" style={posterStyle}>
          {playable.thumbnail ? (
            <Image
              src={playable.thumbnail}
              alt={playable.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 60vw, (max-width: 1280px) 20vw, 240px"
            />
          ) : (
            <div className="playable-poster" aria-hidden="true">
              <span className="playable-poster-grid" />
              <span className="playable-poster-icon">
                <span className="playable-poster-ring" />
                <Hand size={26} strokeWidth={2.2} />
              </span>
              <span className="playable-poster-title">{playable.title}</span>
              <span className="playable-poster-meta">{playable.version ?? playable.genre}</span>
            </div>
          )}

          <div className="playable-thumb-shade" />

          <div className="playable-thumb-cta">
            <span className="playable-thumb-cta-pill">
              <Hand size={15} />
              Try it
            </span>
          </div>

          {!playable.thumbnail && (
            <span className="playable-badge playable-badge--thumb">
              <span className="playable-badge-dot" aria-hidden="true" />
              Playable
            </span>
          )}
        </div>

        <div className="work-card-body">
          <div className="work-card-top">
            <h3 className="work-card-title">{playable.title}</h3>
          </div>
          <p className="work-card-subtitle">{playable.subtitle}</p>
          <div className="playable-card-meta">
            <span className="playable-card-chip">{playable.genre}</span>
            {playable.version ? (
              <span className="playable-card-chip">{playable.version}</span>
            ) : (
              <span className="playable-card-chip playable-card-chip--muted">HTML5</span>
            )}
          </div>
        </div>
      </button>

      {isOpen && <PlayableModal playable={playable} onClose={() => setIsOpen(false)} />}
    </>
  )
}

export default PlayableCard
