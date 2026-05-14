"use client";

import { useMemo } from "react";
import { MemoryStar } from "@/components/constellation/memory-star";
import { PersonNode, type PersonNodeTone } from "@/components/constellation/person-node";
import type { DemoMemory, DemoPerson, DemoRelationship } from "@/lib/mock/demoFamily";

type CanvasPerson = DemoPerson & { color: PersonNodeTone };
type RelationshipLine = DemoRelationship & { from: CanvasPerson; to: CanvasPerson };
type Selection =
  | { type: "person"; id: string }
  | { type: "memory"; id: string }
  | null;

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
          imageUrl={person.image_url}
          name={person.name}
          active={selection?.type === "person" && selection.id === person.id}
          style={{ left: `${person.x}%`, top: `${person.y}%` }}
          onClick={() => onPersonSelect(person.id)}
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

    </div>
  );
}
