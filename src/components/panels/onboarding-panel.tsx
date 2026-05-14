import { cn } from "@/lib/utils";

export function OnboardingPanel({
  eyebrow,
  title,
  description,
  children,
  className
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("paper-panel mx-auto w-full max-w-xl p-7 sm:p-8", className)}>
      <p className="type-overline text-[#47372c]/80">{eyebrow}</p>
      <h1 className="type-h1 mt-3">
        {title}
      </h1>
      <p className="type-body mt-4 max-w-[56ch] text-[#392f28]/80">{description}</p>
      <div className="mt-7">{children}</div>
    </section>
  );
}
