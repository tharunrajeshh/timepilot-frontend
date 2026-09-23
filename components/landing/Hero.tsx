"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const Clock3D = dynamic(
  () => import("@/components/landing/Clock3D"),
  {
    ssr: false,
    loading: () => (
      <div
        className="
          flex h-[420px] w-[420px]
          items-center justify-center
          rounded-full
          bg-[#0A1422]
        "
      >
        <div
          className="
            h-16 w-16 rounded-full
            border border-[#C49A61]/30
            border-t-[#C49A61]
            animate-spin
          "
        />
      </div>
    ),
  },
);

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative isolate
        w-full
        overflow-hidden
        bg-[#F6F4EE]
        text-[#0D1420]
      "
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
      >
        {/* Soft orbital glow */}

        <div
          className="
            absolute
            right-[-180px]
            top-[60px]
            h-[620px]
            w-[620px]
            rounded-full
            bg-[#8AA3C4]/10
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            left-[-220px]
            bottom-[-260px]
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#C49A61]/[0.08]
            blur-[100px]
          "
        />

        {/* Orbital rings */}

        <div
          className="
            absolute
            right-[-80px]
            top-[50%]
            h-[620px]
            w-[620px]
            -translate-y-1/2
            rounded-full
            border
            border-[#0D1420]/[0.06]
          "
        />

        <div
          className="
            absolute
            right-[20px]
            top-[50%]
            h-[460px]
            w-[460px]
            -translate-y-1/2
            rounded-full
            border
            border-[#C49A61]/20
          "
        />

        <div
          className="
            absolute
            right-[105px]
            top-[50%]
            h-[300px]
            w-[300px]
            -translate-y-1/2
            rounded-full
            border
            border-[#8AA3C4]/20
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div
        className="
          tp-container
          relative z-10
          flex min-h-[100svh]
          items-center
          pt-28 pb-16
          lg:pt-32
        "
      >
        <div
          className="
            grid w-full
            items-center
            gap-14
            lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-8
          "
        >
          {/* =================================================
              LEFT CONTENT
              ================================================= */}

          <div
            className="
              relative z-20
              max-w-[680px]
            "
          >
            {/* Eyebrow */}

            <div
              className="
                mb-7
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-[#0D1420]/10
                bg-[#FFFDF8]
                px-3.5 py-2
                shadow-[0_8px_24px_rgba(13,20,32,0.04)]
              "
            >
              <span
                className="
                  h-1.5 w-1.5
                  rounded-full
                  bg-[#C49A61]
                "
              />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#344052]
                "
              >
                Your time, intentionally
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
                max-w-[680px]
                text-[clamp(48px,7vw,78px)]
                font-semibold
                leading-[0.98]
                tracking-[-0.055em]
                text-[#0D1420]
              "
            >
              Plan less.
              <br />

              <span className="text-[#0A1422]">
                Do more
              </span>{" "}
              of what matters.
            </h1>

            {/* Description */}

            <p
              className="
                mt-7
                max-w-[570px]
                text-[17px]
                leading-[1.7]
                text-[#707A89]
                sm:text-[18px]
              "
            >
              TimePilot turns your tasks, priorities and
              available time into a focused day you can
              actually finish.
            </p>

            {/* Actions */}

            <div
              className="
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <Link
                href="/signup"
                className="
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  gap-3
                  rounded-[12px]
                  bg-[#0A1422]
                  px-6
                  text-[14px]
                  font-semibold
                  text-white
                  shadow-[0_14px_35px_rgba(10,20,34,0.16)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#111F31]
                  hover:shadow-[0_18px_40px_rgba(10,20,34,0.20)]
                "
              >
                Start planning
                <span
                  aria-hidden="true"
                  className="text-[#C49A61]"
                >
                  →
                </span>
              </Link>

              <Link
                href="#features"
                className="
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  rounded-[12px]
                  border
                  border-[#0D1420]/12
                  bg-[#FFFDF8]
                  px-6
                  text-[14px]
                  font-semibold
                  text-[#0D1420]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-[#0D1420]/20
                  hover:bg-white
                "
              >
                See how it works
              </Link>
            </div>

            {/* Trust / product qualities */}

            <div
              className="
                mt-10
                flex
                flex-wrap
                items-center
                gap-x-7
                gap-y-3
                border-t
                border-[#0D1420]/10
                pt-6
              "
            >
              <div
                className="
                  flex items-center gap-2
                  text-[13px]
                  font-medium
                  text-[#344052]
                "
              >
                <span
                  className="
                    flex h-6 w-6
                    items-center justify-center
                    rounded-full
                    bg-[#0A1422]
                    text-[11px]
                    text-white
                  "
                >
                  ✓
                </span>

                Intelligent planning
              </div>

              <div
                className="
                  flex items-center gap-2
                  text-[13px]
                  font-medium
                  text-[#344052]
                "
              >
                <span
                  className="
                    flex h-6 w-6
                    items-center justify-center
                    rounded-full
                    bg-[#0A1422]
                    text-[11px]
                    text-white
                  "
                >
                  ✓
                </span>

                Built around your time
              </div>

              <div
                className="
                  flex items-center gap-2
                  text-[13px]
                  font-medium
                  text-[#344052]
                "
              >
                <span
                  className="
                    flex h-6 w-6
                    items-center justify-center
                    rounded-full
                    bg-[#0A1422]
                    text-[11px]
                    text-white
                  "
                >
                  ✓
                </span>

                Clear daily focus
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT VISUAL
              ================================================= */}

          <div
            className="
              relative
              flex
              min-h-[500px]
              items-center
              justify-center
              lg:min-h-[650px]
            "
          >
            {/* Large orbital circle */}

            <div
              aria-hidden="true"
              className="
                absolute
                h-[430px]
                w-[430px]
                rounded-full
                border
                border-[#0D1420]/[0.07]
                sm:h-[540px]
                sm:w-[540px]
                lg:h-[600px]
                lg:w-[600px]
              "
            />

            {/* Dashed orbit */}

            <div
              aria-hidden="true"
              className="
                absolute
                h-[350px]
                w-[350px]
                rounded-full
                border
                border-dashed
                border-[#C49A61]/30
                sm:h-[450px]
                sm:w-[450px]
                lg:h-[500px]
                lg:w-[500px]
              "
            />

            {/* Orbit point */}

            <span
              aria-hidden="true"
              className="
                absolute
                right-[17%]
                top-[16%]
                h-2.5
                w-2.5
                rounded-full
                bg-[#C49A61]
                shadow-[0_0_20px_rgba(196,154,97,0.45)]
              "
            />

            {/* Clock container */}

            <div
              className="
                relative z-10
                flex
                h-[380px]
                w-[380px]
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-[#0A1422]
                shadow-[0_40px_100px_rgba(10,20,34,0.22)]
                sm:h-[470px]
                sm:w-[470px]
                lg:h-[520px]
                lg:w-[520px]
              "
            >
              {/* Inner radial light */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-[radial-gradient(circle_at_50%_40%,rgba(138,163,196,0.16),transparent_48%)]
                "
              />

              {/* Clock */}

              <div
                className="
                  relative
                  z-10
                  h-full
                  w-full
                "
              >
                <Clock3D />
              </div>
            </div>

            {/* Floating status card */}

            <div
              className="
                absolute
                bottom-[6%]
                left-[2%]
                z-20
                w-[210px]
                rounded-[16px]
                border
                border-[#0D1420]/10
                bg-[#FFFDF8]/95
                p-4
                shadow-[0_20px_55px_rgba(13,20,32,0.12)]
                backdrop-blur-xl
                sm:left-[4%]
                lg:left-[0]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#707A89]
                  "
                >
                  Today
                </span>

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#4F8B72]
                  "
                />
              </div>

              <div
                className="
                  mt-3
                  text-[25px]
                  font-semibold
                  tracking-[-0.04em]
                  text-[#0D1420]
                "
              >
                Focus mode
              </div>

              <div
                className="
                  mt-1
                  text-[12px]
                  text-[#707A89]
                "
              >
                Your day is taking shape.
              </div>

              <div
                className="
                  mt-3
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-[#EFEEE9]
                "
              >
                <div
                  className="
                    h-full
                    w-[68%]
                    rounded-full
                    bg-[#C49A61]
                  "
                />
              </div>
            </div>

            {/* Small orbit label */}

            <div
              className="
                absolute
                right-[0]
                top-[17%]
                z-20
                hidden
                rounded-[12px]
                border
                border-[#0D1420]/10
                bg-[#FFFDF8]/90
                px-3.5 py-2.5
                shadow-[0_12px_35px_rgba(13,20,32,0.08)]
                backdrop-blur-xl
                sm:block
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[12px]
                  font-medium
                  text-[#344052]
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#C49A61]
                  "
                />

                Your time, in orbit
              </div>
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
          bottom-0
          left-0
          right-0
          h-24
          bg-gradient-to-t
          from-[#F6F4EE]
          to-transparent
        "
      />
    </section>
  );
}