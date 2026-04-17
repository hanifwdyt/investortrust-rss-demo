import { CONTENT_FIELDS } from '../utils/constants'

export default function GrantedFieldsBadge({ grantedFields, size = 'md' }) {
  if (!grantedFields) return null
  const dim = size === 'sm' ? 'w-5 h-5 text-[9px]' : 'w-6 h-6 text-[10px]'

  return (
    <div className="inline-flex items-center gap-1" title="Field yang di-expose oleh API">
      {CONTENT_FIELDS.map(f => {
        const granted = grantedFields.has(f.key)
        return (
          <span
            key={f.key}
            title={`${f.label} — ${granted ? 'tersedia' : 'tidak tersedia'}`}
            className={[
              dim,
              'inline-flex items-center justify-center rounded font-bold tracking-tight transition-colors',
              granted
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-400 border border-divider',
            ].join(' ')}
          >
            {f.short}
          </span>
        )
      })}
    </div>
  )
}
