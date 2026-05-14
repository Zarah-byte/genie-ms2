import { ArchiveShell } from "@/components/archive/archive-shell";
import { ArchiveTree } from "@/components/tree/archive-tree";

export const dynamic = "force-dynamic";

export default function TreePage() {
  return (
    <ArchiveShell
      title="Family tree"
      description="A visual map of relationships. This MVP view is wired with the same tree component as the public demo and ready for archive data."
    >
      <ArchiveTree />
    </ArchiveShell>
  );
}
