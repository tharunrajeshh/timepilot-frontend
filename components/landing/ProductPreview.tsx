"use client";

import { useState } from "react";

const EARTH_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4";

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
      className="relative overflow-hidden bg-[#03070c] px-5 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32"
    >
      {/* =====================================================
          EARTH / SPACE BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          className="absolute left-1/2 top-[38%] h-[110%] w-[110%] min-w-[1100px] -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.24]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/space-bg.jpg"
          aria-hidden="true"
        >
          <source
            src={EARTH_VIDEO}
            type="video/mp4"
          />
        </video>

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-[#03070c]/65" />

        {/* Top fade from Hero */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#08090B] via-[#08090B]/70 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#08090B] via-[#08090B]/75 to-transparent" />

        {/* Blue Earth atmosphere */}
        <div className="absolute left-1/2 top-[35%] h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[150px]" />

        {/* Liquid glow left */}
        <div
          className="absolute left-[-120px] top-[20%] h-[420px] w-[420px] rounded-full bg-blue-500/[0.08] blur-[120px]"
          style={{
            animation: "productLiquidOne 14s ease-in-out infinite",
          }}
        />

        {/* Liquid glow right */}
        <div
          className="absolute right-[-120px] top-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.07] blur-[140px]"
          style={{
            animation: "productLiquidTwo 17s ease-in-out infinite",
          }}
        />
      </div>

      {/* =====================================================
          SECTION CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =================================================
            SECTION LABEL
        ================================================== */}

        <div className="mb-10 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-white/15" />

          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-wide text-white/55 backdrop-blur-xl">
            Your day, organized
          </span>

          <span className="h-px w-10 bg-white/15" />
        </div>

        {/* =================================================
            INTRO
        ================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
            Everything you need.
            <span className="block text-white/40">
              In one focused workspace.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Plan your tasks, protect your focus, organize your
            schedule and let TimePilot help you make the most
            of every day.
          </p>
        </div>

        {/* =================================================
            LIQUID GLASS PRODUCT WINDOW
        ================================================== */}

        <div
          className="relative overflow-hidden rounded-[32px] border border-white/[0.14] shadow-[0_50px_150px_rgba(0,0,0,0.65)] sm:rounded-[40px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.095), rgba(255,255,255,0.025))",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          {/* Liquid reflection */}
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/[0.06] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-violet-400/[0.06] blur-[100px]" />

          {/* =================================================
              BROWSER BAR
          ================================================== */}

          <div className="relative z-10 flex h-16 items-center justify-between border-b border-white/[0.08] bg-white/[0.035] px-5 backdrop-blur-2xl sm:px-7">

            {/* Browser dots */}
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>

            {/* Address */}
            <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-black/20 px-5 py-2 backdrop-blur-xl sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />

              <span className="text-xs text-white/40">
                app.timepilot.co
              </span>
            </div>

            {/* User */}
            <div className="h-8 w-8 rounded-full border border-white/15 bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 shadow-[0_0_25px_rgba(59,130,246,0.25)]" />
          </div>

          {/* =================================================
              DASHBOARD
          ================================================== */}

          <div className="relative z-10 grid min-h-[560px] lg:grid-cols-[220px_1fr]">

            {/* =================================================
                SIDEBAR
            ================================================== */}

            <aside className="hidden border-r border-white/[0.07] bg-black/10 p-5 lg:block">

              <div className="mb-9 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.12)]">
                  <ClockIcon />
                </div>

                <span className="text-sm font-bold tracking-tight text-white">
                  TimePilot
                </span>
              </div>

              <nav className="space-y-1">
                <SideItem
                  active
                  icon={<GridIcon />}
                  label="Overview"
                />

                <SideItem
                  icon={<CheckIcon />}
                  label="My Tasks"
                />

                <SideItem
                  icon={<CalendarIcon />}
                  label="Calendar"
                />

                <SideItem
                  icon={<SparkIcon />}
                  label="AI Planner"
                />

                <SideItem
                  icon={<ChartIcon />}
                  label="Analytics"
                />
              </nav>

              <div className="mt-10 border-t border-white/[0.07] pt-5">
                <p className="mb-3 px-3 text-xs font-medium text-white/25">
                  Workspace
                </p>

                <nav className="space-y-1">
                  <SideItem
                    icon={<FolderIcon />}
                    label="Projects"
                  />

                  <SideItem
                    icon={<SettingsIcon />}
                    label="Settings"
                  />
                </nav>
              </div>
            </aside>

            {/* =================================================
                MAIN DASHBOARD
            ================================================== */}

            <div className="p-5 sm:p-7 lg:p-9">

              {/* Header */}
              <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-2 text-xs text-white/35">
                    {todayLabel}
                  </p>

                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                    Good morning, Alex.
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-5 text-white/40">
                    Here&apos;s your plan for today.
                    Stay focused on what matters.
                  </p>
                </div>

                <button
                  type="button"
                  className="flex w-fit items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-2.5 text-sm font-medium text-cyan-200 transition hover:bg-cyan-300/[0.12]"
                >
                  <SparkIcon />
                  Ask AI
                </button>
              </div>

              {/* =================================================
                  STATS
              ================================================== */}

              <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <PreviewStat
                  label="Focus time"
                  value="4h 32m"
                  change="+18%"
                />

                <PreviewStat
                  label="Tasks done"
                  value="8 / 11"
                  change="+2"
                />

                <PreviewStat
                  label="Focus score"
                  value="87%"
                  change="+12%"
                />

                <PreviewStat
                  label="Streak"
                  value="12 days"
                  change="Best"
                />
              </div>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">

                {/* =================================================
                    SCHEDULE
                ================================================== */}

                <div
                  className="rounded-2xl border border-white/[0.08] p-4 sm:p-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Today&apos;s schedule
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        4 planned sessions
                      </p>
                    </div>

                    <button
                      type="button"
                      className="text-xs font-medium text-cyan-300 hover:underline"
                    >
                      View calendar
                    </button>
                  </div>

                  <div className="space-y-2">
                    {tasks.map((task, index) => (
                      <button
                        type="button"
                        key={task.time}
                        onClick={() =>
                          setActiveTask(index)
                        }
                        aria-pressed={
                          activeTask === index
                        }
                        className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                          activeTask === index
                            ? "border-cyan-300/15 bg-cyan-300/[0.06]"
                            : "border-transparent bg-white/[0.018] hover:border-white/[0.06] hover:bg-white/[0.035]"
                        }`}
                      >
                        <div className="w-11 shrink-0 text-xs font-medium text-white/30">
                          {task.time}
                        </div>

                        <div
                          className={`h-8 w-1 rounded-full ${
                            task.status ===
                            "Completed"
                              ? "bg-cyan-300"
                              : task.status ===
                                  "Break"
                                ? "bg-white/20"
                                : "bg-violet-400"
                          }`}
                        />

                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-medium ${
                              task.status ===
                              "Completed"
                                ? "text-white/40 line-through"
                                : "text-white"
                            }`}
                          >
                            {task.title}
                          </p>

                          <p className="mt-1 text-xs text-white/25">
                            {task.duration}
                          </p>
                        </div>

                        {task.status ===
                        "Completed" ? (
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-black">
                            <CheckIcon />
                          </div>
                        ) : (
                          <div className="h-5 w-5 shrink-0 rounded-full border border-white/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* =================================================
                    AI PLANNER
                ================================================== */}

                <div
                  className="relative overflow-hidden rounded-2xl border border-white/[0.09] p-5"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(80,180,255,0.09), rgba(255,255,255,0.025), rgba(140,80,255,0.06))",
                    backdropFilter: "blur(25px)",
                    WebkitBackdropFilter: "blur(25px)",
                  }}
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-300/10 blur-[70px]" />

                  <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-violet-500/10 blur-[70px]" />

                  <div className="relative">

                    <div className="mb-7 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black">
                          <SparkIcon />
                        </div>

                        <span className="text-sm font-semibold text-white">
                          AI Planner
                        </span>
                      </div>

                      <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.04] px-2 py-1 text-[10px] font-medium text-cyan-300">
                        Active
                      </span>
                    </div>

                    <p className="max-w-[240px] text-lg font-semibold leading-7 tracking-[-0.03em] text-white">
                      Your day is looking balanced.
                    </p>

                    <p className="mt-3 text-xs leading-5 text-white/40">
                      You have enough focus time for your
                      priority tasks. I&apos;ve added a short
                      recovery break after your afternoon
                      session.
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

                    <button
                      type="button"
                      className="mt-6 w-full rounded-xl bg-white py-3 text-xs font-semibold text-black transition hover:bg-cyan-200"
                    >
                      Optimize my day
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom liquid shine */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
        </div>

        {/* =================================================
            BOTTOM TEXT
        ================================================== */}

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm leading-6 text-white/30">
            One workspace for your tasks, schedule,
            focus sessions and productivity insights.
          </p>
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style jsx>{`
        @keyframes productLiquidOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          35% {
            transform: translate3d(100px, 50px, 0) scale(1.12);
          }

          70% {
            transform: translate3d(-40px, 90px, 0) scale(0.9);
          }
        }

        @keyframes productLiquidTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          40% {
            transform: translate3d(-80px, 60px, 0) scale(0.88);
          }

          75% {
            transform: translate3d(40px, -40px, 0) scale(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

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
      <span
        className={
          active
            ? "text-cyan-300"
            : "text-white/30"
        }
      >
        {icon}
      </span>

      {label}
    </a>
  );
}

/* =========================================================
   STAT
========================================================= */

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
    <div
      className="rounded-xl border border-white/[0.06] p-3.5"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",
      }}
    >
      <p className="text-xs text-white/30">
        {label}
      </p>

      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-base font-semibold tracking-tight text-white">
          {value}
        </p>

        <span className="text-xs font-medium text-cyan-300">
          {change}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   AI INSIGHT
========================================================= */

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
        <p className="text-xs text-white/30">
          {title}
        </p>

        <p className="mt-0.5 text-xs font-medium text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ICONS
========================================================= */

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
      />

      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="1"
      />

      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="1"
      />

      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        rx="1"
      />

      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
      />

      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />

      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 19V10M12 19V5M19 19v-7" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H10l2 2h5.5A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-10Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle
        cx="12"
        cy="12"
        r="3"
      />

      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.5 1.5-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2v-.4a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.5-1.5.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2h.4a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L9 7.5l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V6h2v.4a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.5 1.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.4v2h-.4a1.7 1.7 0 0 0-1.7 1Z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle
        cx="12"
        cy="12"
        r="7.5"
      />

      <circle
        cx="12"
        cy="12"
        r="3"
      />

      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V8Z" />

      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 4c0 1-1 1.2-1 2.2M12 4c0 1-1 1.2-1 2.2" />
    </svg>
  );
}