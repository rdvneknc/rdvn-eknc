'use client'

import { motion } from 'framer-motion'
import { FileText, Lightbulb, Clapperboard, Pencil, Send } from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import { processSteps } from '@/data/site'

const iconMap = {
  file: FileText,
  lightbulb: Lightbulb,
  clapperboard: Clapperboard,
  pencil: Pencil,
  send: Send,
}

const ProcessSection = () => {
  return (
    <section className="process-section section">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="process-heading"
        >
          <SectionLabel>My Process</SectionLabel>
          <h2 className="section-title">From Idea to Impact</h2>
        </motion.div>

        <div className="process-grid">
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon]
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="process-step"
              >
                {index < processSteps.length - 1 && (
                  <div className="process-step-line" aria-hidden="true" />
                )}
                <div className="process-step-icon">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-text">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
