import { Link } from 'react-router-dom'
import ChannelIcon from './ChannelIcon'

export default function ChannelCard({ channel }) {
  return (
    <Link
      to={`/channel/${channel.id}`}
      className="group flex flex-col items-center p-5 bg-white rounded-[10px] border border-divider hover:border-primary/50 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
        <ChannelIcon id={channel.id} size="lg" />
      </div>
      <h3 className="font-bold text-sm text-title group-hover:text-primary transition-colors text-center">
        {channel.name}
      </h3>
      <p className="text-xs text-subtitle text-center mt-1 line-clamp-2">
        {channel.description}
      </p>
    </Link>
  )
}
