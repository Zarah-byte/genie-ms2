import { ArchiveShell } from "@/components/archive/archive-shell";
import { EmptyState } from "@/components/archive/empty-state";
import { StoryCard } from "@/components/archive/story-card";
import { Input } from "@/components/ui/form";
import { PrimaryButtonLink } from "@/components/ui/primary-button";
import { getArchiveStories, getOwnerArchive } from "@/lib/archive-data";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const archive = await getOwnerArchive();
  const stories = await getArchiveStories(archive?.id);

  return (
    <ArchiveShell
      title="Memories"
      description="Stories, photographs, letters, recipes, places, and fragments that make people vivid."
      action={
        <PrimaryButtonLink href="/archive/stories/new" className="h-10 min-h-10 px-4 text-xs">
          Add memory
        </PrimaryButtonLink>
      }
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input aria-label="Search memories" placeholder="Search memories by title, place, or family tag" className="sm:max-w-sm" />
      </div>
      {stories.length ? (
        <div className="grid gap-5">
          {stories.map((story) => <StoryCard key={story.id} story={story} />)}
        </div>
      ) : (
        <EmptyState
          title="No memories attached yet."
          description="Add a photograph, recipe, letter, or remembered story to give this person more context."
          href="/archive/stories/new"
          action="Add memory"
        />
      )}
    </ArchiveShell>
  );
}
