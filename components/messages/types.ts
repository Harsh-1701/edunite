export type TabType =
  | 'chats'
  | 'announcements'
  | 'ai-assistant'

export type AiMessage = {
  role: 'user' | 'assistant'
  content: string
  image?: string
}

export type Conversation = {
  id: number
  name: string
  role: string

  company: string | null

  online: boolean
  lastSeen: string | null

  lastMessage: string
  time: string
  unread: number
}

export type Message = {
  id: number
  sender: 'me' | 'other'
  text: string
  time: string
}

export type Announcement = {
  id: number
  author: string
  role: string
  company: string | null
  content: string
  time: string
  reactions: {
    likes: number
    hearts: number
  }
}