import { upsertProfile } from "@/lib/archive-actions";
import { ConstellationBackdrop } from "@/components/constellation/constellation-backdrop";
import { OnboardingPanel } from "@/components/panels/onboarding-panel";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Field, Input } from "@/components/ui/form";

export default function OnboardingPage() {
  return (
    <main className="relative safe-px safe-pb grid min-h-screen place-items-center px-5 py-10 sm:px-6 md:py-12">
      <ConstellationBackdrop />
      <OnboardingPanel
        eyebrow="Step 2 and 3 of 4"
        title="Start with yourself"
        description="Add yourself first, then choose your first connection to begin mapping lineage."
      >
        <form action={upsertProfile} className="grid gap-5">
          <Field label="Name">
            <Input name="full_name" placeholder="Zarah Yaqub" required />
          </Field>
          <Field label="Birth year (optional)">
            <Input name="birth_year" placeholder="1989" />
          </Field>
          <Field label="Place (optional)">
            <Input name="place" placeholder="Queens" />
          </Field>
          <Field label="First connection">
            <select
              name="first_connection"
              defaultValue="Parent"
              className="min-h-12 rounded-xl border border-[#17120f]/14 bg-[#fff9ea] px-4 text-sm text-[#17120f] outline-none focus:ring-2 focus:ring-[#17120f]/15"
            >
              <option>Parent</option>
              <option>Grandparent</option>
              <option>Sibling</option>
              <option>Spouse</option>
              <option>Child</option>
              <option>Other</option>
            </select>
          </Field>
          <PrimaryButton type="submit" className="w-fit" arrow>
            Generate family PIN
          </PrimaryButton>
        </form>
      </OnboardingPanel>
    </main>
  );
}
