import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";

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
      <body className="bg-white text-slate-900 antialiased">
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENIDO */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="mt-20 border-t border-slate-200 bg-slate-50 py-12 text-sm text-slate-600">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-slate-900">Imprenta Magenta</p>
              <p className="mt-2">
                Impresión digital, offset y soluciones gráficas en Paysandú.
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">Contacto</p>
              <p className="mt-2">
                Calle 46 Norte 987<br />
                Paysandú, Uruguay
              </p>
              <p className="mt-2">
                WhatsApp: 098 273 040<br />
                Email: imprentamagentauy@gmail.com
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">Enlaces</p>
              <div className="mt-2 flex flex-col gap-2">
                <a href="/servicios" className="hover:text-pink-600">Servicios</a>
                <a href="/productos" className="hover:text-pink-600">Productos</a>
                <a href="/revista-magenta" className="hover:text-pink-600">Revista Magenta</a>
                <a href="/contacto" className="hover:text-pink-600">Contacto</a>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Imprenta Magenta Paysandú - Todos los derechos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}