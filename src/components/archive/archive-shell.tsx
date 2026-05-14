import Link from "next/link";
import { BookOpen, Images, Network, Search, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/archive", label: "Home", icon: BookOpen },
  { href: "/archive/tree", label: "Tree", icon: Network },
  { href: "/archive/people", label: "People", icon: Users },
  { href: "/archive/stories", label: "Stories", icon: Search },
  { href: "/archive/media", label: "Media", icon: Images },
  { href: "/archive/settings", label: "Settings", icon: Settings }
];

export function ArchiveShell({
  children,
  title,
  description
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen bg-[#f7f0e4]">
      <aside className="border-b border-[#dfd0be] bg-[#fffaf1]/80 lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-b-0 lg:border-r">
        <div className="px-5 py-5 sm:px-6">
          <Link href="/archive" className="font-serif text-3xl font-semibold">
            Genie
          </Link>
          <p className="mt-2 text-sm leading-6 text-[#78695e]">A living room for family memory.</p>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-3 pb-4 sm:px-4 lg:grid lg:gap-1 lg:px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-max items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#4c3a2f] transition hover:bg-[#efe2d0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b4a2f]/35 lg:px-3"
              )}
            >
              <item.icon className="size-4 text-[#8b4a2f]" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="safe-px safe-pb px-5 py-8 sm:px-6 md:py-10 lg:ml-64 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 md:mb-10">
            <h1 className="font-serif text-3xl font-semibold tracking-normal text-[#241710] sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {description ? <p className="mt-3 max-w-2xl text-[#78695e]">{description}</p> : null}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
