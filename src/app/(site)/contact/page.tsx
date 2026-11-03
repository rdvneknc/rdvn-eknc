'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import { getVisitorLocation } from '@/services/geolocation'

interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
  countryCode: string
}

interface DistanceResult {
  distance: number
  location: LocationData
}

const CONTACT_EMAIL = 'ridvanekinci92@gmail.com'
const WHATSAPP_URL =
  'https://wa.me/37253546911?text=Hi%2C%20I%27m%20contacting%20you%20through%20your%20website.'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    note: 'I typically respond within 24 hours',
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ridvanekinci',
    note: 'Connect for professional opportunities',
    href: 'https://linkedin.com/in/ridvanekinci',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/rdvneknc',
    note: 'Check out my development projects',
    href: 'https://github.com/rdvneknc',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: 'Send me a message on WhatsApp',
    note: null,
    href: WHATSAPP_URL,
  },
]

const socialLinks = [
  {
    icon: Linkedin,
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/ridvanekinci',
    description: 'Professional network',
  },
  {
    icon: Github,
    name: 'GitHub',
    url: 'https://github.com/rdvneknc',
    description: 'Code repositories',
  },
  {
    icon: MessageSquare,
    name: 'WhatsApp',
    url: WHATSAPP_URL,
    description: 'Quick message',
  },
  {
    icon: Mail,
    name: 'Email',
    url: `mailto:${CONTACT_EMAIL}`,
    description: 'Direct contact',
  },
]

const quickResponseAreas = [
  'AI-Powered Video Ads',
  'UGC-Style Creatives',
  'Promo Visuals',
  'Ad Copy & Localization',
  'Creative Content Packages',
  'Thumbnails & End Cards',
]

export default function Contact() {
  const [locationData, setLocationData] = useState<DistanceResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true)
        const data = await getVisitorLocation()
        setLocationData(data)
      } catch (err) {
        console.error('Failed to fetch location:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLocation()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitSuccess(true)
      form.reset()
    } catch {
      setSubmitError('Could not send your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="content-page">
      <div className="page-container content-page-inner">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="content-page-header"
        >
          <SectionLabel>Contact</SectionLabel>
          <h1 className="section-title content-page-title">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="content-page-description">
            Ready to work together? Let&apos;s discuss your project and how I can help you succeed.
          </p>
        </motion.header>

        <div className="contact-layout">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="contact-aside"
          >
            <div className="contact-methods">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="contact-method"
                >
                  <span className="contact-method-icon">
                    <method.icon />
                  </span>
                  <span className="contact-method-body">
                    <span className="contact-method-label">{method.label}</span>
                    <span className="contact-method-value">{method.value}</span>
                    {method.note && <span className="contact-method-note">{method.note}</span>}
                  </span>
                  <ArrowUpRight className="contact-method-arrow" />
                </a>
              ))}

              <div className="contact-method contact-method--static">
                <span className="contact-method-icon">
                  <MapPin />
                </span>
                <span className="contact-method-body">
                  <span className="contact-method-label">Location</span>
                  <span className="contact-method-value">Tallinn, Estonia 🇪🇪</span>
                  <span className="contact-method-note">
                    {loading ? (
                      'Detecting your location...'
                    ) : locationData && locationData.distance > 0 ? (
                      <>
                        I&apos;m in Tallinn, Estonia, roughly{' '}
                        <span className="contact-method-highlight">
                          {locationData.distance.toLocaleString()} km
                        </span>{' '}
                        away from your current location, according to your IP address.
                      </>
                    ) : (
                      'My base location'
                    )}
                  </span>
                </span>
              </div>
            </div>

            <div className="contact-areas">
              <h2 className="contact-areas-title">Quick Response Areas</h2>
              <ul className="contact-areas-list">
                {quickResponseAreas.map((area) => (
                  <li key={area} className="contact-area-item">
                    <CheckCircle2 />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="contact-form-card"
          >
            <h2 className="contact-form-title">Send a Message</h2>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-row">
                <label className="contact-field">
                  <span>First Name</span>
                  <input type="text" name="firstName" required placeholder="Your first name" />
                </label>
                <label className="contact-field">
                  <span>Last Name</span>
                  <input type="text" name="lastName" required placeholder="Your last name" />
                </label>
              </div>

              <label className="contact-field">
                <span>Email Address</span>
                <input type="email" name="email" required placeholder="your.email@example.com" />
              </label>

              <label className="contact-field">
                <span>Subject</span>
                <select name="subject" required defaultValue="">
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="video-ads">AI-Powered Video Ads</option>
                  <option value="ugc-creatives">UGC-Style Creatives</option>
                  <option value="promo-visuals">Promo Visuals</option>
                  <option value="ad-copy-localization">Ad Copy & Localization</option>
                  <option value="content-package">Creative Content Package</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="contact-field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project or how I can help you..."
                />
              </label>

              <button type="submit" disabled={submitting} className="btn-primary contact-submit">
                {submitting ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </button>
            </form>

            {submitSuccess && (
              <p className="contact-form-status contact-form-status--success">
                Message sent successfully. I&apos;ll get back to you soon.
              </p>
            )}
            {submitError && (
              <p className="contact-form-status contact-form-status--error">{submitError}</p>
            )}

            <p className="contact-form-footnote">
              I&apos;ll get back to you within 24 hours. For urgent matters, please mention it in your message.
            </p>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="contact-social"
        >
          <h2 className="section-title contact-social-title">
            Connect on <span className="gradient-text">Social Media</span>
          </h2>
          <p className="contact-social-text">
            Follow my work and stay updated with my latest projects and insights
          </p>

          <div className="contact-social-grid">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="value-card contact-social-card"
              >
                <span className="service-icon-wrap">
                  <social.icon className="service-icon" />
                </span>
                <h3 className="value-card-title">{social.name}</h3>
                <p className="value-card-text">{social.description}</p>
              </a>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="cta-banner contact-cta"
        >
          <div className="cta-banner-bg cta-banner-bg-placeholder" aria-hidden="true" />
          <div className="contact-cta-content">
            <h2 className="cta-banner-title">
              Ready to Start Your <span className="gradient-text">Project</span>?
            </h2>
            <p className="cta-banner-text contact-cta-text">
              Whether you need translation services, web development, or consultation on
              customer experience, I&apos;m here to help bring your vision to life.
            </p>
            <div className="contact-cta-actions">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">
                Send an Email
                <Mail size={18} />
              </a>
              <a
                href="https://linkedin.com/in/ridvanekinci"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary gap-2"
              >
                Connect on LinkedIn
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
