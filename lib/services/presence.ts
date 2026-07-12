import { supabase } from '@/lib/supabase'

export async function setOnline(userId: string) {
  console.log('SETTING USER ONLINE:', userId)

  const { error } = await supabase
    .from('profiles')
    .update({
      is_online: true,
      last_seen: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) {
    console.error(error)
  }
}

export async function setOffline(userId: string) {
  console.log('SETTING USER OFFLINE:', userId)

  const { error } = await supabase
    .from('profiles')
    .update({
      is_online: false,
      last_seen: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) {
    console.error(error)
  }
}