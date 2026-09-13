'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, Navigation, Layers, X, Loader2, MapPin } from 'lucide-react';
import { DEMO_LOCATIONS } from '@/lib/mockData';
import type { SelectedMapLocation } from './MapPageContent';

interface SearchResult {
  id: string;
  name: string;
  state: string;
  district?: string;
  pincode?: string;
  lat: number;
  lng: number;
  displayName: string;
  type?: string;
}

interface Props {
  onLocationSelect: (loc: SelectedMapLocation) => void;
  layerPanelOpen: boolean;
  setLayerPanelOpen: (open: boolean) => void;
}

function formatResultSubtitle(result: SearchResult) {
  const parts = [result.district, result.state, result.pincode].filter(Boolean);
  return parts.length ? parts.join(' · ') : result.displayName;
}

export default function MapSearchBar({ onLocationSelect, layerPanelOpen, setLayerPanelOpen }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      setError('');
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.error || 'Search failed');
        setResults(Array.isArray(payload.results) ? payload.results : []);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        const fallback = DEMO_LOCATIONS
          .filter((location) =>
            `${location.name} ${location.state}`.toLowerCase().includes(trimmed.toLowerCase()),
          )
          .map((location) => ({
            id: location.id,
            name: location.name,
            state: location.state,
            lat: location.lat,
            lng: location.lng,
            displayName: `${location.name}, ${location.state}`,
          }));
        setResults(fallback);
        setError(fallback.length ? '' : 'Location search is unavailable right now.');
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setShowResults(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleSelect = (loc: SearchResult) => {
    onLocationSelect({
      lat: Number(loc.lat),
      lng: Number(loc.lng),
      name: `${loc.name}${loc.state ? `, ${loc.state}` : ''}`,
    });
    setQuery(loc.name);
    setShowResults(false);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Location access is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationSelect({
          lat: Number(latitude.toFixed(5)),
          lng: Number(longitude.toFixed(5)),
          name: 'My current location',
        });
        setQuery('My current location');
        setShowResults(false);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError('Location permission was denied. You can search for a place instead.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  };

  return (
    <div className="flex items-start gap-2 w-full">
      <div ref={searchRef} className="relative flex-1 max-w-sm">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl shadow-elevated px-3 py-2.5">
          <Search size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
            onFocus={() => setShowResults(true)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setShowResults(false);
              if (e.key === 'Enter' && results[0]) handleSelect(results[0]);
            }}
            placeholder="Search city, district, PIN..."
            className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search Indian city, district, or PIN code"
          />
          {loading ? (
            <Loader2 size={15} className="text-primary animate-spin" />
          ) : query ? (
            <button
              onClick={() => { setQuery(''); setResults([]); setShowResults(false); setError(''); }}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>

        {showResults && query.trim().length >= 2 && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-elevated overflow-hidden z-20">
            {results.length > 0 ? (
              results.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-secondary transition-colors text-left"
                >
                  <MapPin size={14} className="text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{loc.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{formatResultSubtitle(loc)}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-mono-data text-muted-foreground flex-shrink-0">
                    {loc.lat.toFixed(2)}°N
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-3 text-xs text-muted-foreground">
                {loading ? 'Searching locations…' : error || 'No matching locations found.'}
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleUseLocation}
        className="bg-card border border-border rounded-xl p-2.5 shadow-elevated hover:bg-secondary transition-colors"
        title="Use my current location"
        aria-label="Use my current location"
      >
        <Navigation size={18} className="text-primary" />
      </button>

      <button
        onClick={() => setLayerPanelOpen(!layerPanelOpen)}
        className={`border rounded-xl p-2.5 shadow-elevated transition-colors ${
          layerPanelOpen ? 'bg-primary border-primary text-primary-foreground' : 'bg-card border-border text-muted-foreground hover:bg-secondary'
        }`}
        title="Toggle layer panel"
        aria-label="Toggle map layer panel"
      >
        <Layers size={18} />
      </button>
    </div>
  );
}
