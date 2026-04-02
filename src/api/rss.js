import { DEFAULT_JSON_BASE_URL, DEFAULT_XML_BASE_URL } from '../utils/constants'
import { parseRssXml } from '../utils/xmlParser'

export async function fetchJsonFeed({
  channel,
  limit = 10,
  sortBy = 'date',
  sortOrder = 'DESC',
  apikey,
  baseUrl = DEFAULT_JSON_BASE_URL,
}) {
  const params = new URLSearchParams()
  if (channel) params.set('channel', channel)
  if (limit) params.set('limit', String(limit))
  if (sortBy) params.set('sortBy', sortBy)
  if (sortOrder) params.set('sortOrder', sortOrder)
  if (apikey) params.set('apikey', apikey)

  const url = `${baseUrl}?${params.toString()}`
  const start = performance.now()

  try {
    const res = await fetch(url)
    const elapsed = Math.round(performance.now() - start)
    const data = await res.json()

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: data.error || `HTTP ${res.status}`,
        status: res.status,
        elapsed,
      }
    }

    const items = (data.news || []).map(normalizeJsonItem)
    const contentLevel = detectContentLevel(items)

    return {
      success: true,
      title: data.title_channel || '',
      rowCount: data.row_count || items.length,
      items,
      contentLevel,
      elapsed,
    }
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Network error',
      status: 0,
      elapsed: Math.round(performance.now() - start),
    }
  }
}

export async function fetchXmlFeed({
  channel,
  apikey,
  baseUrl = DEFAULT_XML_BASE_URL,
}) {
  const channelPath = channel.replace(/,/g, '_')
  const params = new URLSearchParams()
  if (apikey) params.set('apikey', apikey)
  const qs = params.toString()
  const url = `${baseUrl}/${channelPath}.rss${qs ? '?' + qs : ''}`
  const start = performance.now()

  try {
    const res = await fetch(url, { redirect: 'follow' })
    const elapsed = Math.round(performance.now() - start)

    if (!res.ok) {
      return {
        success: false,
        error: `HTTP ${res.status}`,
        status: res.status,
        elapsed,
      }
    }

    const text = await res.text()
    const parsed = parseRssXml(text)
    const contentLevel = detectContentLevel(parsed.items)

    return {
      ...parsed,
      contentLevel,
      rowCount: parsed.items.length,
      elapsed,
      rawXml: text,
    }
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Network error',
      status: 0,
      elapsed: Math.round(performance.now() - start),
    }
  }
}

function normalizeJsonItem(item) {
  return {
    title: item.title || '',
    description: item.description || '',
    date: item.created_date || 0,
    author: item.created_by || '',
    url: item.url_news || '',
    thumbnail: item.thumbnail || null,
    content: item.content || null,
  }
}

function detectContentLevel(items) {
  if (!items || items.length === 0) return 'title'
  const first = items[0]
  if (first.content) return 'full'
  if (first.thumbnail) return 'summary'
  return 'title'
}
