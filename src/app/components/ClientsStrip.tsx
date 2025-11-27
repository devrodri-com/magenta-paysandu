import Image from "next/image";

export default function ClientsStrip() {
  return (
    <section className="bg-slate-800 border-t border-slate-800 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 text-center">
          Algunas de las marcas que confían en Magenta
        </p>

        <div className="mt-6 grid items-center justify-center gap-8 sm:grid-cols-3 md:grid-cols-4">
          <div className="flex justify-center opacity-80">
            <Image src="/images/clientes/cliente1.png" alt="Cliente 1" width={120} height={60} className="object-contain" />
          </div>
          <div className="flex justify-center opacity-80">
            <Image src="/images/clientes/cliente2.png" alt="Cliente 2" width={120} height={60} className="object-contain" />
          </div>
          <div className="flex justify-center opacity-80">
            <Image src="/images/clientes/cliente3.png" alt="Cliente 3" width={120} height={60} className="object-contain" />
          </div>
          <div className="flex justify-center opacity-80">
            <Image src="/images/clientes/cliente4.png" alt="Cliente 4" width={120} height={60} className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}