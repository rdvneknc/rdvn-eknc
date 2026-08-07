import type { Metadata } from 'next'
import { Info } from 'lucide-react'
import SiteLogo from '@/components/SiteLogo'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'Portfolio — Ridvan Ekinci',
  description:
    'AI-assisted video and visual ad creatives for games, apps, and digital products. Portfolio samples for Fiverr projects.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function FiverrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="navbar fiverr-navbar">
        <div className="navbar-surface">
          <div className="navbar-inner">
            <div className="navbar-row">
              <div className="site-brand" aria-label={siteConfig.name}>
                <SiteLogo width={480} height={88} priority className="site-brand-logo" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content min-h-screen">{children}</main>

      <footer className="site-footer fiverr-footer">
        <div className="page-container">
          <div className="fiverr-notice" role="note">
            <div className="fiverr-notice-icon" aria-hidden="true">
              <Info size={20} />
            </div>
            <div className="fiverr-notice-body">
              <p className="fiverr-notice-title">Please note</p>
              <p className="fiverr-notice-text">
                For Fiverr projects, all communication and orders should stay on Fiverr. This page is
                a portfolio showcase only and does not include contact details or off-platform
                booking options.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
