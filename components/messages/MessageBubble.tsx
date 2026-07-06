type Props = {
  sender: 'me' | 'other'
  text: string
  time: string
}

export default function MessageBubble({
  sender,
  text,
  time,
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

        <div className="flex justify-end mt-2">
          <span className="text-xs opacity-70">
            {time}
          </span>
        </div>
      </div>
    </div>
  )
}