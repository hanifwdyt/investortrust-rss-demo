import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CHANNELS, CONTENT_FIELDS, TIER_PRESETS } from '../utils/constants'
import ChannelCard from '../components/ChannelCard'
import ArticleList from '../components/ArticleList'
import { useRssFeed } from '../hooks/useRssFeed'

const CHECK_ICON = (
  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export default function Home({ settings, onGrantedFields }) {
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

  useEffect(() => {
    if (data?.grantedFields) onGrantedFields?.(data.grantedFields)
  }, [data?.grantedFields])

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
          Platform ini menunjukkan bagaimana partner dapat mengkonsumsi berita dengan granular content fields berbasis konfigurasi API key.
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

      {/* Content Fields Legend */}
      <section className="mb-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-title mb-2">Granular Content Fields</h2>
          <p className="text-subtitle text-sm max-w-2xl mx-auto">
            Partner config menentukan field apa saja yang di-expose per request. Kombinasi fleksibel — bukan sekadar 3 tier fixed.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {CONTENT_FIELDS.map(f => (
            <div key={f.key} className="bg-white rounded-[10px] border border-divider p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-primary text-white text-xs font-bold">
                  {f.short}
                </span>
                <span className="font-semibold text-title text-sm">{f.label}</span>
              </div>
              <p className="text-xs text-desc leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tier Comparison */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-title mb-2">Partner Tier Preset</h2>
          <p className="text-subtitle text-sm">Kombinasi granular fields yang umum ditawarkan</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIER_PRESETS.map(tier => {
            const tierFields = new Set(tier.fields)
            return (
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
                <div className="text-center mb-5 pt-1">
                  <span className={`${tier.badge} text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide`}>
                    {tier.name}
                  </span>
                </div>

                {/* Field matrix */}
                <div className="mb-5 p-3 rounded-lg bg-white/70 border border-divider/70">
                  <div className="text-[10px] uppercase tracking-wider text-subtitle font-semibold mb-2 text-center">
                    Content Fields
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {CONTENT_FIELDS.map(f => {
                      const granted = tierFields.has(f.key)
                      return (
                        <div
                          key={f.key}
                          className={[
                            'flex flex-col items-center gap-1 py-2 rounded',
                            granted ? 'bg-primary/10' : 'bg-gray-50',
                          ].join(' ')}
                          title={`${f.label} — ${granted ? 'included' : 'not included'}`}
                        >
                          <span
                            className={[
                              'w-6 h-6 inline-flex items-center justify-center rounded text-[10px] font-bold',
                              granted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400',
                            ].join(' ')}
                          >
                            {f.short}
                          </span>
                          <span className={`text-[10px] ${granted ? 'text-title font-medium' : 'text-subtitle'}`}>
                            {f.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <TierRow label="Max Items" value={tier.maxItems} />
                  <TierRow label="Data Delay" value={tier.dataDelay} />
                  <TierRow label="Rate Limit" value={tier.rateLimit} />
                  <TierRow label="Akses Channel" value={tier.channels} />
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-center text-xs text-subtitle mt-5">
          * Nilai tier bersifat ilustratif. Admin dapat atur kombinasi granular per partner via CMS.
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
          grantedFields={data?.grantedFields}
        />
        {data && (
          <div className="mt-4 text-center text-xs text-subtitle">
            {data.rowCount} artikel &middot; {fieldsSummary(data.grantedFields)} &middot; {data.elapsed}ms
          </div>
        )}
      </section>
    </div>
  )
}

function TierRow({ label, value }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {CHECK_ICON}
      <span className="text-subtitle">{label}</span>
      <span className="font-medium text-title ml-auto text-right">{value}</span>
    </div>
  )
}

function fieldsSummary(grantedFields) {
  if (!grantedFields || grantedFields.size === 0) return 'No fields'
  const labels = CONTENT_FIELDS.filter(f => grantedFields.has(f.key)).map(f => f.label)
  return labels.join(' + ')
}
