import { supabase } from '@/lib/supabase'

export async function getConversations(userId: string) {
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select('*')
    .or(`user_one.eq.${userId},user_two.eq.${userId}`)
    .order('last_message_at', { ascending: false })

  if (error) throw error

  const formatted = []

  for (const conv of conversations ?? []) {
    const otherUserId =
      conv.user_one === userId
        ? conv.user_two
        : conv.user_one

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', otherUserId)
      .single()

    formatted.push({
      id: conv.id,

      user_one: conv.user_one,
      user_two: conv.user_two,

      name: profile?.name || 'Unknown User',

      company: profile?.company || '',

      online: false,

      unread: 0,

      lastMessage:
        conv.last_message || 'Start a conversation',

      time: conv.last_message_at
        ? new Date(
            conv.last_message_at
          ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '',
    })
  }

  return formatted
}