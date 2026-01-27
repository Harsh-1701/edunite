// components/ui/Input.tsx
// Reusable input field with label and icons

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
}

export function Input({ 
  className, 
  label, 
  error, 
  icon: Icon, 
  ...props 
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          className={cn(
            'w-full px-4 py-3 rounded-xl',
            'bg-gray-50 dark:bg-gray-800',
            'border-2 border-gray-200 dark:border-gray-700',
            'text-gray-900 dark:text-gray-100',
            'placeholder-gray-400',
            'transition-all duration-300',
            'focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20',
            Icon && 'pl-12',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}