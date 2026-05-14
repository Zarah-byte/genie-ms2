import { mockPeople, mockStories } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import type { Person, Story } from "@/lib/types";

export async function getOwnerArchive() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("family_archives")
    .select("id,name,owner_id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return data;
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
    .select("*")
    .eq("archive_id", archiveId)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
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
    .select("*")
    .eq("archive_id", archiveId)
    .eq("id", id)
    .maybeSingle();

  if (error) return null;
  return data ?? null;
}

export async function getArchiveStoriesForPerson(archiveId: string | undefined, personId: string): Promise<Story[]> {
  const stories = await getArchiveStories(archiveId);
  return stories.filter((story) => story.person_ids?.includes(personId));
}
