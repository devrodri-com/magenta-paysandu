import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PAGE_SEO, SEO_CONFIG, robotsForPath } from "@/config/seo";

const homeMetadata = PAGE_SEO["/"];
const openGraphImageUrl = new URL(
  SEO_CONFIG.openGraphImage.path,
  SEO_CONFIG.canonicalOrigin,
).toString();

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.canonicalOrigin),
  applicationName: SEO_CONFIG.publicBrand,
  title: {
    default: homeMetadata.title,
    template: `%s | ${SEO_CONFIG.titleSuffix}`,
  },
  description: homeMetadata.description,
  robots: robotsForPath("/"),
  openGraph: {
    title: homeMetadata.title,
    description: homeMetadata.description,
    siteName: SEO_CONFIG.siteName,
    images: [
      {
        url: openGraphImageUrl,
        width: SEO_CONFIG.openGraphImage.width,
        height: SEO_CONFIG.openGraphImage.height,
        alt: SEO_CONFIG.openGraphImage.alt,
      },
    ],
    locale: SEO_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeMetadata.title,
    description: homeMetadata.description,
    images: [openGraphImageUrl],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "192x192", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SEO_CONFIG.language}>
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
