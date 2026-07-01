import Image from 'next/image'
import { siteConfig } from '@/data/site'

interface SiteLogoProps {
  size?: number
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

const SiteLogo = ({
  size,
  width,
  height,
  className = '',
  priority = false,
}: SiteLogoProps) => {
  const imageWidth = width ?? size ?? 32
  const imageHeight = height ?? size ?? 32

  return (
    <Image
      src={siteConfig.logo}
      alt={`${siteConfig.name} logo`}
      width={imageWidth}
      height={imageHeight}
      className={`site-logo-image ${className}`.trim()}
      priority={priority}
    />
  )
}

export default SiteLogo
