'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Navigation, Phone, ShieldAlert, Siren } from 'lucide-react';
import { DEMO_SHELTERS } from '@/lib/mockData';

interface StoredLocation {
  latitude?: number;
  longitude?: number;
  label?: string;
}

function distanceKm(aLat: number, aLon: number, bLat: number, bLon: number) {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const lat1 = (aLat * Math.PI) / 180;
  const lat2 = (bLat * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export default function DynamicSOSBox({ riskScore }: { riskScore: number }) {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationLabel, setLocationLabel] = useState('Detecting live location…');

  useEffect(() => {
    const readStored = () => {
      try {
        const raw = window.localStorage.getItem('akashvani_live_location');
        if (!raw) return;
        const data = JSON.parse(raw) as StoredLocation;
        if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          setCoords({ latitude: data.latitude, longitude: data.longitude });
        }
        if (data.label) setLocationLabel(data.label);
      } catch {}
    };

    readStored();
    const onUpdated = () => readStored();
    window.addEventListener('akashvani:live-location-updated', onUpdated);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: current }) => {
          setCoords({ latitude: current.latitude, longitude: current.longitude });
          try {
            window.localStorage.setItem(
              'akashvani_live_location',
              JSON.stringify({ latitude: current.latitude, longitude: current.longitude, updatedAt: new Date().toISOString() }),
            );
          } catch {}
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      );
    }

    return () => window.removeEventListener('akashvani:live-location-updated', onUpdated);
  }, []);

  const nearestShelter = useMemo(() => {
    if (!coords || !DEMO_SHELTERS?.length) return DEMO_SHELTERS?.[0];
    return DEMO_SHELTERS.reduce((nearest, shelter) => {
      const nearestDistance = distanceKm(coords.latitude, coords.longitude, nearest.lat, nearest.lng);
      const shelterDistance = distanceKm(coords.latitude, coords.longitude, shelter.lat, shelter.lng);
      return shelterDistance < nearestDistance ? shelter : nearest;
    }, DEMO_SHELTERS[0]);
  }, [coords]);

  if (!nearestShelter) return null;

  const displayDistance = coords
    ? `${distanceKm(coords.latitude, coords.longitude, nearestShelter.lat, nearestShelter.lng).toFixed(1)} km away`
    : nearestShelter.distance;

  // Same visual card, but its grid position reacts to the current risk level.
  const positionClass = riskScore >= 70 ? 'order-first xl:order-first' : riskScore >= 50 ? 'order-2 xl:order-2' : 'order-4 xl:order-4';

  const navigate = () => {
    const params = new URLSearchParams({
      routeLat: String(nearestShelter.lat),
      routeLng: String(nearestShelter.lng),
      routeName: nearestShelter.name,
    });
    window.location.href = `/live-weather-map?${params.toString()}`;
  };

  return (
    <div className={`${positionClass} bg-card border border-danger/20 rounded-2xl p-5 shadow-card transition-[transform,box-shadow] duration-300`} aria-label="Emergency SOS">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-danger/10 flex items-center justify-center">
            <Siren size={18} className="text-danger" />
          </div>
          <div>
            <p className="text-sm font-semibold">SOS & Emergency</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Risk-responsive assistance</p>
          </div>
        </div>
        <ShieldAlert size={17} className={riskScore >= 70 ? 'text-danger' : 'text-warning'} />
      </div>

      <div className="mt-4 rounded-xl bg-danger/5 border border-danger/15 p-3">
        <div className="flex items-start gap-2">
          <MapPin size={15} className="text-danger mt-0.5" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide font-semibold text-danger">Live safe-place guidance</p>
            <p className="text-xs font-semibold mt-1 truncate">{nearestShelter.name}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{displayDistance} · {nearestShelter.status}</p>
            <p className="text-[10px] text-muted-foreground mt-1 truncate">{locationLabel}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <a href="tel:112" className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-xs font-semibold hover:bg-secondary transition-colors">
          <Phone size={13} className="text-danger" /> 112 SOS
        </a>
        <button onClick={navigate} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-white px-3 py-2.5 text-xs font-semibold hover:bg-primary/90 transition-colors">
          <Navigation size={13} /> Navigate
        </button>
      </div>
    </div>
  );
}
