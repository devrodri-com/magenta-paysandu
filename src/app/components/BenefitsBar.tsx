import type { IconType } from "react-icons";
import { LuMessageCircle, LuClock3, LuLayers, LuTruck, LuAward } from "react-icons/lu";

const BENEFITS: { Icon: IconType; title: string; detail: string }[] = [
  {
    Icon: LuMessageCircle,
    title: "Atención personalizada",
    detail: "Te asesoramos en cada trabajo.",
  },
  {
    Icon: LuClock3,
    title: "Rapidez y cumplimiento",
    detail: "Entregamos en los plazos acordados.",
  },
  {
    Icon: LuLayers,
    title: "Calidad profesional",
    detail: "Impresión offset y digital.",
  },
  {
    Icon: LuTruck,
    title: "Reparto sin costo",
    detail: "Entregamos en Paysandú sin costo adicional.",
  },
  {
    Icon: LuAward,
    title: "Más de 16 años de experiencia",
    detail: "Imprenta con trayectoria en Paysandú.",
  },
];

export default function BenefitsBar() {
  return (
    <section
      aria-label="Por qué elegirnos"
      className="border-t border-slate-800/40 bg-slate-900 text-slate-100"
    >
      <div className="mx-auto max-w-6xl px-4 py-5 sm:py-6">
        <ul className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map(({ Icon, title, detail }) => (
            <li key={title} className="flex items-start gap-2">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-rosaClaro" aria-hidden="true" />
              <div>
                <p className="font-semibold leading-snug">{title}</p>
                <p className="mt-0.5 text-xs leading-snug text-slate-300">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
