"use client";

import { useState } from "react";

interface Task {
  time: string;
  title: string;
  duration: string;
  priority: "High" | "Medium" | "Low";
  type: "focus" | "meeting" | "break";
}

const INITIAL_TASKS: Task[] = [
  {
    time: "09:00",
    title: "Deep work — Product analysis",
    duration: "2h",
    priority: "High",
    type: "focus",
  },
  {
    time: "11:30",
    title: "Team stand-up",
    duration: "30m",
    priority: "Medium",
    type: "meeting",
  },
  {
    time: "12:15",
    title: "Lunch & recovery",
    duration: "45m",
    priority: "Low",
    type: "break",
  },
  {
    time: "14:00",
    title: "Build TimePilot dashboard",
    duration: "2h",
    priority: "High",
    type: "focus",
  },
];

const BENEFITS = [
  {
    number: "01",
    title: "Understand",
    text: "AI considers your workload and available time.",
    accent: "blue" as const,
  },
  {
    number: "02",
    title: "Prioritize",
    text: "Important work gets protected focus windows.",
    accent: "purple" as const,
  },
  {
    number: "03",
    title: "Adapt",
    text: "Your plan can change when your day changes.",
    accent: "green" as const,
  },
];

export default function AIPlanner() {
  const [planning, setPlanning] = useState(false);
  const [planned, setPlanned] = useState(false);

  const handlePlan = () => {
    setPlanning(true);
    setPlanned(false);

    setTimeout(() => {
      setPlanning(false);
      setPlanned(true);
    }, 1200);
  };

  return (
    <section id="ai-planner" className="relative overflow-hidden bg-white px-5 py-24 text-black sm:px-8 lg:px-12 lg:py-32">
      {/* Background gradients */}
      <div className="pointer-events-none absolute left-1/2 top-[8%] h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-[150px]" />
      <div className="pointer-events-none absolute left-[-180px] bottom-[5%] h-[400px] w-[400px] rounded-full bg-purple-500/[0.025] blur-[130px]" />
      <div className="pointer-events-none absolute right-[-180px] top-[35%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.025] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600">
                Meet your AI planner
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
              Tell TimePilot
              <br />
              <span className="text-black/40">what needs to get done.</span>
            </h2>
          </div>

          <div className="lg:pb-1 lg:pl-12">
            <p className="max-w-xl text-base leading-7 text-black/60 sm:text-lg">
              Your tasks don't need another complicated system. Tell TimePilot what matters and AI turns your workload into a practical schedule.
            </p>
          </div>
        </div>

        {/* Planner workspace */}
        <div className="relative mt-16 overflow-hidden rounded-[32px] border border-black/[0.1] bg-[#F7F7F5] shadow-[0_40px_120px_rgba(0,0,0,0.1)] sm:rounded-[40px]">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-black/[0.1] px-5 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-[0_8px_20px_rgba(59,130,246,0.25)]">
                <SparkIcon />
              </div>
              <div>
                <p className="text-[12px] font-bold text-black">TimePilot AI</p>
                <p className="text-[9px] font-medium text-black/50">Personal productivity assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${planning ? "animate-pulse bg-blue-500" : "bg-emerald-500"}`} />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/60">
                {planning ? "Thinking" : "Ready"}
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left panel */}
            <div className="border-b border-black/[0.1] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/45">Your request</p>

              {/* Request box */}
              <div className="mt-5 rounded-2xl border border-black/[0.1] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-black/50">
                    <UserIcon />
                  </div>
                  <div>
                    <p className="text-[11px] leading-6 font-medium text-black/70">
                      Plan my day around my most important tasks. I have a team meeting at 11:30 and want at least 4 hours of deep work.
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <Control label="Available" value="8 hours" />
                <Control label="Deep work" value="4 hours" />
                <Control label="Meetings" value="1" />
                <Control label="Priority" value="3 tasks" />
              </div>

              {/* Plan button */}
              <button
                type="button"
                onClick={handlePlan}
                disabled={planning}
                className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3.5 text-base font-bold text-white shadow-[0_12px_30px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_18px_40px_rgba(59,130,246,0.3)] disabled:cursor-wait disabled:opacity-70"
              >
                {planning ? (
                  <>
                    <LoadingIcon />
                    Planning your day...
                  </>
                ) : (
                  <>
                    <SparkIcon />
                    {planned ? "Re-plan my day" : "Plan my day"}
                  </>
                )}
              </button>

              {/* Success message */}
              {planned && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <CheckIcon />
                  </div>
                  <p className="text-[10px] leading-5 font-medium text-black/60">
                    Your schedule has been optimized around your priorities.
                  </p>
                </div>
              )}

              {/* AI status */}
              <div className="mt-8 flex items-center gap-3 border-t border-black/[0.1] pt-6">
                <div className="flex -space-x-2">
                  <span className="h-8 w-8 rounded-full border-2 border-[#F7F7F5] bg-blue-500" />
                  <span className="h-8 w-8 rounded-full border-2 border-[#F7F7F5] bg-purple-500" />
                  <span className="h-8 w-8 rounded-full border-2 border-[#F7F7F5] bg-emerald-500" />
                </div>
                <p className="text-[10px] leading-5 font-medium text-black/50">
                  TimePilot considers your priorities,
                  <br />
                  available time and workload.
                </p>
              </div>
            </div>

            {/* Right panel */}
            <div className="p-7 sm:p-9 lg:p-10">
              {/* Header */}
              <div className="mb-7 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">
                    AI-generated plan
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-black">
                    Thursday, September 17
                  </h3>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[10px] font-semibold text-black/50">Focus target</p>
                  <p className="mt-1 text-base font-bold text-blue-600">4h 00m</p>
                </div>
              </div>

              {/* Schedule */}
              <div
                className={`space-y-3 transition-all duration-500 ${
                  planning ? "translate-y-1 opacity-40" : "translate-y-0 opacity-100"
                }`}
              >
                {INITIAL_TASKS.map((task, index) => (
                  <PlannerTask key={task.time} task={task} index={index} />
                ))}
              </div>

              {/* AI insight */}
              <div className="relative mt-6 overflow-hidden rounded-2xl border border-blue-500/[0.2] bg-gradient-to-r from-blue-500/[0.09] to-transparent p-5">
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/[0.1] blur-2xl" />
                <div className="relative flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/[0.12] text-blue-600">
                    <SparkIcon />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-600">AI insight</p>
                    <p className="mt-1 text-[10px] leading-5 font-medium text-black/55">
                      I've protected your morning focus window and placed a recovery period before your afternoon deep-work session.
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-6 grid grid-cols-3 gap-2.5">
                <MiniMetric value="4h" label="Deep work" accent="blue" />
                <MiniMetric value="1" label="Meeting" accent="purple" />
                <MiniMetric value="87%" label="Efficiency" accent="green" />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits section */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <Benefit
              key={benefit.number}
              number={benefit.number}
              title={benefit.title}
              text={benefit.text}
              accent={benefit.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Components
function PlannerTask({ task, index }: { task: Task; index: number }) {
  const isFocus = task.type === "focus";
  const isBreak = task.type === "break";

  const colorMap = {
    focus: { line: "bg-blue-500", icon: "bg-blue-500/[0.12] text-blue-600", icon: <TargetIcon /> },
    break: { line: "bg-black/20", icon: "bg-black/[0.06] text-black/40", icon: <CoffeeIcon /> },
    meeting: { line: "bg-purple-500", icon: "bg-purple-500/[0.1] text-purple-600", icon: <UsersIcon /> },
  };

  const colors = colorMap[task.type];

  return (
    <div
      className={`group flex items-center gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] ${
        isFocus ? "border-blue-500/[0.15] bg-blue-500/[0.04]" : "border-black/[0.08] bg-white"
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="w-12 shrink-0 text-[10px] font-bold text-black/55">{task.time}</div>
      <div className={`h-11 w-1.5 shrink-0 rounded-full ${colors.line}`} />
      <div className="min-w-0 flex-1">
        <p className={`truncate text-[11px] font-semibold ${isBreak ? "text-black/50" : "text-black/85"}`}>
          {task.title}
        </p>
        <div className="mt-1.5 flex items-center gap-2.5">
          <span
            className={`text-[9px] font-medium ${
              task.priority === "High"
                ? "text-blue-600 font-bold"
                : task.priority === "Medium"
                ? "text-black/50"
                : "text-black/35"
            }`}
          >
            {task.priority} priority
          </span>
          <span className="text-[9px] text-black/25">·</span>
          <span className="text-[9px] font-medium text-black/45">{task.duration}</span>
        </div>
      </div>
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colors.icon}`}>
        {task.type === "focus" ? <TargetIcon /> : task.type === "break" ? <CoffeeIcon /> : <UsersIcon />}
      </div>
    </div>
  );
}

function Control({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-3.5 shadow-[0_5px_20px_rgba(0,0,0,0.03)] transition-all hover:border-black/[0.12]">
      <p className="text-[9px] font-semibold text-black/40">{label}</p>
      <p className="mt-1.5 text-[11px] font-bold text-black/70">{value}</p>
    </div>
  );
}

function MiniMetric({ value, label, accent }: { value: string; label: string; accent: "blue" | "purple" | "green" }) {
  const colors = { blue: "text-blue-600", purple: "text-purple-600", green: "text-emerald-600" };
  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-3.5">
      <p className={`text-base font-bold ${colors[accent]}`}>{value}</p>
      <p className="mt-1.5 text-[8px] uppercase font-bold tracking-[0.12em] text-black/40">{label}</p>
    </div>
  );
}

function Benefit({
  number,
  title,
  text,
  accent,
}: {
  number: string;
  title: string;
  text: string;
  accent: "blue" | "purple" | "green";
}) {
  const colors = { blue: "text-blue-600", purple: "text-purple-600", green: "text-emerald-600" };
  const backgrounds = { blue: "bg-blue-500", purple: "bg-purple-500", green: "bg-emerald-500" };

  return (
    <div className="group rounded-2xl border border-black/[0.08] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`h-2 w-2 rounded-full ${backgrounds[accent]}`} />
          <span className={`text-[10px] font-bold ${colors[accent]}`}>{number}</span>
        </div>
        <ArrowIcon />
      </div>
      <h3 className="mt-8 text-base font-bold text-black">{title}</h3>
      <p className="mt-2 text-[10px] leading-5 font-medium text-black/50">{text}</p>
    </div>
  );
}

// Icons
function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V8Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.7-3 2.5-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14.5c2.2.5 3.4 1.9 4 4" />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <circle cx="12" cy="12" r="8" className="opacity-25" />
      <path d="M20 12a8 8 0 0 1-8 8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}