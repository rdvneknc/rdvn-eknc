export function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim()

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed
  }

  try {
    const url = new URL(trimmed)
    const host = url.hostname.replace('www.', '')

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0]
      return id.length === 11 ? id : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const watchId = url.searchParams.get('v')
      if (watchId && watchId.length === 11) return watchId

      const shortsMatch = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/)
      if (shortsMatch) return shortsMatch[1]

      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/)
      if (embedMatch) return embedMatch[1]
    }
  } catch {
    return null
  }

  return null
}
