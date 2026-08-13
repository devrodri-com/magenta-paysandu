import { MAILTO_PRESUPUESTO, WHATSAPP_URL_TEXT } from "@/data/contact";
import { QuoteForm } from "./QuoteForm";

const actionLinkClassName =
  "inline-flex min-h-[44px] items-center justify-center rounded-full px-7 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";

export default function PresupuestoPage() {
  return (
    <div className="min-h-screen bg-slate-900 px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Necesitás un presupuesto?
          </h1>
          <p className="mt-3 text-sm text-slate-200 sm:text-base">
            Contanos qué tipo de trabajo necesitás y algunos detalles básicos.
            Según la opción que elijas, te mostramos las preguntas clave para
            preparar la cotización.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_URL_TEXT}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionLinkClassName} bg-brand-magenta text-white shadow-lg hover:bg-[#c3006b]`}
            >
              Escribir por WhatsApp
            </a>
            <a
              href={MAILTO_PRESUPUESTO}
              className={`${actionLinkClassName} border border-slate-300 text-slate-100 hover:border-brand-rosaClaro hover:text-brand-rosaClaro`}
            >
              Enviar un email
            </a>
          </div>
        </header>

        <section
          aria-labelledby="quote-form-heading"
          className="rounded-3xl bg-slate-800 p-6 shadow-xl sm:p-8"
        >
          <div className="mb-6">
            <h2 id="quote-form-heading" className="text-xl font-semibold">
              Datos para la cotización
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Los campos marcados con * son obligatorios. No guardamos estos
              datos en una base de datos ni en archivos.
            </p>
          </div>

          {/*
            La Sitekey se resuelve en el Server Component y baja como prop: es
            pública por definición y así el Client Component no depende de que
            `process.env` quede inlineado en el bundle del navegador.
          */}
          <QuoteForm
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
          />
        </section>
      </div>
    </div>
  );
}
