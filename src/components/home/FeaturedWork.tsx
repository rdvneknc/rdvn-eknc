'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import PortfolioGridCard from '@/components/PortfolioGridCard'
import { usePortfolio } from '@/hooks/usePortfolio'

const FeaturedWork = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { items, loading, error } = usePortfolio({ featured: true })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const maxScroll = container.scrollWidth - container.clientWidth
    setCanScrollLeft(container.scrollLeft > 8)
    setCanScrollRight(container.scrollLeft < maxScroll - 8)
  }, [])

  useEffect(() => {
    updateScrollState()

    const container = scrollRef.current
    if (!container) return

    container.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    let startX = 0
    let startY = 0

    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    }

    const onTouchMove = (event: TouchEvent) => {
      const deltaX = Math.abs(event.touches[0].clientX - startX)
      const deltaY = Math.abs(event.touches[0].clientY - startY)

      if (deltaX > deltaY && deltaX > 4) {
        event.preventDefault()
      }
    }

    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      container.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
    }
  }, [items, loading, updateScrollState])

  const scrollBy = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const firstItem = container.querySelector<HTMLElement>('.featured-scroll-item')
    const gap = 18
    const amount = firstItem ? firstItem.offsetWidth + gap : container.clientWidth * 0.9

    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  const showControls = !loading && !error && items.length > 1

  return (
    <section className="featured-section section">
      <div className="page-container">
        <div className="section-head">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="section-title">Recent Ad Creatives</h2>
          </motion.div>
          <Link href="/ad-creatives" className="view-all-btn hidden sm:inline-flex">
            View All Work
          </Link>
        </div>

        <div className="featured-scroll-wrap">
          {showControls && canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollBy('left')}
              className="featured-scroll-edge featured-scroll-edge-left"
              aria-label="Scroll left"
            >
              <span className="featured-scroll-edge-icon">
                <ChevronLeft size={28} strokeWidth={2.5} />
              </span>
            </button>
          )}

          {showControls && canScrollRight && (
            <button
              type="button"
              onClick={() => scrollBy('right')}
              className="featured-scroll-edge featured-scroll-edge-right"
              aria-label="Scroll right"
            >
              <span className="featured-scroll-edge-icon">
                <ChevronRight size={28} strokeWidth={2.5} />
              </span>
            </button>
          )}

          <div ref={scrollRef} className="featured-scroll">
            {loading && <p className="featured-scroll-empty">Loading featured work...</p>}
            {error && <p className="featured-scroll-empty">{error}</p>}
            {!loading &&
              !error &&
              items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="featured-scroll-item"
                >
                  <PortfolioGridCard item={item} />
                </motion.div>
              ))}
          </div>
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/ad-creatives" className="view-all-btn inline-flex">
            View All Work
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
