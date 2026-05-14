import { createPerson } from "@/lib/archive-actions";
import { ArchiveShell } from "@/components/archive/archive-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/form";

export const dynamic = "force-dynamic";

export default function NewPersonPage() {
  return (
    <ArchiveShell title="Add person" description="It is okay to begin with only a name, nickname, or remembered relation.">
      <Card className="max-w-2xl p-6">
        <form action={createPerson} className="grid gap-5">
          <Field label="Full or remembered name"><Input name="full_name" required /></Field>
          <Field label="Birth date"><Input name="birth_date" type="date" /></Field>
          <Field label="Birthplace"><Input name="birth_place" placeholder="City, region, country, or unknown" /></Field>
          <Field label="Notes"><Textarea name="notes" placeholder="What does the family remember?" /></Field>
          <Button type="submit">Save person</Button>
        </form>
      </Card>
    </ArchiveShell>
  );
}
