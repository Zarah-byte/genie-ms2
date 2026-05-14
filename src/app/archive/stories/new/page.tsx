import { createStory } from "@/lib/archive-actions";
import { ArchiveShell } from "@/components/archive/archive-shell";
import { MemoryForm } from "@/components/forms/memory-form";

export const dynamic = "force-dynamic";

export default function NewStoryPage() {
  return (
    <ArchiveShell
      title="Add memory"
      description="Memories are the emotional center of the archive. Write details only your family would know."
      panelSide="right"
    >
      <MemoryForm action={createStory} />
    </ArchiveShell>
  );
}
