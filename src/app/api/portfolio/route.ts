import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth'
import {
  createPortfolioItem,
  listPortfolioItems,
  type PortfolioInput,
} from '@/lib/portfolio'
import type { PortfolioCategory, VideoAspectRatio } from '@/data/site'

const VALID_ASPECT_RATIOS: VideoAspectRatio[] = ['16:9', '9:16', '1:1', '4:5']

function parseAspectRatio(value: unknown): VideoAspectRatio {
  if (typeof value === 'string' && VALID_ASPECT_RATIOS.includes(value as VideoAspectRatio)) {
    return value as VideoAspectRatio
  }
  return '16:9'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const items = await listPortfolioItems({ featured: featured || undefined })
    return NextResponse.json(items)
  } catch {
    return NextResponse.json({ error: 'Failed to load portfolio' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession()
    const body = await request.json()

    const input: PortfolioInput = {
      title: String(body.title || ''),
      subtitle: String(body.subtitle || ''),
      youtubeUrl: String(body.youtubeUrl || ''),
      thumbnail: body.thumbnail ? String(body.thumbnail) : null,
      category: body.category as PortfolioCategory,
      duration: String(body.duration || '—'),
      resolution: String(body.resolution || 'HD'),
      featured: Boolean(body.featured),
      aspectRatio: parseAspectRatio(body.aspectRatio),
    }

    if (!input.title || !input.youtubeUrl) {
      return NextResponse.json({ error: 'Title and YouTube URL are required' }, { status: 400 })
    }

    const item = await createPortfolioItem(input)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'INVALID_YOUTUBE_URL') {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }
    if (error instanceof Error && error.message === 'FEATURED_LIMIT_REACHED') {
      return NextResponse.json(
        { error: 'You can feature up to 10 videos on the homepage' },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
  }
}
