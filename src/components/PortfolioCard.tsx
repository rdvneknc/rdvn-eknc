'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import Image from 'next/image'
import type { PortfolioItem } from '@/data/site'
import VideoModal from './VideoModal'

interface PortfolioCardProps {
  item: PortfolioItem
}

const PortfolioCard = ({ item }: PortfolioCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const thumbnail = item.thumbnail ?? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
  const usePlaceholder = !item.thumbnail

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="work-card group"
      >
        <div className="work-thumb">
          {usePlaceholder ? (
            <div className={`work-thumb-placeholder work-thumb-${item.id}`} />
          ) : (
            <Image
              src={thumbnail}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          )}
          <div className="work-thumb-overlay" />
          <div className="play-overlay">
            <div className="play-circle">
              <Play />
            </div>
          </div>
        </div>
        <div className="work-card-body">
          <h3 className="work-card-title">{item.title}</h3>
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

export default PortfolioCard
