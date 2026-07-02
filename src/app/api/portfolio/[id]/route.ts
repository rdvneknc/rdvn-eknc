import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth'
import { deletePortfolioItem, updatePortfolioItem } from '@/lib/portfolio'
import type { PortfolioCategory, VideoAspectRatio } from '@/data/site'

const VALID_ASPECT_RATIOS: VideoAspectRatio[] = ['16:9', '9:16', '1:1', '4:5']

function parseAspectRatio(value: unknown): VideoAspectRatio | undefined {
  if (value === undefined) return undefined
  if (typeof value === 'string' && VALID_ASPECT_RATIOS.includes(value as VideoAspectRatio)) {
    return value as VideoAspectRatio
  }
  return '16:9'
}

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdminSession()
    const { id } = await context.params
    const body = await request.json()

    const item = await updatePortfolioItem(id, {
      title: body.title !== undefined ? String(body.title) : undefined,
      subtitle: body.subtitle !== undefined ? String(body.subtitle) : undefined,
      youtubeUrl: body.youtubeUrl !== undefined ? String(body.youtubeUrl) : undefined,
      thumbnail: body.thumbnail !== undefined ? String(body.thumbnail) : undefined,
      category: body.category as PortfolioCategory | undefined,
      duration: body.duration !== undefined ? String(body.duration) : undefined,
      resolution: body.resolution !== undefined ? String(body.resolution) : undefined,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
      aspectRatio: parseAspectRatio(body.aspectRatio),
    })

    return NextResponse.json(item)
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }
    if (error instanceof Error && error.message === 'INVALID_YOUTUBE_URL') {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }
    if (error instanceof Error && error.message === 'THUMBNAIL_REQUIRED') {
      return NextResponse.json({ error: 'Image is required for promo visuals' }, { status: 400 })
    }
    if (error instanceof Error && error.message === 'FEATURED_LIMIT_REACHED') {
      return NextResponse.json(
        { error: 'You can feature up to 10 videos on the homepage' },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession()
    const { id } = await context.params
    await deletePortfolioItem(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
  }
}
