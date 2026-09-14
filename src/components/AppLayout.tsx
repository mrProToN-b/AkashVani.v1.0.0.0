'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { refreshDemoData, DEMO_ALERTS } from '@/lib/mockData';
import { UI_LANGUAGES, getStoredLanguage, setStoredLanguage, translatePage } from '@/lib/i18n';
import {
  LayoutDashboard,
  Map,
  Bell,
  AlertTriangle,
  Wind,
  TrendingUp,
  CloudRain,
  MessageSquare,
  Wifi,
  Settings,
  ChevronLeft,
  ChevronRight,
  MapPin,
  LogOut,
  User,
  Globe,
  Zap,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  badgeColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', href: '/user-dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'nav-map', label: 'Live Map', href: '/live-weather-map', icon: <Map size={20} /> },
  { id: 'nav-alerts', label: 'Alerts', href: '/user-dashboard', icon: <Bell size={20} />, badge: 2, badgeColor: 'warning' },
  { id: 'nav-disaster', label: 'Disaster Intel', href: '/user-dashboard', icon: <AlertTriangle size={20} /> },
  { id: 'nav-aqi', label: 'Air Quality', href: '/user-dashboard', icon: <Wind size={20} /> },
  { id: 'nav-forecast', label: 'Forecast', href: '/user-dashboard', icon: <CloudRain size={20} /> },
  { id: 'nav-climate', label: 'Climate', href: '/user-dashboard/climate', icon: <TrendingUp size={20} /> },
  { id: 'nav-assistant', label: 'AI Assistant', href: '/user-dashboard/assistant', icon: <MessageSquare size={20} /> },
  { id: 'nav-sos', label: 'SOS', href: '/user-dashboard/sos', icon: <Zap size={20} />, badgeColor: 'danger' },
  { id: 'nav-offline', label: 'Offline Mode', href: '/user-dashboard', icon: <Wifi size={20} /> },
];

interface AppLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userPersona?: string;
  userLocation?: string;
}

