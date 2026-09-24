"use client";

import {
  memo,
  useCallback,
  useDeferredValue,
  useId,
  useMemo,
  useState,
} from "react";

import GlassCard from "./GlassCard";
import TaskForm, { type TaskFormData } from "./TaskForm";
import {
  type DashboardTask,
  type TaskStatus,
  toTaskPriority,
} from "./types";

export type { DashboardTask } from "./types";
/* ================================================================
   TYPES
================================================================ */

type CreateTaskInput = TaskFormData;

type TaskPanelProps = {
  tasks: DashboardTask[];
  onCreateTask: (task: CreateTaskInput) => Promise<void> | void;
  onStatusChange: (
    task: DashboardTask,
    status: TaskStatus
  ) => Promise<void> | void;
  onDeleteTask: (taskId: number | string) => Promise<void> | void;
  loading?: boolean;
};

type FilterValue = "all" | TaskStatus;

/* ================================================================
   CONSTANTS
================================================================ */

const MAX_TITLE = 200;
const MAX_DESC = 2000;

/** Now includes "urgent" — previously fell back to Medium's styling. */
const PRIORITY_CONFIG: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  urgent: {
    label: "Urgent",
    className: "bg-red-500/10 text-red-700",
    dot: "bg-red-500",
  },
  high: {
    label: "High",
    className: "bg-purple-500/10 text-purple-700",
    dot: "bg-purple-500",
  },
  medium: {
    label: "Medium",
    className: "bg-blue-500/10 text-blue-700",
    dot: "bg-blue-500",
  },
  low: {
    label: "Low",
    className: "bg-emerald-500/10 text-emerald-700",
    dot: "bg-emerald-500",
  },
};

const FALLBACK_PRIORITY = PRIORITY_CONFIG.medium;

