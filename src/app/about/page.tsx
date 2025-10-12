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
              A passionate professional bridging the gap between language, technology, and human connection
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
                  My professional journey began in English language education, where I discovered 
                  my passion for helping people communicate effectively across cultural boundaries. 
                  This foundation in language teaching provided me with deep insights into how 
                  people learn, communicate, and connect.
                </p>
                <p>
                  As technology became increasingly important in education and business, I expanded 
                  my expertise into localization and software development. This unique combination 
                  of linguistic and technical skills allows me to create solutions that are not 
                  just functional, but also culturally appropriate and user-friendly.
                </p>
                <p>
                  Today, I work at the intersection of language, technology, and user experience, 
                  helping organizations reach global audiences while maintaining the human touch 
                  that makes communication meaningful.
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
                icon: BookOpen,
                title: 'English Language Education',
                period: '2015 - Present',
                description: 'Extensive experience in English language teaching, curriculum development, and student assessment. Specialized in helping non-native speakers achieve fluency and confidence in professional communication.',
                skills: ['Curriculum Design', 'Student Assessment', 'Cultural Communication', 'Language Learning Strategies']
              },
              {
                icon: Globe,
                title: 'Localization & Translation',
                period: '2018 - Present',
                description: 'Professional translation and localization services across multiple languages. Expert in adapting content for different cultural contexts while maintaining brand voice and technical accuracy.',
                skills: ['Multi-language Translation', 'Cultural Adaptation', 'Technical Documentation', 'Quality Assurance']
              },
              {
                icon: Code,
                title: 'Software Development',
                period: '2020 - Present',
                description: 'Full-stack development using modern technologies including React, Next.js, and Java. Focus on creating user-friendly applications with excellent internationalization support.',
                skills: ['React/Next.js', 'Java Development', 'UI/UX Design', 'Internationalization']
              },
              {
                icon: Users,
                title: 'Customer Experience',
                period: '2019 - Present',
                description: 'Expert in customer communication, user support, and experience optimization. Proven track record in building relationships and solving complex communication challenges.',
                skills: ['Customer Support', 'User Experience', 'Communication Strategy', 'Problem Solving']
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold">{experience.title}</h3>
                      <span className="text-sm text-purple-400 font-medium">{experience.period}</span>
                    </div>
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
