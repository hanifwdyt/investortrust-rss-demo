export const CHANNELS = [
  { id: 'market', name: 'Market', icon: '📈', description: 'Berita pasar saham, IHSG, dan instrumen investasi' },
  { id: 'business', name: 'Business', icon: '💼', description: 'Berita korporasi dan dunia bisnis' },
  { id: 'macro', name: 'Macro', icon: '🌐', description: 'Ekonomi makro, kebijakan fiskal dan moneter' },
  { id: 'financial', name: 'Financial', icon: '🏦', description: 'Perbankan, fintech, dan sektor keuangan' },
  { id: 'international', name: 'International', icon: '🌍', description: 'Berita ekonomi dan pasar global' },
  { id: 'esg', name: 'ESG', icon: '🌱', description: 'Environmental, Social, and Governance' },
  { id: 'national', name: 'National', icon: '🇮🇩', description: 'Berita nasional terkait ekonomi' },
  { id: 'financialtrust', name: 'Financial Trust', icon: '🔒', description: 'Analisis dan insight keuangan terpercaya' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '✨', description: 'Gaya hidup dan personal finance' },
  { id: 'indepth', name: 'In-Depth', icon: '🔍', description: 'Laporan investigasi dan analisis mendalam' },
]

export const DEFAULT_JSON_BASE_URL = 'https://dev.engine.investortrust.id/api/interface/rss'
export const DEFAULT_XML_BASE_URL = 'https://www.investortrust-uat.site/rss'
export const SITE_URL = 'https://investortrust.id'

export const SORT_OPTIONS = [
  { value: 'date', label: 'Tanggal Publish' },
  { value: 'createdAt', label: 'Tanggal Dibuat' },
  { value: 'titlePost', label: 'Judul' },
]
