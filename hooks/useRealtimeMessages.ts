'use client'

import { useEffect, useState } from 'react'
import {
  loadMessages,
  subscribeMessages,
  unsubscribeMessages,
} from '@/lib/services/messages'

export default function useRealtimeMessages(
  conversationId: string | null
) {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      return
    }

    let channel: any

    const init = async () => {
      setLoading(true)

      const data = await loadMessages(conversationId)

      setMessages(data)

      channel = subscribeMessages(
        conversationId,
        (message) => {
          setMessages((prev) => {
            const exists = prev.some(
              (m) => m.id === message.id
            )

            if (exists) return prev

            return [...prev, message]
          })
        }
      )

      setLoading(false)
    }

    init()

    return () => {
      if (channel) {
        unsubscribeMessages(channel)
      }
    }
  }, [conversationId])

  return {
    messages,
    setMessages,
    loading,
  }
}