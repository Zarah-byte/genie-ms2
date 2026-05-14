import { CopyPinButton } from "@/components/copy-pin-button";

export function InvitePanel({
  pin,
  copyable = true,
  note
}: {
  pin: string;
  copyable?: boolean;
  note?: string;
}) {
  return (
    <section className="paper-panel p-6 sm:p-7">
      <h2 className="font-serif text-[clamp(1.7rem,4vw,2.6rem)] leading-none text-[#17120f]">
        Invite family into the archive.
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#3a3029]/80">
        Only share this with relatives or trusted contributors. You can reset the PIN anytime.
      </p>
      <div className="my-7 rounded-2xl border border-dashed border-[#17120f]/25 bg-[#f7f1e3] px-5 py-5 font-mono text-3xl tracking-[0.22em] text-[#17120f] sm:text-4xl">
        {pin}
      </div>
      {copyable ? (
        <div className="flex flex-wrap gap-3">
          <CopyPinButton pin={pin} />
        </div>
      ) : null}
      {note ? <p className="mt-3 text-xs leading-5 text-[#3a3029]/75">{note}</p> : null}
      <div className="archive-divider mt-6 pt-5">
        <p className="text-xs uppercase tracking-[0.16em] text-[#3a3029]/70">Permissions</p>
        <ul className="mt-2 grid gap-1 text-sm text-[#2c241f]">
          <li>View only</li>
          <li>Can contribute</li>
          <li>Can edit people and memories</li>
        </ul>
      </div>
    </section>
  );
}
