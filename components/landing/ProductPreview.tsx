"use client";

import { useState } from "react";

const tasks = [
  {
    time: "09:00",
    title: "Deep work — Product analysis",
    duration: "2h 00m",
    status: "Completed",
  },
  {
    time: "11:30",
    title: "Team stand-up",
    duration: "30m",
    status: "Upcoming",
  },
  {
    time: "12:15",
    title: "Lunch & reset",
    duration: "45m",
    status: "Break",
  },
  {
    time: "14:00",
    title: "Build TimePilot dashboard",
    duration: "2h 00m",
    status: "Upcoming",
  },
];

const todayLabel = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function ProductPreview() {
  const [activeTask, setActiveTask] = useState(0);

  return (
    <section
      id="preview"
      className="relative overflow-hidden bg-[#08090B] px-5 pb-24 pt-8 sm:px-8 lg:px-12 lg:pb-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#F5A623]/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section label */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-white/10" />
          <span className="text-xs font-semibold tracking-wide text-white/40">
            Your day, organized
          </span>
          <span className="h-px w-10 bg-white/10" />
        </div>

        {/* Main preview */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#101114] shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:rounded-[36px]">
          {/* Browser top bar */}
          <div className="flex h-14 items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-5 sm:px-7">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-black/20 px-4 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" />
              <span className="text-xs text-white/40">app.timepilot.co</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-full border border-white/10 bg-gradient-to-br from-[#F5A623] to-[#EF4444]"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Dashboard */}
          <div className="grid min-h-[520px] lg:grid-cols-[210px_1fr]">
            {/* Sidebar */}
            <aside className="hidden border-r border-white/[0.07] bg-black/10 p-5 lg:block">
              <div className="mb-9 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F5A623] text-black">
                  <ClockIcon />
                </div>
                <span className="text-sm font-bold tracking-tight text-white">
                  TimePilot
                </span>
              </div>

              <nav className="space-y-1">
                <SideItem active icon={<GridIcon />} label="Overview" />
                <SideItem icon={<CheckIcon />} label="My Tasks" />
                <SideItem icon={<CalendarIcon />} label="Calendar" />
                <SideItem icon={<SparkIcon />} label="AI Planner" />
                <SideItem icon={<ChartIcon />} label="Analytics" />
              </nav>

              <div className="mt-10 border-t border-white/[0.07] pt-5">
                <p className="mb-3 px-3 text-xs font-medium text-white/30">
                  Workspace
                </p>

                <nav className="space-y-1">
                  <SideItem icon={<FolderIcon />} label="Projects" />
                  <SideItem icon={<SettingsIcon />} label="Settings" />
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="p-5 sm:p-7 lg:p-9">
              {/* Header */}
              <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-2 text-xs text-white/40">{todayLabel}</p>

                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                    Good morning, Alex.
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-5 text-white/40">
                    Here&apos;s your plan for today. Stay focused on what
                    matters.
                  </p>
                </div>

                <button className="flex w-fit items-center gap-2 rounded-xl border border-[#F5A623]/20 bg-[#F5A623]/[0.08] px-4 py-2.5 text-sm font-medium text-[#F5A623] transition hover:bg-[#F5A623]/[0.14]">
                  <SparkIcon />
                  Ask AI
                </button>
              </div>

              {/* Stats */}
              <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <PreviewStat label="Focus time" value="4h 32m" change="+18%" />
                <PreviewStat label="Tasks done" value="8 / 11" change="+2" />
                <PreviewStat label="Focus score" value="87%" change="+12%" />
                <PreviewStat label="Streak" value="12 days" change="Best" />
              </div>

              {/* Content grid */}
              <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
                {/* Schedule */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Today&apos;s schedule
                      </p>
                      <p className="mt-1 text-xs text-white/35">
                        4 planned sessions
                      </p>
                    </div>

                    <button className="text-xs font-medium text-[#F5A623] hover:underline">
                      View calendar
                    </button>
                  </div>

                  <div className="space-y-2">
                    {tasks.map((task, index) => (
                      <button
                        key={task.time}
                        onClick={() => setActiveTask(index)}
                        aria-pressed={activeTask === index}
                        className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                          activeTask === index
                            ? "border-[#F5A623]/20 bg-[#F5A623]/[0.07]"
                            : "border-transparent bg-white/[0.018] hover:border-white/[0.06] hover:bg-white/[0.035]"
                        }`}
                      >
                        <div className="w-11 shrink-0 text-xs font-medium text-white/35">
                          {task.time}
                        </div>

                        <div
                          className={`h-8 w-1 rounded-full ${
                            task.status === "Completed"
                              ? "bg-[#F5A623]"
                              : task.status === "Break"
                                ? "bg-white/20"
                                : "bg-[#EF4444]"
                          }`}
                        />

                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-medium ${
                              task.status === "Completed"
                                ? "text-white/45 line-through"
                                : "text-white"
                            }`}
                          >
                            {task.title}
                          </p>

                          <p className="mt-1 text-xs text-white/30">
                            {task.duration}
                          </p>
                        </div>

                        {task.status === "Completed" ? (
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5A623] text-black">
                            <CheckIcon />
                          </div>
                        ) : (
                          <div className="h-5 w-5 shrink-0 rounded-full border border-white/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI card */}
                <div className="relative overflow-hidden rounded-2xl border border-[#F5A623]/15 bg-gradient-to-br from-[#F5A623]/[0.08] via-white/[0.025] to-[#EF4444]/[0.04] p-5">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F5A623]/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-7 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5A623] text-black">
                          <SparkIcon />
                        </div>

                        <span className="text-sm font-semibold text-white">
                          AI Planner
                        </span>
                      </div>

                      <span className="rounded-full border border-[#F5A623]/15 px-2 py-1 text-[10px] font-medium text-[#F5A623]">
                        Active
                      </span>
                    </div>

                    <p className="max-w-[240px] text-lg font-semibold leading-7 tracking-[-0.03em] text-white">
                      Your day is looking balanced.
                    </p>

                    <p className="mt-3 text-xs leading-5 text-white/40">
                      You have enough focus time for your priority tasks.
                      I&apos;ve added a short recovery break after your
                      afternoon session.
                    </p>

                    <div className="mt-7 space-y-2">
                      <AIInsight
                        title="Priority protected"
                        value="2h 00m"
                        icon={<TargetIcon />}
                      />

                      <AIInsight
                        title="Suggested break"
                        value="15 min"
                        icon={<CoffeeIcon />}
                      />

                      <AIInsight
                        title="Focus window"
                        value="2:00 PM"
                        icon={<ClockIcon />}
                      />
                    </div>

                    <button className="mt-6 w-full rounded-xl bg-white py-3 text-xs font-semibold text-black transition hover:bg-[#F5A623]">
                      Optimize my day
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom shine */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F5A623]/30 to-transparent" />
        </div>

        {/* Bottom text */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm leading-6 text-white/35">
            One workspace for your tasks, schedule, focus sessions and
            productivity insights.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Small components
───────────────────────────────────────────── */

function SideItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href="#"
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition ${
        active
          ? "bg-white/[0.07] text-white"
          : "text-white/35 hover:bg-white/[0.035] hover:text-white/70"
      }`}
    >
      <span className={active ? "text-[#F5A623]" : "text-white/30"}>
        {icon}
      </span>
      {label}
    </a>
  );
}

function PreviewStat({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-3.5">
      <p className="text-xs text-white/35">{label}</p>

      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-base font-semibold tracking-tight text-white">
          {value}
        </p>

        <span className="text-xs font-medium text-[#F5A623]">{change}</span>
      </div>
    </div>
  );
}

function AIInsight({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-white/50">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/35">{title}</p>
        <p className="mt-0.5 text-xs font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 19V10M12 19V5M19 19v-7" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H10l2 2h5.5A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-10Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.5 1.5-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2v-.4a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.5-1.5.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2h.4a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L9 7.5l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V6h2v.4a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.5 1.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.4v2h-.4a1.7 1.7 0 0 0-1.7 1Z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V8Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 4c0 1-1 1.2-1 2.2M12 4c0 1-1 1.2-1 2.2" />
    </svg>
  );
}