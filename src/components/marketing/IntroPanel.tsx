import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01.",
    title: "Add your people",
    body: "Create profiles with names, dates, places, and photographs for every member of your family."
  },
  {
    number: "02.",
    title: "Map the relationships",
    body: "Connect parents, children, siblings, and spouses to build your family tree."
  },
  {
    number: "03.",
    title: "Attach the memories",
    body: "Upload photographs, letters, recipes, voice notes, and documents."
  },
  {
    number: "04.",
    title: "Write the stories",
    body: "Add the context a birth certificate never could: the language, places, and memories passed down."
  },
  {
    number: "05.",
    title: "Share with family",
    body: "Invite relatives to view and contribute through a private family PIN."
  }
];

export function IntroPanel({
  isOpen,
  onExplore
}: {
  isOpen: boolean;
  onExplore: () => void;
}) {
  return (
    <aside
      className={[
        "absolute inset-y-0 left-0 z-20 flex w-full max-w-[min(100vw,42rem)] flex-col overflow-y-auto bg-[#f5eedc] px-6 py-6 text-[#111111] shadow-[18px_0_50px_rgba(0,0,0,0.26)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none sm:px-8 sm:py-7 md:max-w-[32rem] md:px-12 lg:w-[41vw] lg:max-w-none lg:px-[8.2vw] lg:py-[5.5vh]",
        isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
      ].join(" ")}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div className="mx-auto flex w-full max-w-[30rem] grow flex-col lg:max-w-[390px]">
        <div className="text-center">
          <p className="font-serif text-[clamp(2.2rem,7vw,3.6rem)] leading-none">
            Genie
          </p>
          <p className="mx-auto mt-4 max-w-[28ch] text-pretty text-[0.76rem] leading-[1.4] text-[color:#18130f] sm:mt-5 sm:text-[0.8rem] md:text-[0.84rem]">
            A private family archive for preserving lineage, memories, and the stories
            that live between generations.
          </p>
        </div>

        <div className="mt-7 sm:mt-8 md:mt-10">
          <h1 className="text-center font-serif text-[clamp(1.8rem,5.5vw,2.65rem)] leading-none">
            How it Works
          </h1>
          <ol className="mt-6 grid gap-3.5 sm:mt-7 md:mt-8 md:gap-4">
            {steps.map((step) => (
              <li key={step.number} className="grid grid-cols-[2.6rem_1fr] gap-3 sm:grid-cols-[3rem_1fr] sm:gap-4 md:grid-cols-[4rem_1fr]">
                <span className="font-serif text-[clamp(1.5rem,5.4vw,2.25rem)] leading-none">
                  {step.number}
                </span>
                <span>
                  <span className="block font-serif text-[0.94rem] leading-tight sm:text-[1rem] md:text-[1.08rem]">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-[0.7rem] leading-[1.35] text-[color:#17120e] sm:mt-1.5 sm:text-[0.74rem] md:text-[0.78rem]">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7 md:mt-auto md:pt-6">
          <Link
            href="/signup"
            className="inline-flex h-12 min-w-36 items-center justify-center gap-5 rounded-full bg-[#020202] px-6 text-[0.86rem] font-semibold text-[color:#f5eedc] transition hover:scale-[1.02] hover:bg-[#171717] focus:outline-none focus:ring-2 focus:ring-[#020202]/25"
            style={{ color: "#f5eedc" }}
          >
            Get Started
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex h-11 items-center justify-center gap-3 rounded-full border border-[#111111]/15 bg-[#fff9eb] px-5 text-[0.82rem] text-[color:#111111] shadow-sm transition hover:scale-[1.02] hover:border-[#111111]/30 lg:hidden"
          >
            Explore
            <span aria-hidden="true">⦿</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
