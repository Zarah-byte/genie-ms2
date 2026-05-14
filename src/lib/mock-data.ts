import { demoMemories, demoPeople, demoRelationships } from "@/lib/mock/demoFamily";
import type { Person, Relationship, Story } from "@/lib/types";

function parseBirthDate(dates: string): string | null {
  const directYear = dates.match(/^(\d{4})/);
  if (directYear) return `${directYear[1]}-01-01`;

  const bornYear = dates.match(/b\.\s*(\d{4})/i);
  if (bornYear) return `${bornYear[1]}-01-01`;

  return null;
}

const peopleByName = new Map(demoPeople.map((person) => [person.name, person.id]));

export const mockPeople: Person[] = demoPeople.map((person) => ({
  id: person.id,
  full_name: person.name,
  birth_date: parseBirthDate(person.dates),
  birth_place: person.place,
  image_url: person.image_url ?? null,
  notes: person.story
}));

export const mockRelationships: Relationship[] = demoRelationships.map((relationship) => ({
  id: relationship.id,
  person_one_id: relationship.from,
  person_two_id: relationship.to,
  relationship_type: "other"
}));

export const mockStories: Story[] = demoMemories.map((memory) => ({
  id: memory.id,
  title: memory.title,
  excerpt: memory.excerpt,
  date_text: memory.dateOrPlace,
  location: null,
  image_url: null,
  person_ids: memory.relatedPeople
    .map((name) => peopleByName.get(name))
    .filter((id): id is string => Boolean(id))
}));
