import { ArchiveShell } from "@/components/archive/archive-shell";
import { StoryCard } from "@/components/archive/story-card";
import { ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { getArchiveStories, getOwnerArchive } from "@/lib/archive-data";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const archive = await getOwnerArchive();
  const stories = await getArchiveStories(archive?.id);

  return (
    <ArchiveShell title="Stories" description="Memories, recipes, migrations, letters, places, and the fragments that make people vivid.">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input aria-label="Search stories" placeholder="Search stories by title, place, or memory" className="sm:max-w-sm" />
        <ButtonLink href="/archive/stories/new">Add story</ButtonLink>
      </div>
      <div className="grid gap-5">
        {stories.map((story) => <StoryCard key={story.id} story={story} />)}
      </div>
    </ArchiveShell>
  );
}
