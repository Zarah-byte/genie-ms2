import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  href,
  action
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <Card className="bg-[#f7f1e5] p-8 text-center">
      <h2 className="font-serif text-3xl text-[#17120f]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#3a3029]/80">{description}</p>
      <ButtonLink href={href} className="mt-6" variant="primary">
        {action}
      </ButtonLink>
    </Card>
  );
}
