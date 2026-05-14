import Link from "next/link";
import { ConstellationBackdrop } from "@/components/constellation/constellation-backdrop";
import { OnboardingPanel } from "@/components/panels/onboarding-panel";
import { InvitePanel } from "@/components/panels/invite-panel";
import { PrimaryButtonLink } from "@/components/ui/primary-button";

export default async function PinPage({
  searchParams
}: {
  searchParams: Promise<{ archive?: string; pin?: string }>;
}) {
  const { archive = "Your family archive", pin = "Created" } = await searchParams;

  return (
    <main className="relative grid min-h-screen place-items-center px-5 py-10">
      <ConstellationBackdrop />
      <OnboardingPanel
        eyebrow="Step 4 of 4"
        title="Your family PIN"
        description="Share this PIN with family members you trust. They can use it to view or contribute to your archive."
      >
        <p className="mb-4 font-serif text-2xl text-[#17120f]">{archive}</p>
        <InvitePanel pin={pin} />
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <PrimaryButtonLink href="/archive" className="w-fit" arrow>
            Continue to archive
          </PrimaryButtonLink>
          <Link href="/archive/settings" className="text-sm text-[#3a3029]/80">
            Manage this PIN later in settings
          </Link>
        </div>
      </OnboardingPanel>
    </main>
  );
}
