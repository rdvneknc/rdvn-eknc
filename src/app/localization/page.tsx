'use client'

import { motion } from 'framer-motion'
import { Globe, FileText, CheckCircle, Award, Languages, Target } from 'lucide-react'

export default function Localization() {
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
            <Globe className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Localization</span> & Translation
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bridging cultures through expert translation and localization services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Professional <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive translation and localization solutions for global reach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'Document Translation',
                description: 'Accurate translation of technical documents, marketing materials, and business communications',
                features: ['Technical Documentation', 'Marketing Copy', 'Legal Documents', 'Academic Papers']
              },
              {
                icon: Globe,
                title: 'Website Localization',
                description: 'Complete website adaptation for different markets, including UI/UX considerations',
                features: ['UI Translation', 'Cultural Adaptation', 'SEO Localization', 'Content Strategy']
              },
              {
                icon: Languages,
                title: 'Software Localization',
                description: 'Application and software interface translation with technical implementation',
                features: ['Interface Translation', 'Technical Integration', 'Quality Testing', 'User Experience']
              },
              {
                icon: Target,
                title: 'Marketing Localization',
                description: 'Campaign adaptation for different cultural contexts and market preferences',
                features: ['Brand Messaging', 'Cultural Sensitivity', 'Market Research', 'Campaign Optimization']
              },
              {
                icon: CheckCircle,
                title: 'Quality Assurance',
                description: 'Comprehensive review and testing to ensure translation accuracy and cultural appropriateness',
                features: ['Proofreading', 'Cultural Review', 'Technical Validation', 'Client Feedback']
              },
              {
                icon: Award,
                title: 'Consultation',
                description: 'Strategic guidance on localization best practices and global market entry',
                features: ['Market Analysis', 'Strategy Planning', 'Best Practices', 'Implementation Support']
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <service.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Language <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-gray-400">
              Professional translation services across multiple language pairs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Primary Languages</h3>
              <div className="space-y-3">
                {[
                  { language: 'English', level: 'Native', flag: '🇺🇸' },
                  { language: 'Turkish', level: 'Native', flag: '🇹🇷' },
                  { language: 'Spanish', level: 'Advanced', flag: '🇪🇸' },
                  { language: 'French', level: 'Intermediate', flag: '🇫🇷' }
                ].map((lang) => (
                  <div key={lang.language} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{lang.flag}</span>
                      <span className="font-medium">{lang.language}</span>
                    </div>
                    <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Specialized Domains</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Technology', 'Education', 'Business', 'Marketing',
                  'Healthcare', 'Finance', 'Legal', 'E-commerce'
                ].map((domain) => (
                  <div key={domain} className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{domain}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Examples */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Project <span className="gradient-text">Highlights</span>
            </h2>
            <p className="text-gray-400">
              Examples of successful localization and translation projects
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'E-learning Platform Localization',
                description: 'Comprehensive localization of an educational platform for Turkish and Spanish markets, including course content, UI elements, and cultural adaptation of learning materials.',
                languages: ['English → Turkish', 'English → Spanish'],
                scope: '15,000+ words, UI localization, cultural adaptation',
                results: '40% increase in user engagement in target markets'
              },
              {
                title: 'SaaS Application Translation',
                description: 'Technical translation of a business management software, including user interface, help documentation, and API references for multiple European markets.',
                languages: ['English → French', 'English → German', 'English → Spanish'],
                scope: '25,000+ words, technical documentation, API translation',
                results: 'Successful market entry in 3 new countries'
              },
              {
                title: 'Marketing Campaign Localization',
                description: 'Adaptation of marketing materials for a technology company expanding into Middle Eastern markets, including cultural sensitivity review and brand messaging optimization.',
                languages: ['English → Arabic', 'English → Turkish'],
                scope: '10,000+ words, cultural adaptation, brand messaging',
                results: '60% improvement in campaign conversion rates'
              },
              {
                title: 'Healthcare Documentation Translation',
                description: 'Medical documentation translation including patient information, clinical guidelines, and regulatory documents with specialized terminology management.',
                languages: ['English → Turkish', 'Spanish → English'],
                scope: '20,000+ words, medical terminology, regulatory compliance',
                results: 'Full compliance with local healthcare regulations'
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-purple-400">Languages:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {project.languages.map((lang) => (
                        <span key={lang} className="text-sm bg-gray-700 px-2 py-1 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-blue-400">Scope:</span>
                    <p className="text-sm text-gray-400 mt-1">{project.scope}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-green-400">Results:</span>
                    <p className="text-sm text-gray-400 mt-1">{project.results}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              My <span className="gradient-text">Process</span>
            </h2>
            <p className="text-gray-400">
              A systematic approach ensuring quality and cultural accuracy
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Project Analysis',
                description: 'Understanding your goals, target audience, and cultural context to develop the best localization strategy.'
              },
              {
                step: '02',
                title: 'Translation & Adaptation',
                description: 'Expert translation with cultural adaptation, ensuring your message resonates with local audiences.'
              },
              {
                step: '03',
                title: 'Quality Assurance',
                description: 'Comprehensive review process including proofreading, cultural validation, and technical accuracy checks.'
              },
              {
                step: '04',
                title: 'Delivery & Support',
                description: 'Timely delivery of final materials with ongoing support for any questions or revisions needed.'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
