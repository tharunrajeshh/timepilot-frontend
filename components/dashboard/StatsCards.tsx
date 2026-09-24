"use client";

import { memo, useMemo } from "react";
import GlassCard from "./GlassCard";

/* ================================================================
   TYPES
================================================================ */

type StatsCardsProps = {
  completed: number;
  pending: number;
  inProgress: number;
  totalHours: number;
  progress: number;
  dueSoon: number;
  /**
   * Window in hours used for the "Due soon" figure. Must match the
   * computation in page.tsx — the previous hardcoded "7 days" copy
   * contradicted the 24h window the page actually used.
   */
  dueSoonWindowHours?: number;
};

type StatTone = "emerald" | "purple" | "blue" | "amber";

type Stat = {
  key: string;
  label: string;
  value: string;
  detail: string;
  accent: string;
  progress?: number;
  ariaLabel: string;
};

/* ================================================================
   CONSTANTS
================================================================ */

const ACCENTS: Record<StatTone, string> = {
  emerald: "#10B981",
  purple: "#8B5CF6",
  blue: "#3B82F6",
  amber: "#F59E0B",
};

const MAX_COUNT = 1_000_000;
const MAX_HOURS = 10_000;

/* ================================================================
   HELPERS
================================================================ */

function clampCount(input: unknown): number {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(Math.floor(n), MAX_COUNT);
}

function clampPercent(input: unknown): number {
  const n = Number(input);
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function formatHours(input: unknown): string {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return "0h";
  const capped = Math.min(n, MAX_HOURS);
  const rounded = Math.round(capped * 10) / 10;
  return `${rounded}h`;
}

function humanizeWindow(hours: number): string {
  if (hours <= 24) return "Within 24 hours";
  if (hours <= 48) return "Within 2 days";
  if (hours % 24 === 0) return `Within ${hours / 24} days`;
  return `Within ${hours} hours`;
}

/* ================================================================
   CARD
================================================================ */

const StatCard = memo(function StatCard({ stat }: { stat: Stat }) {
  const hasProgress =
    typeof stat.progress === "number" && Number.isFinite(stat.progress);

  return (
    // The whole card is one semantic group with a single accessible name.
    // Everything visual is aria-hidden so screen readers announce the
    // summary exactly once — previously the visible text *and* the sr-only
    // block were both read.
    <GlassCard
      hover
      padding="md"
      role="group"
      aria-label={stat.ariaLabel}
    >
      <div aria-hidden="true">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-black/40">{stat.label}</p>

            <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-black">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-black/35">{stat.detail}</p>
          </div>

          <span
            className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: stat.accent }}
          />
        </div>

        {hasProgress && (
          <div className="mt-5">
            <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
              <div
                className="h-full rounded-full transition-[width] duration-700 motion-safe:transition-[width]"
                style={{
                  width: `${stat.progress}%`,
                  backgroundColor: stat.accent,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
});

/* ================================================================
   MAIN
================================================================ */

function StatsCards({
  completed,
  pending,
  inProgress,
  totalHours,
  progress,
  dueSoon,
  dueSoonWindowHours = 24,
}: StatsCardsProps) {
  const stats = useMemo<Stat[]>(() => {
    const c = clampCount(completed);
    const p = clampCount(pending);
    const ip = clampCount(inProgress);
    const ds = clampCount(dueSoon);
    const pct = clampPercent(progress);
    const hours = formatHours(totalHours);

    return [
      {
        key: "completed",
        label: "Completed",
        value: String(c),
        detail: `${pct}% of all tasks`,
        accent: ACCENTS.emerald,
        progress: pct,
        ariaLabel: `Completed: ${c} tasks, ${pct} percent of all tasks`,
      },
      {
        key: "open",
        label: "Open tasks",
        value: String(p),
        detail: `${ip} currently active`,
        accent: ACCENTS.purple,
        ariaLabel: `Open tasks: ${p} open, ${ip} currently active`,
      },
      {
        key: "time",
        label: "Planned time",
        value: hours,
        detail: "Across your tasks",
        accent: ACCENTS.blue,
        ariaLabel: `Planned time: ${hours} across your tasks`,
      },
      {
        key: "due",
        label: "Due soon",
        value: String(ds),
        detail: humanizeWindow(dueSoonWindowHours),
        accent: ACCENTS.amber,
        ariaLabel: `Due soon: ${ds} tasks ${humanizeWindow(dueSoonWindowHours).toLowerCase()}`,
      },
    ];
  }, [completed, pending, inProgress, totalHours, progress, dueSoon, dueSoonWindowHours]);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Workspace statistics">
      {stats.map((stat) => (
        <StatCard key={stat.key} stat={stat} />
      ))}
    </section>
  );
}

export default memo(StatsCards);