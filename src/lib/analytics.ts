import { prisma } from "@/lib/db";

/**
 * Fire-and-forget: never let analytics writes block or break a page
 * render. Errors are swallowed on purpose.
 */
export function recordPageView(path: string) {
  prisma.pageView.create({ data: { path } }).catch(() => {});
}

export function recordProjectClick(projectId: string) {
  prisma.projectClick.create({ data: { projectId } }).catch(() => {});
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getAnalyticsSummary() {
  const todayStart = daysAgo(0);
  const weekStart = daysAgo(7);

  const [
    totalViews,
    viewsToday,
    viewsThisWeek,
    viewsByPath,
    totalClicks,
    clicksByProject,
    projects,
  ] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.pageView.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.pageView.groupBy({
      by: ["path"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.projectClick.count(),
    prisma.projectClick.groupBy({
      by: ["projectId"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.project.findMany({ select: { id: true, name: true, slug: true } }),
  ]);

  const projectById = new Map(projects.map((p) => [p.id, p]));

  const projectClicks = clicksByProject
    .map((row) => ({
      project: projectById.get(row.projectId),
      clicks: row._count.id,
    }))
    .filter((row): row is { project: { id: string; name: string; slug: string }; clicks: number } =>
      Boolean(row.project)
    );

  return {
    totalViews,
    viewsToday,
    viewsThisWeek,
    pageBreakdown: viewsByPath.map((row) => ({
      path: row.path,
      views: row._count.id,
    })),
    totalProjectClicks: totalClicks,
    projectClicks,
    mostClickedProject: projectClicks[0] ?? null,
  };
}

export type AnalyticsSummary = Awaited<ReturnType<typeof getAnalyticsSummary>>;
