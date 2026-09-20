"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus } from "lucide-react";
import type { Profile, Project } from "@prisma/client";
import { ProjectForm } from "@/components/admin/project-form";
import { ProjectList } from "@/components/admin/project-list";
import { ProfileForm } from "@/components/admin/profile-form";

export function AdminDashboard({
  initialProfile,
  initialProjects,
}: {
  initialProfile: Profile;
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"projects" | "profile">("projects");
  const [profile, setProfile] = useState(initialProfile);
  const [projects, setProjects] = useState(initialProjects);
  const [showAddForm, setShowAddForm] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  async function handleCreate(payload: Record<string, unknown>) {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const created = await res.json();
      setProjects((prev) => [...prev, created]);
      setShowAddForm(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Update your projects and profile info. Changes go live immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--surface-border)] px-3 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>

      <div className="mb-8 flex gap-1 rounded-lg border border-[var(--surface-border)] bg-[var(--bg-subtle)] p-1 text-sm">
        {(["projects", "profile"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-4 py-2 font-medium capitalize transition-colors ${
              tab === t
                ? "bg-[var(--surface)] text-[var(--text)] shadow-sm"
                : "text-[var(--text-muted)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "projects" ? (
        <div className="flex flex-col gap-4">
          {showAddForm ? (
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4">
              <h3 className="mb-3 text-sm font-medium">New project</h3>
              <ProjectForm
                submitLabel="Add project"
                onCancel={() => setShowAddForm(false)}
                onSubmit={handleCreate}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--surface-border)] py-4 text-sm font-medium text-[var(--text-muted)] hover:border-[var(--color-accent-400)] hover:text-[var(--text)]"
            >
              <Plus size={15} /> Add project
            </button>
          )}

          <ProjectList projects={projects} onChange={setProjects} />
        </div>
      ) : (
        <ProfileForm profile={profile} onSaved={setProfile} />
      )}
    </div>
  );
}
