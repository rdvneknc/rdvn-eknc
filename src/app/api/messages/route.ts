import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth'
import { sendContactEmail } from '@/lib/email'
import { createMessage, listMessages } from '@/lib/messages'

export async function GET() {
  try {
    await requireAdminSession()
    const messages = await listMessages()
    return NextResponse.json(messages)
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const input = {
      firstName: String(body.firstName || '').trim(),
      lastName: String(body.lastName || '').trim(),
      email: String(body.email || '').trim(),
      subject: String(body.subject || '').trim(),
      message: String(body.message || '').trim(),
    }

    if (!input.firstName || !input.email || !input.message) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 })
    }

    await sendContactEmail(input)

    // Best-effort local archive for the admin panel (may fail on serverless hosts).
    try {
      await createMessage(input)
    } catch (error) {
      console.warn('Contact message archived locally failed:', error)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Contact form email failed:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
