'use client'

import { motion } from 'framer-motion'
import { Code, Globe, Database, Smartphone, Zap, Shield, GitBranch, ExternalLink } from 'lucide-react'

export default function Development() {
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
            <Code className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Software <span className="gradient-text">Development</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Building modern, scalable applications with clean code and excellent user experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
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
              Technology <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Modern tools and frameworks for building exceptional applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: 'Frontend',
                icon: Globe,
                technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                category: 'Backend',
                icon: Database,
                technologies: ['Java', 'Spring Boot', 'Node.js', 'Express', 'REST APIs'],
                color: 'from-green-500 to-emerald-500'
              },
              {
                category: 'Mobile',
                icon: Smartphone,
                technologies: ['React Native', 'Expo', 'iOS Development', 'Android Development'],
                color: 'from-purple-500 to-pink-500'
              },
              {
                category: 'Tools',
                icon: GitBranch,
                technologies: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
                color: 'from-orange-500 to-red-500'
              }
            ].map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stack.color} rounded-lg flex items-center justify-center mb-4`}>
                  <stack.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{stack.category}</h3>
                <div className="space-y-2">
                  {stack.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm mr-2 mb-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400">
              Examples of my recent development work and technical solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'E-Learning Platform',
                description: 'A comprehensive online learning management system built with React and Next.js, featuring course management, student progress tracking, and multilingual support.',
                technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
                features: ['User Authentication', 'Course Management', 'Progress Tracking', 'Multi-language Support', 'Responsive Design'],
                status: 'Completed',
                link: '#'
              },
              {
                title: 'Business Management API',
                description: 'RESTful API for business process management with Java Spring Boot, including user management, inventory tracking, and reporting features.',
                technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Docker'],
                features: ['REST API', 'Authentication', 'Data Validation', 'Database Design', 'API Documentation'],
                status: 'Completed',
                link: '#'
              },
              {
                title: 'Portfolio Website',
                description: 'Personal portfolio website with modern design, smooth animations, and responsive layout. Built with Next.js and Framer Motion for enhanced user experience.',
                technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
                features: ['Responsive Design', 'Smooth Animations', 'Dark Theme', 'SEO Optimized', 'Fast Loading'],
                status: 'Current Project',
                link: '#'
              },
              {
                title: 'Mobile Task Manager',
                description: 'Cross-platform mobile application for task and project management with real-time synchronization and offline support.',
                technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript'],
                features: ['Cross-platform', 'Real-time Sync', 'Offline Support', 'Push Notifications', 'User Collaboration'],
                status: 'In Development',
                link: '#'
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'Completed' 
                      ? 'bg-green-900/50 text-green-400 border border-green-500/50'
                      : project.status === 'Current Project'
                      ? 'bg-blue-900/50 text-blue-400 border border-blue-500/50'
                      : 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/50'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <a
                    href={project.link}
                    className="inline-flex items-center text-purple-400 hover:text-blue-400 transition-colors group-hover:translate-x-1 transform duration-200"
                  >
                    View Project
                    <ExternalLink className="ml-1" size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Principles */}
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
              Development <span className="gradient-text">Principles</span>
            </h2>
            <p className="text-gray-400">
              The core values that guide my development approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Code,
                title: 'Clean Code',
                description: 'Writing maintainable, readable code with clear structure and comprehensive documentation. Following best practices and design patterns for long-term sustainability.'
              },
              {
                icon: Zap,
                title: 'Performance',
                description: 'Optimizing applications for speed and efficiency. Implementing modern techniques like code splitting, lazy loading, and performance monitoring.'
              },
              {
                icon: Shield,
                title: 'Security',
                description: 'Implementing security best practices from the ground up. Protecting user data and ensuring secure communication between client and server.'
              },
              {
                icon: Globe,
                title: 'Accessibility',
                description: 'Building inclusive applications that work for everyone. Following WCAG guidelines and ensuring proper semantic HTML and keyboard navigation.'
              }
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <principle.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                <p className="text-gray-300">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Experience */}
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
              Skills & <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-400">
              Technical expertise and professional development experience
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
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Frontend Development</h3>
              <div className="space-y-4">
                {[
                  { skill: 'React/Next.js', level: 90 },
                  { skill: 'TypeScript', level: 85 },
                  { skill: 'Tailwind CSS', level: 90 },
                  { skill: 'Framer Motion', level: 80 },
                  { skill: 'Responsive Design', level: 95 }
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.skill}</span>
                      <span className="text-sm text-gray-400">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
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
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Backend Development</h3>
              <div className="space-y-4">
                {[
                  { skill: 'Java/Spring Boot', level: 85 },
                  { skill: 'Node.js/Express', level: 80 },
                  { skill: 'Database Design', level: 85 },
                  { skill: 'REST APIs', level: 90 },
                  { skill: 'Authentication', level: 85 }
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.skill}</span>
                      <span className="text-sm text-gray-400">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
