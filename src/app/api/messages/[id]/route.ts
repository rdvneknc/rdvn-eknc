import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth'
import { deleteMessage, updateMessage } from '@/lib/messages'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdminSession()
    const { id } = await context.params
    const body = await request.json()

    const message = await updateMessage(id, {
      read: body.read !== undefined ? Boolean(body.read) : undefined,
      reply: body.reply !== undefined ? String(body.reply) : undefined,
    })

    return NextResponse.json(message)
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession()
    const { id } = await context.params
    await deleteMessage(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
