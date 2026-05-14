"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ReactFlow, { Background, Controls, type Edge, type Node } from "reactflow";
import "reactflow/dist/style.css";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockPeople, mockRelationships, mockStories } from "@/lib/mock-data";
import { Person } from "@/lib/types";

function PersonNode({ data }: { data: { person: Person; selected: boolean } }) {
  return (
    <div
      className={[
        "w-44 rounded-lg border bg-[#fffaf1] p-3 text-left shadow-[0_14px_28px_rgba(70,43,26,0.10)] transition",
        data.selected ? "border-[#8b4a2f] ring-4 ring-[#8b4a2f]/12" : "border-[#d8c7b4]"
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div className="relative size-11 overflow-hidden rounded-full bg-[#eadcc9]">
          {data.person.image_url ? (
            <Image src={data.person.image_url} alt="" fill className="object-cover" />
          ) : null}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#241710]">{data.person.full_name}</p>
          <p className="text-xs text-[#78695e]">{data.person.birth_place || "Place unknown"}</p>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = { person: PersonNode };

const positions: Record<string, { x: number; y: number }> = {
  alina: { x: 110, y: 30 },
  omar: { x: 380, y: 30 },
  maia: { x: 150, y: 220 },
  samir: { x: 420, y: 220 },
  nina: { x: 250, y: 410 }
};

export function FamilyTreeDemo({ compact = false }: { compact?: boolean }) {
  const [selectedId, setSelectedId] = useState("alina");
  const selected = mockPeople.find((person) => person.id === selectedId) ?? mockPeople[0];
  const story =
    mockStories.find((item) => item.person_ids?.includes(selected.id)) ?? mockStories[0];

  const nodes: Node[] = useMemo(
    () =>
      mockPeople.map((person) => ({
        id: person.id,
        type: "person",
        position: positions[person.id],
        data: { person, selected: person.id === selectedId }
      })),
    [selectedId]
  );

  const edges: Edge[] = useMemo(
    () =>
      mockRelationships.map((relationship) => ({
        id: relationship.id,
        source: relationship.person_one_id,
        target: relationship.person_two_id,
        type: "smoothstep",
        animated: relationship.relationship_type === "partner"
      })),
    []
  );

  return (
    <div className={compact ? "grid gap-5" : "grid gap-6 lg:grid-cols-[1.4fr_0.8fr]"}>
      <Card className="flow-wrapper h-[520px] overflow-hidden p-2">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.45}
          maxZoom={1.4}
          onNodeClick={(_, node) => setSelectedId(node.id)}
          nodesDraggable={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#d8c7b4" gap={22} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </Card>
      <Card className="p-6">
        <div className="relative mb-5 h-52 overflow-hidden rounded-lg bg-[#eadcc9]">
          {selected.image_url ? (
            <Image src={selected.image_url} alt="" fill className="object-cover" />
          ) : null}
        </div>
        <p className="text-sm uppercase tracking-[0.18em] text-[#8b4a2f]">Selected person</p>
        <h3 className="mt-2 font-serif text-3xl font-semibold">{selected.full_name}</h3>
        <p className="mt-2 text-sm text-[#78695e]">
          {selected.birth_date || "Birth date unknown"} · {selected.birth_place || "Place unknown"}
        </p>
        <p className="mt-4 leading-7 text-[#4c3a2f]">{selected.notes}</p>
        <div className="mt-6 rounded-lg border border-[#dfd0be] bg-[#f7f0e4] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8b4a2f]">Connected story</p>
          <h4 className="mt-2 font-serif text-2xl font-semibold">{story.title}</h4>
          <p className="mt-2 text-sm leading-6 text-[#5c4d42]">{story.excerpt}</p>
        </div>
        <ButtonLink href="/signup" className="mt-6 w-full">
          Start your own archive
        </ButtonLink>
      </Card>
    </div>
  );
}
