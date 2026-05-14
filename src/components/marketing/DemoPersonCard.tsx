import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DemoPerson } from "@/lib/mock/demoFamily";

export function DemoPersonCard({ person }: { person: DemoPerson }) {
  return (
    <article className="w-[min(22rem,calc(100vw-1.5rem))] rounded-xl border border-white/15 bg-[#f5eedc] p-3.5 text-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:w-[min(22rem,calc(100vw-2rem))] sm:p-4">
      <div className="flex gap-3 sm:gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-lg bg-[#d8d0bf] sm:size-20">
          <span className="font-serif text-2xl sm:text-3xl">{person.name.slice(0, 1)}</span>
        </div>
        <div className="min-w-0">
          <p className="font-serif text-[1.38rem] leading-none sm:text-2xl">{person.name}</p>
          <p className="mt-1 text-[0.82rem] text-[#42392f] sm:text-sm">{person.relationship}</p>
          <p className="mt-1 text-xs uppercase text-[#6b6257]">{person.dates}</p>
        </div>
      </div>
      <p className="mt-3.5 text-[0.83rem] leading-[1.45] text-[#211b16] sm:mt-4 sm:text-sm sm:leading-6">
        {person.excerpt}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5">
        <button
          type="button"
          className="rounded-full bg-[#111111] px-4 py-2 text-[0.7rem] font-semibold text-[#f5eedc] transition hover:bg-[#2a2a2a] sm:text-xs"
        >
          View memory
        </button>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full border border-[#111111]/15 px-4 py-2 text-[0.7rem] font-semibold transition hover:border-[#111111]/35 sm:text-xs"
        >
          Start your own archive
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
