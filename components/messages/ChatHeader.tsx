import TypingIndicator from './TypingIndicator'
import { ArrowLeft, Phone, Video } from 'lucide-react'

type Props = {
  name: string
  company: string | null
  online: boolean
  lastSeen: string | null
  typing: boolean
  onBack: () => void
}

export default function ChatHeader({
  name,
  company,
  online,
  lastSeen,
  typing,
  onBack,
}: Props) {
  return (
    <div className="p-5 border-b border-white/10 flex items-center gap-4 bg-slate-900">

      <button
        onClick={onBack}
        className="md:hidden"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
        {name
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>

      <div className="flex-1">

        <h3 className="text-white font-medium">
          {name}
        </h3>

        {typing ? (
          <TypingIndicator
            typing={typing}
            name={name}
          />
        ) : online ? (
          <p className="text-green-400 text-sm">
            ● Online
          </p>
        ) : lastSeen ? (
          <p className="text-slate-400 text-sm">
            Last seen{" "}
            {new Date(lastSeen).toLocaleString([], {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        ) : (
          <p className="text-slate-400 text-sm">
            {company ?? 'Offline'}
          </p>
        )}

      </div>

      <button className="p-2 rounded-xl hover:bg-white/10">
        <Phone className="w-5 h-5 text-white" />
      </button>

      <button className="p-2 rounded-xl hover:bg-white/10">
        <Video className="w-5 h-5 text-white" />
      </button>

    </div>
  )
}