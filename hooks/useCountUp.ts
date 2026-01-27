// hooks/useCountUp.ts
// Animates numbers counting up

'use client'

import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  start?: number
  end: number
  duration?: number
  enabled?: boolean
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!enabled) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + (end - start) * eased)

      setCount(current)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [start, end, duration, enabled])

  return count
}