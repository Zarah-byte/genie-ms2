import type { DemoPerson } from "@/lib/mock/demoFamily";

export function DemoPersonCard({ person }: { person: DemoPerson }) {
  return (
    <article className="paper-panel w-[min(24rem,calc(100vw-1.5rem))] p-4 text-[#111111] sm:w-[min(24rem,calc(100vw-2rem))] sm:p-5">
      <div className="flex gap-3.5 sm:gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#d8d0bf] sm:size-20">
          <span className="font-serif text-2xl sm:text-3xl">{person.name.charAt(0)}</span>
        </div>
        <div className="min-w-0">
          <p className="font-serif text-[1.38rem] leading-none sm:text-2xl">{person.name}</p>
          <p className="mt-1 text-[0.82rem] text-[#42392f] sm:text-sm">{person.relationship}</p>
          <p className="mt-1 text-xs uppercase text-[#6b6257]">{person.dates}</p>
          <p className="archive-caption mt-2">{person.place}</p>
        </div>
      </div>
      <p className="mt-3.5 text-[0.83rem] leading-[1.45] text-[#211b16] sm:mt-4 sm:text-sm sm:leading-6">
        "{person.story}"
      </p>
      <div className="archive-divider mt-4 pt-4">
        <p className="text-xs uppercase tracking-[0.16em] text-[#6b6257]">Attached memories</p>
        <ul className="mt-2 grid gap-1 text-sm text-[#211b16]">
          {person.memories.slice(0, 4).map((memory) => (
            <li key={memory}>- {memory}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
