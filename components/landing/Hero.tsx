"use client";

import type { ReactNode } from "react";
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

      {/* Main ambient glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          -z-20
          h-[700px]
          w-[1000px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(99,102,241,0.13),transparent_68%)]
          blur-3xl
        "
      />

      {/* Secondary purple glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[15%]
          top-[25%]
          -z-20
          h-[400px]
          w-[400px]
          rounded-full
          bg-violet-500/[0.035]
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
          opacity-[0.10]
          [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
          [background-size:64px_64px]
          [mask-image:linear-gradient(to_bottom,black,transparent_75%)]
        "
      />

      {/* =====================================================
          FALLING STARS
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          opacity-30
        "
      >
        <Starfield />
      </div>

      {/* =====================================================
          TOP FADE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          -z-10
          h-32
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
          min-h-[900px]
          w-full
          max-w-[1280px]
          flex-col
          items-center
          px-5
          pb-20
          pt-[180px]
          text-center
          sm:px-8
          lg:px-10
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
              h-1.5
              w-1.5
              rounded-full
              bg-violet-400
              shadow-[0_0_12px_rgba(167,139,250,0.9)]
            "
          />

          <span
            className="
              text-[10px]
              font-medium
              tracking-[0.08em]
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
            w-full
            max-w-[900px]
            px-2
            text-[clamp(46px,6.5vw,82px)]
            font-semibold
            leading-[0.98]
            tracking-[-0.055em]
            text-white
          "
        >
          <span className="block">
            Plan less.
          </span>

          <span
            className="
              block
              whitespace-normal
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
            w-full
            max-w-[650px]
            px-2
            text-[15px]
            leading-7
            text-white/60
            sm:text-[17px]
            sm:leading-8
          "
        >
          Bring your tasks, schedule, and priorities together.
          TimePilot helps you plan your day with clarity and
          spend more time on meaningful work.
        </p>

        {/* =================================================
            CTA BUTTONS
            ================================================= */}

        <div
          className="
            mt-9
            flex
            w-full
            flex-col
            items-center
            justify-center
            gap-3
            sm:w-auto
            sm:flex-row
          "
        >
          {/* PRIMARY BUTTON */}

          <Link
            href="/signup"
            className="
              inline-flex
              h-12
              w-full
              min-w-[180px]
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white
              bg-white
              px-6
              text-sm
              font-semibold
              !text-[#08090B]
              shadow-[0_12px_35px_rgba(255,255,255,0.12)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#F4F4F5]
              sm:w-auto
            "
          >
            <span
              className="
                !text-[#08090B]
                opacity-100
              "
            >
              Start for free
            </span>

            <span
              aria-hidden="true"
              className="
                !text-[#555555]
                opacity-100
              "
            >
              →
            </span>
          </Link>

          {/* SECONDARY BUTTON */}

          <Link
            href="#features"
            className="
              inline-flex
              h-12
              w-full
              min-w-[180px]
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.14]
              bg-white/[0.035]
              px-6
              text-sm
              font-medium
              !text-white
              backdrop-blur-xl
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-white/20
              hover:bg-white/[0.07]
              sm:w-auto
            "
          >
            <span className="!text-white">
              Explore the workspace
            </span>
          </Link>
        </div>

        {/* =================================================
            BENEFITS
            ================================================= */}

        <div
          className="
            mt-8
            flex
            max-w-[760px]
            flex-wrap
            items-center
            justify-center
            gap-x-6
            gap-y-3
            text-[12px]
            text-white/45
          "
        >
          <span className="flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
              "
            />
            AI-powered planning
          </span>

          <span
            className="
              hidden
              h-3
              w-px
              bg-white/10
              sm:block
            "
          />

          <span className="flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-400
              "
            />
            Smart scheduling
          </span>

          <span
            className="
              hidden
              h-3
              w-px
              bg-white/10
              sm:block
            "
          />

          <span className="flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-violet-400
              "
            />
            Productivity insights
          </span>
        </div>

        {/* =================================================
            PRODUCT PREVIEW
            ================================================= */}

        <div
          className="
            relative
            mt-16
            w-full
            max-w-[1100px]
          "
        >
          {/* Dashboard glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[450px]
              w-[750px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-violet-500/[0.08]
              blur-3xl
            "
          />

          {/* =================================================
              BROWSER FRAME
              ================================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.10]
              bg-[#0B0C10]
              text-left
              shadow-[0_35px_100px_rgba(0,0,0,0.50)]
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
                  hidden
                  h-7
                  w-[280px]
                  items-center
                  justify-center
                  rounded-md
                  bg-white/[0.035]
                  text-[9px]
                  text-white/20
                  sm:flex
                "
              >
                app.timepilot.ai
              </div>

              <div className="w-[54px]" />
            </div>

            {/* =================================================
                DASHBOARD
                ================================================= */}

            <div className="flex min-h-[390px]">
              {/* Sidebar */}

              <aside
                className="
                  hidden
                  w-[185px]
                  shrink-0
                  border-r
                  border-white/[0.07]
                  bg-[#090A0D]
                  p-4
                  md:block
                "
              >
                {/* Logo */}

                <div className="flex items-center gap-2">
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

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-white/80
                    "
                  >
                    TimePilot
                  </span>
                </div>

                {/* Navigation */}

                <div className="mt-7 space-y-1">
                  <PreviewNav active>
                    Overview
                  </PreviewNav>

                  <PreviewNav>
                    My tasks
                  </PreviewNav>

                  <PreviewNav>
                    Calendar
                  </PreviewNav>

                  <PreviewNav>
                    AI Planner
                  </PreviewNav>

                  <PreviewNav>
                    Analytics
                  </PreviewNav>
                </div>

                {/* Workspace */}

                <div
                  className="
                    mt-8
                    border-t
                    border-white/[0.06]
                    pt-4
                  "
                >
                  <p
                    className="
                      px-2
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-wider
                      text-white/20
                    "
                  >
                    Workspace
                  </p>

                  <div className="mt-2">
                    <PreviewNav>
                      Settings
                    </PreviewNav>
                  </div>
                </div>
              </aside>

              {/* =================================================
                  DASHBOARD MAIN
                  ================================================= */}

              <main
                className="
                  min-w-0
                  flex-1
                  bg-[#0B0C10]
                  p-5
                  sm:p-7
                "
              >
                {/* Header */}

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] text-white/30">
                      Tuesday, September 23
                    </p>

                    <h2
                      className="
                        mt-1
                        text-lg
                        font-semibold
                        text-white/80
                      "
                    >
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
                      text-[9px]
                      text-white/40
                      sm:block
                    "
                  >
                    6h 42m focused
                  </div>
                </div>

                {/* =================================================
                    STATS
                    ================================================= */}

                <div
                  className="
                    mt-5
                    grid
                    grid-cols-2
                    gap-3
                    lg:grid-cols-4
                  "
                >
                  <PreviewStat
                    label="Tasks completed"
                    value="18"
                    change="+24%"
                  />

                  <PreviewStat
                    label="Focus time"
                    value="6h 42m"
                    change="+18%"
                  />

                  <PreviewStat
                    label="Goals"
                    value="8 / 10"
                    change="+12%"
                  />

                  <PreviewStat
                    label="Productivity"
                    value="87%"
                    change="+9%"
                  />
                </div>

                {/* =================================================
                    MAIN CARDS
                    ================================================= */}

                <div
                  className="
                    mt-4
                    grid
                    gap-4
                    lg:grid-cols-[1.4fr_0.6fr]
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
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <div>
                        <p
                          className="
                            text-xs
                            font-medium
                            text-white/65
                          "
                        >
                          Today's schedule
                        </p>

                        <p
                          className="
                            mt-1
                            text-[9px]
                            text-white/25
                          "
                        >
                          Your optimized day
                        </p>
                      </div>

                      <span
                        className="
                          rounded-md
                          bg-violet-500/10
                          px-2
                          py-1
                          text-[8px]
                          text-violet-300
                        "
                      >
                        AI optimized
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <PreviewTask
                        time="09:00"
                        title="Deep work"
                        duration="2h"
                        active
                      />

                      <PreviewTask
                        time="11:15"
                        title="Team stand-up"
                        duration="30m"
                      />

                      <PreviewTask
                        time="12:00"
                        title="Project analysis"
                        duration="1h 30m"
                      />

                      <PreviewTask
                        time="14:00"
                        title="Client meeting"
                        duration="45m"
                      />

                      <PreviewTask
                        time="15:00"
                        title="Focus block"
                        duration="2h"
                      />
                    </div>
                  </div>

                  {/* AI Planner */}

                  <div
                    className="
                      rounded-xl
                      border
                      border-violet-400/[0.10]
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
                        <p
                          className="
                            text-xs
                            font-medium
                            text-white/70
                          "
                        >
                          AI Planner
                        </p>

                        <p
                          className="
                            text-[9px]
                            text-white/25
                          "
                        >
                          Your next best action
                        </p>
                      </div>
                    </div>

                    <p
                      className="
                        mt-5
                        text-[10px]
                        leading-5
                        text-white/40
                      "
                    >
                      You have a 90-minute focus window
                      before your next meeting.
                    </p>

                    <div
                      className="
                        mt-4
                        rounded-lg
                        border
                        border-violet-400/[0.10]
                        bg-violet-500/[0.05]
                        p-3
                      "
                    >
                      <p
                        className="
                          text-[9px]
                          font-medium
                          text-violet-300
                        "
                      >
                        Suggested
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          font-medium
                          text-white/70
                        "
                      >
                        Finish dashboard analysis
                      </p>

                      <p
                        className="
                          mt-1
                          text-[9px]
                          text-white/25
                        "
                      >
                        Estimated time: 75 minutes
                      </p>
                    </div>

                    <button
                      type="button"
                      className="
                        mt-4
                        w-full
                        rounded-lg
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        py-2
                        text-[9px]
                        font-medium
                        !text-white/60
                      "
                    >
                      Apply suggestion
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FADE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-30
          h-20
          bg-gradient-to-t
          from-[#050608]
          to-transparent
        "
      />
    </section>
  );
}

/* =========================================================
   SIDEBAR NAV
   ========================================================= */

function PreviewNav({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`
        rounded-lg
        px-2.5
        py-2
        text-[10px]
        transition-colors
        ${
          active
            ? "bg-white/[0.07] !text-white/75"
            : "!text-white/30"
        }
      `}
    >
      {children}
    </div>
  );
}

/* =========================================================
   DASHBOARD STAT
   ========================================================= */

function PreviewStat({
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
      <p
        className="
          text-[9px]
          !text-white/30
        "
      >
        {label}
      </p>

      <div
        className="
          mt-2
          flex
          items-end
          justify-between
          gap-2
        "
      >
        <p
          className="
            text-sm
            font-semibold
            !text-white/80
          "
        >
          {value}
        </p>

        <span
          className="
            text-[8px]
            !text-emerald-400/70
          "
        >
          {change}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SCHEDULE TASK
   ========================================================= */

function PreviewTask({
  time,
  title,
  duration,
  active = false,
}: {
  time: string;
  title: string;
  duration: string;
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
            ? "border-violet-400/[0.10] bg-violet-500/[0.06]"
            : "border-white/[0.05] bg-white/[0.015]"
        }
      `}
    >
      <span
        className="
          w-9
          shrink-0
          text-[9px]
          !text-white/25
        "
      >
        {time}
      </span>

      <span
        className={`
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          ${
            active
              ? "bg-violet-400"
              : "bg-white/15"
          }
        `}
      />

      <span
        className="
          min-w-0
          flex-1
          truncate
          text-[10px]
          !text-white/55
        "
      >
        {title}
      </span>

      <span
        className="
          shrink-0
          text-[8px]
          !text-white/25
        "
      >
        {duration}
      </span>
    </div>
  );
}