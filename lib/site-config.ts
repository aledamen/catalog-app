const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API_URL ?? 'http://localhost:3000'

export type SiteConfig = {
  store_name: string
  accent_color: string
  accent_deep_color: string
  hero_title: string
  hero_subtitle: string
  announcement_enabled: string
  announcement_text: string
  announcement_bg: string
  announcement_text_color: string
  whatsapp_number: string
  instagram_handle: string
}

const FALLBACK: SiteConfig = {
  store_name: 'Fase-Beta',
  accent_color: '#6366f1',
  accent_deep_color: '#4f46e5',
  hero_title: 'Todo lo que necesitás.',
  hero_subtitle: 'Elegí los productos, armá tu carrito y enviá el pedido por WhatsApp en segundos.',
  announcement_enabled: 'false',
  announcement_text: '',
  announcement_bg: '#6366f1',
  announcement_text_color: '#ffffff',
  whatsapp_number: '',
  instagram_handle: '',
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${INVENTORY_API}/api/site-config`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error('config fetch failed')
    return res.json()
  } catch {
    return FALLBACK
  }
}
