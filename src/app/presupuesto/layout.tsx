import { metadataForPath } from "@/config/seo";

export const metadata = metadataForPath("/presupuesto");

export default function PresupuestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
