"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MemoryStar } from "@/components/constellation/memory-star";
import { PersonNode, type PersonNodeTone } from "@/components/constellation/person-node";
import type { DemoMemory, DemoPerson, DemoRelationship } from "@/lib/mock/demoFamily";

type CanvasPerson = DemoPerson & { color: PersonNodeTone };
type RelationshipLine = DemoRelationship & { from: CanvasPerson; to: CanvasPerson };
type Selection =
  | { type: "person"; id: string }
  | { type: "memory"; id: string }
  | null;

function toneInitialBg(tone: PersonNodeTone) {
  if (tone === "you") return "bg-white text-black";
  if (tone === "first") return "bg-[#9090ff] text-white";
  if (tone === "second") return "bg-[#f03da9] text-white";
  return "bg-white/70 text-black";
}

export function ConstellationCanvas({
  people,
  memories,
  relationships,
  selection,
  onPersonSelect,
  onMemorySelect,
  className
}: {
  people: CanvasPerson[];
  memories: DemoMemory[];
  relationships: DemoRelationship[];
  selection: Selection;
  onPersonSelect: (personId: string) => void;
  onMemorySelect: (memoryId: string) => void;
  className?: string;
}) {
  const [hoveredPerson, setHoveredPerson] = useState<CanvasPerson | null>(null);

  const relationshipLines = useMemo(
    () =>
      relationships
        .map((relationship) => {
          const from = people.find((item) => item.id === relationship.from);
          const to = people.find((item) => item.id === relationship.to);
          if (!from || !to) return null;
          return { ...relationship, from, to };
        })
        .filter((line): line is RelationshipLine => Boolean(line)),
    [people, relationships]
  );

  const tooltipBelow = hoveredPerson ? hoveredPerson.y < 22 : false;

  return (
    <div className={["relative h-full min-h-full overflow-hidden celestial-bg", className].join(" ")}>
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="constellationGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="44%" r="22%" fill="url(#constellationGlow)" />
        {relationshipLines.map((line) => (
          <line
            key={line.id}
            x1={`${line.from.x}%`}
            y1={`${line.from.y}%`}
            x2={`${line.to.x}%`}
            y2={`${line.to.y}%`}
            className="constellation-line"
          />
        ))}
      </svg>

      {people.map((person) => (
        <PersonNode
          key={person.id}
          tone={person.color}
          active={selection?.type === "person" && selection.id === person.id}
          style={{ left: `${person.x}%`, top: `${person.y}%` }}
          onClick={() => onPersonSelect(person.id)}
          onMouseEnter={() => setHoveredPerson(person)}
          onMouseLeave={() => setHoveredPerson(null)}
          aria-label={`Open ${person.name}`}
        />
      ))}

      {memories.map((memory) => (
        <MemoryStar
          key={memory.id}
          active={selection?.type === "memory" && selection.id === memory.id}
          style={{ left: `${memory.x}%`, top: `${memory.y}%` }}
          onClick={() => onMemorySelect(memory.id)}
          aria-label={`Open memory: ${memory.title}`}
        />
      ))}

      {hoveredPerson && (
        <div
          className="pointer-events-none absolute z-50 -translate-x-1/2 transition-all duration-200"
          style={{
            left: `${hoveredPerson.x}%`,
            top: `${hoveredPerson.y}%`,
            transform: tooltipBelow
              ? "translateX(-50%) translateY(14px)"
              : "translateX(-50%) translateY(calc(-100% - 14px))"
          }}
        >
          <div className="flex flex-col items-center gap-1.5">
            {hoveredPerson.image_url ? (
              <div className="size-14 overflow-hidden rounded-full ring-2 ring-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                <Image
                  src={hoveredPerson.image_url}
                  alt={hoveredPerson.name}
                  width={56}
                  height={56}
                  className="size-full object-cover"
                />
              </div>
            ) : (
              <div
                className={[
                  "size-14 rounded-full ring-2 ring-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex items-center justify-center text-lg font-serif",
                  toneInitialBg(hoveredPerson.color)
                ].join(" ")}
              >
                {hoveredPerson.name.charAt(0)}
              </div>
            )}
            <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm whitespace-nowrap">
              {hoveredPerson.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
