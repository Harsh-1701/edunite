'use client'

import React, { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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

import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

const conversations = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'alumni',
    lastMessage: 'Sure, I can help you with the interview prep!',
    time: '2m ago',
    unread: 2,
    online: true,
    company: 'Google',
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    role: 'faculty',
    lastMessage: 'The project deadline has been extended.',
    time: '1h ago',
    unread: 0,
    online: true,
    company: null,
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'alumni',
    lastMessage: 'Check out this job opening at Microsoft!',
    time: '3h ago',
    unread: 1,
    online: false,
    company: 'Microsoft',
  },
]

const announcements = [
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

const dummyMessages = [
  {
    id: 1,
    sender: 'other',
    text: 'Hi! I am interested in learning about product management.',
    time: '10:30 AM',
  },
  {
    id: 2,
    sender: 'me',
    text: 'Hello! Sure, what specific areas are you interested in?',
    time: '10:32 AM',
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
  const { user } = useAuth()

  const defaultTab =
    (searchParams.get('tab') as TabType) || 'chats'

  const [activeTab, setActiveTab] =
    useState<TabType>(defaultTab)

  const [selectedChat, setSelectedChat] =
    useState<number | null>(null)

  const [message, setMessage] = useState('')
  const [feedPost, setFeedPost] = useState('')

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

  const [imagePreview, setImagePreview] =
    useState<string | null>(null)

  const aiChatEndRef = useRef<HTMLDivElement>(null)

  const imageInputRef =
    useRef<HTMLInputElement>(null)

  const isAlumniOrFaculty =
    user?.role === 'alumni' ||
    user?.role === 'faculty'

  useEffect(() => {
    aiChatEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [aiMessages])

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
    )

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
                <div className="space-y-2">
                  {conversations.map(conv => (
                    <button
                      key={conv.id}
                      onClick={() =>
                        setSelectedChat(conv.id)
                      }
                      className={`w-full p-4 rounded-2xl transition-all text-left ${
                        selectedChat === conv.id
                          ? 'bg-purple-600/20 border border-purple-500/30'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                            {conv.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </div>

                          {conv.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-slate-900" />
                          )}
                        </div>

                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium truncate">
                              {conv.name}
                            </h3>

                            <span className="text-xs text-slate-400">
                              {conv.time}
                            </span>
                          </div>

                          <p className="text-sm text-slate-400 truncate">
                            {conv.lastMessage}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* ANNOUNCEMENTS */}
              {activeTab ===
                'announcements' && (
                <div className="space-y-4">

                  {isAlumniOrFaculty && (
                    <form
                      onSubmit={
                        handleFeedPost
                      }
                    >
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
                        <textarea
                          value={feedPost}
                          onChange={e =>
                            setFeedPost(
                              e.target.value
                            )
                          }
                          rows={3}
                          placeholder="Share something..."
                          className="w-full bg-transparent text-white placeholder:text-slate-500 resize-none focus:outline-none"
                        />

                        <div className="flex justify-end mt-3">
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {announcements.map(post => (
                    <div
                      key={post.id}
                      className="bg-white/5 border border-white/10 rounded-3xl p-5"
                    >
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                          {post.author
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-white font-medium">
                            {post.author}
                          </h3>

                          <p className="text-sm text-slate-300 mt-2">
                            {post.content}
                          </p>

                          <div className="flex items-center gap-4 mt-4">
                            <button className="flex items-center gap-1 text-slate-400 hover:text-blue-400">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-xs">
                                {
                                  post.reactions
                                    .likes
                                }
                              </span>
                            </button>

                            <button className="flex items-center gap-1 text-slate-400 hover:text-red-400">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">
                                {
                                  post.reactions
                                    .hearts
                                }
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
            {activeTab ===
              'ai-assistant' && (
              <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">

                {/* HEADER */}
<div className="flex items-center gap-4 px-4 md:px-6 py-5 border-b border-white/10 bg-white/5 backdrop-blur-xl">

  {/* MOBILE BACK BUTTON */}
  <button
    onClick={() => {
      setActiveTab('chats')
      setSelectedChat(null)
    }}
    className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all active:scale-95"
  >
    <ArrowLeft className="w-5 h-5 text-white" />
  </button>

  {/* AI ICON */}
  <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30">
    <Bot className="w-6 h-6 text-white" />
  </div>

  {/* TITLE */}
  <div className="flex-1 min-w-0">
    <h2 className="text-white font-semibold text-lg truncate">
      EduNite AI
    </h2>

    <p className="text-sm text-purple-300 truncate">
      Career Mentor • Resume Builder
    </p>
  </div>

  {/* ONLINE STATUS */}
  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

    <span className="text-xs text-green-300 font-medium">
      Online
    </span>
  </div>
</div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 min-h-0">
                  {aiMessages.map(
                    (msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.role ===
                          'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-xl ${
                            msg.role ===
                            'user'
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md'
                              : 'bg-white/10 border border-white/10 text-white rounded-bl-md backdrop-blur-xl'
                          }`}
                        >
                          {msg.role ===
                            'assistant' && (
                            <div className="flex items-center gap-2 mb-3">
                              <Sparkles className="w-4 h-4 text-purple-300" />

                              <span className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
                                EduNite AI
                              </span>
                            </div>
                          )}

                          {msg.image && (
                            <img
                              src={msg.image}
                              alt="Uploaded"
                              className="rounded-2xl mb-4 max-h-72 object-contain"
                            />
                          )}

                          <div className="text-sm leading-7">
                            {msg.role ===
                            'assistant'
                              ? renderAiContent(
                                  msg.content
                                )
                              : (
                                <p className="whitespace-pre-wrap">
                                  {
                                    msg.content
                                  }
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {aiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 border border-white/10 rounded-3xl px-5 py-4 flex items-center gap-3 backdrop-blur-xl">
                        <Loader2 className="w-5 h-5 animate-spin text-purple-300" />

                        <span className="text-sm text-purple-200">
                          EduNite AI is thinking...
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={aiChatEndRef} />
                </div>

                {/* IMAGE PREVIEW */}
                {imagePreview && (
                  <div className="px-6 pb-3">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-24 rounded-2xl border border-white/10"
                      />

                      <button
                        onClick={
                          removeImage
                        }
                        className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* INPUT */}
                <div className="p-5 border-t border-white/10 bg-slate-900/90 backdrop-blur-2xl">
                  <form
                    onSubmit={
                      handleAiSend
                    }
                    className="flex items-center gap-3"
                  >
                    <input
                      ref={
                        imageInputRef
                      }
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageSelect
                      }
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        imageInputRef.current?.click()
                      }
                      className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ImageIcon className="w-5 h-5 text-purple-200" />
                    </button>

                    <input
                      type="text"
                      value={aiMessage}
                      onChange={e =>
                        setAiMessage(
                          e.target.value
                        )
                      }
                      placeholder="Ask about resumes, internships, interviews..."
                      disabled={aiLoading}
                      className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <button
                      type="submit"
                      disabled={
                        aiLoading ||
                        (!aiMessage.trim() &&
                          !selectedImage)
                      }
                      className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {aiLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* CHAT AREA */}
            {activeTab === 'chats' &&
              selectedChat &&
              selectedConversation && (
                <>
                  <div className="p-5 border-b border-white/10 flex items-center gap-4 bg-slate-900">
                    <button
                      onClick={() =>
                        setSelectedChat(
                          null
                        )
                      }
                      className="md:hidden"
                    >
                      <ArrowLeft className="w-5 h-5 text-white" />
                    </button>

                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                      {selectedConversation.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-medium">
                        {
                          selectedConversation.name
                        }
                      </h3>

                      <p className="text-sm text-slate-400">
                        {
                          selectedConversation.company
                        }
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-xl hover:bg-white/10">
                        <Phone className="w-5 h-5 text-white" />
                      </button>

                      <button className="p-2 rounded-xl hover:bg-white/10">
                        <Video className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-950">
                    {dummyMessages.map(
                      msg => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender ===
                            'me'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-3xl px-5 py-4 ${
                              msg.sender ===
                              'me'
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                : 'bg-white/10 text-white border border-white/10'
                            }`}
                          >
                            <p>
                              {msg.text}
                            </p>

                            <div className="flex justify-end mt-2">
                              <span className="text-xs opacity-70">
                                {msg.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <form
                    onSubmit={
                      handleSendMessage
                    }
                    className="p-5 border-t border-white/10 bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="p-3 rounded-2xl bg-white/10"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </button>

                      <input
                        type="text"
                        value={message}
                        onChange={e =>
                          setMessage(
                            e.target.value
                          )
                        }
                        placeholder="Type a message..."
                        className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none"
                      />

                      <button
                        type="submit"
                        className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </>
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