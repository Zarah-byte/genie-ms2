import { ArchiveShell } from "@/components/archive/archive-shell";
import { EmptyState } from "@/components/archive/empty-state";
import { PersonCard } from "@/components/archive/person-card";
import { StoryCard } from "@/components/archive/story-card";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getArchivePeople, getArchiveStories, getOwnerArchive } from "@/lib/archive-data";

export const dynamic = "force-dynamic";

export default async function ArchiveHomePage() {
  const archive = await getOwnerArchive();
  const people = await getArchivePeople(archive?.id);
  const stories = await getArchiveStories(archive?.id);

  return (
    <ArchiveShell
      title={archive?.name ?? "Your family archive"}
      description="A private working space for people, stories, photographs, and the unknowns you are still carrying."
    >
      {!archive ? (
        <EmptyState
          title="Create your archive first"
          description="Once the archive exists, people and stories will be saved under its private family space."
          href="/onboarding/archive"
          action="Create archive"
        />
      ) : (
        <div className="grid gap-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["People", people.length],
              ["Stories", stories.length],
              ["Gentle prompts", 3]
            ].map(([label, count]) => (
              <Card key={label} className="p-6">
                <p className="text-sm text-[#78695e]">{label}</p>
                <p className="mt-3 font-serif text-5xl font-semibold">{count}</p>
              </Card>
            ))}
          </div>
          <Card className="p-6">
            <h2 className="font-serif text-3xl font-semibold">Incomplete, not forgotten</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                "Add a birthplace for relatives whose migrations are still unclear.",
                "Name people in older photographs when someone recognizes them.",
                "Attach a recipe or letter to the person who kept it safe."
              ].map((prompt) => (
                <div key={prompt} className="rounded-lg border border-[#dfd0be] bg-[#f7f0e4] p-4 text-sm leading-6 text-[#5c4d42]">
                  {prompt}
                </div>
              ))}
            </div>
          </Card>
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-3xl font-semibold">Recent people</h2>
              <ButtonLink href="/archive/people/new" variant="secondary">Add person</ButtonLink>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {people.slice(0, 3).map((person) => <PersonCard key={person.id} person={person} />)}
            </div>
          </section>
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-3xl font-semibold">Recent stories</h2>
              <ButtonLink href="/archive/stories/new" variant="secondary">Add story</ButtonLink>
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
