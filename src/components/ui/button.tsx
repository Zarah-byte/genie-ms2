import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "pill-button inline-flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-[#17120f]/30 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-[#1a1714] !text-[#f6f0e2] hover:bg-[#0f0d0b] [&_svg]:!text-[#f6f0e2]",
        variant === "secondary" &&
          "border border-[#17120f]/20 bg-[#f7f0e2] text-[#1b1511] hover:bg-[#fff8eb]",
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
        "pill-button inline-flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-[#17120f]/30",
        variant === "primary" &&
          "bg-[#1a1714] !text-[#f6f0e2] hover:bg-[#0f0d0b] [&_svg]:!text-[#f6f0e2]",
        variant === "secondary" &&
          "border border-[#17120f]/20 bg-[#f7f0e2] text-[#1b1511] hover:bg-[#fff8eb]",
        variant === "ghost" && "text-[#f6f0e2] hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