export default function AppLayout({
  children,
  userName = 'Soumyajit Koley',
  userPersona = 'Default',
  userLocation = 'Kolkata',
}: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [liveLocation, setLiveLocation] = useState(userLocation);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(userPersona);
  const [dataVersion, setDataVersion] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(getStoredLanguage());
  const pathname = usePathname();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const PERSONA_OPTIONS = [
    { label: 'Default', key: 'default', description: 'General weather awareness' },
    { label: 'Urban', key: 'urban', description: 'City, commute, heat & air quality' },
    { label: 'Rural', key: 'rural', description: 'Village, storms & infrastructure' },
    { label: 'Farmer', key: 'farmer', description: 'Crop, rain & field planning' },
    { label: 'Marine', key: 'marine', description: 'Sea, wind & visibility' },
    { label: 'Aviation', key: 'aviation', description: 'Flight weather & visibility' },
    { label: 'Researcher', key: 'researcher', description: 'Climate trends & research data' },
  ];

  React.useEffect(() => {
    const applyLanguage = () => {
      const language = getStoredLanguage();
      setSelectedLanguage(language);
      translatePage(language.code);
    };
    applyLanguage();
    const onLanguageChange = () => applyLanguage();
    window.addEventListener('akashvani:language-changed', onLanguageChange);
    return () => window.removeEventListener('akashvani:language-changed', onLanguageChange);
  }, []);

  React.useEffect(() => {
    const handlePointer = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
        setLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointer);
    return () => document.removeEventListener('mousedown', handlePointer);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new MutationObserver(() => {
      const language = getStoredLanguage();
      translatePage(language.code);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    refreshDemoData();
    setDataVersion(Date.now());
    try {
      const saved = window.localStorage.getItem('akashvani_persona');
      if (saved) setSelectedPersona(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let watchId: number | null = null;
    let lastReverseGeocodeAt = 0;

    const applyStoredLocation = () => {
      try {
        const raw = window.localStorage.getItem('akashvani_live_location');
        if (!raw) return;
        const stored = JSON.parse(raw) as { label?: string };
        if (stored?.label) setLiveLocation(stored.label);
      } catch {}
    };

    const reverseGeocode = async (latitude: number, longitude: number) => {
      const now = Date.now();
      // Avoid repeatedly calling the reverse geocoder while GPS is moving.
      if (now - lastReverseGeocodeAt < 30000) return;
      lastReverseGeocodeAt = now;

      try {
        const response = await fetch(`/api/geocode?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`, {
          cache: 'no-store',
        });
        if (!response.ok) return;
        const data = await response.json();
        const result = data?.result;
        if (!result) return;

        const locality = result.name || result.city || 'Current location';
        const parts = [locality, result.state].filter(Boolean);
        const label = parts.join(', ');
        if (!label) return;

        setLiveLocation(label);
        window.localStorage.setItem(
          'akashvani_live_location',
          JSON.stringify({
            label,
            latitude,
            longitude,
            displayName: result.displayName || label,
            updatedAt: new Date().toISOString(),
          }),
        );
        window.dispatchEvent(new Event('akashvani:live-location-updated'));
      } catch {}
    };

    const onPosition = (position: GeolocationPosition) => {
      void reverseGeocode(position.coords.latitude, position.coords.longitude);
    };

    applyStoredLocation();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        onPosition,
        () => {
          // Keep the supplied location as a graceful fallback when GPS is denied.
          setLiveLocation((current) => current || userLocation);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
      );

      watchId = navigator.geolocation.watchPosition(
        onPosition,
        () => {},
        { enableHighAccuracy: true, maximumAge: 60000, timeout: 20000 },
      );
    }

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [userLocation]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('akashvani_persona', selectedPersona);
        const raw = window.localStorage.getItem('akashvani_user');
        if (raw) {
          const user = JSON.parse(raw);
          window.localStorage.setItem('akashvani_user', JSON.stringify({ ...user, persona: selectedPersona }));
        }
      } catch {}
    }
  }, [selectedPersona]);

  const persona = PERSONA_OPTIONS.find((item) => item.key === selectedPersona) || PERSONA_OPTIONS[0];

  const handlePersonaChange = (key: string) => {
    setSelectedPersona(key);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('akashvani:persona-changed', { detail: key }));
    }
    const target = key === 'researcher' ? '/user-dashboard/climate' : '/user-dashboard';
    if (pathname !== target) router.push(target);
  };

  const isActive = (href: string) => href === '/user-dashboard' ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-card border-r border-border sidebar-transition ${
          collapsed ? 'w-16' : 'w-60'
        } flex-shrink-0 z-30`}
      >
        {/* Logo */}
        <div className={`flex items-center border-b border-border ${collapsed ? 'p-3 justify-center' : 'px-4 py-3'}`}>
          <div className="flex items-center gap-2 min-w-0">
            <AppLogo size={32} />
            {!collapsed && (
              <span className="font-semibold text-base text-foreground tracking-tight truncate">
                AkashVani
              </span>
            )}
          </div>
        </div>

        {/* Location indicator */}
        {!collapsed && (
          <div className="px-4 py-2 border-b border-border bg-secondary/40">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} className="text-primary flex-shrink-0" />
              <span className="truncate font-mono-data">{liveLocation}</span>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
          <div className="px-2 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 group relative ${
                  isActive(item.href)
                    ? 'nav-active font-semibold' :'text-muted-foreground hover:bg-secondary hover:text-foreground'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className={`flex-shrink-0 ${isActive(item.href) ? 'text-primary' : ''}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span
                    className={`ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                      item.badgeColor === 'warning' ?'bg-warning/15 text-amber-700'
                        : item.badgeColor === 'danger' ?'bg-danger/15 text-red-700' :'bg-primary/10 text-primary'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-warning" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Persona badge */}
        {!collapsed && (
          <div className="px-3 py-2.5 border-t border-border">
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 px-1">
              Experience mode
            </label>
            <select
              value={selectedPersona}
              onChange={(e) => handlePersonaChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-secondary/60 px-3 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
              aria-label="Change AkashVani experience mode"
            >
              {PERSONA_OPTIONS.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-muted-foreground mt-1.5 px-1 truncate" title={persona.description}>
              {persona.description}
            </p>
          </div>
        )}

        {/* User profile */}
        <div className={`border-t border-border ${collapsed ? 'p-2' : 'p-3'}`}>
          <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-primary" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">User Account</p>
              </div>
            )}
            {!collapsed && (
              <Link href="/" className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <LogOut size={16} className="text-muted-foreground" />
              </Link>
            )}
          </div>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center py-2 border-t border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-4 lg:px-6 h-14 flex items-center justify-between flex-shrink-0 z-20">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <AppLogo size={28} />
            <span className="font-semibold text-sm text-foreground">AkashVani</span>
          </div>

          {/* Desktop breadcrumb area */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} className="text-primary" />
            <span className="font-mono-data text-foreground font-medium">{liveLocation}</span>
            <span className="text-border">·</span>
            <span>Updated 5 min ago</span>
          </div>

          {/* Right actions */}
          <div ref={headerRef} className="flex items-center gap-2 relative">
            <div className="hidden sm:flex items-center gap-1.5 bg-success/10 text-success text-xs font-semibold px-2.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-slow" />
              Live
            </div>
            <button
              onClick={() => { setNotificationsOpen((value) => !value); setLanguageOpen(false); }}
              className="p-2 rounded-lg hover:bg-secondary transition-colors relative"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell size={18} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-warning" />
            </button>
            <button
              onClick={() => { setLanguageOpen((value) => !value); setNotificationsOpen(false); }}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Language"
              aria-expanded={languageOpen}
            >
              <Globe size={18} className="text-muted-foreground" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-12 top-12 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Notifications</p>
                    <p className="text-xs text-muted-foreground">Current alerts</p>
                  </div>
                  <button onClick={() => setNotificationsOpen(false)} className="text-xs font-semibold text-muted-foreground hover:text-foreground">Close</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {DEMO_ALERTS.length ? DEMO_ALERTS.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="px-4 py-3 border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start gap-2">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-warning flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{alert.type} · {alert.severity}</p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">{alert.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{alert.message}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">No notifications</div>
                  )}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <Link href="/user-dashboard" onClick={() => setNotificationsOpen(false)} className="text-xs font-semibold text-primary hover:underline">View all alerts</Link>
                </div>
              </div>
            )}

            {languageOpen && (
              <div className="absolute right-0 top-12 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">Language</p>
                  <p className="text-xs text-muted-foreground">Select language</p>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2 max-h-80 overflow-y-auto">
                  {UI_LANGUAGES.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => { setStoredLanguage(language.code); setSelectedLanguage(language); setLanguageOpen(false); }}
                      className={`text-left px-3 py-2 rounded-lg transition-colors ${selectedLanguage.code === language.code ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'}`}
                    >
                      <div className="text-sm font-semibold">{language.native}</div>
                      <div className="text-[10px] text-muted-foreground">{language.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Link href="/user-dashboard" className="hidden lg:flex">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Settings size={18} className="text-muted-foreground" />
              </button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div key={dataVersion}>
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden bg-card border-t border-border flex items-center justify-around px-2 py-2 flex-shrink-0 z-30">
          {[
            { id: 'mob-home', label: 'Home', href: '/user-dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'mob-map', label: 'Map', href: '/live-weather-map', icon: <Map size={20} /> },
            { id: 'mob-alerts', label: 'Alerts', href: '/user-dashboard', icon: <Bell size={20} /> },
            { id: 'mob-ai', label: 'Ask AI', href: '/user-dashboard/assistant', icon: <MessageSquare size={20} /> },
            { id: 'mob-more', label: 'More', href: '/user-dashboard', icon: <Settings size={20} /> },
          ].map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}