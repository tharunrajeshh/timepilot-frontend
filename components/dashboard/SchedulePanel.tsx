"use client";

import GlassCard from "./GlassCard";

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
   * Used by the main dashboard page.
   */
  onFocus?: (item: ScheduleItem) => void;

  /**
   * Used by Overview.
   */
  onStartTask?: (item: ScheduleItem) => void;

  loading?: boolean;
};

function parseDateTime(value?: string): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function formatTime(value?: string) {
  const date = parseDateTime(value);

  if (!date) {
    return value || "--";
  }

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(minutes?: number) {
  if (!minutes || minutes <= 0) {
    return "";
  }

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  if (remaining === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remaining}m`;
}

function getStart(item: ScheduleItem): Date | null {
  return parseDateTime(item.start_time || item.start);
}

function getEnd(item: ScheduleItem): Date | null {
  const explicitEnd = parseDateTime(
    item.end_time || item.end
  );

  if (explicitEnd) {
    return explicitEnd;
  }

  const start = getStart(item);

  if (start && item.duration_minutes) {
    return new Date(
      start.getTime() +
        item.duration_minutes * 60 * 1000
    );
  }

  return null;
}

function isActive(
  item: ScheduleItem,
  currentTime: Date
) {
  const start = getStart(item);
  const end = getEnd(item);

  if (!start || !end) {
    return false;
  }

  return (
    currentTime >= start &&
    currentTime <= end
  );
}

function getStatusLabel(
  item: ScheduleItem,
  currentTime: Date
) {
  if (isActive(item, currentTime)) {
    return "NOW";
  }

  const start = getStart(item);

  if (start && start > currentTime) {
    return "UP NEXT";
  }

  return "DONE";
}

function getAccent(
  item: ScheduleItem,
  currentTime: Date
) {
  if (isActive(item, currentTime)) {
    return {
      dot: "bg-emerald-500",
      line: "bg-emerald-500",
      badge:
        "bg-emerald-500/10 text-emerald-600",
    };
  }

  const type = (
    item.type || ""
  ).toLowerCase();

  if (
    type.includes("focus") ||
    type.includes("deep")
  ) {
    return {
      dot: "bg-purple-500",
      line: "bg-purple-500",
      badge:
        "bg-purple-500/10 text-purple-600",
    };
  }

  if (
    type.includes("meeting") ||
    type.includes("call")
  ) {
    return {
      dot: "bg-blue-500",
      line: "bg-blue-500",
      badge:
        "bg-blue-500/10 text-blue-600",
    };
  }

  return {
    dot: "bg-black/25",
    line: "bg-black/15",
    badge:
      "bg-black/[0.04] text-black/45",
  };
}

export default function SchedulePanel({
  schedule,
  currentTime,
  onFocus,
  onStartTask,
  loading = false,
}: SchedulePanelProps) {
  const sortedSchedule = [...schedule].sort(
    (a, b) => {
      const aStart =
        getStart(a)?.getTime() ??
        Number.MAX_SAFE_INTEGER;

      const bStart =
        getStart(b)?.getTime() ??
        Number.MAX_SAFE_INTEGER;

      return aStart - bStart;
    }
  );

  const handleFocus = (item: ScheduleItem) => {
    if (onFocus) {
      onFocus(item);
      return;
    }

    if (onStartTask) {
      onStartTask(item);
    }
  };

  const canFocus =
    Boolean(onFocus) ||
    Boolean(onStartTask);

  return (
    <GlassCard
      padding="none"
      className="h-full min-h-[420px]"
    >
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

        <div className="flex h-9 items-center rounded-xl bg-blue-500/[0.08] px-3 text-[10px] font-semibold text-blue-600">
          {sortedSchedule.length}{" "}
          {sortedSchedule.length === 1
            ? "item"
            : "items"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="flex animate-pulse gap-4"
                >
                  <div className="h-4 w-14 rounded bg-black/[0.05]" />

                  <div className="flex-1">
                    <div className="h-4 w-2/3 rounded bg-black/[0.05]" />

                    <div className="mt-2 h-3 w-1/3 rounded bg-black/[0.04]" />
                  </div>
                </div>
              )
            )}
          </div>
        ) : sortedSchedule.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/[0.08] text-blue-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-5 w-5"
              >
                <rect
                  x="3.5"
                  y="5"
                  width="17"
                  height="16"
                  rx="2.5"
                />
                <path d="M7.5 3v4" />
                <path d="M16.5 3v4" />
                <path d="M3.5 10h17" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-medium text-black">
              Nothing scheduled
            </p>

            <p className="mt-1 max-w-[240px] text-xs leading-5 text-black/35">
              Your day is open. Add tasks or let
              TimePilot AI plan your day.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {sortedSchedule.map(
              (item, index) => {
                const active = isActive(
                  item,
                  currentTime
                );

                const status =
                  getStatusLabel(
                    item,
                    currentTime
                  );

                const accent =
                  getAccent(
                    item,
                    currentTime
                  );

                const start =
                  item.start_time ||
                  item.start;

                const end =
                  item.end_time ||
                  item.end;

                const duration =
                  item.duration_minutes ||
                  (() => {
                    const startDate =
                      getStart(item);

                    const endDate =
                      getEnd(item);

                    if (
                      !startDate ||
                      !endDate
                    ) {
                      return undefined;
                    }

                    return Math.max(
                      0,
                      Math.round(
                        (endDate.getTime() -
                          startDate.getTime()) /
                          60000
                      )
                    );
                  })();

                return (
                  <div
                    key={
                      item.id ??
                      `${item.title}-${index}`
                    }
                    className={`
                      group relative flex gap-4 rounded-[18px] p-3
                      transition-all duration-200
                      ${
                        active
                          ? "bg-emerald-500/[0.06]"
                          : "hover:bg-black/[0.025]"
                      }
                    `}
                  >
                    {/* Time */}
                    <div className="w-[64px] shrink-0 pt-1">
                      <p
                        className={`text-[10px] font-semibold ${
                          active
                            ? "text-emerald-600"
                            : "text-black/40"
                        }`}
                      >
                        {formatTime(start)}
                      </p>

                      {end ? (
                        <p className="mt-1 text-[9px] text-black/25">
                          {formatTime(end)}
                        </p>
                      ) : null}
                    </div>

                    {/* Timeline */}
                    <div className="relative flex min-w-0 flex-1 gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`
                            mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full
                            ${accent.dot}
                            ${
                              active
                                ? "shadow-[0_0_0_5px_rgba(16,185,129,0.08)]"
                                : ""
                            }
                          `}
                        />

                        {index <
                        sortedSchedule.length -
                          1 ? (
                          <span
                            className={`mt-2 h-full min-h-[34px] w-px ${accent.line} opacity-20`}
                          />
                        ) : null}
                      </div>

                      {/* Event */}
                      <div className="min-w-0 flex-1 pb-3">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p
                              className={`truncate text-[12px] font-semibold ${
                                active
                                  ? "text-black"
                                  : "text-black/75"
                              }`}
                            >
                              {item.title}
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                              {duration ? (
                                <span className="text-[9px] text-black/30">
                                  {formatDuration(
                                    duration
                                  )}
                                </span>
                              ) : null}

                              {item.type ? (
                                <span className="text-[9px] capitalize text-black/25">
                                  {item.type}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold tracking-[0.08em] ${accent.badge}`}
                          >
                            {status}
                          </span>
                        </div>

                        {/* Focus button */}
                        {active &&
                        canFocus ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleFocus(item)
                            }
                            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-[9px] font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                          >
                            <span>
                              Focus now
                            </span>

                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              className="h-3 w-3"
                            >
                              <path d="M3 8h9" />
                              <path d="m9 5 3 3-3 3" />
                            </svg>
                          </button>
                        ) : null}

                        {!active &&
                        status === "UP NEXT" &&
                        canFocus ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleFocus(item)
                            }
                            className="mt-3 text-[9px] font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100"
                          >
                            Focus this →
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}