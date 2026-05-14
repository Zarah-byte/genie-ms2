import { ArchiveShell } from "@/components/archive/archive-shell";
import { InvitePanel } from "@/components/panels/invite-panel";
import { Card } from "@/components/ui/card";
import {
  getActiveInviteCodePreview,
  getCurrentUserEmail,
  getOwnerArchive
} from "@/lib/archive-data";

export const dynamic = "force-dynamic";

const DEMO_EMAIL = "demo@familyarchive.local";
const DEMO_PIN = "FAMILY-DEMO-2026";

export default async function SettingsPage() {
  const archive = await getOwnerArchive();
  const invitePreview = await getActiveInviteCodePreview(archive?.id);
  const userEmail = await getCurrentUserEmail();
  const isDemoUser = userEmail?.toLowerCase() === DEMO_EMAIL;
  const pinValue = isDemoUser
    ? DEMO_PIN
    : invitePreview
      ? `••••-${invitePreview.toUpperCase()}`
      : "Not generated yet";

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
        <InvitePanel
          pin={pinValue}
          copyable={isDemoUser}
          note={
            isDemoUser
              ? "Demo account keeps a presentation-ready PIN so critiques can open the read-only view."
              : "For security, only a masked PIN preview is shown after setup. Regenerate one from onboarding when needed."
          }
        />
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
