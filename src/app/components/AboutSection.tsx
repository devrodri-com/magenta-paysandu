import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuClock, LuMapPin } from "react-icons/lu";
import { ABOUT_CLAIM, ABOUT_SUMMARY } from "@/data/about";
import {
  CONTACT_ADDRESS,
  CONTACT_HOURS,
  MAPS_LINK_URL,
  WHATSAPP_URL_TEXT,
} from "@/data/contact";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Magenta oscurecido ~15%: #e6007e no alcanza AA 4,5:1 en texto chico sobre fondos claros. */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

/**
 * Resumen institucional de la Home: claim + historia condensada + CTA a
 * /sobre-nosotros. La versión completa (pilares, ubicación, mapa) vive en la
 * página interna; acá solo una línea compacta de datos prácticos.
 */
export default function AboutSection() {
  return (
    <section
      aria-labelledby="nosotros-heading"
      className="border-t border-slate-100 bg-pink-50/40 py-16 sm:py-20"
    >
      {/*
        45/55 texto|foto en desktop. La fila de datos prácticos es un tercer
        hijo de la grilla (col-span-2): así en mobile el flujo del DOM da el
        orden pedido —texto, CTA, foto y recién después los datos—.
      */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-center lg:gap-x-14">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Nosotros
          </p>
          <h2
            id="nosotros-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {ABOUT_CLAIM}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {ABOUT_SUMMARY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/sobre-nosotros"
            className={`group mt-6 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold underline-offset-4 transition-colors hover:underline ${MAGENTA_TEXT_AA} ${FOCUS_RING}`}
          >
            Conocé más sobre Magenta
            <LuArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <Image
            src="/images/hero-image.jpg"
            alt="Fachada del local de Imprenta Magenta en Paysandú, con el cartel de la marca sobre la entrada."
            fill
            sizes="(min-width: 1152px) 620px, (min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Datos prácticos compactos: una sola línea envolvente, sin cards. */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-1 border-t border-slate-200 pt-5 lg:col-span-2">
          <p className="inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-600">
            <LuMapPin
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-brand-magenta"
            />
            {CONTACT_ADDRESS}, Paysandú
          </p>
          <p className="inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-600">
            <LuClock
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-brand-magenta"
            />
            {CONTACT_HOURS}
          </p>
          <a
            href={MAPS_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[44px] items-center rounded-lg text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-[#c3006b] hover:underline ${FOCUS_RING}`}
          >
            Cómo llegar
          </a>
          <a
            href={WHATSAPP_URL_TEXT}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-[#c3006b] hover:underline ${FOCUS_RING}`}
          >
            Escribinos por WhatsApp
            <LuArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
