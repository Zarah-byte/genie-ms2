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
      <svg viewBox="0 0 24 24" className="size-4 fill-current drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" aria-hidden="true">
        <path d="M12 2 C12 2 12.7 9.3 14 11 C15.3 12.7 22 12 22 12 C22 12 15.3 11.3 14 13 C12.7 14.7 12 22 12 22 C12 22 11.3 14.7 10 13 C8.7 11.3 2 12 2 12 C2 12 8.7 12.7 10 11 C11.3 9.3 12 2 12 2 Z" />
      </svg>
    </button>
  );
}
