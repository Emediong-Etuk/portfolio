import { prisma } from "@/lib/db";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getAnalyticsSummary } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [profile, projects, analytics] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    getAnalyticsSummary(),
  ]);

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-sm text-[var(--text-muted)]">
        No profile found. Run <code>npm run db:seed</code> once to create one.
      </div>
    );
  }

  return (
    <AdminDashboard
      initialProfile={profile}
      initialProjects={projects}
      analytics={analytics}
    />
  );
}
