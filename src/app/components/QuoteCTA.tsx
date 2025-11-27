// src/app/components/QuoteCTA.tsx
export default function QuoteCTA() {
    return (
      <section className="bg-slate-900 py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              ¿Necesitás un presupuesto?
            </h2>
            <p className="mt-3 text-sm text-slate-200 sm:text-base">
              Contanos qué tipo de trabajo necesitás (tarjetas, bolsas, folletos, revistas,
              packaging, etc.) y te ayudamos a definir el mejor formato para tu proyecto.
            </p>
  
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/59898273040"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta/70"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="/presupuesto"
                className="text-sm font-semibold text-slate-100 hover:text-brand-rosaClaro"
              >
                Completar formulario de presupuesto
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }