import Image from "next/image";
import { cn } from "@/lib/utils";

export type PersonNodeTone = "you" | "first" | "second" | "distant";

function toneClass(tone: PersonNodeTone) {
  if (tone === "you") {
    return "bg-[var(--node-you)] shadow-[0_0_0_6px_rgba(255,255,255,0.08),0_0_80px_rgba(255,255,255,0.7)]";
  }
  if (tone === "first") {
    return "ring-2 ring-[var(--node-first)] bg-black/40 shadow-[0_0_28px_rgba(165,96,240,0.65)]";
  }
  if (tone === "second") {
    return "ring-2 ring-[var(--node-second)] bg-black/40 shadow-[0_0_28px_rgba(240,61,169,0.65)]";
  }
  return "ring-2 ring-white/50 bg-black/40 shadow-[0_0_18px_rgba(255,255,255,0.36)]";
}

function sizeClass(tone: PersonNodeTone) {
  if (tone === "you") return "size-14 md:size-16";
  return "size-10 md:size-12";
}

export function PersonNode({
  tone,
  active,
  imageUrl,
  name,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone: PersonNodeTone;
  active?: boolean;
  imageUrl?: string;
  name?: string;
}) {
  return (
    <button
      className={cn(
        "absolute z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full transition duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none",
        sizeClass(tone),
        toneClass(tone),
        active && tone !== "you" ? "scale-125 ring-2 ring-white/65" : "",
        className
      )}
      {...props}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name ?? ""}
          fill
          className="object-cover"
          sizes="48px"
        />
      ) : (
        <span className="text-xs font-semibold text-white">{name?.charAt(0)}</span>
      )}
    </button>
  );
}
