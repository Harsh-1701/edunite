'use client'

import {
  useState,
  useRef,
  useEffect,
} from 'react'

import {
  Bot,
  Sparkles,
  Loader2,
  Send,
  ArrowLeft,
  Image as ImageIcon,
  X,
} from 'lucide-react'

import toast from 'react-hot-toast'

import { AiMessage } from './types'

type Props = {
  onBack?: () => void
}

export default function AIChat({
  onBack,
}: Props) {
  const [aiMessage, setAiMessage] =
    useState('')

  const [aiMessages, setAiMessages] =
    useState<AiMessage[]>([
      {
        role: 'assistant',
        content: `👋 Welcome to EduNite AI

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

"Help me prepare for interviews"
`,
      },
    ])

  const [aiLoading, setAiLoading] =
    useState(false)

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null)

  const [imagePreview, setImagePreview] =
    useState<string | null>(null)

  const aiChatEndRef =
    useRef<HTMLDivElement>(null)

  const imageInputRef =
    useRef<HTMLInputElement>(null)

  useEffect(() => {
    aiChatEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [aiMessages])

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

  const handleAiSend = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (
      !aiMessage.trim() &&
      !selectedImage
    )
      return

    const userMsg: AiMessage = {
      role: 'user',
      content:
        aiMessage ||
        'Analyze this image',
      image:
        imagePreview || undefined,
    }

    setAiMessages(prev => [
      ...prev,
      userMsg,
    ])

    const currentMessage =
      aiMessage

    const currentImage =
      selectedImage

    setAiMessage('')
    setSelectedImage(null)
    setImagePreview(null)

    if (imageInputRef.current)
      imageInputRef.current.value = ''

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
                'Analyze image',
            }),
          }
        )

        const data =
          await res.json()

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
              message:
                currentMessage,
            }),
          }
        )

        const data =
          await res.json()

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
    } catch {
      toast.error(
        'AI request failed'
      )
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="flex items-center gap-4 px-6 py-5 border-b border-white/10">

        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}

        <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600">
          <Bot className="w-6 h-6 text-white" />
        </div>

        <div>
          <h2 className="text-white font-semibold">
            EduNite AI
          </h2>

          <p className="text-purple-300 text-sm">
            Career Mentor
          </p>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        {aiMessages.map(
          (msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-3xl px-5 py-4 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'bg-white/10 text-white border border-white/10'
                }`}
              >
                {msg.role ===
                  'assistant' && (
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-purple-300" />

                    <span className="text-xs text-purple-300 uppercase">
                      EduNite AI
                    </span>
                  </div>
                )}

                {msg.image && (
                  <img
                    src={msg.image}
                    alt=""
                    className="rounded-2xl mb-4"
                  />
                )}

                {renderAiContent(
                  msg.content
                )}
              </div>
            </div>
          )
        )}

        {aiLoading && (
          <Loader2 className="animate-spin text-purple-400" />
        )}

        <div ref={aiChatEndRef} />

      </div>

      {imagePreview && (
        <div className="px-6">

          <div className="relative inline-block">

            <img
              src={imagePreview}
              className="h-24 rounded-2xl"
              alt=""
            />

            <button
              onClick={
                removeImage
              }
              className="absolute -top-2 -right-2"
            >
              <X />
            </button>

          </div>

        </div>
      )}

      <form
        onSubmit={
          handleAiSend
        }
        className="p-5 border-t border-white/10 flex gap-3"
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
        >
          <ImageIcon />
        </button>

        <input
          value={aiMessage}
          onChange={e =>
            setAiMessage(
              e.target.value
            )
          }
          className="flex-1 px-5 py-4 rounded-2xl bg-white/10 text-white"
          placeholder="Ask EduNite AI..."
        />

        <button
          type="submit"
          disabled={
            aiLoading
          }
          className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          <Send className="text-white" />
        </button>

      </form>

    </div>
  )
}