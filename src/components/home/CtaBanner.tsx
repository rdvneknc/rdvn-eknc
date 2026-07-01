'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/data/site'

const CtaBanner = () => {
  return (
    <section className="cta-section section">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="cta-banner"
        >
          {siteConfig.ctaBackgroundImage ? (
            <div className="cta-banner-bg" aria-hidden="true">
              <Image
                src={siteConfig.ctaBackgroundImage}
                alt=""
                fill
                className="cta-banner-bg-image"
                sizes="(max-width: 1280px) 100vw, 1184px"
              />
            </div>
          ) : (
            <div className="cta-banner-bg cta-banner-bg-placeholder" aria-hidden="true" />
          )}
          <div className="cta-banner-overlay" aria-hidden="true" />

          <div className="cta-banner-content">
            <h2 className="cta-banner-title">Have a project in mind?</h2>
            <p className="cta-banner-text">
              Let&apos;s create high-converting ad creatives that grow your game.
            </p>
            <Link href="/contact" className="btn-primary cta-banner-btn">
              Let&apos;s Work Together
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaBanner
