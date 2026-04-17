import { useLocation, Link } from 'react-router-dom'
import { formatDate, formatTime } from '../utils/formatDate'
import { SITE_URL } from '../utils/constants'

export default function Article() {
  const location = useLocation()
  const article = location.state?.article

  if (!article) {
    return (
      <div className="text-center py-20">
        <svg className="w-14 h-14 mx-auto mb-4 text-divider" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h1 className="text-2xl font-bold text-title mb-2">Artikel tidak ditemukan</h1>
        <p className="text-subtitle mb-6">Kembali ke halaman utama untuk melihat berita</p>
        <Link to="/" className="inline-flex px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Kembali ke Home
        </Link>
      </div>
    )
  }

  const { title, description, date, author, url, thumbnail, content, backlinks } = article
  const fullUrl = url?.startsWith('http') ? url : `${SITE_URL}${url}`
  const authorName = author?.includes('(') ? author.split('(')[1]?.replace(')', '') : author
  const hasTitle = Boolean(title)
  const hasBacklinks = Array.isArray(backlinks) && backlinks.length > 0

  return (
    <article className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-subtitle mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-title line-clamp-1">{hasTitle ? title : '[Title tidak tersedia]'}</span>
      </div>

      {/* Thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={hasTitle ? title : 'Article thumbnail'}
          className="w-full h-64 sm:h-80 object-cover rounded-[10px] mb-8"
          onError={e => { e.target.style.display = 'none' }}
        />
      )}

      {/* Header */}
      {hasTitle ? (
        <h1 className="text-3xl sm:text-4xl font-bold text-title mb-4 leading-tight">
          {title}
        </h1>
      ) : (
        <div className="mb-4 p-4 rounded-[10px] bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          <strong>Title tidak di-expose</strong> — API key kamu tidak punya akses ke field <code className="px-1 rounded bg-amber-100">include_title</code>.
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 text-sm text-subtitle mb-8 pb-6 border-b border-divider">
        {authorName && (
          <>
            <span className="font-medium text-title">{authorName}</span>
            <span>&middot;</span>
          </>
        )}
        <time>{formatDate(date)}</time>
        <span>&middot;</span>
        <time>{formatTime(date)}</time>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-primary hover:underline"
        >
          Baca di InvestorTrust &rarr;
        </a>
      </div>

      {/* Description */}
      {description && (
        <div className="bg-secondary-light rounded-[10px] p-6 mb-8 border-l-4 border-primary">
          <p className="text-desc italic leading-relaxed">{description}</p>
        </div>
      )}

      {/* Full Content */}
      {content ? (
        <div
          className="article-content text-desc leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="text-center py-12 bg-secondary-light rounded-[10px]">
          <svg className="w-10 h-10 mx-auto mb-3 text-subtitle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-desc mb-2">
            Full content tidak tersedia untuk API key ini
          </p>
          <p className="text-sm text-subtitle mb-4">
            Hubungi admin untuk enable <code className="px-1 rounded bg-white text-title">include_content</code> di konfigurasi partner, atau baca artikel lengkap di sumber
          </p>
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Baca di InvestorTrust
          </a>
        </div>
      )}

      {/* Backlinks */}
      {hasBacklinks && (
        <section className="mt-10 p-5 bg-primary/5 rounded-[10px] border border-primary/15">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h3 className="text-base font-semibold text-title">Baca Juga</h3>
            <span className="text-xs text-subtitle">({backlinks.length})</span>
          </div>
          <ul className="space-y-2">
            {backlinks.map((bl, idx) => {
              const backlinkUrl = bl.url?.startsWith('http') ? bl.url : `${SITE_URL}${bl.url}`
              return (
                <li key={`${bl.url}-${idx}`}>
                  <a
                    href={backlinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-sm text-primary hover:underline group"
                  >
                    <span className="text-subtitle group-hover:text-primary transition-colors">&rarr;</span>
                    <span>{bl.title || backlinkUrl}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* Back */}
      <div className="mt-12 pt-6 border-t border-divider">
        <Link to="/" className="text-primary hover:underline">&larr; Kembali ke Home</Link>
      </div>
    </article>
  )
}
