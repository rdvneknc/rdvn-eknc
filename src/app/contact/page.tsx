'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MessageCircle, MapPin, Send, MessageSquare } from 'lucide-react'
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

export default function Contact() {
  const [locationData, setLocationData] = useState<DistanceResult | null>(null)
  const [loading, setLoading] = useState(true)

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    
    // Mailto link oluştur
    const mailtoLink = `mailto:ridvanekinci92@gmail.com?subject=${encodeURIComponent(subject || 'Contact Form Submission')}&body=${encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    )}`
    
    // Mailto linkini aç
    window.location.href = mailtoLink
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MessageCircle className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to work together? Let&apos;s discuss your project and how I can help you succeed
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">
                Let&apos;s <span className="gradient-text">Connect</span>
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <p className="text-gray-300">ridvanekinci92@gmail.com</p>
                    <p className="text-sm text-gray-400">I typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Linkedin className="w-6 h-6 text-blue-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">LinkedIn</h3>
                    <a 
                      href="https://linkedin.com/in/ridvanekinci" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      linkedin.com/in/ridvanekinci
                    </a>
                    <p className="text-sm text-gray-400">Connect for professional opportunities</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Github className="w-6 h-6 text-gray-300 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">GitHub</h3>
                    <a 
                      href="https://github.com/rdvneknc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      github.com/rdvneknc
                    </a>
                    <p className="text-sm text-gray-400">Check out my development projects</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-green-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/905530948822?text=Merhaba%2C%20websitenizden%20ulaşıyorum"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors inline-block"
                    >
                      Send me a message on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Location</h3>
                    <p className="text-gray-300">Tallinn, Estonia 🇪🇪</p>
                    {loading ? (
                      <p className="text-sm text-gray-400">Detecting your location...</p>
                    ) : locationData && locationData.distance > 0 ? (
                      <p className="text-sm text-gray-400">
                        I&apos;m in Tallinn, Estonia, roughly{' '}
                        <span className="text-purple-400 font-semibold">
                          {locationData.distance.toLocaleString()} km
                        </span>{' '}
                        away from your current location, according to your IP address.
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">My base location</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Quick Response Areas</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Translation Projects',
                    'Localization Services',
                    'Web Development',
                    'Technical Consultation',
                    'Customer Experience',
                    'Cross-cultural Training'
                  ].map((area) => (
                    <div key={area} className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-300">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="translation">Translation & Localization</option>
                    <option value="development">Web Development</option>
                    <option value="consultation">Technical Consultation</option>
                    <option value="training">Communication Training</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-colors resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary inline-flex items-center justify-center"
                >
                  Send Message
                  <Send className="ml-2" size={20} />
                </button>
              </form>

              <p className="text-sm text-gray-400 mt-4 text-center">
                I&apos;ll get back to you within 24 hours. For urgent matters, please mention it in your message.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Connect on <span className="gradient-text">Social Media</span>
            </h2>
            <p className="text-gray-400 mb-12">
              Follow my work and stay updated with my latest projects and insights
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: Linkedin,
                  name: 'LinkedIn',
                  url: 'https://linkedin.com/in/ridvanekinci',
                  description: 'Professional network',
                  color: 'text-blue-400 hover:text-blue-300'
                },
                {
                  icon: Github,
                  name: 'GitHub',
                  url: 'https://github.com/rdvneknc',
                  description: 'Code repositories',
                  color: 'text-gray-300 hover:text-white'
                },
                {
                  icon: MessageSquare,
                  name: 'WhatsApp',
                  url: 'https://wa.me/905530948822?text=Merhaba%2C%20websitenizden%20ulaşıyorum',
                  description: 'Quick message',
                  color: 'text-green-400 hover:text-green-300'
                },
                {
                  icon: Mail,
                  name: 'Email',
                  url: 'mailto:ridvanekinci92@gmail.com',
                  description: 'Direct contact',
                  color: 'text-purple-400 hover:text-purple-300'
                }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col items-center p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-800/70"
                >
                  <social.icon className={`w-8 h-8 mb-3 ${social.color} transition-colors`} />
                  <h3 className="font-semibold text-white mb-1">{social.name}</h3>
                  <p className="text-sm text-gray-400">{social.description}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Project</span>?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you need translation services, web development, or consultation on 
              customer experience, I&apos;m here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ridvanekinci92@gmail.com"
                className="btn-primary inline-flex items-center"
              >
                Send an Email
                <Mail className="ml-2" size={20} />
              </a>
              <a
                href="https://linkedin.com/in/ridvanekinci"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center"
              >
                Connect on LinkedIn
                <Linkedin className="ml-2" size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
