import { Link } from 'react-router-dom'

export default function ChannelCard({ channel }) {
  return (
    <Link
      to={`/channel/${channel.id}`}
      className="group flex flex-col items-center p-6 bg-white rounded-[10px] border border-divider hover:border-primary/50 hover:shadow-lg transition-all duration-300"
    >
      <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{channel.icon}</span>
      <h3 className="font-bold text-title group-hover:text-primary transition-colors">
        {channel.name}
      </h3>
      <p className="text-xs text-subtitle text-center mt-1 line-clamp-2">
        {channel.description}
      </p>
    </Link>
  )
}
