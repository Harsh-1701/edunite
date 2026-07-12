'use client'

import { useEffect, useState } from 'react'

import {
  loadMessages,
  subscribeMessages,
  unsubscribeMessages,
  markDelivered,
  markRead,
} from '@/lib/services/messages'

import { useAuth } from '@/components/providers/AuthProvider'

export default function useRealtimeMessages(
  conversationId: string | null
) {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

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

      if (user) {
        for (const message of data) {
          if (
            message.receiver_id === user.id &&
            !message.read
          ) {
            await markRead(message.id)
          }
        }
      }

      channel = subscribeMessages(
        conversationId,
        async (message) => {
          console.log("Current user:", user?.id)
          console.log("Receiver:", message.receiver_id)
          console.log("Sender:", message.sender_id)
          console.log("Delivered:", message.delivered)

          if (user) {
            console.log(
              "Receiver matches:",
              message.receiver_id === user.id
            )
          }

          if (
            user &&
            message.receiver_id === user.id &&
            !message.read
          ) {
            try {
              await markRead(message.id)
            } catch (err) {
              console.error(err)
            }
          }

          setMessages((prev) => {

            const index = prev.findIndex(
              (m) => m.id === message.id
            )

            if (index >= 0) {
              const updated = [...prev]

              updated[index] = {
                ...updated[index],
                ...message,
              }

              return updated
            }

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
  }, [conversationId, user])

  return {
    messages,
    setMessages,
    loading,
  }
}