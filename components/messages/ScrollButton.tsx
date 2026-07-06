import { ChevronDown } from 'lucide-react'

type Props = {
  onClick: () => void
}

export default function ScrollButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-2xl flex items-center justify-center transition-all"
    >
      <ChevronDown className="w-6 h-6" />
    </button>
  )
}