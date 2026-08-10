import Image from "next/image";
import Link from "next/link";
import { ABOUT_FOOTER_TAGLINE } from "@/data/about";
import {
  CONTACT_ADDRESS,
  CONTACT_CITY,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/data/contact";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";

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
            <p className="mt-2 text-xs text-slate-400">{ABOUT_FOOTER_TAGLINE}</p>
          </div>

          {/* Columna contacto */}
          <div>
            <p className="font-semibold text-white">Contacto</p>
            <address className="not-italic">
              <p className="mt-2 text-sm text-slate-300">
                {CONTACT_ADDRESS}
                <br />
                {CONTACT_CITY}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                WhatsApp:{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[44px] items-center rounded font-semibold text-slate-100 underline-offset-4 hover:text-brand-rosaClaro hover:underline ${FOCUS_RING}`}
                >
                  {WHATSAPP_DISPLAY}
                </a>
                <br />
                Email:{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={`inline-flex min-h-[44px] items-center rounded font-semibold text-slate-100 underline-offset-4 hover:text-brand-rosaClaro hover:underline ${FOCUS_RING}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </address>
          </div>

          {/* Columna enlaces */}
          <div>
            <p className="font-semibold text-white">Enlaces</p>
            {/* Sin gap: cada link ya aporta el alto de target de 44px. */}
            <div className="mt-1 flex flex-col items-start text-sm">
              <Link href="/" className={`inline-flex min-h-[44px] items-center rounded hover:text-brand-rosaClaro ${FOCUS_RING}`}>
                Inicio
              </Link>
              <Link href="/servicios" className={`inline-flex min-h-[44px] items-center rounded hover:text-brand-rosaClaro ${FOCUS_RING}`}>
                Servicios
              </Link>
              <Link href="/productos" className={`inline-flex min-h-[44px] items-center rounded hover:text-brand-rosaClaro ${FOCUS_RING}`}>
                Productos
              </Link>
              <Link href="/presupuesto" className={`inline-flex min-h-[44px] items-center rounded hover:text-brand-rosaClaro ${FOCUS_RING}`}>
                Pedir presupuesto
              </Link>
              <Link href="/sobre-nosotros" className={`inline-flex min-h-[44px] items-center rounded hover:text-brand-rosaClaro ${FOCUS_RING}`}>
                Nosotros
              </Link>
              <Link href="/contacto" className={`inline-flex min-h-[44px] items-center rounded hover:text-brand-rosaClaro ${FOCUS_RING}`}>
                Contacto
              </Link>
              <Link href="/testimonios" className={`inline-flex min-h-[44px] items-center rounded hover:text-brand-rosaClaro ${FOCUS_RING}`}>
                Testimonios
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-400 text-center">
          <p>
            © {new Date().getFullYear()} Magenta. Todos los derechos reservados.
            <br className="sm:hidden" />
            <span className="sm:inline sm:ml-1">
              · Hecho con <span className="font-semibold text-slate-300">Next.js</span> por{' '}
              <Link
                href="https://www.devrodri.com"
                target="_blank"
                rel="noreferrer"
                className={`rounded font-semibold text-brand-rosaClaro underline-offset-4 hover:underline ${FOCUS_RING}`}
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
