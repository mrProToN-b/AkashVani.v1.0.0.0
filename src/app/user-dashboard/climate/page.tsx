'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Download,
  FileDown,
  Filter,
  Globe2,
  Layers3,
  MapPinned,
  Minus,
  MoreHorizontal,
  PanelLeft,
  RefreshCw,
  Search,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';

const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false },
);
const AreaChart = dynamic(() => import('recharts').then((mod) => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then((mod) => mod.Area), { ssr: false });
const LineChart = dynamic(() => import('recharts').then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then((mod) => mod.Line), { ssr: false });
const BarChart = dynamic(() => import('recharts').then((mod) => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then((mod) => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });

const tempSeries = [
  { year: '2012', anomaly: 0.28 },
  { year: '2013', anomaly: 0.42 },
  { year: '2014', anomaly: 0.51 },
  { year: '2015', anomaly: 0.66 },
  { year: '2016', anomaly: 0.83 },
  { year: '2017', anomaly: 0.74 },
  { year: '2018', anomaly: 0.91 },
  { year: '2019', anomaly: 1.02 },
  { year: '2020', anomaly: 0.95 },
  { year: '2021', anomaly: 1.12 },
  { year: '2022', anomaly: 1.27 },
  { year: '2023', anomaly: 1.36 },
  { year: '2024', anomaly: 1.52 },
  { year: '2025', anomaly: 1.63 },
  { year: '2026', anomaly: 1.71 },
];

const rainfallSeries = [
  { month: 'Jan', anomaly: -8 },
  { month: 'Feb', anomaly: -2 },
  { month: 'Mar', anomaly: 4 },
  { month: 'Apr', anomaly: 11 },
  { month: 'May', anomaly: 7 },
  { month: 'Jun', anomaly: -3 },
  { month: 'Jul', anomaly: -12 },
  { month: 'Aug', anomaly: -9 },
  { month: 'Sep', anomaly: 6 },
  { month: 'Oct', anomaly: 14 },
  { month: 'Nov', anomaly: 5 },
  { month: 'Dec', anomaly: -4 },
];

const extremeEvents = [
  { year: '2012', heat: 4, rain: 2 },
  { year: '2014', heat: 7, rain: 3 },
  { year: '2016', heat: 9, rain: 4 },
  { year: '2018', heat: 12, rain: 5 },
  { year: '2020', heat: 15, rain: 7 },
  { year: '2022', heat: 18, rain: 8 },
  { year: '2024', heat: 23, rain: 11 },
  { year: '2026', heat: 26, rain: 13 },
];

const regionRows = [
  { region: 'West Bengal', temp: '+1.71°C', rain: '-8.4%', spi: '-1.12', trend: 'up' },
  { region: 'Odisha', temp: '+1.48°C', rain: '+4.7%', spi: '0.34', trend: 'up' },
  { region: 'Bihar', temp: '+1.92°C', rain: '-13.1%', spi: '-1.54', trend: 'down' },
  { region: 'Assam', temp: '+1.12°C', rain: '+8.6%', spi: '0.88', trend: 'up' },
  { region: 'Jharkhand', temp: '+1.64°C', rain: '-6.9%', spi: '-0.92', trend: 'down' },
];

const datasetCards = [
  { title: 'IMD Gridded Rainfall', coverage: '1901–2025', resolution: '0.25°', updated: '08 Sep 2026' },
  { title: 'IMD Gridded Temperature', coverage: '1901–2025', resolution: '1.0°', updated: '08 Sep 2026' },
  { title: 'District SPI', coverage: '2010–2026', resolution: 'District', updated: '10 Sep 2026' },
];

function MetricCard({ label, value, detail, trend, icon: Icon }: { label: string; value: string; detail: string; trend?: 'up' | 'down'; icon: React.ElementType }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon size={15} className="text-primary" />
        </div>
        {trend && (
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-amber-700'}`}>
            {trend === 'up' ? 'Rising' : 'Below normal'}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-3">{label}</p>
      <p className="text-2xl font-bold tracking-tight font-mono-data mt-1">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{detail}</p>
    </div>
  );
}

function SelectChip({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border hover:bg-secondary transition-colors text-left min-w-[140px]">
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold text-foreground">{value}</span>
      <ChevronDown size={13} className="ml-auto text-muted-foreground" />
    </button>
  );
}

export default function ClimateResearchDashboard() {
  const [parameter, setParameter] = useState('Temperature anomaly');
  const [baseline, setBaseline] = useState('1981–2010');
  const [period, setPeriod] = useState('2012–2026');
  const [region, setRegion] = useState('West Bengal');
  const [saved, setSaved] = useState(false);

  const mapTiles = useMemo(
    () => Array.from({ length: 36 }, (_, index) => {
      const row = Math.floor(index / 6);
      const col = index % 6;
      const value = (row * 7 + col * 11 + 17) % 100;
      return { index, value };
    }),
    [],
  );

  return (
    <AppLayout userName="Soumyajit Koley" userPersona="Researcher" userLocation="India · Climate Research">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-4 lg:py-6 space-y-4 lg:space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Link href="/user-dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <span>·</span>
              <span className="font-medium text-foreground">Climate Research</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Globe2 size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Climate Research Dashboard</h1>
                <p className="text-xs lg:text-sm text-muted-foreground mt-0.5">Explore anomalies, long-term trends, extremes and research datasets across India.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="official-badge text-[10px] font-semibold px-2.5 py-1 rounded-full">RESEARCHER MODE</span>
            <button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${saved ? 'bg-primary text-white border-primary' : 'bg-card border-border hover:bg-secondary'}`}>
              <BookmarkIcon saved={saved} /> {saved ? 'Saved' : 'Save analysis'}
            </button>
            <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-card border border-border hover:bg-secondary transition-colors">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Research filters */}
        <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground shrink-0">
              <SlidersHorizontal size={15} className="text-primary" />
              Analysis controls
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 w-full">
              <SelectChip label="Parameter" value={parameter} />
              <SelectChip label="Baseline" value={baseline} />
              <SelectChip label="Period" value={period} />
              <SelectChip label="Region" value={region} />
              <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-xs font-semibold">
                <RefreshCw size={13} /> Run analysis
              </button>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays size={12} /> Baseline: climatological normal</span>
            <span>·</span>
            <span>Resolution: 0.25°</span>
            <span>·</span>
            <span>Last refresh: 10 Sep 2026, 18:30 IST</span>
            <span className="ml-auto official-badge px-2 py-0.5 rounded-full font-semibold">OFFICIAL DATA LAYER</span>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
          <MetricCard label="Temperature anomaly" value="+1.71°C" detail="vs 1981–2010 baseline" trend="up" icon={TrendingUp} />
          <MetricCard label="Rainfall departure" value="−8.4%" detail="annual accumulated rainfall" trend="down" icon={TrendingDown} />
          <MetricCard label="Extreme heat days" value="26 days" detail="≥ 40°C threshold · 2026" trend="up" icon={Activity} />
          <MetricCard label="SPI-3" value="−1.12" detail="moderately dry · latest month" trend="down" icon={BarChart3} />
        </div>

        {/* Map + anomaly summary */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
          <div className="xl:col-span-2 bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Spatial anomaly explorer</p>
                <p className="text-xs text-muted-foreground mt-0.5">Temperature anomaly · India · {baseline} baseline</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Map layers"><Layers3 size={15} className="text-muted-foreground" /></button>
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Filter map"><Filter size={15} className="text-muted-foreground" /></button>
                <span className="text-[10px] font-semibold bg-secondary text-muted-foreground px-2 py-1 rounded-full">0.25° GRID</span>
              </div>
            </div>
            <div className="p-4">
              <div className="relative rounded-xl border border-border bg-slate-50 overflow-hidden h-[330px]">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                  {mapTiles.map((tile) => {
                    const alpha = 0.08 + tile.value / 180;
                    const isHot = tile.value > 62;
                    return (
                      <div key={tile.index} className="border-r border-b border-white/70" style={{ background: isHot ? `rgba(239, 68, 68, ${alpha})` : `rgba(15, 82, 186, ${0.06 + (100 - tile.value) / 700})` }} />
                    );
                  })}
                </div>
                <div className="absolute inset-[11%_15%_11%_17%] rounded-[42%_58%_56%_44%/42%_42%_58%_58%] border-2 border-primary/30 bg-white/25 rotate-[-6deg]" />
                <div className="absolute left-[29%] top-[34%] w-3 h-3 rounded-full bg-danger ring-4 ring-danger/10" />
                <div className="absolute left-[45%] top-[51%] w-3 h-3 rounded-full bg-warning ring-4 ring-warning/10" />
                <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                  <span className="text-[10px] font-semibold bg-white/90 border border-border px-2 py-1 rounded-lg shadow-card">India · selected region: {region}</span>
                  <div className="w-40 bg-white/90 backdrop-blur rounded-lg border border-border p-2 shadow-card">
                    <div className="h-2 rounded-full bg-gradient-to-r from-info via-warning to-danger" />
                    <div className="flex justify-between text-[9px] text-muted-foreground mt-1 font-mono-data"><span>−2°C</span><span>0</span><span>+2°C</span><span>+4°C</span></div>
                  </div>
                </div>
                <div className="absolute left-4 bottom-4 flex items-center gap-1.5 text-[10px] text-muted-foreground bg-white/90 border border-border px-2 py-1 rounded-lg">
                  <MapPinned size={11} className="text-primary" /> Spatial anomaly · research view
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">Research summary</p>
                <p className="text-xs text-muted-foreground mt-0.5">{region} · {period}</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-secondary"><MoreHorizontal size={15} className="text-muted-foreground" /></button>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Trend</p>
                <div className="flex items-end gap-2 mt-1"><span className="text-2xl font-bold font-mono-data">+0.21°C</span><span className="text-xs text-muted-foreground mb-1">/ decade</span></div>
                <div className="h-1.5 bg-secondary rounded-full mt-2 overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: '72%' }} /></div>
              </div>
              <div className="pt-3 border-t border-border/60">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Percentile</p>
                <div className="flex items-end gap-2 mt-1"><span className="text-2xl font-bold font-mono-data">92nd</span><span className="text-xs text-muted-foreground mb-1">warmest in series</span></div>
              </div>
              <div className="pt-3 border-t border-border/60">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Confidence</p>
                <div className="flex items-center gap-2 mt-2"><span className="w-2 h-2 rounded-full bg-success" /><span className="text-sm font-semibold">High</span><span className="text-xs text-muted-foreground">multi-source agreement</span></div>
              </div>
              <div className="pt-3 border-t border-border/60">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Interpretation</p>
                <p className="text-xs leading-relaxed text-foreground mt-1">Warming is persistent across the selected period, with the strongest positive departures during the last three years.</p>
              </div>
            </div>
            <button className="mt-5 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-secondary text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors">
              <PanelLeft size={13} /> Open full analysis
            </button>
          </div>
        </div>

        {/* Trends */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold">Long-term temperature trend</p>
                <p className="text-xs text-muted-foreground mt-0.5">Annual anomaly · {baseline} baseline</p>
              </div>
              <span className="text-[10px] font-semibold bg-secondary text-muted-foreground px-2 py-1 rounded-full">2012–2026</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={tempSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="climateTempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} domain={[0, 2]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', fontSize: 11 }} formatter={(value) => [`+${value}°C`, 'Anomaly']} />
                <Area type="monotone" dataKey="anomaly" stroke="var(--primary)" strokeWidth={2} fill="url(#climateTempGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-2 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Observed annual anomaly</span>
              <span className="font-semibold text-foreground">Trend: +0.21°C / decade</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold">Rainfall departure</p>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly departure from climatology</p>
              </div>
              <span className="text-[10px] font-semibold bg-secondary text-muted-foreground px-2 py-1 rounded-full">%</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={rainfallSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', fontSize: 11 }} formatter={(value) => [`${value}%`, 'Departure']} />
                <Bar dataKey="anomaly" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 pt-3 border-t border-border/60 flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> Monthly rainfall departure</span>
              <span className="ml-auto">Reference: climatology</span>
            </div>
          </div>
        </div>

        {/* Extremes + regional table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
          <div className="xl:col-span-1 bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-semibold">Extreme-event frequency</p>
                <p className="text-xs text-muted-foreground mt-0.5">Count per observation year</p>
              </div>
              <Activity size={16} className="text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={235}>
              <LineChart data={extremeEvents} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', fontSize: 11 }} />
                <Line type="monotone" dataKey="heat" name="Extreme heat" stroke="var(--danger)" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="rain" name="Heavy rainfall" stroke="var(--primary)" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Heat threshold ≥ 40°C</span>
              <span>Heavy rain ≥ 100 mm/day</span>
            </div>
          </div>

          <div className="xl:col-span-2 bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            <div className="p-5 border-b border-border/70 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Regional comparison</p>
                <p className="text-xs text-muted-foreground mt-0.5">Selected climate indicators across neighbouring states</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-secondary"><Filter size={15} className="text-muted-foreground" /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/50">
                  <tr className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-semibold">Region</th>
                    <th className="px-4 py-3 font-semibold">Temp anomaly</th>
                    <th className="px-4 py-3 font-semibold">Rainfall</th>
                    <th className="px-4 py-3 font-semibold">SPI-3</th>
                    <th className="px-4 py-3 font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {regionRows.map((row) => (
                    <tr key={row.region} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3 text-xs font-semibold">{row.region}</td>
                      <td className="px-4 py-3 text-xs font-mono-data">{row.temp}</td>
                      <td className="px-4 py-3 text-xs font-mono-data">{row.rain}</td>
                      <td className={`px-4 py-3 text-xs font-mono-data ${row.spi.startsWith('-') ? 'text-warning font-semibold' : 'text-success font-semibold'}`}>{row.spi}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${row.trend === 'up' ? 'text-danger' : 'text-warning'}`}>
                          {row.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {row.trend === 'up' ? 'Warming' : 'Drying'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Analysis snapshot · official data layer</span>
              <button className="flex items-center gap-1.5 font-semibold text-primary hover:underline"><FileDown size={12} /> Export table</button>
            </div>
          </div>
        </div>

        {/* Dataset lab */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Research data lab</p>
              <p className="text-xs text-muted-foreground mt-0.5">Dataset access, provenance and export controls for reproducible analysis.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input className="h-9 w-full sm:w-52 rounded-xl border border-border bg-secondary/40 pl-8 pr-3 text-xs outline-none focus:ring-2 focus:ring-ring" placeholder="Search datasets" />
              </div>
              <button className="h-9 px-3 rounded-xl border border-border bg-card text-xs font-semibold hover:bg-secondary flex items-center gap-2"><SlidersHorizontal size={13} /> Filters</button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
            {datasetCards.map((dataset) => (
              <div key={dataset.title} className="rounded-xl border border-border p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><DatabaseIcon /></div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">{dataset.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{dataset.coverage} · {dataset.resolution}</p>
                    <p className="text-[10px] text-muted-foreground">Updated {dataset.updated}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-2">
                  <span className="official-badge text-[9px] font-semibold px-1.5 py-0.5 rounded-full">QUALITY CONTROLLED</span>
                  <button className="ml-auto text-[10px] font-semibold text-primary hover:underline">Open dataset</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research provenance footer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1 pb-2 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success" /> Data provenance visible · Source metadata preserved with exports</div>
          <div className="flex items-center gap-3"><span>Source family: IMD / official climate services</span><span>·</span><span>Research view</span></div>
        </div>
      </div>
    </AppLayout>
  );
}

function DatabaseIcon() {
  return <div className="text-primary text-sm font-bold leading-none">DB</div>;
}

function BookmarkIcon({ saved }: { saved: boolean }) {
  return saved ? <span className="text-xs">✓</span> : <span className="text-xs">＋</span>;
}
