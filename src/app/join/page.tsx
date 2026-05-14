import { Button } from "@/components/ui/button";
import { ConstellationBackdrop } from "@/components/constellation/constellation-backdrop";
import { OnboardingPanel } from "@/components/panels/onboarding-panel";
import { Field, Input } from "@/components/ui/form";

export default function JoinPage() {
  return (
    <main className="relative safe-px safe-pb grid min-h-screen place-items-center px-5 py-10 sm:px-6 md:py-12">
      <ConstellationBackdrop />
      <OnboardingPanel
        eyebrow="Read-only access"
        title="Enter a family PIN"
        description="Use a trusted family PIN to open a read-only archive view."
        className="max-w-md"
      >
        <form action="/view" className="grid gap-5">
          <Field label="PIN"><Input name="pin" placeholder="A1B2C3D4" required /></Field>
          <Button type="submit">View archive</Button>
        </form>
      </OnboardingPanel>
    </main>
  );
}
