'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, Code, Award, Users } from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import CtaBanner from '@/components/home/CtaBanner'
import { aboutBio, aboutIntro, aboutValues } from '@/data/site'

const valueIconMap = {
  award: Award,
  users: Users,
  code: Code,
  book: BookOpen,
}

const AboutPage = () => {
  return (
    <div className="content-page">
      <div className="page-container content-page-inner">
        <div className="about-layout">
          <div className="about-layout-content">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="content-page-header"
            >
              <SectionLabel>About</SectionLabel>
              <div className="about-intro">
                {aboutIntro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="content-page-description">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.header>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="about-journey-section"
            >
              <div className="content-section-heading">
                <SectionLabel>My Journey</SectionLabel>
              </div>
              {aboutBio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </motion.section>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="about-layout-aside"
          >
            <div className="about-avatar about-avatar-image">
              <Image
                src="/logo/rdvn (2).png"
                alt="Ridvan Ekinci portrait"
                width={640}
                height={640}
                className="about-avatar-logo"
                priority
              />
            </div>
          </motion.aside>
        </div>

        <section className="content-section">
          <div className="content-section-heading">
            <SectionLabel>Values</SectionLabel>
            <h2 className="section-title">My Values</h2>
            <p className="content-section-subtitle">
              The principles that guide how I work with clients, teams, and creative projects.
            </p>
          </div>

          <div className="content-grid-2">
            {aboutValues.map((value, index) => {
              const Icon = valueIconMap[value.icon]
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="value-card"
                >
                  <Icon className="value-card-icon" />
                  <h3 className="value-card-title">{value.title}</h3>
                  <p className="value-card-text">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>
      </div>

      <CtaBanner />
    </div>
  )
}

export default AboutPage
