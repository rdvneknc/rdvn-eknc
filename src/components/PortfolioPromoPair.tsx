'use client'

import type { PortfolioItem } from '@/data/site'
import PortfolioGridCard from './PortfolioGridCard'

interface PortfolioPromoPairProps {
  items: PortfolioItem[]
}

const PortfolioPromoPair = ({ items }: PortfolioPromoPairProps) => {
  return (
    <div
      className={`portfolio-promo-pair ${items.length === 1 ? 'portfolio-promo-pair--single' : ''}`}
    >
      {items.map((item) => (
        <PortfolioGridCard key={item.id} item={item} variant="promo-stack" />
      ))}
    </div>
  )
}

export default PortfolioPromoPair
