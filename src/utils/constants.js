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

export const CONTENT_FIELDS = [
  {
    key: 'title',
    label: 'Title',
    short: 'T',
    desc: 'Judul artikel + meta description',
  },
  {
    key: 'thumbnail',
    label: 'Thumbnail',
    short: 'Th',
    desc: 'URL gambar utama artikel',
  },
  {
    key: 'content',
    label: 'Content',
    short: 'C',
    desc: 'Body HTML lengkap artikel',
  },
  {
    key: 'backlink',
    label: 'Backlinks',
    short: 'B',
    desc: 'Link referensi "Baca Juga" terkait',
  },
]

export const TIER_PRESETS = [
  {
    name: 'Basic',
    highlight: false,
    badge: 'bg-gray-500',
    border: 'border-divider',
    bg: 'bg-white',
    fields: ['title'],
    maxItems: '10 / request',
    rateLimit: '100 req/jam',
    dataDelay: '60 menit',
    channels: 'Terbatas',
  },
  {
    name: 'Standard',
    highlight: true,
    popular: true,
    badge: 'bg-primary',
    border: 'border-primary',
    bg: 'bg-primary/3',
    fields: ['title', 'thumbnail'],
    maxItems: '25 / request',
    rateLimit: '500 req/jam',
    dataDelay: '15 menit',
    channels: 'Sebagian besar',
  },
  {
    name: 'Premium',
    highlight: false,
    badge: 'bg-amber-500',
    border: 'border-amber-300',
    bg: 'bg-amber-50/50',
    fields: ['title', 'thumbnail', 'content', 'backlink'],
    maxItems: '50 / request',
    rateLimit: '2.000 req/jam',
    dataDelay: 'Real-time',
    channels: 'Semua channel',
  },
]
