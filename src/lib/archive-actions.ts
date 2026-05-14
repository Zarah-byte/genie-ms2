"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { generateInviteCode, hashInviteCode } from "@/lib/invite-code";
import { archiveSchema, personSchema, profileSchema, storySchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function upsertProfile(formData: FormData) {
  const parsed = profileSchema.safeParse({
    full_name: formData.get("full_name")
  });

  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: parsed.data.full_name,
    updated_at: new Date().toISOString()
  });

  if (error) throw new Error(error.message);
  redirect("/onboarding/archive");
}

export async function createArchive(formData: FormData) {
  const parsed = archiveSchema.safeParse({
    name: formData.get("name")
  });

  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: archive, error: archiveError } = await supabase
    .from("family_archives")
    .insert({ name: parsed.data.name, owner_id: user.id })
    .select("id,name")
    .single();

  if (archiveError || !archive) {
    throw new Error(archiveError?.message ?? "Could not create archive.");
  }

  const code = generateInviteCode();
  const { error: codeError } = await supabase.from("archive_invite_codes").insert({
    archive_id: archive.id,
    created_by: user.id,
    code_hash: hashInviteCode(code),
    code_preview: code.slice(-4)
  });

  if (codeError) throw new Error(codeError.message);

  redirect(`/onboarding/pin?archive=${encodeURIComponent(archive.name)}&pin=${code}`);
}

export async function createPerson(formData: FormData) {
  const parsed = personSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  const supabase = await createClient();
  const { data: ownedArchive } = await supabase
    .from("family_archives")
    .select("id")
    .limit(1)
    .single();

  if (!ownedArchive) redirect("/onboarding");

  const { error } = await supabase.from("people").insert({
    archive_id: ownedArchive.id,
    full_name: parsed.data.full_name,
    birth_date: parsed.data.birth_date || null,
    birth_place: parsed.data.birth_place || null,
    notes: parsed.data.notes || null
  });

  if (error) throw new Error(error.message);
  revalidatePath("/archive/people");
  redirect("/archive/people");
}

export async function createStory(formData: FormData) {
  const parsed = storySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  const supabase = await createClient();
  const { data: ownedArchive } = await supabase
    .from("family_archives")
    .select("id")
    .limit(1)
    .single();

  if (!ownedArchive) redirect("/onboarding");

  const { error } = await supabase.from("stories").insert({
    archive_id: ownedArchive.id,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    body: parsed.data.body || null,
    location: parsed.data.location || null,
    date_text: parsed.data.date_text || null
  });

  if (error) throw new Error(error.message);
  revalidatePath("/archive/stories");
  redirect("/archive/stories");
}
