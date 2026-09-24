"use client";

import Link from "next/link";

const stars = [
  { left: "4%", top: "18%", delay: "0s", duration: "4.5s", size: 3 },
  { left: "9%", top: "32%", delay: "1.2s", duration: "5.2s", size: 2 },
  { left: "14%", top: "11%", delay: "2s", duration: "4.8s", size: 3 },
  { left: "19%", top: "26%", delay: "0.5s", duration: "5.8s", size: 2 },
  { left: "24%", top: "42%", delay: "1.8s", duration: "4.2s", size: 3 },
  { left: "29%", top: "16%", delay: "3s", duration: "5.5s", size: 2 },
  { left: "34%", top: "30%", delay: "0.8s", duration: "4.7s", size: 3 },
  { left: "39%", top: "12%", delay: "2.5s", duration: "5.1s", size: 2 },
  { left: "44%", top: "36%", delay: "1s", duration: "4.4s", size: 3 },
  { left: "49%", top: "20%", delay: "3.2s", duration: "5.7s", size: 2 },
  { left: "54%", top: "9%", delay: "1.5s", duration: "4.9s", size: 3 },
  { left: "59%", top: "31%", delay: "0.3s", duration: "5.3s", size: 2 },
  { left: "64%", top: "15%", delay: "2.2s", duration: "4.6s", size: 3 },
  { left: "69%", top: "38%", delay: "1.1s", duration: "5.9s", size: 2 },
  { left: "74%", top: "21%", delay: "2.8s", duration: "4.3s", size: 3 },
  { left: "79%", top: "10%", delay: "0.7s", duration: "5.4s", size: 2 },
  { left: "84%", top: "29%", delay: "1.9s", duration: "4.8s", size: 3 },
  { left: "89%", top: "17%", delay: "3.1s", duration: "5.6s", size: 2 },
  { left: "94%", top: "34%", delay: "0.9s", duration: "4.5s", size: 3 },
  { left: "7%", top: "51%", delay: "2.7s", duration: "5.2s", size: 2 },
  { left: "16%", top: "58%", delay: "1.4s", duration: "4.9s", size: 3 },
  { left: "27%", top: "54%", delay: "3.4s", duration: "5.5s", size: 2 },
  { left: "38%", top: "61%", delay: "0.6s", duration: "4.6s", size: 3 },
  { left: "63%", top: "57%", delay: "2.1s", duration: "5.3s", size: 2 },
  { left: "73%", top: "52%", delay: "1.7s", duration: "4.7s", size: 3 },
  { left: "86%", top: "60%", delay: "2.9s", duration: "5.8s", size: 2 },
  { left: "96%", top: "49%", delay: "0.4s", duration: "4.4s", size: 3 },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative
        isolate
        min-h-[100svh]
        w-full
        overflow-hidden
        bg-[#02050a]
        text-white
      "
    >
      {/* =====================================================
          SPACE BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[#02050a]
        "
      />

      {/* Deep blue atmospheric glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[radial-gradient(ellipse_at_50%_72%,rgba(15,70,135,0.34),transparent_55%)]
        "
      />

      {/* =====================================================
          STARS
          NO CANVAS
          NO STARFIELD COMPONENT
          NO BLACK RECTANGLE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          overflow-hidden
        "
      >
        {stars.map((star, index) => (
          <span
            key={index}
            className="
              absolute
              rounded-full
              bg-white
              opacity-80
              shadow-[0_0_7px_2px_rgba(255,255,255,0.55)]
            "
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `tpStarFall ${star.duration} linear ${star.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* =====================================================
          SHOOTING STARS
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[6]
          overflow-hidden
        "
      >
        <span
          className="
            absolute
            left-[16%]
            top-[12%]
            h-[2px]
            w-[130px]
            rotate-[58deg]
            rounded-full
            bg-gradient-to-r
            from-transparent
            via-white
            to-transparent
            opacity-70
            blur-[0.5px]
          "
          style={{
            animation:
              "tpShootingStar 6s ease-in-out 1s infinite",
          }}
        />

        <span
          className="
            absolute
            left-[76%]
            top-[16%]
            h-[2px]
            w-[110px]
            rotate-[62deg]
            rounded-full
            bg-gradient-to-r
            from-transparent
            via-white
            to-transparent
            opacity-60
          "
          style={{
            animation:
              "tpShootingStar 7s ease-in-out 3s infinite",
          }}
        />

        <span
          className="
            absolute
            left-[55%]
            top-[8%]
            h-[1px]
            w-[95px]
            rotate-[60deg]
            rounded-full
            bg-gradient-to-r
            from-transparent
            via-white
            to-transparent
            opacity-50
          "
          style={{
            animation:
              "tpShootingStar 8s ease-in-out 4s infinite",
          }}
        />
      </div>

      {/* =====================================================
          EARTH
          DIRECTLY INSIDE HERO
          ===================================================== */}

      <img
        src="/images/earth.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-[-42%]
          z-[8]
          w-[1500px]
          max-w-none
          -translate-x-1/2
          select-none
          object-contain
          drop-shadow-[0_-22px_100px_rgba(30,125,255,0.42)]
          sm:w-[1650px]
          md:w-[1800px]
          lg:w-[2000px]
          xl:w-[2200px]
        "
      />

      {/* =====================================================
          EARTH ATMOSPHERE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-[3%]
          z-[9]
          h-[180px]
          w-[1000px]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse,rgba(40,145,255,0.22),transparent_70%)]
          blur-3xl
        "
      />

      {/* =====================================================
          HERO CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-30
          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1400px]
          items-center
          justify-center
          px-5
          pb-[20vh]
          pt-[135px]
          text-center
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            flex
            w-full
            max-w-[1050px]
            flex-col
            items-center
          "
        >
          {/* EYEBROW */}

          <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/15
              bg-black/40
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#C49A61]
                shadow-[0_0_14px_rgba(196,154,97,0.9)]
              "
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white/80
              "
            >
              Intelligent time management
            </span>
          </div>

          {/* =================================================
              HEADING
              ================================================= */}

          <h1
            className="
              m-0
              max-w-[1000px]
              text-[clamp(50px,7vw,94px)]
              font-semibold
              leading-[0.94]
              tracking-[-0.06em]
              text-white
              drop-shadow-[0_8px_40px_rgba(0,0,0,0.7)]
            "
          >
            <span className="block">
              Take control
            </span>

            <span className="block">
              of your{" "}
              <span className="text-[#EAD9BD]">
                time.
              </span>
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            className="
              mt-7
              max-w-[700px]
              text-[15px]
              leading-7
              text-white/75
              sm:text-[17px]
              sm:leading-8
            "
          >
            TimePilot helps you plan your day, prioritize
            what matters, and turn your available time into
            focused progress.
          </p>

          {/* =================================================
              BUTTONS
              ================================================= */}

          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/signup"
              className="
                inline-flex
                h-[54px]
                min-w-[185px]
                items-center
                justify-center
                gap-2
                rounded-[13px]
                bg-white
                px-7
                text-[14px]
                font-semibold
                text-[#07101b]
                shadow-[0_15px_45px_rgba(255,255,255,0.18)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#F6F4EE]
              "
            >
              <span className="text-[#07101b]">
                Get started
              </span>

              <span className="text-[#C49A61]">
                →
              </span>
            </Link>

            <Link
              href="#features"
              className="
                inline-flex
                h-[54px]
                min-w-[185px]
                items-center
                justify-center
                rounded-[13px]
                border
                border-white/25
                bg-black/30
                px-7
                text-[14px]
                font-semibold
                text-white
                backdrop-blur-xl
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white/10
              "
            >
              Explore TimePilot
            </Link>
          </div>

          {/* =================================================
              BENEFITS
              ================================================= */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-8
              gap-y-3
            "
          >
            <div className="flex items-center gap-2 text-[12px] text-white/65">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              AI-powered planning
            </div>

            <div className="flex items-center gap-2 text-[12px] text-white/65">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              Focused schedules
            </div>

            <div className="flex items-center gap-2 text-[12px] text-white/65">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              One place for your day
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATION STYLES
          ===================================================== */}

      <style jsx>{`
        @keyframes tpStarFall {
          0% {
            transform: translate3d(0, -30px, 0);
            opacity: 0;
          }

          10% {
            opacity: 0.9;
          }

          80% {
            opacity: 0.9;
          }

          100% {
            transform: translate3d(12px, 75vh, 0);
            opacity: 0;
          }
        }

        @keyframes tpShootingStar {
          0% {
            transform: translate3d(0, 0, 0) rotate(60deg);
            opacity: 0;
          }

          8% {
            opacity: 0.8;
          }

          20% {
            transform: translate3d(180px, 260px, 0) rotate(60deg);
            opacity: 0;
          }

          100% {
            transform: translate3d(180px, 260px, 0) rotate(60deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}