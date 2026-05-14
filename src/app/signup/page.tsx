import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Begin your family archive."
      description="Create the owner account for your private family archive."
      footer={
        <>
          Already have an account?{" "}
          <Link className="font-semibold text-[#17120f]" href="/login">
            Log in
          </Link>
        </>
      }
    >
      <AuthForm mode="signup" />
    </AuthLayout>
  );
}
