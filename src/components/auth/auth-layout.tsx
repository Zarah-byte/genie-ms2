import Link from "next/link";
import { ConstellationBackdrop } from "@/components/constellation/constellation-backdrop";
import { SlidePanel } from "@/components/ui/slide-panel";

export function AuthLayout({
  title,
  description,
  footer,
  children
}: {
  title: string;
  description: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-[100svh] overflow-hidden bg-[#040406] text-[#f6f0e2]">
      <ConstellationBackdrop />
      <SlidePanel isOpen>
        <div className="mx-auto w-full max-w-md pb-5">
          <Link href="/" className="font-serif text-4xl leading-none text-[#17120f]">
            Genie
          </Link>
          <h1 className="mt-6 font-serif text-[clamp(2rem,6vw,3.2rem)] leading-[0.95] text-[#17120f]">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-[#392f28]/80">{description}</p>
          <p className="mt-3 text-sm leading-6 text-[#392f28]/80">
            Your archive is private by default. Only people with access can view or contribute.
          </p>
          <div className="mt-7">{children}</div>
          <div className="mt-6 text-sm text-[#392f28]/80">{footer}</div>
        </div>
      </SlidePanel>
    </main>
  );
}
