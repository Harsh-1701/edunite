import { supabase } from '@/lib/supabase'

export async function setTyping(
  userId: string,
  typing: boolean
) {
  await supabase
    .from('profiles')
    .update({ typing })
    .eq('id', userId)
}

export function subscribeTyping(
  userId: string,
  callback: (typing: boolean) => void
) {
  return supabase
    .channel(`typing-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`,
      },
      payload => {
        callback(payload.new.typing)
      }
    )
    .subscribe()
}

export function unsubscribeTyping(channel: any) {
  supabase.removeChannel(channel)
}