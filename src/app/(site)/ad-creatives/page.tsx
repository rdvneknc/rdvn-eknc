'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import PortfolioGridCard from '@/components/PortfolioGridCard'
import CtaBanner from '@/components/home/CtaBanner'
import {
  PORTFOLIO_PAGE_SIZE,
  portfolioFilters,
  type PortfolioFilterId,
} from '@/data/site'
import { usePortfolio } from '@/hooks/usePortfolio'

const AdCreativesPage = () => {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterId>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const { items: portfolioItems, loading } = usePortfolio()

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return portfolioItems
    return portfolioItems.filter((item) => item.category === activeFilter)
  }, [activeFilter, portfolioItems])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PORTFOLIO_PAGE_SIZE))

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PORTFOLIO_PAGE_SIZE
    return filteredItems.slice(start, start + PORTFOLIO_PAGE_SIZE)
  }, [filteredItems, currentPage])

  const handleFilterChange = (filterId: PortfolioFilterId) => {
    setActiveFilter(filterId)
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
  }

  return (
    <div className="portfolio-page">
      <div className="page-container portfolio-page-inner">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="portfolio-page-header"
        >
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="section-title portfolio-page-title">Ad Creatives</h1>
          <p className="portfolio-page-description">
            A selection of mobile game ad videos, UGC-style creatives, and promotional visuals.
            Click play on any project to watch.
          </p>
        </motion.header>

        <div className="portfolio-filters" role="tablist" aria-label="Filter portfolio">
          {portfolioFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`portfolio-filter-btn ${
                activeFilter === filter.id ? 'portfolio-filter-btn-active' : ''
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {loading && <p className="portfolio-page-description">Loading videos...</p>}
          {!loading &&
            paginatedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="portfolio-grid-item"
              >
                <PortfolioGridCard item={item} />
              </motion.div>
            ))}
        </div>

        {totalPages > 1 && (
          <nav className="portfolio-pagination" aria-label="Portfolio pagination">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="portfolio-pagination-btn portfolio-pagination-arrow"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`portfolio-pagination-btn ${
                  currentPage === page ? 'portfolio-pagination-btn-active' : ''
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="portfolio-pagination-btn portfolio-pagination-arrow"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </div>

      <CtaBanner />
    </div>
  )
}

export default AdCreativesPage
