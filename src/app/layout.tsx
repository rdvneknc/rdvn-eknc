import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rıdvan Ekinci - Portfolio',
  description: 'Bridging language, technology, and people',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100 antialiased`}>
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
}