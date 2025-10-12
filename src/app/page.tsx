'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code, Globe, MessageCircle, Users } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 animate-gradient"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            // Use deterministic positioning based on index
            const positions = [
              { left: 10, top: 20 }, { left: 80, top: 30 }, { left: 30, top: 70 },
              { left: 90, top: 10 }, { left: 50, top: 50 }, { left: 20, top: 80 },
              { left: 70, top: 60 }, { left: 40, top: 40 }, { left: 85, top: 75 },
              { left: 15, top: 55 }, { left: 60, top: 25 }, { left: 35, top: 85 },
              { left: 75, top: 45 }, { left: 25, top: 35 }, { left: 65, top: 65 },
              { left: 45, top: 15 }, { left: 95, top: 55 }, { left: 55, top: 85 },
              { left: 5, top: 65 }, { left: 80, top: 25 }
            ];
            const pos = positions[i % positions.length];
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + (i * 0.1),
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Profile illustration placeholder */}
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-float">
              <span className="text-4xl font-bold text-white">RE</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Rıdvan</span>{' '}
              <span className="gradient-text">Ekinci</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('home.tagline')}
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              {t('home.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/about" className="btn-primary inline-flex items-center">
              {t('home.learnMore')}
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              {t('home.getInTouch')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.whatIDo')} <span className="gradient-text">Do</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('home.servicesDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: t('home.localization.title'),
                description: t('home.localization.description'),
                href: '/localization'
              },
              {
                icon: Code,
                title: t('home.development.title'),
                description: t('home.development.description'),
                href: '/development'
              },
              {
                icon: Users,
                title: t('home.customerExperience.title'),
                description: t('home.customerExperience.description'),
                href: '/customer-experience'
              },
              {
                icon: MessageCircle,
                title: t('home.languageEducation.title'),
                description: t('home.languageEducation.description'),
                href: '/about'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group"
              >
                <service.icon className="w-12 h-12 mx-auto mb-4 text-purple-400 group-hover:text-blue-400 transition-colors" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <Link 
                  href={service.href}
                  className="text-purple-400 hover:text-blue-400 transition-colors inline-flex items-center"
                >
                  {t('home.learnMoreLink')}
                  <ArrowRight className="ml-1" size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
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
              {t('home.readyToWork')} <span className="gradient-text">together</span>?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('home.readyDescription')}
            </p>
            <Link href="/contact" className="btn-primary">
              {t('home.startConversation')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}