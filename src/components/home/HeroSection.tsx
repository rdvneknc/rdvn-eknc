'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Gamepad2, Sparkles, Zap } from 'lucide-react'
import { heroHighlights, siteConfig } from '@/data/site'

const highlightIcons = [Gamepad2, Sparkles, Zap]

const HeroSection = () => {
  return (
    <section className="hero">
      {siteConfig.heroImage && (
        <div className="hero-bg-visual" aria-hidden="true">
          <Image
            src={siteConfig.heroImage}
            alt=""
            fill
            className="hero-bg-image"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="page-container hero-container">
        <div className="hero-inner">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-4">Creative ads that get people to play</p>

            <h1 className="hero-title">
              Mobile Game Ads &<br />
              <span className="gradient-text">Creative Visuals</span>
            </h1>

            <p className="hero-description">
              I create scroll-stopping short video ads, UGC-style creatives, game visuals,
              and localized ad content for mobile games and digital products.
            </p>

            <div className="hero-actions">
              <Link href="/ad-creatives" className="btn-primary">
                View My Work
                <ArrowRight size={16} />
              </Link>
              <a href="#services" className="btn-secondary">
                See Services
              </a>
            </div>

            <div className="hero-features">
              {heroHighlights.map((label, i) => {
                const Icon = highlightIcons[i]
                return (
                  <div key={label} className="hero-feature">
                    <Icon />
                    {label}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
