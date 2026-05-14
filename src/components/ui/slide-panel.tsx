import { cn } from "@/lib/utils";

export function SlidePanel({
  isOpen = true,
  className,
  children
}: {
  isOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "paper-panel absolute inset-y-0 left-0 z-20 flex w-full max-w-[min(100vw,42rem)] flex-col overflow-y-auto px-6 py-6 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none sm:px-8 sm:py-7 lg:w-[41vw] lg:max-w-none lg:px-[7vw] lg:py-[5vh]",
        isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none",
        className
      )}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      {children}
    </aside>
  );
}
