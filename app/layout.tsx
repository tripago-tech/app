import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/utility/ErrorBoundary'
import { FloatingAIButton } from '@/components/ui/FloatingAIButton'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TripScope.AI - Intelligent Travel Discovery Platform',
  description: 'Discover, compare, and book travel experiences with AI-enhanced recommendations. Combining the best of hotel booking and community reviews.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ErrorBoundary>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                {children}
              </main>
              <Footer />
              <FloatingAIButton />
            </div>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
