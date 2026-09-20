import { Github, Mail } from "lucide-react";
import { gmailComposeUrl } from "@/lib/email";

export function Footer({
  githubUrl,
  contactEmail,
  name,
}: {
  githubUrl: string;
  contactEmail: string;
  name: string;
}) {
  return (
    <footer className="border-t border-[var(--surface-border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {name}. Built with Next.js &amp; Tailwind.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-[var(--text)]"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href={gmailComposeUrl(contactEmail)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-[var(--text)]"
          >
            <Mail size={14} /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}
