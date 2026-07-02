import { randomUUID } from 'crypto'
import {
  categoryToBadge,
  isPromoVisualItem,
  MAX_FEATURED_VIDEOS,
  sortPortfolioByDisplayOrder,
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
    displayOrder: item.displayOrder,
    createdAt: item.createdAt,
  }
}

export async function listPortfolioItems(options?: {
  featured?: boolean
}): Promise<PortfolioItem[]> {
  const items = await getPortfolioItems()
  let filtered = items

  if (options?.featured) {
    filtered = items
      .filter((item) => item.featured && !isPromoVisualItem(item))
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .slice(0, MAX_FEATURED_VIDEOS)
  } else {
    filtered = sortPortfolioByDisplayOrder(items)
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
  const isPromo = isPromoVisualItem({ category: input.category })

  if (isPromo) {
    if (!input.thumbnail) {
      throw new Error('THUMBNAIL_REQUIRED')
    }
  } else {
    const videoId = extractYouTubeId(input.youtubeUrl)
    if (!videoId) {
      throw new Error('INVALID_YOUTUBE_URL')
    }
  }

  const items = await getPortfolioItems()
  const featuredCount = countFeatured(items)
  const featured = isPromo ? false : input.featured

  if (featured && featuredCount >= MAX_FEATURED_VIDEOS) {
    throw new Error('FEATURED_LIMIT_REACHED')
  }

  const now = new Date().toISOString()
  const nextOrder = Math.max(-1, ...items.map((item) => item.displayOrder)) + 1

  const videoId = isPromo ? '' : extractYouTubeId(input.youtubeUrl)!

  const item: StoredPortfolioItem = {
    id: randomUUID(),
    title: isPromo ? '' : input.title.trim(),
    subtitle: isPromo ? '' : input.subtitle.trim(),
    videoId,
    thumbnail: input.thumbnail ?? null,
    category: input.category,
    badge: categoryToBadge[input.category],
    duration: isPromo ? '—' : input.duration.trim() || '—',
    resolution: isPromo ? '—' : input.resolution.trim() || 'HD',
    featured,
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
  const category = input.category ?? current.category
  const isPromo = isPromoVisualItem({ category })
  const featuredCount = countFeatured(items, id)

  const nextFeatured = isPromo ? false : (input.featured ?? current.featured)

  if (nextFeatured === true && !current.featured && featuredCount >= MAX_FEATURED_VIDEOS) {
    throw new Error('FEATURED_LIMIT_REACHED')
  }

  let videoId = current.videoId
  if (!isPromo && input.youtubeUrl) {
    const parsed = extractYouTubeId(input.youtubeUrl)
    if (!parsed) throw new Error('INVALID_YOUTUBE_URL')
    videoId = parsed
  } else if (isPromo) {
    videoId = ''
  }

  if (isPromo && input.thumbnail === null) {
    throw new Error('THUMBNAIL_REQUIRED')
  }

  const updated: StoredPortfolioItem = {
    ...current,
    title: isPromo ? '' : (input.title?.trim() ?? current.title),
    subtitle: isPromo ? '' : (input.subtitle?.trim() ?? current.subtitle),
    videoId,
    thumbnail: input.thumbnail !== undefined ? input.thumbnail : current.thumbnail,
    category,
    badge: categoryToBadge[category],
    duration: isPromo ? '—' : (input.duration?.trim() ?? current.duration),
    resolution: isPromo ? '—' : (input.resolution?.trim() ?? current.resolution),
    featured: nextFeatured,
    aspectRatio: input.aspectRatio ?? current.aspectRatio ?? '16:9',
    displayOrder: current.displayOrder,
    updatedAt: new Date().toISOString(),
  }

  if (isPromo && !updated.thumbnail) {
    throw new Error('THUMBNAIL_REQUIRED')
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

export async function reorderPortfolioItems(orderedIds: string[]): Promise<PortfolioItem[]> {
  const items = await getPortfolioItems()

  if (orderedIds.length !== items.length) {
    throw new Error('INVALID_ORDER')
  }

  const itemMap = new Map(items.map((item) => [item.id, item]))
  if (orderedIds.some((id) => !itemMap.has(id))) {
    throw new Error('INVALID_ORDER')
  }

  const now = new Date().toISOString()
  const reordered = orderedIds.map((id, index) => ({
    ...itemMap.get(id)!,
    displayOrder: index,
    updatedAt: now,
  }))

  await savePortfolioItems(reordered)
  return reordered.map(toPublicPortfolioItem)
}
