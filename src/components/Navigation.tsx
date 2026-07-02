'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import SiteLogo from '@/components/SiteLogo'
import { siteConfig } from '@/data/site'

const navItems = [
  { href: '/localization', label: 'Localization' },
  { href: '/ad-creatives', label: 'Ad Creatives' },
  { href: '/about', label: 'About' },
]

const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isActive = (href: string) => pathname === href
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const mobilePanel = (
    <div
      id="mobile-nav-panel"
      className={`mobile-nav-panel ${isOpen ? 'mobile-nav-panel--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="mobile-nav-backdrop"
        aria-label="Close menu"
        onClick={closeMenu}
        tabIndex={isOpen ? 0 : -1}
      />

      <div className="mobile-nav-sheet">
        <div className="mobile-nav-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-link ${isActive(item.href) ? 'mobile-nav-link--active' : ''}`}
              onClick={closeMenu}
            >
              <span>{item.label}</span>
              <ArrowUpRight size={18} className="mobile-nav-link-icon" />
            </Link>
          ))}
          <Link
            href="/contact"
            className={`mobile-nav-link ${isActive('/contact') ? 'mobile-nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            <span>Contact</span>
            <ArrowUpRight size={18} className="mobile-nav-link-icon" />
          </Link>
        </div>

        <Link href="/contact" className="mobile-nav-cta" onClick={closeMenu}>
          Let&apos;s Work Together
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  )

  return (
    <nav className="navbar">
      <div className="navbar-surface">
        <div className="navbar-inner">
          <div className="navbar-row">
            <Link href="/" className="site-brand" aria-label={siteConfig.name} onClick={closeMenu}>
              <SiteLogo width={480} height={88} priority className="site-brand-logo" />
            </Link>

            <div className="navbar-desktop">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact
              </Link>
              <Link href="/contact" className="btn-outline gap-1.5">
                Let&apos;s Work Together
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-panel"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mounted ? createPortal(mobilePanel, document.body) : null}
    </nav>
  )
}

export default Navigation
