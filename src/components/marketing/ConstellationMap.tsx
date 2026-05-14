"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkle } from "lucide-react";
import { useMemo, useState } from "react";
import { DemoLegend } from "@/components/marketing/DemoLegend";
import { DemoMemoryCard } from "@/components/marketing/DemoMemoryCard";
import { DemoPersonCard } from "@/components/marketing/DemoPersonCard";
import {
  demoMemories,
  demoPeople,
  demoRelationships,
  type DemoMemory,
  type DemoPerson
} from "@/lib/mock/demoFamily";

type Selection =
  | { type: "person"; item: DemoPerson }
  | { type: "memory"; item: DemoMemory }
  | null;

const nodeColor = {
  you: "bg-white shadow-[0_0_60px_rgba(255,255,255,0.55),0_0_120px_rgba(255,255,255,0.25)]",
  first: "bg-[#8587ff] shadow-[0_0_28px_rgba(133,135,255,0.62)]",
  second: "bg-[#f43ba4] shadow-[0_0_28px_rgba(244,59,164,0.62)]"
};

function findPerson(id: string) {
  const person = demoPeople.find((item) => item.id === id);
  if (!person) throw new Error(`Missing demo person ${id}`);
  return person;
}

export function ConstellationMap({
  isExploring,
  onExplore,
  onIntro
}: {
  isExploring: boolean;
  onExplore: () => void;
  onIntro: () => void;
}) {
  const [selection, setSelection] = useState<Selection>(null);
  const mapTransformClass = isExploring
    ? "scale-[1.04] translate-x-0"
    : "scale-100 translate-x-[8vw] sm:translate-x-[11vw] md:translate-x-[13vw] lg:translate-x-[16vw]";

  const relationshipLines = useMemo(
    () =>
      demoRelationships.map((relationship) => {
        const from = findPerson(relationship.from);
        const to = findPerson(relationship.to);
        return { ...relationship, from, to };
      }),
    []
  );

  const activePersonId = selection?.type === "person" ? selection.item.id : null;
  const activeMemoryId = selection?.type === "memory" ? selection.item.id : null;

  return (
    <div
      className={[
        "relative h-full min-h-full overflow-hidden bg-[#020202] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none",
          mapTransformClass
        ].join(" ")}
      >
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="memoryGlow">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {relationshipLines.map((line) => (
            <line
              key={line.id}
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke="rgba(255,255,255,0.38)"
              strokeWidth="1"
              strokeDasharray="1 4"
            />
          ))}
          <circle cx="47%" cy="42%" r="12%" fill="url(#memoryGlow)" />
        </svg>

        {demoPeople.map((person) => {
          const isActive = activePersonId === person.id;
          const size = person.color === "you" ? "size-10 md:size-11" : "size-6 md:size-7";
          return (
            <button
              key={person.id}
              type="button"
              onClick={() => setSelection({ type: "person", item: person })}
              className={[
                "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white/70 motion-reduce:transition-none",
                size,
                nodeColor[person.color],
                isActive ? "scale-125 ring-2 ring-white/60" : ""
              ].join(" ")}
              style={{ left: `${person.x}%`, top: `${person.y}%` }}
              aria-label={`Open ${person.name}`}
            />
          );
        })}

        {demoMemories.map((memory) => (
          <button
            key={memory.id}
            type="button"
            onClick={() => setSelection({ type: "memory", item: memory })}
            className={[
              "absolute z-10 inline-flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white/70 motion-reduce:transition-none md:size-11",
              activeMemoryId === memory.id ? "scale-125" : ""
            ].join(" ")}
            style={{ left: `${memory.x}%`, top: `${memory.y}%` }}
            aria-label={`Open memory: ${memory.title}`}
          >
            <Sparkle className="size-4 fill-white md:size-5" aria-hidden="true" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onExplore}
        className={[
          "absolute bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] right-[max(1rem,env(safe-area-inset-right))] z-20 hidden h-11 items-center gap-3 rounded-full bg-[#f5eedc] px-5 text-sm text-[#111111] shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition hover:scale-[1.03] motion-reduce:transition-none lg:inline-flex",
          isExploring ? "translate-y-16 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        ].join(" ")}
        aria-hidden={isExploring}
        tabIndex={isExploring ? -1 : undefined}
      >
        Explore
        <span aria-hidden="true">⦿</span>
      </button>

      {isExploring ? (
        <button
          type="button"
          onClick={onIntro}
          className="absolute left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-30 inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-xs font-semibold text-[#f5eedc] backdrop-blur transition hover:bg-white/15 motion-reduce:transition-none"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Intro
        </button>
      ) : null}

      <div
        className={[
          "absolute left-[max(1rem,env(safe-area-inset-left))] z-20 transition-all duration-700 motion-reduce:transition-none md:left-8 max-[430px]:hidden",
          isExploring ? "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] opacity-100 md:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)]" : "-bottom-32 opacity-0"
        ].join(" ")}
        aria-hidden={!isExploring}
      >
        <DemoLegend />
      </div>

      <Link
        href="/signup"
        className={[
          "absolute z-20 inline-flex h-12 items-center justify-center gap-5 rounded-full px-7 text-sm font-semibold shadow-[0_16px_40px_rgba(0,0,0,0.36)] transition hover:scale-[1.03] motion-reduce:transition-none",
          isExploring
            ? "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 -translate-x-1/2 bg-[#f5eedc] text-[#111111] md:left-auto md:right-8 md:translate-x-0"
            : "bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] left-[max(1rem,env(safe-area-inset-left))] bg-[#f5eedc] text-[#111111] lg:hidden"
        ].join(" ")}
        style={{ color: "#111111" }}
      >
        Get Started
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>

      <div
        className={[
          "absolute z-30 transition-all duration-300 motion-reduce:transition-none",
          isExploring
            ? "right-[max(1rem,env(safe-area-inset-right))] top-[calc(env(safe-area-inset-top)+3.75rem)] md:right-8 md:top-20"
            : "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-[max(1rem,env(safe-area-inset-right))] md:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] md:right-8",
          selection ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        ].join(" ")}
      >
        {selection?.type === "person" ? <DemoPersonCard person={selection.item} /> : null}
        {selection?.type === "memory" ? <DemoMemoryCard memory={selection.item} /> : null}
      </div>
    </div>
  );
}
