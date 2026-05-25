import Image from "next/image";
import Link from "next/link";
import { CartCountBadge } from "@/components/cart-count-badge";
import type { SiteConfig } from "@/lib/site-config";

export function Navbar({ config }: { config: SiteConfig }) {
  const navLinks = [
    { href: "/catalogo", label: config.nav_catalogo_label },
    { href: "/carrito", label: config.nav_carrito_label },
    { href: "/checkout", label: config.nav_checkout_label },
  ];

  return (
    <header
      className="sticky top-0 z-40 border-b border-line shadow-card backdrop-blur-md"
      style={{ backgroundColor: config.header_bg }}
    >
      <div className="container-shell flex h-20 items-center justify-between gap-3 sm:h-24 sm:gap-6">
        <Link className="flex items-center gap-3" href="/catalogo">
          <div
            className="relative h-12 sm:h-16 md:h-20"
            style={{ width: `min(${Number(config.logo_width) || 340}px, 45vw)` }}
          >
            <Image
              src={config.logo_url || "/brand/imagotipo-transparente.png"}
              alt={config.store_name}
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link
              className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-75"
              style={{ color: config.header_text_color }}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <CartCountBadge />
      </div>
    </header>
  );
}
