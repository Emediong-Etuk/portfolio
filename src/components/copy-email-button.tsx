"use client";

import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";

export function CopyEmailButton({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy email address"
      className="flex items-center text-[var(--text-faint)] transition-colors hover:text-[var(--text)] cursor-pointer"
    >
      {copied ? <Check size={13} /> : children}
    </button>
  );
}
