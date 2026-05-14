import { PrimaryButton, PrimaryButtonLink } from "@/components/ui/primary-button";
import { GenieLogo } from "@/components/ui/genie-logo";
import { GenieExploreIcon } from "@/components/ui/genie-icons";
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
    <SlidePanel isOpen={isOpen} className="rounded-none border-y-0 border-l-0 max-[380px]:px-5">
      <div className="mx-auto flex w-full max-w-[30rem] grow flex-col lg:max-w-[390px]">
        <div className="text-center">
          <GenieLogo className="mx-auto h-[clamp(2.2rem,7vw,3.6rem)] brightness-0" />
          <p className="type-body-sm mx-auto mt-4 max-w-[28ch] text-pretty text-[#18130f] sm:mt-5">
            A private family archive for preserving lineage, memories, and the stories
            that live between generations.
          </p>
        </div>

        <div className="mt-7 sm:mt-8 md:mt-10">
          <h1 className="type-h2 text-center leading-none">
            How it Works
          </h1>
          <ol className="mt-6 grid gap-3.5 sm:mt-7 md:mt-8 md:gap-4">
            {steps.map((step) => (
              <li key={step.number} className="grid grid-cols-[2.6rem_1fr] gap-3 sm:grid-cols-[3rem_1fr] sm:gap-4 md:grid-cols-[4rem_1fr]">
                <span className="type-h2 leading-none">
                  {step.number}
                </span>
                <span>
                  <span className="block font-serif text-[length:var(--text-body)] leading-tight">
                    {step.title}
                  </span>
                  <span className="type-caption mt-1 block text-[#17120e] sm:mt-1.5">
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
            <span className="flex items-center gap-2">
              Explore
              <GenieExploreIcon />
            </span>
          </PrimaryButton>
        </div>
      </div>
    </SlidePanel>
  );
}
