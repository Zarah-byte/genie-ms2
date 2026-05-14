import { ArchiveShell } from "@/components/archive/archive-shell";
import { Card } from "@/components/ui/card";
import { mockStories } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = mockStories.find((item) => item.id === id) ?? mockStories[0];

  return (
    <ArchiveShell title={story.title} description={story.excerpt}>
      <Card className="max-w-3xl p-7">
        <p className="text-sm uppercase tracking-[0.18em] text-[#8b4a2f]">{story.date_text}</p>
        <p className="mt-6 text-lg leading-8 text-[#4c3a2f]">
          {story.body ??
            "This story page is ready for the longer memory, transcript, recipe, or letter text that the family adds."}
        </p>
      </Card>
    </ArchiveShell>
  );
}
