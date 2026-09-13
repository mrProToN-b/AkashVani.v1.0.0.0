'use client';

import React, { useMemo, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { DEMO_DISASTERS, DEMO_SHELTERS, DEMO_WEATHER, DEMO_RISK } from '@/lib/mockData';
import { AlertTriangle, Crosshair, HeartPulse, MapPin, Navigation, Phone, ShieldAlert, Siren, Share2, Users, Zap } from 'lucide-react';

export default function SOSPage() {
  const [shared, setShared] = useState(false);
  const [location, setLocation] = useState('Detecting location…');

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(`${DEMO_WEATHER.location}, ${DEMO_WEATHER.state}`);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLocation(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`),
      () => setLocation(`${DEMO_WEATHER.location}, ${DEMO_WEATHER.state}`),
      { enableHighAccuracy: true, timeout: 7000 },
    );
  }, []);

  const nearestShelter = useMemo(() => DEMO_SHELTERS[0], []);
  const activeThreat = DEMO_DISASTERS.find((item) => item.severity === 'HIGH') || DEMO_DISASTERS[0];

  const shareLocation = async () => {
    const text = `AkashVani emergency location: ${location}`;
    try {
      if (navigator.share) await navigator.share({ title: 'AkashVani SOS', text });
      else await navigator.clipboard.writeText(text);
      setShared(true);
      window.setTimeout(() => setShared(false), 2500);
    } catch {}
  };

  return (
    <AppLayout userName="Soumyajit Koley" userLocation="Agarpara, Kolkata">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-4 lg:py-6 space-y-4 lg:space-y-5">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span>Dashboard</span><span>·</span><span className="font-medium text-foreground">SOS & Emergency</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-danger/10 flex items-center justify-center">
                <Siren size={20} className="text-danger" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight">SOS & Emergency</h1>
                <p className="text-xs lg:text-sm text-muted-foreground mt-0.5">Fast access to emergency contacts, location sharing, hazard status and nearby safe places.</p>
              </div>
            </div>
          </div>
          <div className="official-badge px-2.5 py-1 rounded-full text-[10px] font-semibold">SAFETY MODE</div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
          <div className="xl:col-span-2 bg-card border border-danger/20 rounded-2xl p-5 shadow-card">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="w-28 h-28 rounded-full border-8 border-danger/15 bg-danger/10 flex items-center justify-center shrink-0 mx-auto lg:mx-0">
                <div className="w-20 h-20 rounded-full bg-danger text-white flex items-center justify-center shadow-lg">
                  <Siren size={34} />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-danger">Emergency action</p>
                <h2 className="text-2xl font-bold mt-1">Need immediate help?</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-xl">Call a national emergency service, share your live location, or navigate to the nearest available shelter.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                  {[['112', 'All emergencies'], ['108', 'Ambulance'], ['100', 'Police'], ['101', 'Fire']].map(([number, label]) => (
                    <a key={number} href={`tel:${number}`} className="rounded-xl border border-border bg-secondary/40 hover:bg-secondary px-3 py-3 text-center transition-colors">
                      <Phone size={15} className="mx-auto text-danger" />
                      <p className="text-lg font-bold font-mono-data mt-1">{number}</p>
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-semibold">Your location</p><p className="text-[11px] text-muted-foreground mt-1">GPS / last known</p></div>
              <Crosshair size={17} className="text-primary" />
            </div>
            <div className="mt-4 rounded-xl bg-secondary/50 border border-border p-4">
              <div className="flex items-start gap-2"><MapPin size={16} className="text-primary mt-0.5" /><p className="text-xs font-semibold break-all">{location}</p></div>
            </div>
            <button onClick={shareLocation} className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-3 py-2.5 text-xs font-semibold hover:bg-primary/90 transition-colors">
              <Share2 size={14} /> {shared ? 'Location shared' : 'Share my location'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
          <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between"><div><p className="text-sm font-semibold">Current hazard status</p><p className="text-[11px] text-muted-foreground mt-0.5">Latest local safety context</p></div><ShieldAlert size={17} className="text-warning" /></div>
            <div className="p-4 space-y-3">
              <div className="rounded-xl border border-warning/25 bg-warning/10 p-4">
                <div className="flex items-start gap-3"><AlertTriangle size={18} className="text-warning mt-0.5" /><div><p className="text-sm font-semibold">{activeThreat.type}: {activeThreat.status}</p><p className="text-xs text-muted-foreground mt-1">{activeThreat.detail}</p></div></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-secondary/50 p-3"><p className="text-[10px] text-muted-foreground">Weather</p><p className="text-lg font-bold font-mono-data">{DEMO_WEATHER.temp}°C</p></div>
                <div className="rounded-xl bg-secondary/50 p-3"><p className="text-[10px] text-muted-foreground">Risk</p><p className="text-lg font-bold font-mono-data">{DEMO_RISK.overall}/100</p></div>
                <div className="rounded-xl bg-secondary/50 p-3"><p className="text-[10px] text-muted-foreground">Wind</p><p className="text-lg font-bold font-mono-data">{DEMO_WEATHER.windSpeed}</p></div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between"><div><p className="text-sm font-semibold">Nearest safe place</p><p className="text-[11px] text-muted-foreground mt-0.5">Shelter availability</p></div><Navigation size={17} className="text-primary" /></div>
            <div className="p-4">
              <div className="rounded-xl border border-border p-4 bg-secondary/30">
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">{nearestShelter.name}</p><p className="text-[11px] text-muted-foreground mt-1">{nearestShelter.distance} away · {nearestShelter.status}</p></div><span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-success/10 text-success">{nearestShelter.status}</span></div>
                <div className="grid grid-cols-2 gap-2 mt-4"><div className="rounded-lg bg-card border border-border p-3"><p className="text-[10px] text-muted-foreground">Capacity</p><p className="text-sm font-bold font-mono-data">{nearestShelter.capacity.toLocaleString()}</p></div><div className="rounded-lg bg-card border border-border p-3"><p className="text-[10px] text-muted-foreground">Accessibility</p><p className="text-sm font-bold">{nearestShelter.accessibility ? 'Available' : 'Limited'}</p></div></div>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${nearestShelter.lat},${nearestShelter.lng}`} target="_blank" rel="noreferrer" className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-3 py-2.5 text-xs font-semibold hover:bg-primary/90 transition-colors"><Navigation size={14} /> Get directions</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between"><div><p className="text-sm font-semibold">Emergency support</p><p className="text-[11px] text-muted-foreground mt-0.5">Keep these options ready during a severe event.</p></div><HeartPulse size={17} className="text-primary" /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
            <a href="tel:112" className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-secondary transition-colors"><Phone size={18} className="text-danger" /><div><p className="text-sm font-semibold">National Emergency</p><p className="text-xs text-muted-foreground">Dial 112</p></div></a>
            <a href="/live-weather-map" className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-secondary transition-colors"><MapPin size={18} className="text-primary" /><div><p className="text-sm font-semibold">Open hazard map</p><p className="text-xs text-muted-foreground">View nearby warnings</p></div></a>
            <a href="/user-dashboard/assistant" className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-secondary transition-colors"><Users size={18} className="text-primary" /><div><p className="text-sm font-semibold">Ask AkashVani AI</p><p className="text-xs text-muted-foreground">Get safety guidance</p></div></a>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground px-1 pb-2"><Zap size={11} className="text-warning" /><span>Emergency numbers are provided for India. Always follow official emergency guidance and local authorities.</span></div>
      </div>
    </AppLayout>
  );
}
