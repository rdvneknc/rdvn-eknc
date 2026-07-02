'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { isPromoVisualItem, type PortfolioBadge, type PortfolioItem } from '@/data/site'
import VideoModal from './VideoModal'
import ImageModal from './ImageModal'

interface PortfolioGridCardProps {
  item: PortfolioItem
  variant?: 'default' | 'promo-stack' | 'promo-grid'
}

const badgeClassMap: Record<PortfolioBadge, string> = {
  'AI Trailer': 'portfolio-grid-badge-ai-trailer',
  'AI + Gameplay': 'portfolio-grid-badge-ai-gameplay',
  UGC: 'portfolio-grid-badge-ugc',
  'Promo Visual': 'portfolio-grid-badge-promo',
}

const ThumbBadge = ({ badge }: { badge: PortfolioBadge }) => (
  <span className={`work-thumb-badge portfolio-grid-badge ${badgeClassMap[badge]}`}>{badge}</span>
)

const PortfolioGridCard = ({ item, variant = 'default' }: PortfolioGridCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const isPromo = isPromoVisualItem(item)
  const thumbnail = item.thumbnail ?? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`

  if (isPromo) {
    const isStacked = variant === 'promo-stack'
    const isGridPromo = variant === 'promo-grid'

    if (isGridPromo) {
      return (
        <>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="work-card work-card--promo-full group"
          >
            <div className="work-thumb work-thumb--promo-full work-thumb--promo-contain">
              <Image
                src={thumbnail}
                alt="Promo visual"
                fill
                className="work-thumb-image--contain"
                sizes="(max-width: 768px) 88vw, (max-width: 1280px) 33vw, 240px"
              />
              <div className="work-thumb-overlay work-thumb-overlay--promo" />
              <ThumbBadge badge={item.badge} />
            </div>
          </button>

          {isOpen && (
            <ImageModal
              src={thumbnail}
              alt="Promo visual"
              aspectRatio={item.aspectRatio}
              onClose={() => setIsOpen(false)}
            />
          )}
        </>
      )
    }

    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`work-card work-card--promo group ${isStacked ? 'work-card--promo-stacked' : ''}`}
        >
          <div className={`work-thumb ${isStacked ? 'work-thumb--promo-fill' : ''}`}>
            <Image
              src={thumbnail}
              alt="Promo visual"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 44vw, (max-width: 1280px) 20vw, 240px"
            />
            <div className="work-thumb-overlay work-thumb-overlay--promo" />
            <ThumbBadge badge={item.badge} />
          </div>
        </button>

        {isOpen && (
          <ImageModal
            src={thumbnail}
            alt="Promo visual"
            aspectRatio={item.aspectRatio}
            onClose={() => setIsOpen(false)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="work-card group">
        <div className="work-thumb">
          <Image
            src={thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 88vw, (max-width: 1280px) 33vw, 240px"
          />
          <div className="work-thumb-overlay" />
          <div className="play-overlay">
            <div className="play-circle">
              <Play />
            </div>
          </div>
          <ThumbBadge badge={item.badge} />
        </div>
        <div className="work-card-body">
          <div className="work-card-top">
            <h3 className="work-card-title">{item.title}</h3>
          </div>
          <p className="work-card-subtitle">{item.subtitle}</p>
        </div>
      </button>

      {isOpen && (
        <VideoModal
          videoId={item.videoId}
          title={item.title}
          aspectRatio={item.aspectRatio}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default PortfolioGridCard
