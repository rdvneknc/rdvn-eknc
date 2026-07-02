export const siteConfig = {
  name: 'Ridvan Ekinci',
  email: 'hello@ridvanekinci.com',
  website: 'ridvanekinci.com',
  location: 'Tallinn, Estonia',
  tagline: 'Creative Ads · Localization · Game Industry',
  logo: '/logo/ridvan-ekinci-logo.webp',
  heroImage: '/logo/lastback.webp',
  /** Mobile-only hero background — set path when asset is ready */
  heroMobileImage: '' as string | undefined,
  ctaBackgroundImage: '/logo/bottom2.webp',
}

export type PortfolioCategory =
  | 'ai-trailers'
  | 'ai-gameplay'
  | 'ugc-ai-ads'
  | 'promo-visuals'

export type PortfolioBadge = 'AI Trailer' | 'AI + Gameplay' | 'UGC' | 'Promo Visual'

export type VideoAspectRatio = '16:9' | '9:16' | '1:1' | '4:5'

export const videoAspectRatioOptions = [
  { value: '16:9', label: '16:9 Landscape' },
  { value: '9:16', label: '9:16 Vertical' },
  { value: '1:1', label: '1:1 Square' },
  { value: '4:5', label: '4:5 Portrait' },
] as const

export interface PortfolioItem {
  id: string
  title: string
  subtitle: string
  videoId: string
  thumbnail?: string | null
  category: PortfolioCategory
  badge: PortfolioBadge
  duration: string
  resolution: string
  featured: boolean
  aspectRatio: VideoAspectRatio
  displayOrder?: number
  createdAt?: string
}

export function chunkPortfolioItems<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }
  return chunks
}

export function comparePortfolioDisplayOrder(
  a: Pick<PortfolioItem, 'id' | 'displayOrder'>,
  b: Pick<PortfolioItem, 'id' | 'displayOrder'>
) {
  return (a.displayOrder ?? 0) - (b.displayOrder ?? 0) || a.id.localeCompare(b.id)
}

export function sortPortfolioByDisplayOrder<T extends Pick<PortfolioItem, 'id' | 'displayOrder'>>(
  items: T[]
) {
  return [...items].sort(comparePortfolioDisplayOrder)
}

export const portfolioFilters = [
  { id: 'all', label: 'All' },
  { id: 'ai-trailers', label: 'AI Trailers' },
  { id: 'ai-gameplay', label: 'AI + Gameplay' },
  { id: 'ugc-ai-ads', label: 'UGC AI Ads' },
  { id: 'promo-visuals', label: 'Promo Visuals' },
] as const

export type PortfolioFilterId = (typeof portfolioFilters)[number]['id']

export const PORTFOLIO_PAGE_SIZE = 10
export const MAX_FEATURED_VIDEOS = 10

export const categoryToBadge: Record<PortfolioCategory, PortfolioBadge> = {
  'ai-trailers': 'AI Trailer',
  'ai-gameplay': 'AI + Gameplay',
  'ugc-ai-ads': 'UGC',
  'promo-visuals': 'Promo Visual',
}

export function isPromoVisualItem(item: Pick<PortfolioItem, 'category'>) {
  return item.category === 'promo-visuals'
}

export function isLandscapePromoItem(item: Pick<PortfolioItem, 'category' | 'aspectRatio'>) {
  return isPromoVisualItem(item) && (item.aspectRatio ?? '16:9') === '16:9'
}

export function isGridPromoItem(item: Pick<PortfolioItem, 'category' | 'aspectRatio'>) {
  return isPromoVisualItem(item) && (item.aspectRatio ?? '16:9') !== '16:9'
}

export const videoCategories = portfolioFilters.filter((filter) => filter.id !== 'all' && filter.id !== 'promo-visuals')

export const services = [
  {
    title: 'Mobile Game Ad Videos',
    description:
      'Short, engaging ads for UA campaigns, YouTube, TikTok & social media.',
    icon: 'video' as const,
  },
  {
    title: 'AI Video Concepts',
    description:
      'Cinematic AI-driven video concepts from images or ideas.',
    icon: 'sparkles' as const,
  },
  {
    title: 'UGC-Style Ads',
    description:
      'Realistic UGC-style creatives that build trust and drive installs.',
    icon: 'user' as const,
  },
  {
    title: 'YouTube Shorts Covers',
    description:
      'High CTR thumbnails and covers that stand out.',
    icon: 'play' as const,
  },
  {
    title: 'Game Promo Visuals',
    description:
      'Key art, banners, screenshots & promo designs.',
    icon: 'image' as const,
  },
  {
    title: 'Ad Copy & Localization',
    description:
      'Localized ad copy, subtitles, store text & marketing content.',
    icon: 'globe' as const,
  },
]

export const processSteps = [
  {
    title: 'Brief',
    description: 'We align on goals, audience, and creative direction.',
    icon: 'file' as const,
  },
  {
    title: 'Concept',
    description: 'I pitch ideas, hooks, and visual directions for your approval.',
    icon: 'lightbulb' as const,
  },
  {
    title: 'Production',
    description: 'Full creative production — video, visuals, and copy.',
    icon: 'clapperboard' as const,
  },
  {
    title: 'Revision',
    description: 'Refinements based on your feedback until it\'s perfect.',
    icon: 'pencil' as const,
  },
  {
    title: 'Delivery',
    description: 'Final assets delivered in all required formats, ready to launch.',
    icon: 'send' as const,
  },
]

