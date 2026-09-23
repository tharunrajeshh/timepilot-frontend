"use client";

import { BarChart3, Calendar, Sparkles } from "lucide-react";

export default function ProductPreview() {
  return (
    <section id="preview" className="w-full bg-[#f6f4ee] py-20 lg:py-28">
      <div className="tp-container">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="tp-eyebrow">The product</p>
          <h2 className="tp-serif mt-4 text-[34px] leading-[1.1] tracking-[-0.02em] text-[#0d1420] sm:text-[42px]">
            A calmer way to plan your day.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#344052]">
            One place for your schedule, tasks, and focus — designed to reduce
            noise, not add to it.
          </p>
        </div>

        {/* Dark dashboard panel */}
        <div
          className="mt-14 overflow-hidden rounded-[28px] border border-[rgba(13,20,32,0.08)] bg-[#0a1422] p-4 sm:p-6 lg:p-8"
          style={{ boxShadow: "0 24px 70px rgba(13,20,32,0.12)" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#f6f4ee] text-[13px] font-bold text-[#0a1422]">
                T
              </span>
              <span className="text-[13px] font-medium text-[#f6f4ee]/70">
                Today · Your schedule
              </span>
            </div>
            <span className="hidden rounded-full border border-[rgba(246,244,238,0.1)] px-3 py-1 text-[11px] font-medium text-[#f6f4ee]/50 sm:inline">
              Optimized for today
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            {/* LEFT — Schedule */}
            <div className="rounded-[20px] border border-[rgba(246,244,238,0.06)] bg-[rgba(246,244,238,0.03)] p-5 lg:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#c49a61]" />
                  <span className="text-[12px] font-medium text-[#f6f4ee]/70">
                    Schedule
                  </span>
                </div>
                <span className="text-[11px] text-[#f6f4ee]/40">
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  }).format(new Date())}
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { time: "09:00", title: "Deep work", note: "Product strategy", active: true },
                  { time: "11:00", title: "Team sync", note: "Weekly planning", active: false },
                  { time: "13:30", title: "Lunch break", note: "Take a real break", active: false },
                  { time: "14:30", title: "Project work", note: "Dashboard redesign", active: false },
                ].map((row) => (
                  <div
                    key={row.time + row.title}
                    className={`flex items-start gap-4 rounded-[12px] border p-3.5 transition ${
                      row.active
                        ? "border-[rgba(196,154,97,0.35)] bg-[rgba(196,154,97,0.06)]"
                        : "border-[rgba(246,244,238,0.05)] bg-transparent"
                    }`}
                  >
                    <span className="w-10 pt-0.5 text-[11px] font-medium text-[#f6f4ee]/45">
                      {row.time}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-[#f6f4ee]">
                        {row.title}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-[#f6f4ee]/45">
                        {row.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — AI + Stats */}
            <div className="space-y-4">
              {/* AI card */}
              <div className="rounded-[20px] border border-[rgba(196,154,97,0.25)] bg-[rgba(196,154,97,0.05)] p-5">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#c49a61]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c49a61]">
                    AI Planner
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] leading-6 text-[#f6f4ee]/85">
                  Your strongest focus window is{" "}
                  <span className="font-medium text-[#f6f4ee]">9:00 — 11:00.</span>{" "}
                  Protected for your highest-priority task.
                </p>
                <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-[rgba(246,244,238,0.08)]">
                  <div className="h-full w-[94%] rounded-full bg-[#c49a61]" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10.5px] text-[#f6f4ee]/45">
                  <span>Optimized just now</span>
                  <span className="font-medium text-[#c49a61]">94%</span>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-[20px] border border-[rgba(246,244,238,0.06)] bg-[rgba(246,244,238,0.03)] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BarChart3 size={15} className="text-[#8aa3c4]" />
                  <span className="text-[12px] font-medium text-[#f6f4ee]/70">
                    Today
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Focus time", value: "4h 32m" },
                    { label: "Tasks", value: "8 / 11" },
                    { label: "Deep work", value: "72%" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between border-b border-[rgba(246,244,238,0.05)] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-[12px] text-[#f6f4ee]/50">
                        {s.label}
                      </span>
                      <span className="text-[13px] font-medium text-[#f6f4ee]">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}