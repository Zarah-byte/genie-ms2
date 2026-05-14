import { Sparkle } from "lucide-react";

export function DemoLegend() {
  return (
    <div className="w-[min(18.5rem,calc(100vw-2rem))] rounded-lg border border-white/20 bg-[#3c3c3c]/92 px-4 py-3.5 text-[#f6efe2] shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md sm:w-auto sm:px-5 sm:py-4">
      <ul className="grid gap-1.5 text-[0.84rem] leading-[1.15] sm:text-[0.9rem] md:text-[1.02rem]">
        <li className="flex items-center gap-3">
          <span className="size-3 rounded-full bg-white" aria-hidden="true" />
          you
        </li>
        <li className="flex items-center gap-3">
          <span className="size-3 rounded-full bg-[#8587ff]" aria-hidden="true" />
          first connection
        </li>
        <li className="flex items-center gap-3">
          <span className="size-3 rounded-full bg-[#f43ba4]" aria-hidden="true" />
          second connection
        </li>
        <li className="flex items-center gap-3">
          <Sparkle className="size-4 fill-[#f6efe2] text-[#f6efe2]" aria-hidden="true" />
          memories
        </li>
      </ul>
    </div>
  );
}
