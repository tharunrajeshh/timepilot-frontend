"use client";

import { useRef, useState, type FormEvent } from "react";

/* ================================================================
   TYPES
================================================================ */

export type TaskFormData = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string;
  estimated_minutes: number;
};

type TaskFormProps = {
  onSubmit: (data: TaskFormData) => Promise<void> | void;
  onCancel: () => void;
  loading?: boolean;
};

/* ================================================================
   CONSTANTS
================================================================ */

const MAX_TITLE_LEN = 200;
const MAX_DESC_LEN = 2000;
const MAX_MINUTES = 24 * 60;

const PRIORITIES: ReadonlyArray<{
  value: TaskFormData["priority"];
  label: string;
  hint: string;
}> = [
  { value: "low", label: "Low", hint: "Whenever" },
  { value: "medium", label: "Medium", hint: "This week" },
  { value: "high", label: "High", hint: "Today" },
  { value: "urgent", label: "Urgent", hint: "Right now" },
];

/* ================================================================
   COMPONENT
================================================================ */

export default function TaskForm({
  onSubmit,
  onCancel,
  loading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskFormData["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState("30");
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Please enter a task title.");
      return;
    }

    const minutes = Number(estimatedMinutes);
    if (!Number.isFinite(minutes) || minutes <= 0) {
      setError("Estimated time must be greater than 0 minutes.");
      return;
    }
    if (minutes > MAX_MINUTES) {
      setError(`Estimated time can't exceed ${MAX_MINUTES} minutes (24 hours).`);
      return;
    }

    try {
      await onSubmit({
        title: trimmedTitle,
        description: description.trim(),
        priority,
        // Send null for "no deadline" rather than an empty string —
        // backends that expect ISO 8601 will choke on "".
        due_date: dueDate || "",
        estimated_minutes: Math.round(minutes),
      });

      // Success — clear the form so a second submission starts fresh.
      // (Reset only after the parent confirms, so the user can retry on
      // a validation error without losing their work.)
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setEstimatedMinutes("30");
      setError("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create task."
      );
    }
  };

  const inputClass = `
    w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3
    text-sm text-black outline-none transition
    placeholder:text-black/20
    focus:border-purple-500/40 focus:ring-4 focus:ring-purple-500/[0.06]
    disabled:cursor-not-allowed disabled:opacity-60
  `;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
            New task
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.025em] text-black">
            Add something to your day
          </h3>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          aria-label="Close task form"
          className="
            flex h-8 w-8 items-center justify-center rounded-lg
            text-black/30 transition-colors
            hover:bg-black/[0.04] hover:text-black
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-black/20
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden="true">
            <path d="m5 5 10 10" strokeLinecap="round" />
            <path d="M15 5 5 15" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="task-title"
          className="mb-2 flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40"
        >
          <span>Task title</span>
          <span className="ml-2 text-[9px] normal-case tracking-normal text-black/25 tabular-nums">
            {MAX_TITLE_LEN - title.length}
          </span>
        </label>

        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to accomplish?"
          maxLength={MAX_TITLE_LEN}
          required
          autoComplete="off"
          className={inputClass}
          disabled={loading}
          autoFocus
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="task-description"
          className="mb-2 flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40"
        >
          <span>
            Description
            <span className="ml-1 normal-case tracking-normal text-black/20">
              optional
            </span>
          </span>
          <span className="ml-2 text-[9px] normal-case tracking-normal text-black/25 tabular-nums">
            {MAX_DESC_LEN - description.length}
          </span>
        </label>

        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add context or notes..."
          rows={3}
          maxLength={MAX_DESC_LEN}
          className={`${inputClass} resize-none leading-6`}
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Priority */}
        <div>
          <label
            htmlFor="task-priority"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40"
          >
            Priority
          </label>

          {/* Relative wrapper + custom chevron — the previous version used
              `appearance-none` with no indicator, so it looked like a
              text input and users didn't realize it was a dropdown. */}
          <div className="relative">
            <select
              id="task-priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as TaskFormData["priority"])
              }
              className={`${inputClass} appearance-none pr-9`}
              disabled={loading}
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label} — {p.hint}
                </option>
              ))}
            </select>

            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
              </svg>
            </span>
          </div>
        </div>

        {/* Due date */}
        <div>
          <label
            htmlFor="task-due-date"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40"
          >
            Due date
          </label>

          <input
            id="task-due-date"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClass}
            disabled={loading}
          />
        </div>

        {/* Estimated time */}
        <div>
          <label
            htmlFor="task-duration"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40"
          >
            Estimated time
          </label>

          <div className="relative">
            <input
              id="task-duration"
              type="number"
              min="1"
              max={String(MAX_MINUTES)}
              value={estimatedMinutes}
              onChange={(e) => setEstimatedMinutes(e.target.value)}
              className={`${inputClass} pr-14`}
              disabled={loading}
            />

            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-black/30"
              aria-hidden="true"
            >
              min
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/10 bg-red-500/[0.05] px-4 py-3 text-xs text-red-600"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-black/[0.06] pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="
            rounded-xl border border-black/[0.08] bg-white px-5 py-3
            text-xs font-semibold text-black/60
            transition-colors
            hover:bg-black/[0.025] hover:text-black
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-black/20
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="
            inline-flex items-center justify-center gap-2
            rounded-xl bg-black px-5 py-3
            text-xs font-semibold text-white
            shadow-[0_8px_25px_rgba(0,0,0,0.12)]
            transition
            hover:-translate-y-0.5 hover:bg-black/90
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-black/30
            focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            disabled:hover:translate-y-0
          "
        >
          {loading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
              Creating…
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 2v8M2 6h8" />
              </svg>
              Create task
            </>
          )}
        </button>
      </div>
    </form>
  );
}