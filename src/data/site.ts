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
    title: 'Game Localization',
    description:
      'Localization of mobile games, in-game text, UI elements, app store listings, and player-facing content.',
    icon: 'languages' as const,
    features: [
      'In-game Text',
      'UI Translation',
      'App Store Listings',
      'Game Descriptions',
      'Terminology Consistency',
    ],
  },
  {
    title: 'Website & App Localization',
    description:
      'Adaptation of websites and applications for Turkish and English-speaking users, with attention to clarity, tone, and user experience.',
    icon: 'globe' as const,
    features: [
      'Website Copy',
      'UI/UX Text',
      'Landing Pages',
      'SEO-friendly Content',
      'Cultural Adaptation',
    ],
  },
  {
    title: 'Marketing Localization',
    description:
      'Localization of marketing content so your message feels natural, relevant, and persuasive for the target audience.',
    icon: 'target' as const,
    features: [
      'Ad Copy',
      'Social Media Text',
      'Campaign Content',
      'Brand Messaging',
      'App Store Optimization Text',
    ],
  },
  {
    title: 'Software & UI Localization',
    description:
      'Translation and adaptation of software interfaces, menus, buttons, onboarding flows, and user-facing product text.',
    icon: 'file' as const,
    features: [
      'Interface Translation',
      'Button & Menu Text',
      'Onboarding Text',
      'User Messages',
      'Quality Review',
    ],
  },
  {
    title: 'Translation Review & QA',
    description:
      'Reviewing translated content for accuracy, consistency, readability, and cultural suitability.',
    icon: 'check' as const,
    features: [
      'Proofreading',
      'Terminology Review',
      'Cultural Review',
      'Context Check',
      'Final Polish',
    ],
  },
  {
    title: 'Localization Consultation',
    description:
      'Guidance on how to adapt your product, website, or marketing content for Turkish and English-speaking markets.',
    icon: 'award' as const,
    features: [
      'Localization Strategy',
      'Tone of Voice',
      'Content Adaptation',
      'Market Fit Suggestions',
      'Implementation Support',
    ],
  },
]

export const localizationLanguages = [
  { language: 'Turkish', level: 'Native', flag: '🇹🇷' },
  {
    language: 'English',
    level: 'Professional Working Proficiency / C1 CEFR Level',
    flag: '🇬🇧',
  },
]

export const localizationDomains = [
  'Mobile Games',
  'Websites',
  'Apps & Software',
  'Digital Marketing',
  'E-commerce',
  'Technology',
  'Education',
  'Academic Content',
  'Business Communication',
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
      'Translated and localized multiple mobile games, including in-game text, UI elements, app store listings, website content, and marketing materials. Worked closely with the development team to maintain accuracy, consistency, and a natural user experience across English and Turkish.',
    languages: ['English → Turkish', 'Turkish → English'],
    scope:
      'Mobile games, UI text, app store listings, website content, marketing copy',
    results:
      'Delivered consistent and user-friendly localization for multiple game-related products and promotional materials.',
  },
  {
    title: 'Website Localization & Content',
    company: 'Kopazar.com',
    description:
      'Translated and localized website content for gaming and e-commerce audiences. Produced blog articles, news content, support-related texts, and participated in live meetings as an interpreter for international business communication.',
    languages: ['English → Turkish', 'Turkish → English'],
    scope:
      'Website content, blog articles, e-commerce content, business communication, live interpreting',
    results:
      'Supported clearer communication with international partners and helped adapt content for local users.',
  },
  {
    title: 'Medical & Academic Translation',
    company: 'Freelance Projects',
    description:
      'Provided English–Turkish and Turkish–English translation support for medical professionals, academic researchers, and individual clients. Translated medical reports, research articles, theses, and contract-related documents with attention to accuracy, terminology, and context.',
    languages: ['English → Turkish', 'Turkish → English'],
    scope:
      'Medical reports, research articles, theses, academic texts, contract-related documents',
    results:
      'Delivered accurate and context-aware translations for specialized documents.',
  },
  {
    title: 'Game & Technology Translation',
    company: 'Freelance & Professional Projects',
    description:
      'Translated game-related, software-related, and technology-focused content with attention to terminology, clarity, and cultural context. Focused on keeping technical content accurate while making the final text natural for the target audience.',
    languages: ['English → Turkish', 'Turkish → English'],
    scope: 'Game content, software text, technical documentation, technology articles',
    results:
      'Maintained technical accuracy while adapting content into clear and natural Turkish or English.',
  },
]

export const localizationProcess = [
  {
    title: 'Project Analysis',
    description:
      'I review your content, goals, target audience, tone of voice, and platform requirements before starting the localization process.',
    icon: 'file' as const,
  },
  {
    title: 'Translation & Adaptation',
    description:
      'I translate and adapt the content so it sounds natural, clear, and appropriate for the target market.',
    icon: 'languages' as const,
  },
  {
    title: 'Quality Review',
    description:
      'I review the final text for accuracy, terminology consistency, readability, and cultural suitability.',
    icon: 'check' as const,
  },
  {
    title: 'Delivery & Support',
    description:
      'I deliver the final materials in the required format and provide support for revisions, updates, or implementation questions.',
    icon: 'send' as const,
  },
]

