import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedir presupuesto – Imprenta Magenta Paysandú",
  description: "Completá el formulario de presupuesto para recibir una cotización personalizada de impresión digital, offset, packaging, bolsas y otros trabajos.",
};

export default function PresupuestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

