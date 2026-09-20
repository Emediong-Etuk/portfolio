import type { Metadata } from "next";
import { Github, Mail, Copy } from "lucide-react";
import { getProfile } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { CopyEmailButton } from "@/components/copy-email-button";
import { gmailComposeUrl } from "@/lib/email";
import { recordPageView } from "@/lib/analytics";

export const metadata: Metadata = { title: "Contact" };
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  recordPageView("/contact");

  const profile = await getProfile();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <Reveal>
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-accent-500)]">
          Get in touch
        </p>
        <h1 className="mt-4 font-[var(--font-display)] text-3xl font-semibold sm:text-4xl">
          Let&apos;s build something.
        </h1>
        <p className="mt-4 text-base text-[var(--text-muted)]">
          Whether it&apos;s a backend API, a full-stack app, or a Laravel
          project that needs a second pair of hands — I&apos;d like to hear
          about it.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row">
          <a
            href={gmailComposeUrl(profile.contactEmail)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent-500)] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            <Mail size={16} />
            Email me
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-[var(--surface-border)] px-6 py-3 text-sm font-medium transition-colors hover:border-[var(--text-faint)]"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-8 flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-muted)]">
          <span className="font-[var(--font-mono)]">{profile.contactEmail}</span>
          <CopyEmailButton email={profile.contactEmail}>
            <Copy size={13} />
          </CopyEmailButton>
        </div>
      </Reveal>
    </div>
  );
}
