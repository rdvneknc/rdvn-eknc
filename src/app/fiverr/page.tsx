'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Video,
  Sparkles,
  User,
  Play,
  ImageIcon,
  Globe,
} from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import PortfolioGridCard from '@/components/PortfolioGridCard'
import PortfolioPromoPair from '@/components/PortfolioPromoPair'
import {
  isPromoVisualItem,
  PORTFOLIO_PAGE_SIZE,
  portfolioFilters,
  services,
  sortPortfolioByDisplayOrder,
  type PortfolioFilterId,
} from '@/data/site'
import { usePortfolio } from '@/hooks/usePortfolio'
import {
  buildPortfolioGridUnits,
  getPortfolioCardVariant,
  type PortfolioGridUnit,
} from '@/lib/portfolio-grid'

const serviceIconMap = {
  video: Video,
  sparkles: Sparkles,
  user: User,
  play: Play,
  image: ImageIcon,
  globe: Globe,
}

const FiverrPortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterId>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const { items: portfolioItems, loading } = usePortfolio()

  const gridUnits = useMemo((): PortfolioGridUnit[] => {
    if (activeFilter === 'all') {
      return buildPortfolioGridUnits(portfolioItems)
    }

    if (activeFilter === 'promo-visuals') {
      return buildPortfolioGridUnits(portfolioItems.filter((item) => isPromoVisualItem(item)))
    }

    return sortPortfolioByDisplayOrder(
      portfolioItems.filter(
        (item) => !isPromoVisualItem(item) && item.category === activeFilter
      )
    ).map((item) => ({ kind: 'card' as const, item, key: item.id }))
  }, [activeFilter, portfolioItems])

  const totalPages = Math.max(1, Math.ceil(gridUnits.length / PORTFOLIO_PAGE_SIZE))

  const paginatedUnits = useMemo(() => {
    const start = (currentPage - 1) * PORTFOLIO_PAGE_SIZE
    return gridUnits.slice(start, start + PORTFOLIO_PAGE_SIZE)
  }, [currentPage, gridUnits])

  const handleFilterChange = (filterId: PortfolioFilterId) => {
    setActiveFilter(filterId)
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
  }

  const renderMotionItem = (
    key: string,
    index: number,
    children: ReactNode,
    className = 'portfolio-grid-item'
  ) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={className}
    >
      {children}
    </motion.div>
  )

  const renderGridUnit = (unit: PortfolioGridUnit) => {
    if (unit.kind === 'landscape-pair') {
      return <PortfolioPromoPair items={unit.items} />
    }

    return (
      <PortfolioGridCard item={unit.item} variant={getPortfolioCardVariant(unit.item)} />
    )
  }

  return (
    <div className="portfolio-page fiverr-page">
      <div className="page-container portfolio-page-inner">
        <section className="fiverr-services content-section">
          <div className="content-section-heading">
            <SectionLabel>Services</SectionLabel>
            <h2 className="section-title">What I Offer</h2>
            <p className="content-section-subtitle">
              Creative production focused on ads, promo visuals, and campaign-ready assets.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = serviceIconMap[service.icon]
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="service-card"
                >
                  <Icon className="service-icon" />
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-text">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="fiverr-work content-section">
          <div className="content-section-heading">
            <SectionLabel>Work</SectionLabel>
            <h2 className="section-title">Portfolio Samples</h2>
            <p className="content-section-subtitle">
              A selection of mobile game ad videos, UGC-style creatives, and promotional visuals.
            </p>
          </div>

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

          {loading && <p className="portfolio-page-description">Loading portfolio...</p>}

          {!loading && (
            <div className="portfolio-grid">
              {paginatedUnits.map((unit, index) =>
                renderMotionItem(unit.key, index, renderGridUnit(unit))
              )}
            </div>
          )}

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
        </section>
      </div>
    </div>
  )
}

export default FiverrPortfolioPage
