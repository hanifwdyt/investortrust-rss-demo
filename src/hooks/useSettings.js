import { useState, useEffect, useCallback } from 'react'
import { DEFAULT_JSON_BASE_URL, DEFAULT_XML_BASE_URL } from '../utils/constants'

const STORAGE_KEY = 'it-rss-settings'

const defaults = {
  apikey: '',
  jsonBaseUrl: DEFAULT_JSON_BASE_URL,
  xmlBaseUrl: DEFAULT_XML_BASE_URL,
  format: 'json',
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch {}
  return { ...defaults }
}

export function useSettings() {
  const [settings, setSettingsState] = useState(loadSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSettings = useCallback((updates) => {
    setSettingsState(prev => ({ ...prev, ...updates }))
  }, [])

  return { settings, updateSettings }
}
