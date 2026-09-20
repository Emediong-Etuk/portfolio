import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h1 className="font-[var(--font-display)] text-3xl font-semibold sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 max-w-xl text-sm text-[var(--text-muted)]">
          A selection of projects pulled from my GitHub — mostly Laravel APIs
          and the full-stack apps built around them.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
