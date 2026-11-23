import HeroSection from '@/components/home/HeroSection'
import FeaturedWork from '@/components/home/FeaturedWork'
import PlayableAdsSection from '@/components/home/PlayableAdsSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProcessSection from '@/components/home/ProcessSection'
import CtaBanner from '@/components/home/CtaBanner'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedWork />
      <PlayableAdsSection />
      <ServicesSection />
      <ProcessSection />
      <CtaBanner />
    </div>
  )
}
