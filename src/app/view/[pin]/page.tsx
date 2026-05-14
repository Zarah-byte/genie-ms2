import { FamilyTreeDemo } from "@/components/tree/family-tree-demo";
import { Card } from "@/components/ui/card";
import { hashInviteCode } from "@/lib/invite-code";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PinViewPage({ params }: { params: Promise<{ pin: string }> }) {
  const { pin } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .rpc("resolve_archive_invite", { input_code_hash: hashInviteCode(pin) })
    .maybeSingle<{ archive_id: string; archive_name: string }>();

  return (
    <main className="safe-px safe-pb min-h-screen bg-[#040406] px-5 py-10 sm:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        <Card className="mb-6 bg-[#f7f1e5] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[#3a3029]/70">Read-only PIN view</p>
          <h1 className="mt-2 font-serif text-3xl text-[#17120f] sm:text-4xl">
            {data?.archive_name ?? "Family archive preview"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#3a3029]/80">
            {data
              ? "This read-only view was resolved through the invite-code RPC without exposing stored code hashes."
              : `PIN ending ${pin.slice(-4)} is not connected yet, so this screen is showing the mock archive preview.`}
          </p>
        </Card>
        <FamilyTreeDemo />
      </div>
    </main>
  );
}
