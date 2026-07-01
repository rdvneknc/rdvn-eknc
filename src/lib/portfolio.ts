import { randomUUID } from 'crypto'
import {
  categoryToBadge,
  MAX_FEATURED_VIDEOS,
  type PortfolioCategory,
  type PortfolioItem,
  type VideoAspectRatio,
} from '@/data/site'
import {
  getPortfolioItems,
  savePortfolioItems,
  type StoredPortfolioItem,
} from '@/lib/db'
import { extractYouTubeId } from '@/lib/youtube'

export function toPublicPortfolioItem(item: StoredPortfolioItem): PortfolioItem {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    videoId: item.videoId,
    thumbnail: item.thumbnail ?? null,
    category: item.category,
    badge: item.badge,
    duration: item.duration,
    resolution: item.resolution,
    featured: item.featured,
    aspectRatio: item.aspectRatio ?? '16:9',
  }
}

export async function listPortfolioItems(options?: {
  featured?: boolean
}): Promise<PortfolioItem[]> {
  const items = await getPortfolioItems()
  let filtered = items

  if (options?.featured) {
    filtered = items
      .filter((item) => item.featured)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .slice(0, MAX_FEATURED_VIDEOS)
  } else {
    filtered = [...items].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  return filtered.map(toPublicPortfolioItem)
}

export interface PortfolioInput {
  title: string
  subtitle: string
  youtubeUrl: string
  thumbnail?: string | null
  category: PortfolioCategory
  duration: string
  resolution: string
  featured: boolean
  aspectRatio: VideoAspectRatio
}

function countFeatured(items: StoredPortfolioItem[], excludeId?: string) {
  return items.filter((item) => item.featured && item.id !== excludeId).length
}

export async function createPortfolioItem(input: PortfolioInput): Promise<PortfolioItem> {
  const videoId = extractYouTubeId(input.youtubeUrl)
  if (!videoId) {
    throw new Error('INVALID_YOUTUBE_URL')
  }

  const items = await getPortfolioItems()
  const featuredCount = countFeatured(items)

  if (input.featured && featuredCount >= MAX_FEATURED_VIDEOS) {
    throw new Error('FEATURED_LIMIT_REACHED')
  }

  const now = new Date().toISOString()
  const nextOrder = input.featured
    ? Math.max(-1, ...items.filter((item) => item.featured).map((item) => item.displayOrder)) + 1
    : 0

  const item: StoredPortfolioItem = {
    id: randomUUID(),
    title: input.title.trim(),
    subtitle: input.subtitle.trim(),
    videoId,
    thumbnail: input.thumbnail ?? null,
    category: input.category,
    badge: categoryToBadge[input.category],
    duration: input.duration.trim() || '—',
    resolution: input.resolution.trim() || 'HD',
    featured: input.featured,
    aspectRatio: input.aspectRatio,
    displayOrder: nextOrder,
    createdAt: now,
    updatedAt: now,
  }

  items.push(item)
  await savePortfolioItems(items)
  return toPublicPortfolioItem(item)
}

export async function updatePortfolioItem(
  id: string,
  input: Partial<PortfolioInput>
): Promise<PortfolioItem> {
  const items = await getPortfolioItems()
  const index = items.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error('NOT_FOUND')
  }

  const current = items[index]
  const featuredCount = countFeatured(items, id)

  if (input.featured === true && !current.featured && featuredCount >= MAX_FEATURED_VIDEOS) {
    throw new Error('FEATURED_LIMIT_REACHED')
  }

  let videoId = current.videoId
  if (input.youtubeUrl) {
    const parsed = extractYouTubeId(input.youtubeUrl)
    if (!parsed) throw new Error('INVALID_YOUTUBE_URL')
    videoId = parsed
  }

  const category = input.category ?? current.category
  const featured = input.featured ?? current.featured

  const updated: StoredPortfolioItem = {
    ...current,
    title: input.title?.trim() ?? current.title,
    subtitle: input.subtitle?.trim() ?? current.subtitle,
    videoId,
    thumbnail: input.thumbnail !== undefined ? input.thumbnail : current.thumbnail,
    category,
    badge: categoryToBadge[category],
    duration: input.duration?.trim() ?? current.duration,
    resolution: input.resolution?.trim() ?? current.resolution,
    featured,
    aspectRatio: input.aspectRatio ?? current.aspectRatio ?? '16:9',
    displayOrder:
      featured && !current.featured
        ? Math.max(-1, ...items.filter((item) => item.featured).map((item) => item.displayOrder)) + 1
        : current.displayOrder,
    updatedAt: new Date().toISOString(),
  }

  items[index] = updated
  await savePortfolioItems(items)
  return toPublicPortfolioItem(updated)
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const items = await getPortfolioItems()
  const next = items.filter((item) => item.id !== id)

  if (next.length === items.length) {
    throw new Error('NOT_FOUND')
  }

  await savePortfolioItems(next)
}
