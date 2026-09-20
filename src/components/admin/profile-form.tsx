"use client";

import { useState, type FormEvent } from "react";
import type { Profile } from "@prisma/client";
import { githubAvatarUrl } from "@/lib/github";

export function ProfileForm({
  profile,
  onSaved,
}: {
  profile: Profile;
  onSaved: (profile: Profile) => void;
}) {
  const [values, setValues] = useState({
    name: profile.name,
    role: profile.role,
    tagline: profile.tagline,
    bio: profile.bio,
    githubUsername: profile.githubUsername,
    contactEmail: profile.contactEmail,
    location: profile.location ?? "",
  });
  const [avatarMode, setAvatarMode] = useState<"github" | "custom">(
    profile.avatarSource === "CUSTOM" ? "custom" : "github"
  );
  const [customAvatarUrl, setCustomAvatarUrl] = useState(
    profile.avatarSource === "CUSTOM" ? profile.avatarUrl : ""
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const previewUrl =
    avatarMode === "github"
      ? githubAvatarUrl(values.githubUsername || profile.githubUsername)
      : customAvatarUrl || profile.avatarUrl;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          githubUrl: `https://github.com/${values.githubUsername}`,
          avatarMode,
          avatarUrl: avatarMode === "custom" ? customAvatarUrl : undefined,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        onSaved(updated);
        setMessage("Saved.");
      } else {
        setMessage("Something went wrong.");
      }
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--surface-border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent-400)]";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--surface-border)] bg-[var(--bg-subtle)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL, not known ahead of time */}
          <img
            src={previewUrl}
            alt="Profile preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5 text-xs">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="avatarMode"
              checked={avatarMode === "github"}
              onChange={() => setAvatarMode("github")}
            />
            Sync from GitHub avatar (updates automatically)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="avatarMode"
              checked={avatarMode === "custom"}
              onChange={() => setAvatarMode("custom")}
            />
            Use a custom image URL
          </label>
          {avatarMode === "custom" && (
            <input
              type="url"
              placeholder="https://..."
              className={`${inputClass} mt-1`}
              value={customAvatarUrl}
              onChange={(e) => setCustomAvatarUrl(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          Name
          <input
            required
            className={inputClass}
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          Role / headline
          <input
            required
            className={inputClass}
            value={values.role}
            onChange={(e) => setValues((v) => ({ ...v, role: e.target.value }))}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
        Tagline (hero heading)
        <input
          required
          className={inputClass}
          value={values.tagline}
          onChange={(e) => setValues((v) => ({ ...v, tagline: e.target.value }))}
        />
      </label>

      <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
        Bio
        <textarea
          required
          rows={4}
          className={inputClass}
          value={values.bio}
          onChange={(e) => setValues((v) => ({ ...v, bio: e.target.value }))}
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          GitHub username
          <input
            required
            className={inputClass}
            value={values.githubUsername}
            onChange={(e) =>
              setValues((v) => ({ ...v, githubUsername: e.target.value }))
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          Contact email
          <input
            required
            type="email"
            className={inputClass}
            value={values.contactEmail}
            onChange={(e) =>
              setValues((v) => ({ ...v, contactEmail: e.target.value }))
            }
          />
        </label>
      </div>

      <div className="mt-1 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[var(--color-accent-500)] px-4 py-2 text-xs font-medium text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save profile"}
        </button>
        {message && <span className="text-xs text-[var(--text-muted)]">{message}</span>}
      </div>
    </form>
  );
}
