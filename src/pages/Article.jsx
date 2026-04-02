import { useLocation, Link } from 'react-router-dom'
import { formatDate, formatTime } from '../utils/formatDate'
import { SITE_URL } from '../utils/constants'

export default function Article() {
  const location = useLocation()
  const article = location.state?.article

  if (!article) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📄</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Artikel tidak ditemukan</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Kembali ke halaman utama untuk melihat berita</p>
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
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white line-clamp-1">{title}</span>
      </div>

      {/* Thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-64 sm:h-80 object-cover rounded-xl mb-8"
          onError={e => { e.target.style.display = 'none' }}
        />
      )}

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <span className="font-medium text-gray-700 dark:text-gray-300">{authorName}</span>
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
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8 border-l-4 border-primary">
        <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">{description}</p>
      </div>

      {/* Full Content */}
      {content ? (
        <div
          className="article-content text-gray-800 dark:text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="text-3xl mb-3">🔒</div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Full content tidak tersedia untuk access level saat ini
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
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
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link to="/" className="text-primary hover:underline">&larr; Kembali ke Home</Link>
      </div>
    </article>
  )
}
