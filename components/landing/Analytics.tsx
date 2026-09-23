"use client";

import { useState } from "react";

const weeks = ["This week", "Last week", "2 weeks ago"];

const chartData = [
  { day: "MON", value: 62, focus: "3h 10m" },
  { day: "TUE", value: 78, focus: "4h 05m" },
  { day: "WED", value: 70, focus: "3h 42m" },
  { day: "THU", value: 92, focus: "5h 12m" },
  { day: "FRI", value: 81, focus: "4h 28m" },
  { day: "SAT", value: 48, focus: "2h 14m" },
  { day: "SUN", value: 56, focus: "2h 46m" },
];

export default function Analytics() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [hoveredDay, setHoveredDay] = useState<number | null>(3);

  return (
    <section
      id="analytics"
      className="relative overflow-hidden bg-[#08090B] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[25%] h-[450px] w-[450px] rounded-full bg-[#EF4444]/[0.025] blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#F5A623]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5A623]">
                Your productivity, understood
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
              Don&apos;t just
              <br />
              <span className="text-white/50">work harder.</span>
            </h2>
          </div>

          <div className="lg:pb-1 lg:pl-12">
            <p className="max-w-xl text-base leading-7 text-white/65 sm:text-lg">
              TimePilot turns your activity into simple insights. See your
              focus patterns, understand your best hours and make better
              decisions about your time.
            </p>
          </div>
        </div>

        {/* Dashboard */}
        <div className="mt-16 overflow-hidden rounded-[30px] border border-white/[0.12] bg-[#101114] shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:rounded-[38px]">
          {/* Dashboard header */}
          <div className="flex flex-col gap-4 border-b border-white/[0.1] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5A623]">
                Productivity overview
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-white">
                Focus analytics
              </h3>
            </div>

            <div className="flex gap-1.5 rounded-xl border border-white/[0.12] bg-black/30 p-1.5">
              {weeks.map((week, index) => (
                <button
                  key={week}
                  onClick={() => setActiveWeek(index)}
                  className={`rounded-lg px-4 py-2 text-[9px] font-semibold transition ${
                    activeWeek === index
                      ? "bg-white/[0.12] text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {week}
                </button>
              ))}
            </div>
          </div>

          {/* Main analytics */}
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            {/* Chart */}
            <div className="border-b border-white/[0.1] p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-white/50">
                    Average focus score
                  </p>

                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-5xl font-bold tracking-[-0.05em] text-white">
                      78
                    </span>

                    <span className="mb-1 text-[11px] font-bold text-[#F5A623]">
                      +12.4%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-semibold text-white/45">Best day</p>

                  <p className="mt-1 text-sm font-bold text-white/75">
                    Thursday
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="relative h-[260px]">
                {/* Horizontal grid */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                  {[100, 75, 50, 25, 0].map((value) => (
                    <div
                      key={value}
                      className="flex items-center gap-3"
                    >
                      <span className="w-6 text-right text-[8px] font-semibold text-white/30">
                        {value}
                      </span>

                      <div className="h-px flex-1 bg-white/[0.08]" />
                    </div>
                  ))}
                </div>

                {/* Bars */}
                <div className="absolute bottom-0 left-9 right-0 top-0 flex items-end justify-between gap-2 sm:gap-4">
                  {chartData.map((item, index) => {
                    const hovered = hoveredDay === index;

                    return (
                      <div
                        key={item.day}
                        className="relative flex h-full flex-1 flex-col justify-end"
                        onMouseEnter={() => setHoveredDay(index)}
                        onMouseLeave={() => setHoveredDay(null)}
                      >
                        {/* Tooltip */}
                        {hovered && (
                          <div className="absolute bottom-[calc(var(--bar-height)+12px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/[0.15] bg-[#17181C] px-3 py-2.5 shadow-xl">
                            <p className="text-[9px] font-bold text-white">
                              {item.focus}
                            </p>

                            <p className="mt-1 text-[8px] font-semibold text-[#F5A623]">
                              {item.value}% focus
                            </p>
                          </div>
                        )}

                        {/* Bar */}
                        <div
                          className={`relative w-full rounded-t-lg transition-all duration-300 ${
                            hovered
                              ? "bg-[#F5A623]"
                              : "bg-white/[0.12] hover:bg-white/[0.18]"
                          }`}
                          style={{
                            height: `${item.value}%`,
                            ["--bar-height" as string]: `${item.value}%`,
                          }}
                        >
                          {/* Glow */}
                          {hovered && (
                            <div className="absolute inset-x-0 top-0 h-10 rounded-full bg-[#F5A623]/25 blur-xl" />
                          )}
                        </div>

                        {/* Day */}
                        <span
                          className={`mt-3 text-center text-[9px] font-bold ${
                            hovered ? "text-[#F5A623]" : "text-white/40"
                          }`}
                        >
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-5 sm:p-8 lg:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                This week
              </p>

              <div className="mt-6 space-y-3">
                <MetricCard
                  icon={<ClockIcon />}
                  label="Deep work"
                  value="25h 37m"
                  change="+18%"
                  positive
                />

                <MetricCard
                  icon={<CheckIcon />}
                  label="Tasks completed"
                  value="42"
                  change="+9"
                  positive
                />

                <MetricCard
                  icon={<TargetIcon />}
                  label="Focus score"
                  value="87%"
                  change="+12%"
                  positive
                />

                <MetricCard
                  icon={<BreakIcon />}
                  label="Recovery time"
                  value="4h 20m"
                  change="Healthy"
                  positive
                />
              </div>

              {/* Peak focus */}
              <div className="mt-7 rounded-2xl border border-[#F5A623]/20 bg-[#F5A623]/[0.08] p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5A623]/20 text-[#F5A623]">
                    <SparkIcon />
                  </div>

                  <span className="text-[10px] font-bold text-white/80">
                    Your peak focus window
                  </span>
                </div>

                <p className="mt-4 text-2xl font-bold tracking-[-0.04em] text-white">
                  9:00 — 11:30 AM
                </p>

                <p className="mt-2 text-[10px] leading-5 text-white/45">
                  You consistently complete your highest-value work during
                  this window.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insight cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <InsightCard
            number="01"
            title="Know your rhythm"
            text="Identify when your concentration is naturally strongest."
          />

          <InsightCard
            number="02"
            title="Protect your focus"
            text="Use your best hours for work that actually matters."
          />

          <InsightCard
            number="03"
            title="Improve over time"
            text="Use your history to build better working habits."
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Metric Card
───────────────────────────────────────────── */

function MetricCard({
  icon,
  label,
  value,
  change,
  positive = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4 transition hover:border-white/[0.15] hover:bg-white/[0.05]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-white/50 transition group-hover:text-[#F5A623]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold text-white/40">{label}</p>

        <p className="mt-1 text-base font-bold tracking-tight text-white/85">
          {value}
        </p>
      </div>

      <span
        className={`text-[9px] font-bold ${
          positive ? "text-[#F5A623]" : "text-white/30"
        }`}
      >
        {change}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Insight Card
───────────────────────────────────────────── */

function InsightCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.1] bg-white/[0.03] p-6 transition hover:border-white/[0.15] hover:bg-white/[0.05]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-[#F5A623]">
          {number}
        </span>

        <ArrowIcon />
      </div>

      <h3 className="mt-8 text-base font-bold text-white">{title}</h3>

      <p className="mt-2 text-[10px] leading-5 text-white/50">{text}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

function BreakIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M6 5v14M18 5v14" />
      <path d="M10 8v8M14 8v8" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}