export const heroHighlights = [
  'Game Industry Experience',
  'AI-Powered Creativity',
  'Fast Delivery & Reliable',
]

export const localizationServices = [
  {
    title: 'Document Translation',
    description:
      'Accurate translation of technical documents, marketing materials, and business communications.',
    icon: 'file' as const,
    features: ['Technical Documentation', 'Marketing Copy', 'Legal Documents', 'Academic Papers'],
  },
  {
    title: 'Website Localization',
    description:
      'Complete website adaptation for different markets, including UI/UX considerations.',
    icon: 'globe' as const,
    features: ['UI Translation', 'Cultural Adaptation', 'SEO Localization', 'Content Strategy'],
  },
  {
    title: 'Software Localization',
    description:
      'Application and software interface translation with technical implementation.',
    icon: 'languages' as const,
    features: ['Interface Translation', 'Technical Integration', 'Quality Testing', 'User Experience'],
  },
  {
    title: 'Marketing Localization',
    description:
      'Campaign adaptation for different cultural contexts and market preferences.',
    icon: 'target' as const,
    features: ['Brand Messaging', 'Cultural Sensitivity', 'Market Research', 'Campaign Optimization'],
  },
  {
    title: 'Quality Assurance',
    description:
      'Comprehensive review and testing to ensure translation accuracy and cultural appropriateness.',
    icon: 'check' as const,
    features: ['Proofreading', 'Cultural Review', 'Technical Validation', 'Client Feedback'],
  },
  {
    title: 'Consultation',
    description:
      'Strategic guidance on localization best practices and global market entry.',
    icon: 'award' as const,
    features: ['Market Analysis', 'Strategy Planning', 'Best Practices', 'Implementation Support'],
  },
]

export const localizationLanguages = [
  { language: 'Turkish', level: 'Native', flag: '🇹🇷' },
  { language: 'English', level: 'C1 (CEFR Level)', flag: '🇬🇧' },
]

export const localizationDomains = [
  'Technology',
  'Education',
  'Business',
  'Marketing',
  'Healthcare',
  'Finance',
  'Legal',
  'E-commerce',
]

export const localizedGames = [
  {
    name: 'Ottoman Wars',
    category: 'Realtime Strategy',
    description:
      "Feel the thrill of expanding one of the world's most historic empires as you build your base, strengthen your troops, and conquer your enemies.",
    logo: '/logo/ottomanwars.webp',
    localization: 'English → Turkish',
    appStore: 'https://apps.apple.com/us/app/ottoman-wars/id1181041303',
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.LimonGame.OsmanliSavaslari&hl=tr&gl=US',
  },
  {
    name: 'Super Soccer',
    category: 'Football Game',
    description:
      'Experience the excitement of 3v3 soccer matches with fast-paced gameplay and strategic team coordination.',
    logo: '/logo/supersoccer.webp',
    localization: 'English → Turkish',
    appStore: 'https://apps.apple.com/tr/app/super-soccer-3v3/id1524217731',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.limongames.supersoccer',
  },
  {
    name: 'Vagabonds Tribe',
    category: 'Realtime Strategy',
    description:
      'Build your tribe, gather resources, and lead your warriors in epic real-time strategy battles.',
    logo: '/logo/vagabonds.webp',
    localization: 'English → Turkish',
    appStore: 'https://apps.apple.com/dz/app/vagabonds-tribe/id6738890654',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.limongames.vagabonds',
  },
]

export const localizationProjects = [
  {
    title: 'Mobile Game Localization',
    company: 'Limon Games',
    description:
      'Localized and translated multiple mobile games, including in-game text, UI elements, and app store listings. Collaborated with the development team to ensure accurate text adaptation and handled communication with international clients.',
    languages: ['English → Turkish', 'Turkish → English'],
    scope: 'Multiple mobile games, website content, app store listings',
    results: 'Successful localization of multiple games for international markets',
  },
  {
    title: 'Website Localization & Content',
    company: 'Kopazar.com',
    description:
      'Translated and localized website content for gaming and e-commerce platforms. Produced blog articles tailored for the target audience and participated in live meetings as an interpreter for international clients.',
    languages: ['English → Turkish', 'Turkish → English'],
    scope: 'Website content, blog articles, live interpreting',
    results: 'Improved international customer engagement and communication',
  },
  {
    title: 'Medical & Academic Translation',
    description:
      'Provided English–Turkish translation services for medical professionals and academic researchers. Translated medical reports, research articles, theses, and legal contracts with focus on accuracy and context adaptation.',
    languages: ['English → Turkish', 'Turkish → English'],
    scope: 'Medical reports, research articles, theses, legal contracts',
    results: 'High accuracy translations for specialized content',
  },
  {
    title: 'Game & Technology Translation',
    description:
      'Translated game-related and technology content with specialized terminology management. Focused on accurate translation of technical documentation and game narratives while maintaining cultural context.',
    languages: ['English → Turkish', 'Turkish → English'],
    scope: 'Game content, technical documentation, technology articles',
    results: 'Accurate localization maintaining technical accuracy',
  },
]

