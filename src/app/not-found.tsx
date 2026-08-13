// src/app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscás no existe en el sitio de Magenta.",
  robots: {
    index: false,
    follow: true,
  },
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Magenta oscurecido ~15%: #e6007e no alcanza AA 4,5:1 en texto chico sobre fondos claros. */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

/*
 * 404 global. Cubre tanto URLs inexistentes como las rutas que se apagan solas
 * por falta de contenido (hoy /portfolio con el dataset vacío).
 *
 * El layout raíz ya envuelve las páginas en <main> y aporta Navbar y Footer:
 * acá el contenedor es un <div> para no anidar dos landmarks main.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center bg-slate-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-20">
        <p
          className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
        >
          Error 404
        </p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          No encontramos esa página.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Puede que el enlace haya cambiado o que el contenido todavía no esté
          publicado.
        </p>

        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
          <Link
            href="/"
            className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-7 text-sm font-semibold text-white transition hover:bg-[#c3006b] sm:w-auto ${FOCUS_RING}`}
          >
            Volver al inicio
          </Link>
          <Link
            href="/productos"
            className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-[#c3006b] hover:underline ${FOCUS_RING}`}
          >
            Ver productos
            <LuArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
