import Link from 'next/link'
import SiteLogo from '@/components/SiteLogo'
import { siteConfig } from '@/data/site'

const Footer = () => {
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
        </div>
      </div>
    </footer>
  )
}

export default Footer
