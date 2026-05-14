import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="safe-px safe-pb grid min-h-screen place-items-center px-5 py-10 sm:px-6 md:py-12">
      <Card className="w-full max-w-md p-6 sm:p-7">
        <Link href="/" className="font-serif text-3xl font-semibold">
          Genie
        </Link>
        <h1 className="mt-7 font-serif text-[2.05rem] font-semibold sm:mt-8 sm:text-4xl">
          Begin with a name
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#78695e]">
          Create the owner account for your private family archive.
        </p>
        <div className="mt-7">
          <AuthForm mode="signup" />
        </div>
        <p className="mt-6 text-sm text-[#78695e]">
          Already have an account?{" "}
          <Link className="font-semibold text-[#5a2e20]" href="/login">
            Log in
          </Link>
        </p>
      </Card>
    </main>
  );
}
