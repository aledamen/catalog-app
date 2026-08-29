"use client";

import { useCartHydrated, useCartStore } from "@/lib/cart-store";
import { buildDudaHref, hasWhatsAppNumber } from "@/lib/whatsapp";

type WhatsappFabProps = {
  whatsappNumber: string | null;
};

export function WhatsappFab({ whatsappNumber }: WhatsappFabProps) {
  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);

  if (!hasWhatsAppNumber(whatsappNumber)) return null;

  const href = buildDudaHref(hydrated ? items : [], whatsappNumber);

  return (
    <a
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-panel transition-transform hover:scale-105"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
    >
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.44 1.27 4.89L2 22l5.24-1.28c1.4.76 3 1.18 4.8 1.18 5.52 0 10-4.48 10-10s-4.48-9.9-10-9.9zm5.85 14.16c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .9 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.31.38-.44.51-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
      </svg>
    </a>
  );
}
