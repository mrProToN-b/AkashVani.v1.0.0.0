import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function reverseResult(item: any) {
  const address = item.address ?? {};
  const name =
    address.suburb ||
    address.neighbourhood ||
    address.village ||
    address.town ||
    address.city ||
    address.municipality ||
    address.county ||
    item.name ||
    item.display_name?.split(',')[0] ||
    'Current location';

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county ||
    '';
  const state = address.state || address.state_district || '';
  const district = address.state_district || address.county || '';
  const pincode = address.postcode || '';

  return {
    name,
    city,
    state,
    district,
    pincode,
    lat: Number(item.lat),
    lng: Number(item.lon),
    displayName: item.display_name || name,
  };
}

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get('lat');
  const lon = request.nextUrl.searchParams.get('lon');
  const query = request.nextUrl.searchParams.get('q')?.trim();

  try {
    // Browser GPS -> readable location name.
    if (lat && lon) {
      const latitude = Number(lat);
      const longitude = Number(lon);

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return NextResponse.json({ error: 'Invalid coordinates.' }, { status: 400 });
      }

      const url = new URL('https://nominatim.openstreetmap.org/reverse');
      url.searchParams.set('lat', String(latitude));
      url.searchParams.set('lon', String(longitude));
      url.searchParams.set('format', 'jsonv2');
      url.searchParams.set('addressdetails', '1');
      url.searchParams.set('zoom', '14');
      url.searchParams.set('accept-language', 'en');

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'AkashVani/1.0 (weather-dashboard-location)',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: 'Location provider is temporarily unavailable.' },
          { status: 502 },
        );
      }

      const data = await response.json();
      return NextResponse.json({ result: reverseResult(data) });
    }

    // Existing forward-search behaviour used by the location search UI.
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('q', query);
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('limit', '6');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('countrycodes', 'in');
    url.searchParams.set('accept-language', 'en');

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'AkashVani/1.0 (weather-dashboard-location-search)',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Location search provider is temporarily unavailable.' },
        { status: 502 },
      );
    }

    const data = (await response.json()) as Array<{
      place_id: number;
      lat: string;
      lon: string;
      display_name: string;
      name?: string;
      type?: string;
      address?: Record<string, string | undefined>;
    }>;

    const results = data.map((item) => {
      const address = item.address ?? {};
      const name =
        item.name ||
        address.city ||
        address.town ||
        address.village ||
        address.suburb ||
        address.county ||
        item.display_name.split(',')[0];
      const state = address.state || address.state_district || address.county || '';
      const district = address.state_district || address.county || '';
      const pincode = address.postcode || '';

      return {
        id: String(item.place_id),
        name,
        state,
        district,
        pincode,
        lat: Number(item.lat),
        lng: Number(item.lon),
        displayName: item.display_name,
        type: item.type || 'location',
      };
    });

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: 'Unable to resolve location right now.' },
      { status: 503 },
    );
  }
}
