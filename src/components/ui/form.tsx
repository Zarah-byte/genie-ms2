"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#241b16]">
      <span>{label}</span>
      {children}
      {hint ? <span className="archive-caption font-normal">{hint}</span> : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, onInput, onInvalid, ...restProps } = props;
  const [isInvalid, setIsInvalid] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, []);

  function triggerShake() {
    if (shakeTimeoutRef.current) {
      clearTimeout(shakeTimeoutRef.current);
    }

    setIsShaking(false);
    requestAnimationFrame(() => {
      setIsShaking(true);
      shakeTimeoutRef.current = setTimeout(() => {
        setIsShaking(false);
      }, 260);
    });
  }

  function handleInvalid(event: React.FormEvent<HTMLInputElement>) {
    // Keep native constraint checking while suppressing the browser tooltip popup.
    event.preventDefault();
    setIsInvalid(true);
    triggerShake();
    onInvalid?.(event);
  }

  function handleInput(event: React.InputEvent<HTMLInputElement>) {
    if (isInvalid && event.currentTarget.validity.valid) {
      setIsInvalid(false);
    }
    onInput?.(event);
  }

  return (
    <input
      className={cn(
        "min-h-12 rounded-xl border border-[#17120f]/14 bg-[#fff9ea] px-4 text-base text-[#1b1511] outline-none transition placeholder:text-[#9b8a7c] focus:border-[#17120f]/45 focus:ring-4 focus:ring-[#17120f]/10",
        isInvalid && "border-[#c54b4b] focus:border-[#c54b4b] ring-4 ring-[#c54b4b]/15 focus:ring-[#c54b4b]/20",
        isShaking && "input-invalid-shake",
        className
      )}
      onInvalid={handleInvalid}
      onInput={handleInput}
      {...restProps}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 rounded-xl border border-[#17120f]/14 bg-[#fff9ea] px-4 py-3 text-base text-[#1b1511] outline-none transition placeholder:text-[#9b8a7c] focus:border-[#17120f]/45 focus:ring-4 focus:ring-[#17120f]/10",
        props.className
      )}
      {...props}
    />
  );
}
