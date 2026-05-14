import Image from "next/image";
import Link from "next/link";
import { Story } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/archive/stories/${story.id}`}>
      <Card className="grid h-full overflow-hidden bg-[#f7f1e5] transition hover:-translate-y-0.5 md:grid-cols-[180px_1fr]">
        <div className="relative min-h-40 bg-[#eadcc9]">
          {story.image_url ? <Image src={story.image_url} alt="" fill className="object-cover" /> : null}
        </div>
        <div className="p-5">
          <p className="type-overline text-[#3a3029]/70">
            {story.date_text || "Date unknown"}
          </p>
          <h3 className="type-h3 mt-2">{story.title}</h3>
          <p className="type-body mt-3 text-[#2e2621]/90">{story.excerpt}</p>
        </div>
      </Card>
    </Link>
  );
}
