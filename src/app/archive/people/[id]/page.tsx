import { ArchiveShell } from "@/components/archive/archive-shell";
import { Card } from "@/components/ui/card";
import { PrimaryButtonLink } from "@/components/ui/primary-button";
import {
  getArchivePersonById,
  getArchiveStoriesForPerson,
  getOwnerArchive
} from "@/lib/archive-data";

export const dynamic = "force-dynamic";

export default async function PersonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const archive = await getOwnerArchive();
  const person = await getArchivePersonById(archive?.id, id);

  if (!person) {
    return (
      <ArchiveShell
        title="Person not found"
        description="This profile may have been removed or does not belong to this archive."
        action={
          <PrimaryButtonLink href="/archive/people" className="h-10 min-h-10 px-4 text-xs">
            Back to people
          </PrimaryButtonLink>
        }
      >
        <Card className="max-w-2xl bg-[#f7f1e5] p-6">
          <p className="text-sm leading-7 text-[#2e2621]">
            We could not find that person in your archive.
          </p>
        </Card>
      </ArchiveShell>
    );
  }

  const stories = await getArchiveStoriesForPerson(archive?.id, person.id);

  return (
    <ArchiveShell
      title={person.full_name}
      description={person.notes ?? "Notes remembered by family."}
      action={
        <PrimaryButtonLink href="/archive/stories/new" className="h-10 min-h-10 px-4 text-xs">
          Add memory
        </PrimaryButtonLink>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <Card className="bg-[#f7f1e5] p-6">
          <h2 className="font-serif text-3xl text-[#17120f]">Known places</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div><dt className="text-[#3a3029]/75">Birth date</dt><dd>{person.birth_date ?? "Unknown"}</dd></div>
            <div><dt className="text-[#3a3029]/75">Birthplace</dt><dd>{person.birth_place ?? "Unknown"}</dd></div>
            <div><dt className="text-[#3a3029]/75">Life dates</dt><dd>{person.birth_date ?? "Unknown"} - {person.death_date ?? "Living/Unknown"}</dd></div>
          </dl>
        </Card>
        <Card className="bg-[#f7f1e5] p-6">
          <h2 className="font-serif text-3xl text-[#17120f]">Stories attached to this person</h2>
          <div className="mt-5 grid gap-4">
            {stories.length ? (
              stories.map((story) => (
                <div key={story.id} className="rounded-xl border border-[#17120f]/12 bg-[#fbf6ea] p-4">
                  <h3 className="font-serif text-2xl text-[#17120f]">{story.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#3a3029]/85">{story.excerpt}</p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-[#3a3029]/85">
                No memories are linked to this person yet.
              </p>
            )}
          </div>
        </Card>
      </div>
    </ArchiveShell>
  );
}
