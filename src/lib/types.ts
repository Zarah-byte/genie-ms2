export type Person = {
  id: string;
  archive_id?: string;
  full_name: string;
  given_name?: string | null;
  family_name?: string | null;
  birth_date?: string | null;
  death_date?: string | null;
  birth_place?: string | null;
  notes?: string | null;
  image_url?: string | null;
};

export type Relationship = {
  id: string;
  archive_id?: string;
  person_one_id: string;
  person_two_id: string;
  relationship_type: "parent" | "partner" | "sibling" | "child" | "other";
};

export type Story = {
  id: string;
  archive_id?: string;
  title: string;
  excerpt: string;
  body?: string | null;
  date_text?: string | null;
  location?: string | null;
  image_url?: string | null;
  person_ids?: string[];
};

export type ArchiveSummary = {
  id: string;
  name: string;
  owner_id: string;
  invite_code?: string;
};
