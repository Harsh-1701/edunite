interface AvatarProps {
  name?: string
  image?: string
}

function getInitials(name?: string) {
  if (!name) return 'U'

  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export function Avatar({
  name,
}: AvatarProps) {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 flex items-center justify-center text-white font-semibold">
      {getInitials(name)}
    </div>
  )
}