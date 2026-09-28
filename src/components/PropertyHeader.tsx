import type { Property } from "@/lib/types";
import { formatDuration } from "@/lib/report";
import ElapsedTimer from "./ElapsedTimer";

export default function PropertyHeader({ property, startedAt }: { property: Property; startedAt: React.RefObject<number> }) {
  return (
    <div className="bg-band py-6 text-white">
      <div className="site-wrap flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="mb-1.5 block font-mono text-[0.72rem] tracking-[0.1em] uppercase opacity-80">
            Ref {property.ref} · {property.inspectionType} inspection
          </span>
          <h1 className="text-[clamp(1.35rem,3.4vw,1.85rem)] font-bold tracking-[-0.02em]">{property.address}</h1>
          <div className="mt-2 flex flex-wrap gap-x-5 text-[0.85rem] opacity-85">
            <span>{property.description}</span>
            <span>Tenant: {property.tenant}</span>
            <span>Tenancy from {property.tenancyStart}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[clamp(1.5rem,4vw,2rem)] leading-none font-semibold tabular-nums" aria-live="off">
            <ElapsedTimer startedAt={startedAt} />
          </div>
          <div className="mt-1 text-[0.72rem] tracking-[0.09em] uppercase opacity-80">On this inspection</div>
          <div className="mt-1 text-[0.78rem] opacity-80">
            Your last one by hand: <s className="opacity-70">{formatDuration(property.manualBaselineMinutes)}</s>
          </div>
        </div>
      </div>
    </div>
  );
}
