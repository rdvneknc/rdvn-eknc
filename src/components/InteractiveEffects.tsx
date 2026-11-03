'use client'

import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const SPOTLIGHT_SELECTOR = [
  '.service-card',
  '.value-card',
  '.work-card',
  '.contact-method',
  '.contact-form-card',
  '.content-feature-card',
  '.content-info-card',
  '.game-card',
  '.project-card',
  '.cta-banner',
].join(',')

const InteractiveEffects = () => {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    let frame = 0
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const target = event.target as Element | null
        const card = target?.closest<HTMLElement>(SPOTLIGHT_SELECTOR)
        if (!card) return
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        card.style.setProperty('--my', `${event.clientY - rect.top}px`)
      })
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
}

export default InteractiveEffects
