import { DEFAULT_JSON_BASE_URL, DEFAULT_XML_BASE_URL } from '../utils/constants'
import { parseRssXml } from '../utils/xmlParser'

const ERROR_MESSAGES = {
  401: 'API key tidak valid atau tidak ditemukan',
  403: 'Akses ditolak — API key mungkin expired, inactive, atau tidak memiliki akses ke channel ini',
  429: 'Rate limit tercapai — terlalu banyak request, coba lagi nanti',
  404: 'Endpoint tidak ditemukan',
  500: 'Server error — coba lagi nanti',
}

function getErrorMessage(status, serverError) {
  return ERROR_MESSAGES[status] || serverError || `HTTP Error ${status}`
}

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
    const res = await fetch(url, { cache: 'no-store' })
    const elapsed = Math.round(performance.now() - start)
    const data = await res.json()

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: data.error || `HTTP ${res.status}`,
        message: getErrorMessage(res.status, data.error),
        status: res.status,
        elapsed,
      }
    }

    const items = (data.news || []).map(normalizeJsonItem)
    const grantedFields = aggregateGrantedFields(items)

    return {
      success: true,
      title: data.title_channel || '',
      rowCount: data.row_count || items.length,
      items,
      grantedFields,
      elapsed,
      raw: data,
    }
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Network error',
      message: 'Gagal terhubung ke server. Periksa koneksi atau URL endpoint.',
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
    const res = await fetch(url, { redirect: 'follow', cache: 'no-store' })
    const elapsed = Math.round(performance.now() - start)

    if (!res.ok) {
      return {
        success: false,
        error: `HTTP ${res.status}`,
        message: getErrorMessage(res.status),
        status: res.status,
        elapsed,
      }
    }

    const text = await res.text()
    const parsed = parseRssXml(text)
    const grantedFields = aggregateGrantedFields(parsed.items)

    return {
      ...parsed,
      grantedFields,
      rowCount: parsed.items.length,
      elapsed,
      raw: text,
    }
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Network error',
      message: 'Gagal terhubung ke server. Periksa koneksi atau URL endpoint.',
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
    backlinks: Array.isArray(item.backlinks) ? item.backlinks : [],
  }
}

function detectItemFields(item) {
  const fields = new Set()
  if (item.title) fields.add('title')
  if (item.thumbnail) fields.add('thumbnail')
  if (item.content) fields.add('content')
  if (item.backlinks && item.backlinks.length > 0) fields.add('backlink')
  return fields
}

function aggregateGrantedFields(items) {
  const granted = new Set()
  if (!items) return granted
  for (const it of items) {
    for (const f of detectItemFields(it)) granted.add(f)
  }
  return granted
}
