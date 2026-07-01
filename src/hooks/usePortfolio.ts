'use client'

import { useEffect, useState } from 'react'
import type { PortfolioItem } from '@/data/site'

export function usePortfolio(options?: { featured?: boolean }) {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const query = options?.featured ? '?featured=true' : ''

    fetch(`/api/portfolio${query}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Failed to load videos')
        return response.json() as Promise<PortfolioItem[]>
      })
      .then((data) => {
        setItems(data)
        setError(null)
      })
      .catch(() => setError('Could not load videos'))
      .finally(() => setLoading(false))
  }, [options?.featured])

  return { items, loading, error }
}
