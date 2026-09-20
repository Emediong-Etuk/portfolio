import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Mail } from "lucide-react";
import { getProfile, getProjects, getServices } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { gmailComposeUrl } from "@/lib/email";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, projects, services] = await Promise.all([
    getProfile(),
    getProjects(),
    getServices(),
  ]);

  const featured = projects.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[var(--color-accent-500)] opacity-[0.14] blur-[120px]"
        />
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal>
            <div className="relative mx-auto mb-8 h-28 w-28 sm:h-32 sm:w-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-accent-400)] to-[var(--color-accent-700)] opacity-30 blur-lg" />
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                sizes="128px"
                priority
                className="relative rounded-full border-2 border-[var(--surface-border)] object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mb-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-accent-500)]">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-balance font-[var(--font-display)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {profile.tagline}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              Hi, I&apos;m {profile.name.split(" ")[0]}. I design and build backend
              systems and the products around them — see the work below.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-transform hover:scale-[1.03]"
              >
                View Projects
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-6 py-3 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text-faint)]"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href={gmailComposeUrl(profile.contactEmail)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-6 py-3 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text-faint)]"
              >
                <Mail size={16} />
                Contact
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
                  Featured Work
                </h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  A handful of recent projects, pulled straight from GitHub.
                </p>
              </div>
              <Link
                href="/projects"
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-500)] hover:text-[var(--color-accent-600)]"
              >
                All projects <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--surface-border)] bg-[var(--bg-subtle)] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
              What I Do
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6">
                  <h3 className="font-[var(--font-display)] text-base font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface)] p-12 text-center">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
              Have something to build?
            </h2>
            <p className="max-w-md text-sm text-[var(--text-muted)]">
              I&apos;m always open to interesting backend and full-stack work.
              Reach out and let&apos;s talk.
            </p>
            <a
              href={gmailComposeUrl(profile.contactEmail)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-[var(--color-accent-500)] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              <Mail size={16} />
              {profile.contactEmail}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
