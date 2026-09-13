import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
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
      { error: 'Unable to search locations right now.' },
      { status: 503 },
    );
  }
}
