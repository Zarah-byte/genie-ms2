import { ArchiveShell } from "@/components/archive/archive-shell";
import { Card } from "@/components/ui/card";
import { PrimaryButtonLink } from "@/components/ui/primary-button";
import { getArchiveStoryById, getOwnerArchive } from "@/lib/archive-data";

export const dynamic = "force-dynamic";

export default async function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const archive = await getOwnerArchive();
  const story = await getArchiveStoryById(archive?.id, id);

  if (!story) {
    return (
      <ArchiveShell
        title="Memory not found"
        description="This memory may have been removed or does not belong to this archive."
        action={
          <PrimaryButtonLink href="/archive/stories" className="h-10 min-h-10 px-4 text-xs">
            Back to memories
          </PrimaryButtonLink>
        }
      >
        <Card className="max-w-2xl bg-[#f7f1e5] p-6">
          <p className="text-sm leading-7 text-[#2e2621]">
            We could not find that memory in your archive.
          </p>
        </Card>
      </ArchiveShell>
    );
  }

  return (
    <ArchiveShell
      title={story.title}
      description={story.excerpt}
      action={
        <PrimaryButtonLink href="/archive/stories/new" className="h-10 min-h-10 px-4 text-xs">
          Add memory
        </PrimaryButtonLink>
      }
    >
      <Card className="max-w-3xl bg-[#f7f1e5] p-7">
        <p className="text-xs uppercase tracking-[0.16em] text-[#3a3029]/70">{story.date_text || "Date unknown"}</p>
        <p className="archive-caption mt-2">{story.location || "Place unknown"}</p>
        <p className="mt-6 text-[1.02rem] leading-8 text-[#2e2621]">
          {story.body ??
            "This memory panel is ready for transcripts, recipes, oral histories, and the details only family remembers."}
        </p>
      </Card>
    </ArchiveShell>
  );
}
