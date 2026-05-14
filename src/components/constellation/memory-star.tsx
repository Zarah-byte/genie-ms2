import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MemoryStar({
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "absolute z-10 inline-flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[var(--memory-star)] transition duration-300 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none md:size-10",
        active ? "scale-125" : "",
        className
      )}
      {...props}
    >
      <Sparkles className="size-4 fill-current" aria-hidden="true" />
    </button>
  );
}
