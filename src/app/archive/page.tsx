import { ArchiveShell } from "@/components/archive/archive-shell";
import { EmptyState } from "@/components/archive/empty-state";
import { PersonCard } from "@/components/archive/person-card";
import { StoryCard } from "@/components/archive/story-card";
import { Card } from "@/components/ui/card";
import { PrimaryButtonLink } from "@/components/ui/primary-button";
import { getArchivePeople, getArchiveStories, getOwnerArchive } from "@/lib/archive-data";

export const dynamic = "force-dynamic";

export default async function ArchiveHomePage() {
  const archive = await getOwnerArchive();
  const people = await getArchivePeople(archive?.id);
  const stories = await getArchiveStories(archive?.id);

  return (
    <ArchiveShell
      title={archive?.name ?? "Your family archive"}
      description="A living constellation of people, places, and memories."
      action={
        <PrimaryButtonLink href="/archive/tree" className="h-10 min-h-10 px-4 text-xs" variant="ink">
          Open tree
        </PrimaryButtonLink>
      }
    >
      {!archive ? (
        <EmptyState
          title="Every archive begins with one person."
          description="Start with yourself, then add the people, places, and memories that shaped your family."
          href="/onboarding/archive"
          action="Add first person"
        />
      ) : (
        <div className="grid gap-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["People", people.length],
              ["Memories", stories.length],
              ["Connections", Math.max(people.length - 1, 0)]
            ].map(([label, count]) => (
              <Card key={label} className="bg-[#f7f1e5] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#3a3029]/70">{label}</p>
                <p className="mt-3 font-serif text-5xl text-[#17120f]">{count}</p>
              </Card>
            ))}
          </div>
          <Card className="bg-[#f7f1e5] p-6">
            <h2 className="font-serif text-3xl text-[#17120f]">Incomplete, not forgotten</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                "Add a birthplace for relatives whose migrations are still unclear.",
                "Name people in older photographs when someone recognizes them.",
                "Attach a recipe, letter, or recording to the person who kept it safe."
              ].map((prompt) => (
                <div key={prompt} className="rounded-xl border border-[#17120f]/12 bg-[#f9f3e7] p-4 text-sm leading-6 text-[#3a3029]">
                  {prompt}
                </div>
              ))}
            </div>
          </Card>
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-3xl text-[#17120f]">People in this archive</h2>
              <PrimaryButtonLink href="/archive/people/new" className="h-10 min-h-10 px-4 text-xs">
                Add person
              </PrimaryButtonLink>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {people.slice(0, 3).map((person) => <PersonCard key={person.id} person={person} />)}
            </div>
          </section>
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-3xl text-[#17120f]">Memories attached</h2>
              <PrimaryButtonLink href="/archive/stories/new" className="h-10 min-h-10 px-4 text-xs">
                Add memory
              </PrimaryButtonLink>
            </div>
            <div className="grid gap-5">
              {stories.slice(0, 2).map((story) => <StoryCard key={story.id} story={story} />)}
            </div>
          </section>
        </div>
      )}
    </ArchiveShell>
  );
}
