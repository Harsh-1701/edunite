'use client'

import {
  useState,
  useRef,
  useEffect,
} from 'react'

import { Plus, Send } from 'lucide-react'

import { useAuth } from '@/components/providers/AuthProvider'

import { setTyping } from '@/lib/services/typing'

type Props = {
  conversationId: string
  onSend?: (
    message: string
  ) => Promise<void> | void
}

export default function MessageInput({
  conversationId,
  onSend,
}: Props) {
  const [message, setMessage] =
    useState('')

  const [isSending, setIsSending] =
    useState(false)

  const { user } = useAuth()

  const typingTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    )

  const isCurrentlyTyping = useRef(false)

  const handleTyping = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value

    setMessage(value)

    if (!user) return

    /*
      Send typing=true only when typing
      begins, not on every keystroke.
    */
    if (!isCurrentlyTyping.current) {
      isCurrentlyTyping.current = true

      setTyping(
        conversationId,
        user.id,
        true
      ).catch((err) => {
        console.error(
          'Failed to set typing status:',
          err
        )
      })
    }

    /*
      Reset previous inactivity timer.
    */
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current)
    }

    /*
      After 1.5 seconds without typing,
      set typing=false.
    */
    typingTimeout.current = setTimeout(
      () => {
        isCurrentlyTyping.current = false

        setTyping(
          conversationId,
          user.id,
          false
        ).catch((err) => {
          console.error(
            'Failed to clear typing status:',
            err
          )
        })
      },
      1500
    )
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const text = message.trim()

    if (!text || isSending) return

    setIsSending(true)
    setMessage('')

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current)
      typingTimeout.current = null
    }

    isCurrentlyTyping.current = false

    try {
      if (user) {
        await setTyping(
          conversationId,
          user.id,
          false
        )
      }

      await onSend?.(text)
    } catch (err) {
      console.error(
        'MESSAGE SEND FAILED:',
        err
      )

      setMessage(text)
    } finally {
      setIsSending(false)
    }
  }

  /*
    When switching chats or unmounting,
    clean up the timer and typing status.
  */
  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(
          typingTimeout.current
        )
      }

      if (
        user &&
        isCurrentlyTyping.current
      ) {
        setTyping(
          conversationId,
          user.id,
          false
        ).catch(console.error)
      }
    }
  }, [conversationId, user])

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
          disabled={isSending}
          className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none disabled:opacity-70"
        />

        <button
          type="submit"
          disabled={
            isSending ||
            !message.trim()
          }
          className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5 text-white" />
        </button>

      </div>
    </form>
  )
}