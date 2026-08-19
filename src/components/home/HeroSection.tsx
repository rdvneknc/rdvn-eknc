'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Gamepad2, Sparkles, Zap } from 'lucide-react'
import { heroHighlights, siteConfig } from '@/data/site'

const highlightIcons = [Gamepad2, Sparkles, Zap]

const HeroSection = () => {
  const hasMobileBg = Boolean(siteConfig.heroMobileImage)

  return (
    <section className={`hero ${hasMobileBg ? 'hero--has-mobile-bg' : ''}`}>
      {siteConfig.heroImage && (
        <div className="hero-bg-visual hero-bg-visual--desktop" aria-hidden="true">
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

      {hasMobileBg && (
        <div className="hero-bg-visual hero-bg-visual--mobile" aria-hidden="true">
          <Image
            src={siteConfig.heroMobileImage!}
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
            <p className="section-label mb-4">Creative ads powered by ideas, AI & storytelling</p>

            <h1 className="hero-title">
              AI-Powered Creative Ads &<br />
              <span className="gradient-text">Visual Content</span>
            </h1>

            <p className="hero-description">
              I create scroll-stopping video ads, UGC-style creatives, promo visuals, and localized
              content for brands, apps, games, and digital products — combining AI tools with
              hands-on creative production.
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
