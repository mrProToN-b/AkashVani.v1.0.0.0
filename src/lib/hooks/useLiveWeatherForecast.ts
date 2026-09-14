'use client';

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'akashvani_live_location';
const EVENT_NAME = 'akashvani:live-location-updated';

type Coordinates = { latitude: number; longitude: number };

type State = { loading: boolean; error: string | null; data: any | null };

function readCoordinates(): Coordinates | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as { latitude?: number; longitude?: number };
    if (Number.isFinite(stored.latitude) && Number.isFinite(stored.longitude)) {
      return { latitude: Number(stored.latitude), longitude: Number(stored.longitude) };
    }
  } catch {}
  return null;
}

export function useLiveWeatherForecast() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [state, setState] = useState<State>({ loading: false, error: null, data: null });

  useEffect(() => {
    const sync = () => setCoords(readCoordinates());
    sync();
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  useEffect(() => {
    if (!coords) return;
    const controller = new AbortController();
    let active = true;

    const fetchForecast = async () => {
      setState((current) => ({ ...current, loading: true, error: null }));
      try {
        const response = await fetch(`/api/weather/forecast?lat=${encodeURIComponent(coords.latitude)}&lon=${encodeURIComponent(coords.longitude)}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Live forecast unavailable');
        const data = await response.json();
        if (active) setState({ loading: false, error: null, data });
      } catch (error) {
        if (controller.signal.aborted) return;
        if (active) setState({ loading: false, error: error instanceof Error ? error.message : 'Live forecast unavailable', data: null });
      }
    };

    void fetchForecast();
    const interval = window.setInterval(fetchForecast, 10 * 60 * 1000);
    return () => {
      active = false;
      controller.abort();
      window.clearInterval(interval);
    };
  }, [coords]);

  return useMemo(() => ({ ...state, coords }), [state, coords]);
}
