import { LuMessageCircle, LuClock3, LuLayers, LuTruck } from "react-icons/lu";

export default function BenefitsBar() {
  return (
    <section className="border-t border-slate-800/40 bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-5">
        <div className="grid gap-4 text-center text-xs sm:text-sm md:grid-cols-2 lg:grid-cols-4 md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <LuMessageCircle className="h-5 w-5 text-brand-rosaClaro" />
            <span className="font-medium">Respuesta inmediata por WhatsApp</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <LuClock3 className="h-5 w-5 text-brand-rosaClaro" />
            <span className="font-medium">Entregas gratis disponibles</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <LuLayers className="h-5 w-5 text-brand-rosaClaro" />
            <span className="font-medium">Impresión premium y terminaciones</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <LuTruck className="h-5 w-5 text-brand-rosaClaro" />
            <span className="font-medium">Retiro en local o envíos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

