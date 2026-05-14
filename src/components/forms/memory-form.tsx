import { PrimaryButton } from "@/components/ui/primary-button";
import { Field, Input, Textarea } from "@/components/ui/form";

export function MemoryForm({
  action
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <form action={action} className="grid gap-4">
      <Field label="Memory title">
        <Input name="title" required placeholder="Wedding photograph, 1964" />
      </Field>
      <Field label="Memory type">
        <select
          name="memory_type"
          defaultValue="Story"
          className="min-h-12 rounded-xl border border-[#17120f]/14 bg-[#fff9ea] px-4 text-sm text-[#17120f] outline-none focus:ring-2 focus:ring-[#17120f]/15"
        >
          <option>Story</option>
          <option>Photograph</option>
          <option>Letter</option>
          <option>Recipe</option>
          <option>Audio</option>
          <option>Document</option>
          <option>Place</option>
          <option>Other</option>
        </select>
      </Field>
      <Field label="Attach to people">
        <Input name="attached_people" placeholder="Amina Rahman, Idris Noor" />
      </Field>
      <Field label="Date or period">
        <Input name="date_text" placeholder="Ramadan 2020, circa 1964, unknown" />
      </Field>
      <Field label="Place">
        <Input name="location" placeholder="Lahore -> Queens" />
      </Field>
      <Field label="Story text">
        <Textarea
          name="body"
          placeholder="Write the details only your family would know..."
          required
        />
      </Field>
      <Field label="Tags">
        <Input name="tags" placeholder="migration, recipes, eid, elders" />
      </Field>
      <PrimaryButton type="submit" className="mt-2 w-fit" arrow>
        Save memory
      </PrimaryButton>
    </form>
  );
}
