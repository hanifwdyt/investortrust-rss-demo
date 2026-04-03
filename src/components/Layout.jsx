import { useState } from 'react'
import Navbar from './Navbar'
import SettingsModal from './SettingsModal'

export default function Layout({ children, settings, updateSettings, contentLevel }) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="min-h-screen bg-white text-title">
      <Navbar
        settings={settings}
        onOpenSettings={() => setShowSettings(true)}
        contentLevel={contentLevel}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <footer className="border-t border-divider py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-subtitle">
          <p>InvestorTrust RSS Demo &mdash; Website demonstrasi konsumsi RSS Feed</p>
          <p className="mt-1">
            Data dari{' '}
            <a href="https://investortrust.id" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              investortrust.id
            </a>
          </p>
        </div>
      </footer>
      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdate={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
