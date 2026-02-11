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
              Backend system architecture and scalable digital infrastructure, with a bilingual background in international digital markets
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
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold mb-6">My Journey</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  My professional journey began in English Language Teaching at Middle East Technical University, 
                  where I developed strong analytical thinking and cross-cultural communication skills.
                </p>
                <p>
                  During my university years, I became increasingly interested in software development and completed 
                  an intensive Full Stack Developer Bootcamp, where I focused on Java, backend systems, and web 
                  application development. This technical foundation allowed me to transition into backend development 
                  professionally.
                </p>
                <p>
                  Since 2014, I have been co-founder and Lead Backend Developer at Kopazar, a digital marketplace 
                  specializing in digital goods and in-game currencies. I have been responsible for backend architecture, 
                  API development, database design, and infrastructure optimization for high-traffic systems.
                </p>
                <p>
                  Alongside my primary role, I have also provided backend consultancy services and worked on 
                  project-based translation and localization tasks, particularly in the gaming and digital platforms 
                  sector.
                </p>
                <p>
                  Today, I focus primarily on backend system architecture and scalable digital infrastructure while 
                  leveraging my bilingual background in international digital markets.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
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
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-400">
              From language teaching to backend architecture and digital marketplace development
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                icon: Code,
                title: 'Co-founder & Lead Backend Developer',
                company: 'Kopazar',
                period: '2014 - Present',
                description: 'Digital marketplace specializing in digital goods and in-game currencies. Responsible for backend architecture, API development, database design, and infrastructure optimization for high-traffic systems.',
                skills: ['Backend Architecture', 'API Development', 'Database Design', 'Infrastructure', 'High-Traffic Systems']
              },
              {
                icon: Code,
                title: 'Backend Consultancy',
                company: 'Freelance',
                period: 'Ongoing',
                description: 'Provide backend consultancy services for various projects, supporting scalable system design and technical implementation.',
                skills: ['System Architecture', 'Backend Development', 'Technical Consulting']
              },
              {
                icon: Globe,
                title: 'Translation & Localization',
                company: 'Project-based / Freelance',
                period: 'Ongoing',
                description: 'Project-based translation and localization tasks, particularly in the gaming and digital platforms sector, leveraging bilingual expertise for international markets.',
                skills: ['Game Localization', 'Digital Platforms', 'Bilingual', 'Translation']
              },
              {
                icon: BookOpen,
                title: 'English Language Teaching',
                company: 'Middle East Technical University',
                period: 'Earlier career',
                description: 'Started professional journey in English Language Teaching, developing strong analytical thinking and cross-cultural communication skills.',
                skills: ['Language Teaching', 'Cross-cultural Communication', 'Analytical Thinking']
              }
            ].map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
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
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
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
                transition={{ duration: 0.5, delay: index * 0.05 }}
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
