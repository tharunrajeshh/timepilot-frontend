"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full bg-[#f6f4ee] pt-[112px] pb-20 lg:pt-[140px] lg:pb-28"
    >
      <div className="tp-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ═══════════════════════════════════════════════════
              LEFT — Editorial text column
          ═══════════════════════════════════════════════════ */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(13,20,32,0.1)] bg-[#fffdf8] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c49a61]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344052]">
                Intelligent time management
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-7 text-[42px] font-medium leading-[1.02] tracking-[-0.04em] text-[#0d1420] sm:text-[54px] lg:text-[64px] xl:text-[72px]">
              Plan less.
              <br />
              <span className="tp-serif italic text-[#344052]">
                Do more of what matters.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[520px] text-[16px] leading-[1.65] text-[#344052] sm:text-[17px]">
              TimePilot turns your tasks, priorities and available time into a
              focused day you can actually finish.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/signup" variant="primary" size="lg">
                Get started
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </Button>
              <Button href="#features" variant="secondary" size="lg">
                Explore TimePilot
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[rgba(13,20,32,0.08)] pt-6 text-[13px] text-[#344052]">
              {["AI-assisted planning", "Smart scheduling", "Focus analytics"].map(
                (label) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(196,154,97,0.15)] text-[#c49a61]">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {label}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              RIGHT — Navy panel with orbital clock
          ═══════════════════════════════════════════════════ */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[28px] border border-[rgba(13,20,32,0.08)] bg-[#0a1422] p-8 lg:p-10"
              style={{ boxShadow: "0 24px 70px rgba(13,20,32,0.08)" }}
            >
              {/* Subtle gold + blue aurora */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 75% 15%, rgba(196,154,97,0.14), transparent 45%), radial-gradient(circle at 15% 85%, rgba(138,163,196,0.1), transparent 50%)",
                }}
              />

              {/* Header inside panel */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c49a61]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f6f4ee]/50">
                    Today
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#f6f4ee]/40">
                  Live
                </span>
              </div>

              {/* Clock visual */}
              <div className="relative flex items-center justify-center py-10">
                <OrbitalClockVisual />
              </div>

              {/* Focus card */}
              <div className="relative rounded-[16px] border border-[rgba(246,244,238,0.08)] bg-[rgba(246,244,238,0.04)] p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[rgba(196,154,97,0.14)]">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#c49a61]" />
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-[#f6f4ee]">
                        Focus mode
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#f6f4ee]/45">
                        9:00 — 11:00 protected
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] font-medium text-[#c49a61]">
                    94%
                  </span>
                </div>
              </div>
            </div>

            {/* Small badge outside panel — subtle */}
            <div className="absolute -bottom-3 -right-3 hidden items-center gap-2 rounded-full border border-[rgba(13,20,32,0.08)] bg-[#fffdf8] px-3.5 py-2 shadow-[0_10px_30px_rgba(13,20,32,0.06)] sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4f8b72]" />
              <span className="text-[11px] font-medium text-[#0d1420]">
                Optimized for today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Local import so we don't create another file */
import OrbitalClockVisual from "@/components/auth/OrbitalClockVisual";