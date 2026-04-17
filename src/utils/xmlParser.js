export function parseRssXml(xmlText) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'text/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error('Invalid XML: ' + parseError.textContent)
  }

  const channel = doc.querySelector('channel')
  if (!channel) throw new Error('No <channel> found in RSS')

  const items = Array.from(channel.querySelectorAll('item')).map(item => {
    const getText = (tag) => item.querySelector(tag)?.textContent || ''
    const contentEncoded = item.getElementsByTagNameNS(
      'http://purl.org/rss/1.0/modules/content/',
      'encoded'
    )[0]?.textContent

    const enclosure = item.querySelector('enclosure')
    const backlinks = extractBacklinksFromHtml(contentEncoded)
    const content = stripBacklinksFromHtml(contentEncoded)

    return {
      title: getText('title'),
      description: getText('description'),
      date: new Date(getText('pubDate')).getTime(),
      author: getText('author'),
      url: getText('link'),
      thumbnail: enclosure?.getAttribute('url') || null,
      content: content || null,
      backlinks,
    }
  })

  return {
    success: true,
    title: channel.querySelector('title')?.textContent || '',
    items,
  }
}

function extractBacklinksFromHtml(html) {
  if (!html) return []
  try {
    const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html')
    const nodes = doc.querySelectorAll('blockquote.internal-link-embed')
    return Array.from(nodes).map(n => ({
      url: n.getAttribute('data-url') || '',
      title: n.getAttribute('data-title') || n.textContent?.trim() || '',
    })).filter(b => b.url)
  } catch {
    return []
  }
}

function stripBacklinksFromHtml(html) {
  if (!html) return html
  try {
    const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html')
    doc.querySelectorAll('blockquote.internal-link-embed').forEach(n => n.remove())
    return doc.body.firstChild?.innerHTML || html
  } catch {
    return html
  }
}
