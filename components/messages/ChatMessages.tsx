import MessageBubble from './MessageBubble'
import ScrollButton from './ScrollButton'
import { Message } from './types'

type Props = {
  messages: Message[]
  scrollRef: React.RefObject<HTMLDivElement>
  bottomRef: React.RefObject<HTMLDivElement>
  showScrollButton: boolean
}

export default function ChatMessages({
  messages,
  scrollRef,
  bottomRef,
  showScrollButton,
}: Props) {
  return (
    <div className="relative flex-1 overflow-hidden">

      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto bg-slate-950 p-6 space-y-5"
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            time={msg.time}
            delivered={msg.delivered}
            read={msg.read}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {showScrollButton && (
        <ScrollButton
          onClick={() =>
            bottomRef.current?.scrollIntoView({
              behavior: 'smooth',
            })
          }
        />
      )}

    </div>
  )
}