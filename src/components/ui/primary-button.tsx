import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "cream" | "ink" | "ghost";

function variantClass(variant: Variant) {
  if (variant === "ink") {
    return "bg-[#1a1714] text-[#f6f0e2] hover:bg-[#0f0d0b] focus-visible:ring-[#1a1714]/35";
  }

  if (variant === "ghost") {
    return "border border-white/20 bg-transparent text-[#f6f0e2] hover:bg-white/10 focus-visible:ring-white/30";
  }

  return "bg-[#f6f0e2] text-[#13100d] hover:bg-[#fff7e8] focus-visible:ring-[#f6f0e2]/30";
}

export function PrimaryButton({
  className,
  variant = "ink",
  arrow,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  arrow?: boolean;
}) {
  return (
    <button
      className={cn(
        "pill-button inline-flex items-center justify-center gap-3 transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantClass(variant),
        className
      )}
      {...props}
    >
      {props.children}
      {arrow ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
    </button>
  );
}

export function PrimaryButtonLink({
  className,
  variant = "ink",
  arrow,
  ...props
}: React.ComponentProps<typeof Link> & {
  variant?: Variant;
  arrow?: boolean;
}) {
  return (
    <Link
      className={cn(
        "pill-button inline-flex items-center justify-center gap-3 transition focus-visible:outline-none focus-visible:ring-2",
        variantClass(variant),
        className
      )}
      {...props}
    >
      {props.children}
      {arrow ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
    </Link>
  );
}
