import Image from "next/image";
import { cn } from "@/lib/utils";

export type PersonNodeTone = "you" | "first" | "second" | "distant";

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
  style,
  onClick,
  onPointerDown,
  tabIndex,
  "aria-label": ariaLabel,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone: PersonNodeTone;
  active?: boolean;
  imageUrl?: string;
  name?: string;
}) {
  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
      style={style}
    >
      <button
        className={cn(
          "relative overflow-hidden rounded-full border-[5px] border-[var(--node-avatar-ring)] bg-black/35 shadow-[0_0_0_1px_rgba(255,45,184,0.5),0_0_26px_rgba(255,45,184,0.4)] transition duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 motion-reduce:transition-none",
          sizeClass(tone),
          active ? "scale-110 outline outline-2 outline-offset-2 outline-white/75" : "",
          className
        )}
        onClick={onClick}
        onPointerDown={onPointerDown}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        {...rest}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name ?? ""}
            fill
            className="object-cover"
            sizes={tone === "you" ? "(min-width: 768px) 64px, 56px" : "(min-width: 768px) 48px, 40px"}
          />
        ) : (
          <span className="text-xs font-semibold text-white/90">{name?.charAt(0)}</span>
        )}
      </button>
      {tone !== "you" && name && (
        <span className="text-[0.68rem] font-medium text-white/55 whitespace-nowrap select-none pointer-events-none">
          {name}
        </span>
      )}
    </div>
  );
}
