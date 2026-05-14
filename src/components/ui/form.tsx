import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#3a281e]">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-normal text-[#78695e]">{hint}</span> : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-12 rounded-lg border border-[#d6c5b2] bg-[#fffaf1] px-4 text-base text-[#241710] outline-none transition placeholder:text-[#9b8a7c] focus:border-[#8b4a2f] focus:ring-4 focus:ring-[#8b4a2f]/10",
        props.className
      )}
      {...props}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 rounded-lg border border-[#d6c5b2] bg-[#fffaf1] px-4 py-3 text-base text-[#241710] outline-none transition placeholder:text-[#9b8a7c] focus:border-[#8b4a2f] focus:ring-4 focus:ring-[#8b4a2f]/10",
        props.className
      )}
      {...props}
    />
  );
}
