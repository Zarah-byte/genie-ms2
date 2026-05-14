import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <AuthLayout
      title="Return to your archive."
      description="Welcome back. Continue preserving the people, places, and stories your family carries."
      footer={
        <>
          New here?{" "}
          <Link className="font-semibold text-[#17120f]" href="/signup">
            Start an archive
          </Link>
        </>
      }
    >
      <AuthForm mode="login" next={next} />
    </AuthLayout>
  );
}
