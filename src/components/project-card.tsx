import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@prisma/client";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-400)] hover:shadow-[0_0_0_1px_var(--color-accent-400),0_20px_40px_-20px_rgba(124,92,255,0.35)]"
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--text)]">
            {project.name}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-[var(--text-faint)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent-500)]"
          />
        </div>
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">
          {project.summary}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[var(--surface-border)] px-2.5 py-1 font-[var(--font-mono)] text-[11px] text-[var(--text-muted)]"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
        <Github size={12} />
        <span>View project</span>
      </div>
    </Link>
  );
}
