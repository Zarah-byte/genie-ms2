import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "pill-button inline-flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17120f]/30 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-[#0d0b09] !text-[#f6f0e2] hover:bg-[#060504] [&_svg]:!text-[#f6f0e2]",
        variant === "secondary" &&
          "border-[1.5px] border-[rgba(176,147,85,0.55)] bg-[#d6d1ca] text-[#17120f] hover:bg-[#e2ddd6]",
        variant === "ghost" && "text-[#f6f0e2] hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: React.ComponentProps<typeof Link> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <Link
      className={cn(
        "pill-button inline-flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17120f]/30",
        variant === "primary" &&
          "bg-[#0d0b09] !text-[#f6f0e2] hover:bg-[#060504] [&_svg]:!text-[#f6f0e2]",
        variant === "secondary" &&
          "border-[1.5px] border-[rgba(176,147,85,0.55)] bg-[#d6d1ca] text-[#17120f] hover:bg-[#e2ddd6]",
        variant === "ghost" && "text-[#f6f0e2] hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
