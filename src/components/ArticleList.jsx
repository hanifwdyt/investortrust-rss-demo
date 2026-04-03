import ArticleCard from './ArticleCard'

export default function ArticleList({ items, loading, contentLevel }) {
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
        <div className="text-4xl mb-4">📭</div>
        <p className="text-subtitle">Tidak ada artikel ditemukan</p>
      </div>
    )
  }

  const showContent = contentLevel === 'full'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((article, i) => (
        <ArticleCard
          key={`${article.url}-${i}`}
          article={article}
          showContent={showContent}
        />
      ))}
    </div>
  )
}
