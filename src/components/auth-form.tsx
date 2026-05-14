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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Input
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Field>
      <Field label="Password" hint="Use at least 8 characters.">
        <Input
          name="password"
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </Field>
      {mode === "login" ? (
        <div className="rounded-xl border border-[#17120f]/14 bg-[#f8f2e7] p-4 text-sm text-[#3a3029]">
          <p className="font-semibold text-[#17120f]">Demo login</p>
          <p className="mt-1 font-mono text-xs">demo@familyarchive.local</p>
          <p className="font-mono text-xs">DemoFamily2026!</p>
          <button
            type="button"
            onClick={() => {
              setEmail("demo@familyarchive.local");
              setPassword("DemoFamily2026!");
            }}
            className="mt-3 rounded-lg border border-[#17120f]/18 px-3 py-1.5 text-xs font-semibold text-[#17120f] transition hover:bg-[#fff8eb]"
          >
            Use demo account
          </button>
        </div>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-[#d8a293] bg-[#fff1ec] px-4 py-3 text-sm text-[#7b2f1f]">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={loading}>
        {loading ? "Working..." : mode === "signup" ? "Continue" : "Continue"}
      </Button>
    </form>
  );
}
