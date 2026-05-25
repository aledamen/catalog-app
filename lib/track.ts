import { headers } from 'next/headers'

const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API_URL ?? 'http://localhost:3000'

export async function trackView(path: string) {
  try {
    const hdrs = await headers()
    const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? hdrs.get('x-real-ip')
      ?? 'unknown'
    const userAgent = hdrs.get('user-agent') ?? ''

    // Fire and forget — don't await
    fetch(`${INVENTORY_API}/api/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, ip, userAgent }),
      cache: 'no-store',
    }).catch(() => {})
  } catch {}
}