export const aboutBio = [
  'My professional journey started with language, communication, and cultural understanding. I studied English Language Teaching at Middle East Technical University, where I built a strong foundation in English, education, and cross-cultural communication.',
  'Over the years, I turned this background into professional translation and localization experience, working with gaming, e-commerce, technology, academic, and business-related content. I worked with companies such as Limon Games and Kopazar.com, where I translated and localized mobile games, websites, app store listings, support content, and marketing materials.',
  'My experience in the game industry helped me understand how players interact with games, how game content should feel natural in different languages, and how small wording choices can affect user experience, clarity, and trust.',
  'In recent years, I also expanded into web development, creative production, and AI-assisted workflows. I completed a Full Stack Developer Bootcamp and worked on web applications, admin dashboards, QR menu systems, and small creative game-related projects. This technical background helps me better understand digital products, UI text, user flows, and the production needs of modern game and app teams.',
  'Today, I bring together localization, game marketing, creative visuals, content production, and technical understanding to help mobile games and digital products communicate better with their target audiences.',
]

export const aboutExperience = [
  {
    title: 'Customer Experience & Localization Specialist',
    company: 'Kopazar.com',
    period: 'Sep 2024 – Present',
    description:
      'Manage customer communication processes and provide bilingual support for local and international clients. Support communication with foreign partners, participate in meetings as an interpreter, and contribute to website translation, content adaptation, and localization when needed.',
    skills: [
      'Bilingual Support',
      'Customer Communication',
      'Interpreting',
      'Website Localization',
      'Business Communication',
      'Content Adaptation',
    ],
    icon: 'users' as const,
  },
  {
    title: 'Creative Web & Digital Projects',
    company: 'Self-employed',
    period: 'Jun 2024 – Present',
    description:
      'Build small web applications, QR menu systems, admin dashboards, and creative digital projects using JavaScript and React. Also work on AI-assisted visual and content workflows, especially for mobile game ads, promotional content, and creative testing.',
    skills: [
      'React',
      'JavaScript',
      'Web Applications',
      'Admin Dashboards',
      'Creative Workflows',
      'AI-assisted Production',
      'Game-related Projects',
    ],
    icon: 'code' as const,
  },
  {
    title: 'Freelance Translator',
    company: 'Self-employed',
    period: 'Apr 2012 – Jun 2023',
    description:
      'Provided English–Turkish and Turkish–English translation services for individual clients and professionals. Worked on academic texts, medical reports, theses, contract-related documents, technology content, and game-related materials with a focus on accuracy, clarity, and context.',
    skills: [
      'English–Turkish Translation',
      'Turkish–English Translation',
      'Academic Translation',
      'Medical Reports',
      'Technology Content',
      'Game Translation',
    ],
    icon: 'globe' as const,
  },
  {
    title: 'Localization Specialist',
    company: 'Limon Games',
    period: 'Jan 2016 – Oct 2021',
    description:
      'Translated and localized mobile games, website content, in-game text, app store listings, and marketing-related materials. Worked closely with the development team to ensure accurate text adaptation and supported communication with international clients and partners.',
    skills: [
      'Game Localization',
      'Mobile Games',
      'In-game Text',
      'Website Translation',
      'App Store Localization',
      'International Communication',
    ],
    icon: 'globe' as const,
  },
  {
    title: 'Translator & Content Specialist',
    company: 'Kopazar.com',
    period: 'Oct 2011 – Nov 2015',
    description:
      'Supported international customers through bilingual communication in English and Turkish. Translated and localized website content, participated in live meetings as an interpreter, and created blog and news content for gaming and e-commerce audiences.',
    skills: [
      'Bilingual Communication',
      'Website Localization',
      'Interpreting',
      'Content Creation',
      'Blog Writing',
      'Gaming & E-commerce Content',
    ],
    icon: 'book' as const,
  },
]

export const aboutValues = [
  {
    title: 'Clear Communication',
    description:
      'I believe strong communication is the foundation of every successful project. Whether I am localizing a game, adapting marketing content, or working on a creative asset, I focus on making the message clear, natural, and easy to understand.',
    icon: 'message' as const,
  },
  {
    title: 'Cultural Awareness',
    description:
      'Good localization is not just about translating words. It is about understanding the target audience, cultural expectations, tone, and context. I aim to make content feel natural for the people who will actually read, watch, or interact with it.',
    icon: 'users' as const,
  },
  {
    title: 'Creative Practicality',
    description:
      'I like creative ideas that are also usable. My goal is to create content and visuals that look good, communicate clearly, and can realistically work in ads, app stores, websites, or digital campaigns.',
    icon: 'code' as const,
  },
  {
    title: 'Attention to Detail',
    description:
      'Small details matter in localization, UI text, ads, and user-facing content. I pay attention to wording, consistency, tone, and visual presentation so the final result feels polished and professional.',
    icon: 'award' as const,
  },
  {
    title: 'Continuous Learning',
    description:
      'Games, marketing, technology, and AI tools are constantly evolving. I actively follow new tools, workflows, and creative approaches to improve the quality and efficiency of my work.',
    icon: 'book' as const,
  },
]
