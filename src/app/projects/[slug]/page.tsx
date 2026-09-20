import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getProjectBySlug } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        <h1 className="font-[var(--font-display)] text-3xl font-semibold sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-3 text-base text-[var(--text-muted)]">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-transform hover:scale-[1.03]"
          >
            <Github size={15} /> View Source
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--text-faint)]"
            >
              Live Demo <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-1 font-[var(--font-mono)] text-xs text-[var(--text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 space-y-3">
          <h2 className="font-[var(--font-display)] text-lg font-semibold">
            Overview
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            {project.description}
          </p>
          {project.role && (
            <p className="text-sm text-[var(--text-faint)]">
              <span className="font-medium text-[var(--text-muted)]">Role: </span>
              {project.role}
            </p>
          )}
        </div>
      </Reveal>

      {project.highlights.length > 0 && (
        <Reveal delay={0.2}>
          <div className="mt-10">
            <h2 className="font-[var(--font-display)] text-lg font-semibold">
              Highlights
            </h2>
            <ul className="mt-4 space-y-2.5">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-muted)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-500)]" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </div>
  );
}
