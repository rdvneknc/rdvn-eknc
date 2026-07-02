'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  FileText,
  Globe,
  Languages,
  Target,
  CheckCircle,
  Award,
  Send,
} from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import CtaBanner from '@/components/home/CtaBanner'
import {
  localizedGames,
  localizationDomains,
  localizationLanguages,
  localizationProcess,
  localizationProjects,
  localizationServices,
} from '@/data/site'

const serviceIconMap = {
  file: FileText,
  globe: Globe,
  languages: Languages,
  target: Target,
  check: CheckCircle,
  award: Award,
}

const processIconMap = {
  file: FileText,
  languages: Languages,
  check: CheckCircle,
  send: Send,
}

const LocalizationPage = () => {
  return (
    <div className="content-page">
      <div className="page-container content-page-inner">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="content-page-header"
        >
          <SectionLabel>Services</SectionLabel>
          <h1 className="section-title content-page-title">Localization</h1>
          <p className="content-page-description">
            Helping games, websites, apps, and digital products reach Turkish and English-speaking
            audiences with clear, natural, and culturally adapted localization.
          </p>
        </motion.header>

        <section className="content-section">
          <div className="content-section-heading">
            <SectionLabel>What I Offer</SectionLabel>
            <h2 className="section-title">Translation & Localization Services</h2>
            <p className="content-section-subtitle">
              Professional English–Turkish and Turkish–English localization support for digital
              products, games, websites, and marketing content.
            </p>
          </div>

          <div className="content-grid-3">
            {localizationServices.map((service, index) => {
              const Icon = serviceIconMap[service.icon]
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="content-feature-card"
                >
                  <Icon className="content-feature-icon" />
                  <h3 className="content-feature-title">{service.title}</h3>
                  <p className="content-feature-text">{service.description}</p>
                  <ul className="content-feature-list">
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <CheckCircle />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="section-title">Language Expertise</h2>
            <p className="content-section-subtitle">
              Professional localization and translation services between Turkish and English.
            </p>
          </div>

          <div className="content-grid-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="content-info-card"
            >
              <h3 className="content-info-card-title">Primary Languages</h3>
              {localizationLanguages.map((lang) => (
                <div key={lang.language} className="content-lang-row">
                  <div className="content-lang-name">
                    <span className="content-lang-flag">{lang.flag}</span>
                    {lang.language}
                  </div>
                  <span className="content-lang-level">{lang.level}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="content-info-card"
            >
              <h3 className="content-info-card-title">Specialized Areas</h3>
              <div className="content-domain-grid">
                {localizationDomains.map((domain) => (
                  <div key={domain} className="content-domain-item">
                    <CheckCircle />
                    {domain}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="section-title">Localized Games</h2>
            <p className="content-section-subtitle">
              Mobile games and game-related content I have localized for international audiences.
            </p>
          </div>

          <div className="content-stack">
            {localizedGames.map((game, index) => (
              <motion.article
                key={game.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="game-card"
              >
                <div className="game-card-inner">
                  <div className="game-card-main">
                    <div className="game-card-logo">
                      <Image
                        src={game.logo}
                        alt={`${game.name} logo`}
                        width={72}
                        height={72}
                      />
                    </div>
                    <div className="game-card-content">
                      <h3 className="game-card-title">{game.name}</h3>
                      <p className="game-card-category">{game.category}</p>
                      <div className="game-card-localization">
                        <Languages />
                        <span>{game.localization}</span>
                      </div>
                      <p className="game-card-description">{game.description}</p>
                    </div>
                  </div>

                  <div className="game-card-stores">
                    {game.appStore && (
                      <a
                        href={game.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-btn"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        <span className="store-btn-text">
                          <span className="store-btn-label">Download on the</span>
                          <span className="store-btn-name">App Store</span>
                        </span>
                      </a>
                    )}
                    {game.googlePlay && (
                      <a
                        href={game.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-btn"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        <span className="store-btn-text">
                          <span className="store-btn-label">Get it on</span>
                          <span className="store-btn-name">Google Play</span>
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="section-title">Project Highlights</h2>
            <p className="content-section-subtitle">
              Examples of localization and translation projects across games, websites, and
              specialized content.
            </p>
          </div>

          <div className="content-grid-2">
            {localizationProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="project-card"
              >
                <h3 className="project-card-title">{project.title}</h3>
                {project.company && (
                  <p className="project-card-company">{project.company}</p>
                )}
                <p className="project-card-text">{project.description}</p>
                <div className="project-card-meta">
                  <div>
                    <span className="project-card-meta-label">Languages</span>
                    <div className="project-card-pills">
                      {project.languages.map((lang) => (
                        <span key={lang} className="tag-pill">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="project-card-meta-label project-card-meta-label-blue">
                      Scope
                    </span>
                    <p className="project-card-meta-text">{project.scope}</p>
                  </div>
                  <div>
                    <span className="project-card-meta-label project-card-meta-label-green">
                      Results
                    </span>
                    <p className="project-card-meta-text">{project.results}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <SectionLabel>My Process</SectionLabel>
            <h2 className="section-title">How I Work</h2>
            <p className="content-section-subtitle">
              A structured localization process focused on accuracy, clarity, and cultural fit.
            </p>
          </div>

          <div className="content-process-grid">
            {localizationProcess.map((step, index) => {
              const Icon = processIconMap[step.icon]
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="content-process-step"
                >
                  <div className="content-process-icon">
                    <Icon />
                  </div>
                  <h3 className="content-process-title">{step.title}</h3>
                  <p className="content-process-text">{step.description}</p>
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

export default LocalizationPage
