import { upsertProfile } from "@/lib/archive-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/form";

export default function OnboardingPage() {
  return (
    <main className="safe-px safe-pb grid min-h-screen place-items-center px-5 py-10 sm:px-6 md:py-12">
      <Card className="w-full max-w-xl p-6 sm:p-7">
        <p className="text-sm uppercase tracking-[0.18em] text-[#8b4a2f]">Onboarding</p>
        <h1 className="mt-3 font-serif text-[2.2rem] font-semibold leading-tight sm:text-5xl">
          Who is tending this archive?
        </h1>
        <p className="mt-4 leading-7 text-[#78695e]">
          This profile marks you as the owner. Family PIN viewers can read the archive, but
          they cannot replace your account or edit your records.
        </p>
        <form action={upsertProfile} className="mt-8 grid gap-5">
          <Field label="Your name">
            <Input name="full_name" placeholder="Zarah Yaqub" required />
          </Field>
          <Button type="submit">Continue</Button>
        </form>
      </Card>
    </main>
  );
}
