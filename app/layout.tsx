import type { Metadata } from 'next'
import './globals.css'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

import { Providers } from '@/components/Providers'
import { AuthProvider } from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  title: 'EduNite',
  description:
    'AI Powered Alumni Mentorship Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#081120] text-white">

        <Providers>
          <AuthProvider>

            <div className="min-h-screen flex flex-col">

              <Header />

              <main className="flex-1">
                {children}
              </main>

              <Footer />

            </div>

          </AuthProvider>
        </Providers>

      </body>
    </html>
  )
}