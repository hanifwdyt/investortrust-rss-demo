import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CHANNELS, SORT_OPTIONS } from '../utils/constants'
import ArticleList from '../components/ArticleList'
import ContentLevelBadge from '../components/ContentLevelBadge'
import { useRssFeed } from '../hooks/useRssFeed'

export default function Channel({ settings, onContentLevel }) {
  const { name } = useParams()
  const channel = CHANNELS.find(c => c.id === name)
  const { data, loading, error, fetchFeed } = useRssFeed()

  const [limit, setLimit] = useState(10)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('DESC')

  useEffect(() => {
    if (data?.contentLevel) onContentLevel(data.contentLevel)
  }, [data?.contentLevel])

  useEffect(() => {
    fetchFeed({
      channel: name,
      limit,
      sortBy,
      sortOrder,
      apikey: settings.apikey,
      format: settings.format,
      jsonBaseUrl: settings.jsonBaseUrl,
      xmlBaseUrl: settings.xmlBaseUrl,
    })
  }, [name, limit, sortBy, sortOrder, settings.apikey, settings.format])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{channel?.name || name}</span>
        </div>
        <div className="flex items-center gap-4 mb-2">
          {channel && <span className="text-4xl">{channel.icon}</span>}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {channel?.name || name}
            </h1>
            {channel && (
              <p className="text-gray-600 dark:text-gray-400">{channel.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Limit:</label>
          <select
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          >
            {[5, 10, 20, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Sort:</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={() => setSortOrder(o => o === 'DESC' ? 'ASC' : 'DESC')}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          >
            {sortOrder === 'DESC' ? '↓ Newest' : '↑ Oldest'}
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {data && (
            <>
              <ContentLevelBadge level={data.contentLevel} />
              <span className="text-xs text-gray-400">{data.rowCount} items &middot; {data.elapsed}ms</span>
            </>
          )}
        </div>
      </div>

      {/* Other channels */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CHANNELS.filter(c => c.id !== name).map(ch => (
          <Link
            key={ch.id}
            to={`/channel/${ch.id}`}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary transition-colors border border-gray-200 dark:border-gray-700"
          >
            <span>{ch.icon}</span>
            <span>{ch.name}</span>
          </Link>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
          <p className="font-medium">Error: {error.error}</p>
          <p className="text-sm mt-1">Status: {error.status} &middot; {error.elapsed}ms</p>
        </div>
      )}

      {/* Articles */}
      <ArticleList
        items={data?.items}
        loading={loading}
        contentLevel={data?.contentLevel}
      />
    </div>
  )
}
