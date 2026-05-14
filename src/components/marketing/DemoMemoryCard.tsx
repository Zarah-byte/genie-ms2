import type { DemoMemory } from "@/lib/mock/demoFamily";

export function DemoMemoryCard({ memory }: { memory: DemoMemory }) {
  return (
    <article className="w-[min(21rem,calc(100vw-1.5rem))] rounded-xl border border-white/15 bg-[#111111]/92 p-3.5 text-[#f5eedc] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md sm:w-[min(21rem,calc(100vw-2rem))] sm:p-4">
      <p className="text-xs uppercase text-white/55">Memory</p>
      <h2 className="mt-2 font-serif text-[1.38rem] leading-tight sm:text-2xl">{memory.title}</h2>
      <p className="mt-1 text-[0.82rem] text-white/62 sm:text-sm">{memory.dateOrPlace}</p>
      <p className="mt-3.5 text-[0.83rem] leading-[1.45] text-white/84 sm:mt-4 sm:text-sm sm:leading-6">
        {memory.excerpt}
      </p>
      <div className="mt-3.5 border-t border-white/10 pt-3 sm:mt-4">
        <p className="text-xs uppercase text-white/45">Related people</p>
        <p className="mt-1 text-[0.82rem] text-white/80 sm:text-sm">{memory.relatedPeople.join(", ")}</p>
      </div>
    </article>
  );
}
