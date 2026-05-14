import { ArchiveShell } from "@/components/archive/archive-shell";
import { Card } from "@/components/ui/card";
import { mockPeople, mockStories } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function PersonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = mockPeople.find((item) => item.id === id) ?? mockPeople[0];
  const stories = mockStories.filter((story) => story.person_ids?.includes(person.id));

  return (
    <ArchiveShell title={person.full_name} description={person.notes ?? undefined}>
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <Card className="p-6">
          <h2 className="font-serif text-3xl font-semibold">Known details</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div><dt className="text-[#78695e]">Birth date</dt><dd>{person.birth_date ?? "Unknown"}</dd></div>
            <div><dt className="text-[#78695e]">Birthplace</dt><dd>{person.birth_place ?? "Unknown"}</dd></div>
            <div><dt className="text-[#78695e]">Notes</dt><dd>{person.notes ?? "No notes yet."}</dd></div>
          </dl>
        </Card>
        <Card className="p-6">
          <h2 className="font-serif text-3xl font-semibold">Attached stories</h2>
          <div className="mt-5 grid gap-4">
            {stories.map((story) => (
              <div key={story.id} className="rounded-lg border border-[#dfd0be] bg-[#f7f0e4] p-4">
                <h3 className="font-serif text-2xl font-semibold">{story.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5c4d42]">{story.excerpt}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ArchiveShell>
  );
}
