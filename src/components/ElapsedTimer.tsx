"use client";

import { useEffect, useState } from "react";
import { formatElapsed } from "@/lib/report";

// Ticks once a second from the moment the inspection opened. The start time lives
// in the parent so the report can read the same clock.
export default function ElapsedTimer({ startedAt }: { startedAt: React.RefObject<number> }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.max(0, Math.floor((Date.now() - startedAt.current) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return <>{formatElapsed(elapsed)}</>;
}
