import { ArchiveShell } from "@/components/archive/archive-shell";
import { ArchiveTree } from "@/components/tree/archive-tree";

export const dynamic = "force-dynamic";

export default function TreePage() {
  return (
    <ArchiveShell
      title="Family constellation"
      description="Click a person node or memory star to open its archival profile."
    >
      <ArchiveTree />
    </ArchiveShell>
  );
}
