"use client";

import { useEffect, useMemo, useState } from "react";

type EventType = "focus" | "meeting" | "break";

interface ScheduleEntry {
  time: string;
  title: string;
  duration: string;
  type: EventType;
}

interface Cell {
  day: number;
  currentMonth: boolean;
}

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const SCHEDULE_BY_OFFSET: Record<number, ScheduleEntry[]> = {
  "-2": [
    { time: "10:00", title: "Data review", duration: "1h 30m", type: "focus" },
    { time: "14:00", title: "Team sync", duration: "30m", type: "meeting" },
  ],
  "-1": [
    {
      time: "09:00",
      title: "Deep work — Product analysis",
      duration: "2h 00m",
      type: "focus",
    },
    { time: "11:30", title: "Team stand-up", duration: "30m", type: "meeting" },
  ],
  "0": [
    {
      time: "09:00",
      title: "Deep work — Product analysis",
      duration: "2h 00m",
      type: "focus",
    },
    { time: "11:30", title: "Team stand-up", duration: "30m", type: "meeting" },
    { time: "12:15", title: "Lunch & reset", duration: "45m", type: "break" },
    {
      time: "14:00",
      title: "Build TimePilot dashboard",
      duration: "2h 00m",
      type: "focus",
    },
  ],
  "1": [
    { time: "09:30", title: "Weekly planning", duration: "1h 00m", type: "focus" },
    { time: "13:00", title: "Project review", duration: "45m", type: "meeting" },
  ],
  "2": [
    {
      time: "10:00",
      title: "Analytics deep dive",
      duration: "2h 00m",
      type: "focus",
    },
  ],
};

