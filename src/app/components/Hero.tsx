import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL_TEXT } from "@/data/contact";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      {/*
        El orden del DOM es el orden de lectura en mobile y tablet:
        título, descripción, trayectoria, CTAs y por último la imagen.
        Desde 1024px la imagen pasa a `absolute inset-0` y funciona como
        escena completa del Hero, con el texto en flujo normal por encima.
      */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:py-12 lg:grid lg:min-h-[34rem] lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Todo lo que tu empresa necesita para imprimir,{" "}
            <span className="text-brand-rosa">en un solo lugar.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-200 sm:mt-5 sm:text-lg">
            Impresión offset y digital con calidad, rapidez y atención personalizada.
          </p>

          <p className="mt-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-rosaClaro sm:text-sm">
            Más de 16 años de experiencia
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href={WHATSAPP_URL_TEXT}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-6 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-rosa sm:w-auto ${FOCUS_RING}`}
            >
              Escribinos por WhatsApp
            </a>
            <Link
              href="/servicios"
              className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:border-brand-rosaClaro hover:text-brand-rosaClaro sm:w-auto ${FOCUS_RING}`}
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </div>

      {/*
        Una sola instancia de la imagen para todos los breakpoints.
        Hasta 1023px el marco interior mide 175% del ancho visible y se ancla a
        la derecha: eso recorta el tercio izquierdo de la foto (mesa vacía y el
        exhibidor negro) y deja encuadrados los productos.
        Desde 1024px la imagen se muestra completa y el degradado tapa la
        misma zona izquierda.
      */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2] lg:absolute lg:inset-0 lg:z-0 lg:aspect-auto lg:h-full">
        <div className="absolute inset-y-0 right-0 w-[175%] lg:w-full">
          <Image
            src="/images/hero/hero-magenta-2026.webp"
            alt="Trabajos impresos por Imprenta Magenta: bolsas de papel, cajas, folletos, talonarios y etiquetas sobre una mesa, con las máquinas de impresión al fondo."
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 175vw"
            className="object-cover object-center"
          />
        </div>

        {/* Degradado sólo en desktop: en mobile y tablet la imagen va sin overlay. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(to_right,rgb(2,6,23)_0%,rgb(2,6,23)_42%,rgba(2,6,23,0.72)_52%,rgba(2,6,23,0.3)_62%,rgba(2,6,23,0.06)_72%,rgba(2,6,23,0)_80%)]"
        />
      </div>
    </section>
  );
}
