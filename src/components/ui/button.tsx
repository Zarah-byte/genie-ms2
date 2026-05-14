import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#8b4a2f]/30 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-[#5a2e20] text-[#fffaf1] hover:bg-[#432217]",
        variant === "secondary" &&
          "border border-[#cdbba6] bg-[#fffaf1] text-[#2b1a12] hover:bg-[#f5eadb]",
        variant === "ghost" && "text-[#5a2e20] hover:bg-[#efe2d0]",
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
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#8b4a2f]/30",
        variant === "primary" && "bg-[#5a2e20] text-[#fffaf1] hover:bg-[#432217]",
        variant === "secondary" &&
          "border border-[#cdbba6] bg-[#fffaf1] text-[#2b1a12] hover:bg-[#f5eadb]",
        variant === "ghost" && "text-[#5a2e20] hover:bg-[#efe2d0]",
        className
      )}
      {...props}
    />
  );
}
