import Link from "next/link";
import { CopyPinButton } from "@/components/copy-pin-button";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function PinPage({
  searchParams
}: {
  searchParams: Promise<{ archive?: string; pin?: string }>;
}) {
  const { archive = "Your family archive", pin = "Created" } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <Card className="w-full max-w-xl p-7 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-[#8b4a2f]">Invite PIN</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold">{archive}</h1>
        <p className="mt-4 leading-7 text-[#78695e]">
          Share this PIN with family members for read-only access. Keep using your owner
          account for edits and private settings.
        </p>
        <div className="my-8 rounded-lg border border-dashed border-[#b79f87] bg-[#f7f0e4] px-6 py-5 font-mono text-4xl font-semibold tracking-[0.24em]">
          {pin}
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <CopyPinButton pin={pin} />
          <ButtonLink href="/archive">Enter archive</ButtonLink>
        </div>
        <Link href="/archive/settings" className="mt-6 inline-block text-sm text-[#78695e]">
          Manage this PIN later in settings.
        </Link>
      </Card>
    </main>
  );
}
