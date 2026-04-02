export function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = new Date(typeof timestamp === 'number' ? timestamp : timestamp)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatRelativeDate(timestamp) {
  if (!timestamp) return ''
  const date = new Date(typeof timestamp === 'number' ? timestamp : timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`
  return formatDate(timestamp)
}

export function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = new Date(typeof timestamp === 'number' ? timestamp : timestamp)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
