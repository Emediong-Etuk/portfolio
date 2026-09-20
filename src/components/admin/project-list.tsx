"use client";

import { useState } from "react";
import type { Project } from "@prisma/client";
import { ArrowDown, ArrowUp, Pencil, Trash2, X } from "lucide-react";
import { ProjectForm } from "@/components/admin/project-form";

export function ProjectList({
  projects,
  onChange,
}: {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function updateProject(id: string, payload: Record<string, unknown>) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        onChange(projects.map((p) => (p.id === id ? updated : p)));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        onChange(projects.filter((p) => p.id !== id));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const reordered = [...projects];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    onChange(reordered);

    await fetch("/api/projects/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: reordered.map((p) => p.id) }),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4"
        >
          {editingId === project.id ? (
            <ProjectForm
              project={project}
              submitLabel="Save changes"
              onCancel={() => setEditingId(null)}
              onSubmit={async (payload) => {
                await updateProject(project.id, payload);
                setEditingId(null);
              }}
            />
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-medium text-[var(--text)]">
                    {project.name}
                  </h3>
                  {!project.featured && (
                    <span className="rounded-full bg-[var(--bg-subtle)] px-2 py-0.5 text-[10px] text-[var(--text-faint)]">
                      hidden
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-[var(--text-muted)]">
                  {project.summary}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label="Move up"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] disabled:opacity-30"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={index === projects.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label="Move down"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] disabled:opacity-30"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(project.id)}
                  aria-label="Edit"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  disabled={busyId === project.id}
                  onClick={() => deleteProject(project.id)}
                  aria-label="Delete"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-500/10 disabled:opacity-40"
                >
                  {busyId === project.id ? <X size={14} /> : <Trash2 size={14} />}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {projects.length === 0 && (
        <p className="text-sm text-[var(--text-faint)]">
          No projects yet — add your first one above.
        </p>
      )}
    </div>
  );
}
