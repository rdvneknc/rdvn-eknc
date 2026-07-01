import Link from 'next/link'
import { Globe, Mail, MapPin } from 'lucide-react'
import SiteLogo from '@/components/SiteLogo'
import { siteConfig } from '@/data/site'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-logo">
              <SiteLogo width={180} height={36} className="site-footer-logo-image" />
              <span className="site-footer-name">{siteConfig.name}</span>
            </Link>
            <p className="site-footer-tagline">{siteConfig.tagline}</p>
          </div>

          <div className="site-footer-links">
            <a href={`mailto:${siteConfig.email}`} className="site-footer-link">
              <Mail className="site-footer-icon" />
              {siteConfig.email}
            </a>
            <a
              href={`https://${siteConfig.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-link"
            >
              <Globe className="site-footer-icon" />
              {siteConfig.website}
            </a>
            <div className="site-footer-link site-footer-link-static">
              <MapPin className="site-footer-icon" />
              {siteConfig.location}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
