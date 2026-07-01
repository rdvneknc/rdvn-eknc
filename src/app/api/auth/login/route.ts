import { NextResponse } from 'next/server'
import {
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const password = String(body.password || '')

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = createSessionToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set(sessionCookieOptions(token))
    return response
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
