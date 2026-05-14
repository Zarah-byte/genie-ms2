import { createArchive } from "@/lib/archive-actions";
import { ConstellationBackdrop } from "@/components/constellation/constellation-backdrop";
import { OnboardingPanel } from "@/components/panels/onboarding-panel";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Field, Input } from "@/components/ui/form";

export default function ArchiveOnboardingPage() {
  return (
    <main className="relative grid min-h-screen place-items-center px-5 py-10">
      <ConstellationBackdrop />
      <OnboardingPanel
        eyebrow="Step 1 of 4"
        title="Name your archive"
        description="This can be a surname, a household, or a phrase your family recognizes."
      >
        <form action={createArchive} className="grid gap-5">
          <Field label="Archive name">
            <Input name="name" placeholder="The Yaqub Family Archive" required />
          </Field>
          <p className="archive-caption">Examples: Stories from Home, The Rahman Lineage</p>
          <PrimaryButton type="submit" className="w-fit" arrow>
            Continue
          </PrimaryButton>
        </form>
      </OnboardingPanel>
    </main>
  );
}
