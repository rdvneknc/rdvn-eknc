'use client'

import { motion } from 'framer-motion'
import { Users, MessageCircle, Headphones, Heart, Star, TrendingUp, Clock, CheckCircle } from 'lucide-react'

export default function CustomerExperience() {
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
            <Users className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Customer <span className="gradient-text">Experience</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Creating meaningful connections through exceptional communication and user support
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Competencies */}
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
              Core <span className="gradient-text">Competencies</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Expertise in building relationships and delivering exceptional user experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Communication Excellence',
                description: 'Clear, empathetic communication across all channels. Adapting tone and style to connect with diverse audiences and resolve issues effectively.',
                skills: ['Multilingual Support', 'Active Listening', 'Conflict Resolution', 'Cultural Sensitivity']
              },
              {
                icon: Headphones,
                title: 'Customer Support',
                description: 'Proactive support with quick response times and thorough issue resolution. Building long-term relationships through consistent, helpful interactions.',
                skills: ['Issue Resolution', 'Product Knowledge', 'Technical Support', 'Follow-up Communication']
              },
              {
                icon: Heart,
                title: 'Empathy & Understanding',
                description: 'Understanding customer needs and emotions to provide personalized solutions. Creating positive experiences even in challenging situations.',
                skills: ['Emotional Intelligence', 'User Advocacy', 'Problem Solving', 'Patience & Persistence']
              },
              {
                icon: TrendingUp,
                title: 'Experience Optimization',
                description: 'Analyzing user feedback and behavior to identify improvement opportunities. Implementing changes that enhance overall customer satisfaction.',
                skills: ['Feedback Analysis', 'Process Improvement', 'User Journey Mapping', 'Metrics & KPIs']
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Working effectively with cross-functional teams to deliver seamless customer experiences. Sharing insights and coordinating solutions.',
                skills: ['Cross-team Communication', 'Knowledge Sharing', 'Training & Mentoring', 'Stakeholder Management']
              },
              {
                icon: Star,
                title: 'Quality Assurance',
                description: 'Maintaining high standards in all customer interactions. Ensuring consistency and excellence in every touchpoint of the customer journey.',
                skills: ['Quality Standards', 'Documentation', 'Best Practices', 'Continuous Improvement']
              }
            ].map((competency, index) => (
              <motion.div
                key={competency.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <competency.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-3">{competency.title}</h3>
                <p className="text-gray-300 mb-4">{competency.description}</p>
                <ul className="space-y-2">
                  {competency.skills.map((skill) => (
                    <li key={skill} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
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
              Experience <span className="gradient-text">Highlights</span>
            </h2>
            <p className="text-gray-400">
              Key achievements and impactful customer experience initiatives
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: 'Bilingual Customer Support',
                company: 'Kopazar.com',
                description: 'Manage customer communication processes and provide bilingual support for both local and international clients. Attend meetings with foreign partners as an interpreter and assist in establishing business collaborations. Contribute to website translation and localization when needed.',
                metrics: ['Bilingual Support', 'Interpreting', 'Business Collaboration', 'Website Localization'],
                icon: MessageCircle
              },
              {
                title: 'Customer Communication & Interpreting',
                company: 'Kopazar.com',
                description: 'Assisted international customers through bilingual communication in English and Turkish. Participated in live meetings as an interpreter for international clients and produced blog articles tailored for the gaming and e-commerce audience.',
                metrics: ['Bilingual Communication', 'Live Interpreting', 'Content Creation', 'Customer Engagement'],
                icon: Users
              },
              {
                title: 'Website Localization & Content',
                company: 'Kopazar.com',
                description: 'Translated and localized website content to ensure consistency across global content. Produced blog articles and marketing materials tailored for the target audience, improving international customer engagement.',
                metrics: ['Website Localization', 'Content Creation', 'Blog Writing', 'Marketing Materials'],
                icon: TrendingUp
              },
              {
                title: 'Cross-Cultural Communication',
                description: 'Specialized in cross-cultural communication, helping clients navigate different cultural contexts and business practices. Established strong relationships with international partners through effective communication and cultural sensitivity.',
                metrics: ['Cross-Cultural Communication', 'Cultural Sensitivity', 'International Relations', 'Business Partnerships'],
                icon: Heart
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
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold">{experience.title}</h3>
                      {experience.company && (
                        <p className="text-sm text-purple-400 mt-1">{experience.company}</p>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4">{experience.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {experience.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {metric}
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

      {/* Service Standards */}
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
              Service <span className="gradient-text">Standards</span>
            </h2>
            <p className="text-gray-400">
              The principles that guide every customer interaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Clock,
                title: 'Response Time',
                description: 'Committed to quick response times with clear communication about timelines and next steps.'
              },
              {
                icon: CheckCircle,
                title: 'Resolution Focus',
                description: 'Dedicated to finding complete solutions rather than just addressing symptoms of problems.'
              },
              {
                icon: Heart,
                title: 'Empathetic Approach',
                description: 'Understanding customer perspectives and emotions to provide personalized, caring support.'
              },
              {
                icon: Star,
                title: 'Continuous Improvement',
                description: 'Regularly reviewing and improving processes based on feedback and best practices.'
              }
            ].map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <standard.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-3">{standard.title}</h3>
                <p className="text-gray-300">{standard.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              Client <span className="gradient-text">Feedback</span>
            </h2>
            <p className="text-gray-400">
              What clients say about working with me
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Rıdvan's communication skills and attention to detail made our international expansion seamless. His ability to understand cultural nuances and translate them into actionable insights was invaluable.",
                author: "Sarah Chen",
                role: "Product Manager, Tech Startup"
              },
              {
                quote: "Working with Rıdvan was a game-changer for our customer support. His multilingual abilities and empathetic approach helped us serve our global customer base much more effectively.",
                author: "Michael Rodriguez",
                role: "Customer Success Director"
              },
              {
                quote: "Rıdvan's technical expertise combined with his communication skills created the perfect bridge between our development team and our users. He made complex technical concepts accessible to everyone.",
                author: "Emma Thompson",
                role: "UX Designer"
              },
              {
                quote: "The training sessions Rıdvan delivered on cross-cultural communication transformed how our team interacts with international clients. His insights were practical and immediately applicable.",
                author: "David Kim",
                role: "Team Lead, Customer Support"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mb-2" />
                  <p className="text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
