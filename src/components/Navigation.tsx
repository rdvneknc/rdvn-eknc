'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { href: '/', label: t('navigation.home') },
    { href: '/about', label: t('navigation.about') },
    { href: '/localization', label: t('navigation.localization') },
    { href: '/development', label: t('navigation.development') },
    { href: '/customer-experience', label: t('navigation.customerExperience') },
    { href: '/contact', label: t('navigation.contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RE</span>
            </div>
            <span className="text-xl font-semibold">
              <span className="text-white">Rıdvan</span>
              <span className="text-gray-400">Ekinci</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 hover:text-purple-400 ${
                  pathname === item.href ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-purple-400 bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
