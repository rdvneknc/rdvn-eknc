const getSecret = () =>
  process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'change-me-in-production'

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function verifySessionTokenEdge(value: string | undefined): Promise<boolean> {
  if (!value) return false

  const [token, signature] = value.split('.')
  if (!token || !signature) return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signed = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(token))
  const expected = bufferToHex(signed)

  return signature === expected
}
