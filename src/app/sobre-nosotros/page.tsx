// src/app/sobre-nosotros/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  LuArrowRight,
  LuClock,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import { metadataForPath } from "@/config/seo";
import { ABOUT_CLAIM, ABOUT_STORY } from "@/data/about";
import MissionVisionValues from "./MissionVisionValues";
import {
  CONTACT_ADDRESS,
  CONTACT_CITY,
  CONTACT_EMAIL,
  CONTACT_HOURS,
  MAPS_EMBED_URL,
  MAPS_LINK_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  WHATSAPP_URL_TEXT,
} from "@/data/contact";

export const metadata = metadataForPath("/sobre-nosotros");

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Variante para la banda oscura final: el offset del ring debe ser oscuro. */
const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/** Magenta oscurecido ~15%: #e6007e no alcanza AA 4,5:1 en texto chico sobre fondos claros. */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

/*
 * El layout raíz ya envuelve las páginas en <main>: acá el contenedor es un
 * <div> para no anidar dos landmarks main.
 */
export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* A. Apertura: historia completa + foto del local en crop vertical (distinta escala que Home). */}
      <header className="bg-gradient-to-b from-pink-50/80 via-pink-50/40 to-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-14 sm:pb-14 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-x-16 lg:pb-16 lg:pt-20">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
            >
              Nosotros
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {ABOUT_CLAIM}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {ABOUT_STORY.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 shadow-sm lg:aspect-[4/5]">
            <Image
              src="/images/hero-image.jpg"
              alt="Frente del local de Imprenta Magenta en Paysandú: entrada vidriada con el cartel redondo de la marca."
              fill
              sizes="(min-width: 1024px) 384px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* B. Misión, Visión y Valores: tríptico institucional, reconstrucción del croquis en HTML/CSS. */}
      <MissionVisionValues />

      {/* C. Evolución y tecnología: puente breve hacia /servicios, sin repetir las máquinas. */}
      <section
        aria-labelledby="evolucion-heading"
        className="border-t border-slate-100 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Tecnología
          </p>
          <h2
            id="evolucion-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Invertimos para seguir evolucionando
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            La inversión constante en tecnología es parte de cómo trabajamos:
            incorporamos nuevas máquinas y soluciones para ofrecer más calidad,
            mejores tiempos de entrega y nuevos productos que acompañen el
            crecimiento de cada cliente.
          </p>
          <Link
            href="/servicios"
            className={`group mt-6 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-[#c3006b] hover:underline ${FOCUS_RING}`}
          >
            Conocé cómo trabajamos
            <LuArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </section>

      {/* D. Local y ubicación: datos vigentes + mapa, sin formulario (eso vive en /contacto). */}
      <section
        aria-labelledby="ubicacion-heading"
        className="border-t border-slate-100 bg-white"
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
            Estamos en Paysandú
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-x-16">
            <div>
              <address className="not-italic">
                <ul role="list" className="space-y-3 text-sm text-slate-600 sm:text-base">
                  <li className="flex items-start gap-3">
                    <LuMapPin
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-magenta"
                    />
                    <span>
                      {CONTACT_ADDRESS}
                      <br />
                      {CONTACT_CITY}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <LuClock
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-magenta"
                    />
                    {CONTACT_HOURS}
                  </li>
                  <li className="flex items-center gap-3">
                    <LuPhone
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-brand-magenta"
                    />
                    <span>
                      WhatsApp:{" "}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-[44px] items-center rounded-lg font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-brand-magenta hover:underline ${FOCUS_RING}`}
                      >
                        {WHATSAPP_DISPLAY}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <LuMail
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-brand-magenta"
                    />
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className={`inline-flex min-h-[44px] items-center rounded-lg font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-brand-magenta hover:underline ${FOCUS_RING}`}
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                </ul>
              </address>

              <a
                href={MAPS_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex min-h-[44px] items-center rounded-lg text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-brand-magenta hover:underline ${FOCUS_RING}`}
              >
                Cómo llegar
              </a>

              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7 lg:flex-col lg:items-start lg:gap-4">
                <a
                  href={WHATSAPP_URL_TEXT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-7 text-sm font-semibold text-white transition hover:bg-[#c3006b] sm:w-auto ${FOCUS_RING}`}
                >
                  Escribinos por WhatsApp
                </a>
                <Link
                  href="/contacto"
                  className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-brand-magenta hover:underline ${FOCUS_RING}`}
                >
                  Ir a la página de contacto
                  <LuArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </div>
            </div>

            <div className="relative h-72 overflow-hidden rounded-3xl border border-slate-200 sm:h-80 lg:h-auto lg:min-h-[24rem]">
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

      {/* E. CTA final: banda oscura compacta y centrada (composición distinta a /servicios y /productos). */}
      <section aria-labelledby="sobre-cta-heading" className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:py-14">
          <h2
            id="sobre-cta-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-slate-300 sm:text-base">
            Contanos qué necesitás y te ayudamos a encontrar la mejor forma de
            hacerlo.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
            <Link
              href="/presupuesto"
              className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-7 text-sm font-semibold text-white transition hover:bg-[#c3006b] sm:w-auto ${FOCUS_RING_DARK}`}
            >
              Pedir presupuesto
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
      </section>
    </div>
  );
}
