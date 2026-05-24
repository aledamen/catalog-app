import Image from "next/image";
import Link from "next/link";
import { CartCountBadge } from "@/components/cart-count-badge";

const navLinks = [
  { href: "/catalogo", label: "Catalogo" },
  { href: "/carrito", label: "Carrito" },
  { href: "/checkout", label: "Checkout" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 shadow-card backdrop-blur-md">
      <div className="container-shell flex h-20 items-center justify-between gap-3 sm:h-24 sm:gap-6">
        <Link className="flex items-center gap-3" href="/catalogo">
          <div className="relative h-12 w-[140px] sm:h-16 sm:w-[240px] md:h-20 md:w-[340px]">
            <Image
              src="/brand/imagotipo-transparente.png"
              alt="Fase-Beta"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 transition-all hover:bg-accent/10 hover:text-ink"
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
