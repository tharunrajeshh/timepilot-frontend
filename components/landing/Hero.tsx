"use client";

import Link from "next/link";
import Starfield from "@/components/landing/Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#050608]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="absolute inset-0 -z-30 bg-[#050608]" />

      {/* Soft SaaS glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[5%]
          -z-20
          h-[700px]
          w-[1000px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(139,92,246,0.13)_0%,rgba(59,130,246,0.06)_35%,transparent_70%)]
          blur-3xl
        "
      />

      {/* Subtle grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          opacity-[0.18]
          [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]
          [background-size:64px_64px]
          [mask-image:linear-gradient(to_bottom,black,transparent_75%)]
        "
      />

      {/* Very subtle stars */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          opacity-40
        "
      >
        <Starfield />
      </div>

      {/* Top fade */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          -z-10
          h-40
          bg-gradient-to-b
          from-[#050608]
          to-transparent
        "
      />

      {/* =====================================================
          HERO CONTENT
          ===================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-[1280px]
          flex-col
          items-center
          px-5
          pb-16
          pt-[150px]
          text-center
          sm:px-8
          sm:pb-20
          lg:px-10
          lg:pt-[165px]
        "
      >
        {/* =================================================
            BADGE
            ================================================= */}

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/[0.10]
            bg-white/[0.045]
            px-3.5
            py-2
            shadow-[0_8px_30px_rgba(0,0,0,0.15)]
            backdrop-blur-xl
          "
        >
          <span
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-white/[0.08]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#A78BFA]
                shadow-[0_0_12px_rgba(167,139,250,0.9)]
              "
            />
          </span>

          <span
            className="
              text-[11px]
              font-medium
              tracking-[0.02em]
              text-white/65
            "
          >
            Your intelligent productivity workspace
          </span>
        </div>

        {/* =================================================
            HEADLINE
            ================================================= */}

        <h1
          className="
            mt-8
            max-w-[900px]
            text-[clamp(48px,7vw,86px)]
            font-semibold
            leading-[0.98]
            tracking-[-0.055em]
            text-white
          "
        >
          Plan less.
          <br />

          <span
            className="
              bg-gradient-to-r
              from-white
              via-white
              to-white/55
              bg-clip-text
              text-transparent
            "
          >
            Accomplish more.
          </span>
        </h1>

        {/* =================================================
            DESCRIPTION
            ================================================= */}

        <p
          className="
            mt-7
            max-w-[650px]
            text-[16px]
            leading-7
            text-white/55
            sm:text-[18px]
            sm:leading-8
          "
        >
          TimePilot brings your tasks, schedule, priorities,
          and AI planning into one focused workspace built
          to help you make the most of every day.
        </p>

        {/* =================================================
            CTA
            ================================================= */}

        <div
          className="
            mt-9
            flex
            flex-col
            items-center
            gap-3
            sm:flex-row
          "
        >
          <Link
            href="/signup"
            className="
              inline-flex
              h-12
              min-w-[160px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white
              px-6
              text-sm
              font-semibold
              text-[#08090B]
              shadow-[0_12px_35px_rgba(255,255,255,0.10)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#F4F4F5]
            "
          >
            Start for free
            <span className="text-black/45">→</span>
          </Link>

          <Link
            href="#features"
            className="
              inline-flex
              h-12
              min-w-[160px]
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.12]
              bg-white/[0.035]
              px-6
              text-sm
              font-medium
              text-white/80
              backdrop-blur-xl
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-white/20
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            Explore TimePilot
          </Link>
        </div>

        {/* =================================================
            TRUST / BENEFITS
            ================================================= */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-7
            gap-y-3
            text-[12px]
            text-white/40
          "
        >
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            AI-powered planning
          </span>

          <span className="hidden h-3 w-px bg-white/10 sm:block" />

          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            Smart scheduling
          </span>

          <span className="hidden h-3 w-px bg-white/10 sm:block" />

          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-violet-400" />
            Productivity analytics
          </span>
        </div>

        {/* =================================================
            PRODUCT PREVIEW
            ================================================= */}

        <div
          className="
            relative
            mt-20
            w-full
            max-w-[1120px]
          "
        >
          {/* Glow behind dashboard */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[800px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[radial-gradient(circle,rgba(99,102,241,0.15),transparent_68%)]
              blur-3xl
            "
          />

          {/* Browser frame */}

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.11]
              bg-[#0B0C10]
              text-left
              shadow-[0_35px_100px_rgba(0,0,0,0.45)]
            "
          >
            {/* Browser header */}

            <div
              className="
                flex
                h-11
                items-center
                border-b
                border-white/[0.07]
                bg-[#0E0F13]
                px-4
              "
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>

              <div
                className="
                  mx-auto
                  flex
                  h-7
                  w-[280px]
                  items-center
                  justify-center
                  rounded-md
                  bg-white/[0.035]
                  text-[10px]
                  text-white/25
                "
              >
                app.timepilot.ai
              </div>

              <div className="w-12" />
            </div>

            {/* Dashboard */}

            <div className="flex min-h-[430px]">
              {/* Sidebar */}

              <aside
                className="
                  hidden
                  w-[190px]
                  shrink-0
                  border-r
                  border-white/[0.07]
                  bg-[#090A0D]
                  p-4
                  md:block
                "
              >
                <div className="mb-7 flex items-center gap-2">
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      bg-white
                      text-[11px]
                      font-bold
                      text-black
                    "
                  >
                    T
                  </div>

                  <span className="text-xs font-semibold text-white/80">
                    TimePilot
                  </span>
                </div>

                <div className="space-y-1">
                  <DashboardNav active>
                    Overview
                  </DashboardNav>

                  <DashboardNav>
                    My tasks
                  </DashboardNav>

                  <DashboardNav>
                    Calendar
                  </DashboardNav>

                  <DashboardNav>
                    AI Planner
                  </DashboardNav>

                  <DashboardNav>
                    Analytics
                  </DashboardNav>
                </div>

                <div className="mt-8 border-t border-white/[0.06] pt-4">
                  <p className="px-2 text-[9px] font-medium uppercase tracking-wider text-white/25">
                    Workspace
                  </p>

                  <div className="mt-2">
                    <DashboardNav>
                      Settings
                    </DashboardNav>
                  </div>
                </div>
              </aside>

              {/* Main dashboard */}

              <div className="flex-1 bg-[#0B0C10] p-5 sm:p-7">
                {/* Dashboard top */}

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] text-white/35">
                      Tuesday, September 23
                    </p>

                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-white/90">
                      Good afternoon 👋
                    </h2>
                  </div>

                  <div
                    className="
                      hidden
                      rounded-lg
                      border
                      border-white/[0.08]
                      bg-white/[0.035]
                      px-3
                      py-2
                      text-[10px]
                      text-white/45
                      sm:block
                    "
                  >
                    6h 42m focused
                  </div>
                </div>

                {/* Stats */}

                <div
                  className="
                    mt-6
                    grid
                    grid-cols-2
                    gap-3
                    lg:grid-cols-4
                  "
                >
                  <DashboardStat
                    label="Tasks completed"
                    value="18"
                    change="+24%"
                  />

                  <DashboardStat
                    label="Focus time"
                    value="6h 42m"
                    change="+18%"
                  />

                  <DashboardStat
                    label="Goals"
                    value="8 / 10"
                    change="+12%"
                  />

                  <DashboardStat
                    label="Productivity"
                    value="87%"
                    change="+9%"
                  />
                </div>

                {/* Main cards */}

                <div
                  className="
                    mt-4
                    grid
                    gap-4
                    lg:grid-cols-[1.35fr_0.65fr]
                  "
                >
                  {/* Schedule */}

                  <div
                    className="
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-white/[0.018]
                      p-4
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-white/70">
                          Today's schedule
                        </p>

                        <p className="mt-1 text-[10px] text-white/30">
                          Your optimized day
                        </p>
                      </div>

                      <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[9px] text-violet-300">
                        AI optimized
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <ScheduleRow
                        time="09:00"
                        title="Deep work"
                        tag="2h"
                        active
                      />

                      <ScheduleRow
                        time="11:15"
                        title="Team stand-up"
                        tag="30m"
                      />

                      <ScheduleRow
                        time="12:00"
                        title="Project analysis"
                        tag="1h 30m"
                      />

                      <ScheduleRow
                        time="14:00"
                        title="Client meeting"
                        tag="45m"
                      />

                      <ScheduleRow
                        time="15:00"
                        title="Focus block"
                        tag="2h"
                      />
                    </div>
                  </div>

                  {/* AI panel */}

                  <div
                    className="
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-gradient-to-br
                      from-violet-500/[0.08]
                      to-white/[0.015]
                      p-4
                    "
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-violet-500/15
                          text-violet-300
                        "
                      >
                        ✦
                      </div>

                      <div>
                        <p className="text-xs font-medium text-white/75">
                          AI Planner
                        </p>

                        <p className="text-[9px] text-white/30">
                          Your next best action
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-[10px] leading-5 text-white/45">
                        You have a 90-minute focus window before
                        your next meeting.
                      </p>

                      <div className="mt-4 rounded-lg border border-violet-400/10 bg-violet-500/[0.06] p-3">
                        <p className="text-[10px] font-medium text-violet-200">
                          Suggested
                        </p>

                        <p className="mt-1 text-xs font-medium text-white/75">
                          Finish dashboard analysis
                        </p>

                        <p className="mt-1 text-[9px] text-white/30">
                          Estimated time: 75 minutes
                        </p>
                      </div>
                    </div>

                    <button
                      className="
                        mt-4
                        w-full
                        rounded-lg
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        py-2
                        text-[10px]
                        font-medium
                        text-white/55
                      "
                    >
                      Apply suggestion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              -bottom-16
              h-40
              w-[70%]
              -translate-x-1/2
              rounded-full
              bg-violet-500/[0.08]
              blur-3xl
            "
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DASHBOARD COMPONENTS
   ========================================================= */

function DashboardNav({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`
        rounded-lg
        px-2.5
        py-2
        text-[10px]
        ${
          active
            ? "bg-white/[0.07] text-white/75"
            : "text-white/30"
        }
      `}
    >
      {children}
    </div>
  );
}

function DashboardStat({
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
      className="
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.018]
        p-3
      "
    >
      <p className="text-[9px] text-white/30">
        {label}
      </p>

      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-sm font-semibold text-white/80">
          {value}
        </p>

        <span className="text-[8px] text-emerald-400/70">
          {change}
        </span>
      </div>
    </div>
  );
}

function ScheduleRow({
  time,
  title,
  tag,
  active = false,
}: {
  time: string;
  title: string;
  tag: string;
  active?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        rounded-lg
        border
        px-3
        py-2.5
        ${
          active
            ? "border-violet-400/10 bg-violet-500/[0.06]"
            : "border-white/[0.05] bg-white/[0.015]"
        }
      `}
    >
      <span className="w-9 text-[9px] text-white/25">
        {time}
      </span>

      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${
            active
              ? "bg-violet-400"
              : "bg-white/15"
          }
        `}
      />

      <span className="flex-1 text-[10px] text-white/55">
        {title}
      </span>

      <span className="text-[8px] text-white/25">
        {tag}
      </span>
    </div>
  );
}