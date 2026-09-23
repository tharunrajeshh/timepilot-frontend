"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clock3,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import Starfield from "./Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#03060b] text-white"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] scale-[1.02] object-cover object-center opacity-45 motion-reduce:hidden"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
            type="video/mp4"
          />
        </video>

        {/* Video contrast */}
        <div className="absolute inset-0 bg-[#03060b]/60" />

        {/* Center spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(70,135,255,0.16),transparent_35%)]" />

        {/* Top navbar blend */}
        <div className="absolute inset-x-0 top-0 z-[8] h-40 bg-gradient-to-b from-[#03060b] via-[#03060b]/80 to-transparent" />

        {/* Earth */}
        <div className="absolute bottom-[-18%] left-1/2 z-[4] h-[70vw] min-h-[440px] w-full max-w-[1250px] -translate-x-1/2">
          <Image
            src="/images/earth.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 120vw, 1250px"
            className="select-none object-contain drop-shadow-[0_-20px_90px_rgba(40,130,255,0.25)]"
          />
        </div>

        {/* Earth glow */}
        <div className="absolute bottom-[-7%] left-1/2 z-[3] h-[280px] w-full max-w-[1050px] -translate-x-1/2 rounded-full bg-blue-400/[0.14] blur-[120px]" />

        {/* Top darkness */}
        <div className="absolute inset-x-0 top-0 z-[6] h-[42%] bg-gradient-to-b from-black/70 via-black/20 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 z-[6] h-[38%] bg-gradient-to-t from-[#03060b] via-[#03060b]/75 to-transparent" />

        {/* Vignette */}
        <div className="absolute inset-0 z-[7] bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.68)_100%)]" />
      </div>

      {/* Falling stars */}
      <div className="pointer-events-none relative z-10 motion-reduce:hidden">
        <Starfield />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 mx-auto grid min-h-[100svh] max-w-[1240px] items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pt-28">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white/75 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            </span>

            <span>AI-powered daily planning</span>

            <ArrowUpRight size={13} className="text-white/45" />
          </div>

          {/* Heading */}
          <h1
            id="hero-title"
            className="mx-auto mt-8 max-w-[780px] text-[clamp(3.6rem,8vw,7.8rem)] font-semibold leading-[0.86] tracking-[-0.075em] lg:mx-0"
          >
            <span className="block text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)]">
              Take control
            </span>

            <span className="mt-4 block bg-gradient-to-r from-white via-white/85 to-white/35 bg-clip-text font-normal text-transparent drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)]">
              of your time.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-[620px] text-[15px] leading-7 text-white/65 drop-shadow-[0_5px_25px_rgba(0,0,0,0.95)] sm:text-lg sm:leading-8 lg:mx-0">
            TimePilot turns scattered tasks, competing priorities, and open
            calendar space into a clear plan for the day—so you can focus on
            the work that matters.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/signup"
              className="group flex h-[60px] w-full items-center justify-center gap-4 rounded-full bg-white px-7 text-[15px] font-semibold text-black shadow-[0_15px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#03060b] sm:w-auto"
            >
              <span>Get started</span>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={17} strokeWidth={2.2} />
              </span>
            </Link>

            <a
              href="#preview"
              className="group flex h-[60px] w-full items-center justify-center gap-5 rounded-full border border-white/20 bg-white/[0.06] px-7 text-[15px] font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#03060b] sm:w-auto"
            >
              <span>Explore TimePilot</span>

              <ArrowDown
                size={18}
                className="text-white/70 transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
          </div>

          {/* Features */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-white/55 lg:justify-start">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                <Check size={12} />
              </span>
              <span>AI-assisted planning</span>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                <Check size={12} />
              </span>
              <span>Smart scheduling</span>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <Check size={12} />
              </span>
              <span>Focus analytics</span>
            </div>
          </div>

          {/* Bottom label */}
          <div className="mt-12 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/30 lg:justify-start">
            <span className="h-px w-10 bg-white/15" />
            <span>Plan your day · Own your time</span>
            <span className="h-px w-10 bg-white/15" />
          </div>
        </div>

        {/* PRODUCT PREVIEW */}
        <div
          id="preview"
          className="relative mx-auto w-full max-w-[540px] scroll-mt-24 lg:mx-0 lg:ml-auto"
        >
          {/* Glow */}
          <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Floating AI badge */}
          <div className="absolute -left-5 top-12 z-20 hidden items-center gap-2 rounded-2xl border border-white/15 bg-[#101a2a]/80 px-4 py-3 text-xs text-white/80 shadow-2xl backdrop-blur-xl sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-violet-400/15 text-violet-200">
              <Sparkles size={14} />
            </span>
            <span>Plan optimized</span>
          </div>

          {/* Floating focus badge */}
          <div className="absolute -right-4 bottom-16 z-20 hidden items-center gap-2 rounded-2xl border border-white/15 bg-[#101a2a]/80 px-4 py-3 text-xs text-white/80 shadow-2xl backdrop-blur-xl sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
              <Zap size={14} />
            </span>
            <span>Focus mode active</span>
          </div>

          {/* Dashboard card */}
          <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-[#08101d]/75 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-6">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(53,110,255,0.08))]" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-white/45">
                    <Clock3 size={13} />
                    <span>Today&apos;s focus</span>
                  </div>

                  <h2 className="mt-2 text-xl font-medium tracking-[-0.03em] text-white">
                    A clear plan for a focused day
                  </h2>
                </div>

                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-right">
                  <div className="text-lg font-semibold text-emerald-200">
                    68%
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-200/60">
                    on track
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-[11px] text-white/40">
                  <span>Daily progress</span>
                  <span>4 of 6 tasks</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-300 shadow-[0_0_20px_rgba(96,165,250,0.7)]" />
                </div>
              </div>

              {/* Tasks */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-400/15 text-violet-200">
                    <Target size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium text-white/90">
                        Deep work block
                      </span>
                      <span className="text-[11px] text-white/35">
                        09:00
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-white/45">
                      Finalize launch strategy
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-400/10 px-2 py-1 text-[10px] text-blue-200">
                    Next
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
                    <Check size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium text-white/55 line-through">
                        Review project notes
                      </span>
                      <span className="text-[11px] text-white/30">
                        Done
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-white/35">
                      Completed ahead of schedule
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-400/15 text-blue-200">
                    <Clock3 size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium text-white/80">
                        Team sync
                      </span>
                      <span className="text-[11px] text-white/35">
                        14:30
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-white/40">
                      Keep it short and focused
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Sparkles size={14} className="text-violet-300" />
                  <span>TimePilot suggestion</span>
                </div>

                <span className="text-xs font-medium text-white/80">
                  Protect 2h for deep work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-gradient-to-t from-[#03060b] to-transparent"
      />
    </section>
  );
}