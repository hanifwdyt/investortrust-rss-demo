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
        className="bg-white rounded-[10px] shadow-2xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-title">Settings</h2>
          <button onClick={onClose} className="text-subtitle hover:text-title">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-title mb-1">
              API Key
            </label>
            <input
              type="text"
              value={form.apikey}
              onChange={e => setForm(f => ({ ...f, apikey: e.target.value }))}
              placeholder="Kosong = public access"
              className="w-full px-3 py-2 border border-divider rounded-lg bg-white text-title placeholder-subtitle focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-xs text-subtitle">
              Tanpa API key = public access (max 10 items, title only)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-title mb-1">
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
                      : 'bg-secondary-light text-subtitle hover:bg-secondary'
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
            {form.format === 'xml' && (
              <p className="mt-1 text-xs text-amber-600">
                XML format menggunakan default sorting (tanggal terbaru) dan limit dari server.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-title mb-1">
              JSON Base URL
            </label>
            <input
              type="text"
              value={form.jsonBaseUrl}
              onChange={e => setForm(f => ({ ...f, jsonBaseUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-divider rounded-lg bg-white text-title text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-title mb-1">
              XML Base URL
            </label>
            <input
              type="text"
              value={form.xmlBaseUrl}
              onChange={e => setForm(f => ({ ...f, xmlBaseUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-divider rounded-lg bg-white text-title text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-divider text-subtitle hover:bg-secondary-light transition-colors"
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
