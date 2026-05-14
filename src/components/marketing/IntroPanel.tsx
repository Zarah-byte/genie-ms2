import { PrimaryButton, PrimaryButtonLink } from "@/components/ui/primary-button";
import { GenieLogo } from "@/components/ui/genie-logo";
import { SlidePanel } from "@/components/ui/slide-panel";

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
    title: "Attach memories",
    body: "Upload photographs, letters, documents, recipes, and recordings."
  },
  {
    number: "04.",
    title: "Write the stories",
    body: "Add the context a certificate never could: places, language, rituals, and remembered fragments."
  },
  {
    number: "05.",
    title: "Share with family",
    body: "Invite relatives to view, contribute, and preserve what they know."
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
    <SlidePanel isOpen={isOpen}>
      <div className="mx-auto flex w-full max-w-[30rem] grow flex-col lg:max-w-[390px]">
        <div className="text-center">
          <GenieLogo className="mx-auto h-[clamp(2.2rem,7vw,3.6rem)] brightness-0" />
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
          <PrimaryButtonLink href="/signup" className="min-w-36" arrow>
            Get Started
          </PrimaryButtonLink>
          <PrimaryButton type="button" onClick={onExplore} variant="cream" className="lg:hidden">
            Explore
          </PrimaryButton>
        </div>
      </div>
    </SlidePanel>
  );
}
