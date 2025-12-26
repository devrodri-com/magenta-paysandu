"use client";

import { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";
import { QUESTION_SETS } from "@/data/questionSets";
import { WHATSAPP_URL_TEXT, MAILTO_PRESUPUESTO } from "@/data/contact";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = "job-type-dropdown";

  const selected = JOB_TYPE_OPTIONS.find((opt) => opt.value === value);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={dropdownRef} className="relative mt-1">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? dropdownId : undefined}
        className="flex w-full items-center justify-between rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-left text-sm text-white outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta/70"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>
          {selected ? selected.label : "Elegí una opción"}
        </span>
        <LuChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div id={dropdownId} className="absolute z-20 mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 py-1 text-sm text-slate-100 shadow-lg">
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
                href={WHATSAPP_URL_TEXT}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta/70"
              >
                Escribir por WhatsApp
              </a>
              <a
                href={MAILTO_PRESUPUESTO}
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
                    <ul className="mt-2 list-none space-y-1 pl-0">
                      {questions.map((q, index) => {
                        const n = index + 1;
                        return (
                          <li key={q}>
                            <span className="text-slate-500 font-medium">{n}.</span> {q}
                          </li>
                        );
                      })}
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