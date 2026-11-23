'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/SectionLabel'
import PlayableCard from '@/components/PlayableCard'
import { playableAds } from '@/data/playables'

interface PlayableAdsSectionProps {
  /** "home" renders as a standalone section; "page" sits inside the /ad-creatives container */
  variant?: 'home' | 'page'
}

const PlayableAdsSection = ({ variant = 'home' }: PlayableAdsSectionProps) => {
  if (playableAds.length === 0) return null

  const isHome = variant === 'home'

  return (
    <section
      id="playable-ads"
      className={`playable-section ${isHome ? 'section playable-section--home' : 'playable-section--page'}`}
    >
      <div className={isHome ? 'page-container' : undefined}>
        <div className="section-head playable-section-head">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Interactive</SectionLabel>
            <h2 className="section-title">Playable Ads</h2>
            <p className="playable-section-description">
              HTML5 playable ads that let players try the game before they install. Tap any card
              to play it right here in your browser.
            </p>
          </motion.div>
          <Link href="/playable-ads" className="view-all-btn hidden sm:inline-flex">
            Open Playable Showroom
          </Link>
        </div>

        <div className="playable-grid">
          {playableAds.map((playable, index) => (
            <motion.div
              key={playable.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="playable-grid-item"
            >
              <PlayableCard playable={playable} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/playable-ads" className="view-all-btn inline-flex">
            Open Playable Showroom
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PlayableAdsSection
