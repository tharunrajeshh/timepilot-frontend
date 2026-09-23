"use client";

import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTA() {
  // Format the real date — no hardcoded "Saturday"
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <section className="w-full bg-[#f6f4ee] py-20 lg:py-28">
      <div className="tp-container">
        <div
          className="relative overflow-hidden rounded-[28px] border border-[rgba(13,20,32,0.08)] bg-[#0a1422]"
          style={{ boxShadow: "0 24px 70px rgba(13,20,32,0.12)" }}
        >
          {/* Subtle gold glow */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, rgba(196,154,97,0.14), transparent 45%), radial-gradient(circle at 15% 90%, rgba(138,163,196,0.08), transparent 50%)",
            }}
          />

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16">
            {/* ─── LEFT — Copy ─── */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c49a61]">
                Get started today
              </p>
              <h2 className="tp-serif mt-4 text-[34px] leading-[1.1] tracking-[-0.02em] text-[#f6f4ee] sm:text-[42px]">
                Take control of your time.
              </h2>
              <p className="mt-5 max-w-[440px] text-[15.5px] leading-7 text-[#f6f4ee]/55">
                Built for people who want to work with more intention. Free to
                start, no credit card required.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/signup" variant="primary" size="lg">
                  Get started
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </Button>
                <Button href="/login" variant="ghost" size="lg">
                  <span className="text-[#f6f4ee]">Log in</span>
                </Button>
              </div>
            </div>

            {/* ─── RIGHT — Live "today" card ─── */}
            <div className="rounded-[20px] border border-[rgba(246,244,238,0.08)] bg-[rgba(246,244,238,0.03)] p-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c49a61]" />
                <span className="text-[11px] font-medium text-[#f6f4ee]/55">
                  {todayLabel}
                </span>
              </div>

              <p className="mt-5 text-[18px] font-medium leading-[1.35] tracking-[-0.02em] text-[#f6f4ee]">
                Today&apos;s focus time:{" "}
                <span className="text-[#c49a61]">4h 32m protected.</span>
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { label: "Morning block", value: "9:00 — 11:00" },
                  { label: "Afternoon block", value: "14:30 — 16:00" },
                  { label: "Protected breaks", value: "3" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between border-b border-[rgba(246,244,238,0.06)] pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-[12.5px] text-[#f6f4ee]/50">
                      {row.label}
                    </span>
                    <span className="text-[13px] font-medium text-[#f6f4ee]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}