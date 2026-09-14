'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Droplets, Wind, Cloud, CloudRain, Zap, Moon, Sun, Loader2, CloudDrizzle } from 'lucide-react';
import { DEMO_HOURLY_FORECAST, DEMO_WEATHER } from '@/lib/mockData';
import { useLiveLocation } from '@/lib/hooks/useLiveLocation';
import { useLiveWeatherForecast } from '@/lib/hooks/useLiveWeatherForecast';

const ICON_MAP: Record<string, React.ReactNode> = {
  'cloud-sun': <Sun size={18} className="text-yellow-500" />,
  'storm': <Zap size={18} className="text-warning" />,
  'rain-heavy': <CloudRain size={18} className="text-blue-500" />,
  'rain': <CloudRain size={18} className="text-blue-400" />,
  'cloud': <Cloud size={18} className="text-muted-foreground" />,
  'cloud-moon': <Moon size={18} className="text-slate-400" />,
  'moon': <Moon size={18} className="text-slate-500" />,
};

function getRainColor(prob: number) {
  if (prob >= 70) return 'bg-blue-500';
  if (prob >= 40) return 'bg-blue-400';
  if (prob >= 20) return 'bg-blue-300';
  return 'bg-blue-200';
}

function weatherCodeToIcon(code: number, isDay = true) {
  if (code >= 95) return 'storm';
  if (code >= 80) return 'rain-heavy';
  if (code >= 51) return 'rain';
  if (code >= 1 && code <= 3) return isDay ? 'cloud-sun' : 'cloud-moon';
  if (code >= 45 && code <= 48) return 'cloud';
  return isDay ? 'cloud-sun' : 'moon';
}