function getMonthMatrix(year: number, month: number): Cell[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const leadingBlanks = (firstWeekday + 6) % 7;

  const cells: Cell[] = [];

  for (let i = leadingBlanks; i > 0; i--) {
    cells.push({ day: daysInPrevMonth - i + 1, currentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true });
  }
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, currentMonth: false });
  }

  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export default function CalendarSection() {
  const [today, setToday] = useState<Date | null>(null);
  const [viewYear, setViewYear] = useState<number | null>(null);
  const [viewMonth, setViewMonth] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelected(now.getDate());
  }, []);

  const isRealCurrentMonth =
    today !== null &&
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth();

  const weeks = useMemo(() => {
    if (viewYear === null || viewMonth === null) return [];
    return getMonthMatrix(viewYear, viewMonth);
  }, [viewYear, viewMonth]);

  const monthLabel =
    viewYear !== null && viewMonth !== null
      ? new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "";

  const selectedSchedule =
    isRealCurrentMonth && selected !== null && today
      ? SCHEDULE_BY_OFFSET[selected - today.getDate()] ?? []
      : [];

  const selectedDateLabel =
    viewYear !== null && viewMonth !== null && selected !== null
      ? new Date(viewYear, viewMonth, selected).toLocaleDateString("en-US", {
          weekday: "long",
        })
      : "";

  const selectedDateSub =
    viewYear !== null && viewMonth !== null && selected !== null
      ? new Date(viewYear, viewMonth, selected).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";

  function goToMonth(offset: number) {
    if (viewYear === null || viewMonth === null) return;
    const next = new Date(viewYear, viewMonth + offset, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
    if (
      today &&
      next.getFullYear() === today.getFullYear() &&
      next.getMonth() === today.getMonth()
    ) {
      setSelected(today.getDate());
    } else {
      setSelected(1);
    }
  }

  return (
    <section id="calendar" className="relative overflow-hidden bg-[#08090B] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-[#F5A623]/[0.035] blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#F5A623]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F5A623]">
                Plan with clarity
              </span>
            </div>

            <h2 className="max-w-xl text-4xl font-bold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
              Your entire week,
              <br />
              <span className="text-white/50">at a glance.</span>
            </h2>
          </div>

          <div className="lg:pb-1 lg:pl-16">
            <p className="max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              See your commitments, focus sessions and recovery time together. Pick a day and know exactly what is waiting for you.
            </p>
          </div>
        </div>

        {/* Calendar layout */}
        <div className="mt-16 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Calendar */}
          <div className="rounded-[28px] border border-white/[0.12] bg-[#101114] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-7 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5A623]">
                  Calendar
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-white">
                  {monthLabel || "\u00A0"}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <CalendarButton direction="left" onClick={() => goToMonth(-1)} />
                <CalendarButton direction="right" onClick={() => goToMonth(1)} />
              </div>
            </div>

            {/* Weekdays */}
            <div className="mb-3 grid grid-cols-7">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-[10px] font-bold tracking-[0.2em] text-white/55"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {weeks.flatMap((week, weekIndex) =>
                week.map((cell, dayIndex) => {
                  const { day, currentMonth } = cell;

                  const isToday =
                    currentMonth &&
                    isRealCurrentMonth &&
                    today !== null &&
                    day === today.getDate();

                  const isSelected =
                    currentMonth && selected !== null && day === selected;

                  const offset =
                    isRealCurrentMonth && today ? day - today.getDate() : null;
                  const dayEvents =
                    currentMonth && offset !== null
                      ? SCHEDULE_BY_OFFSET[offset] ?? []
                      : [];

                  return (
                    <button
                      key={`${weekIndex}-${dayIndex}`}
                      type="button"
                      disabled={!currentMonth}
                      onClick={() => currentMonth && setSelected(day)}
                      style={
                        isSelected
                          ? {
                              backgroundColor: "#F5A623",
                              boxShadow:
                                "0 0 0 1px rgba(245,166,35,0.5), 0 10px 35px rgba(245,166,35,0.45)",
                            }
                          : undefined
                      }
                      className={`relative flex aspect-square min-h-[48px] flex-col items-center justify-center rounded-xl border transition-all duration-200 sm:min-h-[65px] ${
                        isSelected
                          ? "border-transparent text-black"
                          : currentMonth
                          ? "border-white/[0.12] bg-white/[0.025] text-white/75 hover:border-white/[0.15] hover:bg-white/[0.05]"
                          : "border-transparent text-white/15"
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold ${
                          isSelected ? "text-black" : isToday ? "text-[#F5A623]" : ""
                        }`}
                      >
                        {day}
                      </span>

                      {/* Today indicator */}
                      {isToday && !isSelected && (
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#F5A623]" />
                      )}

                      {/* Event indicators */}
                      {dayEvents.length > 0 && !isSelected && (
                        <div className="absolute bottom-2 flex gap-1">
                          {dayEvents.slice(0, 3).map((event, index) => (
                            <span
                              key={index}
                              className={`h-1.5 w-1.5 rounded-full ${
                                event.type === "focus"
                                  ? "bg-[#F5A623]"
                                  : event.type === "meeting"
                                  ? "bg-[#EF4444]"
                                  : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                }),
              )}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-6">
              <Legend color="bg-[#F5A623]" label="Focus" />
              <Legend color="bg-[#EF4444]" label="Meeting" />
              <Legend color="bg-white/35" label="Break" />
            </div>
          </div>

          {/* Schedule panel */}
          <div className="rounded-[28px] border border-white/[0.12] bg-[#101114] p-5 sm:p-7 lg:p-8">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                Selected day
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold tracking-[-0.04em] text-white">
                    {selectedDateLabel || "\u00A0"}
                  </h3>
                  <p className="mt-1 text-[13px] text-white/50">
                    {selectedDateSub}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-[#F5A623]">
                    {selectedSchedule.length}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider font-semibold text-white/40">
                    sessions
                  </p>
                </div>
              </div>
            </div>

            {selectedSchedule.length > 0 ? (
              <div className="space-y-3">
                {selectedSchedule.map((item, index) => (
                  <ScheduleItem key={`${item.time}-${index}`} {...item} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.025] text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-white/50">
                  <CalendarIcon />
                </div>
                <p className="text-sm font-semibold text-white/70">
                  No sessions planned
                </p>
                <p className="mt-2 max-w-[200px] text-[10px] leading-5 text-white/40">
                  This is a good opportunity to let TimePilot plan your day.
                </p>
              </div>
            )}

            {/* Day summary */}
            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white/60">
                  Planned focus
                </span>
                <span className="text-[11px] font-bold text-white/80">
                  4h 00m
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                <div className="h-full w-[68%] rounded-full bg-[#F5A623]" />
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-[9px] font-medium text-white/35">
                  4h focused
                </span>
                <span className="text-[9px] font-medium text-white/35">
                  6h available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <CalendarStat value="11" label="Tasks planned" />
          <CalendarStat value="6h" label="Available time" />
          <CalendarStat value="4h" label="Focus time" />
          <CalendarStat value="87%" label="Focus score" />
        </div>
      </div>
    </section>
  );
}

// Components
function ScheduleItem({ time, title, duration, type }: ScheduleEntry) {
  const typeConfig = {
    focus: {
      label: "Focus",
      line: "bg-[#F5A623]",
      badge: "bg-[#F5A623]/15 text-[#F5A623]",
    },
    meeting: {
      label: "Meeting",
      line: "bg-[#EF4444]",
      badge: "bg-[#EF4444]/15 text-[#EF4444]",
    },
    break: {
      label: "Break",
      line: "bg-white/30",
      badge: "bg-white/[0.08] text-white/50",
    },
  };

  const config = typeConfig[type];

  return (
    <div className="group flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-white/[0.12] hover:bg-white/[0.05]">
      <div className="w-12 shrink-0 pt-0.5 text-[10px] font-semibold text-white/50">
        {time}
      </div>

      <div className={`w-1 shrink-0 rounded-full ${config.line}`} />

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-white/90">{title}</p>

        <div className="mt-2 flex items-center gap-2.5">
          <span className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider ${config.badge}`}>
            {config.label}
          </span>
          <span className="text-[9px] text-white/40 font-medium">{duration}</span>
        </div>
      </div>

      <button
        type="button"
        aria-label="More options"
        className="self-center text-white/25 opacity-0 transition group-hover:opacity-100"
      >
        <MoreIcon />
      </button>
    </div>
  );
}

function CalendarButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous month" : "Next month"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-white/60 transition hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white/90"
    >
      {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-[11px] font-medium text-white/60">{label}</span>
    </div>
  );
}

function CalendarStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
      <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-[10px] uppercase font-semibold tracking-[0.15em] text-white/45">
        {label}
      </p>
    </div>
  );
}

// Icons
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}