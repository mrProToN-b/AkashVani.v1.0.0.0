'use client';

import React, { useEffect, useState } from 'react';
import AlertBanner from './AlertBanner';
import RiskScoreCard from './RiskScoreCard';
import CurrentWeatherCard from './CurrentWeatherCard';
import AISummaryCard from './AISummaryCard';
import HourlyForecastStrip from './HourlyForecastStrip';
import AQICard from './AQICard';
import DisasterStatusGrid from './DisasterStatusGrid';
import WeatherCharts from './WeatherCharts';
import SavedLocationsBar from './SavedLocationsBar';
import WeatherNewsBulletin from './WeatherNewsBulletin';
import DynamicSOSBox from './DynamicSOSBox';
import { DEMO_ALERTS, DEMO_RISK } from '@/lib/mockData';

export default function DashboardContent() {
  const [activeLocation, setActiveLocation] = useState('saved-home');
  const [persona, setPersona] = useState('default');
  const hasActiveAlert = DEMO_ALERTS?.some((a) => a?.severity === 'HIGH');
  const riskScore = Number(DEMO_RISK?.overall ?? 0);
  const riskState = riskScore >= 85 ? 'extreme' : riskScore >= 70 ? 'critical' : riskScore >= 50 ? 'high' : riskScore >= 30 ? 'moderate' : 'low';

  useEffect(() => {
    if (typeof window === 'undefined') return;

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

  // Keep the same cards and visual treatment, but make the dashboard content
  // mode-specific so each experience shows only the information most useful
  // for that user type.
  const modeContent: Record<string, {
    alert: boolean;
    risk: boolean;
    weather: boolean;
    aqi: boolean;
    ai: boolean;
    hourly: boolean;
    disaster: boolean;
    charts: boolean;
  }> = {
    default:     { alert: true, risk: true, weather: true, aqi: true,  ai: true, hourly: true, disaster: true,  charts: true },
    urban:       { alert: true, risk: true, weather: true, aqi: true,  ai: true, hourly: true, disaster: false, charts: false },
    rural:       { alert: true, risk: true, weather: true, aqi: false, ai: true, hourly: true, disaster: true,  charts: true },
    farmer:      { alert: true, risk: true, weather: true, aqi: false, ai: true, hourly: true, disaster: true,  charts: true },
    marine:      { alert: true, risk: true, weather: true, aqi: false, ai: true, hourly: true, disaster: true,  charts: true },
    aviation:    { alert: true, risk: true, weather: true, aqi: false, ai: true, hourly: true, disaster: false, charts: true },
    researcher:  { alert: false, risk: false, weather: false, aqi: false, ai: false, hourly: false, disaster: false, charts: false },
  };

  const visible = modeContent[persona] || modeContent.default;

  return (
    <div
      className={`dashboard-risk-state dashboard-risk-${riskState} max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-4 lg:py-6 space-y-4 lg:space-y-5`}
      aria-label={`Dashboard risk level: ${riskState}`}
      style={{ ['--dashboard-risk-score' as string]: `${riskScore}%` } as React.CSSProperties}
    >
      {/* Saved locations quick-switcher */}
      <SavedLocationsBar activeLocation={activeLocation} onLocationChange={setActiveLocation} />

      <WeatherNewsBulletin persona={persona} />

      {/* Active Alert Banner — shown when HIGH severity alert */}
      {visible.alert && hasActiveAlert && <AlertBanner persona={persona} />}

      {/* Bento Grid — the existing card UI stays unchanged; visibility is mode-specific. */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        <DynamicSOSBox riskScore={riskScore} />
        {visible.risk && (
          <div className="md:col-span-2 xl:col-span-2">
            <RiskScoreCard />
          </div>
        )}

        {visible.weather && (
          <div className="xl:col-span-1">
            <CurrentWeatherCard />
          </div>
        )}

        {visible.aqi && (
          <div className="xl:col-span-1">
            <AQICard />
          </div>
        )}
      </div>

      {(visible.ai || visible.hourly) && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
          {visible.ai && <AISummaryCard key={`ai-${persona}`} persona={persona} />}
          {visible.hourly && <HourlyForecastStrip />}
        </div>
      )}

      {visible.disaster && <DisasterStatusGrid />}

      {visible.charts && <WeatherCharts />}
    </div>
  );
}
