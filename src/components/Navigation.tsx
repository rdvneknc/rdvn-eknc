'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import SiteLogo from '@/components/SiteLogo'
import { siteConfig } from '@/data/site'

const navItems = [
  { href: '/localization', label: 'Localization' },
  { href: '/ad-creatives', label: 'Ad Creatives' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="site-brand" aria-label={siteConfig.name}>
            <SiteLogo width={480} height={88} priority className="site-brand-logo" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-outline gap-1.5">
              Let&apos;s Work Together
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-white/10 pb-4">
            <div className="pt-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md nav-link ${
                    isActive(item.href) ? 'active' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block px-3 py-2 mt-2 nav-link active"
                onClick={() => setIsOpen(false)}
              >
                Let&apos;s Work Together
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
