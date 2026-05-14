"use client";

import { X } from "lucide-react";

export type AskState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "streaming"; question: string; answer: string }
  | { status: "done"; question: string; answer: string }
  | { status: "error"; message: string };

export function DemoAskPanel({
  state,
  onClose
}: {
  state: AskState;
  onClose: () => void;
}) {
  if (state.status === "idle") return null;

  return (
    <div className="paper-panel relative w-[min(28rem,calc(100vw-1.5rem))] p-5">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-[#3a3029]/40 transition hover:text-[#3a3029]/80"
      >
        <X className="size-4" />
      </button>

      {(state.status === "streaming" || state.status === "done") && (
        <p className="type-overline pr-8 text-[#6b6257]">{state.question}</p>
      )}

      <div className="mt-3 pr-6">
        {state.status === "loading" && (
          <div className="flex items-center gap-2 text-[#3a3029]/60">
            <span className="flex gap-1">
              <span className="size-1.5 animate-bounce rounded-full bg-[#3a3029]/40 [animation-delay:0ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-[#3a3029]/40 [animation-delay:150ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-[#3a3029]/40 [animation-delay:300ms]" />
            </span>
            <span className="type-caption">Searching the archive…</span>
          </div>
        )}

        {(state.status === "streaming" || state.status === "done") && (
          <p className="text-[1rem] leading-[1.7] text-[#17120f]">
            {state.answer}
            {state.status === "streaming" && (
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#17120f]/50 align-middle" />
            )}
          </p>
        )}

        {state.status === "error" && (
          <p className="type-body text-[#c54b4b]">{state.message}</p>
        )}
      </div>

      {state.status === "done" && (
        <p className="type-caption mt-4 text-[#6b6257]">
          Answered from your family archive · Powered by Claude
        </p>
      )}
    </div>
  );
}
