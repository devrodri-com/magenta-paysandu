import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { WHATSAPP_URL_TEXT } from "@/data/contact";

/**
 * El outline transparente no se ve en pantalla (el anillo visible lo da el ring),
 * pero en modo de alto contraste forzado el sistema lo pinta, así que el foco
 * sigue siendo visible ahí.
 */
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/** Magenta de marca oscurecido ~15%: blanco encima da 5,9:1 (AA) contra los 3,2:1 de brand-rosa. */
const CTA_HOVER = "hover:bg-[#c3006b]";

/**
 * Overlay de desktop: sólido hasta el 38% (tapa el exhibidor impreso del asset,
 * cuyo texto termina en el 35,7%), transición de 38% a 47% y totalmente
 * transparente desde ahí, para no apagar bolsas, cajas, talonarios ni rollos.
 * Los porcentajes son del escenario, no del viewport: por eso la relación entre
 * riel de texto y degradado se mantiene igual en ultrawide.
 */
const DESKTOP_OVERLAY =
  "lg:bg-[linear-gradient(to_right,rgb(2,6,23)_0%,rgb(2,6,23)_38%,rgba(2,6,23,0.8)_40.5%,rgba(2,6,23,0.4)_43.5%,rgba(2,6,23,0.1)_45.5%,rgba(2,6,23,0)_47%)]";

/**
 * Desvanecido inferior: funde el borde de la foto con la superficie de
 * BenefitsBar para que se lean como una sola pieza, sin línea divisoria.
 * Acotado a los últimos 8% del alto: cae sobre la mesa de madera, no sobre
 * los productos.
 */
const DESKTOP_BOTTOM_FADE =
  "lg:bg-[linear-gradient(to_top,rgb(2,6,23)_0%,rgba(2,6,23,0.45)_2.5%,rgba(2,6,23,0)_8%)]";

export default function Hero() {
  return (
    <section className="bg-slate-950">
      {/*
        Escenario visual: imagen, degradado y contenido viven acá adentro y se
        topan en 1600px. Debajo de 1600 es full-bleed (idéntico a antes); por
        encima queda centrado y el excedente es fondo slate-950 de la sección.
        Como el contenido interno también es max-w-6xl centrado, el riel
        izquierdo sigue coincidiendo con el del resto del sitio en cualquier ancho.
      */}
      <div className="relative isolate mx-auto w-full max-w-[100rem] overflow-hidden">
        {/*
          Hasta 1023px el contenido y la imagen van en flujo, dentro del mismo
          contenedor. Desde 1024px el contenedor pasa a `static` para que la
          imagen se posicione contra el escenario y funcione como escena completa.
          px-4 en todos los breakpoints: es el riel que usa el resto del sitio.
        */}
        <div className="relative mx-auto max-w-6xl px-4 pb-7 pt-9 sm:pb-9 sm:pt-12 lg:static lg:flex lg:min-h-[30rem] lg:items-center lg:py-16">
          {/* Riel de contenido: ~34-38% del ancho útil en desktop. */}
          <div className="relative z-10 lg:max-w-[22rem] xl:max-w-[26rem]">
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2rem] xl:text-[2.5rem]">
              Todo lo que tu empresa necesita para imprimir,{" "}
              {/* Desde 640px la frase magenta no se parte: evita que quede "lugar." solo. */}
              <span className="text-brand-rosa sm:whitespace-nowrap">en un solo lugar.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-5 lg:text-[0.9375rem] xl:text-base">
              Impresión offset y digital con calidad, rapidez y atención personalizada.
            </p>

            <div className="mt-6 flex flex-col items-start gap-0.5 sm:mt-7 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={WHATSAPP_URL_TEXT}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-6 text-sm font-semibold text-white transition sm:w-auto ${CTA_HOVER} ${FOCUS_RING}`}
              >
                Escribinos por WhatsApp
              </a>

              {/* Link secundario editorial: sin cápsula ni borde. */}
              <Link
                href="/servicios"
                className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-white underline-offset-4 transition-colors hover:text-brand-rosaClaro hover:underline ${FOCUS_RING}`}
              >
                Ver servicios
                <LuArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/*
            Una sola instancia de la imagen.
            Hasta 1023px es un panel redondeado dentro del Hero; el marco interior
            mide 190% del ancho visible y se ancla a la derecha, así que sólo entra
            el 52,6% derecho del asset (desde el 47,4%) y el exhibidor queda fuera.
            Desde 1024px es la escena completa y el degradado tapa esa misma zona.
          */}
          <div className="relative mt-7 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/[0.06] sm:mt-8 sm:aspect-[3/2] lg:absolute lg:inset-0 lg:z-0 lg:mt-0 lg:aspect-auto lg:h-full lg:rounded-none lg:border-0">
            <div className="absolute inset-y-0 right-0 w-[190%] lg:w-full">
              <Image
                src="/images/hero/hero-magenta-2026.webp"
                alt="Trabajos impresos por Imprenta Magenta: bolsas de papel, cajas, folletos, talonarios y etiquetas sobre una mesa, con las máquinas de impresión al fondo."
                fill
                priority
                sizes="(min-width: 1600px) 1600px, (min-width: 1024px) 100vw, 190vw"
                className="object-cover object-center"
              />
            </div>

            <div aria-hidden="true" className={`absolute inset-0 hidden lg:block ${DESKTOP_OVERLAY}`} />
            <div aria-hidden="true" className={`absolute inset-0 hidden lg:block ${DESKTOP_BOTTOM_FADE}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
