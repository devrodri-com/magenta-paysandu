// src/app/components/QuoteCTA.tsx
import Link from "next/link";
import { WHATSAPP_URL_TEXT } from "@/data/contact";

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
            <p className="text-sm text-slate-200 sm:text-base mt-2">
              Si necesitás un trabajo que no está en la lista, escribinos. También realizamos productos a medida según tus necesidades.
            </p>
  
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_URL_TEXT}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta/70"
              >
                Escribir por WhatsApp
              </a>
              <Link
                href="/presupuesto"
                className="rounded-full border border-slate-300/40 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-brand-rosaClaro hover:text-brand-rosaClaro transition"
              >
                Completar formulario de presupuesto
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }