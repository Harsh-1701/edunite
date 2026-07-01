'use client'

import { MessageCircle } from 'lucide-react'
import { Conversation } from './types'

type Props = {
  conversations: any[]
  selectedChat: string | null
  onSelect: (id: string) => void
}

export default function ConversationList({
  conversations,
  selectedChat,
  onSelect,
}: Props) {
  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id as string)}
          className={`w-full p-4 rounded-2xl transition-all text-left ${
            selectedChat === conv.id
              ? 'bg-purple-600/20 border border-purple-500/30'
              : 'bg-white/5 hover:bg-white/10 border border-transparent'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                {(conv.name || '?')
                  .split(' ')
                  .map((n: string) => n[0])
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

            {conv.unread > 0 && (
              <div className="min-w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs text-white px-2">
                {conv.unread}
              </div>
            )}
          </div>
        </button>
      ))}

      {conversations.length === 0 && (
        <div className="text-center py-10 text-slate-400">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p>No conversations yet.</p>
        </div>
      )}
    </div>
  )
}