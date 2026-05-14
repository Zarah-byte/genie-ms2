"use client";

import { ConstellationCanvas } from "@/components/constellation/constellation-canvas";
import { demoMemories, demoPeople, demoRelationships } from "@/lib/mock/demoFamily";

export function DemoFamilyBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <ConstellationCanvas
        people={demoPeople}
        memories={demoMemories}
        relationships={demoRelationships}
        selection={null}
        onPersonSelect={() => void 0}
        onMemorySelect={() => void 0}
        className="pointer-events-none"
      />
      <div className="absolute inset-0 bg-[#020204]/30" />
    </div>
  );
}
