import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="safe-px safe-pb grid min-h-screen place-items-center px-5 py-10 sm:px-6 md:py-12">
      <Card className="w-full max-w-md p-6 sm:p-7">
        <Link href="/" className="font-serif text-3xl font-semibold">
          Genie
        </Link>
        <h1 className="mt-7 font-serif text-[2.05rem] font-semibold sm:mt-8 sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#78695e]">
          Return to the family archive you are tending.
        </p>
        <div className="mt-7">
          <AuthForm mode="login" next={next} />
        </div>
        <p className="mt-6 text-sm text-[#78695e]">
          New here?{" "}
          <Link className="font-semibold text-[#5a2e20]" href="/signup">
            Start an archive
          </Link>
        </p>
      </Card>
    </main>
  );
}
