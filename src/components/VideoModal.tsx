'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { VideoAspectRatio } from '@/data/site'

interface VideoModalProps {
  videoId: string
  title: string
  aspectRatio?: VideoAspectRatio
  onClose: () => void
}

const aspectRatioClassMap: Record<VideoAspectRatio, string> = {
  '16:9': 'video-modal-frame--16-9',
  '9:16': 'video-modal-frame--9-16',
  '1:1': 'video-modal-frame--1-1',
  '4:5': 'video-modal-frame--4-5',
}

const VideoModal = ({ videoId, title, aspectRatio = '16:9', onClose }: VideoModalProps) => {
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
    <div
      className="video-modal-overlay"
      onClick={onClose}
    >
      <div
        className={`video-modal-frame ${aspectRatioClassMap[aspectRatio]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="video-modal-close"
          aria-label="Close video"
        >
          <X size={20} />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-modal-iframe"
        />
      </div>
    </div>
  )
}

export default VideoModal
