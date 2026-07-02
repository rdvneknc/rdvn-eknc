'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { VideoAspectRatio } from '@/data/site'

interface ImageModalProps {
  src: string
  alt: string
  aspectRatio?: VideoAspectRatio
  onClose: () => void
}

const aspectRatioClassMap: Record<VideoAspectRatio, string> = {
  '16:9': 'video-modal-frame--16-9',
  '9:16': 'video-modal-frame--9-16',
  '1:1': 'video-modal-frame--1-1',
  '4:5': 'video-modal-frame--4-5',
}

const ImageModal = ({ src, alt, aspectRatio = '1:1', onClose }: ImageModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div
        className={`video-modal-frame image-modal-frame ${aspectRatioClassMap[aspectRatio]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="video-modal-close" aria-label="Close image">
          <X size={20} />
        </button>
        <div className="image-modal-content">
          <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" priority />
        </div>
      </div>
    </div>
  )
}

export default ImageModal
