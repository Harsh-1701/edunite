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
  // 1. Insert the actual message
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      receiver_id: receiverId,
      message: text,
      read: false,
      delivered: false,
      read_at: null,
    })
    .select()
    .single()

  if (error) throw error

  // 2. Update conversation preview
  const { error: conversationError } = await supabase
    .from('conversations')
    .update({
      last_message: text,
      last_message_at: new Date().toISOString(),
    })
    .eq('id', conversationId)

  if (conversationError) {
    console.error(
      'FAILED TO UPDATE CONVERSATION:',
      conversationError
    )
  }

  // 3. Get sender name for notification
  const { data: senderProfile } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', senderId)
    .single()

  const senderName =
    senderProfile?.name ?? 'Someone'

  // 4. Create notification for 
  // 
  // receiver
  const { data: notificationData, error: notificationError } =
    await supabase
      .from('notifications')
      .insert({
        user_id: receiverId,
        actor_id: senderId,
        conversation_id: conversationId,
        type: 'message',
        title: senderName,
        body: text,
        read: false,
      })
      .select()
      .single()

  if (notificationError) {
    console.error(
      'FAILED TO CREATE NOTIFICATION:',
      notificationError
    )
  } else {
    console.log(
      'NOTIFICATION CREATED SUCCESSFULLY:',
      notificationData
    )
  }

  return data
}

export async function markDelivered(
  messageId: string
) {
  console.log("Updating delivered:", messageId)

  const { data, error } = await supabase
    .from("messages")
    .update({
      delivered: true,
    })
    .eq("id", messageId)
    .select()

  console.log(data)
  console.log(error)

  if (error) throw error
}

export async function markRead(
  messageId: string
) {
  const { error } = await supabase
    .from('messages')
    .update({
      read: true,
      read_at: new Date().toISOString(),
    })
    .eq('id', messageId)

  if (error) throw error
}

export function subscribeMessages(
  conversationId: string,
  callback: (message: any) => void
) {
  const channelName =
    `messages-${conversationId}-${crypto.randomUUID()}`

  const channel = supabase.channel(channelName)

  channel.on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`,
    },
    (payload) => {
      if (
        payload.eventType !== 'INSERT' &&
        payload.eventType !== 'UPDATE'
      ) {
        return
      }

      console.log(
        'REALTIME EVENT:',
        payload.eventType,
        payload.new
      )

      callback(payload.new)
    }
  )

  channel.subscribe((status) => {
    console.log(
      'Realtime status:',
      channelName,
      status
    )
  })

  return channel
}

export function subscribeIncomingMessages(
  userId: string,
  callback: (message: any) => void
) {
  const channelName =
    `incoming-messages-${userId}-${crypto.randomUUID()}`

  const channel = supabase.channel(channelName)

  channel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${userId}`,
      },
      (payload) => {
        console.log(
          'GLOBAL INCOMING MESSAGE:',
          payload.new
        )

        callback(payload.new)
      }
    )
    .subscribe((status) => {
      console.log(
        'GLOBAL REALTIME STATUS:',
        status
      )
    })

  return channel
}

export async function markPendingMessagesDelivered(
  userId: string
) {
  const { error } = await supabase
    .from('messages')
    .update({
      delivered: true,
    })
    .eq('receiver_id', userId)
    .eq('delivered', false)

  if (error) throw error
}

export function unsubscribeMessages(channel: any) {
  supabase.removeChannel(channel)
}