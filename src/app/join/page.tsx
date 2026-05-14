import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/form";

export default function JoinPage() {
  return (
    <main className="safe-px safe-pb grid min-h-screen place-items-center px-5 py-10 sm:px-6 md:py-12">
      <Card className="w-full max-w-md p-6 sm:p-7">
        <h1 className="font-serif text-[2.05rem] font-semibold sm:text-4xl">Enter a family PIN</h1>
        <p className="mt-3 text-sm leading-6 text-[#78695e]">
          This opens a read-only archive view for invited family members.
        </p>
        <form action="/view" className="mt-7 grid gap-5">
          <Field label="PIN"><Input name="pin" placeholder="A1B2C3D4" required /></Field>
          <Button type="submit">View archive</Button>
        </form>
      </Card>
    </main>
  );
}
