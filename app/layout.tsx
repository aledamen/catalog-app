import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppFrame } from "@/components/app-frame";

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={font.className}>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
