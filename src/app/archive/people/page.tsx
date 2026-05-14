import { ArchiveShell } from "@/components/archive/archive-shell";
import { PersonCard } from "@/components/archive/person-card";
import { ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { getArchivePeople, getOwnerArchive } from "@/lib/archive-data";

export const dynamic = "force-dynamic";

export default async function PeoplePage() {
  const archive = await getOwnerArchive();
  const people = await getArchivePeople(archive?.id);

  return (
    <ArchiveShell title="People" description="Add relatives, ancestors, chosen family, and people whose full details are still emerging.">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input aria-label="Search people" placeholder="Search people by name, place, or note" className="sm:max-w-sm" />
        <ButtonLink href="/archive/people/new">Add person</ButtonLink>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {people.map((person) => <PersonCard key={person.id} person={person} />)}
      </div>
    </ArchiveShell>
  );
}
