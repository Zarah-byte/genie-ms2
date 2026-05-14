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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.24 7.76001L14.436 13.171C14.3378 13.4656 14.1724 13.7333 13.9528 13.9528C13.7333 14.1724 13.4656 14.3378 13.171 14.436L7.76001 16.24L9.56401 10.829C9.66219 10.5344 9.82762 10.2668 10.0472 10.0472C10.2668 9.82762 10.5344 9.66219 10.829 9.56401L16.24 7.76001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </PrimaryButton>
        </div>
      </div>
    </SlidePanel>
  );
}
