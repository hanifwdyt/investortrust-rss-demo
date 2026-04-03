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

  const { title, description, date, author, url, thumbnail, content } = article
  const fullUrl = url?.startsWith('http') ? url : `${SITE_URL}${url}`
  const authorName = author?.includes('(') ? author.split('(')[1]?.replace(')', '') : author

  return (
    <article className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-subtitle mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-title line-clamp-1">{title}</span>
      </div>

      {/* Thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-64 sm:h-80 object-cover rounded-[10px] mb-8"
          onError={e => { e.target.style.display = 'none' }}
        />
      )}

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-title mb-4 leading-tight">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-subtitle mb-8 pb-6 border-b border-divider">
        <span className="font-medium text-title">{authorName}</span>
        <span>&middot;</span>
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
      <div className="bg-secondary-light rounded-[10px] p-6 mb-8 border-l-4 border-primary">
        <p className="text-desc italic leading-relaxed">{description}</p>
      </div>

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
            Full content tidak tersedia untuk access level saat ini
          </p>
          <p className="text-sm text-subtitle mb-4">
            Masukkan API key dengan content_level "full" di Settings, atau baca artikel lengkap di sumber
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

      {/* Back */}
      <div className="mt-12 pt-6 border-t border-divider">
        <Link to="/" className="text-primary hover:underline">&larr; Kembali ke Home</Link>
      </div>
    </article>
  )
}
