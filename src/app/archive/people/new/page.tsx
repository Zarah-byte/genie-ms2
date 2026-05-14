import { createPerson } from "@/lib/archive-actions";
import { ArchiveShell } from "@/components/archive/archive-shell";
import { PersonForm } from "@/components/forms/person-form";

export const dynamic = "force-dynamic";

export default function NewPersonPage() {
  return (
    <ArchiveShell
      title="Add person"
      description="Add a parent, child, sibling, spouse, grandparent, cousin, chosen family member, or a remembered connection."
      panelSide="right"
    >
      <PersonForm action={createPerson} />
    </ArchiveShell>
  );
}
