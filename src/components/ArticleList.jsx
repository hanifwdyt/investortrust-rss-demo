import ArticleCard from './ArticleCard'

export default function ArticleList({ items, loading, grantedFields }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-[10px] border border-divider overflow-hidden">
            <div className="skeleton h-48 w-full" />
            <div className="p-5 space-y-3">
              <div className="skeleton h-5 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
              <div className="flex justify-between">
                <div className="skeleton h-3 w-24 rounded" />
                <div className="skeleton h-3 w-16 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-12 h-12 mx-auto mb-4 text-divider" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="text-subtitle">Tidak ada artikel ditemukan</p>
      </div>
    )
  }

  const showContent = grantedFields?.has('content') ?? false
  const showBacklinks = grantedFields?.has('backlink') ?? false

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((article, i) => (
        <ArticleCard
          key={`${article.url}-${i}`}
          article={article}
          showContent={showContent}
          showBacklinks={showBacklinks}
        />
      ))}
    </div>
  )
}
