import { supabase } from '@/lib/supabase'

export async function loadMessages(conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', {
      ascending: true,
    })

  if (error) throw error

  return data ?? []
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  receiverId: string,
  text: string
) {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      receiver_id: receiverId,
      message: text,
      read: false,
    })
    .select()
    .single()

  if (error) throw error

  await supabase
    .from('conversations')
    .update({
      last_message: text,
      last_message_at: new Date().toISOString(),
    })
    .eq('id', conversationId)

  return data
}

export function subscribeMessages(
  conversationId: string,
  callback: (message: any) => void
) {
    return supabase
    .channel(`messages-${conversationId}`)
    .on(
        'postgres_changes',
        {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
        },
        payload => {
        console.log('Realtime payload:', payload)
        callback(payload.new)
        }
    )
    .subscribe((status) => {
        console.log('Realtime status:', status)
    })
}

export function unsubscribeMessages(channel: any) {
  supabase.removeChannel(channel)
}