import { CartDrawer } from "@/components/cart-drawer";
import { FloatingCartButton } from "@/components/floating-cart-button";
import { Navbar } from "@/components/navbar";
import { WhatsappFab } from "@/components/whatsapp-fab";
import type { SiteConfig } from "@/lib/site-config";

type AppFrameProps = {
  children: React.ReactNode;
  config: SiteConfig;
};

export function AppFrame({ children, config }: AppFrameProps) {
  return (
    <div className="page-shell">
      <Navbar config={config} />
      <main>{children}</main>
      <CartDrawer whatsappNumber={config.whatsapp_number} />
      <WhatsappFab whatsappNumber={config.whatsapp_number} />
      <FloatingCartButton />
    </div>
  );
}
