import { Link } from 'react-router-dom'
import { formatRelativeDate } from '../utils/formatDate'
import { SITE_URL } from '../utils/constants'

export default function ArticleCard({ article, showContent = false }) {
  const { title, description, date, author, url, thumbnail, content } = article
  const fullUrl = url?.startsWith('http') ? url : `${SITE_URL}${url}`
  const authorName = author?.includes('(') ? author.split('(')[1]?.replace(')', '') : author

  const articleState = { article }

  return (
    <article className="group bg-white rounded-[10px] border border-divider overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      {thumbnail && (
        <Link to="/article" state={articleState} className="block overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={e => { e.target.style.display = 'none' }}
          />
        </Link>
      )}
      <div className="p-5">
        <Link to="/article" state={articleState}>
          <h3 className="text-lg font-bold text-title group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-desc line-clamp-3 mb-3">
          {description}
        </p>

        {showContent && content && (
          <details className="mb-3">
            <summary className="text-sm text-primary cursor-pointer hover:underline">
              Baca selengkapnya
            </summary>
            <div
              className="article-content mt-3 text-sm text-desc border-t border-secondary pt-3"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </details>
        )}

        <div className="flex items-center justify-between text-xs text-subtitle">
          <div className="flex items-center gap-2">
            <span>{authorName}</span>
            <span>&middot;</span>
            <time>{formatRelativeDate(date)}</time>
          </div>
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            investortrust.id
          </a>
        </div>
      </div>
    </article>
  )
}
