import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppFrame } from "@/components/app-frame";
import { getSiteConfig } from "@/lib/site-config";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fase-beta.vercel.app"),
  title: {
    default: "Fase-Beta Catalogo",
    template: "%s | Fase-Beta"
  },
  description:
    "Catalogo premium de suplementos deportivos y saludables de Fase-Beta con carrito y checkout por WhatsApp.",
  icons: {
    icon: "/brand/isotipo.png",
    shortcut: "/brand/isotipo.png",
    apple: "/brand/isotipo.png"
  },
  openGraph: {
    title: "Fase-Beta Catalogo",
    description:
      "Explora suplementos, accesorios y arma tu pedido para WhatsApp en segundos.",
    images: ["/brand/imagotipo.png"]
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig()

  return (
    <html lang="es">
      <head>
        <style>{`
          :root {
            --brand-accent: ${config.accent_color};
            --brand-accent-deep: ${config.accent_deep_color};
          }
        `}</style>
      </head>
      <body className={font.className}>
        {config.announcement_enabled === 'true' && config.announcement_text && (
          <div
            style={{ backgroundColor: config.announcement_bg, color: config.announcement_text_color }}
            className="w-full py-2 text-center text-sm font-medium"
          >
            {config.announcement_text}
          </div>
        )}
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
