"use client";

import { memo, useCallback, useMemo, type ReactNode } from "react";
import GlassCard from "./GlassCard";
import StatsCards from "./StatsCards";
import SchedulePanel, { type ScheduleItem } from "./SchedulePanel";
import FocusTimer from "./FocusTimer";
import type { DashboardTask } from "./TaskPanel";

/* ================================================================
   TYPES
================================================================ */

type OverviewProps = {
  tasks: DashboardTask[];
  schedule: ScheduleItem[];
  completed: number;
  pending: number;
  inProgress: number;
  totalHours: number;
  progress: number;
  dueSoon: number;
  currentTime?: Date;
  firstName?: string;
  activeTask?: DashboardTask | null;
  onStartTask?: (task: DashboardTask) => void;
  onScheduleFocus?: (item: ScheduleItem) => void;
  onCompleteFocus?: () => void;
};

/* ================================================================
   CONSTANTS
================================================================ */

const MAX_NAME_LEN = 60;
const MAX_TITLE_LEN = 200;
const MAX_VISIBLE_OPEN = 4;
const MAX_VISIBLE_DONE = 8;

/* ================================================================
   HELPERS
================================================================ */

function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function clampPercent(input: unknown): number {
  const n = Number(input);
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function clampCount(input: unknown): number {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.floor(n);
}

function greetingFor(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(date: Date): string {
  try {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function formatTime(date: Date): string {
  try {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

/* ================================================================
   SECTION HEADING
================================================================ */

const SectionHeading = memo(function SectionHeading({
  dotColor,
  eyebrow,
  title,
  action,
}: {
  dotColor: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: dotColor }}
            aria-hidden="true"
          />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
            {eyebrow}
          </span>
        </div>

        <h3 className="mt-2 truncate text-xl font-semibold text-black">
          {title}
        </h3>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
});

/* ================================================================
   HERO CLOCK
================================================================ */

const HeroClock = memo(function HeroClock({ date }: { date: Date }) {
  const time = formatTime(date);

  return (
    <div className="hidden lg:flex">
      <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border border-black/[0.07] bg-black/[0.025]">
        <span className="text-xs font-medium text-black/35">
          Current time
        </span>

        <span
          className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black tabular-nums"
          aria-hidden="true"
        >
          {time}
        </span>

        <span className="sr-only">Local time is {time}</span>

        <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
          Live
        </span>
      </div>
    </div>
  );
});

/* ================================================================
   OPEN TASK ROW
================================================================ */

const OpenTaskRow = memo(function OpenTaskRow({
  task,
  onStart,
}: {
  task: DashboardTask;
  onStart?: (task: DashboardTask) => void;
}) {
  const title =
    safeText(task.title, MAX_TITLE_LEN) || "Untitled task";
  const isActive = task.status === "in_progress";
  const minutes =
    typeof task.estimated_minutes === "number" &&
    task.estimated_minutes > 0
      ? Math.round(task.estimated_minutes)
      : null;

  const handleStart = useCallback(
    () => onStart?.(task),
    [onStart, task]
  );

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/[0.05] bg-black/[0.02] p-3.5 transition hover:bg-black/[0.035]">
      <button
        type="button"
        onClick={handleStart}
        disabled={!onStart}
        aria-label={`Start focus session for ${title}`}
        className="
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-xl bg-white text-black/60 shadow-sm
          transition
          hover:bg-purple-500/10 hover:text-purple-600
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-purple-500/40
          disabled:cursor-not-allowed disabled:opacity-40
        "
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M3 1.5v9l7-4.5-7-4.5Z" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <p
          className="truncate text-sm font-semibold text-black"
          title={title}
        >
          {title}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              isActive ? "bg-blue-500" : "bg-black/15"
            }`}
            aria-hidden="true"
          />

          <span className="text-[11px] text-black/35">
            {isActive ? "In progress" : "Pending"}
          </span>

          {minutes !== null && (
            <>
              <span className="text-black/15" aria-hidden="true">
                ·
              </span>
              <span className="text-[11px] text-black/35">
                {minutes} min
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

/* ================================================================
   COMPLETED CHIP
================================================================ */

const CompletedChip = memo(function CompletedChip({
  title,
}: {
  title: string;
}) {
  const safe = safeText(title, MAX_TITLE_LEN) || "Untitled task";

  return (
    <div className="flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/[0.05] px-3 py-2">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
        aria-hidden="true"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 5.2 4.2 7.4 8 3.2" />
        </svg>
      </span>

      <span
        className="max-w-[180px] truncate text-xs font-medium text-black/55"
        title={safe}
      >
        {safe}
      </span>
    </div>
  );
});

/* ================================================================
   MAIN
================================================================ */

export default function Overview({
  tasks,
  schedule,
  completed,
  pending,
  inProgress,
  totalHours,
  progress,
  dueSoon,
  currentTime = new Date(),
  firstName = "there",
  activeTask,
  onStartTask,
  onScheduleFocus,
  onCompleteFocus,
}: OverviewProps) {
  /* ---------- derived, memoized ---------- */

  const safeFirstName = useMemo(() => {
    const clean = safeText(firstName, MAX_NAME_LEN).trim();
    return clean || "there";
  }, [firstName]);

  // Only changes at 12:00 and 17:00 — not every second.
  const greeting = useMemo(
    () => greetingFor(currentTime),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Math.floor(currentTime.getHours() / 6)]
  );

  // Only changes at midnight — not every second.
  const dateLabel = useMemo(
    () => formatDate(currentTime),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTime.toDateString()]
  );

  const safeProgress = useMemo(() => clampPercent(progress), [progress]);
  const safePending = useMemo(() => clampCount(pending), [pending]);
  const safeInProgress = useMemo(() => clampCount(inProgress), [inProgress]);
  const safeDueSoon = useMemo(() => clampCount(dueSoon), [dueSoon]);
  const safeCompleted = useMemo(() => clampCount(completed), [completed]);
  const safeTotalHours = useMemo(() => {
    const n = Number(totalHours);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [totalHours]);

  const upcomingTasks = useMemo(
    () =>
      tasks
        .filter((t) => t.status !== "completed")
        .slice(0, MAX_VISIBLE_OPEN),
    [tasks]
  );

  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === "completed"),
    [tasks]
  );

  const visibleCompleted = useMemo(
    () => completedTasks.slice(0, MAX_VISIBLE_DONE),
    [completedTasks]
  );

  const focusMinutes = useMemo(() => {
    const est = Number(activeTask?.estimated_minutes);
    if (!Number.isFinite(est) || est <= 0) return 25;
    return Math.min(Math.max(Math.round(est), 1), 120);
  }, [activeTask?.estimated_minutes]);

  const focusTitle = useMemo(() => {
    const raw = activeTask?.title;
    return safeText(raw, MAX_TITLE_LEN).trim() || "Deep work session";
  }, [activeTask?.title]);

  const openCount = safePending + safeInProgress;

  /* ---------- render ---------- */

  return (
    <div className="space-y-6">
      {/* ====================================================
          HERO
      ==================================================== */}
      <section
        aria-labelledby="overview-hero-heading"
        className="relative overflow-hidden rounded-[32px] border border-black/[0.07] bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10"
      >
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-500/[0.08] blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.08)]"
                aria-hidden="true"
              />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/35">
                Your workspace
              </span>
            </div>

            <h1
              id="overview-hero-heading"
              className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-black sm:text-4xl lg:text-5xl"
            >
              {greeting},{" "}
              <span className="text-black/45">{safeFirstName}.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-black/45 sm:text-base">
              Stay focused, keep your priorities clear, and let TimePilot
              handle the structure around your work.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {dateLabel && (
                <div className="rounded-full bg-black/[0.04] px-4 py-2 text-xs font-semibold text-black/50">
                  {dateLabel}
                </div>
              )}

              <div
                className="rounded-full bg-purple-500/[0.08] px-4 py-2 text-xs font-semibold text-purple-700 tabular-nums"
                role="status"
                aria-live="polite"
              >
                {safeProgress}% complete
              </div>
            </div>
          </div>

          <HeroClock date={currentTime} />
        </div>
      </section>

      {/* ====================================================
          STATS
      ==================================================== */}
      <StatsCards
        completed={safeCompleted}
        pending={safePending}
        inProgress={safeInProgress}
        totalHours={safeTotalHours}
        progress={safeProgress}
        dueSoon={safeDueSoon}
      />

      {/* ====================================================
          SCHEDULE + FOCUS
      ==================================================== */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <SchedulePanel
          schedule={schedule}
          currentTime={currentTime}
          onStartTask={onScheduleFocus}
        />

        <FocusTimer
          initialMinutes={focusMinutes}
          taskTitle={focusTitle}
          onComplete={onCompleteFocus}
        />
      </div>

      {/* ====================================================
          OPEN TASKS + PROGRESS
      ==================================================== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ---------- Open tasks ---------- */}
        <GlassCard padding="lg">
          <SectionHeading
            dotColor="#8B5CF6"
            eyebrow="Up next"
            title="Open tasks"
            action={
              <span
                className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-700 tabular-nums"
                aria-label={`${openCount} open task${openCount === 1 ? "" : "s"}`}
              >
                {openCount}
              </span>
            }
          />

          <div className="mt-6 space-y-2">
            {upcomingTasks.length === 0 ? (
              <div className="rounded-2xl bg-emerald-500/[0.06] p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 7.2 5.6 9.8 11 4.4" />
                    </svg>
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-black">
                      Everything is done.
                    </p>
                    <p className="mt-0.5 text-xs text-black/40">
                      Enjoy the extra breathing room.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              upcomingTasks.map((task) => (
                <OpenTaskRow
                  key={task.id}
                  task={task}
                  onStart={onStartTask}
                />
              ))
            )}
          </div>
        </GlassCard>

        {/* ---------- Progress ---------- */}
        <GlassCard padding="lg">
          <SectionHeading
            dotColor="#10B981"
            eyebrow="Progress"
            title="Today's momentum"
            action={
              <div className="text-right">
                <span className="text-2xl font-semibold tracking-tight text-black tabular-nums">
                  {safeProgress}%
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30">
                  complete
                </p>
              </div>
            }
          />

          <div className="mt-7">
            <div
              className="h-3 overflow-hidden rounded-full bg-black/[0.05]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={safeProgress}
              aria-label="Task completion"
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${safeProgress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-xs text-black/35">
              <span>{safeCompleted} completed</span>
              <span>{tasks.length} total</span>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-black/[0.025] p-4">
              <p className="text-2xl font-semibold text-black tabular-nums">
                {safeCompleted}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-black/30">
                Done
              </p>
            </div>

            <div className="rounded-2xl bg-black/[0.025] p-4">
              <p className="text-2xl font-semibold text-black tabular-nums">
                {safeInProgress}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-black/30">
                Active
              </p>
            </div>

            <div className="rounded-2xl bg-black/[0.025] p-4">
              <p className="text-2xl font-semibold text-black tabular-nums">
                {safeDueSoon}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-black/30">
                Due soon
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* ====================================================
          COMPLETED
      ==================================================== */}
      {completedTasks.length > 0 && (
        <GlassCard padding="lg">
          <SectionHeading
            dotColor="#10B981"
            eyebrow="Completed"
            title="Nice work today."
            action={
              <span className="text-sm font-medium text-black/35">
                {completedTasks.length} task
                {completedTasks.length === 1 ? "" : "s"} finished
              </span>
            }
          />

          <ul
            className="mt-5 flex flex-wrap gap-2"
            aria-label="Recently completed tasks"
          >
            {visibleCompleted.map((task) => (
              <li key={task.id}>
                <CompletedChip title={task.title} />
              </li>
            ))}
          </ul>
        </GlassCard>
      )}
    </div>
  );
}