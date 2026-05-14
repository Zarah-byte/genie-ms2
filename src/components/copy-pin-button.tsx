"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyPinButton({ pin }: { pin: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={async () => {
        await navigator.clipboard.writeText(pin);
        setCopied(true);
      }}
    >
      <Copy className="mr-2 size-4" aria-hidden="true" />
      {copied ? "Copied" : "Copy PIN"}
    </Button>
  );
}
