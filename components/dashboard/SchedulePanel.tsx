"use client";

import { memo, useCallback, useMemo } from "react";
import GlassCard from "./GlassCard";

/* ================================================================
   TYPES
================================================================ */

export type ScheduleItem = {
  id?: string | number;
  title: string;
  start_time?: string;
  end_time?: string;
  start?: string;
  end?: string;
  duration_minutes?: number;
  status?: string;
  type?: string;
};

type SchedulePanelProps = {
  schedule: ScheduleItem[];
  currentTime: Date;
  /**
   * Unified focus handler. `onStartTask` is kept as an alias for callers
   * that used the Overview prop name — both are accepted, `onFocus` wins
   * if both are provided.
   */
  onFocus?: (item: ScheduleItem) => void;
  onStartTask?: (item: ScheduleItem) => void;
  loading?: boolean;
};

type ResolvedItem = {
  item: ScheduleItem;
  key: string | number;
  title: string;
  startLabel: string;
  endLabel: string | null;
  durationMinutes: number | null;
  statusLabel: "NOW" | "UP NEXT" | "DONE";
  active: boolean;
  dotClass: string;
  lineClass: string;
  badgeClass: string;
};

/* ================================================================
   CONSTANTS
================================================================ */

const MAX_TITLE_LEN = 200;

/* ================================================================
   HELPERS
================================================================ */

