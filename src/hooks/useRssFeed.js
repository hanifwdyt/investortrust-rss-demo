import { useState, useCallback } from 'react'
import { fetchJsonFeed, fetchXmlFeed } from '../api/rss'

export function useRssFeed() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchFeed = useCallback(async ({
    channel,
    limit = 10,
    sortBy = 'date',
    sortOrder = 'DESC',
    apikey,
    format = 'json',
    jsonBaseUrl,
    xmlBaseUrl,
  }) => {
    setLoading(true)
    setError(null)
    setData(null)

    let result
    if (format === 'xml') {
      result = await fetchXmlFeed({ channel, apikey, baseUrl: xmlBaseUrl })
    } else {
      result = await fetchJsonFeed({
        channel,
        limit,
        sortBy,
        sortOrder,
        apikey,
        baseUrl: jsonBaseUrl,
      })
    }

    if (result.success) {
      setData(result)
    } else {
      setError(result)
    }
    setLoading(false)
    return result
  }, [])

  return { data, loading, error, fetchFeed }
}
