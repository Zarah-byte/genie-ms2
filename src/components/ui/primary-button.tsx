import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "cream" | "ink" | "ghost";

function variantClass(variant: Variant) {
  if (variant === "ink") {
    return "bg-[#0d0b09] !text-[#f6f0e2] hover:bg-[#060504] focus-visible:ring-[#0d0b09]/35 [&_svg]:!text-[#f6f0e2]";
  }

  if (variant === "ghost") {
    return "border border-white/20 bg-transparent text-[#f6f0e2] hover:bg-white/10 focus-visible:ring-white/30";
  }

  return "border-[1.5px] border-[rgba(176,147,85,0.55)] bg-[#d6d1ca] !text-[#17120f] hover:bg-[#e2ddd6] focus-visible:ring-[#17120f]/20 [&_svg]:!text-[#17120f]";
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
