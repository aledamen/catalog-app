import Image from "next/image";
import Link from "next/link";
import { CartCountBadge } from "@/components/cart-count-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import type { SiteConfig } from "@/lib/site-config";

export function Navbar({ config }: { config: SiteConfig }) {
  return (
    <header
      className="sticky top-0 z-40 border-b shadow-card backdrop-blur-md"
      style={{ backgroundColor: 'var(--header-bg)', borderBottomColor: 'var(--header-border, #E5E5E5)' }}
    >
      <div className="container-shell flex h-20 items-center justify-between gap-3 sm:h-24 sm:gap-6">
        <Link className="flex items-center gap-3" href="/catalogo">
          <div
            className="relative h-7 sm:h-10 md:h-12"
            style={{ width: `min(${Number(config.logo_width) || 340}px, 45vw)` }}
          >
            <Image
              src={config.logo_url || "/brand/imagotipo-transparente-trimmed.png"}
              alt={config.store_name}
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <CartCountBadge config={config} />
        </div>
      </div>
    </header>
  );
}
