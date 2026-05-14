import { Upload } from "lucide-react";
import { ArchiveShell } from "@/components/archive/archive-shell";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function MediaPage() {
  return (
    <ArchiveShell title="Media" description="Upload photographs and documents to Supabase Storage under archive-specific paths.">
      <Card className="archive-paper grid min-h-80 place-items-center p-8 text-center">
        <div>
          <Upload className="mx-auto size-9 text-[#8b4a2f]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-3xl font-semibold">Media upload area</h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 text-[#78695e]">
            The schema and storage policies are ready. Wire this form to upload files to
            `archive-media/archive_id/...` once your Supabase project is connected.
          </p>
        </div>
      </Card>
    </ArchiveShell>
  );
}
