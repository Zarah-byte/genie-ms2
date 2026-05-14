"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  type Edge,
  type Node,
  type ReactFlowInstance,
  type Viewport
} from "reactflow";
import "reactflow/dist/style.css";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  buildTranslateExtent,
  clampViewport,
  MAP_MAX_SCALE,
  MAP_MIN_SCALE,
  resetViewport,
  type MapBounds,
  type MapViewport
} from "@/lib/map/viewport";
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

const TREE_NODE_WIDTH = 176;
const TREE_NODE_HEIGHT = 92;

export function FamilyTreeDemo({ compact = false }: { compact?: boolean }) {
  const [selectedId, setSelectedId] = useState("alina");
  const [mapViewport, setMapViewport] = useState<MapViewport>({ x: 0, y: 0, scale: 0.92 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const mapViewportRef = useRef<MapViewport>(mapViewport);
  const flowRef = useRef<ReactFlowInstance<Node, Edge> | null>(null);
  const flowWrapperRef = useRef<HTMLDivElement | null>(null);
  const selected = mockPeople.find((person) => person.id === selectedId) ?? mockPeople[0];
  const story =
    mockStories.find((item) => item.person_ids?.includes(selected.id)) ?? mockStories[0];

  const contentBounds = useMemo<MapBounds>(() => {
    const entries = Object.values(positions);
    const xs = entries.map((item) => item.x);
    const ys = entries.map((item) => item.y);

    return {
      minX: Math.min(...xs) - TREE_NODE_WIDTH * 0.25,
      maxX: Math.max(...xs) + TREE_NODE_WIDTH * 1.25,
      minY: Math.min(...ys) - TREE_NODE_HEIGHT * 0.4,
      maxY: Math.max(...ys) + TREE_NODE_HEIGHT * 1.4
    };
  }, []);

  const translateExtent = useMemo(() => buildTranslateExtent(contentBounds), [contentBounds]);

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

  const getClampContext = useCallback(() => {
    if (!containerSize.width || !containerSize.height) return null;
    return {
      viewportWidth: containerSize.width,
      viewportHeight: containerSize.height,
      contentBounds
    };
  }, [containerSize.height, containerSize.width, contentBounds]);

  const setClampedViewport = useCallback(
    (nextViewport: MapViewport, duration = 0) => {
      const context = getClampContext();
      const clamped = context ? clampViewport(nextViewport, context) : nextViewport;
      setMapViewport(clamped);
      mapViewportRef.current = clamped;
      if (flowRef.current) {
        void flowRef.current.setViewport(
          { x: clamped.x, y: clamped.y, zoom: clamped.scale },
          { duration }
        );
      }
    },
    [getClampContext]
  );

  const resetTreeViewport = useCallback(
    (duration = 260) => {
      const context = getClampContext();
      const preset = { x: 0, y: 0, scale: 0.92 };
      const target = context ? resetViewport(preset, context) : preset;
      setClampedViewport(target, duration);
    },
    [getClampContext, setClampedViewport]
  );

  useEffect(() => {
    mapViewportRef.current = mapViewport;
  }, [mapViewport]);

  useEffect(() => {
    const wrapper = flowWrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const focusSelectedNode = useCallback(
    (personId: string) => {
      if (!containerSize.width || !containerSize.height) return;
      const position = positions[personId];
      if (!position) return;

      const currentScale = mapViewportRef.current.scale;
      const centered: MapViewport = {
        x: containerSize.width / 2 - (position.x + TREE_NODE_WIDTH / 2) * currentScale,
        y: containerSize.height / 2 - (position.y + TREE_NODE_HEIGHT / 2) * currentScale,
        scale: currentScale
      };

      setClampedViewport(centered, 220);
    },
    [containerSize.height, containerSize.width, setClampedViewport]
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedId(node.id);
      focusSelectedNode(node.id);
    },
    [focusSelectedNode]
  );

  const handleMove = useCallback(
    (_event: unknown, viewport: Viewport) => {
      const context = getClampContext();
      const nextViewport: MapViewport = {
        x: viewport.x,
        y: viewport.y,
        scale: viewport.zoom
      };
      const clamped = context ? clampViewport(nextViewport, context) : nextViewport;
      setMapViewport(clamped);
      mapViewportRef.current = clamped;

      if (
        flowRef.current &&
        (Math.abs(clamped.x - viewport.x) > 0.5 ||
          Math.abs(clamped.y - viewport.y) > 0.5 ||
          Math.abs(clamped.scale - viewport.zoom) > 0.002)
      ) {
        void flowRef.current.setViewport(
          { x: clamped.x, y: clamped.y, zoom: clamped.scale },
          { duration: 0 }
        );
      }
    },
    [getClampContext]
  );

  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return;
    resetTreeViewport(0);
  }, [containerSize.height, containerSize.width, resetTreeViewport]);

  return (
    <div className={compact ? "grid gap-5" : "grid gap-6 lg:grid-cols-[1.4fr_0.8fr]"}>
      <div ref={flowWrapperRef}>
        <Card className="flow-wrapper relative h-[520px] overflow-hidden p-2">
          <button
            type="button"
            onClick={() => resetTreeViewport()}
            className="absolute right-5 top-5 z-20 rounded-full border border-[#d8c7b4] bg-[#fffaf1]/95 px-3 py-1.5 text-xs font-semibold text-[#4c3a2f] shadow-sm transition hover:bg-white"
          >
            Reset view
          </button>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            minZoom={MAP_MIN_SCALE}
            maxZoom={MAP_MAX_SCALE}
            translateExtent={translateExtent}
            onMove={handleMove}
            onNodeClick={handleNodeClick}
            onInit={(instance) => {
              flowRef.current = instance;
              resetTreeViewport(0);
            }}
            nodesDraggable={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#d8c7b4" gap={22} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </Card>
      </div>
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
