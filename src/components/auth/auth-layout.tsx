import Link from "next/link";
import { ConstellationBackdrop } from "@/components/constellation/constellation-backdrop";
import { DemoFamilyBackdrop } from "@/components/constellation/demo-family-backdrop";
import { GenieLogo } from "@/components/ui/genie-logo";
import { SlidePanel } from "@/components/ui/slide-panel";

export function AuthLayout({
  title,
  description,
  footer,
  backdrop = "constellation",
  children
}: {
  title: string;
  description: string;
  footer: React.ReactNode;
  backdrop?: "constellation" | "demo-family";
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-[100svh] overflow-hidden bg-[#040406] text-[#f6f0e2]">
      {backdrop === "demo-family" ? <DemoFamilyBackdrop /> : <ConstellationBackdrop />}
      <SlidePanel isOpen>
        <div className="mx-auto w-full max-w-md pb-5">
          <Link href="/" className="inline-flex">
            <GenieLogo className="h-11 brightness-0" />
          </Link>
          <h1 className="type-h1 mt-6">
            {title}
          </h1>
          <p className="type-body mt-4 text-[#392f28]/80">{description}</p>
          <p className="type-body mt-3 text-[#392f28]/80">
            Your archive is private by default. Only people with access can view or contribute.
          </p>
          <div className="mt-7">{children}</div>
          <div className="type-body mt-6 text-[#392f28]/80">{footer}</div>
        </div>
      </SlidePanel>
    </main>
  );
}
