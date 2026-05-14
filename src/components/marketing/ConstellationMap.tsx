"use client";

import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConstellationCanvas } from "@/components/constellation/constellation-canvas";
import { DemoLegend } from "@/components/marketing/DemoLegend";
import { DemoMemoryCard } from "@/components/marketing/DemoMemoryCard";
import { DemoPersonCard } from "@/components/marketing/DemoPersonCard";
import { PrimaryButtonLink } from "@/components/ui/primary-button";
import {
  clampScale,
  clampViewport,
  MAP_WHEEL_ZOOM_SENSITIVITY,
  resetViewport,
  type MapBounds,
  type MapViewport,
  type ViewportClampContext,
  zoomAroundPoint
} from "@/lib/map/viewport";
import {
  demoMemories,
  demoPeople,
  demoRelationships
} from "@/lib/mock/demoFamily";

type Selection =
  | { type: "person"; id: string }
  | { type: "memory"; id: string }
  | null;

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
  const [viewport, setViewport] = useState<MapViewport>({ x: 0, y: 0, scale: 1 });
  const viewportRef = useRef<MapViewport>(viewport);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);

  const pointBounds = useMemo(() => {
    const points = [...demoPeople, ...demoMemories];
    const xs = points.map((item) => item.x);
    const ys = points.map((item) => item.y);

    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys)
    };
  }, []);

  const introViewportForWidth = useCallback((width: number): MapViewport => {
    if (width >= 1024) return { x: width * 0.16, y: 0, scale: 1 };
    if (width >= 768) return { x: width * 0.13, y: 0, scale: 1 };
    if (width >= 640) return { x: width * 0.11, y: 0, scale: 1 };
    return { x: width * 0.08, y: 0, scale: 1 };
  }, []);

  const getClampContext = useCallback((): ViewportClampContext | null => {
    if (!containerSize.width || !containerSize.height) return null;

    const contentBounds: MapBounds = {
      minX: ((pointBounds.minX - 6) / 100) * containerSize.width,
      maxX: ((pointBounds.maxX + 6) / 100) * containerSize.width,
      minY: ((pointBounds.minY - 7) / 100) * containerSize.height,
      maxY: ((pointBounds.maxY + 7) / 100) * containerSize.height
    };

    return {
      viewportWidth: containerSize.width,
      viewportHeight: containerSize.height,
      contentBounds
    };
  }, [containerSize.height, containerSize.width, pointBounds.maxX, pointBounds.maxY, pointBounds.minX, pointBounds.minY]);

  const clampFromContext = useCallback(
    (nextViewport: MapViewport) => {
      const context = getClampContext();
      if (!context) return nextViewport;
      return clampViewport(nextViewport, context);
    },
    [getClampContext]
  );

  const applyProgrammaticViewport = useCallback(
    (nextViewport: MapViewport) => {
      const context = getClampContext();
      if (!context) {
        setViewport(nextViewport);
        return;
      }
      setViewport(resetViewport(nextViewport, context));
    },
    [getClampContext]
  );

  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerSize.width) return;

    const preset = isExploring
      ? { x: 0, y: 0, scale: 1.04 }
      : introViewportForWidth(containerSize.width);

    applyProgrammaticViewport(preset);
  }, [applyProgrammaticViewport, containerSize.width, introViewportForWidth, isExploring]);

  const handleExplore = useCallback(() => {
    applyProgrammaticViewport({ x: 0, y: 0, scale: 1.04 });
    onExplore();
  }, [applyProgrammaticViewport, onExplore]);

  const handleIntro = useCallback(() => {
    applyProgrammaticViewport(introViewportForWidth(containerSize.width));
    onIntro();
  }, [applyProgrammaticViewport, containerSize.width, introViewportForWidth, onIntro]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
      event.preventDefault();

      const dx = event.clientX - dragRef.current.x;
      const dy = event.clientY - dragRef.current.y;
      dragRef.current = { ...dragRef.current, x: event.clientX, y: event.clientY };

      setViewport((current) =>
        clampFromContext({
          ...current,
          x: current.x + dx,
          y: current.y + dy
        })
      );
    },
    [clampFromContext]
  );

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  }, []);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };

      const current = viewportRef.current;
      const nextScale = clampScale(
        current.scale * Math.exp(-event.deltaY * MAP_WHEEL_ZOOM_SENSITIVITY)
      );
      const next = zoomAroundPoint(current, pointer, nextScale);
      setViewport(clampFromContext(next));
    },
    [clampFromContext]
  );

  const selectedPerson = selection?.type === "person"
    ? demoPeople.find((item) => item.id === selection.id)
    : null;
  const selectedMemory = selection?.type === "memory"
    ? demoMemories.find((item) => item.id === selection.id)
    : null;

  return (
    <div
      className={[
        "relative h-full min-h-full overflow-hidden bg-[#020202] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
      ].join(" ")}
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className={[
          "absolute inset-0 cursor-grab touch-none",
          dragRef.current ? "cursor-grabbing" : ""
        ].join(" ")}
        style={{
          transform: `translate3d(${viewport.x}px, ${viewport.y}px, 0) scale(${viewport.scale})`,
          transformOrigin: "0 0"
        }}
      >
        <ConstellationCanvas
          people={demoPeople}
          memories={demoMemories}
          relationships={demoRelationships}
          selection={selection}
          onPersonSelect={(id) => setSelection({ type: "person", id })}
          onMemorySelect={(id) => setSelection({ type: "memory", id })}
        />
      </div>

      <button
        type="button"
        onClick={handleExplore}
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
          onClick={handleIntro}
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

      <PrimaryButtonLink
        href="/signup"
        variant="cream"
        className={[
          "absolute z-20 shadow-[0_16px_40px_rgba(0,0,0,0.36)]",
          isExploring
            ? "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0"
            : "bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] left-[max(1rem,env(safe-area-inset-left))] lg:hidden"
        ].join(" ")}
        arrow
      >
        Get Started
      </PrimaryButtonLink>

      <div
        className={[
          "absolute z-30 transition-all duration-300 motion-reduce:transition-none",
          isExploring
            ? "right-[max(1rem,env(safe-area-inset-right))] top-[calc(env(safe-area-inset-top)+3.75rem)] md:right-8 md:top-20"
            : "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-[max(1rem,env(safe-area-inset-right))] md:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] md:right-8",
          selection ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        ].join(" ")}
      >
        {selectedPerson ? <DemoPersonCard person={selectedPerson} /> : null}
        {selectedMemory ? <DemoMemoryCard memory={selectedMemory} onClose={() => setSelection(null)} /> : null}
      </div>
    </div>
  );
}
