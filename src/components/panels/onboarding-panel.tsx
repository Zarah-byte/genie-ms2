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
      <p className="text-xs uppercase tracking-[0.18em] text-[#47372c]/80">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3.3rem)] leading-[0.98] text-[#17120f]">
        {title}
      </h1>
      <p className="mt-4 max-w-[56ch] text-sm leading-6 text-[#392f28]/80">{description}</p>
      <div className="mt-7">{children}</div>
    </section>
  );
}
