"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Starfield from "@/components/landing/Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050608] text-white"
    >
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[#050608]" />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-[8%] -z-20
          h-[500px] w-[700px] -translate-x-1/2 rounded-full
          bg-[radial-gradient(circle,rgba(99,102,241,0.14),transparent_68%)]
          blur-3xl sm:h-[650px] sm:w-[900px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-20 opacity-[0.12]
          [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
          [background-size:64px_64px]
          [mask-image:linear-gradient(to_bottom,black,transparent_72%)]
        "
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
      >
        <Starfield />
      </div>

      {/* Hero content */}
      <div
        className="
          relative mx-auto flex min-h-[100svh] w-full max-w-[1280px]
          flex-col items-center px-5 pb-16 pt-28 text-center
          sm:px-8 sm:pt-36 lg:px-10 lg:pt-40
        "
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 backdrop-blur-xl">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]"
          />
          <span className="text-[10px] font-medium tracking-[0.08em] text-white/65 sm:text-xs">
            Your intelligent productivity workspace
          </span>
        </div>

        <h1
          id="hero-title"
          className="
            mt-8 max-w-[900px] px-2 text-5xl font-semibold leading-[0.98]
            tracking-[-0.055em] sm:text-6xl md:text-7xl
            lg:text-[82px]
          "
        >
          <span className="block">Plan less.</span>
          <span className="block bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-transparent">
            Accomplish more.
          </span>
        </h1>

        <p className="mt-7 max-w-[640px] px-2 text-[15px] leading-7 text-white/60 sm:text-[17px] sm:leading-8">
          Bring your tasks, schedule, and priorities together. TimePilot helps
          you plan your day with clarity and spend more time on meaningful work.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/signup"
            className="
              inline-flex h-12 w-full min-w-[170px] items-center justify-center
              gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#08090B]
              shadow-[0_12px_35px_rgba(255,255,255,0.10)]
              transition duration-200 hover:-translate-y-0.5 hover:bg-[#F4F4F5]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-violet-400 focus-visible:ring-offset-2
              focus-visible:ring-offset-[#050608]
              sm:w-auto
            "
          >
            Get started for free
            <span aria-hidden="true" className="text-[#666]">
              →
            </span>
          </Link>

          <Link
            href="#features"
            className="
              inline-flex h-12 w-full min-w-[170px] items-center justify-center
              rounded-xl border border-white/15 bg-white/[0.035] px-6
              text-sm font-medium text-white/80 backdrop-blur-xl
              transition duration-200 hover:-translate-y-0.5
              hover:border-white/25 hover:bg-white/[0.06] hover:text-white
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-violet-400 focus-visible:ring-offset-2
              focus-visible:ring-offset-[#050608]
              sm:w-auto
            "
          >
            Explore the workspace
          </Link>
        </div>

        <ul
          aria-label="TimePilot benefits"
          className="
            mt-8 flex max-w-[700px] flex-wrap items-center justify-center
            gap-x-6 gap-y-3 text-xs text-white/45
          "
        >
          <Benefit color="bg-emerald-400">AI-powered planning</Benefit>
          <Benefit color="bg-blue-400">Smart scheduling</Benefit>
          <Benefit color="bg-violet-400">Productivity insights</Benefit>
        </ul>

        {/* Product preview */}
        <div className="relative mt-14 w-full max-w-[1100px] sm:mt-16">
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute left-1/2 top-1/2 h-[350px]
              w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full
              bg-violet-500/[0.08] blur-3xl sm:h-[400px] sm:w-[700px]
            "
          />

          <figure
            role="img"
            aria-label="Preview of the TimePilot productivity dashboard, including task progress, today's schedule, and an AI planning suggestion."
            className="
              relative overflow-hidden rounded-2xl border border-white/10
              bg-[#0B0C10] text-left
              shadow-[0_30px_90px_rgba(0,0,0,0.45)]
            "
          >
            <div className="flex h-10 items-center border-b border-white/[0.07] bg-[#0E0F13] px-4">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>

              <div className="mx-auto hidden h-6 w-[260px] items-center justify-center rounded-md bg-white/[0.035] text-[9px] text-white/25 sm:flex">
                app.timepilot.ai
              </div>
            </div>

            <div className="flex min-h-[360px]">
              <aside className="hidden w-[180px] shrink-0 border-r border-white/[0.07] bg-[#090A0D] p-4 md:block">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[11px] font-bold text-black">
                    T
                  </div>
                  <span className="text-xs font-semibold text-white/75">
                    TimePilot
                  </span>
                </div>

                <nav aria-label="Dashboard preview" className="mt-7 space-y-1">
                  <PreviewNav active>Overview</PreviewNav>
                  <PreviewNav>My tasks</PreviewNav>
                  <PreviewNav>Calendar</PreviewNav>
                  <PreviewNav>AI Planner</PreviewNav>
                  <PreviewNav>Analytics</PreviewNav>
                </nav>
              </aside>

              <div className="min-w-0 flex-1 p-4 sm:p-7">
                <div>
                  <p className="text-[10px] text-white/35">
                    Tuesday, September 23
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-white/85">
                    Good afternoon
                    <span aria-hidden="true"> 👋</span>
                  </h2>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <PreviewStat label="Tasks completed" value="18" />
                  <PreviewStat label="Focus time" value="6h 42m" />
                  <PreviewStat label="Goals" value="8 / 10" />
                  <PreviewStat label="Productivity" value="87%" />
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.018] p-4">
                    <p className="text-xs text-white/65">Today&apos;s schedule</p>

                    <div className="mt-4 space-y-2">
                      <PreviewTask time="09:00" title="Deep work" active />
                      <PreviewTask time="11:15" title="Team stand-up" />
                      <PreviewTask time="12:00" title="Project analysis" />
                      <PreviewTask time="14:00" title="Client meeting" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-violet-400/10 bg-violet-500/[0.05] p-4">
                    <p className="text-xs text-white/65">
                      <span aria-hidden="true">✦ </span>
                      AI Planner
                    </p>

                    <p className="mt-5 text-[10px] leading-5 text-white/45">
                      You have a 90-minute focus window before your next meeting.
                    </p>

                    <div className="mt-4 rounded-lg border border-violet-400/10 bg-violet-500/[0.05] p-3">
                      <p className="text-[9px] text-violet-300">Suggested</p>
                      <p className="mt-1 text-xs text-white/75">
                        Finish dashboard analysis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050608] to-transparent"
      />
    </section>
  );
}

function Benefit({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <li className="flex items-center gap-2">
      <span aria-hidden="true" className={`h-1 w-1 rounded-full ${color}`} />
      {children}
    </li>
  );
}

function PreviewNav({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-2.5 py-2 text-[10px] ${
        active ? "bg-white/[0.07] text-white/80" : "text-white/35"
      }`}
    >
      {children}
    </div>
  );
}

function PreviewStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.018] p-3">
      <p className="text-[9px] text-white/35">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white/80">{value}</p>
    </div>
  );
}

function PreviewTask({
  time,
  title,
  active = false,
}: {
  time: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
        active
          ? "border-violet-400/10 bg-violet-500/[0.06]"
          : "border-white/[0.05] bg-white/[0.015]"
      }`}
    >
      <span className="w-9 text-[9px] text-white/30">{time}</span>
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-violet-400" : "bg-white/20"
        }`}
      />
      <span className="text-[10px] text-white/60">{title}</span>
    </div>
  );
}