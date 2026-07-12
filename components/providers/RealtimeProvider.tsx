'use client'

import { useEffect } from 'react'

import { useAuth } from '@/components/providers/AuthProvider'

import {
  subscribeIncomingMessages,
  unsubscribeMessages,
  markDelivered,
  markPendingMessagesDelivered,
} from '@/lib/services/messages'

export function RealtimeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()

  useEffect(() => {
    if (!user?.id) return

    console.log(
      'GLOBAL REALTIME STARTED FOR:',
      user.id
    )

    markPendingMessagesDelivered(user.id)
        .catch((error) => {
            console.error(
            'FAILED TO MARK PENDING MESSAGES DELIVERED:',
            error
            )
        })

    const channel = subscribeIncomingMessages(
      user.id,
      async (message) => {
        // Ignore invalid payloads
        if (!message?.id) return

        // Only handle messages meant for this user
        if (message.receiver_id !== user.id) return

        // Already delivered, nothing to do
        if (message.delivered) return

        try {
          await markDelivered(message.id)

          console.log(
            'GLOBAL MESSAGE DELIVERED:',
            message.id
          )
        } catch (error) {
          console.error(
            'FAILED TO MARK MESSAGE DELIVERED:',
            error
          )
        }
      }
    )

    return () => {
      console.log(
        'GLOBAL REALTIME STOPPED FOR:',
        user.id
      )

      unsubscribeMessages(channel)
    }
  }, [user?.id])

  return <>{children}</>
}