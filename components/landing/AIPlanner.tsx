"use client";

import { Sparkles } from "lucide-react";

export default function AIPlanner() {
  return (
    <section id="ai-planner" className="w-full bg-[#f6f4ee] py-20 lg:py-28">
      <div className="tp-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ─── LEFT — Navy AI panel ─── */}
          <div
            className="order-2 overflow-hidden rounded-[24px] border border-[rgba(13,20,32,0.08)] bg-[#0a1422] p-7 sm:p-9 lg:order-1"
            style={{ boxShadow: "0 24px 70px rgba(13,20,32,0.12)" }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[rgba(196,154,97,0.14)] text-[#c49a61]">
                <Sparkles size={16} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c49a61]">
                AI Planner
              </span>
            </div>

            <h3 className="mt-6 text-[20px] font-medium leading-[1.3] tracking-[-0.02em] text-[#f6f4ee] sm:text-[24px]">
              &ldquo;Your strongest focus window today is{" "}
              <span className="text-[#c49a61]">9:00 — 11:00.</span> I&apos;ve
              protected it for your highest-priority task.&rdquo;
            </h3>

            <p className="mt-5 text-[14px] leading-6 text-[#f6f4ee]/55">
              Every morning, TimePilot reads your calendar, tasks, and energy
              patterns, then proposes a plan you can accept in one click.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Replans automatically when meetings shift",
                "Suggests the right task for your current energy",
                "Learns your rhythms week over week",
              ].map((line) => (
                <div key={line} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-[#c49a61]" />
                  <span className="text-[13.5px] text-[#f6f4ee]/75">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT — Copy ─── */}
          <div className="order-1 lg:order-2">
            <p className="tp-eyebrow">AI Planner</p>
            <h2 className="tp-serif mt-4 text-[34px] leading-[1.1] tracking-[-0.02em] text-[#0d1420] sm:text-[42px]">
              Your day, intelligently planned.
            </h2>
            <p className="mt-5 max-w-[480px] text-[16px] leading-7 text-[#344052]">
              Not another chatbot. A quiet assistant that does one thing
              extremely well — helping you decide what to do next.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { value: "9h", label: "Protected focus per week" },
                { value: "1 click", label: "To accept your daily plan" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[26px] font-medium tracking-[-0.03em] text-[#0d1420]">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[12.5px] text-[#707a89]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}