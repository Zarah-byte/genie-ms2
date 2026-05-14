"use client";

import { ArrowLeft, BookOpen, Menu, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConstellationCanvas } from "@/components/constellation/constellation-canvas";
import { DemoAskPanel, type AskState } from "@/components/marketing/DemoAskPanel";
import { DemoLegend } from "@/components/marketing/DemoLegend";
import { DemoMemoryCard } from "@/components/marketing/DemoMemoryCard";
import { DemoPersonCard } from "@/components/marketing/DemoPersonCard";
import { GenieExploreIcon } from "@/components/ui/genie-icons";
import { PrimaryButton, PrimaryButtonLink } from "@/components/ui/primary-button";
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
  const [askState, setAskState] = useState<AskState>({ status: "idle" });
  const [inputValue, setInputValue] = useState("");
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [viewport, setViewport] = useState<MapViewport>({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<MapViewport>(viewport);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
    hasDragged: boolean;
  } | null>(null);
  const addButtonRef = useRef<HTMLDivElement | null>(null);
  const addMenuRef = useRef<HTMLDivElement | null>(null);

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
    if (width >= 1280) return { x: width * 0.17, y: 0, scale: 1 };
    if (width >= 1024) return { x: width * 0.15, y: 0, scale: 0.98 };
    if (width >= 768) return { x: width * 0.1, y: 0, scale: 0.96 };
    if (width >= 640) return { x: width * 0.06, y: 0, scale: 0.94 };
    return { x: width * 0.02, y: 0, scale: 0.9 };
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
    if (!addMenuOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (
        addButtonRef.current?.contains(e.target as Node) ||
        addMenuRef.current?.contains(e.target as Node)
      ) return;
      setAddMenuOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [addMenuOpen]);

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

    const exploreScale = containerSize.width < 640 ? 0.96 : 1.04;
    const preset = isExploring
      ? { x: 0, y: 0, scale: exploreScale }
      : introViewportForWidth(containerSize.width);

    // Keep intro/explore camera presets aligned with responsive container changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    applyProgrammaticViewport(preset);
  }, [applyProgrammaticViewport, containerSize.width, introViewportForWidth, isExploring]);

  const handleExplore = useCallback(() => {
    applyProgrammaticViewport({ x: 0, y: 0, scale: containerSize.width < 640 ? 0.96 : 1.04 });
    onExplore();
  }, [applyProgrammaticViewport, containerSize.width, onExplore]);

  const handleIntro = useCallback(() => {
    applyProgrammaticViewport(introViewportForWidth(containerSize.width));
    onIntro();
  }, [applyProgrammaticViewport, containerSize.width, introViewportForWidth, onIntro]);

  const DRAG_THRESHOLD = 5;

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
      hasDragged: false,
    };
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

      if (!dragRef.current.hasDragged) {
        const totalDx = event.clientX - dragRef.current.startX;
        const totalDy = event.clientY - dragRef.current.startY;
        if (Math.sqrt(totalDx * totalDx + totalDy * totalDy) < DRAG_THRESHOLD) return;
        dragRef.current.hasDragged = true;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }

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
    if (dragRef.current.hasDragged) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setIsDragging(false);
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

  const handleAsk = useCallback(async (question: string) => {
    if (!question.trim()) return;
    setInputValue("");
    setAskState({ status: "loading" });

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      if (!res.ok || !res.body) {
        setAskState({ status: "error", message: "Couldn't reach the archive. Try again." });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      setAskState({ status: "streaming", question, answer: "" });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setAskState({ status: "streaming", question, answer });
      }

      setAskState({ status: "done", question, answer });
    } catch {
      setAskState({ status: "error", message: "Something went wrong. Please try again." });
    }
  }, []);

  const selectedPerson = selection?.type === "person"
    ? demoPeople.find((item) => item.id === selection.id)
    : null;
  const selectedMemory = selection?.type === "memory"
    ? demoMemories.find((item) => item.id === selection.id)
    : null;

  return (
    <div
      className={[
        "relative h-full min-h-full overflow-hidden bg-[#040406] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
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
          isDragging ? "cursor-grabbing" : ""
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
        <GenieExploreIcon className="size-[1.125rem]" />
      </button>

      {isExploring ? (
        <PrimaryButton
          variant="cream"
          onClick={handleIntro}
          className="absolute left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-30 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Intro
        </PrimaryButton>
      ) : null}

      <div
        className={[
          "absolute left-1/2 z-30 w-[min(calc(100vw-1.5rem),34rem)] -translate-x-1/2 transition-all duration-700 motion-reduce:transition-none sm:w-auto",
          isExploring
            ? "top-[max(0.6rem,env(safe-area-inset-top))] opacity-100"
            : "-top-20 pointer-events-none opacity-0"
        ].join(" ")}
      >
        <div className="flex min-w-0 items-center rounded-full border border-white/[0.1] bg-[#0c0c0e]/85 shadow-[0_4px_28px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <span className="px-3 py-2.5 font-serif text-[0.88rem] text-[#f6f0e2] sm:px-5">
            Genie
          </span>
          <div className="h-5 w-px shrink-0 bg-white/10" />
          <input
            type="text"
            placeholder="Ask a question..."
            value={inputValue}
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white/80 outline-none placeholder:text-white/22 sm:w-60 sm:flex-none sm:px-4"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAsk(inputValue);
            }}
          />
          <div className="mx-1 h-4 w-px shrink-0 bg-white/[0.08]" />
          <div className="flex shrink-0 items-center gap-0.5 py-1.5 pl-0.5 pr-1.5 sm:pr-2">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex size-7 items-center justify-center text-white/45 transition-colors hover:text-[#a560f0]"
              onClick={(e) => { e.stopPropagation(); handleAsk(inputValue); }}
            >
              <Search className="size-4" aria-hidden="true" />
            </button>
            <div className="relative" ref={addButtonRef}>
              <button
                type="button"
                aria-label="Add"
                aria-expanded={addMenuOpen}
                className="inline-flex size-7 items-center justify-center text-white/45 transition-colors hover:text-white/85"
                onClick={(e) => { e.stopPropagation(); setAddMenuOpen((v) => !v); }}
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>

              {addMenuOpen && (
                <div
                  ref={addMenuRef}
                  className="absolute right-0 top-10 z-50 flex w-44 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]/90 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md"
                >
                  <Link
                    href="/archive/people/new"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#f6f0e2]/50 transition hover:bg-white/[0.06] hover:text-[#f6f0e2]/90"
                    onClick={() => setAddMenuOpen(false)}
                  >
                    <User className="size-3.5 shrink-0" aria-hidden="true" />
                    Add a person
                  </Link>
                  <Link
                    href="/archive/stories/new"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#f6f0e2]/50 transition hover:bg-white/[0.06] hover:text-[#f6f0e2]/90"
                    onClick={() => setAddMenuOpen(false)}
                  >
                    <BookOpen className="size-3.5 shrink-0" aria-hidden="true" />
                    Add a memory
                  </Link>
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Menu"
              className="inline-flex size-7 items-center justify-center text-white/45 transition-colors hover:text-white/85"
              onClick={(e) => e.stopPropagation()}
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={[
          "absolute left-[max(1rem,env(safe-area-inset-left))] z-20 transition-all duration-700 motion-reduce:transition-none md:left-8 max-[430px]:hidden",
          isExploring ? "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] opacity-100 sm:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)]" : "-bottom-32 opacity-0"
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
            ? "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 -translate-x-1/2 sm:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] md:left-auto md:right-8 md:translate-x-0"
            : "bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] left-[max(1rem,env(safe-area-inset-left))] lg:hidden"
        ].join(" ")}
        arrow
      >
        Get Started
      </PrimaryButtonLink>

      {/* AI answer panel — below the nav */}
      <div
        className={[
          "absolute left-1/2 z-30 -translate-x-1/2 transition-all duration-300 motion-reduce:transition-none",
          isExploring ? "top-[calc(max(0.6rem,env(safe-area-inset-top))+3.5rem)]" : "top-0 pointer-events-none opacity-0",
          askState.status !== "idle" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        ].join(" ")}
      >
        <DemoAskPanel state={askState} onClose={() => setAskState({ status: "idle" })} />
      </div>

      {/* Person / memory detail cards */}
      <div
        className={[
          "fixed z-[60] max-h-[calc(100svh-5rem)] overflow-y-auto rounded-2xl transition-all duration-300 motion-reduce:transition-none max-sm:flex max-sm:justify-center",
          isExploring
            ? "inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] top-auto sm:inset-x-auto sm:bottom-auto sm:right-[max(1rem,env(safe-area-inset-right))] sm:top-[calc(env(safe-area-inset-top)+3.75rem)] md:right-8 md:top-20"
            : "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-[max(1rem,env(safe-area-inset-right))] md:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] md:right-8",
          selection ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        ].join(" ")}
      >
        {selectedPerson ? <DemoPersonCard person={selectedPerson} onClose={() => setSelection(null)} /> : null}
        {selectedMemory ? <DemoMemoryCard memory={selectedMemory} onClose={() => setSelection(null)} /> : null}
      </div>
    </div>
  );
}
