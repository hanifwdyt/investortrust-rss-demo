const levelConfig = {
  title: { label: 'Title Only', color: 'bg-gray-500' },
  summary: { label: 'Summary', color: 'bg-blue-500' },
  full: { label: 'Full Content', color: 'bg-green-500' },
}

export default function ContentLevelBadge({ level }) {
  const config = levelConfig[level] || levelConfig.title
  return (
    <span className={`${config.color} text-white text-xs px-2 py-1 rounded-full font-medium`}>
      {config.label}
    </span>
  )
}
