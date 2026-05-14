import { ArchiveShell } from "@/components/archive/archive-shell";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <ArchiveShell title="Settings" description="Owner-only controls for archive name, invite PINs, and family member access.">
      <Card className="p-6">
        <h2 className="font-serif text-3xl font-semibold">Invite access</h2>
        <p className="mt-3 leading-7 text-[#5c4d42]">
          PIN viewers should remain read-only. Rotate invite codes here when needed and keep
          owner authentication separate from family viewing.
        </p>
      </Card>
    </ArchiveShell>
  );
}
