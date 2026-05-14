"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";
import { authSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({ mode, next }: { mode: "login" | "signup"; next?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const parsed = authSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your details.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const result =
      mode === "signup"
        ? await supabase.auth.signUp(parsed.data)
        : await supabase.auth.signInWithPassword(parsed.data);

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    router.push(mode === "signup" ? "/onboarding" : next ?? "/archive");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <Field label="Email">
        <Input name="email" type="email" autoComplete="email" required />
      </Field>
      <Field label="Password" hint="Use at least 8 characters.">
        <Input
          name="password"
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          required
        />
      </Field>
      {error ? (
        <p className="rounded-lg border border-[#d8a293] bg-[#fff1ec] px-4 py-3 text-sm text-[#7b2f1f]">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={loading}>
        {loading ? "Working..." : mode === "signup" ? "Create account" : "Log in"}
      </Button>
    </form>
  );
}
