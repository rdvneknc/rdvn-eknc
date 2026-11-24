import Link from 'next/link'
import { Linkedin, Mail, MapPin } from 'lucide-react'
import SiteLogo from '@/components/SiteLogo'
import { siteConfig } from '@/data/site'

const pageLinks = [
  { href: '/ad-creatives', label: 'Ad Creatives' },
  { href: '/playable-ads', label: 'Playable Ads' },
  { href: '/localization', label: 'Localization' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-logo">
              <SiteLogo width={260} height={52} className="site-footer-logo-image" priority />
            </Link>
            <p className="site-footer-tagline">{siteConfig.tagline}</p>
          </div>

          <nav className="site-footer-col" aria-label="Footer">
            <p className="site-footer-heading">Explore</p>
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href} className="site-footer-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-footer-col">
            <p className="site-footer-heading">Connect</p>
            <a href="mailto:ridvanekinci92@gmail.com" className="site-footer-link">
              <Mail className="site-footer-icon" />
              ridvanekinci92@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/ridvanekinci"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-link"
            >
              <Linkedin className="site-footer-icon" />
              LinkedIn
            </a>
            <span className="site-footer-link site-footer-link-static">
              <MapPin className="site-footer-icon" />
              Tallinn, Estonia
            </span>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>© {year} {siteConfig.name}. All rights reserved.</span>
          <span>AI-Powered Creative Ads & Visual Content</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
