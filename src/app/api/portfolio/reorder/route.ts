import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth'
import { reorderPortfolioItems } from '@/lib/portfolio'

export async function POST(request: Request) {
  try {
    await requireAdminSession()
    const body = await request.json()
    const orderedIds = Array.isArray(body.orderedIds)
      ? body.orderedIds.filter((id: unknown): id is string => typeof id === 'string')
      : []

    if (orderedIds.length === 0) {
      return NextResponse.json({ error: 'orderedIds is required' }, { status: 400 })
    }

    const items = await reorderPortfolioItems(orderedIds)
    return NextResponse.json(items)
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'INVALID_ORDER') {
      return NextResponse.json({ error: 'Invalid item order' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to reorder portfolio' }, { status: 500 })
  }
}
