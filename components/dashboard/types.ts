/* ================================================================
   PRIMITIVES — tighten what were loose `string`s
================================================================ */

/** Matches every backend and UI code path we support. */
export type TaskStatus = "pending" | "in_progress" | "completed";

/** Whitelisted — anything else collapses to "medium" at the boundary. */
export type TaskPriority = "low" | "medium" | "high";

/** Schedule block kind emitted by the AI planner. */
export type ScheduleEntryType =
  | "task"
  | "break"
  | "buffer"
  | "focus"
  | string; // unknown kinds still pass through, but see normalize helpers

/** Filter unions used by the task list. */
export type StatusFilter = "all" | TaskStatus;
export type PriorityFilter = "all" | TaskPriority;

/** Dashboard sections. */
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
  readonly priority: string; // may be any server value; see `toTaskPriority`
  readonly estimated_minutes: number | null;
  readonly deadline: string | null; // ISO 8601
  readonly status: string; // may be any server value; see `toTaskStatus`
  readonly created_at: string; // ISO 8601
};

/**
 * UI-side task shape used by TaskPanel / Overview.
 * Kept here so components no longer define their own near-duplicate.
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
 *
 * We accept both `start`/`end` (as the API emits) and `start_time`/
 * `end_time` (as older responses used) — `normalizeScheduleItem`
 * collapses them into the canonical `start`/`end` form.
 */
export type ScheduleItem = {
  task_id: number | null;
  title: string;
  start: string; // ISO 8601
  end: string; // ISO 8601
  type: ScheduleEntryType;
};

/** A task the planner could not fit into the day, with the reason. */
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
  /** 0–100; 0 for upcoming, 100 for completed. */
  progress: number;
};

/* ================================================================
   CHAT
================================================================ */

/** Canonical — matches what AIAssistant actually renders. */
export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/* ================================================================
   FORMS
================================================================ */

export type NewTaskForm = {
  title: string;
  description: string;
  priority: TaskPriority | string;
  estimated_minutes: string; // form field is a string until submit
  deadline: string; // YYYY-MM-DD from <input type="date">
};

/* ================================================================
   RUNTIME GUARDS — use at every API boundary
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
    Array.isArray(v.unscheduled)
  );
}

/* ================================================================
   NORMALIZERS — collapse server variance into canonical shapes
================================================================ */

const TASK_STATUSES = new Set<TaskStatus>([
  "pending",
  "in_progress",
  "completed",
]);

/** Any unrecognized server value becomes "pending". */
export function toTaskStatus(input: unknown): TaskStatus {
  return typeof input === "string" && TASK_STATUSES.has(input as TaskStatus)
    ? (input as TaskStatus)
    : "pending";
}

const TASK_PRIORITIES = new Set<TaskPriority>(["low", "medium", "high"]);

/** Any unrecognized server value becomes "medium". */
export function toTaskPriority(input: unknown): TaskPriority {
  return typeof input === "string" &&
    TASK_PRIORITIES.has(input as TaskPriority)
    ? (input as TaskPriority)
    : "medium";
}

/**
 * Convert an API `Task` into the UI-side `DashboardTask`.
 * Handles the `deadline` → `due_date` rename in one place so no
 * component ever needs to know both names.
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
 * Accept either the modern (`start`/`end`) or legacy (`start_time`/
 * `end_time`) field names, and return the canonical shape.
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

  return {
    task_id: typeof v.task_id === "number" ? v.task_id : null,
    title: v.title,
    start,
    end,
    type: typeof v.type === "string" ? v.type : "task",
  };
}