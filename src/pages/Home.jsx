import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CHANNELS } from '../utils/constants'
import ChannelCard from '../components/ChannelCard'
import ArticleList from '../components/ArticleList'
import { useRssFeed } from '../hooks/useRssFeed'

export default function Home({ settings }) {
  const { data, loading, error, fetchFeed } = useRssFeed()

  useEffect(() => {
    fetchFeed({
      channel: 'market,business,macro',
      limit: 6,
      apikey: settings.apikey,
      format: settings.format,
      jsonBaseUrl: settings.jsonBaseUrl,
      xmlBaseUrl: settings.xmlBaseUrl,
    })
  }, [settings.apikey, settings.format, settings.jsonBaseUrl, settings.xmlBaseUrl])

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          InvestorTrust <span className="text-primary">News</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Portal berita yang mengkonsumsi RSS Feed dari InvestorTrust.
          Demonstrasi integrasi partner dengan tiered access content.
        </p>
        {!settings.apikey && (
          <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Public access — title only, max 10 items. Klik Settings untuk masukkan API key.
          </div>
        )}
      </section>

      {/* Channels */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Channels</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{CHANNELS.length} channels</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CHANNELS.map(ch => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Berita Terbaru</h2>
          <Link to="/channel/market" className="text-sm text-primary hover:underline">
            Lihat semua &rarr;
          </Link>
        </div>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
            <p className="font-medium">Error: {error.error}</p>
            <p className="text-sm mt-1">Status: {error.status} &middot; {error.elapsed}ms</p>
          </div>
        )}
        <ArticleList
          items={data?.items}
          loading={loading}
          contentLevel={data?.contentLevel}
        />
        {data && (
          <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
            {data.rowCount} artikel &middot; Content level: {data.contentLevel} &middot; {data.elapsed}ms
          </div>
        )}
      </section>
    </div>
  )
}
