import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Imprenta Magenta – Historia y equipo en Paysandú",
  description: "Conocé la historia, experiencia y equipo de Imprenta Magenta, una imprenta moderna en Paysandú con más de 15 años de trayectoria.",
};

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Sobre Imprenta Magenta
        </h1>
        <p className="mt-4 text-sm text-slate-700 sm:text-base">
          Magenta es una imprenta moderna de Paysandú, especializada en impresión digital, offset y soluciones gráficas a medida. Próximamente vamos a ampliar esta sección con más información sobre nuestra historia, equipo y forma de trabajo.
        </p>
      </div>
    </main>
  );
}
