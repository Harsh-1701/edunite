type Props = {
  typing: boolean
  name: string
}

export default function TypingIndicator({
  typing,
  name,
}: Props) {
  if (!typing) return null

  return (
    <p className="text-sm text-green-400 animate-pulse">
      {name} is typing...
    </p>
  )
}