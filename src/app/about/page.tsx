'use client'

import { motion } from 'framer-motion'
import { BookOpen, Code, Globe, MessageCircle, Award, Users } from 'lucide-react'

export default function About() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Rıdvan</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bilingual Localization & Customer Experience Specialist with a full-stack development background, combining language expertise, technical skills, and AI-driven workflow optimization
            </p>
          </motion.div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">My Journey</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  My professional journey began in English language education at Middle East Technical University, 
                  where I developed a strong foundation in language teaching and cross-cultural communication. 
                  This background provided me with deep insights into how people learn, communicate, and connect 
                  across different cultures.
                </p>
                <p>
                  Over the years, I expanded my expertise into translation and localization, working with companies 
                  like Limon Games and Kopazar.com. I&apos;ve specialized in game localization, website translation, 
                  and providing bilingual customer support for both local and international clients.
                </p>
                <p>
                  Recently, I completed a Full Stack Developer Bootcamp and started freelancing as a developer, 
                  building custom web applications, QR menu systems, and admin dashboards. I also leverage AI-driven 
                  workflow optimization to enhance productivity and deliver exceptional results.
                </p>
                <p>
                  Today, I combine my language expertise, technical skills, and customer experience background to 
                  help organizations reach global audiences while maintaining the human touch that makes communication 
                  meaningful.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:justify-self-end"
            >
              {/* Profile placeholder */}
              <div className="w-80 h-80 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center animate-float">
                <span className="text-6xl font-bold text-white">RE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
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
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-400">
              A diverse background spanning education, technology, and communication
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                icon: Users,
                title: 'Customer Experience & Localization Specialist',
                company: 'Kopazar.com',
                period: 'Sep 2024 - Present',
                description: 'Manage customer communication processes and provide bilingual support for both local and international clients. Attend meetings with foreign partners as an interpreter and assist in establishing business collaborations. Contribute to website translation and localization when needed.',
                skills: ['Bilingual Support', 'Customer Communication', 'Interpreting', 'Website Localization', 'Business Collaboration']
              },
              {
                icon: Code,
                title: 'Freelance Developer',
                company: 'Self-employed',
                period: 'Jun 2024 - Present',
                description: 'Develop custom web applications, QR menu systems, and admin dashboards for individual clients using JavaScript and React. Also build small indie games as creative side projects focused on design and user experience.',
                skills: ['React', 'JavaScript', 'Web Applications', 'QR Menu Systems', 'Admin Dashboards', 'Game Development']
              },
              {
                icon: Globe,
                title: 'Freelance Translator',
                company: 'Self-employed',
                period: 'Apr 2012 - June 2023',
                description: 'Provided English–Turkish translation services for a wide range of clients, including medical professionals and academic researchers. Translated medical reports, research articles, theses, legal contracts, and game or technology-related content with focus on accuracy and context adaptation.',
                skills: ['Medical Translation', 'Academic Translation', 'Legal Translation', 'Game Translation', 'Technical Documentation']
              },
              {
                icon: Globe,
                title: 'Localization Specialist',
                company: 'Limon Games',
                period: 'Jan 2016 - Oct 2021',
                description: 'Localized and translated mobile games, website content, and app store listings. Collaborated with the development team to ensure accurate in-game text adaptation and handled communication with international clients.',
                skills: ['Game Localization', 'Mobile Games', 'Website Translation', 'App Store Localization', 'International Communication']
              },
              {
                icon: BookOpen,
                title: 'Translator & Content Specialist',
                company: 'Kopazar.com',
                period: 'Oct 2011 - Nov 2015',
                description: 'Assisted international customers through bilingual communication in English and Turkish. Translated and localized website content, participated in live meetings as an interpreter, and produced blog articles tailored for the gaming and e-commerce audience.',
                skills: ['Bilingual Communication', 'Website Localization', 'Interpreting', 'Content Creation', 'Blog Writing']
              }
            ].map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <experience.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold">{experience.title}</h3>
                      <span className="text-sm text-purple-400 font-medium">{experience.period}</span>
                    </div>
                    {experience.company && (
                      <p className="text-sm text-purple-400 mb-3">{experience.company}</p>
                    )}
                    <p className="text-gray-300 mb-4">{experience.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              My <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-400">
              The principles that guide my work and relationships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Clear Communication',
                description: 'I believe that effective communication is the foundation of all successful projects. I strive to make complex ideas accessible and ensure everyone is on the same page.'
              },
              {
                icon: Award,
                title: 'Quality Excellence',
                description: 'Every project receives my full attention to detail. I\'m committed to delivering work that not only meets but exceeds expectations.'
              },
              {
                icon: Users,
                title: 'Cultural Sensitivity',
                description: 'Understanding and respecting cultural differences is crucial in our globalized world. I bring this awareness to every project I work on.'
              },
              {
                icon: Code,
                title: 'Continuous Learning',
                description: 'Technology and language evolve rapidly. I stay current with the latest trends and continuously improve my skills to serve clients better.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <value.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
