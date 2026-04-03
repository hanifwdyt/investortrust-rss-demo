import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CHANNELS, SORT_OPTIONS } from '../utils/constants'
import ArticleList from '../components/ArticleList'
import ContentLevelBadge from '../components/ContentLevelBadge'
import { useRssFeed } from '../hooks/useRssFeed'

export default function Channel({ settings, onContentLevel }) {
  const { name } = useParams()
  const channel = CHANNELS.find(c => c.id === name)
  const { data, loading, error, rawResponse, fetchFeed } = useRssFeed()
  const [showRaw, setShowRaw] = useState(false)

  const isXml = settings.format === 'xml'
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
        <div className="flex items-center gap-2 text-sm text-subtitle mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-title">{channel?.name || name}</span>
        </div>
        <div className="flex items-center gap-4 mb-2">
          {channel && <span className="text-4xl">{channel.icon}</span>}
          <div>
            <h1 className="text-3xl font-bold text-title">
              {channel?.name || name}
            </h1>
            {channel && (
              <p className="text-desc">{channel.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-secondary-light rounded-[10px] border border-divider">
        <div className="flex items-center gap-2">
          <label className="text-sm text-subtitle">Limit:</label>
          <select
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
            disabled={isXml}
            className="px-2 py-1 rounded border border-divider bg-white text-sm text-title disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {[5, 10].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-subtitle">Sort:</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            disabled={isXml}
            className="px-2 py-1 rounded border border-divider bg-white text-sm text-title disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={() => setSortOrder(o => o === 'DESC' ? 'ASC' : 'DESC')}
            disabled={isXml}
            className="px-2 py-1 rounded border border-divider bg-white text-sm hover:bg-gray-50 text-title disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sortOrder === 'DESC' ? '↓ Newest' : '↑ Oldest'}
          </button>
        </div>

        {isXml && (
          <span className="text-xs text-amber-600">XML format menggunakan default sorting dari server</span>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {data && (
            <>
              <ContentLevelBadge level={data.contentLevel} />
              <span className="text-xs text-subtitle">{data.rowCount} items &middot; {data.elapsed}ms</span>
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
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-secondary-light text-subtitle hover:bg-primary/10 hover:text-primary transition-colors border border-divider"
          >
            <span>{ch.icon}</span>
            <span>{ch.name}</span>
          </Link>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          <p className="font-medium">{error.message || error.error}</p>
          {error.status > 0 && (
            <p className="text-sm mt-1">Status: {error.status} &middot; {error.elapsed}ms</p>
          )}
        </div>
      )}

      {/* Articles */}
      <ArticleList
        items={data?.items}
        loading={loading}
        contentLevel={data?.contentLevel}
      />

      {/* Raw Response Viewer */}
      {data?.raw && (
        <div className="mt-8">
          <button
            onClick={() => setShowRaw(prev => !prev)}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <svg className={`w-4 h-4 transition-transform ${showRaw ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showRaw ? 'Sembunyikan' : 'Tampilkan'} Raw Response
          </button>
          {showRaw && (
            <pre className="mt-3 p-4 bg-gray-900 text-green-400 rounded-[10px] text-xs overflow-x-auto max-h-96 overflow-y-auto">
              {typeof data.raw === 'string' ? data.raw : JSON.stringify(data.raw, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
