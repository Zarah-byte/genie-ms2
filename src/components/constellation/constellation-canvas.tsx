"use client";

import { useMemo, type CSSProperties } from "react";
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
  const youNode = useMemo(() => people.find((person) => person.color === "you"), [people]);

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

  const glowX = youNode?.x ?? 50;
  const glowY = youNode?.y ?? 44;

  const lineToneClass = (line: RelationshipLine) => {
    if (line.from.id === youNode?.id) {
      return line.to.color === "first"
        ? "constellation-line-first"
        : line.to.color === "second"
          ? "constellation-line-second"
          : "constellation-line";
    }

    if (line.to.id === youNode?.id) {
      return line.from.color === "first"
        ? "constellation-line-first"
        : line.from.color === "second"
          ? "constellation-line-second"
          : "constellation-line";
    }

    return "constellation-line-ambient";
  };

  return (
    <div
      className={["relative h-full min-h-full overflow-hidden celestial-bg", className].join(" ")}
      style={
        {
          "--constellation-glow-x": `${glowX}%`,
          "--constellation-glow-y": `${glowY}%`
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          left: `${glowX}%`,
          top: `${glowY}%`,
          width: "28vmax",
          height: "28vmax",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.03) 46%, rgba(255,255,255,0.01) 62%, rgba(255,255,255,0) 78%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {relationshipLines.map((line) => (
          <line
            key={line.id}
            x1={`${line.from.x}%`}
            y1={`${line.from.y}%`}
            x2={`${line.to.x}%`}
            y2={`${line.to.y}%`}
            className={lineToneClass(line)}
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
