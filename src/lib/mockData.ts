// Backend integration point: Replace all exports with real API service calls

export const DEMO_LOCATIONS = [
  { id: 'loc-delhi', name: 'Kolkata', lat: 28.6139, lng: 77.209, state: 'Delhi' },
  { id: 'loc-mumbai', name: 'Mumbai', lat: 19.076, lng: 72.8777, state: 'Maharashtra' },
  { id: 'loc-chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu' },
  { id: 'loc-bengaluru', name: 'Bengaluru', lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
  { id: 'loc-kolkata', name: 'Kolkata', lat: 22.5726, lng: 88.3639, state: 'West Bengal' },
  { id: 'loc-hyderabad', name: 'Hyderabad', lat: 17.385, lng: 78.4867, state: 'Telangana' },
  { id: 'loc-guwahati', name: 'Guwahati', lat: 26.1445, lng: 91.7362, state: 'Assam' },
  { id: 'loc-kochi', name: 'Kochi', lat: 9.9312, lng: 76.2673, state: 'Kerala' },
];

export const DEMO_WEATHER = {
  location: 'Kolkata',
  state: 'Delhi',
  lat: 28.6139,
  lng: 77.209,
  temp: 34,
  feelsLike: 38,
  condition: 'Partly Cloudy',
  conditionCode: 'partly-cloudy',
  humidity: 72,
  windSpeed: 18,
  windDir: 'SW',
  visibility: 6.4,
  pressure: 1002,
  uvIndex: 7,
  precipitation: 2.4,
  dewPoint: 28,
  cloudCover: 45,
  sunrise: '06:02',
  sunset: '18:41',
  moonPhase: 'Waxing Gibbous',
  lastUpdated: '2026-09-08T17:45:00+05:30',
  dataType: 'OBSERVED',
  source: 'IMD Safdarjung Observatory',
};

export const DEMO_RISK = {
  overall: 68,
  label: 'High',
  color: 'high',
  breakdown: [
    { id: 'risk-rain', category: 'Rain', score: 75, trend: 'up', severity: 'High' },
    { id: 'risk-flood', category: 'Flood', score: 52, trend: 'up', severity: 'Moderate' },
    { id: 'risk-lightning', category: 'Lightning', score: 80, trend: 'up', severity: 'High' },
    { id: 'risk-heat', category: 'Heat', score: 71, trend: 'stable', severity: 'High' },
    { id: 'risk-wind', category: 'Wind', score: 38, trend: 'down', severity: 'Low' },
    { id: 'risk-cyclone', category: 'Cyclone', score: 15, trend: 'stable', severity: 'Low' },
    { id: 'risk-aqi', category: 'AQI', score: 63, trend: 'up', severity: 'Moderate' },
    { id: 'risk-fog', category: 'Fog', score: 20, trend: 'stable', severity: 'Low' },
  ],
  explanation:
    'Risk is elevated due to active thunderstorm development over NCR region. Lightning and heavy rainfall probability exceeds 80% for the next 6 hours. Heat stress remains high with apparent temperature near 38°C.',
  lastUpdated: '2026-09-08T17:50:00+05:30',
};

export const DEMO_HOURLY_FORECAST = [
  { id: 'hr-0', time: '18:00', temp: 34, feelsLike: 38, rain: 15, rainProb: 35, windSpeed: 18, condition: 'Partly Cloudy', icon: 'cloud-sun' },
  { id: 'hr-1', time: '19:00', temp: 32, feelsLike: 36, rain: 28, rainProb: 65, windSpeed: 24, condition: 'Thunderstorm', icon: 'storm' },
  { id: 'hr-2', time: '20:00', temp: 29, feelsLike: 33, rain: 42, rainProb: 82, windSpeed: 32, condition: 'Heavy Rain', icon: 'rain-heavy' },
  { id: 'hr-3', time: '21:00', temp: 27, feelsLike: 30, rain: 38, rainProb: 78, windSpeed: 28, condition: 'Heavy Rain', icon: 'rain-heavy' },
  { id: 'hr-4', time: '22:00', temp: 26, feelsLike: 29, rain: 22, rainProb: 55, windSpeed: 22, condition: 'Rain', icon: 'rain' },
  { id: 'hr-5', time: '23:00', temp: 25, feelsLike: 27, rain: 8, rainProb: 30, windSpeed: 16, condition: 'Overcast', icon: 'cloud' },
  { id: 'hr-6', time: '00:00', temp: 24, feelsLike: 26, rain: 3, rainProb: 18, windSpeed: 12, condition: 'Mostly Cloudy', icon: 'cloud' },
  { id: 'hr-7', time: '01:00', temp: 24, feelsLike: 25, rain: 1, rainProb: 12, windSpeed: 10, condition: 'Partly Cloudy', icon: 'cloud-moon' },
  { id: 'hr-8', time: '02:00', temp: 23, feelsLike: 24, rain: 0, rainProb: 8, windSpeed: 9, condition: 'Clear', icon: 'moon' },
  { id: 'hr-9', time: '03:00', temp: 23, feelsLike: 24, rain: 0, rainProb: 6, windSpeed: 8, condition: 'Clear', icon: 'moon' },
  { id: 'hr-10', time: '04:00', temp: 23, feelsLike: 24, rain: 0, rainProb: 5, windSpeed: 9, condition: 'Clear', icon: 'moon' },
  { id: 'hr-11', time: '05:00', temp: 24, feelsLike: 25, rain: 2, rainProb: 14, windSpeed: 11, condition: 'Partly Cloudy', icon: 'cloud-sun' },
];

export const DEMO_TEMP_TREND = [
  { id: 'tt-0', time: '06:00', temp: 28, feelsLike: 30 },
  { id: 'tt-1', time: '08:00', temp: 30, feelsLike: 33 },
  { id: 'tt-2', time: '10:00', temp: 32, feelsLike: 36 },
  { id: 'tt-3', time: '12:00', temp: 35, feelsLike: 40 },
  { id: 'tt-4', time: '14:00', temp: 36, feelsLike: 42 },
  { id: 'tt-5', time: '16:00', temp: 35, feelsLike: 40 },
  { id: 'tt-6', time: '18:00', temp: 34, feelsLike: 38 },
  { id: 'tt-7', time: '20:00', temp: 29, feelsLike: 33 },
  { id: 'tt-8', time: '22:00', temp: 26, feelsLike: 29 },
  { id: 'tt-9', time: '00:00', temp: 24, feelsLike: 26 },
];

export const DEMO_AQI = {
  value: 187,
  category: 'Unhealthy',
  color: 'danger',
  primaryPollutant: 'PM2.5',
  pm25: 98.4,
  pm10: 142.6,
  no2: 48.2,
  o3: 62.1,
  co: 1.4,
  so2: 12.8,
  healthConcern: 'Members of sensitive groups may experience health effects. General public less likely to be affected.',
  recommendation: 'Avoid prolonged outdoor exertion. Wear N95 mask if going outside.',
  lastUpdated: '2026-09-08T17:30:00+05:30',
  source: 'CPCB — Delhi Monitoring Network',
};

export const DEMO_ALERTS = [
  {
    id: 'alert-001',
    type: 'THUNDERSTORM',
    severity: 'HIGH',
    title: 'Thunderstorm Warning — NCR Region',
    agency: 'India Meteorological Department',
    agencyCode: 'IMD',
    region: 'Delhi, NCR, Gurugram, Noida',
    issuedAt: '2026-09-08T15:30:00+05:30',
    validUntil: '2026-09-08T23:00:00+05:30',
    message:
      'Thunderstorm with heavy rainfall (40–60mm) and lightning expected over Delhi-NCR. Gusty winds 50–70 km/h possible. Avoid open areas.',
    isDemoAlert: true,
    color: 'warning',
  },
  {
    id: 'alert-002',
    type: 'HEAT',
    severity: 'MODERATE',
    title: 'Heat Advisory — Daytime Temperatures',
    agency: 'India Meteorological Department',
    agencyCode: 'IMD',
    region: 'Delhi, Haryana, Rajasthan',
    issuedAt: '2026-09-08T06:00:00+05:30',
    validUntil: '2026-09-09T18:00:00+05:30',
    message:
      'Maximum temperatures likely to remain 3–5°C above normal. Heat stress conditions for outdoor workers. Stay hydrated.',
    isDemoAlert: true,
    color: 'warning',
  },
];

export const DEMO_DISASTERS = [
  { id: 'dis-cyclone', type: 'Cyclone', status: 'Watch', severity: 'LOW', region: 'Bay of Bengal', detail: 'Low pressure system forming. 72-hr track uncertain.', icon: 'wind' },
  { id: 'dis-flood', type: 'Flood', status: 'Warning', severity: 'MODERATE', region: 'Assam, Bihar', detail: 'Brahmaputra above warning level at Guwahati.', icon: 'droplets' },
  { id: 'dis-earthquake', type: 'Earthquake', status: 'None', severity: 'LOW', region: 'No recent activity', detail: 'No significant seismic activity in 24h.', icon: 'activity' },
  { id: 'dis-landslide', type: 'Landslide', status: 'Alert', severity: 'MODERATE', region: 'Uttarakhand, HP', detail: 'Saturated soil conditions. Avoid hill roads.', icon: 'mountain' },
  { id: 'dis-heatwave', type: 'Heatwave', status: 'Active', severity: 'HIGH', region: 'Delhi, Haryana, UP', detail: 'Day 3 of heat event. Apparent temp 42–46°C.', icon: 'thermometer' },
  { id: 'dis-lightning', type: 'Lightning', status: 'Warning', severity: 'HIGH', region: 'Delhi-NCR, UP', detail: 'High lightning strike probability next 6 hours.', icon: 'zap' },
];

export const DEMO_AI_SUMMARY = {
  text: 'Heavy thunderstorm activity developing over Delhi-NCR this evening. Lightning strike risk is HIGH — avoid open areas, rooftops, and water bodies between 7–10 PM. Carry rain gear if commuting. AQI is Unhealthy (187); N95 recommended outdoors. Heat stress elevated until thunderstorm brings relief after 9 PM.',
  confidence: 84,
  sources: ['IMD Thunderstorm Warning', 'Radar Observation', 'CPCB AQI', 'NWP Model GFS'],
  generatedAt: '2026-09-08T17:52:00+05:30',
  persona: 'Default',
};

export const DEMO_SAVED_LOCATIONS = [
  { id: 'saved-home', label: 'Home', name: 'Agarpara, Kolkata', temp: 34, condition: 'Thunderstorm', risk: 68, alertCount: 2 },
  { id: 'saved-office', label: 'Office', name: 'Connaught Place, Delhi', temp: 35, condition: 'Partly Cloudy', risk: 55, alertCount: 1 },
  { id: 'saved-family', label: 'Family', name: 'Lucknow, UP', temp: 36, condition: 'Clear', risk: 42, alertCount: 0 },
];

export const DEMO_MAP_ALERTS = [
  { id: 'map-alert-001', lat: 28.6139, lng: 77.209, type: 'THUNDERSTORM', severity: 'HIGH', title: 'Thunderstorm Warning — Delhi NCR', agency: 'IMD' },
  { id: 'map-alert-002', lat: 26.1445, lng: 91.7362, type: 'FLOOD', severity: 'MODERATE', title: 'Flood Warning — Brahmaputra', agency: 'CWC' },
  { id: 'map-alert-003', lat: 19.076, lng: 72.8777, type: 'RAIN', severity: 'LOW', title: 'Heavy Rain Watch — Mumbai Coast', agency: 'IMD' },
  { id: 'map-alert-004', lat: 13.0827, lng: 80.2707, type: 'CYCLONE', severity: 'LOW', title: 'Cyclone Watch — Bay of Bengal', agency: 'IMD' },
];

export const DEMO_SHELTERS = [
  { id: 'shelter-001', name: 'Indira Gandhi Indoor Stadium', lat: 28.6253, lng: 77.2402, capacity: 8000, distance: '3.2 km', status: 'Open', accessibility: true },
  { id: 'shelter-002', name: 'Talkatora Indoor Stadium', lat: 28.6268, lng: 77.1997, capacity: 2000, distance: '4.8 km', status: 'Open', accessibility: true },
  { id: 'shelter-003', name: 'DDA Sports Complex Agarpara', lat: 28.5921, lng: 77.0523, capacity: 1200, distance: '6.1 km', status: 'Open', accessibility: false },
];

export const PERSONAS = [
  { id: 'persona-default', key: 'default', label: 'Default', description: 'General weather awareness for everyday use', icon: '🌤️', color: 'primary' },
  { id: 'persona-urban', key: 'urban', label: 'Urban', description: 'City commuter — traffic, air quality, heat', icon: '🏙️', color: 'accent' },
  { id: 'persona-rural', key: 'rural', label: 'Rural', description: 'Village life — storms, power, road conditions', icon: '🌾', color: 'success' },
  { id: 'persona-farmer', key: 'farmer', label: 'Farmer', description: 'Crop planning — rain, soil, humidity, frost', icon: '🌱', color: 'success' },
  { id: 'persona-marine', key: 'marine', label: 'Marine', description: 'Sea conditions — waves, wind, visibility', icon: '⛵', color: 'accent' },
  { id: 'persona-aviation', key: 'aviation', label: 'Aviation', description: 'Flight safety — turbulence, visibility, icing', icon: '✈️', color: 'primary' },
  { id: 'persona-researcher', key: 'researcher', label: 'Researcher', description: 'Climate trends — datasets, anomalies, extremes', icon: '🔬', color: 'accent' },
];

export const LANGUAGES = [
  { id: 'lang-en', code: 'en', label: 'English', native: 'English' },
  { id: 'lang-hi', code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'lang-bn', code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { id: 'lang-ta', code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'lang-te', code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { id: 'lang-kn', code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { id: 'lang-ml', code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { id: 'lang-mr', code: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'lang-gu', code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { id: 'lang-or', code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
];

/**
 * Refresh the prototype data in-place so every full page reload presents a
 * fresh operational snapshot. This is still simulated data until wired to
 * IMD/NDMA/other live providers, but no dashboard value remains frozen.
 */
export function refreshDemoData() {
  const now = new Date();
  const seed = now.getTime();
  const random = (min: number, max: number) => min + Math.random() * (max - min);
  const round = (value: number, digits = 0) => Number(value.toFixed(digits));
  const iso = now.toISOString();
  const hour = now.getHours();
  const phase = Math.sin(seed / 5400000);
  const city = DEMO_LOCATIONS[Math.floor(Math.random() * DEMO_LOCATIONS.length)];
  const baseTemp = round(25 + random(0, 12));
  const rainProb = round(random(8, 88));
  const wind = round(random(8, 42));
  const riskBase = round(random(32, 86));
  const humidity = round(random(45, 88));
  const pressure = round(random(996, 1016));
  const feelsLike = baseTemp + round(random(1, 5));
  const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Rain', 'Thunderstorm', 'Heavy Rain'];
  const condition = conditions[Math.floor(random(0, conditions.length))];

  Object.assign(DEMO_WEATHER, {
    location: city.name,
    state: city.state,
    lat: city.lat,
    lng: city.lng,
    temp: baseTemp,
    feelsLike,
    condition,
    conditionCode: condition.toLowerCase().replace(/\s+/g, '-'),
    humidity,
    windSpeed: wind,
    windDir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(random(0, 8))],
    visibility: round(random(4.5, 12), 1),
    pressure,
    uvIndex: round(random(2, 10)),
    precipitation: round(random(0, 18), 1),
    dewPoint: Math.max(10, baseTemp - round(random(2, 7))),
    cloudCover: round(random(15, 95)),
    lastUpdated: iso,
    source: `IMD ${city.name} Observation`,
  });

  const riskCategories = [
    ['Rain', rainProb],
    ['Flood', round(rainProb * random(0.45, 0.8))],
    ['Lightning', round(random(20, 94))],
    ['Heat', round(random(20, 92))],
    ['Wind', round(random(18, 72))],
    ['Cyclone', round(random(8, 50))],
    ['AQI', round(random(25, 82))],
    ['Fog', round(random(5, 44))],
  ];
  DEMO_RISK.breakdown.splice(
    0,
    DEMO_RISK.breakdown.length,
    ...riskCategories.map(([category, score], i) => ({
      id: `risk-${String(category).toLowerCase()}`,
      category,
      score: Number(score),
      trend: (i % 3 === 0 ? 'up' : i % 3 === 1 ? 'stable' : 'down') as 'up' | 'stable' | 'down',
      severity: Number(score) >= 75 ? 'High' : Number(score) >= 45 ? 'Moderate' : 'Low',
    })),
  );
  DEMO_RISK.overall = riskBase;
  DEMO_RISK.label = riskBase >= 75 ? 'High' : riskBase >= 50 ? 'Moderate' : 'Low';
  DEMO_RISK.explanation = `Risk changed with the latest simulated snapshot for ${city.name}: rain probability ${rainProb}%, wind ${wind} km/h, humidity ${humidity}%, and apparent temperature ${feelsLike}°C.`;
  DEMO_RISK.lastUpdated = iso;

  const startHour = hour;
  DEMO_HOURLY_FORECAST.splice(
    0,
    DEMO_HOURLY_FORECAST.length,
    ...Array.from({ length: 12 }, (_, i) => {
      const h = (startHour + i) % 24;
      const temp = Math.max(20, round(baseTemp - i * 0.55 + phase * 1.4 + random(-1, 1)));
      const probability = Math.min(95, Math.max(3, round(rainProb - i * 4 + random(-10, 10))));
      return {
        id: `hr-${i}`,
        time: `${String(h).padStart(2, '0')}:00`,
        temp,
        feelsLike: temp + round(random(1, 4)),
        rain: round(probability * random(0.2, 0.75)),
        rainProb: probability,
        windSpeed: Math.max(5, round(wind + i * random(-0.3, 0.7))),
        condition: conditions[(i + Math.floor(seed / 3600000)) % conditions.length],
        icon: probability > 70 ? 'rain-heavy' : probability > 40 ? 'rain' : 'cloud-sun',
      };
    }),
  );

  DEMO_TEMP_TREND.splice(
    0,
    DEMO_TEMP_TREND.length,
    ...Array.from({ length: 10 }, (_, i) => {
      const h = (6 + i * 2) % 24;
      const temp = Math.max(18, round(baseTemp - 4 + Math.sin(i / 2) * 5 + random(-1.2, 1.2)));
      return { id: `tt-${i}`, time: `${String(h).padStart(2, '0')}:00`, temp, feelsLike: temp + round(random(1, 5)) };
    }),
  );

  const aqi = round(random(55, 240));
  Object.assign(DEMO_AQI, {
    value: aqi,
    category: aqi >= 200 ? 'Very Poor' : aqi >= 150 ? 'Unhealthy' : aqi >= 100 ? 'Poor' : 'Moderate',
    primaryPollutant: ['PM2.5', 'PM10', 'NO₂', 'O₃'][Math.floor(random(0, 4))],
    pm25: round(random(18, 120), 1),
    pm10: round(random(35, 190), 1),
    no2: round(random(12, 75), 1),
    o3: round(random(20, 110), 1),
    co: round(random(0.4, 2.4), 1),
    so2: round(random(4, 22), 1),
    lastUpdated: iso,
    source: `CPCB — ${city.name} Monitoring Network`,
  });
  DEMO_AQI.recommendation = aqi >= 150 ? 'Reduce prolonged outdoor exertion and consider a well-fitted mask in polluted areas.' : 'Air quality is manageable; sensitive groups should monitor conditions.';

  DEMO_ALERTS.splice(
    0,
    DEMO_ALERTS.length,
    {
      id: `alert-${seed}`,
      type: rainProb > 65 ? 'THUNDERSTORM' : 'RAIN',
      severity: riskBase >= 70 ? 'HIGH' : 'MODERATE',
      title: `${condition} Advisory — ${city.name}`,
      agency: 'India Meteorological Department',
      agencyCode: 'IMD',
      region: `${city.name}, ${city.state}`,
      issuedAt: iso,
      validUntil: new Date(seed + 6 * 60 * 60 * 1000).toISOString(),
      message: `${condition} conditions are possible around ${city.name}. Rain probability is ${rainProb}% with winds near ${wind} km/h. Monitor official updates and avoid exposed areas during severe weather.`,
      isDemoAlert: true,
      color: riskBase >= 70 ? 'danger' : 'warning',
    },
    {
      id: `alert-${seed}-2`,
      type: 'AIR_QUALITY',
      severity: aqi >= 150 ? 'HIGH' : 'MODERATE',
      title: `Air quality advisory — ${city.name}`,
      agency: 'CPCB',
      agencyCode: 'CPCB',
      region: city.name,
      issuedAt: iso,
      validUntil: new Date(seed + 12 * 60 * 60 * 1000).toISOString(),
      message: `AQI is ${aqi}. ${DEMO_AQI.recommendation}`,
      isDemoAlert: true,
      color: aqi >= 150 ? 'danger' : 'warning',
    },
  );

  const disasterRegions = [`${city.state}`, 'Bay of Bengal', 'Assam, Bihar', 'Uttarakhand, HP', 'Delhi-NCR, UP'];
  DEMO_DISASTERS.forEach((item, index) => {
    const score = riskCategories[(index + 1) % riskCategories.length][1] as number;
    item.severity = score >= 75 ? 'HIGH' : score >= 45 ? 'MODERATE' : 'LOW';
    item.status = item.severity === 'HIGH' ? 'Active' : item.severity === 'MODERATE' ? 'Warning' : 'Watch';
    item.region = index === 0 ? 'Bay of Bengal' : disasterRegions[index % disasterRegions.length];
    item.detail = `${item.type} monitoring updated ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST. Conditions may change with the latest forecast cycle.`;
  });

  Object.assign(DEMO_AI_SUMMARY, {
    text: `${condition} conditions are developing around ${city.name}. Rain probability is ${rainProb}%, wind ${wind} km/h, and current risk is ${DEMO_RISK.overall}/100 (${DEMO_RISK.label}). AQI is ${aqi}; follow official alerts and local safety guidance.`,
    confidence: round(random(72, 96)),
    generatedAt: iso,
    persona: DEMO_AI_SUMMARY.persona || 'Default',
  });

  DEMO_SAVED_LOCATIONS.forEach((location, index) => {
    const t = Math.max(20, round(baseTemp + random(-4, 4) + index));
    location.temp = t;
    location.condition = conditions[(index + Math.floor(seed / 1800000)) % conditions.length];
    location.risk = Math.min(95, Math.max(20, round(DEMO_RISK.overall + random(-18, 18))));
    location.alertCount = round(random(0, 3));
  });

  DEMO_MAP_ALERTS.forEach((alert, index) => {
    alert.lat += random(-0.25, 0.25);
    alert.lng += random(-0.25, 0.25);
    alert.severity = index === 0 && DEMO_RISK.overall >= 70 ? 'HIGH' : index % 2 ? 'MODERATE' : 'LOW';
    alert.title = `${alert.type.replace('_', ' ')} update — ${city.name}`;
  });

  DEMO_SHELTERS.forEach((shelter) => {
    shelter.capacity = Math.max(250, round(shelter.capacity + random(-500, 500)));
    shelter.distance = `${round(random(1.2, 9), 1)} km`;
    shelter.status = Math.random() > 0.12 ? 'Open' : 'Limited';
  });
}
