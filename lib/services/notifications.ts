import { supabase } from '@/lib/supabase'

export type Notification = {
  id: string
  user_id: string
  conversation_id: string | null
  title: string | null
  body: string | null
  read: boolean
  created_at: string
}

/**
 * Get all notifications for a user.
 * Newest notifications appear first.
 */
export async function getNotifications(
  userId: string
) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {
      ascending: false,
    })

  if (error) throw error

  return (data ?? []) as Notification[]
}

/**
 * Get total unread notification count.
 */
export async function getUnreadNotificationCount(
  userId: string
) {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', {
      count: 'exact',
      head: true,
    })
    .eq('user_id', userId)
    .eq('read', false)

  if (error) throw error

  return count ?? 0
}

/**
 * Create a new notification.
 */
export async function createNotification(
  userId: string,
  conversationId: string,
  title: string,
  body: string
) {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      conversation_id: conversationId,
      title,
      body,
      read: false,
    })
    .select()
    .single()

  if (error) throw error

  return data as Notification
}

/**
 * Mark one notification as read.
 */
export async function markNotificationRead(
  notificationId: string
) {
  const { data, error } = await supabase
    .from('notifications')
    .update({
      read: true,
    })
    .eq('id', notificationId)
    .select()
    .single()

  if (error) throw error

  return data as Notification
}

/**
 * Mark all notifications for a user as read.
 */
export async function markAllNotificationsRead(
  userId: string
) {
  const { error } = await supabase
    .from('notifications')
    .update({
      read: true,
    })
    .eq('user_id', userId)
    .eq('read', false)

  if (error) throw error
}

/**
 * Delete one notification.
 */
export async function deleteNotification(
  notificationId: string
) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId)

  if (error) throw error
}

/**
 * Subscribe to realtime notification changes
 * for one specific user.
 */
export function subscribeNotifications(
  userId: string,
  callback: (
    notification: Notification,
    eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  ) => void
) {
  const channelName =
    `notifications-${userId}-${crypto.randomUUID()}`

  const channel = supabase.channel(channelName)

  channel.on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      if (payload.eventType === 'DELETE') {
        callback(
          payload.old as Notification,
          'DELETE'
        )

        return
      }

      callback(
        payload.new as Notification,
        payload.eventType as 'INSERT' | 'UPDATE'
      )
    }
  )

  channel.subscribe((status) => {
    console.log(
      'Notification realtime status:',
      status
    )
  })

  return channel
}

export async function markConversationNotificationsRead(
  userId: string,
  conversationId: string
) {
  const { error } = await supabase
    .from('notifications')
    .update({
      read: true,
    })
    .eq('user_id', userId)
    .eq('conversation_id', conversationId)
    .eq('read', false)

  if (error) throw error
}

/**
 * Unsubscribe from notification realtime channel.
 */
export function unsubscribeNotifications(
  channel: any
) {
  supabase.removeChannel(channel)
}