import Link from "next/link";
import { Leaf } from "lucide-react";
import { GenieLogo } from "@/components/ui/genie-logo";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dfd0be]/80 bg-[#fbf5ea]/88 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-2xl font-semibold">
          <span className="grid size-9 place-items-center rounded-full border border-[#cdbba6] bg-[#fffaf1]">
            <Leaf className="size-4 text-[#8b4a2f]" aria-hidden="true" />
          </span>
          <GenieLogo className="h-8 brightness-0" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[#5c4d42] md:flex">
          <Link href="/#demo">Demo tree</Link>
          <Link href="/#stories">Stories</Link>
          <Link href="/#privacy">Privacy</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" className="hidden sm:inline-flex hover:underline underline-offset-4">
            Log in
          </ButtonLink>
          <ButtonLink href="/signup">Start archive</ButtonLink>
        </div>
      </div>
    </header>
  );
}
