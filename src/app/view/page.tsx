import { redirect } from "next/navigation";

export default async function ViewRedirectPage({
  searchParams
}: {
  searchParams: Promise<{ pin?: string }>;
}) {
  const { pin } = await searchParams;
  redirect(pin ? `/view/${encodeURIComponent(pin)}` : "/join");
}
