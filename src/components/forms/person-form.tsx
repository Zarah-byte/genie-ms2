import { PrimaryButton } from "@/components/ui/primary-button";
import { Field, Input, Textarea } from "@/components/ui/form";

export function PersonForm({
  action
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <form action={action} className="grid gap-4">
      <Field label="Full name">
        <Input name="full_name" required placeholder="Amina Rahman" />
      </Field>
      <Field label="Relationship to selected person">
        <Input
          name="relationship_type"
          placeholder="Parent, child, sibling, spouse, grandparent, cousin, chosen family, other"
        />
      </Field>
      <Field label="Birth date or year">
        <Input name="birth_date" placeholder="1942-08-14 or 1942" />
      </Field>
      <Field label="Death date or year (optional)">
        <Input name="death_date" placeholder="2018" />
      </Field>
      <Field label="Place of birth (optional)">
        <Input name="birth_place" placeholder="Lahore" />
      </Field>
      <Field label="Places lived (optional)">
        <Input name="places_lived" placeholder="Lahore -> Queens" />
      </Field>
      <Field label="Short note">
        <Textarea name="notes" placeholder="What does the family remember?" />
      </Field>
      <Field label="Privacy level">
        <select
          name="privacy_level"
          defaultValue="family"
          className="min-h-12 rounded-xl border border-[#17120f]/14 bg-[#fff9ea] px-4 text-sm text-[#17120f] outline-none focus:ring-2 focus:ring-[#17120f]/15"
        >
          <option value="family">Visible to family members</option>
          <option value="trusted">Visible to trusted contributors</option>
          <option value="private">Private draft</option>
        </select>
      </Field>
      <PrimaryButton type="submit" className="mt-2 w-fit" arrow>
        Save person
      </PrimaryButton>
    </form>
  );
}
