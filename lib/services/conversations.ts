import { supabase } from '@/lib/supabase'

export async function getConversations(userId: string) {
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select('*')
    .or(`user_one.eq.${userId},user_two.eq.${userId}`)
    .order('last_message_at', { ascending: false })

  if (error) throw error

  const formatted = await Promise.all(
    (conversations ?? []).map(async (conv) => {
      const otherUserId =
        conv.user_one === userId
          ? conv.user_two
          : conv.user_one

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', otherUserId)
        .single()

      const {
        count: unreadCount,
        error: unreadError,
      } = await supabase
        .from('messages')
        .select('*', {
          count: 'exact',
          head: true,
        })
        .eq('conversation_id', conv.id)
        .eq('receiver_id', userId)
        .eq('read', false)

      if (unreadError) {
        console.error(
          'Failed to get unread count:',
          unreadError
        )
      }

      return {
        id: conv.id,
        user_one: conv.user_one,
        user_two: conv.user_two,

        name: profile?.name ?? 'Unknown User',
        company: profile?.company ?? '',
        avatar: profile?.avatar_url ?? null,

        online: profile?.is_online ?? false,

        lastSeen: profile?.last_seen ?? null,

        unread: unreadCount ?? 0,

        lastMessage:
          conv.last_message ?? 'Start a conversation',

        time: conv.last_message_at
          ? new Date(
              conv.last_message_at
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '',
      }
    })
  )

  return formatted
}

export function subscribeConversations(
  userId: string,
  callback: () => void
) {
  return supabase
    .channel(`conversations-${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'conversations',
      },
      () => callback()
    )
    .subscribe()
}

export function unsubscribeConversations(
  channel: any
) {
  supabase.removeChannel(channel)
}