export const localizationProcess = [
  {
    title: 'Project Analysis',
    description:
      'Understanding your goals, target audience, and cultural context to develop the best localization strategy.',
    icon: 'file' as const,
  },
  {
    title: 'Translation & Adaptation',
    description:
      'Expert translation with cultural adaptation, ensuring your message resonates with local audiences.',
    icon: 'languages' as const,
  },
  {
    title: 'Quality Assurance',
    description:
      'Comprehensive review process including proofreading, cultural validation, and technical accuracy checks.',
    icon: 'check' as const,
  },
  {
    title: 'Delivery & Support',
    description:
      'Timely delivery of final materials with ongoing support for any questions or revisions needed.',
    icon: 'send' as const,
  },
]

export const aboutBio = [
  'My professional journey began in English language education at Middle East Technical University, where I developed a strong foundation in language teaching and cross-cultural communication. This background provided me with deep insights into how people learn, communicate, and connect across different cultures.',
  "Over the years, I expanded my expertise into translation and localization, working with companies like Limon Games and Kopazar.com. I've specialized in game localization, website translation, and providing bilingual customer support for both local and international clients.",
  'Recently, I completed a Full Stack Developer Bootcamp and started freelancing as a developer, building custom web applications, QR menu systems, and admin dashboards. I also leverage AI-driven workflow optimization to enhance productivity and deliver exceptional results.',
  'Today, I combine my language expertise, technical skills, and customer experience background to help organizations reach global audiences while maintaining the human touch that makes communication meaningful.',
]

export const aboutExperience = [
  {
    title: 'Customer Experience & Localization Specialist',
    company: 'Kopazar.com',
    period: 'Sep 2024 - Present',
    description:
      'Manage customer communication processes and provide bilingual support for both local and international clients. Attend meetings with foreign partners as an interpreter and assist in establishing business collaborations. Contribute to website translation and localization when needed.',
    skills: ['Bilingual Support', 'Customer Communication', 'Interpreting', 'Website Localization', 'Business Collaboration'],
    icon: 'users' as const,
  },
  {
    title: 'Freelance Developer',
    company: 'Self-employed',
    period: 'Jun 2024 - Present',
    description:
      'Develop custom web applications, QR menu systems, and admin dashboards for individual clients using JavaScript and React. Also build small indie games as creative side projects focused on design and user experience.',
    skills: ['React', 'JavaScript', 'Web Applications', 'QR Menu Systems', 'Admin Dashboards', 'Game Development'],
    icon: 'code' as const,
  },
  {
    title: 'Freelance Translator',
    company: 'Self-employed',
    period: 'Apr 2012 - June 2023',
    description:
      'Provided English–Turkish translation services for a wide range of clients, including medical professionals and academic researchers. Translated medical reports, research articles, theses, legal contracts, and game or technology-related content with focus on accuracy and context adaptation.',
    skills: ['Medical Translation', 'Academic Translation', 'Legal Translation', 'Game Translation', 'Technical Documentation'],
    icon: 'globe' as const,
  },
  {
    title: 'Localization Specialist',
    company: 'Limon Games',
    period: 'Jan 2016 - Oct 2021',
    description:
      'Localized and translated mobile games, website content, and app store listings. Collaborated with the development team to ensure accurate in-game text adaptation and handled communication with international clients.',
    skills: ['Game Localization', 'Mobile Games', 'Website Translation', 'App Store Localization', 'International Communication'],
    icon: 'globe' as const,
  },
  {
    title: 'Translator & Content Specialist',
    company: 'Kopazar.com',
    period: 'Oct 2011 - Nov 2015',
    description:
      'Assisted international customers through bilingual communication in English and Turkish. Translated and localized website content, participated in live meetings as an interpreter, and produced blog articles tailored for the gaming and e-commerce audience.',
    skills: ['Bilingual Communication', 'Website Localization', 'Interpreting', 'Content Creation', 'Blog Writing'],
    icon: 'book' as const,
  },
]

export const aboutValues = [
  {
    title: 'Clear Communication',
    description:
      'I believe that effective communication is the foundation of all successful projects. I strive to make complex ideas accessible and ensure everyone is on the same page.',
    icon: 'message' as const,
  },
  {
    title: 'Quality Excellence',
    description:
      "Every project receives my full attention to detail. I'm committed to delivering work that not only meets but exceeds expectations.",
    icon: 'award' as const,
  },
  {
    title: 'Cultural Sensitivity',
    description:
      'Understanding and respecting cultural differences is crucial in our globalized world. I bring this awareness to every project I work on.',
    icon: 'users' as const,
  },
  {
    title: 'Continuous Learning',
    description:
      'Technology and language evolve rapidly. I stay current with the latest trends and continuously improve my skills to serve clients better.',
    icon: 'code' as const,
  },
]
