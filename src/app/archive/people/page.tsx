import { ArchiveShell } from "@/components/archive/archive-shell";
import { EmptyState } from "@/components/archive/empty-state";
import { PersonCard } from "@/components/archive/person-card";
import { Input } from "@/components/ui/form";
import { PrimaryButtonLink } from "@/components/ui/primary-button";
import { getArchivePeople, getOwnerArchive } from "@/lib/archive-data";

export const dynamic = "force-dynamic";

export default async function PeoplePage() {
  const archive = await getOwnerArchive();
  const people = await getArchivePeople(archive?.id);

  return (
    <ArchiveShell
      title="People"
      description="Profiles for relatives, ancestors, chosen family, and remembered names."
      action={
        <PrimaryButtonLink href="/archive/people/new" className="h-10 min-h-10 px-4 text-xs">
          Add person
        </PrimaryButtonLink>
      }
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input aria-label="Search people" placeholder="Search by name, place, or relationship" className="sm:max-w-sm" />
      </div>
      {people.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {people.map((person) => <PersonCard key={person.id} person={person} />)}
        </div>
      ) : (
        <EmptyState
          title="Every archive begins with one person."
          description="Start with yourself, then add the people, places, and memories that shaped your family."
          href="/archive/people/new"
          action="Add first person"
        />
      )}
    </ArchiveShell>
  );
}
