"use client";

import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
// src/app/presupuesto/page.tsx
const QUESTION_SETS: Record<string, string[]> = {
  libretas: [
    "¿Cuántas libretas necesitás? (cada libreta trae 50 documentos)",
    "¿Cuántas tintas? (por defecto, 1 tinta negra)",
    "¿Qué tipo de papel preferís? ¿Papel obra o papel autocopiante?",
    "¿Qué medida? (estándar 15 x 19 cm, u otra)",
  ],
  tarjetas: [
    "¿Cuántas tarjetas necesitás? (mínimo 100 unidades)",
    "¿Solo frente o frente y dorso?",
    "¿Qué medida preferís? (estándar 9 x 5 cm)",
    "¿Qué papel preferís? ¿Coteado 350 g o 300 g?",
    "¿Querés laminado mate para mayor durabilidad?",
  ],
  afiches: [
    "¿Cuántos afiches necesitás?",
    "¿Qué medida? (A4, A3 o 47 x 33 cm)",
    "¿Qué papel preferís? (coteado 115 g o 170 g)",
    "¿Ya tenés el diseño o lo realizamos nosotros?",
  ],
  bonos: [
    "¿Cuántos bonos necesitás?",
    "¿Son con Lotería o con Quiniela?",
    "¿Qué medida preferís? (estándar 10 x 15 cm)",
    "¿Cuántas tintas llevará? (normalmente 1 tinta)",
  ],
  anotadores: [
    "¿Cuántos anotadores necesitás? (vienen en bloques de 100 hojas)",
    "¿Qué medida preferís? (estándar 10 x 15 cm)",
    "¿Cuántas tintas necesitás?",
  ],
  carpetas: [
    "¿Cuántas carpetas necesitás?",
    "¿Con bolsillo interior o sin bolsillo?",
    "¿Qué papel preferís? ¿Coteado 300 g o papel ficha?",
    "¿Qué medida necesitás? (estándar 46 x 32 cm abierto)",
  ],
  volantes: [
    "¿Cuántos volantes necesitás? (mejor si indicás una cantidad mínima para cotizar escalado)",
    "¿Qué medida? (10 x 15 cm, 20 x 15 cm u otra)",
    "¿Qué papel preferís? ¿Obra 80 g, coteado 115 g o 170 g?",
    "¿Cuántas tintas lleva?",
    "¿Solo frente o frente y dorso?",
    "¿Tenés el diseño o preferís que lo hagamos nosotros?",
  ],
  bolsas: [
    "¿Cuántas bolsas necesitás? (mínimo 100 unidades; Elite 225 g mínimo 500)",
    "¿Qué tipo de papel? ¿Kraft blanco/marrón, coteado 170 g o cartulina 225 g?",
    "¿Qué medida? (grandes 38 x 26 x 10, medianas 17 x 25,5 x 7, chicas 19 x 12 x 5, u otra)",
    "¿Cuántas tintas lleva?",
    "¿Llevan pleno en frente o en lateral?",
  ],
  adhesivos: [
    "¿Cuántos adhesivos necesitás?",
    "¿Qué medida?",
    "¿Los necesitás entregados en planchas o individuales?",
    "¿Adhesivo transparente o semibrillo?",
  ],
};

type JobTypeOption = {
  value: string;
  label: string;
};

const JOB_TYPE_OPTIONS: JobTypeOption[] = [
  { value: "libretas", label: "Libretas" },
  { value: "tarjetas", label: "Tarjetas personales" },
  { value: "afiches", label: "Afiches" },
  { value: "bonos", label: "Bonos" },
  { value: "anotadores", label: "Anotadores" },
  { value: "carpetas", label: "Carpetas" },
  { value: "volantes", label: "Volantes" },
  { value: "bolsas", label: "Bolsas de papel" },
  { value: "adhesivos", label: "Adhesivos" },
  { value: "otro", label: "Otro tipo de trabajo" },
];

interface JobTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

function JobTypeSelect({ value, onChange }: JobTypeSelectProps) {
  const [open, setOpen] = useState(false);

  const selected = JOB_TYPE_OPTIONS.find((opt) => opt.value === value);

  return (
    <div className="relative mt-1">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-left text-sm text-white outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta/70"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>
          {selected ? selected.label : "Elegí una opción"}
        </span>
        <LuChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 py-1 text-sm text-slate-100 shadow-lg">
          {JOB_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`flex w-full items-center px-3 py-2 text-left hover:bg-slate-800 ${
                opt.value === value ? "text-brand-rosaClaro" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PresupuestoPage() {
  const [jobType, setJobType] = useState("");

  const questions = jobType ? QUESTION_SETS[jobType] : null;

    return (
      <main className="min-h-screen bg-slate-900 text-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Necesitás un presupuesto?
            </h1>
            <p className="mt-3 text-sm text-slate-200 sm:text-base">
              Contanos qué tipo de trabajo necesitás y algunos detalles básicos. Según el tipo de trabajo que elijas, te vamos a mostrar las preguntas clave que usamos para armar la cotización.
            </p>
  
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/59898273040"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta/70"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="mailto:info@magentauruguay.com"
                className="rounded-full border border-slate-300/40 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-brand-rosaClaro hover:text-brand-rosaClaro transition"
              >
                Enviar un email
              </a>
            </div>
          </div>
  
          <section className="rounded-3xl bg-slate-800 p-6 sm:p-8 shadow-xl">
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-200">
                    Nombre / Empresa
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                    placeholder="Tu nombre o el de tu negocio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-200">
                    WhatsApp / Celular
                  </label>
                  <input
                    type="tel"
                    className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                    placeholder="Tu número de Celular"
                  />
                </div>
              </div>
  
              <div>
                <label className="block text-xs font-medium text-slate-200">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
  
              <div>
                <label className="block text-xs font-medium text-slate-200">
                  Tipo de trabajo
                </label>
                <JobTypeSelect value={jobType} onChange={setJobType} />
                {questions && (
                  <div className="mt-4 rounded-2xl bg-slate-900/70 p-4 text-xs text-slate-200 sm:text-sm">
                    <p className="font-semibold">Para este tipo de trabajo, contanos:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4">
                      {questions.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[0.7rem] sm:text-xs text-slate-400">
                      Podés responder estas preguntas en el campo de mensaje de abajo.
                    </p>
                  </div>
                )}
              </div>
  
              <div>
                <label className="block text-xs font-medium text-slate-200">Mensaje</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                  rows={4}
                  placeholder="Respondé acá las preguntas según el tipo de trabajo (cantidad, medidas, papel, tintas, etc.) y cualquier otro detalle que quieras contarnos."
                />
              </div>
  
              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-brand-magenta px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
              >
                Enviar consulta
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }