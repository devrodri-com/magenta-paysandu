import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Imprenta Magenta Paysandú",
  description: "Impresión offset y digital con calidad y rapidez.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-900 antialiased">
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