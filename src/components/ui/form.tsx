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
    <label className="grid gap-2 text-sm font-medium text-[#241b16]">
      <span>{label}</span>
      {children}
      {hint ? <span className="archive-caption font-normal">{hint}</span> : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-12 rounded-xl border border-[#17120f]/14 bg-[#fff9ea] px-4 text-base text-[#1b1511] outline-none transition placeholder:text-[#9b8a7c] focus:border-[#17120f]/45 focus:ring-4 focus:ring-[#17120f]/10",
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
        "min-h-28 rounded-xl border border-[#17120f]/14 bg-[#fff9ea] px-4 py-3 text-base text-[#1b1511] outline-none transition placeholder:text-[#9b8a7c] focus:border-[#17120f]/45 focus:ring-4 focus:ring-[#17120f]/10",
        props.className
      )}
      {...props}
    />
  );
}
