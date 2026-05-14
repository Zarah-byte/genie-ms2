import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#17120f]/12 bg-[#f4eede] shadow-[0_20px_50px_rgba(0,0,0,0.25)]",
        className
      )}
      {...props}
    />
  );
}
