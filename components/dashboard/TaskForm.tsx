"use client";

import {
  useState,
  type FormEvent,
} from "react";

export type TaskFormData = {
  title: string;
  description: string;
  priority: string;
  due_date: string;
  estimated_minutes: number;
};

type TaskFormProps = {
  onSubmit: (data: TaskFormData) => Promise<void> | void;
  onCancel: () => void;
  loading?: boolean;
};

export default function TaskForm({
  onSubmit,
  onCancel,
  loading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [priority, setPriority] =
    useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] =
    useState("30");

  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a task title.");
      return;
    }

    const minutes = Number(estimatedMinutes);

    if (
      !Number.isFinite(minutes) ||
      minutes <= 0
    ) {
      setError(
        "Estimated time must be greater than 0 minutes."
      );
      return;
    }

    try {
      await onSubmit({
        title: trimmedTitle,
        description: description.trim(),
        priority,
        due_date: dueDate || "",
        estimated_minutes: Math.round(minutes),
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create task."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
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
          className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 transition hover:bg-black/[0.04] hover:text-black"
          aria-label="Close task form"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4"
          >
            <path d="m5 5 10 10" />
            <path d="M15 5 5 15" />
          </svg>
        </button>
      </div>

      <div>
        <label
          htmlFor="task-title"
          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40"
        >
          Task title
        </label>

        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="What do you need to accomplish?"
          className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/20 focus:border-purple-500/40 focus:ring-4 focus:ring-purple-500/[0.06]"
          disabled={loading}
          autoFocus
        />
      </div>

      <div>
        <label
          htmlFor="task-description"
          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40"
        >
          Description
          <span className="ml-1 normal-case tracking-normal text-black/20">
            optional
          </span>
        </label>

        <textarea
          id="task-description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Add context or notes..."
          rows={3}
          className="w-full resize-none rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-sm leading-6 text-black outline-none transition placeholder:text-black/20 focus:border-purple-500/40 focus:ring-4 focus:ring-purple-500/[0.06]"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="task-priority"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40"
          >
            Priority
          </label>

          <select
            id="task-priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
            className="w-full appearance-none rounded-xl border border-black/[0.08] bg-white px-3 py-3 text-sm text-black outline-none transition focus:border-purple-500/40 focus:ring-4 focus:ring-purple-500/[0.06]"
            disabled={loading}
          >
            <option value="low">
              Low
            </option>
            <option value="medium">
              Medium
            </option>
            <option value="high">
              High
            </option>
          </select>
        </div>

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
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            className="w-full rounded-xl border border-black/[0.08] bg-white px-3 py-3 text-sm text-black outline-none transition focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/[0.06]"
            disabled={loading}
          />
        </div>

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
              max="1440"
              value={estimatedMinutes}
              onChange={(event) =>
                setEstimatedMinutes(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-black/[0.08] bg-white px-3 py-3 pr-14 text-sm text-black outline-none transition focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/[0.06]"
              disabled={loading}
            />

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-black/30">
              min
            </span>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/10 bg-red-500/[0.05] px-4 py-3 text-xs text-red-600">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-3 border-t border-black/[0.06] pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-black/[0.08] bg-white px-5 py-3 text-xs font-semibold text-black/60 transition hover:bg-black/[0.025] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-xs font-semibold text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Creating...
            </>
          ) : (
            <>
              <span className="text-sm">+</span>
              Create task
            </>
          )}
        </button>
      </div>
    </form>
  );
}