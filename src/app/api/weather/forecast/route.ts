import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function numberParam(value: string | null) {
  if (value === null || value.trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export async function GET(request: NextRequest) {
  const lat = numberParam(request.nextUrl.searchParams.get('lat'));
  const lon = numberParam(request.nextUrl.searchParams.get('lon'));

  if (lat === null || lon === null || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return NextResponse.json({ error: 'Valid latitude and longitude are required.' }, { status: 400 });
  }

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', '7');
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility');
  url.searchParams.set('hourly', 'temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,weather_code,wind_speed_10m,wind_direction_10m');
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset');
  url.searchParams.set('minutely_15', 'precipitation,rain,showers,weather_code');
  url.searchParams.set('forecast_minutely_15', '9');

  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return NextResponse.json({ error: 'Forecast provider is temporarily unavailable.' }, { status: 502 });
    const data = await response.json();
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch {
    return NextResponse.json({ error: 'Unable to fetch live forecast right now.' }, { status: 503 });
  }
}
