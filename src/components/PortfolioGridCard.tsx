'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import type { PortfolioItem } from '@/data/site'
import VideoModal from './VideoModal'

interface PortfolioGridCardProps {
  item: PortfolioItem
}

const badgeClassMap = {
  'AI Trailer': 'portfolio-grid-badge-ai-trailer',
  'AI + Gameplay': 'portfolio-grid-badge-ai-gameplay',
  UGC: 'portfolio-grid-badge-ugc',
  'Promo Visual': 'portfolio-grid-badge-promo',
}

const PortfolioGridCard = ({ item }: PortfolioGridCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const thumbnail = item.thumbnail ?? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`

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
        </div>
        <div className="work-card-body">
          <div className="work-card-top">
            <h3 className="work-card-title">{item.title}</h3>
            <span className={`portfolio-grid-badge ${badgeClassMap[item.badge]}`}>
              {item.badge}
            </span>
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
