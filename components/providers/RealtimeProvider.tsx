'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import {
  subscribeNotifications,
  unsubscribeNotifications,
} from '@/lib/services/notifications'

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

    const notificationChannel =
      subscribeNotifications(
        user.id,
        (notification, eventType) => {
          if (eventType !== 'INSERT') return

          // Don't show popup if user is already
          // inside the same conversation.

          const currentPath =
            window.location.pathname

          const search =
            new URLSearchParams(
              window.location.search
            )

          const currentConversation =
            search.get('conversation')

          if (
            currentPath === '/messages' &&
            currentConversation ===
              notification.conversation_id
          ) {
            return
          }

          toast.custom(() => (
            <div className="bg-[#1f2937] text-white rounded-xl shadow-xl px-4 py-3 min-w-[320px] border border-white/10">
              <div className="font-semibold text-white">
                {notification.title}
              </div>

              <div className="text-sm text-slate-300 mt-1">
                {notification.body}
              </div>
            </div>
          ))
        }
      )

    return () => {
      console.log(
        'GLOBAL REALTIME STOPPED FOR:',
        user.id
      )

      unsubscribeMessages(channel)
      unsubscribeNotifications(notificationChannel)
    }
  }, [user?.id])

  return <>{children}</>
}