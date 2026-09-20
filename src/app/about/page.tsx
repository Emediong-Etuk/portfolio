import Image from "next/image";
import type { Metadata } from "next";
import { getProfile, getServices, getSkills } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "About" };
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [profile, services, skills] = await Promise.all([
    getProfile(),
    getServices(),
    getSkills(),
  ]);

  const technical = skills.filter((s) => s.category === "TECHNICAL");
  const soft = skills.filter((s) => s.category === "SOFT");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="relative h-28 w-28 shrink-0">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              sizes="112px"
              className="rounded-2xl border border-[var(--surface-border)] object-cover"
            />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] text-3xl font-semibold sm:text-4xl">
              About {profile.name.split(" ")[0]}
            </h1>
            <p className="mt-1 text-sm font-medium text-[var(--color-accent-500)]">
              {profile.role}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
              {profile.bio}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-16">
          <h2 className="font-[var(--font-display)] text-xl font-semibold">
            Services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-5"
              >
                <h3 className="font-medium text-[var(--text)]">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-[var(--font-display)] text-xl font-semibold">
              Technical Skills
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {technical.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3.5 py-1.5 font-[var(--font-mono)] text-xs text-[var(--text)]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-[var(--font-display)] text-xl font-semibold">
              Soft Skills
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {soft.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border border-[var(--color-accent-400)]/40 bg-[var(--color-accent-500)]/10 px-3.5 py-1.5 text-xs text-[var(--text)]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
