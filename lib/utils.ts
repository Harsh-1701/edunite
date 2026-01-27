// lib/utils.ts
// Helper functions used throughout the app

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combines CSS class names smartly
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats date to readable string like "Jan 15, 2024"
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Gets initials from name (e.g., "John Doe" → "JD")
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}