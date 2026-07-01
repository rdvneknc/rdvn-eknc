import { createHmac, randomBytes, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7

function getSecret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'change-me-in-production'
}

export function createSessionToken(): string {
  const token = randomBytes(32).toString('hex')
  const signature = createHmac('sha256', getSecret()).update(token).digest('hex')
  return `${token}.${signature}`
}

export function verifySessionToken(value: string | undefined): boolean {
  if (!value) return false

  const [token, signature] = value.split('.')
  if (!token || !signature) return false

  const expected = createHmac('sha256', getSecret()).update(token).digest('hex')

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false

  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected))
  } catch {
    return false
  }
}

export function sessionCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE,
  }
}

export async function requireAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value

  if (!verifySessionToken(token)) {
    throw new Error('UNAUTHORIZED')
  }
}
