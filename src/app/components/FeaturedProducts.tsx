import { ProductCard } from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <section
      id="servicios"
      className="bg-white py-16 sm:py-20 border-t border-slate-100"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Soluciones de impresión para tu marca
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base whitespace-normal">
          Las piezas impresas clave que impulsan tu identidad: bolsas, packaging, folletos, papelería y más.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              nombre: "Bolsas de papel",
              texto:
                "Bolsas de papel personalizadas con tu logo, ideales para locales comerciales, eventos y packaging de marca.",
              imagen: "bolsas.jpg",
            },
            {
              nombre: "Packaging impreso",
              texto:
                "Cajas, bandejas y otros empaques impresos a medida para presentar y proteger tus productos.",
              imagen: "packaging.jpg",
            },
            {
              nombre: "Folletos y volantes",
              texto:
                "Folletos y volantes en distintos formatos para promociones, campañas y menús informativos.",
              imagen: "folletos.jpg",
            },
            {
              nombre: "Papelería corporativa",
              texto:
                "Tarjetas personales, hojas membretadas, sobres y talonarios que mantienen tu identidad de marca consistente.",
              imagen: "papeleria.jpg",
            },
            {
              nombre: "Revistas y catálogos",
              texto:
                "Revistas, catálogos y dípticos/trípticos con acabado profesional para mostrar tu oferta de productos y servicios.",
              imagen: "revistas.jpg",
            },
            {
              nombre: "Etiquetas y adhesivos",
              texto:
                "Etiquetas y adhesivos troquelados para productos, packaging y señalización interna.",
              imagen: "etiquetas.jpg",
            },
          ].map((item) => (
            <ProductCard
              key={item.nombre}
              title={item.nombre}
              description={item.texto}
              imageSrc={`/images/productos/${item.imagen}`}
            />
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-600 sm:text-base">
          ¿Querés ver más opciones? Visitá la sección de{" "}
          <a
            href="/servicios"
            className="font-semibold text-brand-magenta hover:text-brand-rosa"
          >
            servicios
          </a>{" "}
          o escribinos para asesorarte sobre el producto ideal para tu negocio.
        </p>
      </div>
    </section>
  );
}

