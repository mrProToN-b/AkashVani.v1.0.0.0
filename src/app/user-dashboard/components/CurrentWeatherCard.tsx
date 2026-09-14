'use client';

import React, { useEffect, useState } from 'react';
import {
  Droplets, Wind, Eye, Gauge, Thermometer, Sun, Sunrise, Sunset, Cloud
} from 'lucide-react';
import { DEMO_WEATHER } from '@/lib/mockData';
import { useLiveLocation } from '@/lib/hooks/useLiveLocation';

function WeatherStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none">{label}</p>
        <p className="text-xs font-semibold text-foreground font-mono-data mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function CurrentWeatherCard() {
  const w = DEMO_WEATHER;
  const liveLocation = useLiveLocation(`${w.location} · ${w.state}`);
  const [persona, setPersona] = useState('default');

  useEffect(() => {
    const readPersona = () => {
      try {
        const stored = window.localStorage.getItem('akashvani_persona');
        if (stored) setPersona(stored);
      } catch {}
    };
    const onPersonaChange = (event: Event) => {
      const key = (event as CustomEvent<string>).detail;
      if (typeof key === 'string' && key) setPersona(key);
      else readPersona();
    };
    readPersona();
    window.addEventListener('akashvani:persona-changed', onPersonaChange);
    window.addEventListener('storage', readPersona);
    return () => {
      window.removeEventListener('akashvani:persona-changed', onPersonaChange);
      window.removeEventListener('storage', readPersona);
    };
  }, []);

  const statSets: Record<string, Array<{ key: string; icon: React.ReactNode; label: string; value: string }>> = {
    farmer: [
      { key: 'humidity', icon: <Droplets size={14} />, label: 'Humidity', value: `${w.humidity}%` },
      { key: 'wind', icon: <Wind size={14} />, label: 'Wind', value: `${w.windSpeed} km/h ${w.windDir}` },
      { key: 'rain', icon: <Cloud size={14} />, label: 'Precipitation', value: `${w.precipitation} mm` },
      { key: 'dew', icon: <Thermometer size={14} />, label: 'Dew Point', value: `${w.dewPoint}°C` },
      { key: 'temp', icon: <Sun size={14} />, label: 'Temperature', value: `${w.temp}°C` },
      { key: 'pressure', icon: <Gauge size={14} />, label: 'Pressure', value: `${w.pressure} hPa` },
    ],
    rural: [
      { key: 'rain', icon: <Cloud size={14} />, label: 'Precipitation', value: `${w.precipitation} mm` },
      { key: 'wind', icon: <Wind size={14} />, label: 'Wind', value: `${w.windSpeed} km/h ${w.windDir}` },
      { key: 'humidity', icon: <Droplets size={14} />, label: 'Humidity', value: `${w.humidity}%` },
      { key: 'visibility', icon: <Eye size={14} />, label: 'Visibility', value: `${w.visibility} km` },
      { key: 'pressure', icon: <Gauge size={14} />, label: 'Pressure', value: `${w.pressure} hPa` },
      { key: 'temp', icon: <Thermometer size={14} />, label: 'Temperature', value: `${w.temp}°C` },
    ],
    urban: [
      { key: 'temp', icon: <Thermometer size={14} />, label: 'Temperature', value: `${w.temp}°C` },
      { key: 'feels', icon: <Sun size={14} />, label: 'Feels like', value: `${w.feelsLike}°C` },
      { key: 'wind', icon: <Wind size={14} />, label: 'Wind', value: `${w.windSpeed} km/h ${w.windDir}` },
      { key: 'visibility', icon: <Eye size={14} />, label: 'Visibility', value: `${w.visibility} km` },
      { key: 'humidity', icon: <Droplets size={14} />, label: 'Humidity', value: `${w.humidity}%` },
      { key: 'uv', icon: <Sun size={14} />, label: 'UV Index', value: `${w.uvIndex} · High` },
    ],
    marine: [
      { key: 'wind', icon: <Wind size={14} />, label: 'Wind', value: `${w.windSpeed} km/h ${w.windDir}` },
      { key: 'visibility', icon: <Eye size={14} />, label: 'Visibility', value: `${w.visibility} km` },
      { key: 'pressure', icon: <Gauge size={14} />, label: 'Pressure', value: `${w.pressure} hPa` },
      { key: 'humidity', icon: <Droplets size={14} />, label: 'Humidity', value: `${w.humidity}%` },
      { key: 'temp', icon: <Thermometer size={14} />, label: 'Temperature', value: `${w.temp}°C` },
      { key: 'rain', icon: <Cloud size={14} />, label: 'Precipitation', value: `${w.precipitation} mm` },
    ],
    aviation: [
      { key: 'visibility', icon: <Eye size={14} />, label: 'Visibility', value: `${w.visibility} km` },
      { key: 'wind', icon: <Wind size={14} />, label: 'Wind', value: `${w.windSpeed} km/h ${w.windDir}` },
      { key: 'pressure', icon: <Gauge size={14} />, label: 'Pressure', value: `${w.pressure} hPa` },
      { key: 'humidity', icon: <Droplets size={14} />, label: 'Humidity', value: `${w.humidity}%` },
      { key: 'temp', icon: <Thermometer size={14} />, label: 'Temperature', value: `${w.temp}°C` },
      { key: 'rain', icon: <Cloud size={14} />, label: 'Precipitation', value: `${w.precipitation} mm` },
    ],
    researcher: [],
    default: [
      { key: 'humidity', icon: <Droplets size={14} />, label: 'Humidity', value: `${w.humidity}%` },
      { key: 'wind', icon: <Wind size={14} />, label: 'Wind', value: `${w.windSpeed} km/h ${w.windDir}` },
      { key: 'visibility', icon: <Eye size={14} />, label: 'Visibility', value: `${w.visibility} km` },
      { key: 'pressure', icon: <Gauge size={14} />, label: 'Pressure', value: `${w.pressure} hPa` },
      { key: 'uv', icon: <Sun size={14} />, label: 'UV Index', value: `${w.uvIndex} · High` },
      { key: 'dew', icon: <Thermometer size={14} />, label: 'Dew Point', value: `${w.dewPoint}°C` },
    ],
  };

  const stats = statSets[persona] || statSets.default;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Current Weather</p>
          <p className="text-xs text-muted-foreground mt-0.5">{liveLocation}</p>
        </div>
        <span className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">LIVE</span>
      </div>

      {/* Main temp display */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center">
          <Cloud size={28} className="text-primary" />
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-metric-xl text-foreground tabular-nums">{w.temp}°</span>
            <span className="text-sm text-muted-foreground font-medium">C</span>
          </div>
          <p className="text-sm text-muted-foreground">{w.condition}</p>
          <p className="text-xs text-muted-foreground">Feels like <span className="font-semibold text-orange-500">{w.feelsLike}°C</span></p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1">
        {stats.map((stat) => (
          <WeatherStat key={stat.key} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-border/60">
        <p className="text-[10px] text-muted-foreground">
          Source: <span className="font-medium">{w.source}</span> · 17:45 IST
        </p>
      </div>
    </div>
  );
}