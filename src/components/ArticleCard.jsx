import { Link } from 'react-router-dom'
import { formatRelativeDate } from '../utils/formatDate'
import { SITE_URL } from '../utils/constants'

export default function ArticleCard({ article, showContent = false, showBacklinks = false }) {
  const { title, description, date, author, url, thumbnail, content, backlinks } = article
  const fullUrl = url?.startsWith('http') ? url : `${SITE_URL}${url}`
  const authorName = author?.includes('(') ? author.split('(')[1]?.replace(')', '') : author
  const hasTitle = Boolean(title)
  const displayTitle = hasTitle ? title : '[Title tidak di-expose]'
  const hasBacklinks = showBacklinks && Array.isArray(backlinks) && backlinks.length > 0

  const articleState = { article }

  return (
    <article className="group bg-white rounded-[10px] border border-divider overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col">
      {thumbnail && (
        <Link to="/article" state={articleState} className="block overflow-hidden">
          <img
            src={thumbnail}
            alt={hasTitle ? title : 'Article thumbnail'}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={e => { e.target.style.display = 'none' }}
          />
        </Link>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <Link to="/article" state={articleState}>
          <h3 className={[
            'text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 mb-2',
            hasTitle ? 'text-title' : 'text-subtitle italic',
          ].join(' ')}>
            {displayTitle}
          </h3>
        </Link>
        {description && (
          <p className="text-sm text-desc line-clamp-3 mb-3">
            {description}
          </p>
        )}

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

        {hasBacklinks && (
          <div className="mb-3 p-3 rounded bg-secondary/30 border border-divider/60">
            <div className="text-[10px] uppercase tracking-wide text-subtitle font-semibold mb-1.5">
              Baca Juga
            </div>
            <ul className="space-y-1">
              {backlinks.slice(0, 2).map((bl, idx) => (
                <li key={`${bl.url}-${idx}`} className="text-xs text-primary truncate">
                  &rarr; {bl.title}
                </li>
              ))}
              {backlinks.length > 2 && (
                <li className="text-[11px] text-subtitle">+{backlinks.length - 2} lainnya</li>
              )}
            </ul>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between text-xs text-subtitle pt-1">
          <div className="flex items-center gap-2 min-w-0">
            {authorName && (
              <>
                <span className="truncate">{authorName}</span>
                <span>&middot;</span>
              </>
            )}
            <time>{formatRelativeDate(date)}</time>
          </div>
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline shrink-0 ml-2"
          >
            investortrust.id
          </a>
        </div>
      </div>
    </article>
  )
}
