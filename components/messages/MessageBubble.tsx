import { Check, CheckCheck } from 'lucide-react'

type Props = {
  sender: 'me' | 'other'
  text: string
  time: string

  delivered: boolean
  read: boolean
}

export default function MessageBubble({
  sender,
  text,
  time,
  delivered,
  read,
}: Props) {
  return (
    <div
      className={`flex ${
        sender === 'me'
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[70%] rounded-3xl px-5 py-4 shadow-lg ${
          sender === 'me'
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
            : 'bg-white/10 border border-white/10 text-white'
        }`}
      >
        <p>{text}</p>

        <div className="flex justify-end items-center gap-1 mt-2">

          <span className="text-[11px] opacity-70">
            {time}
          </span>

          {sender === 'me' && (
            read ? (
              <CheckCheck
                size={15}
                className="text-emerald-300"
              />
            ) : delivered ? (
              <CheckCheck
                size={15}
                className="text-white/80"
              />
            ) : (
              <Check
                size={15}
                className="text-white/80"
              />
            )
          )}

        </div>

      </div>
    </div>
  )
}