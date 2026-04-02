import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Channel from './pages/Channel'
import Article from './pages/Article'
import { useSettings } from './hooks/useSettings'

function App() {
  const { settings, updateSettings, toggleTheme } = useSettings()
  const [contentLevel, setContentLevel] = useState(null)

  return (
    <Layout
      settings={settings}
      updateSettings={updateSettings}
      toggleTheme={toggleTheme}
      contentLevel={contentLevel}
    >
      <Routes>
        <Route path="/" element={<Home settings={settings} />} />
        <Route
          path="/channel/:name"
          element={<Channel settings={settings} onContentLevel={setContentLevel} />}
        />
        <Route path="/article" element={<Article />} />
      </Routes>
    </Layout>
  )
}

export default App
