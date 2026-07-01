'use client'

import { motion } from 'framer-motion'
import {
  Video,
  Sparkles,
  User,
  Play,
  ImageIcon,
  Globe,
} from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import { services } from '@/data/site'

const iconMap = {
  video: Video,
  sparkles: Sparkles,
  user: User,
  play: Play,
  image: ImageIcon,
  globe: Globe,
}

const ServicesSection = () => {
  return (
    <section id="services" className="services-section section">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="services-heading"
        >
          <SectionLabel>Services</SectionLabel>
          <h2 className="section-title">What I Can Help You With</h2>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="service-card"
              >
                <Icon className="service-icon" />
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-text">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
