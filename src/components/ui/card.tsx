import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#dfd0be] bg-[#fffaf1]/82 shadow-[0_18px_45px_rgba(70,43,26,0.08)]",
        className
      )}
      {...props}
    />
  );
}
