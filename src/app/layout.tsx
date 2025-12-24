import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Imprenta Magenta Paysandú – Impresión digital, offset y packaging gastronómico",
  description: "Imprenta Magenta es una imprenta moderna en Paysandú, especializada en impresión digital, offset, packaging gastronómico, bolsas de papel, adhesivos, afiches y material administrativo para empresas y emprendedores.",
  metadataBase: new URL("https://www.magentauruguay.com"),
  openGraph: {
    title: "Imprenta Magenta Paysandú – Impresión digital, offset y packaging gastronómico",
    description: "Imprenta Magenta es una imprenta moderna en Paysandú, especializada en impresión digital, offset, packaging gastronómico, bolsas de papel, adhesivos, afiches y material administrativo para empresas y emprendedores.",
    url: "/",
    siteName: "Imprenta Magenta Paysandú",
    images: [
      {
        url: "/og-magenta.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imprenta Magenta Paysandú – Impresión digital, offset y packaging gastronómico",
    description: "Imprenta Magenta es una imprenta moderna en Paysandú, especializada en impresión digital, offset, packaging gastronómico, bolsas de papel, adhesivos, afiches y material administrativo para empresas y emprendedores.",
    images: ["/og-magenta.jpg"],
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENIDO */}
        <main>{children}</main>

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}