import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type PersonNodeTone = "you" | "first" | "second" | "distant";

function expandedSizeClass(tone: PersonNodeTone) {
  if (tone === "you") return "size-[4.6rem] md:size-[5.2rem]";
  return "size-14 md:size-16";
}

function collapsedSizeClass(tone: PersonNodeTone) {
  if (tone === "you") return "size-[4.6rem] md:size-[5.2rem]";
  return "size-4 md:size-[1.1rem]";
}

function dotToneClass(tone: PersonNodeTone) {
  if (tone === "you") {
    return "bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.55),0_0_18px_rgba(255,255,255,0.35)]";
  }
  if (tone === "first") {
    return "bg-[var(--node-first)] shadow-[0_0_0_1px_rgba(165,96,240,0.55),0_0_18px_rgba(165,96,240,0.45)]";
  }
  return "bg-[var(--node-second)] shadow-[0_0_0_1px_rgba(240,61,169,0.55),0_0_18px_rgba(240,61,169,0.45)]";
}

function expandedRingClass(tone: PersonNodeTone) {
  if (tone === "you") {
    return "border-white/95 shadow-[0_0_0_2px_rgba(255,255,255,0.28),0_0_0_10px_rgba(255,255,255,0.08),0_0_34px_rgba(255,255,255,0.48)]";
  }
  if (tone === "first") {
    return "border-[var(--node-first)] shadow-[0_0_0_1px_rgba(165,96,240,0.7),0_0_24px_rgba(165,96,240,0.5)]";
  }
  return "border-[var(--node-second)] shadow-[0_0_0_1px_rgba(240,61,169,0.7),0_0_24px_rgba(240,61,169,0.5)]";
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
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  tabIndex,
  "aria-label": ariaLabel,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone: PersonNodeTone;
  active?: boolean;
  imageUrl?: string;
  name?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = tone === "you" || active || isHovered;
  const showLabel = Boolean(name) && (tone !== "you" ? isExpanded : active || isHovered);

  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
      style={style}
    >
      <button
        className={cn(
          "relative overflow-hidden rounded-full transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 motion-reduce:transition-none",
          isExpanded ? expandedSizeClass(tone) : collapsedSizeClass(tone),
          isExpanded
            ? cn("border-[4px] bg-black/35", expandedRingClass(tone))
            : cn("border border-transparent", dotToneClass(tone)),
          active ? "scale-105" : "",
          className
        )}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onMouseEnter={(event) => {
          setIsHovered(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setIsHovered(false);
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          setIsHovered(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsHovered(false);
          onBlur?.(event);
        }}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        {...rest}
      >
        {isExpanded && imageUrl ? (
          <Image
            src={imageUrl}
            alt={name ?? ""}
            fill
            className="object-cover"
            sizes={tone === "you" ? "(min-width: 768px) 84px, 74px" : "(min-width: 768px) 64px, 56px"}
          />
        ) : isExpanded ? (
          <span className="text-xs font-semibold text-white/90">{name?.charAt(0)}</span>
        ) : null}
      </button>
      {showLabel ? (
        <span className="max-w-[7.5rem] truncate text-[0.68rem] font-medium text-white/78 whitespace-nowrap select-none pointer-events-none">
          {name}
        </span>
      ) : (
        <span aria-hidden="true" className="h-[0.9rem]" />
      )}
    </div>
  );
}
