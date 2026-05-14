import Link from "next/link";
import { Plus, Settings, Sparkles, Users } from "lucide-react";
import { ConstellationBackdrop } from "@/components/constellation/constellation-backdrop";
import { FamilyLegend } from "@/components/constellation/family-legend";
import { GenieLogo } from "@/components/ui/genie-logo";
import { PrimaryButtonLink } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/archive/people/new", label: "Add Person", icon: Plus },
  { href: "/archive/stories/new", label: "Add Memory", icon: Sparkles },
  { href: "/archive/settings", label: "Invite", icon: Users },
  { href: "/archive/settings", label: "Settings", icon: Settings }
];

export function ArchiveShell({
  children,
  title,
  description,
  action,
  panelSide = "default"
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  panelSide?: "default" | "right";
}) {
  const isRightPanel = panelSide === "right";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040406] text-[#f6f0e2]">
      <ConstellationBackdrop />
      <header className="safe-px absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-[max(1rem,var(--safe-top))] sm:px-7">
        <Link href="/archive" className="inline-flex">
          <GenieLogo className="h-10 brightness-0 invert" />
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <PrimaryButtonLink key={item.label} href={item.href} variant="ghost" className="h-10 min-h-10 px-4 text-xs">
              <item.icon className="size-3.5" aria-hidden="true" />
              {item.label}
            </PrimaryButtonLink>
          ))}
        </nav>
      </header>

      <aside className="safe-px safe-pb absolute bottom-4 left-4 z-20 hidden sm:block">
        <FamilyLegend />
      </aside>

      <main
        className={cn(
          "relative z-20 flex min-h-screen items-start px-3 py-20 sm:px-5 md:px-7",
          isRightPanel && "justify-end"
        )}
      >
        <section
          className={cn(
            "paper-panel mt-8 w-full p-6 sm:p-7",
            isRightPanel
              ? "archive-panel-enter-right max-w-[min(100%,46rem)] lg:max-w-[min(48vw,47rem)]"
              : "max-w-[min(100%,44rem)]"
          )}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="type-overline text-[#3a3029]/70">Private archive</p>
              <h1 className="type-display mt-2">
                {title}
              </h1>
            </div>
            {action}
          </div>
          {description ? <p className="type-body mt-3 max-w-2xl text-[#3a3029]/78">{description}</p> : null}
          <div className="archive-divider my-5" />
          {children}
        </section>
      </main>

      <nav className="safe-px safe-pb fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 gap-2 border-t border-white/14 bg-black/55 px-3 py-3 backdrop-blur md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="type-overline inline-flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-[#f6f0e2]"
          >
            <item.icon className="size-4" aria-hidden="true" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
