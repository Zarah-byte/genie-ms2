import { FamilyTreeDemo } from "@/components/tree/family-tree-demo";
import { Card } from "@/components/ui/card";
import {
  getArchivePeople,
  getArchiveRelationships,
  getArchiveStories,
  getOwnerArchive
} from "@/lib/archive-data";

export async function ArchiveTree() {
  const archive = await getOwnerArchive();
  const people = await getArchivePeople(archive?.id);

  if (!people.length) {
    return (
      <Card className="bg-[#f7f1e5] p-6">
        <h2 className="font-serif text-3xl text-[#17120f]">No family members yet</h2>
        <p className="mt-3 text-sm leading-6 text-[#3a3029]/85">
          Add people first, then the constellation view will render your family branches.
        </p>
      </Card>
    );
  }

  const relationships = await getArchiveRelationships(archive?.id);
  const stories = await getArchiveStories(archive?.id);

  return (
    <FamilyTreeDemo
      people={people}
      relationships={relationships}
      stories={stories}
      ctaHref="/archive/people/new"
      ctaLabel="Add another person"
    />
  );
}
