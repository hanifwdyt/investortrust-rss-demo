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

    return {
      title: getText('title'),
      description: getText('description'),
      date: new Date(getText('pubDate')).getTime(),
      author: getText('author'),
      url: getText('link'),
      thumbnail: enclosure?.getAttribute('url') || null,
      content: contentEncoded || null,
    }
  })

  return {
    success: true,
    title: channel.querySelector('title')?.textContent || '',
    items,
  }
}
