'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Newspaper, RefreshCw } from 'lucide-react';

type BulletinItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
};

const FALLBACK: BulletinItem[] = [
  {
    title: 'Live weather bulletin is temporarily unavailable',
    link: 'https://mausam.imd.gov.in/',
    pubDate: new Date().toISOString(),
    description: 'Open the India Meteorological Department for the latest official weather bulletins and warnings.',
    source: 'IMD',
  },
];

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Latest';
  return date.toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });
}

export default function WeatherNewsBulletin({ persona }: { persona: string }) {
  const [items, setItems] = useState<BulletinItem[]>([]);
  const [location, setLocation] = useState('India');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      let currentLocation = 'India';
      try {
        const raw = window.localStorage.getItem('akashvani_live_location');
        if (raw) {
          const parsed = JSON.parse(raw) as { label?: string };
          if (parsed?.label) currentLocation = parsed.label;
        }
      } catch {}
      setLocation(currentLocation);

      const response = await fetch(`/api/weather-news?location=${encodeURIComponent(currentLocation)}&persona=${encodeURIComponent(persona || 'default')}`, { cache: 'no-store' });
      const data = await response.json();
      const nextItems = Array.isArray(data?.items) ? data.items : [];
      setItems(nextItems.length ? nextItems : FALLBACK);
      setLastUpdated(data?.fetchedAt || new Date().toISOString());
    } catch {
      setItems(FALLBACK);
      setLastUpdated(new Date().toISOString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    const sync = () => void load();
    window.addEventListener('akashvani:live-location-updated', sync);
    return () => window.removeEventListener('akashvani:live-location-updated', sync);
  }, [persona]);

  const visibleItems = useMemo(() => items.slice(0, 5), [items]);

  return (
    <section className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Newspaper size={16} className="text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Weather News Bulletin</h2>
            <span className="text-[10px] font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full">LIVE</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">Latest weather stories for {location}</p>
        </div>
        <button
          onClick={() => void load()}
          disabled={loading}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
          aria-label="Refresh weather news"
          title="Refresh weather news"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="divide-y divide-border">
        {visibleItems.map((item, index) => (
          <a key={`${item.link}-${index}`} href={item.link} target="_blank" rel="noreferrer" className="block px-4 py-3 hover:bg-secondary/40 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-[11px] font-mono-data text-muted-foreground mt-0.5 w-5 flex-shrink-0">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground line-clamp-2">{item.title}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                  <span className="truncate">{item.source || 'News'}</span>
                  <span>·</span>
                  <span>{formatTime(item.pubDate)}</span>
                  <ExternalLink size={11} className="flex-shrink-0" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-border text-[10px] text-muted-foreground">
        Updated {lastUpdated ? formatTime(lastUpdated) : '—'} IST · Headlines open at source
      </div>
    </section>
  );
}
