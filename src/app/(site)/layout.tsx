import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import InteractiveEffects from '@/components/InteractiveEffects'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <InteractiveEffects />
      <Navigation />
      <main className="main-content min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  )
}
