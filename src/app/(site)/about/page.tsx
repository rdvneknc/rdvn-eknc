'use client'

import { motion } from 'framer-motion'
import { BookOpen, Code, Globe, MessageCircle, Award, Users } from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import SiteLogo from '@/components/SiteLogo'
import CtaBanner from '@/components/home/CtaBanner'
import { aboutBio, aboutExperience, aboutValues } from '@/data/site'

const experienceIconMap = {
  users: Users,
  code: Code,
  globe: Globe,
  book: BookOpen,
}

const valueIconMap = {
  message: MessageCircle,
  award: Award,
  users: Users,
  code: Code,
  book: BookOpen,
}

const AboutPage = () => {
  return (
    <div className="content-page">
      <div className="page-container content-page-inner">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="content-page-header"
        >
          <SectionLabel>About</SectionLabel>
          <h1 className="section-title content-page-title">About Ridvan</h1>
          <p className="content-page-description">
            I help game and digital product teams create localized, clear, and engaging content for
            global audiences — combining localization experience, game industry background, creative
            production, and technical understanding.
          </p>
        </motion.header>

        <section className="content-section">
          <div className="about-journey">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="about-bio"
            >
              <div className="content-section-heading">
                <SectionLabel>My Journey</SectionLabel>
                <h2 className="section-title">From Language to Game Marketing & Creative Tech</h2>
              </div>
              {aboutBio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="about-avatar about-avatar-image animate-float"
            >
              <SiteLogo size={280} className="about-avatar-logo" />
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="section-title">Professional Experience</h2>
            <p className="content-section-subtitle">
              A background combining localization, gaming, customer communication, content
              production, and technical skills.
            </p>
          </div>

          <div className="experience-list">
            {aboutExperience.map((experience, index) => {
              const Icon = experienceIconMap[experience.icon]
              return (
                <motion.article
                  key={`${experience.title}-${experience.period}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="experience-card"
                >
                  <div className="experience-card-header">
                    <div className="experience-card-icon">
                      <Icon />
                    </div>
                    <div className="experience-card-body">
                      <div className="experience-card-top">
                        <h3 className="experience-card-title">{experience.title}</h3>
                        <span className="experience-card-period">{experience.period}</span>
                      </div>
                      {experience.company && (
                        <p className="experience-card-company">{experience.company}</p>
                      )}
                      <p className="experience-card-text">{experience.description}</p>
                      <div className="experience-card-skills">
                        {experience.skills.map((skill) => (
                          <span key={skill} className="tag-pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

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
