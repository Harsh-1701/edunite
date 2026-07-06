'use client'

import { useRef, useEffect, useState } from 'react'

import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import MessageInput from './MessageInput'

import { Conversation, Message } from './types'

type Props = {
  conversation: Conversation
  messages: Message[]
  typing: boolean
  onBack: () => void
  onSend?: (message: string) => Promise<void> | void
}

export default function ChatWindow({
  conversation,
  messages,
  typing,
  onBack,
  onSend,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [showScrollButton, setShowScrollButton] =
    useState(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    const div = scrollRef.current

    if (!div) return

    const handleScroll = () => {
      const distance =
        div.scrollHeight -
        div.scrollTop -
        div.clientHeight

      setShowScrollButton(distance > 150)
    }

    handleScroll()

    div.addEventListener('scroll', handleScroll)

    return () =>
      div.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  return (
    <>
      <ChatHeader
        name={conversation.name}
        company={conversation.company}
        online={conversation.online}
        lastSeen={conversation.lastSeen}
        typing={typing}
        onBack={onBack}
      />

      <ChatMessages
        messages={messages}
        scrollRef={scrollRef}
        bottomRef={bottomRef}
        showScrollButton={showScrollButton}
      />

      <MessageInput onSend={onSend} />
    </>
  )
}