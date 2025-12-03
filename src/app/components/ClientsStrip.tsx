// src/app/components/ClientsStrip.tsx

import Image from "next/image";
const CLIENT_LOGOS = [
  { src: "/images/clientes/1.svg", alt: "Cliente 1" },
  { src: "/images/clientes/2.svg", alt: "Cliente 2" },
  { src: "/images/clientes/3.svg", alt: "Cliente 3" },
  { src: "/images/clientes/4.svg", alt: "Cliente 4" },
  { src: "/images/clientes/5.svg", alt: "Cliente 5" },
  { src: "/images/clientes/6.svg", alt: "Cliente 6" },
  { src: "/images/clientes/7.svg", alt: "Cliente 7" },
  { src: "/images/clientes/8.svg", alt: "Cliente 8" },
  { src: "/images/clientes/9.svg", alt: "Cliente 9" },
  { src: "/images/clientes/10.svg", alt: "Cliente 10" },
  { src: "/images/clientes/11.svg", alt: "Cliente 11" },
  { src: "/images/clientes/12.svg", alt: "Cliente 12" },
  { src: "/images/clientes/13.svg", alt: "Cliente 13" },
  { src: "/images/clientes/14.svg", alt: "Cliente 14" },
  { src: "/images/clientes/15.svg", alt: "Cliente 15" },
  { src: "/images/clientes/16.svg", alt: "Cliente 16" },
  { src: "/images/clientes/17.svg", alt: "Cliente 17" },
  { src: "/images/clientes/18.svg", alt: "Cliente 18" },
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
                className="flex min-w-[120px] justify-center opacity-80 bg-[#a2a2a2] rounded-xl p-3"
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