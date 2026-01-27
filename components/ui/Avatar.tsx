// components/ui/Avatar.tsx
// User avatar with fallback initials

'use client'

import React from 'react'
import { cn, getInitials } from '@/lib/utils'

interface AvatarProps {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'rounded-full object-cover ring-2 ring-white shadow-lg',
          sizes[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-r from-purple-600 to-indigo-600',
        'flex items-center justify-center text-white font-semibold',
        'ring-2 ring-white shadow-lg',
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}