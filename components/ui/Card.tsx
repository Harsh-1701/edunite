// components/ui/Card.tsx
// Glass-style card component

'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean
}

export function Card({ className, children, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white/80 dark:bg-gray-800/80',
        'backdrop-blur-xl',
        'border border-gray-200 dark:border-gray-700',
        'rounded-2xl shadow-lg',
        'p-6',
        'transition-all duration-300',
        hover && 'hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn('text-xl font-semibold', className)}>{children}</h3>
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>
}