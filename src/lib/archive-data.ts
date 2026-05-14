import { mockPeople, mockStories } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import type { Person, Relationship, Story } from "@/lib/types";

export async function getOwnerArchive() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("family_archives")
    .select("id,name,owner_id,description")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return data;
}

export async function getCurrentUserEmail() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user?.email ?? null;
}

export async function getArchivePeople(archiveId?: string): Promise<Person[]> {
  if (!archiveId) return mockPeople;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("people")
    .select("*")
    .eq("archive_id", archiveId)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export async function getArchiveStories(archiveId?: string): Promise<Story[]> {
  if (!archiveId) return mockStories;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*,story_people(person_id)")
    .eq("archive_id", archiveId)
    .order("created_at", { ascending: false });

  if (error) return [];
  return (
    data?.map((story) => ({
      ...story,
      person_ids: story.story_people?.map((entry: { person_id: string }) => entry.person_id) ?? []
    })) ?? []
  );
}

export async function getArchivePersonById(archiveId: string | undefined, id: string): Promise<Person | null> {
  if (!archiveId) {
    return mockPeople.find((person) => person.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("people")
    .select("*")
    .eq("archive_id", archiveId)
    .eq("id", id)
    .maybeSingle();

  if (error) return null;
  return data ?? null;
}

export async function getArchiveStoryById(archiveId: string | undefined, id: string): Promise<Story | null> {
  if (!archiveId) {
    return mockStories.find((story) => story.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*,story_people(person_id)")
    .eq("archive_id", archiveId)
    .eq("id", id)
    .maybeSingle();

  if (error) return null;
  if (!data) return null;

  return {
    ...data,
    person_ids: data.story_people?.map((entry: { person_id: string }) => entry.person_id) ?? []
  };
}

export async function getArchiveStoriesForPerson(archiveId: string | undefined, personId: string): Promise<Story[]> {
  const stories = await getArchiveStories(archiveId);
  return stories.filter((story) => story.person_ids?.includes(personId));
}

export async function getArchiveRelationships(archiveId?: string): Promise<Relationship[]> {
  if (!archiveId) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("relationships")
    .select("id,archive_id,person_one_id,person_two_id,relationship_type")
    .eq("archive_id", archiveId)
    .order("created_at", { ascending: true });

  if (error) return [];
  return data ?? [];
}

export async function getActiveInviteCodePreview(archiveId?: string): Promise<string | null> {
  if (!archiveId) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("archive_invite_codes")
    .select("code_preview")
    .eq("archive_id", archiveId)
    .is("revoked_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return null;
  return data?.code_preview ?? null;
}
