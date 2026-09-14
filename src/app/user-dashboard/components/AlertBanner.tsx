'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, X, ChevronRight, Bell } from 'lucide-react';
import { DEMO_ALERTS } from '@/lib/mockData';

type Persona = 'default' | 'urban' | 'rural' | 'farmer' | 'marine' | 'aviation' | 'researcher';

const PERSONA_PRIORITY: Record<Persona, string[]> = {
  default: ['THUNDERSTORM', 'RAIN', 'FLOOD', 'LIGHTNING', 'CYCLONE', 'HEAT', 'VISIBILITY', 'AIR_QUALITY', 'WIND'],
  urban: ['AIR_QUALITY', 'THUNDERSTORM', 'RAIN', 'HEAT', 'FLOOD', 'LIGHTNING', 'VISIBILITY', 'WIND', 'CYCLONE'],
  rural: ['THUNDERSTORM', 'LIGHTNING', 'FLOOD', 'RAIN', 'WIND', 'HEAT', 'CYCLONE', 'VISIBILITY', 'AIR_QUALITY'],
  farmer: ['RAIN', 'THUNDERSTORM', 'HEAT', 'FROST', 'WIND', 'LIGHTNING', 'FLOOD', 'CYCLONE', 'AIR_QUALITY', 'VISIBILITY'],
  marine: ['CYCLONE', 'WIND', 'RAIN', 'THUNDERSTORM', 'VISIBILITY', 'FLOOD', 'LIGHTNING', 'HEAT', 'AIR_QUALITY'],
  aviation: ['VISIBILITY', 'THUNDERSTORM', 'WIND', 'RAIN', 'ICING', 'LIGHTNING', 'HEAT', 'CYCLONE', 'AIR_QUALITY'],
  researcher: ['THUNDERSTORM', 'RAIN', 'CYCLONE', 'FLOOD', 'HEAT', 'WIND', 'LIGHTNING', 'VISIBILITY', 'AIR_QUALITY'],
};

const severityWeight: Record<string, number> = { HIGH: 0, MODERATE: 10, LOW: 20 };

function rankAlerts(alerts: typeof DEMO_ALERTS, persona: Persona) {
  const priorities = PERSONA_PRIORITY[persona] || PERSONA_PRIORITY.default;
  const priorityIndex = new Map(priorities.map((type, index) => [type, index]));

  return [...alerts].sort((a, b) => {
    const aPriority = priorityIndex.get(a.type) ?? 999;
    const bPriority = priorityIndex.get(b.type) ?? 999;
    if (aPriority !== bPriority) return aPriority - bPriority;

    const aSeverity = severityWeight[a.severity] ?? 99;
    const bSeverity = severityWeight[b.severity] ?? 99;
    if (aSeverity !== bSeverity) return aSeverity - bSeverity;

    return new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime();
  });
}

export default function AlertBanner({ persona = 'default' }: { persona?: string }) {
  const [dismissed, setDismissed] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<Persona>((persona as Persona) || 'default');

  useEffect(() => {
    const syncPersona = () => {
      try {
        const saved = window.localStorage.getItem('akashvani_persona') as Persona | null;
        if (saved) setCurrentPersona(saved);
      } catch {}
    };

    syncPersona();
    window.addEventListener('akashvani:persona-changed', syncPersona);
    window.addEventListener('storage', syncPersona);
    return () => {
      window.removeEventListener('akashvani:persona-changed', syncPersona);
      window.removeEventListener('storage', syncPersona);
    };
  }, []);

  useEffect(() => {
    if (persona) setCurrentPersona(persona as Persona);
    setDismissed(false);
  }, [persona]);

  const activeAlert = useMemo(() => {
    const ordered = rankAlerts(DEMO_ALERTS, currentPersona);
    return ordered.find((alert) => alert.severity === 'HIGH') || ordered[0];
  }, [currentPersona]);

  if (dismissed || !activeAlert) return null;

  const validUntil = activeAlert.validUntil
    ? new Date(activeAlert.validUntil).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
    : 'latest update';

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3 animate-slide-up">
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-8 h-8 rounded-full bg-warning/15 flex items-center justify-center pulse-ring">
          <AlertTriangle size={16} className="text-warning" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wide bg-warning/20 px-2 py-0.5 rounded-full">
            {activeAlert.type}
          </span>
          <span className="text-xs font-semibold text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 bg-white">
            {activeAlert.severity}
          </span>
          <span className="demo-badge text-xs font-semibold px-2 py-0.5 rounded-full">
            LIVE ALERT
          </span>
        </div>
        <p className="text-sm font-semibold text-amber-900 mt-1">{activeAlert.title}</p>
        <p className="text-xs text-amber-700 mt-0.5 line-clamp-2">{activeAlert.message}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-amber-600">
            {activeAlert.agencyCode} · Valid until {validUntil} IST
          </span>
          <button className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline">
            View full alert <ChevronRight size={12} />
          </button>
          <button className="text-xs font-semibold text-amber-700 flex items-center gap-1">
            <Bell size={12} /> Set reminder
          </button>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-amber-100 transition-colors text-amber-600"
      >
        <X size={16} />
      </button>
    </div>
  );
}
