import { useState, useEffect, useCallback } from 'react'
import { DEFAULT_JSON_BASE_URL, DEFAULT_XML_BASE_URL } from '../utils/constants'

const STORAGE_KEY = 'it-rss-settings'

const defaults = {
  apikey: '',
  jsonBaseUrl: DEFAULT_JSON_BASE_URL,
  xmlBaseUrl: DEFAULT_XML_BASE_URL,
  format: 'json',
  theme: 'light',
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
  }, [settings.theme])

  const updateSettings = useCallback((updates) => {
    setSettingsState(prev => ({ ...prev, ...updates }))
  }, [])

  const toggleTheme = useCallback(() => {
    setSettingsState(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }))
  }, [])

  return { settings, updateSettings, toggleTheme }
}
