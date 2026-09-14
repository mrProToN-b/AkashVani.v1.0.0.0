import { NextResponse } from 'next/server';

const PERSONA_TERMS: Record<string, string[]> = {
  default: ['weather', 'forecast', 'rain', 'storm', 'cyclone'],
  farmer: ['rain', 'monsoon', 'agriculture', 'crop', 'soil', 'farming', 'heat', 'drought'],
  rural: ['rain', 'storm', 'flood', 'lightning', 'road', 'power', 'village'],
  urban: ['weather', 'heatwave', 'rain', 'flood', 'air quality', 'traffic', 'city'],
  marine: ['cyclone', 'sea', 'coast', 'wind', 'wave', 'fishing', 'marine'],
  aviation: ['aviation', 'flight', 'visibility', 'thunderstorm', 'wind', 'fog', 'airport'],
  researcher: ['climate', 'weather', 'monsoon', 'extreme weather', 'forecast', 'rainfall'],
};

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseItems(xml: string) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => {
    const block = match[1];
    const get = (tag: string) => {
      const found = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
      return found ? decodeXml(found[1]) : '';
    };
    const title = get('title');
    const link = get('link');
    const pubDate = get('pubDate');
    const description = stripHtml(get('description'));
    const source = get('source');
    return { title, link, pubDate, description, source };
  }).filter((item) => item.title && item.link);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location')?.trim() || 'India';
  const persona = (searchParams.get('persona') || 'default').toLowerCase();
  const terms = PERSONA_TERMS[persona] || PERSONA_TERMS.default;
  const query = `${location} India weather ${terms.slice(0, 3).join(' ')}`;
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;

  try {
    const response = await fetch(rssUrl, {
      headers: { 'User-Agent': 'AkashVani Weather Bulletin/1.0' },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ items: [], source: 'Google News RSS', error: 'Unable to fetch live headlines.' }, { status: 200 });
    }

    const xml = await response.text();
    const items = parseItems(xml)
      .map((item) => {
        const haystack = `${item.title} ${item.description}`.toLowerCase();
        const score = terms.reduce((sum, term, index) => sum + (haystack.includes(term.toLowerCase()) ? 20 - index : 0), 0);
        return { ...item, score };
      })
      .sort((a, b) => b.score - a.score || new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 6)
      .map(({ score: _score, ...item }) => item);

    return NextResponse.json({ items, source: 'Google News RSS', location, persona, fetchedAt: new Date().toISOString() }, { status: 200 });
  } catch {
    return NextResponse.json({ items: [], source: 'Google News RSS', error: 'Live bulletin temporarily unavailable.' }, { status: 200 });
  }
}
