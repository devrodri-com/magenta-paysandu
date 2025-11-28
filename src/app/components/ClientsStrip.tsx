import Image from "next/image";

const CLIENT_LOGOS = [
  { src: "/images/clientes/cliente1.png", alt: "Cliente 1" },
  { src: "/images/clientes/cliente2.png", alt: "Cliente 2" },
  { src: "/images/clientes/cliente3.png", alt: "Cliente 3" },
  { src: "/images/clientes/cliente4.png", alt: "Cliente 4" },
  // Cuando tengas más logos, agregalos acá
];

export default function ClientsStrip() {
  return (
    <section className="bg-slate-800 border-t border-slate-800 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 text-center">
          Algunas de las marcas que confían en Magenta
        </p>

        <div className="mt-6 overflow-hidden">
          <div className="clients-marquee flex items-center gap-10">
            {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="flex min-w-[120px] justify-center opacity-80"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="h-auto w-auto max-h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}