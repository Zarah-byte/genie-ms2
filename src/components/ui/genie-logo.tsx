import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type GenieLogoProps = Omit<ComponentPropsWithoutRef<"img">, "src">;

export function GenieLogo({ alt = "Genie", className, ...props }: GenieLogoProps) {
  return <img src="/genie-logo.svg" alt={alt} className={cn("h-8 w-auto", className)} {...props} />;
}