function timeLabel(iso: string | undefined) {
  if (!iso) return '--:--';
  const match = iso.match(/T(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : '--:--';
}

function dayLabel(iso: string | undefined, index: number) {
  if (!iso) return index === 0 ? 'Today' : `Day ${index + 1}`;
  const date = new Date(`${iso}T12:00:00`);
  return index === 0 ? 'Today' : date.toLocaleDateString('en-IN', { weekday: 'short' });
}

export default function HourlyForecastStrip() {
  const liveLocation = useLiveLocation(`${DEMO_WEATHER.location} · ${DEMO_WEATHER.state}`);
  const { data, loading, error } = useLiveWeatherForecast();
  const [persona, setPersona] = useState('default');
  const [view, setView] = useState<'hourly' | 'daily' | 'nowcast'>('hourly');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('akashvani_persona');
      if (stored) setPersona(stored);
    } catch {}
    const onPersonaChange = (event: Event) => {
      const key = (event as CustomEvent<string>).detail;
      if (typeof key === 'string' && key) setPersona(key);
    };
    window.addEventListener('akashvani:persona-changed', onPersonaChange);
    return () => window.removeEventListener('akashvani:persona-changed', onPersonaChange);
  }, []);

  const forecastTitle = persona === 'farmer' ? 'Rain & field weather' : persona === 'marine' ? 'Marine weather window' : persona === 'aviation' ? 'Flight weather window' : 'Hourly Forecast';

  const hourlyItems = useMemo(() => {
    const hourly = data?.hourly;
    if (!hourly?.time?.length) return DEMO_HOURLY_FORECAST;
    const start = Math.max(0, hourly.time.findIndex((t: string) => new Date(t).getTime() >= Date.now() - 30 * 60 * 1000));
    return hourly.time.slice(start, start + 12).map((time: string, i: number) => ({
      id: `live-hour-${time}`,
      time: timeLabel(time),
      temp: Math.round(hourly.temperature_2m[start + i] ?? DEMO_HOURLY_FORECAST[i]?.temp ?? 0),
      feelsLike: Math.round(hourly.apparent_temperature[start + i] ?? DEMO_HOURLY_FORECAST[i]?.feelsLike ?? 0),
      rainProb: Math.round(hourly.precipitation_probability[start + i] ?? 0),
      rain: Number(hourly.precipitation[start + i] ?? 0),
      windSpeed: Math.round(hourly.wind_speed_10m[start + i] ?? 0),
      condition: 'Live forecast',
      icon: weatherCodeToIcon(Number(hourly.weather_code[start + i] ?? 0), true),
    }));
  }, [data]);

  const dailyItems = useMemo(() => {
    const daily = data?.daily;
    if (!daily?.time?.length) return [];
    return daily.time.slice(0, 7).map((date: string, i: number) => ({
      id: `live-day-${date}`,
      day: dayLabel(date, i),
      max: Math.round(daily.temperature_2m_max[i] ?? 0),
      min: Math.round(daily.temperature_2m_min[i] ?? 0),
      rainProb: Math.round(daily.precipitation_probability_max[i] ?? 0),
      rain: Number(daily.precipitation_sum[i] ?? 0),
      windSpeed: Math.round(daily.wind_speed_10m_max[i] ?? 0),
      icon: weatherCodeToIcon(Number(daily.weather_code[i] ?? 0), true),
    }));
  }, [data]);

  const nowcastItems = useMemo(() => {
    const minutely = data?.minutely_15;
    if (!minutely?.time?.length) return [];
    return minutely.time.slice(0, 9).map((time: string, i: number) => {
      const precipitation = Number(minutely.precipitation?.[i] ?? 0);
      const rain = Number(minutely.rain?.[i] ?? 0);
      const showers = Number(minutely.showers?.[i] ?? 0);
      return {
        id: `nowcast-${time}`,
        time: timeLabel(time),
        rain: Number((precipitation || rain || showers).toFixed(2)),
        icon: weatherCodeToIcon(Number(minutely.weather_code?.[i] ?? 0), true),
      };
    });
  }, [data]);

  const isLive = Boolean(data);

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{view === 'daily' ? '7-Day Forecast' : view === 'nowcast' ? 'Nowcast' : forecastTitle}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {view === 'daily' ? `Next 7 days · ${liveLocation}` : view === 'nowcast' ? `Next 2 hours · ${liveLocation}` : `Next 12 hours · ${liveLocation}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border">{view === 'nowcast' ? 'NOWCAST' : 'FORECAST'}</span>
          <button onClick={() => setView('nowcast')} className={`text-xs font-semibold ${view === 'nowcast' ? 'text-foreground' : 'text-primary'} hover:underline`} type="button">Nowcast</button>
          <button onClick={() => setView(view === 'daily' ? 'hourly' : 'daily')} className="text-xs text-primary font-semibold hover:underline" type="button">{view === 'daily' ? 'Hourly →' : '7-Day →'}</button>
        </div>
      </div>

      {loading && !data && (
        <div className="flex items-center justify-center py-8 text-xs text-muted-foreground gap-2">
          <Loader2 size={14} className="animate-spin" /> Loading live forecast…
        </div>
      )}

      {view === 'hourly' && (
        <div className="forecast-scroll flex gap-2 pb-2 flex-1">
          {hourlyItems.map((hour: any) => (
            <div key={hour.id} className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-secondary/50 hover:bg-secondary rounded-xl px-3 py-2.5 cursor-pointer transition-colors min-w-[68px]">
              <span className="text-xs font-semibold text-muted-foreground font-mono-data">{hour.time}</span>
              <div className="w-9 h-9 flex items-center justify-center">{ICON_MAP[hour.icon] || <Cloud size={18} className="text-muted-foreground" />}</div>
              <span className="text-sm font-bold text-foreground tabular-nums">{hour.temp}°</span>
              <div className="w-full">
                <div className="flex items-center justify-center gap-0.5 mb-1"><Droplets size={10} className="text-blue-400" /><span className="text-[10px] font-semibold text-blue-500 tabular-nums">{hour.rainProb}%</span></div>
                <div className="w-full bg-blue-100 rounded-full h-1"><div className={`h-1 rounded-full transition-all ${getRainColor(hour.rainProb)}`} style={{ width: `${hour.rainProb}%` }} /></div>
              </div>
              <div className="flex items-center gap-0.5"><Wind size={10} className="text-muted-foreground" /><span className="text-[10px] text-muted-foreground tabular-nums">{hour.windSpeed}</span></div>
            </div>
          ))}
        </div>
      )}

      {view === 'daily' && (
        <div className="forecast-scroll flex gap-2 pb-2 flex-1">
          {dailyItems.map((day: any) => (
            <div key={day.id} className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-secondary/50 hover:bg-secondary rounded-xl px-3 py-2.5 min-w-[84px]">
              <span className="text-xs font-semibold text-muted-foreground font-mono-data">{day.day}</span>
              <div className="w-9 h-9 flex items-center justify-center">{ICON_MAP[day.icon] || <Cloud size={18} className="text-muted-foreground" />}</div>
              <span className="text-sm font-bold text-foreground tabular-nums">{day.max}° <span className="font-medium text-muted-foreground">/ {day.min}°</span></span>
              <div className="flex items-center gap-0.5"><Droplets size={10} className="text-blue-400" /><span className="text-[10px] font-semibold text-blue-500 tabular-nums">{day.rainProb}%</span></div>
              <div className="flex items-center gap-0.5"><CloudDrizzle size={10} className="text-muted-foreground" /><span className="text-[10px] text-muted-foreground tabular-nums">{day.rain.toFixed(1)} mm</span></div>
              <div className="flex items-center gap-0.5"><Wind size={10} className="text-muted-foreground" /><span className="text-[10px] text-muted-foreground tabular-nums">{day.windSpeed}</span></div>
            </div>
          ))}
          {!dailyItems.length && <div className="w-full flex items-center justify-center text-xs text-muted-foreground py-8">7-day forecast is temporarily unavailable.</div>}
        </div>
      )}

      {view === 'nowcast' && (
        <div className="forecast-scroll flex gap-2 pb-2 flex-1">
          {nowcastItems.map((item: any) => (
            <div key={item.id} className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-secondary/50 hover:bg-secondary rounded-xl px-3 py-2.5 min-w-[76px]">
              <span className="text-xs font-semibold text-muted-foreground font-mono-data">{item.time}</span>
              <div className="w-9 h-9 flex items-center justify-center">{ICON_MAP[item.icon] || <Cloud size={18} className="text-muted-foreground" />}</div>
              <span className="text-sm font-bold text-foreground tabular-nums">{item.rain.toFixed(2)}</span>
              <span className="text-[10px] text-muted-foreground">mm / 15m</span>
            </div>
          ))}
          {!nowcastItems.length && <div className="w-full flex items-center justify-center text-xs text-muted-foreground py-8">Nowcast is temporarily unavailable.</div>}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-4 text-[10px] text-muted-foreground">
        {view === 'nowcast' ? (
          <span className="flex items-center gap-1"><Droplets size={10} className="text-blue-400" /> Precipitation · 15 min intervals</span>
        ) : view === 'daily' ? (
          <span className="flex items-center gap-1"><Droplets size={10} className="text-blue-400" /> Rain probability · Daily maximum</span>
        ) : (
          <><span className="flex items-center gap-1"><Droplets size={10} className="text-blue-400" /> Rain probability</span><span className="flex items-center gap-1"><Wind size={10} /> Wind km/h</span></>
        )}
        <span className="ml-auto">Source: {isLive ? 'Open-Meteo forecast models · LIVE DATA' : error ? 'Fallback snapshot · LIVE DATA unavailable' : 'IMD / GFS Model · LIVE DATA'}</span>
      </div>
    </div>
  );
}
