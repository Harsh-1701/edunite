'use client'

import {
  setOnline,
  setOffline,
} from '@/lib/services/presence'

import {
  subscribeTyping,
  unsubscribeTyping,
} from '@/lib/services/typing'

import AIChat from '@/components/messages/AIChat'


import ChatWindow from '@/components/messages/ChatWindow'
import ConversationList from '@/components/messages/ConversationList'
import AnnouncementFeed from '@/components/messages/AnnouncementFeed'
import { supabase } from '@/lib/supabase'
import {
    getConversations,
    subscribeConversations,
    unsubscribeConversations,
  } from '@/lib/services/conversations'

import {
  sendMessage,
  subscribeIncomingMessages,
  unsubscribeMessages,
  markDelivered,
} from '@/lib/services/messages'
import useRealtimeMessages from '@/hooks/useRealtimeMessages'
import {
  Conversation,
  Message,
  Announcement,
} from '@/components/messages/types'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  MessageCircle,
  Search,
  Send,
  Phone,
  Video,
  Megaphone,
  Bot,
  ArrowLeft,
  Heart,
  ThumbsUp,
  Briefcase,
  Shield,
  Plus,
  Image as ImageIcon,
  CheckCheck,
  X,
  Loader2,
  Sparkles,
} from 'lucide-react'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'

const AlumniMap = dynamic(
  () => import('@/components/home/AlumniMap'),
  {
    ssr: false,
  }
)

const announcements: Announcement[] = [
  {
    id: 1,
    author: 'Sneha Reddy',
    role: 'alumni',
    company: 'Amazon',
    content:
      '🚀 We are hiring! Amazon is looking for SDE interns. DM me for referral!',
    time: '30m ago',
    reactions: { likes: 45, hearts: 12 },
  },
  {
    id: 2,
    author: 'Prof. Vikram Singh',
    role: 'faculty',
    company: null,
    content:
      '📢 Research internship opportunity at IISc Bangalore.',
    time: '2h ago',
    reactions: { likes: 28, hearts: 5 },
  },
]

const dummyMessages: Message[] = [
  {
    id: 1,
    sender: 'other',
    text: 'Hi! I am interested in learning about product management.',
    time: '10:30 AM',
    delivered: true,
    read: true,
  },
  {
    id: 2,
    sender: 'me',
    text: 'Hello! Sure, what specific areas are you interested in?',
    time: '10:32 AM',
    delivered: true,
    read: false,
  },
]

type TabType = 'chats' | 'announcements' | 'ai-assistant'

type AiMessage = {
  role: 'user' | 'assistant'
  content: string
  image?: string
}

