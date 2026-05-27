import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppFrame } from "@/components/app-frame";
import { getSiteConfig } from "@/lib/site-config";
import { ThemeProvider } from "@/lib/theme";

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
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* anti-flash: apply dark class before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />
        <style>{`
          :root {
            --brand-accent: ${config.accent_color};
            --brand-accent-deep: ${config.accent_deep_color};
            --header-bg: ${config.header_bg};
            --header-text: ${config.header_text_color};
          }
          .dark {
            --header-bg: #151A28;
            --header-text: #ffffff;
          }
        `}</style>
      </head>
      <body className={font.className}>
        <ThemeProvider>
          {config.announcement_enabled === 'true' && config.announcement_text && (
            <div
              style={{ backgroundColor: config.announcement_bg, color: config.announcement_text_color }}
              className="w-full py-2 text-center text-sm font-medium"
            >
              {config.announcement_text}
            </div>
          )}
          <AppFrame config={config}>{children}</AppFrame>
        </ThemeProvider>
      </body>
    </html>
  );
}
