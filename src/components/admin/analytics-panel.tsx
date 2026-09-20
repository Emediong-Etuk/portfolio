"use client";

import { useRouter } from "next/navigation";
import { RefreshCw, TrendingUp, Eye, MousePointerClick, Trophy } from "lucide-react";
import type { AnalyticsSummary } from "@/lib/analytics";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof Eye;
}) {
  return (
    <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4">
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Icon size={13} />
        {label}
      </div>
      <div className="mt-2 font-[var(--font-display)] text-2xl font-semibold">
        {value}
      </div>
    </div>
  );
}

const PATH_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects (list)",
  "/contact": "Contact",
};

function labelForPath(path: string) {
  if (PATH_LABELS[path]) return PATH_LABELS[path];
  if (path.startsWith("/projects/")) {
    return `Project detail — ${path.replace("/projects/", "")}`;
  }
  return path;
}

export function AnalyticsPanel({ analytics }: { analytics: AnalyticsSummary }) {
  const router = useRouter();
  const maxProjectClicks = analytics.projectClicks[0]?.clicks ?? 0;
  const maxPageViews = analytics.pageBreakdown[0]?.views ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">
          Traffic since this site went live.
        </p>
        <button
          type="button"
          onClick={() => router.refresh()}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--surface-border)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total page views" value={analytics.totalViews} icon={Eye} />
        <StatCard label="Views today" value={analytics.viewsToday} icon={TrendingUp} />
        <StatCard label="Views this week" value={analytics.viewsThisWeek} icon={TrendingUp} />
        <StatCard
          label="Project clicks"
          value={analytics.totalProjectClicks}
          icon={MousePointerClick}
        />
      </div>

      {analytics.mostClickedProject && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--color-accent-400)]/40 bg-[var(--color-accent-500)]/10 p-4">
          <Trophy size={18} className="shrink-0 text-[var(--color-accent-500)]" />
          <div>
            <p className="text-xs text-[var(--text-muted)]">Most-clicked project</p>
            <p className="font-medium">
              {analytics.mostClickedProject.project.name}{" "}
              <span className="text-[var(--text-faint)]">
                ({analytics.mostClickedProject.clicks} click
                {analytics.mostClickedProject.clicks === 1 ? "" : "s"})
              </span>
            </p>
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-sm font-medium text-[var(--text-muted)]">
          Clicks by project
        </h3>
        {analytics.projectClicks.length === 0 ? (
          <p className="text-sm text-[var(--text-faint)]">
            No project clicks recorded yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {analytics.projectClicks.map((row) => (
              <div key={row.project.id} className="flex items-center gap-3">
                <span className="w-40 shrink-0 truncate text-sm">
                  {row.project.name}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent-500)]"
                    style={{
                      width: `${maxProjectClicks ? (row.clicks / maxProjectClicks) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-sm text-[var(--text-muted)]">
                  {row.clicks}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-[var(--text-muted)]">
          Views by page
        </h3>
        {analytics.pageBreakdown.length === 0 ? (
          <p className="text-sm text-[var(--text-faint)]">No page views recorded yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {analytics.pageBreakdown.map((row) => (
              <div key={row.path} className="flex items-center gap-3">
                <span className="w-40 shrink-0 truncate text-sm">
                  {labelForPath(row.path)}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                  <div
                    className="h-full rounded-full bg-[var(--text-faint)]"
                    style={{
                      width: `${maxPageViews ? (row.views / maxPageViews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-sm text-[var(--text-muted)]">
                  {row.views}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
