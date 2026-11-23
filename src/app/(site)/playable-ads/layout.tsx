import type { Metadata } from 'next'

const title = 'Playable Ads — Ridvan Ekinci'
const description =
  'Interactive HTML5 playable ads for mobile games. Try every playable right in your browser.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function PlayableAdsLayout({ children }: { children: React.ReactNode }) {
  return children
}