const FILTER_OPTIONS: ReadonlyArray<{ value: FilterValue; label: string }> = [
  { value: "all", label: "All tasks" },
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

/* ================================================================
   HELPERS
================================================================ */

function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function normalizeStatus(input: unknown): TaskStatus {
  if (input === "completed" || input === "in_progress") return input;
  return "pending";
}

function formatMinutes(minutes?: number | null): string | null {
  if (
    typeof minutes !== "number" ||
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return null;
  }

  const safe = Math.min(Math.round(minutes), 24 * 60);
  if (safe < 60) return `${safe} min`;

  const h = Math.floor(safe / 60);
  const m = safe % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/**
 * Human-friendly relative due date. Handles past, today, tomorrow,
 * this week, and later distinctly. The previous version only detected
 * "overdue" for tasks more than 24h past, and showed a raw date for
 * anything within 24h.
 */
function formatDueDate(date?: string | null): string {
  if (!date) return "No due date";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return safeText(date, 40);
  }

  const now = new Date();
  const target = parsed.getTime();
  const nowMs = now.getTime();
  const diffMs = target - nowMs;

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const startOfDayAfterTomorrow = new Date(startOfTomorrow);
  startOfDayAfterTomorrow.setDate(startOfDayAfterTomorrow.getDate() + 1);

  const startOfNextWeek = new Date(startOfToday);
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);

  const targetDayStart = new Date(parsed);
  targetDayStart.setHours(0, 0, 0, 0);

  // --- Overdue ---
  if (targetDayStart.getTime() < startOfToday.getTime()) {
    const daysPast = Math.floor(
      (startOfToday.getTime() - targetDayStart.getTime()) / 86_400_000
    );
    if (daysPast === 1) return "Overdue — yesterday";
    if (daysPast < 7) return `Overdue — ${daysPast}d ago`;
    return `Overdue — ${parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })}`;
  }

  // --- Today ---
  if (targetDayStart.getTime() === startOfToday.getTime()) {
    const hoursUntil = Math.floor(diffMs / 3_600_000);
    if (diffMs < 0) return `Due today — ${Math.abs(hoursUntil)}h ago`;
    if (hoursUntil < 1) return "Due within the hour";
    if (hoursUntil < 24) return `Due today — in ${hoursUntil}h`;
    return "Due today";
  }

  // --- Tomorrow ---
  if (targetDayStart.getTime() === startOfTomorrow.getTime()) {
    return "Due tomorrow";
  }

  // --- This week ---
  if (target < startOfNextWeek.getTime()) {
    const days = Math.round(
      (targetDayStart.getTime() - startOfToday.getTime()) / 86_400_000
    );
    return `Due in ${days} days`;
  }

  // --- Later ---
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ================================================================
   ROW
================================================================ */

type TaskRowProps = {
  task: DashboardTask;
  confirming: boolean;
  onToggleComplete: (task: DashboardTask) => void;
  onToggleProgress: (task: DashboardTask) => void;
  onRequestDelete: (id: number | string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (id: number | string) => void;
};

const TaskRow = memo(function TaskRow({
  task,
  confirming,
  onToggleComplete,
  onToggleProgress,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: TaskRowProps) {
  const status = normalizeStatus(task.status);
  const completed = status === "completed";
  const inProgress = status === "in_progress";

  const title = safeText(task.title, MAX_TITLE) || "Untitled task";
  const description = safeText(task.description, MAX_DESC);
  const priority = PRIORITY_CONFIG[toTaskPriority(task.priority)] ?? FALLBACK_PRIORITY;
  const minutesLabel = formatMinutes(task.estimated_minutes);
  const dueLabel = formatDueDate(task.due_date);
  const isOverdue = dueLabel.startsWith("Overdue");

  const handleToggle = useCallback(
    () => onToggleComplete(task),
    [onToggleComplete, task]
  );
  const handleProgress = useCallback(
    () => onToggleProgress(task),
    [onToggleProgress, task]
  );
  const handleDelete = useCallback(
    () => onRequestDelete(task.id),
    [onRequestDelete, task.id]
  );
  const handleConfirm = useCallback(
    () => onConfirmDelete(task.id),
    [onConfirmDelete, task.id]
  );

  return (
    <li className="group p-5 transition-colors hover:bg-black/[0.015] md:p-6">
      <div className="flex gap-4">
        {/* Status checkbox */}
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={completed}
          aria-label={
            completed
              ? `Mark "${title}" incomplete`
              : `Mark "${title}" complete`
          }
          className={`
            mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center
            rounded-full border-2 transition-colors
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-purple-500/40
            focus-visible:ring-offset-2
            ${
              completed
                ? "border-emerald-500 bg-emerald-500 text-white"
                : inProgress
                ? "border-blue-500 bg-blue-500/10"
                : "border-black/15 hover:border-purple-500"
            }
          `}
        >
          {completed && (
            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M5 10.5 8.2 13.5 15 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {inProgress && !completed && (
            <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden="true" />
          )}
        </button>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h4
                className={`text-sm font-semibold ${
                  completed ? "text-black/35 line-through" : "text-black"
                }`}
                title={title}
              >
                {title}
              </h4>

              {description && (
                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-black/40">
                  {description}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`
                    inline-flex items-center gap-1.5 rounded-full
                    px-2.5 py-1 text-[11px] font-semibold
                    ${priority.className}
                  `}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${priority.dot}`}
                    aria-hidden="true"
                  />
                  {priority.label}
                </span>

                {minutesLabel && (
                  <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium tabular-nums text-black/45">
                    {minutesLabel}
                  </span>
                )}

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium tabular-nums ${
                    isOverdue
                      ? "bg-red-500/[0.08] text-red-700"
                      : "bg-black/[0.04] text-black/45"
                  }`}
                >
                  {dueLabel}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {confirming ? (
                <>
                  <span className="text-xs font-medium text-black/55">
                    Delete this task?
                  </span>

                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="
                      rounded-lg bg-red-600 px-3 py-2
                      text-xs font-semibold text-white
                      transition-colors hover:bg-red-700
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-red-500/40
                    "
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={onCancelDelete}
                    className="
                      rounded-lg border border-black/[0.08] bg-white
                      px-3 py-2 text-xs font-semibold text-black/60
                      transition-colors hover:bg-black/[0.03]
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-black/20
                    "
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {!completed && (
                    <button
                      type="button"
                      onClick={handleProgress}
                      className="
                        rounded-lg border border-black/[0.08] bg-white
                        px-3 py-2 text-xs font-semibold text-black/60
                        transition-colors hover:bg-black/[0.03]
                        focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-black/20
                      "
                    >
                      {inProgress ? "Pause" : "Start"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="
                      rounded-lg px-3 py-2 text-xs font-semibold text-black/30
                      transition-colors
                      hover:bg-red-500/[0.06] hover:text-red-600
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-red-500/30
                    "
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
});

/* ================================================================
   MAIN
================================================================ */

function TaskPanel({
  tasks,
  onCreateTask,
  onStatusChange,
  onDeleteTask,
  loading = false,
}: TaskPanelProps) {
  const searchId = useId();
  const filterId = useId();

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [confirmingId, setConfirmingId] = useState<number | string | null>(null);

  // Deferring search keeps the input responsive on large lists.
  const deferredSearch = useDeferredValue(search);

  const filteredTasks = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();

    return tasks.filter((task) => {
      const status = normalizeStatus(task.status);
      if (filter !== "all" && status !== filter) return false;
      if (!q) return true;

      const titleMatch = safeText(task.title, MAX_TITLE).toLowerCase().includes(q);
      const descMatch = safeText(task.description, MAX_DESC).toLowerCase().includes(q);
      return titleMatch || descMatch;
    });
  }, [tasks, deferredSearch, filter]);

  const handleCreate = useCallback(
    async (input: CreateTaskInput) => {
      await onCreateTask(input);
      setShowForm(false);
    },
    [onCreateTask]
  );

  const handleToggleComplete = useCallback(
    (task: DashboardTask) => {
      const next: TaskStatus =
        normalizeStatus(task.status) === "completed" ? "pending" : "completed";
      void onStatusChange(task, next);
    },
    [onStatusChange]
  );

  const handleToggleProgress = useCallback(
    (task: DashboardTask) => {
      const next: TaskStatus =
        normalizeStatus(task.status) === "in_progress" ? "pending" : "in_progress";
      void onStatusChange(task, next);
    },
    [onStatusChange]
  );

  const handleRequestDelete = useCallback((id: number | string) => {
    setConfirmingId(id);
  }, []);

  const handleCancelDelete = useCallback(() => setConfirmingId(null), []);

  const handleConfirmDelete = useCallback(
    (id: number | string) => {
      setConfirmingId(null);
      void onDeleteTask(id);
    },
    [onDeleteTask]
  );

  const hasTasks = tasks.length > 0;
  const total = tasks.length;
  const shown = filteredTasks.length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <GlassCard padding="lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                Task management
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl">
              Keep your work moving.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
              Capture tasks, prioritize what matters, and keep your workload under control.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
            aria-controls="task-form-region"
            className="
              inline-flex h-12 items-center justify-center gap-2
              rounded-xl bg-black px-5 text-sm font-semibold text-white
              shadow-[0_10px_30px_rgba(0,0,0,0.14)]
              transition
              hover:-translate-y-0.5
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-black/30
              focus-visible:ring-offset-2
            "
          >
            <span className="text-lg leading-none" aria-hidden="true">
              {showForm ? "×" : "+"}
            </span>
            {showForm ? "Close" : "New task"}
          </button>
        </div>
      </GlassCard>

      {/* Form */}
      <div id="task-form-region">
        {showForm && (
          <GlassCard padding="lg">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
                Create task
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-black">
                Add something to your day.
              </h3>
            </div>

            <TaskForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              loading={loading}
            />
          </GlassCard>
        )}
      </div>

      {/* List */}
      <GlassCard padding="none">
        <div className="border-b border-black/[0.06] p-5 md:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-black">Your tasks</h3>
              <p className="mt-1 text-sm text-black/40" aria-live="polite">
                {shown} of {total} task{total === 1 ? "" : "s"} shown
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <label htmlFor={searchId} className="sr-only">Search tasks</label>

                <span
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="11" cy="11" r="6" />
                    <path d="m16 16 4 4" />
                  </svg>
                </span>

                <input
                  id={searchId}
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  autoComplete="off"
                  className="
                    h-11 w-full rounded-xl
                    border border-black/[0.08] bg-black/[0.025]
                    pl-9 pr-3 text-sm text-black outline-none
                    placeholder:text-black/30
                    transition
                    focus:border-purple-500/40 focus:bg-white
                    focus:ring-4 focus:ring-purple-500/[0.08]
                    sm:w-64
                  "
                />
              </div>

              <div>
                <label htmlFor={filterId} className="sr-only">Filter tasks</label>

                <select
                  id={filterId}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as FilterValue)}
                  className="
                    h-11 rounded-xl border border-black/[0.08] bg-white
                    px-3 text-sm font-medium text-black/70
                    outline-none transition
                    focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/[0.08]
                  "
                >
                  {FILTER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {shown === 0 ? (
          <EmptyState
            hasTasks={hasTasks}
            filter={filter}
            search={search}
            onCreate={() => setShowForm(true)}
            onResetFilters={() => {
              setSearch("");
              setFilter("all");
            }}
          />
        ) : (
          <ul className="divide-y divide-black/[0.06]" aria-label="Task list">
            {filteredTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                confirming={confirmingId === task.id}
                onToggleComplete={handleToggleComplete}
                onToggleProgress={handleToggleProgress}
                onRequestDelete={handleRequestDelete}
                onCancelDelete={handleCancelDelete}
                onConfirmDelete={handleConfirmDelete}
              />
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}

export default memo(TaskPanel);

/* ================================================================
   EMPTY STATE
================================================================ */

function EmptyState({
  hasTasks,
  filter,
  search,
  onCreate,
  onResetFilters,
}: {
  hasTasks: boolean;
  filter: FilterValue;
  search: string;
  onCreate: () => void;
  onResetFilters: () => void;
}) {
  const filtered = hasTasks && (search.trim() || filter !== "all");

  return (
    <div className="px-6 py-16 text-center">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black/[0.04] text-black/40"
        aria-hidden="true"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 7h14M5 12h14M5 17h9" />
        </svg>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-black">
        {filtered ? "No matching tasks" : "No tasks yet"}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/40">
        {filtered
          ? "Try a different search term or reset the filter."
          : "Create your first task and start planning your day."}
      </p>

      {!filtered ? (
        <button
          type="button"
          onClick={onCreate}
          className="
            mt-5 rounded-xl bg-black px-5 py-3
            text-sm font-semibold text-white
            transition hover:-translate-y-0.5
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-black/30
            focus-visible:ring-offset-2
          "
        >
          Create your first task
        </button>
      ) : (
        <button
          type="button"
          onClick={onResetFilters}
          className="
            mt-5 rounded-xl border border-black/[0.08] bg-white
            px-5 py-3 text-sm font-semibold text-black/70
            transition-colors hover:bg-black/[0.03]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-black/20
          "
        >
          Clear filters
        </button>
      )}
    </div>
  );
}