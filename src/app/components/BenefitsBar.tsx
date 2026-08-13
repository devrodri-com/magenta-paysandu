import type { IconType } from "react-icons";
import {
  LuMessageCircle,
  LuPenTool,
  LuClock3,
  LuLayers,
  LuTruck,
  LuAward,
} from "react-icons/lu";
import { SEO_CONFIG } from "@/config/seo";

const BENEFITS: { Icon: IconType; title: string; detail: string }[] = [
  {
    Icon: LuMessageCircle,
    title: "Atención personalizada",
    detail: "Te acompañamos en cada proyecto.",
  },
  {
    Icon: LuPenTool,
    title: "Contamos con diseño",
    detail: "Creamos la imagen de tu marca.",
  },
  {
    Icon: LuClock3,
    title: "Rapidez y cumplimiento",
    detail: "Cumplimos los plazos acordados.",
  },
  {
    Icon: LuLayers,
    title: "Calidad profesional",
    detail: "Terminaciones que se notan.",
  },
  {
    Icon: LuTruck,
    title: "Reparto en Paysandú",
    detail: "Semanal sin costo, según producción.",
  },
  {
    Icon: LuAward,
    title: SEO_CONFIG.publicFoundingCopy,
    detail: "Acompañando a empresas y emprendedores.",
  },
];

export default function BenefitsBar() {
  return (
    // Misma superficie oscura que el Hero: sin divisor, la separación la da el
    // padding.
    <section aria-label="Por qué elegirnos" className="bg-slate-950 text-slate-100">
      {/* Mismo riel px-4 que el Hero y el resto del sitio. */}
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-7 sm:pb-12 sm:pt-8 lg:pb-11 lg:pt-9">
        {/* 1 col <360px · 2 col 360-767 · 3 col 768-1279 · 6 col >=1280 */}
        <ul className="grid grid-cols-1 gap-x-5 gap-y-5 min-[360px]:grid-cols-2 sm:gap-x-6 sm:gap-y-6 md:grid-cols-3 xl:grid-cols-6 xl:gap-x-5">
          {BENEFITS.map(({ Icon, title, detail }) => (
            <li key={title} className="flex items-start gap-2 sm:gap-2.5">
              <Icon
                className="mt-px h-4 w-4 shrink-0 text-brand-magenta sm:mt-0.5 sm:h-[18px] sm:w-[18px]"
                aria-hidden="true"
              />
              <div>
                <p className="text-[0.8125rem] font-semibold leading-[1.3] text-white sm:text-sm sm:leading-snug xl:text-[0.8125rem]">
                  {title}
                </p>
                <p className="mt-0.5 text-[0.8125rem] leading-[1.35] text-slate-400 sm:mt-1 sm:text-sm sm:leading-snug xl:text-[0.8125rem]">
                  {detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
