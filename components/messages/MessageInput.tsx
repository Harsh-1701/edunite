'use client'

import { useState } from 'react'
import { Plus, Send } from 'lucide-react'
import { useRef } from 'react'
import { setTyping } from '@/lib/services/typing.service'
import { useAuth } from '@/components/providers/AuthProvider'

type Props = {
  onSend?: (message: string) => Promise<void> | void
}

export default function MessageInput({
  onSend,
}: Props) {
  const [message, setMessage] = useState('')

  const { user } = useAuth()

  const typingTimeout = useRef<NodeJS.Timeout>()

  const handleTyping = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessage(e.target.value)

    if (!user) return

    setTyping(user.id, true)

    clearTimeout(typingTimeout.current)

    typingTimeout.current = setTimeout(() => {
      setTyping(user.id, false)
    }, 2000)
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!message.trim()) return

    await onSend?.(message)

    setMessage('')
  }

  if (user) {
    setTyping(user.id, false)
  }

  return (
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
          onChange={handleTyping}
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
  )
}