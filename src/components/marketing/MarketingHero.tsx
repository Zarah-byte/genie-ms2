"use client";

import { useState } from "react";
import { ConstellationMap } from "@/components/marketing/ConstellationMap";
import { IntroPanel } from "@/components/marketing/IntroPanel";

export function MarketingHero() {
  const [isExploring, setIsExploring] = useState(false);

  return (
    <main className="h-[100svh] overflow-hidden bg-[#020202] text-[#f5eedc]">
      <section
        aria-label="Family archive demo"
        className="relative h-full bg-[#020202]"
      >
        <ConstellationMap
          isExploring={isExploring}
          onExplore={() => setIsExploring(true)}
          onIntro={() => setIsExploring(false)}
        />
        <IntroPanel isOpen={!isExploring} onExplore={() => setIsExploring(true)} />
      </section>
    </main>
  );
}
