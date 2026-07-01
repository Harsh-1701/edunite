'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Phone,
  Video,
  Plus,
  Send,
} from 'lucide-react'

import { Conversation, Message } from './types'

type Props = {
  conversation: Conversation
  messages: Message[]
  onBack: () => void
  onSend?: (message: string) => Promise<void> | void
}

export default function ChatWindow({
  conversation,
  messages,
  onBack,
  onSend,
}: Props) {
  const [message, setMessage] =
    useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!message.trim()) return

    await onSend?.(message)

    setMessage('')
  }

  return (
    <>
      {/* HEADER */}

      <div className="p-5 border-b border-white/10 flex items-center gap-4 bg-slate-900">

        <button
          onClick={onBack}
          className="md:hidden"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">

          {conversation.name
            .split(' ')
            .map(n => n[0])
            .join('')}

        </div>

        <div className="flex-1">

          <h3 className="text-white font-medium">
            {conversation.name}
          </h3>

          <p className="text-sm text-slate-400">
            {conversation.company}
          </p>

        </div>

        <div className="flex gap-2">

          <button className="p-2 rounded-xl hover:bg-white/10">
            <Phone className="w-5 h-5 text-white" />
          </button>

          <button className="p-2 rounded-xl hover:bg-white/10">
            <Video className="w-5 h-5 text-white" />
          </button>

        </div>

      </div>

      {/* CHAT */}

      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-950">

        {messages.map(msg => (

          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'me'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >

            <div
              className={`max-w-[70%] rounded-3xl px-5 py-4 ${
                msg.sender === 'me'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-white/10 border border-white/10 text-white'
              }`}
            >

              <p>{msg.text}</p>

              <div className="flex justify-end mt-2">

                <span className="text-xs opacity-70">
                  {msg.time}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* INPUT */}

      <form
        onSubmit={handleSubmit}
        className="p-5 border-t border-white/10 bg-slate-900"
      >

        <div className="flex gap-3 items-center">

          <button
            type="button"
            className="p-3 rounded-2xl bg-white/10"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>

          <input
            value={message}
            onChange={e =>
              setMessage(e.target.value)
            }
            placeholder="Type a message..."
            className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none"
          />

          <button
            type="submit"
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            <Send className="w-5 h-5 text-white" />
          </button>

        </div>

      </form>
    </>
  )
}