'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Globe, FileText, CheckCircle, Award, Languages, Target, Smartphone } from 'lucide-react'

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
                  { language: 'Turkish', level: 'Native', flag: '🇹🇷' },
                  { language: 'English', level: 'C1 (CEFR Level)', flag: '🇬🇧' }
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

      {/* Localized Games Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Smartphone className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h2 className="text-3xl font-bold mb-4">
              Localized <span className="gradient-text">Games</span>
            </h2>
            <p className="text-gray-400">
              Mobile games I&apos;ve localized for international markets
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                name: 'Ottoman Wars',
                category: 'Realtime Strategy',
                description: 'Feel the thrill of expanding one of the world\'s most historic empires as you build your base, strengthen your troops, and conquer your enemies.',
                logo: '/logo/ottomanwars.webp',
                localization: 'English → Turkish',
                appStore: 'https://apps.apple.com/us/app/ottoman-wars/id1181041303',
                googlePlay: 'https://play.google.com/store/apps/details?id=com.LimonGame.OsmanliSavaslari&hl=tr&gl=US'
              },
              {
                name: 'Super Soccer',
                category: 'Futbol Oyunu',
                description: 'Experience the excitement of 3v3 soccer matches with fast-paced gameplay and strategic team coordination.',
                logo: '/logo/supersoccer.webp',
                localization: 'English → Turkish',
                appStore: 'https://apps.apple.com/tr/app/super-soccer-3v3/id1524217731',
                googlePlay: 'https://play.google.com/store/apps/details?id=com.limongames.supersoccer'
              },
              {
                name: 'Vagabonds Tribe',
                category: 'Realtime Strategy',
                description: 'Build your tribe, gather resources, and lead your warriors in epic real-time strategy battles.',
                logo: '/logo/vagabonds.webp',
                localization: 'English → Turkish',
                appStore: 'https://apps.apple.com/dz/app/vagabonds-tribe/id6738890654',
                googlePlay: 'https://play.google.com/store/apps/details?id=com.limongames.vagabonds'
              }
            ].map((game, index) => (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left Side - Icon and Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Game Logo */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 flex-shrink-0 overflow-hidden">
                        <Image
                          src={game.logo}
                          alt={`${game.name} logo`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      
                      {/* Game Title and Category */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">{game.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{game.category}</p>
                        
                        {/* Localization Info */}
                        <div className="flex items-center text-sm text-gray-400 mb-3">
                          <Languages className="w-4 h-4 mr-2 text-purple-400" />
                          <span>{game.localization}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Game Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {game.description}
                    </p>
                  </div>
                  
                  {/* Right Side - Download Buttons */}
                  <div className="flex flex-col justify-center gap-3 md:w-auto w-full">
                    {game.appStore && (
                      <a
                        href={game.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all text-sm font-medium shadow-lg hover:shadow-xl min-w-[180px] group"
                      >
                        {/* App Store Icon */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        <div className="flex flex-col items-start">
                          <span className="text-[10px] leading-none">Download on the</span>
                          <span className="text-sm font-semibold leading-tight">App Store</span>
                        </div>
                      </a>
                    )}
                    
                    {game.googlePlay && (
                      <a
                        href={game.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all text-sm font-medium shadow-lg hover:shadow-xl min-w-[180px] group"
                      >
                        {/* Google Play Icon */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        <div className="flex flex-col items-start">
                          <span className="text-[10px] leading-none">GET IT ON</span>
                          <span className="text-sm font-semibold leading-tight">Google Play</span>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
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
                title: 'Mobile Game Localization',
                company: 'Limon Games',
                description: 'Localized and translated multiple mobile games, including in-game text, UI elements, and app store listings. Collaborated with the development team to ensure accurate text adaptation and handled communication with international clients.',
                languages: ['English → Turkish', 'Turkish → English'],
                scope: 'Multiple mobile games, website content, app store listings',
                results: 'Successful localization of multiple games for international markets'
              },
              {
                title: 'Website Localization & Content',
                company: 'Kopazar.com',
                description: 'Translated and localized website content for gaming and e-commerce platforms. Produced blog articles tailored for the target audience and participated in live meetings as an interpreter for international clients.',
                languages: ['English → Turkish', 'Turkish → English'],
                scope: 'Website content, blog articles, live interpreting',
                results: 'Improved international customer engagement and communication'
              },
              {
                title: 'Medical & Academic Translation',
                description: 'Provided English–Turkish translation services for medical professionals and academic researchers. Translated medical reports, research articles, theses, and legal contracts with focus on accuracy and context adaptation.',
                languages: ['English → Turkish', 'Turkish → English'],
                scope: 'Medical reports, research articles, theses, legal contracts',
                results: 'High accuracy translations for specialized content'
              },
              {
                title: 'Game & Technology Translation',
                description: 'Translated game-related and technology content with specialized terminology management. Focused on accurate translation of technical documentation and game narratives while maintaining cultural context.',
                languages: ['English → Turkish', 'Turkish → English'],
                scope: 'Game content, technical documentation, technology articles',
                results: 'Accurate localization maintaining technical accuracy'
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
                <div className="mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {project.company && (
                    <p className="text-sm text-purple-400 mt-1">{project.company}</p>
                  )}
                </div>
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
