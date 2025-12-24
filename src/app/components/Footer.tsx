import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-200 text-sm">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Columna marca */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-800">
                <Image
                  src="/images/Logo-blanco.svg"
                  alt="Logo Imprenta Magenta"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-rosaClaro">
                  Imprenta Magenta
                </p>
                <p className="text-sm font-semibold text-white">Paysandú, Uruguay</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Impresión digital, offset y soluciones gráficas a medida. Packaging,
              papelería corporativa y productos personalizados para tu marca.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Más de 15 años acompañando a emprendedores, comercios y empresas.
            </p>
          </div>

          {/* Columna contacto */}
          <div>
            <p className="font-semibold text-white">Contacto</p>
            <p className="mt-2 text-sm text-slate-300">
              Proyectada 46 Nte. 987<br />
              60000 Paysandú, Uruguay
            </p>
            <p className="mt-2 text-sm text-slate-300">
              WhatsApp: <span className="font-semibold">098 273 040</span>
              <br />
              Email: <span className="font-semibold">info@magentauruguay.com</span>
            </p>
          </div>

          {/* Columna enlaces */}
          <div>
            <p className="font-semibold text-white">Enlaces</p>
            <div className="mt-2 flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-brand-rosaClaro">
                Inicio
              </Link>
              <Link href="/servicios" className="hover:text-brand-rosaClaro">
                Servicios
              </Link>
              <Link href="/productos" className="hover:text-brand-rosaClaro">
                Productos
              </Link>
              <Link href="/presupuesto" className="hover:text-brand-rosaClaro">
                Pedir presupuesto
              </Link>
              <Link href="/sobre-nosotros" className="hover:text-brand-rosaClaro">
                Sobre Imprenta Magenta
              </Link>
              <Link href="/testimonios" className="hover:text-brand-rosaClaro">
                Testimonios
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 text-center">
          <p>
            © 2025 Magenta. Todos los derechos reservados.
            <br className="sm:hidden" />
            <span className="sm:inline sm:ml-1">
              · Hecho con <span className="font-semibold text-slate-300">Next.js</span> por{' '}
              <Link
                href="https://www.devrodri.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-brand-rosaClaro hover:text-brand-magenta"
              >
                Rodrigo Opalo
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
