import type { Person, Relationship, Story } from "@/lib/types";

export const mockPeople: Person[] = [
  {
    id: "alina",
    full_name: "Alina Rahman",
    birth_date: "1932-04-12",
    birth_place: "Sylhet",
    image_url: "/placeholders/alina.svg",
    notes: "Remembered for cardamom tea, precise handwriting, and a soft laugh at the kitchen table."
  },
  {
    id: "omar",
    full_name: "Omar Rahman",
    birth_date: "1928-11-02",
    birth_place: "Chittagong",
    image_url: "/placeholders/omar.svg",
    notes: "Kept train tickets tucked into books and mapped every move in blue ink."
  },
  {
    id: "maia",
    full_name: "Maia Rahman",
    birth_date: "1958-06-18",
    birth_place: "London",
    image_url: "/placeholders/maia.svg",
    notes: "Collected recipes from every auntie and annotated them with family gossip."
  },
  {
    id: "samir",
    full_name: "Samir Rahman",
    birth_date: "1960-01-29",
    birth_place: "Queens",
    image_url: "/placeholders/samir.svg",
    notes: "The designated storyteller at reunions, especially when the facts got blurry."
  },
  {
    id: "nina",
    full_name: "Nina Carter",
    birth_date: "1988-09-03",
    birth_place: "Brooklyn",
    image_url: "/placeholders/nina.svg",
    notes: "Digitized the shoebox photos and asked the questions no one had written down."
  }
];

export const mockRelationships: Relationship[] = [
  { id: "r1", person_one_id: "alina", person_two_id: "omar", relationship_type: "partner" },
  { id: "r2", person_one_id: "alina", person_two_id: "maia", relationship_type: "parent" },
  { id: "r3", person_one_id: "omar", person_two_id: "maia", relationship_type: "parent" },
  { id: "r4", person_one_id: "alina", person_two_id: "samir", relationship_type: "parent" },
  { id: "r5", person_one_id: "omar", person_two_id: "samir", relationship_type: "parent" },
  { id: "r6", person_one_id: "maia", person_two_id: "nina", relationship_type: "parent" }
];

export const mockStories: Story[] = [
  {
    id: "tea",
    title: "The tea tin with the train ticket",
    excerpt:
      "Inside an old tin of black tea, Omar kept the ticket from the week the family first arrived in London.",
    date_text: "Winter 1964",
    location: "London",
    image_url: "/placeholders/letter.svg",
    person_ids: ["omar", "alina", "maia"]
  },
  {
    id: "recipe",
    title: "Maia's mango pickle margin notes",
    excerpt:
      "The recipe changed each time someone copied it, but the warning about too much mustard oil survived.",
    date_text: "Undated recipe card",
    location: "Queens",
    image_url: "/placeholders/recipe.svg",
    person_ids: ["maia", "samir", "nina"]
  },
  {
    id: "photo",
    title: "A porch photograph with three unknown cousins",
    excerpt:
      "No one agrees on the cousins' names yet. The archive keeps the uncertainty visible instead of erasing it.",
    date_text: "Possibly 1978",
    location: "Brooklyn",
    image_url: "/placeholders/photo.svg",
    person_ids: ["samir", "nina"]
  }
];
