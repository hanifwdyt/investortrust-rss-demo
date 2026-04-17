import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Channel from './pages/Channel'
import Article from './pages/Article'
import { useSettings } from './hooks/useSettings'

function App() {
  const { settings, updateSettings } = useSettings()
  const [grantedFields, setGrantedFields] = useState(null)

  return (
    <Layout
      settings={settings}
      updateSettings={updateSettings}
      grantedFields={grantedFields}
    >
      <Routes>
        <Route path="/" element={<Home settings={settings} onGrantedFields={setGrantedFields} />} />
        <Route
          path="/channel/:name"
          element={<Channel settings={settings} onGrantedFields={setGrantedFields} />}
        />
        <Route path="/article" element={<Article />} />
      </Routes>
    </Layout>
  )
}

export default App
