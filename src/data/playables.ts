export type PlayableOrientation = 'portrait' | 'landscape'

export interface PlayableAd {
  id: string
  /** Game / product name shown as the card title */
  title: string
  /** Optional version label, useful when one game has several concepts */
  version?: string
  /** Short line under the title */
  subtitle: string
  /** Genre chip, e.g. "Strategy" */
  genre: string
  /** Public URL of the playable's index.html */
  url: string
  /** Optional poster image (e.g. /uploads/playables/ottoman-wars-ad-5.webp). When empty, a live preview is shown. */
  thumbnail?: string
  orientation?: PlayableOrientation
}

export const playableAds: PlayableAd[] = [
  {
    id: 'soccer-all-stars-ad-01',
    title: 'Soccer All Stars',
    subtitle: 'Interactive football playable built around a quick, satisfying first touch.',
    genre: 'Sports',
    url: 'https://playableads-tau.vercel.app/soccer-all-stars/ad-01/index.html',
    orientation: 'portrait',
  },
  {
    id: 'gumdrop-legion-ad-01',
    title: 'Gumdrop Legion',
    subtitle: 'Bite-sized gameplay hook that gets players hands-on within seconds.',
    genre: 'Casual',
    url: 'https://playableads-tau.vercel.app/gumdrop-legion/ad-01/index.html',
    orientation: 'portrait',
  },
  {
    id: 'ottoman-wars-ad-5',
    title: 'Ottoman Wars',
    version: 'Concept A',
    subtitle: 'Strategy playable that lets players command the battle before installing.',
    genre: 'Strategy',
    url: 'https://playableads-tau.vercel.app/ottoman-wars/ad-5/index.html',
    orientation: 'portrait',
  },
  {
    id: 'vegaslot-ad-01',
    title: 'VegaSlot',
    subtitle: 'Slot-style playable with an instant spin-and-win reward loop.',
    genre: 'Casino',
    url: 'https://playableads-tau.vercel.app/vegaslot/ad-01/index.html',
    orientation: 'portrait',
  },
  {
    id: 'ottoman-wars-ad-2',
    title: 'Ottoman Wars',
    version: 'Concept B',
    subtitle: 'Alternate concept testing a different hook and flow for the same game.',
    genre: 'Strategy',
    url: 'https://playableads-tau.vercel.app/ottoman-wars/ad-2/index.html',
    orientation: 'portrait',
  },
]
