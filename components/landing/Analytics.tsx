"use client";

import { LineChart } from "lucide-react";

export default function Analytics() {
  return (
    <section
      id="analytics"
      className="w-full bg-[#0a1422] py-20 lg:py-28"
    >
      <div className="tp-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* ─── LEFT — Copy ─── */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c49a61]">
              Analytics
            </p>
            <h2 className="tp-serif mt-4 text-[34px] leading-[1.1] tracking-[-0.02em] text-[#f6f4ee] sm:text-[42px]">
              See where your time actually goes.
            </h2>
            <p className="mt-5 max-w-[440px] text-[15.5px] leading-7 text-[#f6f4ee]/55">
              Not vanity charts. Just the three numbers that change how you
              work next week.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { label: "Focus time", value: "4h 32m", change: "+18%" },
                { label: "Deep work ratio", value: "72%", change: "+12%" },
                { label: "Tasks completed", value: "8 of 11", change: "+3" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-end justify-between border-b border-[rgba(246,244,238,0.08)] pb-5 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-[12px] font-medium text-[#f6f4ee]/45">
                      {s.label}
                    </p>
                    <p className="mt-1.5 text-[24px] font-medium tracking-[-0.02em] text-[#f6f4ee]">
                      {s.value}
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(196,154,97,0.12)] px-2.5 py-1 text-[11px] font-medium text-[#c49a61]">
                    {s.change} this week
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT — Chart panel ─── */}
          <div className="rounded-[24px] border border-[rgba(246,244,238,0.06)] bg-[rgba(246,244,238,0.03)] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LineChart size={15} className="text-[#c49a61]" />
                <span className="text-[12.5px] font-medium text-[#f6f4ee]/70">
                  Focus, this week
                </span>
              </div>
              <span className="text-[11px] text-[#f6f4ee]/40">Mon — Sun</span>
            </div>

            {/* Bar chart */}
            <div className="flex h-[180px] items-end justify-between gap-2.5">
              {[
                { day: "M", value: 55 },
                { day: "T", value: 72 },
                { day: "W", value: 94 },
                { day: "T", value: 68 },
                { day: "F", value: 85 },
                { day: "S", value: 40 },
                { day: "S", value: 30 },
              ].map((bar, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={`w-full rounded-t-[6px] transition-all duration-500 ${
                      bar.value >= 90
                        ? "bg-[#c49a61]"
                        : "bg-[rgba(246,244,238,0.14)]"
                    }`}
                    style={{ height: `${bar.value}%` }}
                  />
                  <span className="text-[10.5px] font-medium text-[#f6f4ee]/40">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[rgba(246,244,238,0.08)] pt-5">
              <span className="text-[11.5px] text-[#f6f4ee]/45">
                Best day: Wednesday
              </span>
              <span className="text-[11.5px] font-medium text-[#c49a61]">
                +18% vs last week
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}