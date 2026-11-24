'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  Expand,
  Hand,
  Layers,
  MousePointerClick,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import CtaBanner from '@/components/home/CtaBanner'
import PlayableModal, { PLAYABLE_SANDBOX } from '@/components/PlayableModal'
import { playableAds, type PlayableAd } from '@/data/playables'

const principles = [
  {
    icon: Zap,
    title: 'Hook in seconds',
    description: 'Players are hands-on from the very first tap, with no long intros or loading walls.',
  },
  {
    icon: MousePointerClick,
    title: 'One clear mechanic',
    description: 'Each playable focuses on the core action that makes the game fun, so it feels real.',
  },
  {
    icon: Sparkles,
    title: 'Strong end card',
    description: 'A rewarding finish and a clear call to action that sends players to the store.',
  },
  {
    icon: Layers,
    title: 'Concepts to test',
    description: 'Multiple hooks for the same game, ready for A/B testing in your UA campaigns.',
  },
]

const displayName = (playable: PlayableAd) =>
  playable.version ? `${playable.title} — ${playable.version}` : playable.title

const PlayableAdsPage = () => {
  const [activeId, setActiveId] = useState(playableAds[0]?.id ?? '')
  const [session, setSession] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const active = useMemo(
    () => playableAds.find((playable) => playable.id === activeId) ?? playableAds[0],
    [activeId]
  )

  const gameCount = useMemo(() => new Set(playableAds.map((p) => p.title)).size, [])

  // Allow deep links like /playable-ads#ottoman-wars-ad-5
  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '')
    if (fromHash && playableAds.some((playable) => playable.id === fromHash)) {
      setActiveId(fromHash)
    }
  }, [])

  const select = useCallback(
    (id: string) => {
      if (id === activeId) return
      setActiveId(id)
      setLoaded(false)
      window.history.replaceState(null, '', `#${id}`)
    },
    [activeId]
  )

  const openFocusMode = () => {
    setLoaded(false)
    setModalOpen(true)
  }

  const restart = () => {
    setLoaded(false)
    setSession((value) => value + 1)
  }

  if (!active) return null

  return (
    <div className="portfolio-page playables-page">
      <div className="page-container portfolio-page-inner">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="portfolio-page-header playables-page-header"
        >
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="section-title portfolio-page-title">Playable Ads</h1>
          <p className="portfolio-page-description">
            Interactive HTML5 ads that let players try the game before they install. Pick a
            playable from the list and play it right here, just like on a phone.
          </p>

          <div className="playables-stats">
            <div className="playables-stat">
              <span className="playables-stat-value">{playableAds.length}</span>
              <span className="playables-stat-label">Playables</span>
            </div>
            <div className="playables-stat">
              <span className="playables-stat-value">{gameCount}</span>
              <span className="playables-stat-label">Games</span>
            </div>
            <div className="playables-stat">
              <span className="playables-stat-value">HTML5</span>
              <span className="playables-stat-label">Mobile-first</span>
            </div>
          </div>
        </motion.header>

        {/* Showroom */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="playables-showroom"
          aria-label="Playable ads showroom"
        >
          <div className="playables-stage">
            <div className="playables-stage-glow" aria-hidden="true" />

            <div className="playable-device playables-stage-device">
              <div className="playable-device-screen">
                {!loaded && (
                  <div className="playable-device-loading" aria-hidden="true">
                    <span className="playable-spinner" />
                    <span>Loading playable…</span>
                  </div>
                )}
                {!modalOpen && (
                  <iframe
                    key={`${active.id}-${session}`}
                    src={active.url}
                    title={displayName(active)}
                    className={`playable-device-iframe ${loaded ? 'is-loaded' : ''}`}
                    sandbox={PLAYABLE_SANDBOX}
                    allow="autoplay; fullscreen; accelerometer; gyroscope"
                    allowFullScreen
                    onLoad={() => setLoaded(true)}
                  />
                )}

                {/* On touch / small screens the inline player is a preview; tapping opens full screen */}
                <button
                  type="button"
                  className="playables-stage-tap"
                  onClick={openFocusMode}
                  aria-label={`Play ${displayName(active)} full screen`}
                >
                  <span className="playable-thumb-cta-pill">
                    <Hand size={15} />
                    Tap to play
                  </span>
                </button>
              </div>
            </div>

            <div className="playables-stage-controls">
              <button type="button" onClick={restart} className="playable-modal-btn" title="Restart">
                <RotateCcw size={17} />
                <span className="sr-only">Restart playable</span>
              </button>
              <button
                type="button"
                onClick={openFocusMode}
                className="playable-modal-btn"
                title="Focus mode"
              >
                <Expand size={17} />
                <span className="sr-only">Open in focus mode</span>
              </button>
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="playable-modal-btn"
                title="Open in new tab"
              >
                <ExternalLink size={17} />
                <span className="sr-only">Open playable in a new tab</span>
              </a>
            </div>
          </div>

          <div className="playables-panel">
            <div className="playables-now">
              <span className="playable-badge">
                <span className="playable-badge-dot" aria-hidden="true" />
                Now playing
              </span>
              <h2 className="playables-now-title">{active.title}</h2>
              <p className="playables-now-text">{active.subtitle}</p>
              <div className="playable-card-meta">
                <span className="playable-card-chip">{active.genre}</span>
                {active.version && <span className="playable-card-chip">{active.version}</span>}
                <span className="playable-card-chip playable-card-chip--muted">HTML5</span>
                <span className="playable-card-chip playable-card-chip--muted">
                  {active.orientation === 'landscape' ? '16:9' : '9:16'}
                </span>
              </div>
            </div>

            <div className="playables-list" role="listbox" aria-label="Choose a playable">
              {playableAds.map((playable, index) => {
                const isActive = playable.id === active.id
                return (
                  <button
                    key={playable.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => select(playable.id)}
                    className={`playables-list-item ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="playables-list-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="playables-list-text">
                      <span className="playables-list-title">
                        {playable.title}
                        {playable.version && (
                          <span className="playables-list-version">{playable.version}</span>
                        )}
                      </span>
                      <span className="playables-list-genre">{playable.genre}</span>
                    </span>
                    <span className="playables-list-state" aria-hidden="true">
                      {isActive ? <span className="playables-eq"><i /><i /><i /></span> : <Hand size={15} />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Approach */}
        <section className="playables-principles">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Approach</SectionLabel>
            <h2 className="section-title">How I Build Playables</h2>
          </motion.div>

          <div className="playables-principles-grid">
            {principles.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="playables-principle"
              >
                <span className="playables-principle-icon">
                  <Icon size={20} />
                </span>
                <h3 className="playables-principle-title">{title}</h3>
                <p className="playables-principle-text">{description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <CtaBanner />

      {modalOpen && <PlayableModal playable={active} onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default PlayableAdsPage