function MessagesContent() {
  const searchParams = useSearchParams()
  const { user, loading } = useAuth()

  const defaultTab = (searchParams.get('tab') as TabType) || 'chats'

  const [activeTab, setActiveTab] = useState<TabType>(defaultTab)

  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const [message, setMessage] = useState('')
  const [feedPost, setFeedPost] = useState('')

  const [conversations, setConversations] = useState<any[]>([])
  const {
    messages,
    loading: messagesLoading,
  } = useRealtimeMessages(selectedChat)

  // AI STATES
  const [aiMessage, setAiMessage] = useState('')

  const [aiMessages, setAiMessages] = useState<AiMessage[]>([
    {
      role: 'assistant',
      content:
        `👋 Welcome to EduNite AI

          I can help you with:

          • Resume building
          • Interview preparation
          • Career guidance
          • Internship roadmap
          • Research opportunities
          • LinkedIn improvements
          • Skill recommendations

          Try asking:
          "Build my resume"
          or
          "Help me prepare for interviews"`
              },
            ])

  const [aiLoading, setAiLoading] = useState(false)

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null)

  const [typingUserId, setTypingUserId] = useState<string | null>(null)

  const [imagePreview, setImagePreview] =
    useState<string | null>(null)

  const aiChatEndRef = useRef<HTMLDivElement>(null)

  const imageInputRef =
    useRef<HTMLInputElement>(null)

 const isAlumniOrFaculty =
  user?.user_metadata?.role === 'alumni' ||
  user?.user_metadata?.role === 'faculty'

  useEffect(() => {
    aiChatEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [aiMessages])

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login'
    }
  }, [loading, user])

  useEffect(() => {
    if (!user) return

    setOnline(user.id)

    const handleUnload = () => {
      navigator.sendBeacon(
        '/api/user/offline',
        JSON.stringify({
          userId: user.id,
        })
      )
    }

    window.addEventListener(
      'beforeunload',
      handleUnload
    )

    return () => {
      window.removeEventListener(
        'beforeunload',
        handleUnload
      )
    }
  }, [user])

  useEffect(() => {
    if (!user) return

    let channel: any

    const load = async () => {
      try {
        const data = await getConversations(user.id)
        setConversations(data)
      } catch (err) {
        console.error(err)
      }
    }

    load()

    channel = subscribeConversations(user.id, load)

    return () => {
      if (channel) {
        unsubscribeConversations(channel)
      }
    }
  }, [user])

  useEffect(() => {
  if (!user) return

  const channel = subscribeIncomingMessages(
    user.id,
    async (message) => {
      if (
        message.receiver_id === user.id &&
        !message.delivered
      ) {
        try {
          await markDelivered(message.id)
        } catch (err) {
          console.error(
            'Failed to mark message delivered:',
            err
          )
        }
      }
    }
  )

  return () => {
    unsubscribeMessages(channel)
  }
}, [user])

  const handleSendMessage = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!message.trim()) return

    setMessage('')
  }

  const handleFeedPost = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!feedPost.trim()) return

    toast.success('Post published!')
    setFeedPost('')
  }

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      const result = reader.result as string
      setSelectedImage(result)
      setImagePreview(result)
    }

    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)

    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }
  }

  const handleAiSend = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!aiMessage.trim() && !selectedImage)
      return

    const userMsg: AiMessage = {
      role: 'user',
      content:
        aiMessage ||
        (selectedImage
          ? 'Analyze this image'
          : ''),
      image: imagePreview || undefined,
    }

    setAiMessages(prev => [...prev, userMsg])

    const currentMessage = aiMessage
    const currentImage = selectedImage

    setAiMessage('')
    setSelectedImage(null)
    setImagePreview(null)

    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }

    setAiLoading(true)

    try {
      let response = ''

      if (currentImage) {
        const res = await fetch(
          '/api/ai/analyze-image',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              image: currentImage,
              prompt:
                currentMessage ||
                'Analyze this image.',
            }),
          }
        )

        const data = await res.json()

        if (!res.ok)
          throw new Error(data.error)

        response = data.response
      } else {
        const res = await fetch(
          '/api/ai/chat',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              message: currentMessage,
            }),
          }
        )

        const data = await res.json()

        if (!res.ok)
          throw new Error(data.error)

        response = data.response
      }

      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: response,
        },
      ])
    } catch (error) {
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            '❌ Something went wrong while generating AI response.',
        },
      ])

      toast.error('AI response failed')
    } finally {
      setAiLoading(false)
    }
  }

  const selectedConversation =
    conversations.find(
      c => c.id === selectedChat
    ) ?? null

  const isOtherUserTyping =
    typingUserId !== null &&
    typingUserId !== user?.id

    useEffect(() => {
      if (!selectedConversation || !user) return

      const otherUserId =
        selectedConversation.user_one === user.id
          ? selectedConversation.user_two
          : selectedConversation.user_one

      const channel = subscribeTyping(
        selectedConversation.id,
        (payload) => {

          // Ignore our own typing updates
          if (payload.user_id === user.id) return

          // Ignore updates from anyone who isn't in this chat
          if (payload.user_id !== otherUserId) return

          if (payload.typing) {
            setTypingUserId(payload.user_id)
          } else {
            setTypingUserId(null)
          }

        }
      )

      return () => {
        unsubscribeTyping(channel)
      }

    }, [selectedConversation, user])

  const renderAiContent = (
    content: string
  ) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (!line.trim())
          return <br key={i} />

        return (
          <p
            key={i}
            className="leading-7"
          >
            {line}
          </p>
        )
      })
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-950 pt-20">
      <div className="h-[calc(100vh-80px)] max-w-7xl mx-auto px-4 pb-4 overflow-hidden">
        <div className="h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl flex">

          {/* SIDEBAR */}
          <div
            className={`w-full md:w-96 border-r border-white/10 flex flex-col bg-slate-900 ${
              (selectedChat ||
                activeTab ===
                  'ai-assistant')
                ? 'hidden md:flex'
                : 'flex'
            }`}
          >
            {/* TABS */}
            <div className="p-4 border-b border-white/10">
              <div className="flex gap-2">
                {[
                  {
                    id: 'chats',
                    label: 'Chats',
                    icon: MessageCircle,
                  },
                  {
                    id: 'announcements',
                    label: 'Feed',
                    icon: Megaphone,
                  },
                  {
                    id: 'ai-assistant',
                    label: 'AI',
                    icon: Bot,
                  },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(
                        tab.id as TabType
                      )
                      setSelectedChat(null)
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />

                    <span className="text-sm font-medium">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* SEARCH */}
            {activeTab !==
              'ai-assistant' && (
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-3">

              {/* CHATS */}
              {activeTab === 'chats' && (
                <ConversationList
                  conversations={conversations}
                  selectedChat={selectedChat}
                  onSelect={setSelectedChat}
                />
              )}

              {/* ANNOUNCEMENTS */}
              {activeTab === 'announcements' && (
                <AnnouncementFeed
                  announcements={announcements}
                  canPost={isAlumniOrFaculty}
                />
              )}

              {/* AI QUICK ACTIONS */}
              {activeTab ===
                'ai-assistant' && (
                <div className="space-y-3">
                  {[
                    'Build My Resume',
                    'Interview Prep',
                    'Career Guidance',
                    'Review Resume',
                  ].map((item, i) => (
                    <button
                      key={i}
                      className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MAIN AREA */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* AI ASSISTANT */}
            {activeTab === 'ai-assistant' && (
              <AIChat
                onBack={() => {
                  setActiveTab('chats')
                  setSelectedChat(null)
                }}
              />
            )}

            {/* CHAT AREA */}
            {activeTab === 'chats' &&
              selectedChat &&
              selectedConversation && (

              
                <ChatWindow
                typing={isOtherUserTyping}
                  conversation={selectedConversation}
                  messages={messages.map((m) => ({
                    id: m.id,
                    sender:
                      m.sender_id === user?.id
                        ? 'me'
                        : 'other',

                    text: m.message,

                    time: new Date(
                      m.created_at
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),

                    delivered: m.delivered,
                    read: m.read,
                  }))}
                  onBack={() => setSelectedChat(null)}
                  onSend={async (text) => {
                    if (!selectedConversation || !user) return

                    const receiverId =
                      selectedConversation.user_one === user.id
                        ? selectedConversation.user_two
                        : selectedConversation.user_one

                    try {
                      await sendMessage(
                        selectedConversation.id,
                        user.id,
                        receiverId,
                        text
                      )
                      const data = await getConversations(user.id)
                      setConversations(data)
                    } catch (err) {
                      console.error(err)
                    }
                  }}
                />
            )}

            {/* EMPTY */}
            {activeTab === 'chats' &&
              !selectedChat && (
                <div className="flex-1 flex items-center justify-center bg-slate-950">
                  <div className="text-center">
                    <div className="inline-flex p-6 rounded-full bg-white/5 mb-4">
                      <MessageCircle className="w-12 h-12 text-slate-500" />
                    </div>

                    <h3 className="text-2xl font-semibold text-white">
                      Your Messages
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Select a conversation
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
          </div>
        }
      >
        <MessagesContent />
      </Suspense>
  )
}