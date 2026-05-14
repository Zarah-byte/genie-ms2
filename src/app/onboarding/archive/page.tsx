import { createArchive } from "@/lib/archive-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/form";

export default function ArchiveOnboardingPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <Card className="w-full max-w-xl p-7">
        <p className="text-sm uppercase tracking-[0.18em] text-[#8b4a2f]">Family archive</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold">Name the place</h1>
        <p className="mt-4 leading-7 text-[#78695e]">
          This can be a surname, a household, a branch, or a phrase your family recognizes.
        </p>
        <form action={createArchive} className="mt-8 grid gap-5">
          <Field label="Archive name">
            <Input name="name" placeholder="The Yaqub Family Archive" required />
          </Field>
          <Button type="submit">Create archive and PIN</Button>
        </form>
      </Card>
    </main>
  );
}
