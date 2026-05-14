import Image from "next/image";
import Link from "next/link";
import { Story } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/archive/stories/${story.id}`}>
      <Card className="grid h-full overflow-hidden transition hover:-translate-y-0.5 md:grid-cols-[180px_1fr]">
        <div className="relative min-h-40 bg-[#eadcc9]">
          {story.image_url ? <Image src={story.image_url} alt="" fill className="object-cover" /> : null}
        </div>
        <div className="p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8b4a2f]">
            {story.date_text || "Date unknown"}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold">{story.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#5c4d42]">{story.excerpt}</p>
        </div>
      </Card>
    </Link>
  );
}
