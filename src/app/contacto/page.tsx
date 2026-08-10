// src/app/contacto/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import {
  CONTACT_ADDRESS,
  CONTACT_CITY,
  CONTACT_EMAIL,
  CONTACT_HOURS,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MAILTO_CONTACTO,
  MAPS_EMBED_URL,
  MAPS_LINK_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  WHATSAPP_URL_TEXT,
  WHATSAPP_URL_TEXT_CONSULTA,
} from "@/data/contact";

export const metadata: Metadata = {
  title: "Contacto – WhatsApp, email y ubicación en Paysandú | Imprenta Magenta",
  description:
    "Escribinos por WhatsApp o email para consultas generales, o visitá Imprenta Magenta en Paysandú. Encontrá acá todos nuestros canales de contacto, horarios y cómo llegar.",
  alternates: {
    canonical: "/contacto",
  },
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Variante para la banda oscura final: el offset del ring debe ser oscuro. */
const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/** Magenta oscurecido ~15%: #e6007e no alcanza AA 4,5:1 en texto chico sobre fondos claros. */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

type DirectChannel = {
  name: string;
  detail: string;
  href: string;
  Icon: IconType;
  external: boolean;
};

/** Los handles visibles derivan de las URLs vigentes; no inventar otros. */
const DIRECT_CHANNELS: DirectChannel[] = [
  {
    name: "WhatsApp",
    detail: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL_TEXT_CONSULTA,
    Icon: FaWhatsapp,
    external: true,
  },
  {
    name: "Email",
    detail: CONTACT_EMAIL,
    href: MAILTO_CONTACTO,
    Icon: FaEnvelope,
    external: false,
  },
  {
    name: "Instagram",
    detail: "@magentapaysandu",
    href: INSTAGRAM_URL,
    Icon: FaInstagram,
    external: true,
  },
  {
    name: "Facebook",
    detail: "facebook.com/magentapaysandu",
    href: FACEBOOK_URL,
    Icon: FaFacebook,
    external: true,
  },
];

/*
 * El layout raíz ya envuelve las páginas en <main>: acá el contenedor es un
 * <div> para no anidar dos landmarks main.
 */
export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* A. Apertura: rosa muy sutil, CTA directo a WhatsApp y desvío claro hacia /presupuesto. */}
      <header className="bg-gradient-to-b from-pink-50/70 via-pink-50/30 to-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Contacto
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Hablemos de lo que necesitás.
          </h1>
          <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            <p>
              Para consultas generales, coordinar una visita o conocer más sobre
              nuestros servicios, escribinos por WhatsApp o email.
            </p>
            <p>
              Si querés cotizar un trabajo, completá el formulario de
              presupuesto para contarnos todos los detalles.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <a
              href={WHATSAPP_URL_TEXT_CONSULTA}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-7 text-sm font-semibold text-white transition hover:bg-[#c3006b] sm:w-auto ${FOCUS_RING}`}
            >
              Escribinos por WhatsApp
            </a>
            <Link
              href="/presupuesto"
              className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-brand-magenta hover:underline ${FOCUS_RING}`}
            >
              Pedir presupuesto
              <LuArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* B. Canales directos: lista editorial de filas clickeables, sin cards ni cápsulas. */}
      <section aria-labelledby="canales-heading" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Canales directos
          </p>
          <h2
            id="canales-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Contactanos directamente
          </h2>
          <ul
            role="list"
            className="mt-8 max-w-3xl divide-y divide-slate-200 border-y border-slate-200"
          >
            {DIRECT_CHANNELS.map(({ name, detail, href, Icon, external }) => (
              <li key={name}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`group flex min-h-[44px] items-center gap-4 rounded-lg py-4 sm:gap-5 sm:py-5 ${FOCUS_RING}`}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-brand-magenta"
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <span className="text-sm font-semibold text-slate-900 sm:text-base">
                      {name}
                    </span>
                    <span className="min-w-0 break-words text-sm text-slate-600 transition-colors group-hover:text-slate-900 sm:text-right">
                      {detail}
                    </span>
                  </span>
                  <LuArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate-400 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-magenta motion-reduce:transition-none"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* C. Ubicación: datos prácticos en columna angosta + mapa protagonista (~40/60). */}
      <section
        aria-labelledby="ubicacion-heading"
        className="border-t border-slate-100 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 lg:py-20">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Ubicación
          </p>
          <h2
            id="ubicacion-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Visitá Imprenta Magenta
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-x-14">
            <div>
              <address className="not-italic">
                <dl className="space-y-6">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Dirección
                    </dt>
                    <dd className="mt-1 text-sm text-slate-900 sm:text-base">
                      {CONTACT_ADDRESS}
                      <br />
                      {CONTACT_CITY}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Horarios
                    </dt>
                    <dd className="mt-1 text-sm text-slate-900 sm:text-base">
                      {CONTACT_HOURS}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      WhatsApp
                    </dt>
                    <dd className="text-sm sm:text-base">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-[44px] items-center rounded-lg font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-brand-magenta hover:underline ${FOCUS_RING}`}
                      >
                        {WHATSAPP_DISPLAY}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Email
                    </dt>
                    <dd className="text-sm sm:text-base">
                      <a
                        href={MAILTO_CONTACTO}
                        className={`inline-flex min-h-[44px] items-center rounded-lg font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-brand-magenta hover:underline ${FOCUS_RING}`}
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </dd>
                  </div>
                </dl>
              </address>

              <a
                href={MAPS_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-6 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 underline underline-offset-4 transition-colors hover:text-brand-magenta ${FOCUS_RING}`}
              >
                Cómo llegar
                <LuArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </a>
            </div>

            <div className="relative h-72 overflow-hidden rounded-3xl border border-slate-200 sm:h-80 lg:h-auto lg:min-h-[26rem]">
              <iframe
                src={MAPS_EMBED_URL}
                title="Ubicación de Imprenta Magenta en Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* D. Cierre: panel oscuro compacto y centrado hacia /presupuesto (composición distinta a Productos, Servicios y Nosotros). */}
      <section aria-labelledby="contacto-cta-heading" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pb-20 sm:pt-16">
          <div className="rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-12 sm:py-14">
            <h2
              id="contacto-cta-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              ¿Querés pedir un presupuesto?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-slate-300 sm:text-base">
              Contanos qué trabajo necesitás, las cantidades y las terminaciones
              que tenés en mente.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
              <Link
                href="/presupuesto"
                className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-7 text-sm font-semibold text-white transition hover:bg-[#c3006b] sm:w-auto ${FOCUS_RING_DARK}`}
              >
                Completar presupuesto
              </Link>
              <a
                href={WHATSAPP_URL_TEXT}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-white underline-offset-4 transition-colors hover:text-brand-rosaClaro hover:underline ${FOCUS_RING_DARK}`}
              >
                Escribir por WhatsApp
                <LuArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
