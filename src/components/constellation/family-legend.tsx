type LegendItem = {
  label: string;
  type: "you" | "first" | "second" | "memory";
};

const defaultItems: LegendItem[] = [
  { label: "you", type: "you" },
  { label: "first connection", type: "first" },
  { label: "second connection", type: "second" },
  { label: "memories", type: "memory" }
];

export function FamilyLegend({ items = defaultItems }: { items?: LegendItem[] }) {
  return (
    <div className="rounded-2xl border border-white/18 bg-white/14 p-4 text-[#f5eedc] shadow-[0_20px_40px_rgba(0,0,0,0.36)] backdrop-blur">
      <ul className="grid gap-1.5 text-[0.8rem] leading-[1.2] sm:text-[0.9rem]">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5">
            {item.type === "memory" ? (
              <span className="text-sm leading-none">✦</span>
            ) : (
              <span
                className={[
                  "size-2.5 rounded-full",
                  item.type === "you"
                    ? "bg-white"
                    : item.type === "first"
                      ? "bg-[#9090ff]"
                      : "bg-[#f03da9]"
                ].join(" ")}
              />
            )}
            <span className="font-serif text-[1.2em]">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
