'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Hand } from 'lucide-react'
import type { PlayableAd } from '@/data/playables'
import PlayableModal, { PLAYABLE_SANDBOX } from './PlayableModal'

interface PlayableCardProps {
  playable: PlayableAd
}

/** Virtual phone viewport the live preview renders at before being scaled down */
const PREVIEW_WIDTH = 360
const PREVIEW_HEIGHT = 640

const shouldSkipLivePreview = () => {
  if (typeof window === 'undefined') return true
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return Boolean(connection?.saveData)
}

const PlayableCard = ({ playable }: PlayableCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inView, setInView] = useState(false)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [scale, setScale] = useState(0)
  const [livePreview, setLivePreview] = useState(false)
  const thumbRef = useRef<HTMLDivElement>(null)

  const hasPoster = Boolean(playable.thumbnail)

  useEffect(() => {
    setLivePreview(!hasPoster && !shouldSkipLivePreview())
  }, [hasPoster])

  // Only run the live preview while the card is (nearly) on screen.
  useEffect(() => {
    if (!livePreview) return
    const node = thumbRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (!entry.isIntersecting) setPreviewLoaded(false)
      },
      { rootMargin: '200px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [livePreview])

  // Keep the scaled preview matched to the card size.
  useEffect(() => {
    if (!livePreview) return
    const node = thumbRef.current
    if (!node) return

    const update = () => setScale(node.clientWidth / PREVIEW_WIDTH)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [livePreview])

  // Pause the background preview while the full player is open.
  const showPreview = livePreview && inView && !isOpen && scale > 0

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="work-card playable-card group"
        aria-label={`Play ${playable.title}${playable.version ? ` ${playable.version}` : ''} playable ad`}
      >
        <div ref={thumbRef} className="work-thumb playable-thumb">
          <div className="playable-thumb-poster" aria-hidden="true">
            <span className="playable-thumb-poster-title">{playable.title}</span>
          </div>

          {hasPoster && playable.thumbnail && (
            <Image
              src={playable.thumbnail}
              alt={playable.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 60vw, (max-width: 1280px) 20vw, 240px"
            />
          )}

          {showPreview && (
            <iframe
              src={playable.url}
              title={`${playable.title} preview`}
              className={`playable-thumb-iframe ${previewLoaded ? 'is-loaded' : ''}`}
              style={{
                width: PREVIEW_WIDTH,
                height: PREVIEW_HEIGHT,
                transform: `scale(${scale})`,
              }}
              sandbox={PLAYABLE_SANDBOX}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              onLoad={() => setPreviewLoaded(true)}
            />
          )}

          <div className="playable-thumb-shade" />

          <div className="playable-thumb-cta">
            <span className="playable-thumb-cta-pill">
              <Hand size={15} />
              Try it
            </span>
          </div>

          <span className="playable-badge playable-badge--thumb">
            <span className="playable-badge-dot" aria-hidden="true" />
            Playable
          </span>
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
