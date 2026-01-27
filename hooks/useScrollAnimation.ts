// hooks/useScrollAnimation.ts
// Detects when element is visible on screen for animations

'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}