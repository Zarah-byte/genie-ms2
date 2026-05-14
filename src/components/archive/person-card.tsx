import Image from "next/image";
import Link from "next/link";
import { Person } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link href={`/archive/people/${person.id}`}>
      <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(70,43,26,0.12)]">
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
          <h3 className="font-serif text-2xl font-semibold">{person.full_name}</h3>
          <p className="mt-1 text-sm text-[#78695e]">
            {person.birth_place || "Place not yet known"}
          </p>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#5c4d42]">
            {person.notes || "A quiet placeholder for details the family may add later."}
          </p>
        </div>
      </Card>
    </Link>
  );
}
