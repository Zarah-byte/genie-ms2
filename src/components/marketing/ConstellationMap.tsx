"use client";

import { ArrowLeft, BookOpen, Menu, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConstellationCanvas } from "@/components/constellation/constellation-canvas";
import { DemoAskPanel, type AskState } from "@/components/marketing/DemoAskPanel";
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
  const [askState, setAskState] = useState<AskState>({ status: "idle" });
  const [inputValue, setInputValue] = useState("");
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [viewport, setViewport] = useState<MapViewport>({ x: 0, y: 0, scale: 1 });
  const viewportRef = useRef<MapViewport>(viewport);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.24 7.76001L14.436 13.171C14.3378 13.4656 14.1724 13.7333 13.9528 13.9528C13.7333 14.1724 13.4656 14.3378 13.171 14.436L7.76001 16.24L9.56401 10.829C9.66219 10.5344 9.82762 10.2668 10.0472 10.0472C10.2668 9.82762 10.5344 9.66219 10.829 9.56401L16.24 7.76001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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
          "absolute left-1/2 z-30 -translate-x-1/2 transition-all duration-700 motion-reduce:transition-none",
          isExploring
            ? "top-[max(0.6rem,env(safe-area-inset-top))] opacity-100"
            : "-top-20 pointer-events-none opacity-0"
        ].join(" ")}
      >
        <div className="flex items-center rounded-full border border-white/8 bg-[#0c0c0e]/85 shadow-[0_4px_28px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <span className="px-5 py-2.5 font-serif text-[0.88rem] text-[#f6f0e2]/90">
            Genie
          </span>
          <div className="h-5 w-px shrink-0 bg-white/10" />
          <input
            type="text"
            placeholder="Ask a question..."
            value={inputValue}
            className="w-44 bg-transparent px-4 py-2.5 text-sm text-white/80 outline-none placeholder:text-white/30 sm:w-60"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAsk(inputValue);
            }}
          />
          <div className="flex items-center gap-1 px-1.5 py-1.5">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/18 hover:text-white"
              onClick={(e) => { e.stopPropagation(); handleAsk(inputValue); }}
            >
              <Search className="size-3.5" aria-hidden="true" />
            </button>
            <div className="relative" ref={addButtonRef}>
              <button
                type="button"
                aria-label="Add"
                aria-expanded={addMenuOpen}
                className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/18 hover:text-white"
                onClick={(e) => { e.stopPropagation(); setAddMenuOpen((v) => !v); }}
              >
                <Plus className="size-3.5" aria-hidden="true" />
              </button>

              {addMenuOpen && (
                <div
                  ref={addMenuRef}
                  className="absolute right-0 top-10 z-50 flex w-44 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]/90 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md"
                >
                  <Link
                    href="/signup"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#f6f0e2]/80 transition hover:bg-white/8 hover:text-[#f6f0e2]"
                    onClick={() => setAddMenuOpen(false)}
                  >
                    <User className="size-3.5 shrink-0" aria-hidden="true" />
                    Add a person
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#f6f0e2]/80 transition hover:bg-white/8 hover:text-[#f6f0e2]"
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
              className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/18 hover:text-white"
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
          "absolute z-30 transition-all duration-300 motion-reduce:transition-none",
          isExploring
            ? "right-[max(1rem,env(safe-area-inset-right))] top-[calc(env(safe-area-inset-top)+3.75rem)] md:right-8 md:top-20"
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
