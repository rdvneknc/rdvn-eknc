import { isGridPromoItem, isLandscapePromoItem, sortPortfolioByDisplayOrder, type PortfolioItem } from '@/data/site'

export type PortfolioGridUnit =
  | { kind: 'card'; item: PortfolioItem; key: string }
  | { kind: 'landscape-pair'; items: PortfolioItem[]; key: string }

export function buildPortfolioGridUnits(items: PortfolioItem[]): PortfolioGridUnit[] {
  const sorted = sortPortfolioByDisplayOrder(items)
  const units: PortfolioGridUnit[] = []
  let pendingLandscape: PortfolioItem[] = []

  const flushPair = () => {
    if (pendingLandscape.length === 0) return
    units.push({
      kind: 'landscape-pair',
      items: [...pendingLandscape],
      key: pendingLandscape.map((item) => item.id).join('-'),
    })
    pendingLandscape = []
  }

  for (const item of sorted) {
    if (isLandscapePromoItem(item)) {
      pendingLandscape.push(item)
      if (pendingLandscape.length === 2) {
        flushPair()
      }
      continue
    }

    flushPair()
    units.push({ kind: 'card', item, key: item.id })
  }

  flushPair()
  return units
}

export function getPortfolioCardVariant(item: PortfolioItem) {
  return isGridPromoItem(item) ? ('promo-grid' as const) : ('default' as const)
}

// Backwards-compatible alias
export const buildAllViewGridUnits = buildPortfolioGridUnits
