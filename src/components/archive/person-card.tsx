import Image from "next/image";
import Link from "next/link";
import { Person } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link href={`/archive/people/${person.id}`}>
      <Card className="h-full overflow-hidden bg-[#f7f1e5] transition hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(0,0,0,0.25)]">
        <div className="relative h-44 bg-[#eadcc9]">
          {person.image_url ? (
            <Image src={person.image_url} alt="" fill className="object-cover" />
          ) : (
            <div className="grid h-full place-items-center font-serif text-4xl text-[#8b4a2f]">
              {person.full_name.slice(0, 1)}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-serif text-2xl text-[#17120f]">{person.full_name}</h3>
          <p className="mt-1 text-sm text-[#3a3029]/72">
            {person.birth_place || "Place not yet known"}
          </p>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#2e2621]/90">
            {person.notes || "A quiet placeholder for details the family may add later."}
          </p>
        </div>
      </Card>
    </Link>
  );
}
