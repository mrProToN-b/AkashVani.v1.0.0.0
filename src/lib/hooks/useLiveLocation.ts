'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'akashvani_live_location';
const EVENT_NAME = 'akashvani:live-location-updated';

type StoredLiveLocation = {
  label?: string;
};

export function useLiveLocation(fallback = 'Kolkata') {
  const [location, setLocation] = useState(fallback);

  useEffect(() => {
    const readLocation = () => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const stored = JSON.parse(raw) as StoredLiveLocation;
        if (stored?.label) setLocation(stored.label);
      } catch {
        // Keep the fallback when storage contains invalid data.
      }
    };

    readLocation();

    const handleUpdate = () => readLocation();
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return location;
}
