"use client";

import Link from "next/link";
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

export default function Hero() {
  return (
    <section id="top" className="tp-hero">
      {/* =========================================================
          HERO BACKGROUND
      ========================================================== */}

      <div className="tp-hero-background" />

      <div className="tp-hero-glow tp-hero-glow-left" />
      <div className="tp-hero-glow tp-hero-glow-right" />

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

          background: #ffffff;

          color: #050505;
        }

        .tp-hero-background {
          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle at 50% 12%,
              rgba(0, 0, 0, 0.035),
              transparent 32%
            ),
            radial-gradient(
              circle at 10% 55%,
              rgba(139, 92, 246, 0.025),
              transparent 25%
            ),
            radial-gradient(
              circle at 90% 65%,
              rgba(59, 130, 246, 0.022),
              transparent 25%
            );
        }

        .tp-hero-glow {
          position: absolute;

          width: 600px;
          height: 600px;

          border-radius: 50%;

          filter: blur(100px);

          pointer-events: none;

          opacity: 0.3;
        }

        .tp-hero-glow-left {
          top: 150px;
          left: -400px;

          background:
            rgba(139, 92, 246, 0.035);
        }

        .tp-hero-glow-right {
          top: 500px;
          right: -400px;

          background:
            rgba(59, 130, 246, 0.035);
        }

        /* ========================================================
           CONTAINER
        ======================================================== */

        .tp-hero-container {
          position: relative;

          z-index: 2;

          width:
            min(
              1280px,
              calc(100% - 40px)
            );

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

          height: 32px;

          padding: 0 13px;

          border:
            1px solid
            rgba(0, 0, 0, 0.10);

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.78);

          color: #666;

          font-size: 11px;

          font-weight: 600;

          box-shadow:
            0 5px 20px
            rgba(0, 0, 0, 0.035);

          backdrop-filter:
            blur(12px);

          -webkit-backdrop-filter:
            blur(12px);
        }

        .tp-eyebrow-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #000;

          animation:
            tp-pulse
            2.5s
            ease-in-out
            infinite;
        }

        .tp-eyebrow-arrow {
          color: #aaa;
        }

        /* ========================================================
           TITLE
        ======================================================== */

        .tp-hero-title {
          max-width: 1000px;

          margin:
            25px auto 0;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          font-size:
            clamp(
              58px,
              8.5vw,
              118px
            );

          line-height: 0.90;

          letter-spacing: -0.075em;

          font-weight: 720;

          color: #050505;
        }

        .tp-hero-title > span {
          display: block;
        }

        .tp-hero-title-light {
          color: #999;

          font-weight: 420;

          letter-spacing: -0.082em;
        }

        /* ========================================================
           DESCRIPTION
        ======================================================== */

        .tp-hero-description {
          max-width: 620px;

          margin:
            30px auto 0;

          color: #666;

          font-size:
            clamp(
              15px,
              1.5vw,
              18px
            );

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

          padding:
            0 9px 0 25px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 18px;

          border:
            1px solid #000;

          border-radius: 999px;

          background: #000;

          color: #fff;

          font-size: 15px;

          font-weight: 650;

          letter-spacing: -0.025em;

          text-decoration: none;

          box-shadow:
            0 9px 25px
            rgba(0, 0, 0, 0.16);

          transition:
            transform 0.3s
              cubic-bezier(.16,1,.3,1),
            box-shadow 0.3s ease,
            background 0.3s ease;
        }

        .tp-get-started:hover {
          transform:
            translateY(-3px);

          background: #111;

          box-shadow:
            0 15px 35px
            rgba(0, 0, 0, 0.22);
        }

        .tp-get-started-icon {
          width: 40px;
          height: 40px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background: #fff;

          color: #000;

          transition:
            transform 0.3s
              cubic-bezier(.16,1,.3,1);
        }

        .tp-get-started:hover
        .tp-get-started-icon {
          transform:
            translate(
              2px,
              -2px
            )
            rotate(4deg);
        }

        /* ========================================================
           EXPLORE BUTTON
        ======================================================== */

        .tp-explore {
          height: 58px;

          padding:
            0 22px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 20px;

          border:
            1.5px solid
            rgba(0, 0, 0, 0.17);

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.78);

          color: #111;

          font-size: 15px;

          font-weight: 600;

          letter-spacing: -0.025em;

          text-decoration: none;

          box-shadow:
            0 4px 18px
            rgba(0, 0, 0, 0.035);

          backdrop-filter:
            blur(12px);

          -webkit-backdrop-filter:
            blur(12px);

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .tp-explore:hover {
          transform:
            translateY(-3px);

          border-color:
            rgba(0, 0, 0, 0.34);

          background:
            #fff;

          box-shadow:
            0 12px 28px
            rgba(0, 0, 0, 0.08);
        }

        .tp-explore-arrow {
          color: #999;

          font-size: 19px;

          transition:
            transform 0.3s ease,
            color 0.3s ease;
        }

        .tp-explore:hover
        .tp-explore-arrow {
          color: #111;

          transform:
            translateY(3px);
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

          color: #888;

          font-size: 12px;

          font-weight: 500;
        }

        .tp-trust-item {
          display: flex;

          align-items: center;

          gap: 8px;

          transition:
            color 0.25s ease;
        }

        .tp-trust-icon {
          width: 19px;
          height: 19px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border-radius: 50%;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .tp-trust-purple
        .tp-trust-icon {
          background:
            rgba(139, 92, 246, 0.10);

          color:
            #8B5CF6;

          box-shadow:
            0 0 0 4px
            rgba(139, 92, 246, 0.035);
        }

        .tp-trust-purple:hover {
          color:
            #8B5CF6;
        }

        .tp-trust-purple:hover
        .tp-trust-icon {
          transform:
            scale(1.1);

          box-shadow:
            0 0 0 6px
            rgba(139, 92, 246, 0.06);
        }

        .tp-trust-blue
        .tp-trust-icon {
          background:
            rgba(59, 130, 246, 0.10);

          color:
            #3B82F6;

          box-shadow:
            0 0 0 4px
            rgba(59, 130, 246, 0.035);
        }

        .tp-trust-blue:hover {
          color:
            #3B82F6;
        }

        .tp-trust-blue:hover
        .tp-trust-icon {
          transform:
            scale(1.1);

          box-shadow:
            0 0 0 6px
            rgba(59, 130, 246, 0.06);
        }

        .tp-trust-green
        .tp-trust-icon {
          background:
            rgba(16, 185, 129, 0.10);

          color:
            #10B981;

          box-shadow:
            0 0 0 4px
            rgba(16, 185, 129, 0.035);
        }

        .tp-trust-green:hover {
          color:
            #10B981;
        }

        .tp-trust-green:hover
        .tp-trust-icon {
          transform:
            scale(1.1);

          box-shadow:
            0 0 0 6px
            rgba(16, 185, 129, 0.06);
        }

        .tp-trust-divider {
          width: 1px;

          height: 18px;

          background:
            rgba(0, 0, 0, 0.12);
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

          width:
            min(
              1080px,
              calc(100% - 80px)
            );

          margin:
            0 auto;

          overflow: hidden;

          border:
            1px solid
            rgba(0, 0, 0, 0.10);

          border-radius: 30px;

          background: #fff;

          box-shadow:
            0 45px 120px
            rgba(0, 0, 0, 0.13),
            0 15px 45px
            rgba(0, 0, 0, 0.06);

          transform:
            perspective(1600px)
            rotateX(1deg);

          transition:
            transform 0.5s ease,
            box-shadow 0.5s ease;
        }

        .tp-browser-window:hover {
          transform:
            perspective(1600px)
            rotateX(0deg)
            translateY(-4px);

          box-shadow:
            0 55px 125px
            rgba(0, 0, 0, 0.15),
            0 12px 40px
            rgba(0, 0, 0, 0.06);
        }

        /* ========================================================
           BROWSER HEADER
        ======================================================== */

        .tp-browser-header {
          height: 58px;

          padding:
            0 22px;

          display: grid;

          grid-template-columns:
            1fr auto 1fr;

          align-items: center;

          border-bottom:
            1px solid
            rgba(0, 0, 0, 0.07);

          background:
            rgba(255, 255, 255, 0.96);
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

          padding:
            0 18px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1px solid
            rgba(0, 0, 0, 0.07);

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

          grid-template-columns:
            190px
            minmax(0, 1fr);

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
          padding:
            22px 13px;

          display: flex;

          flex-direction: column;

          background: #fff;

          border-right:
            1px solid
            rgba(0, 0, 0, 0.07);

          text-align: left;
        }

        .tp-app-logo {
          width: 36px;

          height: 36px;

          margin:
            0 8px 30px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 11px;

          background: #000;

          color: #fff;

          font-size: 14px;

          font-weight: 700;

          box-shadow:
            0 6px 15px
            rgba(0, 0, 0, 0.14);
        }

        .tp-app-navigation {
          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .tp-app-nav {
          position: relative;

          height: 42px;

          padding:
            0 11px;

          display: flex;

          align-items: center;

          gap: 10px;

          border-radius: 11px;

          color: #999;

          font-size: 11px;

          font-weight: 550;

          transition:
            background 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }

        .tp-app-nav:hover {
          background: #f7f7f7;

          color: #444;

          transform:
            translateX(2px);
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

          padding:
            15px 8px 8px;

          display: flex;

          align-items: center;

          gap: 9px;

          border-top:
            1px solid
            rgba(0, 0, 0, 0.06);
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

          box-shadow:
            0 4px 12px
            rgba(0, 0, 0, 0.12);
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

          padding:
            28px 30px 32px;

          background:
            linear-gradient(
              180deg,
              #f7f7f7 0%,
              #f4f4f4 100%
            );

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
          margin:
            7px 0 4px;

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

          box-shadow:
            0 5px 15px
            rgba(0, 0, 0, 0.14);
        }

        /* ========================================================
           STATS
        ======================================================== */

        .tp-stats {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 10px;

          margin-top: 24px;

          text-align: left;
        }

        .tp-mini-stat {
          min-width: 0;

          padding:
            15px 16px;

          border:
            1px solid
            rgba(0, 0, 0, 0.065);

          border-radius: 14px;

          background:
            rgba(255, 255, 255, 0.82);

          box-shadow:
            0 4px 14px
            rgba(0, 0, 0, 0.025);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;

          text-align: left;
        }

        .tp-mini-stat:hover {
          transform:
            translateY(-2px);

          border-color:
            rgba(0, 0, 0, 0.11);

          box-shadow:
            0 9px 24px
            rgba(0, 0, 0, 0.055);
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

        /* Small accent indicators */

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

          grid-template-columns:
            minmax(0, 1.55fr)
            minmax(220px, 0.75fr);

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

          border:
            1px solid
            rgba(0, 0, 0, 0.065);

          border-radius: 16px;

          background: #fff;

          box-shadow:
            0 5px 18px
            rgba(0, 0, 0, 0.025);

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
          margin:
            5px 0 0;

          color: #111;

          font-size: 15px;

          line-height: 1;

          font-weight: 650;

          letter-spacing: -0.035em;
        }

        .tp-section-heading button {
          padding:
            6px 9px;

          border:
            1px solid
            rgba(0, 0, 0, 0.07);

          border-radius: 7px;

          background: #fafafa;

          color: #888;

          font-size: 9px;

          cursor: pointer;

          transition:
            background 0.2s ease,
            color 0.2s ease;
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

          grid-template-columns:
            54px minmax(0, 1fr);

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

          padding:
            9px 12px;

          border-left:
            1px solid
            #e5e5e5;

          text-align: left;

          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .tp-schedule-row:hover
        .tp-schedule-content {
          background:
            #fafafa;

          border-radius:
            0 9px 9px 0;
        }

        .tp-schedule-row.active
        .tp-schedule-content {
          border-left:
            2px solid
            #111;

          background:
            linear-gradient(
              90deg,
              #f7f7f7,
              #ffffff
            );

          border-radius:
            0 10px 10px 0;
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

        /* ========================================================
           BREAK ROW
        ======================================================== */

        .tp-schedule-row[data-type="break"]
        .tp-schedule-content {
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

          background:
            linear-gradient(
              145deg,
              #151515,
              #0c0c0c
            );

          color: #fff;

          box-shadow:
            0 10px 30px
            rgba(0, 0, 0, 0.13);

          overflow: hidden;

          text-align: left;
        }

        .tp-ai-panel-icon {
          width: 35px;

          height: 35px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1px solid
            rgba(255, 255, 255, 0.08);

          border-radius: 10px;

          background:
            rgba(255, 255, 255, 0.08);

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

          margin:
            10px 0 0;

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

          margin:
            11px 0 0;

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

          background:
            rgba(255, 255, 255, 0.08);
        }

        .tp-progress span {
          display: block;

          width: 94%;

          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              #fff,
              #d0d0d0
            );
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

          left:
            max(
              0px,
              calc(
                (100% - 1160px) / 2
              )
            );

          top: 75px;

          width: 190px;

          padding: 11px;

          display: flex;

          align-items: center;

          gap: 10px;

          border:
            1px solid
            rgba(0, 0, 0, 0.08);

          border-radius: 14px;

          background:
            rgba(255, 255, 255, 0.94);

          backdrop-filter:
            blur(20px);

          -webkit-backdrop-filter:
            blur(20px);

          box-shadow:
            0 20px 45px
            rgba(0, 0, 0, 0.12);

          text-align: left;

          animation:
            tp-float-one
            5s
            ease-in-out
            infinite;
        }

        .tp-ai-card-icon {
          width: 35px;

          height: 35px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 10px;

          background: #000;

          color: #fff;
        }

        .tp-ai-card-content {
          min-width: 0;

          text-align: left;
        }

        .tp-ai-card-title {
          color: #111;

          font-size: 10px;

          font-weight: 700;
        }

        .tp-ai-card-subtitle {
          margin-top: 3px;

          color: #999;

          font-size: 8px;
        }

        .tp-ai-live {
          width: 6px;

          height: 6px;

          margin-left: auto;

          flex-shrink: 0;

          border-radius: 50%;

          background: #111;

          animation:
            tp-pulse
            2s
            ease-in-out
            infinite;
        }

        /* ========================================================
           FLOATING FOCUS CARD
        ======================================================== */

        .tp-focus-card {
          position: absolute;

          z-index: 5;

          right:
            max(
              0px,
              calc(
                (100% - 1160px) / 2
              )
            );

          bottom: 75px;

          width: 150px;

          padding: 11px;

          display: flex;

          align-items: center;

          gap: 9px;

          border:
            1px solid
            rgba(0, 0, 0, 0.07);

          border-radius: 14px;

          background:
            rgba(255, 255, 255, 0.94);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          box-shadow:
            0 20px 45px
            rgba(0, 0, 0, 0.10);

          text-align: left;

          animation:
            tp-float-two
            6s
            ease-in-out
            infinite;
        }

        .tp-focus-card-icon {
          width: 34px;

          height: 34px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 10px;

          background: #f1f1f1;

          color: #111;
        }

        .tp-focus-card-label {
          color: #999;

          font-size: 8px;
        }

        .tp-focus-card-time {
          margin-top: 2px;

          color: #111;

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

          color: #aaa;

          font-size: 9px;

          font-weight: 500;
        }

        .tp-caption-divider {
          width: 30px;

          height: 1px;

          background: #ddd;
        }

        /* ========================================================
           ANIMATIONS
        ======================================================== */

        @keyframes tp-pulse {
          0%,
          100% {
            transform: scale(0.8);

            opacity: 0.5;
          }

          50% {
            transform: scale(1.1);

            opacity: 1;
          }
        }

        @keyframes tp-float-one {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-8px);
          }
        }

        @keyframes tp-float-two {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(8px);
          }
        }

        /* ========================================================
           TABLET
        ======================================================== */

        @media (max-width: 1100px) {
          .tp-browser-window {
            width:
              calc(100% - 40px);
          }
        }

        @media (max-width: 900px) {
          .tp-app {
            grid-template-columns:
              165px
              minmax(0, 1fr);
          }

          .tp-app-main {
            padding:
              23px;
          }

          .tp-dashboard-grid {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .tp-ai-panel {
            min-height:
              190px;
          }

          .tp-ai-card {
            left: 4px;
          }

          .tp-focus-card {
            right: 4px;
          }
        }

        /* ========================================================
           MOBILE
        ======================================================== */

        @media (max-width: 720px) {
          .tp-hero {
            padding-top:
              115px;

            padding-bottom:
              60px;
          }

          .tp-hero-container {
            width:
              calc(100% - 28px);
          }

          .tp-hero-title {
            font-size:
              clamp(
                48px,
                14vw,
                76px
              );
          }

          .tp-hero-description {
            max-width:
              480px;

            font-size:
              15px;
          }

          .tp-trust {
            flex-wrap:
              wrap;

            max-width:
              440px;

            margin-left:
              auto;

            margin-right:
              auto;
          }

          .tp-trust-divider {
            display:
              none;
          }

          .tp-preview-wrapper {
            margin-top:
              50px;
          }

          .tp-browser-window {
            width:
              100%;

            border-radius:
              22px;
          }

          .tp-app {
            grid-template-columns:
              1fr;
          }

          .tp-app-sidebar {
            display:
              none;
          }

          .tp-app-main {
            padding:
              18px;
          }

          .tp-app-heading h2 {
            font-size:
              23px;
          }

          .tp-dashboard-grid {
            grid-template-columns:
              1fr;
          }

          .tp-ai-panel {
            min-height:
              180px;
          }

          .tp-ai-card {
            left: 0;

            top: 45px;

            transform:
              scale(0.78);

            transform-origin:
              left top;
          }

          .tp-focus-card {
            right: 0;

            bottom: 55px;

            transform:
              scale(0.78);

            transform-origin:
              right bottom;
          }
        }

        /* ========================================================
           SMALL MOBILE
        ======================================================== */

        @media (max-width: 600px) {
          .tp-hero-buttons {
            width:
              100%;

            flex-direction:
              column;

            gap:
              10px;
          }

          .tp-get-started,
          .tp-explore {
            width:
              100%;
          }

          .tp-trust {
            flex-direction:
              column;

            gap:
              10px;
          }

          .tp-browser-header {
            height:
              50px;

            padding:
              0 14px;
          }

          .tp-browser-address {
            min-width:
              90px;

            height:
              30px;

            padding:
              0 12px;
          }

          .tp-app-main {
            padding:
              15px;
          }

          .tp-app-heading h2 {
            font-size:
              21px;
          }

          .tp-app-heading p {
            font-size:
              9px;
          }

          .tp-profile {
            width:
              31px;

            height:
              31px;
          }

          .tp-stats {
            grid-template-columns:
              1fr 1fr;
          }

          .tp-mini-stat:last-child {
            grid-column:
              span 2;
          }

          .tp-mini-stat {
            padding:
              12px;
          }

          .tp-mini-stat-value {
            font-size:
              15px;
          }

          .tp-schedule {
            padding:
              14px;
          }

          .tp-preview-caption {
            flex-direction:
              column;

            gap:
              5px;
          }

          .tp-caption-divider {
            display:
              none;
          }
        }

        /* ========================================================
           REDUCED MOTION
        ======================================================== */

        @media (prefers-reduced-motion: reduce) {
          .tp-eyebrow-dot,
          .tp-ai-live,
          .tp-ai-card,
          .tp-focus-card {
            animation:
              none !important;
          }

          .tp-browser-window {
            transform:
              none;
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
      className={`tp-schedule-row ${
        active ? "active" : ""
      }`}
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