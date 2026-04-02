import { useState } from 'react'
import Navbar from './Navbar'
import SettingsModal from './SettingsModal'

export default function Layout({ children, settings, updateSettings, toggleTheme, contentLevel }) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar
        settings={settings}
        toggleTheme={toggleTheme}
        onOpenSettings={() => setShowSettings(true)}
        contentLevel={contentLevel}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400">
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
