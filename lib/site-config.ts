const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API_URL ?? 'http://localhost:3000'

export type SiteConfig = {
  store_name: string
  accent_color: string
  accent_deep_color: string
  hero_overline: string
  hero_title: string
  hero_subtitle: string
  announcement_enabled: string
  announcement_text: string
  announcement_bg: string
  announcement_text_color: string
  whatsapp_number: string
  instagram_handle: string
  header_bg: string
  header_text_color: string
  nav_catalogo_label: string
  nav_carrito_label: string
  nav_checkout_label: string
  logo_url: string
  logo_width: string
  stock_urgency_enabled: string
  stock_urgency_threshold: string
  featured_section_enabled: string
  featured_section_title: string
}

const FALLBACK: SiteConfig = {
  store_name: 'Fase-Beta',
  accent_color: '#2CC8E0',
  accent_deep_color: '#169FB6',
  hero_overline: 'Catálogo completo',
  hero_title: 'Todo lo que necesitás.',
  hero_subtitle: 'Elegí los productos, armá tu carrito y enviá el pedido por WhatsApp en segundos.',
  announcement_enabled: 'false',
  announcement_text: '',
  announcement_bg: '#2CC8E0',
  announcement_text_color: '#ffffff',
  whatsapp_number: '',
  instagram_handle: '',
  header_bg: '#ffffff',
  header_text_color: '#0A0A0A',
  nav_catalogo_label: 'Catálogo',
  nav_carrito_label: 'Carrito',
  nav_checkout_label: 'Checkout',
  logo_url: '',
  logo_width: '340',
  stock_urgency_enabled: 'false',
  stock_urgency_threshold: '5',
  featured_section_enabled: 'false',
  featured_section_title: 'Destacados',
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