function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function parseDateTime(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatTime(value?: string): string {
  const date = parseDateTime(value);
  if (!date) return value || "--";
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours}h`;
  return `${hours}h ${remaining}m`;
}

function getStart(item: ScheduleItem): Date | null {
  return parseDateTime(item.start_time || item.start);
}

function getEnd(item: ScheduleItem): Date | null {
  const explicit = parseDateTime(item.end_time || item.end);
  if (explicit) return explicit;

  const start = getStart(item);
  if (start && item.duration_minutes) {
    return new Date(start.getTime() + item.duration_minutes * 60 * 1000);
  }
  return null;
}

function resolveDuration(item: ScheduleItem): number | null {
  if (typeof item.duration_minutes === "number" && item.duration_minutes > 0) {
    return Math.round(item.duration_minutes);
  }
  const start = getStart(item);
  const end = getEnd(item);
  if (!start || !end) return null;
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 60_000));
}

function accentFor(active: boolean, type: string): {
  dotClass: string;
  lineClass: string;
  badgeClass: string;
} {
  if (active) {
    return {
      dotClass: "bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.10)]",
      lineClass: "bg-emerald-500",
      badgeClass: "bg-emerald-500/10 text-emerald-600",
    };
  }
  const t = type.toLowerCase();
  if (t.includes("focus") || t.includes("deep")) {
    return {
      dotClass: "bg-purple-500",
      lineClass: "bg-purple-500",
      badgeClass: "bg-purple-500/10 text-purple-600",
    };
  }
  if (t.includes("meeting") || t.includes("call")) {
    return {
      dotClass: "bg-blue-500",
      lineClass: "bg-blue-500",
      badgeClass: "bg-blue-500/10 text-blue-600",
    };
  }
  return {
    dotClass: "bg-black/25",
    lineClass: "bg-black/15",
    badgeClass: "bg-black/[0.04] text-black/45",
  };
}

/**
 * One pass over the array: parse, sort, and precompute display strings.
 * The previous version re-sorted and re-parsed everything on every render,
 * which included the 1-second clock tick from page.tsx.
 */
function resolveSchedule(
  schedule: ScheduleItem[],
  now: number
): ResolvedItem[] {
  const resolved = schedule.map((item, index): ResolvedItem => {
    const start = getStart(item);
    const end = getEnd(item);
    const active =
      start !== null &&
      end !== null &&
      now >= start.getTime() &&
      now <= end.getTime();

    const statusLabel: ResolvedItem["statusLabel"] = active
      ? "NOW"
      : start !== null && start.getTime() > now
      ? "UP NEXT"
      : "DONE";

    const accent = accentFor(active, item.type ?? "");
    const startRaw = item.start_time || item.start;

    return {
      item,
      // Fallback key uses the index — stable per array position, fine for
      // read-only lists. If you ever support inline editing, add a real `id`.
      key: item.id ?? `${item.title}-${index}`,
      title: safeText(item.title, MAX_TITLE_LEN) || "Untitled",
      startLabel: formatTime(startRaw),
      endLabel: item.end_time || item.end ? formatTime(item.end_time || item.end) : null,
      durationMinutes: resolveDuration(item),
      statusLabel,
      active,
      dotClass: accent.dotClass,
      lineClass: accent.lineClass,
      badgeClass: accent.badgeClass,
    };
  });

  return resolved.sort((a, b) => {
    const aStart = getStart(a.item)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const bStart = getStart(b.item)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    return aStart - bStart;
  });
}

/* ================================================================
   SKELETON
================================================================ */

const Skeleton = memo(function Skeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex animate-pulse gap-4">
          <div className="h-4 w-14 rounded bg-black/[0.05]" />
          <div className="flex-1">
            <div className="h-4 w-2/3 rounded bg-black/[0.05]" />
            <div className="mt-2 h-3 w-1/3 rounded bg-black/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
});

/* ================================================================
   MAIN
================================================================ */

export default function SchedulePanel({
  schedule,
  currentTime,
  onFocus,
  onStartTask,
  loading = false,
}: SchedulePanelProps) {
  const handleFocus = useCallback(
    (item: ScheduleItem) => {
      if (onFocus) return onFocus(item);
      if (onStartTask) return onStartTask(item);
    },
    [onFocus, onStartTask]
  );

  const canFocus = Boolean(onFocus) || Boolean(onStartTask);

  // Minute resolution — the sort order and NOW/UP NEXT labels don't need
  // to change every second even though the parent clock ticks that often.
  const nowMinute = useMemo(
    () => Math.floor(currentTime.getTime() / 60_000) * 60_000,
    [currentTime]
  );

  const items = useMemo(
    () => resolveSchedule(schedule, nowMinute),
    [schedule, nowMinute]
  );

  const count = items.length;

  return (
    <GlassCard padding="none" className="h-full min-h-[420px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
            Today
          </p>
          <h2 className="mt-1 text-base font-semibold tracking-[-0.025em] text-black">
            Your schedule
          </h2>
        </div>

        <div
          className="flex h-9 items-center rounded-xl bg-blue-500/[0.08] px-3 text-[10px] font-semibold text-blue-600"
          aria-label={`${count} scheduled ${count === 1 ? "item" : "items"}`}
        >
          {count} {count === 1 ? "item" : "items"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5" aria-busy={loading}>
        {loading ? (
          <Skeleton />
        ) : count === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/[0.08] text-blue-600"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-5 w-5"
              >
                <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
                <path d="M7.5 3v4" />
                <path d="M16.5 3v4" />
                <path d="M3.5 10h17" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-medium text-black">
              Nothing scheduled
            </p>
            <p className="mt-1 max-w-[240px] text-xs leading-5 text-black/35">
              Your day is open. Add tasks or let TimePilot AI plan your day.
            </p>
          </div>
        ) : (
          <ol className="space-y-1">
            {items.map((row, index) => (
              <li
                key={row.key}
                className={`
                  group relative flex gap-4 rounded-[18px] p-3
                  transition-colors duration-200
                  ${row.active ? "bg-emerald-500/[0.06]" : "hover:bg-black/[0.025]"}
                `}
              >
                {/* Time column */}
                <div className="w-[64px] shrink-0 pt-1">
                  <p
                    className={`text-[10px] font-semibold tabular-nums ${
                      row.active ? "text-emerald-600" : "text-black/40"
                    }`}
                  >
                    {row.startLabel}
                  </p>

                  {row.endLabel && (
                    <p className="mt-1 text-[9px] tabular-nums text-black/25">
                      {row.endLabel}
                    </p>
                  )}
                </div>

                {/* Timeline + event */}
                <div className="relative flex min-w-0 flex-1 gap-3">
                  <div className="flex flex-col items-center" aria-hidden="true">
                    <span
                      className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${row.dotClass}`}
                    />
                    {index < items.length - 1 && (
                      <span
                        className={`mt-2 h-full min-h-[34px] w-px opacity-20 ${row.lineClass}`}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pb-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p
                          className={`truncate text-[12px] font-semibold ${
                            row.active ? "text-black" : "text-black/75"
                          }`}
                          title={row.title}
                        >
                          {row.title}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          {row.durationMinutes ? (
                            <span className="text-[9px] tabular-nums text-black/30">
                              {formatDuration(row.durationMinutes)}
                            </span>
                          ) : null}

                          {row.item.type ? (
                            <span className="text-[9px] capitalize text-black/25">
                              {safeText(row.item.type, 40)}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold tracking-[0.08em] ${row.badgeClass}`}
                      >
                        {row.statusLabel}
                      </span>
                    </div>

                    {row.active && canFocus && (
                      <button
                        type="button"
                        onClick={() => handleFocus(row.item)}
                        className="
                          mt-3 inline-flex items-center gap-1.5
                          rounded-lg bg-emerald-500 px-2.5 py-1.5
                          text-[9px] font-semibold text-white shadow-sm
                          transition-colors hover:bg-emerald-600
                          focus-visible:outline-none
                          focus-visible:ring-2 focus-visible:ring-emerald-500/50
                        "
                      >
                        Focus now
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          className="h-3 w-3"
                          aria-hidden="true"
                        >
                          <path d="M3 8h9" />
                          <path d="m9 5 3 3-3 3" />
                        </svg>
                      </button>
                    )}

                    {/* Previously `opacity-0 group-hover:opacity-100` — invisible
                        on touch. Now shows at 60% and lifts on hover/focus. */}
                    {!row.active && row.statusLabel === "UP NEXT" && canFocus && (
                      <button
                        type="button"
                        onClick={() => handleFocus(row.item)}
                        className="
                          mt-3 inline-flex items-center gap-1
                          text-[9px] font-semibold text-blue-600
                          opacity-60 transition-opacity
                          hover:opacity-100
                          focus-visible:opacity-100
                          focus-visible:outline-none
                          focus-visible:ring-2 focus-visible:ring-blue-500/40
                        "
                      >
                        Focus this
                        <span aria-hidden="true">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </GlassCard>
  );
}