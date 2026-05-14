import { ArchiveShell } from "@/components/archive/archive-shell";
import { InvitePanel } from "@/components/panels/invite-panel";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <ArchiveShell
      title="Settings"
      description="Archive name, privacy, family PIN, contributors, export, and archive controls."
    >
      <div className="grid gap-5">
        <Card className="bg-[#f7f1e5] p-6">
          <h2 className="font-serif text-3xl text-[#17120f]">Archive details</h2>
          <div className="archive-divider mt-4 pt-4 text-sm text-[#3a3029]">
            <p>Privacy: Private archive</p>
            <p className="mt-2">Contributors: Owner, editors, and invited viewers</p>
            <p className="mt-2">Export: Generate a family archive package</p>
          </div>
        </Card>
        <InvitePanel pin="GENI-4721" />
        <Card className="bg-[#f7f1e5] p-6">
          <h3 className="font-serif text-2xl text-[#17120f]">Delete archive</h3>
          <p className="mt-2 text-sm leading-6 text-[#3a3029]/80">
            This action permanently removes people, memories, and relationships from this archive.
          </p>
        </Card>
      </div>
    </ArchiveShell>
  );
}
