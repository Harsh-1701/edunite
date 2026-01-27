// components/Providers.tsx
// Wraps all context providers together

'use client'

import React from 'react'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '12px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  )
}