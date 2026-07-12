import { supabase } from '@/lib/supabase'

export async function setTyping(
  conversationId: string,
  userId: string,
  typing: boolean
) {

  const { data, error } = await supabase
    .from("typing_status")
    .upsert(
      {
        conversation_id: conversationId,
        user_id: userId,
        typing,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "conversation_id,user_id",
      }
    )
    .select()

  if (error) throw error
}
type TypingPayload = {
  conversation_id: string
  user_id: string
  typing: boolean
  updated_at: string
}
export function subscribeTyping(
  conversationId: string,
  callback: (payload: TypingPayload) => void
) {
  return supabase
    .channel(`typing-${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'typing_status',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        callback(payload.new as TypingPayload)
    }
    )
    .subscribe()
}

export function unsubscribeTyping(channel: any) {
  supabase.removeChannel(channel)
}