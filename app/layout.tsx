// app/layout.tsx
// Root layout that wraps all pages

import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'EduNite - Alumni-Student Mentorship Platform',
  description: 'Connect with verified alumni for mentorship, career guidance, and professional growth.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans">
        <Providers>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}