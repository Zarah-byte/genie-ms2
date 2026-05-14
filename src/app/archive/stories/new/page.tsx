import { createStory } from "@/lib/archive-actions";
import { ArchiveShell } from "@/components/archive/archive-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/form";

export const dynamic = "force-dynamic";

export default function NewStoryPage() {
  return (
    <ArchiveShell title="Add story" description="Write the memory now. You can connect it to people and media as the archive grows.">
      <Card className="max-w-2xl p-6">
        <form action={createStory} className="grid gap-5">
          <Field label="Title"><Input name="title" required /></Field>
          <Field label="Short excerpt"><Textarea name="excerpt" required /></Field>
          <Field label="Full story"><Textarea name="body" /></Field>
          <Field label="Place"><Input name="location" /></Field>
          <Field label="Date or era"><Input name="date_text" placeholder="Summer 1984, Eid morning, unknown" /></Field>
          <Button type="submit">Save story</Button>
        </form>
      </Card>
    </ArchiveShell>
  );
}
