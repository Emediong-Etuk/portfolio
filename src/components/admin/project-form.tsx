"use client";

import { useState, type FormEvent } from "react";
import type { Project } from "@prisma/client";

export type ProjectFormValues = {
  name: string;
  slug?: string;
  summary: string;
  description: string;
  role: string;
  techStack: string;
  highlights: string;
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
};

function toFormValues(project?: Project): ProjectFormValues {
  return {
    name: project?.name ?? "",
    slug: project?.slug,
    summary: project?.summary ?? "",
    description: project?.description ?? "",
    role: project?.role ?? "",
    techStack: project?.techStack?.join(", ") ?? "",
    highlights: project?.highlights?.join("\n") ?? "",
    repoUrl: project?.repoUrl ?? "",
    liveUrl: project?.liveUrl ?? "",
    featured: project?.featured ?? true,
  };
}

export function ProjectForm({
  project,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: {
  project?: Project;
  onSubmit: (payload: {
    name: string;
    slug?: string;
    summary: string;
    description: string;
    role: string;
    techStack: string[];
    highlights: string[];
    repoUrl: string;
    liveUrl: string | null;
    featured: boolean;
  }) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<ProjectFormValues>(toFormValues(project));
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        name: values.name,
        slug: values.slug,
        summary: values.summary,
        description: values.description,
        role: values.role,
        techStack: values.techStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        highlights: values.highlights
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        repoUrl: values.repoUrl,
        liveUrl: values.liveUrl.trim() || null,
        featured: values.featured,
      });
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--surface-border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent-400)]";

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
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
          Role
          <input
            className={inputClass}
            value={values.role}
            onChange={(e) => setValues((v) => ({ ...v, role: e.target.value }))}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
        Summary (short, shown on cards)
        <input
          required
          className={inputClass}
          value={values.summary}
          onChange={(e) => setValues((v) => ({ ...v, summary: e.target.value }))}
        />
      </label>

      <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
        Description (full detail page)
        <textarea
          required
          rows={3}
          className={inputClass}
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          Repo URL
          <input
            required
            type="url"
            className={inputClass}
            value={values.repoUrl}
            onChange={(e) => setValues((v) => ({ ...v, repoUrl: e.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          Live URL (optional)
          <input
            type="url"
            className={inputClass}
            value={values.liveUrl}
            onChange={(e) => setValues((v) => ({ ...v, liveUrl: e.target.value }))}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
        Tech stack (comma-separated)
        <input
          className={inputClass}
          placeholder="Laravel, PHP, MySQL"
          value={values.techStack}
          onChange={(e) => setValues((v) => ({ ...v, techStack: e.target.value }))}
        />
      </label>

      <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
        Highlights (one per line)
        <textarea
          rows={3}
          className={inputClass}
          value={values.highlights}
          onChange={(e) => setValues((v) => ({ ...v, highlights: e.target.value }))}
        />
      </label>

      <label className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(e) => setValues((v) => ({ ...v, featured: e.target.checked }))}
        />
        Featured / visible on site
      </label>

      <div className="mt-1 flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[var(--color-accent-500)] px-4 py-2 text-xs font-medium text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[var(--surface-border)] px-4 py-2 text-xs font-medium text-[var(--text-muted)]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
