import type { ServicePillar } from "@/data/services";

const EMPHASIS_CLASS = "font-bold text-[#c3006b]";

export default function ServicePillarTitle({
  pillar,
}: {
  pillar: ServicePillar;
}) {
  return (
    <>
      {pillar.title}
      {pillar.emphasis ? (
        <>
          {" "}
          <strong className={EMPHASIS_CLASS}>{pillar.emphasis}</strong>
        </>
      ) : null}
    </>
  );
}
