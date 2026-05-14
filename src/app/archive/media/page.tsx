import { Upload } from "lucide-react";
import { ArchiveShell } from "@/components/archive/archive-shell";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function MediaPage() {
  return (
    <ArchiveShell title="Artifacts" description="Photographs, letters, voice notes, recipes, and scanned documents.">
      <Card className="grid min-h-80 place-items-center bg-[#f7f1e5] p-8 text-center">
        <div>
          <Upload className="mx-auto size-9 text-[#17120f]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-3xl text-[#17120f]">Artifact upload area</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#3a3029]/80">
            Upload files to `archive-media/archive_id/...` and attach each artifact to one or more people.
          </p>
        </div>
      </Card>
    </ArchiveShell>
  );
}
