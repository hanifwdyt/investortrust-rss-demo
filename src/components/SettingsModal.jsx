import { useState } from 'react'

export default function SettingsModal({ settings, onUpdate, onClose }) {
  const [form, setForm] = useState({
    apikey: settings.apikey,
    jsonBaseUrl: settings.jsonBaseUrl,
    xmlBaseUrl: settings.xmlBaseUrl,
    format: settings.format,
  })

  const handleSave = () => {
    onUpdate(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API Key
            </label>
            <input
              type="text"
              value={form.apikey}
              onChange={e => setForm(f => ({ ...f, apikey: e.target.value }))}
              placeholder="Kosong = public access"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Tanpa API key = public access (max 10 items, title only)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Format
            </label>
            <div className="flex gap-2">
              {['json', 'xml'].map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setForm(f => ({ ...f, format: fmt }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    form.format === fmt
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              JSON Base URL
            </label>
            <input
              type="text"
              value={form.jsonBaseUrl}
              onChange={e => setForm(f => ({ ...f, jsonBaseUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              XML Base URL
            </label>
            <input
              type="text"
              value={form.xmlBaseUrl}
              onChange={e => setForm(f => ({ ...f, xmlBaseUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
