import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main className="main-content min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  )
}
