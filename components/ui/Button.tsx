// components/ui/Button.tsx
// Reusable button with different styles

'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled,
  children, 
  ...props 
}: ButtonProps) {
  
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full active:scale-95'
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
    secondary: 'bg-white dark:bg-gray-800 text-purple-600 border-2 border-purple-200 hover:bg-purple-50',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  )
}