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
};

type StatTone = "emerald" | "purple" | "blue" | "amber";

type Stat = {
  key: string;
  label: string;
  value: string;
  detail: string;
  accent: string;
  progress?: number;
  /** Human-readable summary for screen readers. */
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

/** Clamp to a displayable non-negative integer. */
function clampCount(input: unknown): number {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(Math.floor(n), MAX_COUNT);
}

/** Clamp to a valid 0–100 percentage. */
function clampPercent(input: unknown): number {
  const n = Number(input);
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

/** Clamp hours and render with at most one decimal place. */
function formatHours(input: unknown): string {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return "0h";
  const capped = Math.min(n, MAX_HOURS);
  const rounded = Math.round(capped * 10) / 10;
  return `${rounded}h`;
}

/* ================================================================
   CARD
================================================================ */

const StatCard = memo(function StatCard({ stat }: { stat: Stat }) {
  const hasProgress =
    typeof stat.progress === "number" && Number.isFinite(stat.progress);

  return (
    <GlassCard hover padding="md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-black/40">
            {stat.label}
          </p>

          <p
            className="mt-2 text-3xl font-semibold tracking-tight text-black tabular-nums"
            title={stat.value}
          >
            {stat.value}
          </p>

          <p className="mt-1 text-xs text-black/35">
            {stat.detail}
          </p>
        </div>

        <span
          className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: stat.accent }}
          aria-hidden="true"
        />
      </div>

      {hasProgress && (
        <div className="mt-5">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={stat.progress}
            aria-label={`${stat.label}: ${stat.ariaLabel}`}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${stat.progress}%`,
                backgroundColor: stat.accent,
              }}
            />
          </div>
        </div>
      )}

      {/* Screen-reader summary of the whole card. */}
      <span className="sr-only">
        {stat.label}. {stat.value}. {stat.detail}.
      </span>
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
}: StatsCardsProps) {
  const stats = useMemo<Stat[]>(() => {
    const c = clampCount(completed);
    const p = clampCount(pending);
    const ip = clampCount(inProgress);
    const ds = clampCount(dueSoon);
    const pct = clampPercent(progress);

    return [
      {
        key: "completed",
        label: "Completed",
        value: String(c),
        detail: `${pct}% of all tasks`,
        accent: ACCENTS.emerald,
        progress: pct,
        ariaLabel: `${c} tasks completed, ${pct} percent of all tasks`,
      },
      {
        key: "open",
        label: "Open tasks",
        value: String(p),
        detail: `${ip} currently active`,
        accent: ACCENTS.purple,
        ariaLabel: `${p} open tasks, ${ip} currently active`,
      },
      {
        key: "time",
        label: "Planned time",
        value: formatHours(totalHours),
        detail: "Across your tasks",
        accent: ACCENTS.blue,
        ariaLabel: `${formatHours(totalHours)} planned across your tasks`,
      },
      {
        key: "due",
        label: "Due soon",
        value: String(ds),
        detail: "Within 7 days",
        accent: ACCENTS.amber,
        ariaLabel: `${ds} tasks due within 7 days`,
      },
    ];
  }, [completed, pending, inProgress, totalHours, progress, dueSoon]);

  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      role="group"
      aria-label="Workspace statistics"
    >
      {stats.map((stat) => (
        <StatCard key={stat.key} stat={stat} />
      ))}
    </div>
  );
}

export default memo(StatsCards);