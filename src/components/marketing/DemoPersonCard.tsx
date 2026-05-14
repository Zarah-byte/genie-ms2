import Image from "next/image";
import { X } from "lucide-react";
import type { DemoPerson } from "@/lib/mock/demoFamily";

export function DemoPersonCard({
  person,
  onClose
}: {
  person: DemoPerson;
  onClose: () => void;
}) {
  return (
    <article className="paper-panel relative w-[min(26rem,calc(100vw-1.5rem))] p-5 sm:p-6">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-[#3a3029]/40 transition hover:text-[#3a3029]/80"
      >
        <X className="size-5" />
      </button>

      <div className="flex items-start gap-4 pr-8">
        <div className="size-[4.5rem] shrink-0 overflow-hidden rounded-full bg-[#d8d0bf] ring-1 ring-[#17120f]/10 sm:size-20">
          {person.image_url ? (
            <Image
              src={person.image_url}
              alt={person.name}
              width={80}
              height={80}
              className="size-full object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center font-serif text-2xl text-[#17120f]">
              {person.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h2 className="font-serif text-[2rem] leading-none text-[#17120f]">{person.name}</h2>
          <p className="type-body mt-1.5 text-[#42392f]">{person.relationship}</p>
          <p className="type-overline mt-2 text-[#6b6257]">{person.dates}</p>
          <p className="type-caption mt-1">{person.place}</p>
        </div>
      </div>

      <p className="mt-5 text-[1.05rem] leading-[1.65] text-[#17120f]">
        &ldquo;{person.story}&rdquo;
      </p>

      <div className="archive-divider mt-5 pt-4">
        <p className="type-overline text-[#6b6257]">Attached memories</p>
        <ul className="type-body mt-2 grid gap-1 text-[#211b16]">
          {person.memories.slice(0, 4).map((memory) => (
            <li key={memory}>— {memory}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
