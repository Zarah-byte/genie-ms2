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
    <Card className="archive-paper p-8 text-center">
      <h2 className="font-serif text-3xl font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-[#78695e]">{description}</p>
      <ButtonLink href={href} className="mt-6">
        {action}
      </ButtonLink>
    </Card>
  );
}
