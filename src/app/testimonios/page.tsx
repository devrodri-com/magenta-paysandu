import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonios de clientes – Imprenta Magenta Paysandú",
  description: "Opiniones y experiencias de emprendedores, comercios y empresas que confían en Imprenta Magenta para sus trabajos impresos.",
};

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Testimonios
        </h1>
        <p className="mt-4 text-sm text-slate-700 sm:text-base">
          Próximamente vamos a compartir opiniones y experiencias de clientes que confían en Imprenta Magenta para sus trabajos impresos.
        </p>
      </div>
    </main>
  );
}
