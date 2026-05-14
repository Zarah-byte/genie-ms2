import { cn } from "@/lib/utils";

export type PersonNodeTone = "you" | "first" | "second" | "distant";

function toneClass(tone: PersonNodeTone) {
  if (tone === "you") {
    return "bg-[var(--node-you)] shadow-[0_0_50px_rgba(255,255,255,0.55)]";
  }
  if (tone === "first") {
    return "bg-[var(--node-first)] shadow-[0_0_24px_rgba(144,144,255,0.55)]";
  }
  if (tone === "second") {
    return "bg-[var(--node-second)] shadow-[0_0_24px_rgba(240,61,169,0.55)]";
  }
  return "bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.36)]";
}

export function PersonNode({
  tone,
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone: PersonNodeTone;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "absolute z-10 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-300 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none md:size-7",
        toneClass(tone),
        active ? "scale-125 ring-2 ring-white/65" : "",
        className
      )}
      {...props}
    />
  );
}
