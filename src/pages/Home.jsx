import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CHANNELS } from '../utils/constants'
import ChannelCard from '../components/ChannelCard'
import ArticleList from '../components/ArticleList'
import { useRssFeed } from '../hooks/useRssFeed'

const TIERS = [
  {
    name: 'Basic',
    color: 'bg-gray-100 border-gray-300',
    badge: 'bg-gray-500',
    features: {
      contentLevel: 'Title Only',
      maxItems: '10 items/request',
      dataDelay: '60 menit',
      rateLimit: '100 req/jam',
      channels: 'Terbatas',
    },
  },
  {
    name: 'Standard',
    color: 'bg-blue-50 border-primary',
    badge: 'bg-primary',
    features: {
      contentLevel: 'Summary + Thumbnail',
      maxItems: '25 items/request',
      dataDelay: '15 menit',
      rateLimit: '500 req/jam',
      channels: 'Sebagian besar',
    },
  },
  {
    name: 'Premium',
    color: 'bg-amber-50 border-amber-400',
    badge: 'bg-amber-500',
    features: {
      contentLevel: 'Full Content + Thumbnail',
      maxItems: '50 items/request',
      dataDelay: 'Real-time',
      rateLimit: '2.000 req/jam',
      channels: 'Semua channel',
    },
  },
]

const FEATURE_LABELS = {
  contentLevel: 'Content Level',
  maxItems: 'Max Items',
  dataDelay: 'Data Delay',
  rateLimit: 'Rate Limit',
  channels: 'Akses Channel',
}

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
        <h1 className="text-4xl sm:text-5xl font-bold text-title mb-4">
          InvestorTrust <span className="text-primary">RSS Feed</span>
        </h1>
        <p className="text-lg text-subtitle max-w-2xl mx-auto mb-2">
          Demonstrasi integrasi RSS Feed dari InvestorTrust
        </p>
        <p className="text-sm text-desc max-w-xl mx-auto mb-6">
          Platform ini menunjukkan bagaimana partner dapat mengkonsumsi berita dari InvestorTrust melalui RSS Feed dengan tiered access content.
        </p>
        {!settings.apikey && (
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg text-sm border border-amber-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Public access — title only, max 10 items. Klik Settings untuk masukkan API key.
          </div>
        )}
      </section>

      {/* Tier Comparison */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-title mb-2">Partner Tier System</h2>
          <p className="text-subtitle text-sm">Akses konten berdasarkan tier partnership</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map(tier => (
            <div key={tier.name} className={`rounded-[10px] border-2 p-6 ${tier.color}`}>
              <div className="text-center mb-5">
                <span className={`${tier.badge} text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide`}>
                  {tier.name}
                </span>
              </div>
              <div className="space-y-3">
                {Object.entries(tier.features).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span className="text-subtitle">{FEATURE_LABELS[key]}</span>
                    <span className="font-medium text-title">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-subtitle mt-4">
          * Nilai tier bersifat ilustratif. Konfigurasi aktual per partner dapat disesuaikan.
        </p>
      </section>

      {/* Channels */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-title">Channels</h2>
          <span className="text-sm text-subtitle">{CHANNELS.length} channels</span>
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
          <h2 className="text-2xl font-bold text-title">Berita Terbaru</h2>
          <Link to="/channel/market" className="text-sm text-primary hover:underline">
            Lihat semua &rarr;
          </Link>
        </div>
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
            <p className="font-medium">{error.message || error.error}</p>
            {error.status > 0 && (
              <p className="text-sm mt-1">Status: {error.status} &middot; {error.elapsed}ms</p>
            )}
          </div>
        )}
        <ArticleList
          items={data?.items}
          loading={loading}
          contentLevel={data?.contentLevel}
        />
        {data && (
          <div className="mt-4 text-center text-xs text-subtitle">
            {data.rowCount} artikel &middot; Content level: {data.contentLevel} &middot; {data.elapsed}ms
          </div>
        )}
      </section>
    </div>
  )
}
