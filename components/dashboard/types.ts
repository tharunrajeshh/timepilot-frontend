/* ================================================================
   PRIMITIVES
================================================================ */

export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type StatusFilter = "all" | TaskStatus;
export type PriorityFilter = "all" | TaskPriority;

/**
 * Canonical section id. Matches what `DashboardSidebar` uses —
 * previously duplicated there as `DashboardSection`.
 */
export type Section = "overview" | "tasks" | "schedule" | "assistant";

/* ================================================================
   CORE MODELS
================================================================ */

export type User = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
};

/**
 * Canonical task shape as returned by the API.
 * Field names match the backend (`deadline`), not the UI (`due_date`).
 * Normalize at the boundary with `normalizeTask`.
 */
export type Task = {
  readonly id: number;
  readonly title: string;
  readonly description: string | null;
  /** May be any server value — always normalize with `toTaskPriority`. */
  readonly priority: string;
  readonly estimated_minutes: number | null;
  readonly deadline: string | null; // ISO 8601
  /** May be any server value — always normalize with `toTaskStatus`. */
  readonly status: string;
  readonly created_at: string; // ISO 8601
};

/**
 * UI-side task shape used by TaskPanel / Overview.
 * The single source of truth — components must not redeclare it.
 */
export type DashboardTask = {
  id: number | string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string | null;
  estimated_minutes?: number | null;
  created_at?: string;
  completed_at?: string | null;
};

/* ================================================================
   SCHEDULE
================================================================ */

/**
 * A single block in the AI-generated day plan.
 * Kept as a closed union — a `| string` escape hatch makes the union
 * meaningless and lets malformed data through silently.
 */
export type ScheduleEntryType = "task" | "break" | "buffer" | "focus";

export type ScheduleItem = {
  task_id: number | null;
  title: string;
  start: string; // ISO 8601
  end: string;   // ISO 8601
  type: ScheduleEntryType;
};

export type UnscheduledItem = {
  task_id: number;
  title: string;
  reason: string;
};

export type DayPlan = {
  summary: string;
  schedule: ScheduleItem[];
  unscheduled: UnscheduledItem[];
};

/* ================================================================
   LIVE SCHEDULE (derived client-side)
================================================================ */

export type LiveScheduleStatus = "completed" | "current" | "upcoming";

export type LiveScheduleItem = ScheduleItem & {
  status: LiveScheduleStatus;
  /** 0–100. */
  progress: number;
};

/* ================================================================
   CHAT
================================================================ */

/**
 * Canonical — must match `AIAssistant`'s exported type exactly.
 * Previously diverged (no `id`/`createdAt`/`status`), which is a
 * type error the moment you pass `types.ChatMessage[]` into the component.
 */
export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: number;
  status?: "sending" | "sent" | "error";
};

/* ================================================================
   FORMS
================================================================ */

export type NewTaskForm = {
  title: string;
  description: string;
  priority: TaskPriority;
  /** String until submit — matches what <input type="number"> emits. */
  estimated_minutes: string;
  /** ISO datetime string from <input type="datetime-local">, or "". */
  deadline: string;
};

/* ================================================================
   RUNTIME GUARDS
================================================================ */

export function isTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "number" &&
    typeof v.title === "string" &&
    (v.description === null || typeof v.description === "string") &&
    (v.deadline === null || typeof v.deadline === "string")
  );
}

export function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}

export function isUser(value: unknown): value is User {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "number" &&
    typeof v.name === "string" &&
    typeof v.email === "string"
  );
}

export function isScheduleItem(value: unknown): value is ScheduleItem {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.title === "string" &&
    typeof (v.start ?? v.start_time) === "string" &&
    typeof (v.end ?? v.end_time) === "string"
  );
}

export function isDayPlan(value: unknown): value is DayPlan {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.summary === "string" &&
    Array.isArray(v.schedule) &&
    v.schedule.every(isScheduleItem) &&
    Array.isArray(v.unscheduled)
  );
}

/* ================================================================
   NORMALIZERS
================================================================ */

const TASK_STATUSES = new Set<TaskStatus>([
  "pending",
  "in_progress",
  "completed",
]);

export function toTaskStatus(input: unknown): TaskStatus {
  return typeof input === "string" && TASK_STATUSES.has(input as TaskStatus)
    ? (input as TaskStatus)
    : "pending";
}

const TASK_PRIORITIES = new Set<TaskPriority>([
  "low",
  "medium",
  "high",
  "urgent",
]);

export function toTaskPriority(input: unknown): TaskPriority {
  return typeof input === "string" &&
    TASK_PRIORITIES.has(input as TaskPriority)
    ? (input as TaskPriority)
    : "medium";
}

/**
 * Convert an API `Task` into the UI-side `DashboardTask`.
 * Handles the `deadline` → `due_date` rename in one place.
 */
export function normalizeTask(raw: Task): DashboardTask {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description ?? "",
    status: toTaskStatus(raw.status),
    priority: toTaskPriority(raw.priority),
    due_date: raw.deadline,
    estimated_minutes: raw.estimated_minutes,
    created_at: raw.created_at,
  };
}

/**
 * Accept either the modern (`start`/`end`) or legacy (`start_time`/`end_time`)
 * field names, and return the canonical shape. Returns `null` if the shape
 * is unrecoverable — the caller decides whether to skip or surface.
 */
export function normalizeScheduleItem(raw: unknown): ScheduleItem | null {
  if (!raw || typeof raw !== "object") return null;
  const v = raw as Record<string, unknown>;

  const start =
    typeof v.start === "string"
      ? v.start
      : typeof v.start_time === "string"
      ? v.start_time
      : null;

  const end =
    typeof v.end === "string"
      ? v.end
      : typeof v.end_time === "string"
      ? v.end_time
      : null;

  if (!start || !end || typeof v.title !== "string") return null;

  // Coerce unknown type strings into the closed union.
  const type = typeof v.type === "string" ? v.type.toLowerCase() : "";
  const safeType: ScheduleEntryType =
    type === "break" || type === "buffer" || type === "focus"
      ? type
      : "task";

  return {
    task_id: typeof v.task_id === "number" ? v.task_id : null,
    title: v.title,
    start,
    end,
    type: safeType,
  };
}