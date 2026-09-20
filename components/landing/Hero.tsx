"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  CalendarDays,
  Check,
  Clock3,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

/* ============================================================
   STAR FIELD DATA
   Generated once per mount so every star gets a random position,
   size, speed and delay — real falling stars, not four repeats.
============================================================ */

type StarDef = {
  left: number; // vw
  size: number; // px
  duration: number; // s
  delay: number; // s
  drift: number; // px, horizontal drift while falling
};

function useStarField(count: number): StarDef[] {
  return useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 8,
      drift: -60 + Math.random() * 120,
    }));
  }, [count]);
}

export default function Hero() {
  const stars = useStarField(35);

  /* ============================================================
     MOUSE PARALLAX
     Space image, Mars, and glows drift a little opposite the
     cursor for depth. Applied directly via refs so it doesn't
     trigger a React re-render on every mousemove.
  ============================================================ */

  const heroRef = useRef<HTMLElement>(null);
  const spaceImageRef = useRef<HTMLDivElement>(null);
  const marsImageRef = useRef<HTMLDivElement>(null);
  const marsGlowRef = useRef<HTMLDivElement>(null);
  const starsLayerRef = useRef<HTMLDivElement>(null);
  const glowLeftRef = useRef<HTMLDivElement>(null);
  const glowRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const hero = heroRef.current;
    if (!hero) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      // normalized -1..1 relative to the hero's own box
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      // ease toward the target for a smooth, weighty drift
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (spaceImageRef.current) {
        spaceImageRef.current.style.transform = `scale(1.06) translate(${
          currentX * -10
        }px, ${currentY * -8}px)`;
      }
      if (marsImageRef.current) {
        marsImageRef.current.style.transform = `translateX(calc(-50% + ${
          currentX * 22
        }px)) translateY(${currentY * 14}px)`;
      }
      if (marsGlowRef.current) {
        marsGlowRef.current.style.transform = `translateX(calc(-50% + ${
          currentX * 16
        }px))`;
      }
      if (starsLayerRef.current) {
        starsLayerRef.current.style.transform = `translate(${
          currentX * 18
        }px, ${currentY * 12}px)`;
      }
      if (glowLeftRef.current) {
        glowLeftRef.current.style.transform = `translate(${
          currentX * 26
        }px, ${currentY * 18}px)`;
      }
      if (glowRightRef.current) {
        glowRightRef.current.style.transform = `translate(${
          currentX * -26
        }px, ${currentY * -18}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="tp-hero" ref={heroRef}>
      {/* =========================================================
          HERO BACKGROUND
      ========================================================== */}

      <div className="tp-hero-background">
        {/* Space / Earth Background Image — parallaxed opposite the cursor */}
        <div className="tp-space-image" ref={spaceImageRef} />

        {/* Falling stars, each with its own random path */}
        <div className="tp-falling-stars" ref={starsLayerRef}>
          {stars.map((star, i) => (
            <span
              key={i}
              className="tp-star"
              style={
                {
                  left: `${star.left}vw`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                  "--tp-drift": `${star.drift}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="tp-space-overlay" />

        <div className="tp-mars-image" ref={marsImageRef} />
        <div className="tp-mars-glow" ref={marsGlowRef} />
      </div>

      <div className="tp-hero-glow tp-hero-glow-left" ref={glowLeftRef} />
      <div className="tp-hero-glow tp-hero-glow-right" ref={glowRightRef} />

      {/* =========================================================
          HERO CONTENT
      ========================================================== */}

      <div className="tp-hero-container">
        {/* =====================================================
            EYEBROW
        ====================================================== */}

        <div className="tp-hero-eyebrow">
          <span className="tp-eyebrow-dot" />
          <span>Intelligent time management</span>
          <span className="tp-eyebrow-arrow">↗</span>
        </div>

        {/* =====================================================
            HERO TITLE
        ====================================================== */}

        <h1 className="tp-hero-title">
          <span>Take control</span>
          <span className="tp-hero-title-light">
            of your time.
          </span>
        </h1>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <p className="tp-hero-description">
          TimePilot turns your tasks, priorities and schedule
          into a focused day you can actually finish.
        </p>

        {/* =====================================================
            BUTTONS
        ====================================================== */}

        <div className="tp-hero-buttons">
          <Link
            href="/signup"
            className="tp-get-started"
          >
            <span>Get started</span>
            <span className="tp-get-started-icon">
              <ArrowUpRight
                size={18}
                strokeWidth={2.2}
              />
            </span>
          </Link>

          <a
            href="#features"
            className="tp-explore"
          >
            <span>Explore TimePilot</span>
            <span className="tp-explore-arrow">
              ↓
            </span>
          </a>
        </div>

        {/* =====================================================
            TRUST ROW
        ====================================================== */}

        <div className="tp-trust">
          <div className="tp-trust-item tp-trust-purple">
            <span className="tp-trust-icon">
              <Check
                size={12}
                strokeWidth={2.7}
              />
            </span>
            <span>AI-assisted planning</span>
          </div>

          <span className="tp-trust-divider" />

          <div className="tp-trust-item tp-trust-blue">
            <span className="tp-trust-icon">
              <Check
                size={12}
                strokeWidth={2.7}
              />
            </span>
            <span>Smart scheduling</span>
          </div>

          <span className="tp-trust-divider" />

          <div className="tp-trust-item tp-trust-green">
            <span className="tp-trust-icon">
              <Check
                size={12}
                strokeWidth={2.7}
              />
            </span>
            <span>Focus analytics</span>
          </div>
        </div>

        {/* =====================================================
            PRODUCT SHOWCASE
        ====================================================== */}

        <div className="tp-preview-wrapper">
          {/* ===================================================
              FLOATING AI SUGGESTION
          ==================================================== */}

          <div className="tp-ai-card">
            <div className="tp-ai-card-icon">
              <Sparkles size={17} />
            </div>

            <div className="tp-ai-card-content">
              <div className="tp-ai-card-title">
                AI suggestion
              </div>
              <div className="tp-ai-card-subtitle">
                Schedule optimized
              </div>
            </div>

            <span className="tp-ai-live" />
          </div>

          {/* ===================================================
              FLOATING FOCUS CARD
          ==================================================== */}

          <div className="tp-focus-card">
            <div className="tp-focus-card-icon">
              <Clock3 size={17} />
            </div>

            <div>
              <div className="tp-focus-card-label">
                Focus mode
              </div>
              <div className="tp-focus-card-time">
                52 min
              </div>
            </div>
          </div>

          {/* ===================================================
              BROWSER WINDOW
          ==================================================== */}

          <div className="tp-browser-window">
            {/* Browser header */}
            <div className="tp-browser-header">
              <div className="tp-browser-controls">
                <span />
                <span />
                <span />
              </div>

              <div className="tp-browser-address">
                app.timepilot
              </div>

              <MoreHorizontal
                size={18}
                className="tp-browser-more"
              />
            </div>

            {/* =================================================
                APPLICATION
            ================================================== */}

            <div className="tp-app">
              {/* =================================================
                  SIDEBAR
              ================================================== */}

              <aside className="tp-app-sidebar">
                <div className="tp-app-logo">
                  T
                </div>

                <div className="tp-app-navigation">
                  <div className="tp-app-nav active">
                    <CalendarDays size={16} />
                    <span>Today</span>
                  </div>

                  <div className="tp-app-nav">
                    <Brain size={16} />
                    <span>AI Planner</span>
                  </div>

                  <div className="tp-app-nav">
                    <BarChart3 size={16} />
                    <span>Analytics</span>
                  </div>
                </div>

                {/* Workspace */}
                <div className="tp-app-user">
                  <div className="tp-user-avatar">
                    M
                  </div>
                  <div>
                    <div className="tp-user-name">
                      My workspace
                    </div>
                    <div className="tp-user-type">
                      Personal
                    </div>
                  </div>
                </div>
              </aside>

              {/* =================================================
                  MAIN DASHBOARD
              ================================================== */}

              <main className="tp-app-main">
                {/* Dashboard heading */}
                <div className="tp-app-heading">
                  <div>
                    <div className="tp-app-date">
                      THURSDAY, SEPTEMBER 24
                    </div>
                    <h2>
                      Good morning.
                    </h2>
                    <p>
                      Here's your plan for today.
                    </p>
                  </div>

                  <div className="tp-profile">
                    M
                  </div>
                </div>

                {/* =================================================
                    STAT CARDS
                ================================================== */}

                <div className="tp-stats">
                  <MiniStat
                    title="Focus time"
                    value="4h 32m"
                    change="+18%"
                    accent="purple"
                  />

                  <MiniStat
                    title="Tasks completed"
                    value="8 / 11"
                    change="+3"
                    accent="blue"
                  />

                  <MiniStat
                    title="Deep work"
                    value="72%"
                    change="+12%"
                    accent="green"
                  />
                </div>

                {/* =================================================
                    DASHBOARD CONTENT
                ================================================== */}

                <div className="tp-dashboard-grid">
                  {/* Schedule */}
                  <div className="tp-schedule">
                    <div className="tp-section-heading">
                      <div>
                        <span>TODAY</span>
                        <h3>
                          Your schedule
                        </h3>
                      </div>
                      <button type="button">
                        View all
                      </button>
                    </div>

                    <div className="tp-schedule-list">
                      <Schedule
                        time="09:00"
                        title="Deep work"
                        description="Product strategy"
                        active
                      />

                      <Schedule
                        time="11:00"
                        title="Team sync"
                        description="Weekly planning"
                      />

                      <Schedule
                        time="13:30"
                        title="Lunch break"
                        description="Take a real break"
                        type="break"
                      />

                      <Schedule
                        time="14:30"
                        title="Project work"
                        description="Dashboard redesign"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      AI PANEL
                  ================================================== */}

                  <div className="tp-ai-panel">
                    <div className="tp-ai-panel-icon">
                      <Sparkles size={17} />
                    </div>

                    <span className="tp-ai-panel-label">
                      AI PLANNER
                    </span>

                    <h3>
                      Your strongest focus window is{" "}
                      <strong>
                        9:00 – 11:00.
                      </strong>
                    </h3>

                    <p>
                      TimePilot protected it for your
                      highest-priority task.
                    </p>

                    <div className="tp-progress">
                      <span />
                    </div>

                    <div className="tp-ai-panel-bottom">
                      <span>
                        Optimized just now
                      </span>
                      <strong>
                        94%
                      </strong>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          {/* ===================================================
              PREVIEW CAPTION
          ==================================================== */}

          <div className="tp-preview-caption">
            <span>
              A calmer way to plan your day.
            </span>
            <span className="tp-caption-divider" />
            <span>
              Built around how you actually work.
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          STYLES
      ========================================================== */}

      <style jsx>{`
        /* ========================================================
           HERO
        ======================================================== */

        .tp-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding-top: 150px;
          padding-bottom: 100px;
          overflow: hidden;
          background: #050505;
          color: #ffffff;
        }

        /* ========================================================
           SPACE BACKGROUND
        ======================================================== */

        .tp-hero-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          background: #050505;
        }

        .tp-space-image {
          position: absolute;
          inset: -30px;
          background-image: url("/images/earth-bg.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.78;
          transform: scale(1.06);
          filter: saturate(0.85);
          will-change: transform;
          transition: transform 0.1s linear;
        }

        /* ========================================================
           FALLING STARS
           Randomized per-star via inline style; the keyframe just
           handles the fall + fade + horizontal drift variable.
        ======================================================== */

        .tp-falling-stars {
          position: absolute;
          inset: -40px;
          z-index: 2;
          overflow: hidden;
          pointer-events: none;
          will-change: transform;
        }

        .tp-star {
          position: absolute;
          top: -5%;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.75);
          animation-name: tp-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0;
        }

        .tp-star::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 100%;
          width: 46px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.7)
          );
          transform: translateY(-50%);
        }

        @keyframes tp-fall {
          0% {
            transform: translate(0, -10vh);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tp-drift, 0px), 115vh);
            opacity: 0;
          }
        }

        /* ========================================================
           OVERLAY & MARS
        ======================================================== */

        .tp-space-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background:
            radial-gradient(
              circle at 50% 12%,
              rgba(0, 0, 0, 0.05),
              transparent 28%
            ),
            radial-gradient(
              circle at 50% 42%,
              rgba(0, 0, 0, 0.12),
              transparent 42%
            ),
            linear-gradient(
              to bottom,
              rgba(3, 5, 9, 0.10) 0%,
              rgba(3, 5, 9, 0.18) 42%,
              rgba(3, 5, 9, 0.76) 78%,
              #050505 100%
            );
        }

        .tp-mars-image {
          position: absolute;
          left: 50%;
          bottom: -420px;
          width: min(920px, 82vw);
          aspect-ratio: 1 / 1;
          transform: translateX(-50%);
          border-radius: 50%;
          background-image:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.06),
              rgba(0, 0, 0, 0.08)
            ),
            url("/images/mars-surface.jpg");
          background-size: cover;
          background-position: center;
          opacity: 0.88;
          box-shadow:
            inset -90px -100px 160px rgba(0, 0, 0, 0.62),
            inset 60px 40px 120px rgba(255, 255, 255, 0.07),
            0 -20px 100px rgba(255, 110, 50, 0.08);
          mask-image: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(0, 0, 0, 0.15) 14%,
              black 30%,
              black 100%
            );
          -webkit-mask-image: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(0, 0, 0, 0.15) 14%,
              black 30%,
              black 100%
            );
          animation: tp-mars-float 10s ease-in-out infinite;
          will-change: transform;
          z-index: 4;
        }

        .tp-mars-glow {
          position: absolute;
          left: 50%;
          bottom: -360px;
          width: min(850px, 75vw);
          height: min(260px, 25vw);
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(
              ellipse,
              rgba(220, 78, 35, 0.24),
              rgba(150, 45, 25, 0.10) 35%,
              transparent 72%
            );
          filter: blur(45px);
          opacity: 0.65;
          will-change: transform;
          z-index: 4;
        }

        /* ========================================================
           DECORATIVE GLOWS
        ======================================================== */

        .tp-hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          opacity: 0.28;
          z-index: 5;
          will-change: transform;
        }

        .tp-hero-glow-left {
          top: 120px;
          left: -420px;
          background: rgba(92, 62, 190, 0.18);
        }

        .tp-hero-glow-right {
          top: 450px;
          right: -420px;
          background: rgba(40, 100, 180, 0.16);
        }

        /* ========================================================
           CONTAINER
        ======================================================== */

        .tp-hero-container {
          position: relative;
          z-index: 10;
          width: min(1280px, calc(100% - 40px));
          margin: 0 auto;
          text-align: center;
        }

        /* ========================================================
           EYEBROW
        ======================================================== */

        .tp-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          height: 34px;
          padding: 0 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.72);
          font-size: 11px;
          font-weight: 600;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.22);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .tp-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #62f7c2;
          box-shadow: 0 0 12px rgba(98, 247, 194, 0.8);
          animation: tp-pulse 2.5s ease-in-out infinite;
        }

        .tp-eyebrow-arrow {
          color: rgba(255, 255, 255, 0.42);
        }

        /* ========================================================
           TITLE
        ======================================================== */

        .tp-hero-title {
          max-width: 1000px;
          margin: 25px auto 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: clamp(58px, 8.5vw, 118px);
          line-height: 0.90;
          letter-spacing: -0.075em;
          font-weight: 720;
          color: #ffffff;
          text-shadow: 0 10px 50px rgba(0, 0, 0, 0.34);
        }

        .tp-hero-title > span {
          display: block;
        }

        .tp-hero-title-light {
          color: rgba(255, 255, 255, 0.50);
          font-weight: 420;
          letter-spacing: -0.082em;
        }

        /* ========================================================
           DESCRIPTION
        ======================================================== */

        .tp-hero-description {
          max-width: 620px;
          margin: 30px auto 0;
          color: rgba(255, 255, 255, 0.60);
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.6;
          letter-spacing: -0.018em;
        }

        /* ========================================================
           BUTTONS
        ======================================================== */

        .tp-hero-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
        }

        .tp-get-started {
          height: 58px;
          padding: 0 9px 0 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 999px;
          background: #ffffff;
          color: #050505;
          font-size: 15px;
          font-weight: 650;
          letter-spacing: -0.025em;
          text-decoration: none;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
          transition: transform 0.3s cubic-bezier(.16,1,.3,1), box-shadow 0.3s ease, background 0.3s ease;
        }

        .tp-get-started:hover {
          transform: translateY(-3px);
          background: #f3f3f3;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
        }

        .tp-get-started-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #050505;
          color: #ffffff;
          transition: transform 0.3s cubic-bezier(.16,1,.3,1);
        }

        .tp-get-started:hover .tp-get-started-icon {
          transform: translate(2px, -2px) rotate(4deg);
        }

        /* ========================================================
           EXPLORE BUTTON
        ======================================================== */

        .tp-explore {
          height: 58px;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.88);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.025em;
          text-decoration: none;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        }

        .tp-explore:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.30);
          background: rgba(255, 255, 255, 0.11);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.25);
        }

        .tp-explore-arrow {
          color: rgba(255, 255, 255, 0.48);
          font-size: 19px;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .tp-explore:hover .tp-explore-arrow {
          color: #ffffff;
          transform: translateY(3px);
        }

        /* ========================================================
           TRUST ROW
        ======================================================== */

        .tp-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 17px;
          margin-top: 27px;
          color: rgba(255, 255, 255, 0.46);
          font-size: 12px;
          font-weight: 500;
        }

        .tp-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.25s ease;
        }

        .tp-trust-icon {
          width: 19px;
          height: 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .tp-trust-purple .tp-trust-icon {
          background: rgba(139, 92, 246, 0.16);
          color: #a78bfa;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.035);
        }

        .tp-trust-purple:hover {
          color: #c4b5fd;
        }

        .tp-trust-purple:hover .tp-trust-icon {
          transform: scale(1.1);
        }

        .tp-trust-blue .tp-trust-icon {
          background: rgba(59, 130, 246, 0.16);
          color: #60a5fa;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.035);
        }

        .tp-trust-blue:hover {
          color: #93c5fd;
        }

        .tp-trust-blue:hover .tp-trust-icon {
          transform: scale(1.1);
        }

        .tp-trust-green .tp-trust-icon {
          background: rgba(16, 185, 129, 0.16);
          color: #34d399;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.035);
        }

        .tp-trust-green:hover {
          color: #6ee7b7;
        }

        .tp-trust-green:hover .tp-trust-icon {
          transform: scale(1.1);
        }

        .tp-trust-divider {
          width: 1px;
          height: 18px;
          background: rgba(255, 255, 255, 0.12);
        }

        /* ========================================================
           PRODUCT PREVIEW
        ======================================================== */

        .tp-preview-wrapper {
          position: relative;
          width: 100%;
          margin-top: 70px;
        }

        /* ========================================================
           BROWSER
        ======================================================== */

        .tp-browser-window {
          position: relative;
          width: min(1080px, calc(100% - 80px));
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 30px;
          background: #ffffff;
          box-shadow: 0 45px 120px rgba(0, 0, 0, 0.55), 0 15px 45px rgba(0, 0, 0, 0.30);
          transform: perspective(1600px) rotateX(1deg);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .tp-browser-window:hover {
          transform: perspective(1600px) rotateX(0deg) translateY(-4px);
          box-shadow: 0 55px 125px rgba(0, 0, 0, 0.62), 0 12px 40px rgba(0, 0, 0, 0.30);
        }

        /* ========================================================
           BROWSER HEADER
        ======================================================== */

        .tp-browser-header {
          height: 58px;
          padding: 0 22px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
          background: rgba(255, 255, 255, 0.96);
        }

        .tp-browser-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tp-browser-controls span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #d8d8d8;
        }

        .tp-browser-controls span:first-child {
          background: #c5c5c5;
        }

        .tp-browser-address {
          min-width: 130px;
          height: 34px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 999px;
          background: #f8f8f8;
          color: #9a9a9a;
          font-size: 10px;
          font-weight: 500;
        }

        .tp-browser-more {
          justify-self: end;
          color: #aaa;
        }

        /* ========================================================
           APP
        ======================================================== */

        .tp-app {
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          min-height: 475px;
          background: #f6f6f6;
          text-align: left;
        }

        .tp-app * {
          text-align: left;
        }

        /* ========================================================
           SIDEBAR
        ======================================================== */

        .tp-app-sidebar {
          padding: 22px 13px;
          display: flex;
          flex-direction: column;
          background: #fff;
          border-right: 1px solid rgba(0, 0, 0, 0.07);
          text-align: left;
        }

        .tp-app-logo {
          width: 36px;
          height: 36px;
          margin: 0 8px 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #000;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.14);
        }

        .tp-app-navigation {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .tp-app-nav {
          position: relative;
          height: 42px;
          padding: 0 11px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 11px;
          color: #999;
          font-size: 11px;
          font-weight: 550;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .tp-app-nav:hover {
          background: #f7f7f7;
          color: #444;
          transform: translateX(2px);
        }

        .tp-app-nav.active {
          background: #f1f1f1;
          color: #111;
          font-weight: 650;
        }

        .tp-app-nav.active::before {
          content: "";
          position: absolute;
          left: -13px;
          top: 9px;
          width: 3px;
          height: 24px;
          border-radius: 999px;
          background: #000;
        }

        .tp-app-user {
          margin-top: auto;
          padding: 15px 8px 8px;
          display: flex;
          align-items: center;
          gap: 9px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .tp-user-avatar {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #111;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .tp-user-name {
          color: #333;
          font-size: 9px;
          font-weight: 650;
        }

        .tp-user-type {
          margin-top: 2px;
          color: #aaa;
          font-size: 8px;
        }

        /* ========================================================
           MAIN APP
        ======================================================== */

        .tp-app-main {
          min-width: 0;
          padding: 28px 30px 32px;
          background: linear-gradient(180deg, #f7f7f7 0%, #f4f4f4 100%);
          text-align: left;
        }

        .tp-app-heading {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
        }

        .tp-app-heading > div:first-child {
          min-width: 0;
        }

        .tp-app-date {
          color: #a1a1a1;
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.09em;
        }

        .tp-app-heading h2 {
          margin: 7px 0 4px;
          color: #111;
          font-size: 29px;
          line-height: 1;
          font-weight: 650;
          letter-spacing: -0.055em;
        }

        .tp-app-heading p {
          margin: 0;
          color: #999;
          font-size: 10px;
        }

        .tp-profile {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #111;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.14);
        }

        /* ========================================================
           STATS
        ======================================================== */

        .tp-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 24px;
          text-align: left;
        }

        .tp-mini-stat {
          min-width: 0;
          padding: 15px 16px;
          border: 1px solid rgba(0, 0, 0, 0.065);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.025);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          text-align: left;
        }

        .tp-mini-stat:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 0, 0, 0.11);
          box-shadow: 0 9px 24px rgba(0, 0, 0, 0.055);
        }

        .tp-mini-stat-label {
          color: #9b9b9b;
          font-size: 8px;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .tp-mini-stat-value {
          margin-top: 7px;
          color: #111;
          font-size: 18px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.045em;
        }

        .tp-mini-stat-change {
          margin-top: 7px;
          color: #777;
          font-size: 8px;
          font-weight: 550;
        }

        .tp-mini-stat::after {
          content: "";
          display: block;
          width: 20px;
          height: 2px;
          margin-top: 10px;
          border-radius: 999px;
          background: #d9d9d9;
        }

        .tp-mini-stat:nth-child(1)::after {
          background: #8B5CF6;
        }

        .tp-mini-stat:nth-child(2)::after {
          background: #3B82F6;
        }

        .tp-mini-stat:nth-child(3)::after {
          background: #10B981;
        }

        /* ========================================================
           DASHBOARD GRID
        ======================================================== */

        .tp-dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(220px, 0.75fr);
          gap: 12px;
          margin-top: 12px;
          align-items: stretch;
          text-align: left;
        }

        /* ========================================================
           SCHEDULE
        ======================================================== */

        .tp-schedule {
          min-width: 0;
          padding: 18px;
          border: 1px solid rgba(0, 0, 0, 0.065);
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 5px 18px rgba(0, 0, 0, 0.025);
          text-align: left;
        }

        .tp-section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          text-align: left;
        }

        .tp-section-heading > div {
          text-align: left;
        }

        .tp-section-heading span {
          color: #aaa;
          font-size: 8px;
          font-weight: 650;
          letter-spacing: 0.08em;
        }

        .tp-section-heading h3 {
          margin: 5px 0 0;
          color: #111;
          font-size: 15px;
          line-height: 1;
          font-weight: 650;
          letter-spacing: -0.035em;
        }

        .tp-section-heading button {
          padding: 6px 9px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 7px;
          background: #fafafa;
          color: #888;
          font-size: 9px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .tp-section-heading button:hover {
          background: #f1f1f1;
          color: #222;
        }

        .tp-schedule-list {
          width: 100%;
          text-align: left;
        }

        /* ========================================================
           SCHEDULE ROW
        ======================================================== */

        .tp-schedule-row {
          position: relative;
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 0;
          min-height: 57px;
          text-align: left;
        }

        .tp-schedule-time {
          padding-top: 10px;
          color: #a0a0a0;
          font-size: 9px;
          line-height: 1;
          font-weight: 650;
          text-align: left;
        }

        .tp-schedule-content {
          min-width: 0;
          padding: 9px 12px;
          border-left: 1px solid #e5e5e5;
          text-align: left;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .tp-schedule-row:hover .tp-schedule-content {
          background: #fafafa;
          border-radius: 0 9px 9px 0;
        }

        .tp-schedule-row.active .tp-schedule-content {
          border-left: 2px solid #111;
          background: linear-gradient(90deg, #f7f7f7, #ffffff);
          border-radius: 0 10px 10px 0;
        }

        .tp-schedule-title {
          color: #1c1c1c;
          font-size: 10px;
          line-height: 1.2;
          font-weight: 700;
          text-align: left;
        }

        .tp-schedule-description {
          margin-top: 4px;
          color: #a0a0a0;
          font-size: 8px;
          line-height: 1.2;
          text-align: left;
        }

        .tp-schedule-row[data-type="break"] .tp-schedule-content {
          border-left-style: dashed;
          background: transparent;
        }

        /* ========================================================
           AI PANEL
        ======================================================== */

        .tp-ai-panel {
          min-width: 0;
          min-height: 100%;
          padding: 19px;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          background: linear-gradient(145deg, #151515, #0c0c0c);
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.13);
          overflow: hidden;
          text-align: left;
        }

        .tp-ai-panel-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .tp-ai-panel-label {
          margin-top: 20px;
          color: #777;
          font-size: 8px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .tp-ai-panel h3 {
          max-width: 240px;
          margin: 10px 0 0;
          color: #fff;
          font-size: 15px;
          line-height: 1.38;
          font-weight: 450;
          letter-spacing: -0.035em;
          text-align: left;
        }

        .tp-ai-panel h3 strong {
          color: #fff;
          font-weight: 700;
        }

        .tp-ai-panel p {
          max-width: 220px;
          margin: 11px 0 0;
          color: #777;
          font-size: 9px;
          line-height: 1.55;
          text-align: left;
        }

        .tp-progress {
          height: 4px;
          margin-top: auto;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
        }

        .tp-progress span {
          display: block;
          width: 94%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #fff, #d0d0d0);
        }

        .tp-ai-panel-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          color: #666;
          font-size: 8px;
          text-align: left;
        }

        .tp-ai-panel-bottom strong {
          color: #aaa;
        }

        /* ========================================================
           FLOATING AI CARD
        ======================================================== */

        .tp-ai-card {
          position: absolute;
          z-index: 5;
          left: max(0px, calc((100% - 1160px) / 2));
          top: 75px;
          width: 190px;
          padding: 11px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          background: rgba(15, 15, 15, 0.72);
          color: #fff;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.32);
          text-align: left;
          animation: tp-float-one 5s ease-in-out infinite;
        }

        .tp-ai-card-icon {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #ffffff;
          color: #000;
        }

        .tp-ai-card-content {
          min-width: 0;
          text-align: left;
        }

        .tp-ai-card-title {
          color: #fff;
          font-size: 10px;
          font-weight: 700;
        }

        .tp-ai-card-subtitle {
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.48);
          font-size: 8px;
        }

        .tp-ai-live {
          width: 6px;
          height: 6px;
          margin-left: auto;
          flex-shrink: 0;
          border-radius: 50%;
          background: #62f7c2;
          box-shadow: 0 0 10px rgba(98, 247, 194, 0.8);
          animation: tp-pulse 2s ease-in-out infinite;
        }

        /* ========================================================
           FLOATING FOCUS CARD
        ======================================================== */

        .tp-focus-card {
          position: absolute;
          z-index: 5;
          right: max(0px, calc((100% - 1160px) / 2));
          bottom: 75px;
          width: 150px;
          padding: 11px;
          display: flex;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          background: rgba(15, 15, 15, 0.72);
          color: #fff;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.32);
          text-align: left;
          animation: tp-float-two 6s ease-in-out infinite;
        }

        .tp-focus-card-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.10);
          color: #ffffff;
        }

        .tp-focus-card-label {
          color: rgba(255, 255, 255, 0.45);
          font-size: 8px;
        }

        .tp-focus-card-time {
          margin-top: 2px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        /* ========================================================
           CAPTION
        ======================================================== */

        .tp-preview-caption {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 9px;
          font-weight: 500;
        }

        .tp-caption-divider {
          width: 30px;
          height: 1px;
          background: rgba(255, 255, 255, 0.20);
        }

        /* ========================================================
           ANIMATIONS
        ======================================================== */

        @keyframes tp-pulse {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes tp-float-one {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes tp-float-two {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @keyframes tp-mars-float {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        /* ========================================================
           TABLET
        ======================================================== */

        @media (max-width: 1100px) {
          .tp-browser-window {
            width: calc(100% - 40px);
          }
          .tp-mars-image {
            width: 850px;
          }
        }

        @media (max-width: 900px) {
          .tp-app {
            grid-template-columns: 165px minmax(0, 1fr);
          }
          .tp-app-main {
            padding: 23px;
          }
          .tp-dashboard-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .tp-ai-panel {
            min-height: 190px;
          }
          .tp-ai-card {
            left: 4px;
          }
          .tp-focus-card {
            right: 4px;
          }
          .tp-mars-image {
            width: 760px;
            bottom: -340px;
          }
        }

        /* ========================================================
           MOBILE
        ======================================================== */

        @media (max-width: 720px) {
          .tp-hero {
            padding-top: 115px;
            padding-bottom: 60px;
          }
          .tp-hero-container {
            width: calc(100% - 28px);
          }
          .tp-hero-title {
            font-size: clamp(48px, 14vw, 76px);
          }
          .tp-hero-description {
            max-width: 480px;
            font-size: 15px;
          }
          .tp-trust {
            flex-wrap: wrap;
            max-width: 440px;
            margin-left: auto;
            margin-right: auto;
          }
          .tp-trust-divider {
            display: none;
          }
          .tp-preview-wrapper {
            margin-top: 50px;
          }
          .tp-browser-window {
            width: 100%;
            border-radius: 22px;
          }
          .tp-app {
            grid-template-columns: 1fr;
          }
          .tp-app-sidebar {
            display: none;
          }
          .tp-app-main {
            padding: 18px;
          }
          .tp-app-heading h2 {
            font-size: 23px;
          }
          .tp-dashboard-grid {
            grid-template-columns: 1fr;
          }
          .tp-ai-panel {
            min-height: 180px;
          }
          .tp-ai-card {
            left: 0;
            top: 45px;
            transform: scale(0.78);
            transform-origin: left top;
          }
          .tp-focus-card {
            right: 0;
            bottom: 55px;
            transform: scale(0.78);
            transform-origin: right bottom;
          }
          .tp-mars-image {
            width: 680px;
            max-width: none;
            bottom: -275px;
          }
          .tp-mars-glow {
            width: 600px;
            height: 200px;
            bottom: -240px;
          }
        }

        /* ========================================================
           SMALL MOBILE
        ======================================================== */

        @media (max-width: 600px) {
          .tp-hero-buttons {
            width: 100%;
            flex-direction: column;
            gap: 10px;
          }
          .tp-get-started,
          .tp-explore {
            width: 100%;
          }
          .tp-trust {
            flex-direction: column;
            gap: 10px;
          }
          .tp-browser-header {
            height: 50px;
            padding: 0 14px;
          }
          .tp-browser-address {
            min-width: 90px;
            height: 30px;
            padding: 0 12px;
          }
          .tp-app-main {
            padding: 15px;
          }
          .tp-app-heading h2 {
            font-size: 21px;
          }
          .tp-app-heading p {
            font-size: 9px;
          }
          .tp-profile {
            width: 31px;
            height: 31px;
          }
          .tp-stats {
            grid-template-columns: 1fr 1fr;
          }
          .tp-mini-stat:last-child {
            grid-column: span 2;
          }
          .tp-mini-stat {
            padding: 12px;
          }
          .tp-mini-stat-value {
            font-size: 15px;
          }
          .tp-schedule {
            padding: 14px;
          }
          .tp-preview-caption {
            flex-direction: column;
            gap: 5px;
          }
          .tp-caption-divider {
            display: none;
          }
          .tp-mars-image {
            width: 560px;
            bottom: -215px;
          }
          .tp-mars-glow {
            width: 500px;
            bottom: -185px;
          }
        }

        /* ========================================================
           REDUCED MOTION
        ======================================================== */

        @media (prefers-reduced-motion: reduce) {
          .tp-eyebrow-dot,
          .tp-ai-live,
          .tp-ai-card,
          .tp-focus-card,
          .tp-mars-image,
          .tp-star {
            animation: none !important;
          }
          .tp-star {
            display: none;
          }
          .tp-browser-window {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ===============================================================
   MINI STAT
================================================================ */

function MiniStat({
  title,
  value,
  change,
  accent,
}: {
  title: string;
  value: string;
  change: string;
  accent: "purple" | "blue" | "green";
}) {
  return (
    <div className="tp-mini-stat">
      <div className="tp-mini-stat-label">
        {title}
      </div>
      <div className="tp-mini-stat-value">
        {value}
      </div>
      <div className="tp-mini-stat-change">
        {change} this week
      </div>
    </div>
  );
}

/* ===============================================================
   SCHEDULE
================================================================ */

function Schedule({
  time,
  title,
  description,
  active = false,
  type = "focus",
}: {
  time: string;
  title: string;
  description: string;
  active?: boolean;
  type?: "focus" | "meeting" | "break";
}) {
  return (
    <div
      className={`tp-schedule-row ${active ? "active" : ""}`}
      data-type={type}
    >
      <div className="tp-schedule-time">
        {time}
      </div>
      <div className="tp-schedule-content">
        <div className="tp-schedule-title">
          {title}
        </div>
        <div className="tp-schedule-description">
          {description}
        </div>
      </div>
    </div>
  );
}