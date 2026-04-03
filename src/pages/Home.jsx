import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CHANNELS } from '../utils/constants'
import ChannelCard from '../components/ChannelCard'
import ArticleList from '../components/ArticleList'
import { useRssFeed } from '../hooks/useRssFeed'

const CHECK_ICON = (
  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const TIERS = [
  {
    name: 'Basic',
    highlight: false,
    badge: 'bg-gray-500',
    border: 'border-divider',
    bg: 'bg-white',
    features: [
      { label: 'Content Level', value: 'Title Only' },
      { label: 'Max Items', value: '10 / request' },
      { label: 'Data Delay', value: '60 menit' },
      { label: 'Rate Limit', value: '100 req/jam' },
      { label: 'Akses Channel', value: 'Terbatas' },
    ],
  },
  {
    name: 'Standard',
    highlight: true,
    popular: true,
    badge: 'bg-primary',
    border: 'border-primary',
    bg: 'bg-primary/3',
    features: [
      { label: 'Content Level', value: 'Summary + Thumbnail' },
      { label: 'Max Items', value: '25 / request' },
      { label: 'Data Delay', value: '15 menit' },
      { label: 'Rate Limit', value: '500 req/jam' },
      { label: 'Akses Channel', value: 'Sebagian besar' },
    ],
  },
  {
    name: 'Premium',
    highlight: false,
    badge: 'bg-amber-500',
    border: 'border-amber-300',
    bg: 'bg-amber-50/50',
    features: [
      { label: 'Content Level', value: 'Full Content' },
      { label: 'Max Items', value: '50 / request' },
      { label: 'Data Delay', value: 'Real-time' },
      { label: 'Rate Limit', value: '2.000 req/jam' },
      { label: 'Akses Channel', value: 'Semua channel' },
    ],
  },
]

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
      <section className="text-center py-14 sm:py-20">
        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-medium px-3 py-1 rounded-full mb-6">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18-.5 13 0 13 0s.5 5.5 0 12c-7.18.5-13 0-13 0s-.5-5.5 0-12z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9l5 3-5 3V9z" />
          </svg>
          RSS Feed Integration Demo
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-title mb-4 tracking-tight">
          InvestorTrust <span className="text-primary">RSS Feed</span>
        </h1>
        <p className="text-lg text-subtitle max-w-2xl mx-auto mb-2">
          Demonstrasi integrasi RSS Feed dari InvestorTrust
        </p>
        <p className="text-sm text-desc max-w-xl mx-auto mb-8">
          Platform ini menunjukkan bagaimana partner dapat mengkonsumsi berita melalui RSS Feed dengan tiered access content.
        </p>
        {!settings.apikey && (
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2.5 rounded-lg text-sm border border-amber-200">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3l9.66 16.59A1 1 0 0120.84 21H3.16a1 1 0 01-.82-1.41L12 3z" />
            </svg>
            Public access — title only, max 10 items. Klik Settings untuk masukkan API key.
          </div>
        )}
      </section>

      {/* Tier Comparison */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-title mb-2">Partner Tier System</h2>
          <p className="text-subtitle text-sm">Akses konten berdasarkan tier partnership</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map(tier => (
            <div
              key={tier.name}
              className={`relative rounded-[10px] border-2 p-6 ${tier.border} ${tier.bg} ${tier.highlight ? 'md:-mt-2 md:mb-[-8px] shadow-lg' : ''} transition-all`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    Recommended
                  </span>
                </div>
              )}
              <div className="text-center mb-6 pt-1">
                <span className={`${tier.badge} text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide`}>
                  {tier.name}
                </span>
              </div>
              <div className="space-y-3">
                {tier.features.map((feat) => (
                  <div key={feat.label} className="flex items-center gap-3 text-sm">
                    {CHECK_ICON}
                    <span className="text-subtitle">{feat.label}</span>
                    <span className="font-medium text-title ml-auto text-right">{feat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-subtitle mt-5">
          * Nilai tier bersifat ilustratif. Konfigurasi aktual per partner dapat disesuaikan.
        </p>
      </section>

      {/* Channels */}
      <section className="mb-14">
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
          <Link to="/channel/market" className="text-sm text-primary hover:underline font-medium">
            Lihat semua &rarr;
          </Link>
        </div>
        {error && (
          <div className="flex items-start gap-3 bg-red-50 text-red-700 p-4 rounded-[10px] mb-6 border border-red-200">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">{error.message || error.error}</p>
              {error.status > 0 && (
                <p className="text-sm mt-1 text-red-500">Status: {error.status} &middot; {error.elapsed}ms</p>
              )}
            </div>
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
