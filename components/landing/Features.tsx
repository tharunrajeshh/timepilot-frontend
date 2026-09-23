"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  Sparkles,
  Target,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "AI day planning",
    description:
      "Give TimePilot your tasks, deadlines and available hours. AI turns them into a realistic plan that protects your focus.",
    tag: "PLAN",
    color: "#8B5CF6",
    soft: "rgba(139, 92, 246, 0.09)",
  },
  {
    number: "02",
    title: "Smart task control",
    description:
      "Know what deserves your attention. Prioritize tasks, estimate effort and keep your entire workload organized.",
    tag: "ORGANIZE",
    color: "#3B82F6",
    soft: "rgba(59, 130, 246, 0.09)",
  },
  {
    number: "03",
    title: "Focus analytics",
    description:
      "See where your time goes. Track focus sessions, productivity patterns and progress without complicated reports.",
    tag: "UNDERSTAND",
    color: "#10B981",
    soft: "rgba(16, 185, 129, 0.09)",
  },
];

export default function Features() {
  const [active, setActive] = useState(0);

  const activeFeature = features[active];

  return (
    <section
      id="features"
      className="tp-features"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="tp-features-background" />

      <div
        className="tp-features-glow"
        style={{
          background: activeFeature.soft,
        }}
      />

      <div className="tp-features-container">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="tp-features-header">

          <div className="tp-features-heading">

            <div className="tp-section-eyebrow">
              <span
                className="tp-section-eyebrow-line"
                style={{
                  background:
                    activeFeature.color,
                }}
              />

              <span
                style={{
                  color:
                    activeFeature.color,
                }}
              >
                EVERYTHING IN ONE PLACE
              </span>
            </div>

            <h2>
              Your time.
              <br />

              <span>
                Better managed.
              </span>
            </h2>
          </div>

          <div className="tp-features-intro">
            <p>
              TimePilot brings planning, task management
              and productivity insights into one calm
              workspace — so you spend less time organizing
              your day and more time actually doing the work.
            </p>

            <div className="tp-feature-intro-line">
              <span />
              <span />
              <span />
            </div>
          </div>

        </div>

        {/* ===================================================
            FEATURE NAVIGATION
        ==================================================== */}

        <div className="tp-feature-list">

          {features.map((feature, index) => (
            <button
              key={feature.number}
              type="button"
              onClick={() => setActive(index)}
              className={`tp-feature-row ${
                active === index
                  ? "is-active"
                  : ""
              }`}
              style={
                active === index
                  ? ({
                      "--feature-color":
                        feature.color,
                      "--feature-soft":
                        feature.soft,
                    } as React.CSSProperties)
                  : undefined
              }
            >

              {/* Number */}

              <div className="tp-feature-number">
                {feature.number}
              </div>

              {/* Icon */}

              <div
                className="tp-feature-icon"
                style={
                  active === index
                    ? {
                        color:
                          feature.color,
                        background:
                          feature.soft,
                        borderColor:
                          `${feature.color}30`,
                      }
                    : undefined
                }
              >
                {index === 0 && (
                  <Sparkles size={17} />
                )}

                {index === 1 && (
                  <Check size={17} />
                )}

                {index === 2 && (
                  <BarChart3 size={17} />
                )}
              </div>

              {/* Content */}

              <div className="tp-feature-content">

                <div className="tp-feature-title-row">

                  <h3>
                    {feature.title}
                  </h3>

                  <span
                    className="tp-feature-tag"
                    style={
                      active === index
                        ? {
                            color:
                              feature.color,
                          }
                        : undefined
                    }
                  >
                    {feature.tag}
                  </span>

                </div>

                <p>
                  {feature.description}
                </p>

              </div>

              {/* Arrow */}

              <div
                className="tp-feature-arrow"
                style={
                  active === index
                    ? {
                        background:
                          feature.color,
                        borderColor:
                          feature.color,
                        color:
                          "#ffffff",
                      }
                    : undefined
                }
              >
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                />
              </div>

            </button>
          ))}

        </div>

        {/* ===================================================
            ACTIVE PREVIEW
        ==================================================== */}

        <div className="tp-feature-preview">

          {active === 0 && (
            <AIPlanningPreview />
          )}

          {active === 1 && (
            <TaskPreview />
          )}

          {active === 2 && (
            <AnalyticsPreview />
          )}

        </div>

      </div>

      <style jsx>{`

        /* =====================================================
           SECTION
        ====================================================== */

        .tp-features {
          position: relative;

          width: 100%;

          padding:
            130px 24px
            140px;

          overflow: hidden;

          background: #ffffff;

          color: #080808;
        }

        .tp-features-background {
          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle at 15% 25%,
              rgba(139, 92, 246, 0.025),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 70%,
              rgba(59, 130, 246, 0.025),
              transparent 30%
            );
        }

        .tp-features-glow {
          position: absolute;

          width: 500px;

          height: 500px;

          right: -260px;

          top: 28%;

          border-radius: 50%;

          filter: blur(110px);

          opacity: 0.7;

          pointer-events: none;

          transition:
            background 0.7s ease;
        }

        .tp-features-container {
          position: relative;

          z-index: 2;

          width:
            min(
              1180px,
              100%
            );

          margin: 0 auto;
        }

        /* =====================================================
           HEADER
        ====================================================== */

        .tp-features-header {
          display: grid;

          grid-template-columns:
            0.9fr
            1.1fr;

          gap: 80px;

          align-items: end;
        }

        .tp-section-eyebrow {
          display: flex;

          align-items: center;

          gap: 11px;

          margin-bottom: 22px;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 0.24em;
        }

        .tp-section-eyebrow-line {
          width: 30px;

          height: 2px;

          transition:
            background 0.5s ease;
        }

        .tp-features-heading h2 {
          margin: 0;

          color: #070707;

          font-size:
            clamp(
              48px,
              6vw,
              78px
            );

          line-height: 0.94;

          font-weight: 700;

          letter-spacing: -0.075em;
        }

        .tp-features-heading h2 span {
          color: #555;

          font-weight: 500;
        }

        .tp-features-intro {
          padding-bottom: 4px;
        }

        .tp-features-intro p {
          max-width: 520px;

          margin: 0;

          color: #555;

          font-size: 16px;

          line-height: 1.8;

          letter-spacing: -0.015em;

          font-weight: 500;
        }

        .tp-feature-intro-line {
          display: flex;

          gap: 5px;

          margin-top: 26px;
        }

        .tp-feature-intro-line span {
          width: 28px;

          height: 3px;

          border-radius: 999px;

          background: #e7e7e7;
        }

        .tp-feature-intro-line span:first-child {
          width: 52px;

          background: #111;
        }

        /* =====================================================
           FEATURE LIST
        ====================================================== */

        .tp-feature-list {
          margin-top: 75px;

          border-top:
            1px solid
            rgba(0, 0, 0, 0.12);
        }

        .tp-feature-row {
          position: relative;

          width: 100%;

          min-height: 126px;

          padding:
            25px 0;

          display: grid;

          grid-template-columns:
            55px
            52px
            minmax(0, 1fr)
            42px;

          gap: 22px;

          align-items: center;

          border: 0;

          border-bottom:
            1px solid
            rgba(0, 0, 0, 0.12);

          background: transparent;

          color: #111;

          text-align: left;

          cursor: pointer;

          transition:
            background 0.35s ease,
            padding 0.35s ease;
        }

        .tp-feature-row:hover {
          padding-left: 10px;

          padding-right: 10px;

          background:
            rgba(0, 0, 0, 0.02);
        }

        .tp-feature-row.is-active {
          padding-left: 14px;

          padding-right: 14px;

          background:
            var(--feature-soft);
        }

        .tp-feature-row::before {
          content: "";

          position: absolute;

          left: 0;

          top: 0;

          width: 3px;

          height: 0;

          border-radius: 999px;

          background:
            var(--feature-color);

          transition:
            height 0.35s ease;
        }

        .tp-feature-row.is-active::before {
          height: 100%;
        }

        /* =====================================================
           NUMBER
        ====================================================== */

        .tp-feature-number {
          color: #999;

          font-size: 12px;

          font-weight: 700;

          letter-spacing: 0.08em;

          transition:
            color 0.3s ease;
        }

        .tp-feature-row.is-active
        .tp-feature-number {
          color:
            var(--feature-color);
        }

        /* =====================================================
           ICON
        ====================================================== */

        .tp-feature-icon {
          width: 44px;

          height: 44px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1.5px solid
            rgba(0, 0, 0, 0.12);

          border-radius: 13px;

          background:
            #fafafa;

          color: #888;

          transition:
            all 0.35s ease;
        }

        .tp-feature-row:hover
        .tp-feature-icon {
          transform:
            translateY(-2px);

          color: #333;

          background: #fff;

          box-shadow:
            0 7px 20px
            rgba(0, 0, 0, 0.08);
        }

        .tp-feature-row.is-active
        .tp-feature-icon {
          box-shadow:
            0 8px 24px
            rgba(0, 0, 0, 0.08);
        }

        /* =====================================================
           CONTENT
        ====================================================== */

        .tp-feature-content {
          min-width: 0;
        }

        .tp-feature-title-row {
          display: flex;

          align-items: center;

          gap: 16px;
        }

        .tp-feature-content h3 {
          margin: 0;

          color: #333;

          font-size: 26px;

          line-height: 1.1;

          font-weight: 700;

          letter-spacing: -0.045em;

          transition:
            color 0.3s ease;
        }

        .tp-feature-row:hover
        .tp-feature-content h3 {
          color: #000;
        }

        .tp-feature-row.is-active
        .tp-feature-content h3 {
          color: #0a0a0a;
        }

        .tp-feature-content p {
          max-width: 650px;

          margin: 9px 0 0;

          color: #666;

          font-size: 13px;

          line-height: 1.6;

          font-weight: 500;

          transition:
            color 0.3s ease;
        }

        .tp-feature-row.is-active
        .tp-feature-content p {
          color: #555;
        }

        /* =====================================================
           TAG
        ====================================================== */

        .tp-feature-tag {
          padding:
            6px 10px;

          border-radius: 999px;

          background:
            rgba(0, 0, 0, 0.06);

          color: #888;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 0.15em;

          transition:
            color 0.3s ease;
        }

        /* =====================================================
           ARROW
        ====================================================== */

        .tp-feature-arrow {
          width: 38px;

          height: 38px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1.5px solid
            rgba(0, 0, 0, 0.12);

          border-radius: 50%;

          background: #fff;

          color: #999;

          transition:
            all 0.35s
            cubic-bezier(.16,1,.3,1);
        }

        .tp-feature-row:hover
        .tp-feature-arrow {
          transform:
            translateX(3px);

          color: #111;

          border-color:
            rgba(0, 0, 0, 0.25);
        }

        .tp-feature-row.is-active
        .tp-feature-arrow {
          transform:
            translateX(0);
        }

        /* =====================================================
           PREVIEW
        ====================================================== */

        .tp-feature-preview {
          margin-top: 26px;

          animation:
            tp-preview-in
            0.45s
            ease-out;
        }

        @keyframes tp-preview-in {
          from {
            opacity: 0;

            transform:
              translateY(12px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        /* =====================================================
           PREVIEW BASE
        ====================================================== */

        .tp-preview {
          position: relative;

          min-height: 390px;

          padding: 32px;

          overflow: hidden;

          border:
            1px solid
            rgba(0, 0, 0, 0.12);

          border-radius: 28px;

          background:
            #f7f7f7;

          box-shadow:
            0 25px 70px
            rgba(0, 0, 0, 0.08);
        }

        .tp-preview::before {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.9),
              transparent 45%
            );
        }

        /* =====================================================
           AI PREVIEW
        ====================================================== */

        .tp-ai-preview {
          display: grid;

          grid-template-columns:
            0.75fr
            1.25fr;

          gap: 50px;

          align-items: center;
        }

        .tp-preview-copy {
          position: relative;

          z-index: 2;
        }

        .tp-preview-icon {
          width: 46px;

          height: 46px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 14px;

          color: #8B5CF6;

          background:
            rgba(139, 92, 246, 0.12);

          border:
            1.5px solid
            rgba(139, 92, 246, 0.2);
        }

        .tp-preview-label {
          margin-top: 20px;

          color: #8B5CF6;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 0.2em;
        }

        .tp-preview-copy h3 {
          max-width: 430px;

          margin:
            11px 0 0;

          color: #111;

          font-size:
            clamp(
              25px,
              3vw,
              36px
            );

          line-height: 1.1;

          font-weight: 700;

          letter-spacing: -0.06em;
        }

        .tp-preview-copy > p {
          max-width: 410px;

          margin-top: 16px;

          color: #666;

          font-size: 14px;

          line-height: 1.7;

          font-weight: 500;
        }

        /* =====================================================
           SCHEDULE CARD
        ====================================================== */

        .tp-schedule-card {
          position: relative;

          z-index: 2;

          padding: 21px;

          border:
            1px solid
            rgba(0, 0, 0, 0.12);

          border-radius: 20px;

          background:
            rgba(255, 255, 255, 0.9);

          box-shadow:
            0 20px 45px
            rgba(0, 0, 0, 0.08);

          backdrop-filter:
            blur(15px);
        }

        .tp-card-top {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 18px;
        }

        .tp-card-title {
          color: #111;

          font-size: 13px;

          font-weight: 700;
        }

        .tp-card-subtitle {
          margin-top: 3px;

          color: #888;

          font-size: 9px;

          font-weight: 500;
        }

        .tp-card-pill {
          padding:
            6px 10px;

          border-radius: 999px;

          background:
            rgba(139, 92, 246, 0.12);

          color:
            #8B5CF6;

          font-size: 8px;

          font-weight: 800;

          letter-spacing: 0.1em;
        }

        .tp-ai-row {
          min-height: 54px;

          display: grid;

          grid-template-columns:
            48px
            4px
            minmax(0, 1fr)
            auto;

          align-items: center;

          gap: 10px;

          padding: 9px;

          border:
            1px solid
            rgba(0, 0, 0, 0.08);

          border-radius: 11px;

          background: #fafafa;

          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .tp-ai-row:hover {
          transform:
            translateX(3px);

          background: #fff;
        }

        .tp-ai-time {
          color: #999;

          font-size: 9px;

          font-weight: 700;
        }

        .tp-ai-line {
          width: 3px;

          height: 28px;

          border-radius: 999px;

          background: #ddd;
        }

        .tp-ai-row.primary
        .tp-ai-line {
          background:
            #8B5CF6;
        }

        .tp-ai-row.break
        .tp-ai-line {
          background:
            #ddd;
        }

        .tp-ai-title {
          color: #333;

          font-size: 10px;

          font-weight: 700;
        }

        .tp-ai-duration {
          color: #999;

          font-size: 9px;

          font-weight: 600;
        }

        /* =====================================================
           TASK PREVIEW
        ====================================================== */

        .tp-task-preview {
          display: grid;

          grid-template-columns:
            0.75fr
            1.25fr;

          gap: 50px;

          align-items: center;
        }

        .tp-task-icon {
          color: #3B82F6;

          background:
            rgba(59, 130, 246, 0.12);

          border-color:
            rgba(59, 130, 246, 0.2);
        }

        .tp-task-label {
          color: #3B82F6;
        }

        .tp-task-card {
          position: relative;

          z-index: 2;

          padding: 21px;

          border:
            1px solid
            rgba(0, 0, 0, 0.12);

          border-radius: 20px;

          background:
            rgba(255, 255, 255, 0.9);

          box-shadow:
            0 20px 45px
            rgba(0, 0, 0, 0.08);

          backdrop-filter:
            blur(15px);
        }

        .tp-task-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 18px;
        }

        .tp-task-count {
          color: #888;

          font-size: 9px;

          font-weight: 600;
        }

        .tp-task-item {
          padding:
            13px;

          border:
            1px solid
            rgba(0, 0, 0, 0.08);

          border-radius: 12px;

          background: #fafafa;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .tp-task-item + .tp-task-item {
          margin-top: 9px;
        }

        .tp-task-item:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0 8px 22px
            rgba(0, 0, 0, 0.08);
        }

        .tp-task-item-top {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;
        }

        .tp-task-name {
          overflow: hidden;

          color: #333;

          font-size: 10px;

          font-weight: 700;

          white-space: nowrap;

          text-overflow: ellipsis;
        }

        .tp-task-percent {
          color: #3B82F6;

          font-size: 9px;

          font-weight: 800;
        }

        .tp-task-meta {
          margin-top: 4px;

          color: #888;

          font-size: 8px;

          font-weight: 600;
        }

        .tp-task-progress {
          height: 4px;

          margin-top: 10px;

          overflow: hidden;

          border-radius: 999px;

          background: #e9e9e9;
        }

        .tp-task-progress span {
          display: block;

          height: 100%;

          border-radius: inherit;

          background: #3B82F6;
        }

        /* =====================================================
           ANALYTICS PREVIEW
        ====================================================== */

        .tp-analytics-preview {
          display: grid;

          grid-template-columns:
            0.75fr
            1.25fr;

          gap: 50px;

          align-items: center;
        }

        .tp-analytics-icon {
          color: #10B981;

          background:
            rgba(16, 185, 129, 0.12);

          border-color:
            rgba(16, 185, 129, 0.2);
        }

        .tp-analytics-label {
          color: #10B981;
        }

        .tp-analytics-stats {
          display: flex;

          gap: 30px;

          margin-top: 24px;
        }

        .tp-analytics-stat strong {
          display: block;

          color: #111;

          font-size: 28px;

          line-height: 1;

          letter-spacing: -0.05em;

          font-weight: 800;
        }

        .tp-analytics-stat span {
          display: block;

          margin-top: 6px;

          color: #888;

          font-size: 9px;

          font-weight: 700;
        }

        /* =====================================================
           CHART
        ====================================================== */

        .tp-chart-card {
          position: relative;

          z-index: 2;

          padding: 21px;

          border:
            1px solid
            rgba(0, 0, 0, 0.12);

          border-radius: 20px;

          background:
            rgba(255, 255, 255, 0.9);

          box-shadow:
            0 20px 45px
            rgba(0, 0, 0, 0.08);
        }

        .tp-chart-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 22px;
        }

        .tp-chart-title {
          color: #222;

          font-size: 12px;

          font-weight: 800;
        }

        .tp-chart-change {
          color: #10B981;

          font-size: 9px;

          font-weight: 700;
        }

        .tp-bars {
          height: 170px;

          display: flex;

          align-items: flex-end;

          gap: 8px;

          padding:
            10px 3px 0;

          border-bottom:
            1px solid
            rgba(0, 0, 0, 0.08);
        }

        .tp-bar {
          position: relative;

          flex: 1;

          height: 100%;

          display: flex;

          align-items: flex-end;
        }

        .tp-bar span {
          width: 100%;

          min-height: 8px;

          border-radius:
            5px 5px 2px 2px;

          background:
            #e8e8e8;

          transition:
            height 0.5s ease,
            background 0.25s ease;
        }

        .tp-bar:hover span {
          background:
            #bdbdbd;
        }

        .tp-bar:last-child span {
          background:
            #10B981;
        }

        .tp-chart-labels {
          display: flex;

          justify-content: space-between;

          padding-top: 10px;
        }

        .tp-chart-labels span {
          color: #888;

          font-size: 8px;

          font-weight: 700;
        }

        /* =====================================================
           TABLET
        ====================================================== */

        @media (max-width: 900px) {

          .tp-features {
            padding:
              100px 22px
              110px;
          }

          .tp-features-header {
            grid-template-columns:
              1fr;

            gap: 30px;
          }

          .tp-feature-list {
            margin-top: 55px;
          }

          .tp-feature-row {
            grid-template-columns:
              45px
              48px
              minmax(0, 1fr)
              40px;

            gap: 15px;
          }

          .tp-ai-preview,
          .tp-task-preview,
          .tp-analytics-preview {
            grid-template-columns:
              1fr;

            gap: 30px;
          }

          .tp-preview {
            padding: 25px;
          }

        }

        /* =====================================================
           MOBILE
        ====================================================== */

        @media (max-width: 640px) {

          .tp-features {
            padding:
              80px 18px
              90px;
          }

          .tp-features-heading h2 {
            font-size:
              clamp(
                44px,
                13vw,
                62px
              );
          }

          .tp-features-intro p {
            font-size: 14px;

            line-height: 1.7;
          }

          .tp-feature-list {
            margin-top: 45px;
          }

          .tp-feature-row {
            grid-template-columns:
              35px
              42px
              minmax(0, 1fr);

            gap: 10px;

            padding:
              22px 0;
          }

          .tp-feature-row:hover,
          .tp-feature-row.is-active {
            padding-left: 10px;

            padding-right: 10px;
          }

          .tp-feature-arrow {
            display: none;
          }

          .tp-feature-number {
            font-size: 10px;
          }

          .tp-feature-icon {
            width: 38px;

            height: 38px;

            border-radius: 11px;
          }

          .tp-feature-content h3 {
            font-size: 18px;
          }

          .tp-feature-title-row {
            gap: 8px;

            flex-wrap: wrap;
          }

          .tp-feature-tag {
            font-size: 7px;
          }

          .tp-feature-content p {
            font-size: 11px;

            line-height: 1.6;
          }

          .tp-feature-preview {
            margin-top: 18px;
          }

          .tp-preview {
            min-height: auto;

            padding: 20px;

            border-radius: 22px;
          }

          .tp-preview-copy h3 {
            font-size: 28px;
          }

          .tp-preview-copy > p {
            font-size: 12px;
          }

          .tp-schedule-card,
          .tp-task-card,
          .tp-chart-card {
            padding: 15px;

            border-radius: 16px;
          }

          .tp-ai-row {
            grid-template-columns:
              42px
              3px
              minmax(0, 1fr)
              auto;

            gap: 7px;
          }

          .tp-bars {
            height: 135px;

            gap: 5px;
          }

        }

        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {

          .tp-feature-preview,
          .tp-feature-row,
          .tp-feature-icon,
          .tp-feature-arrow,
          .tp-ai-row,
          .tp-task-item,
          .tp-bar span {
            animation: none !important;

            transition: none !important;
          }

        }

      `}</style>
    </section>
  );
}


/* ===============================================================
   AI PLANNING PREVIEW
================================================================ */

function AIPlanningPreview() {
  return (
    <div className="tp-preview tp-ai-preview">

      <div className="tp-preview-copy">

        <div className="tp-preview-icon">
          <Sparkles size={19} />
        </div>

        <div className="tp-preview-label">
          AI-POWERED PLANNING
        </div>

        <h3>
          Start your day with a plan
          that actually makes sense.
        </h3>

        <p>
          TimePilot looks at priority, estimated
          effort, deadlines and your available
          time to create a balanced schedule.
        </p>

      </div>

      <div className="tp-schedule-card">

        <div className="tp-card-top">

          <div>
            <div className="tp-card-title">
              AI suggested schedule
            </div>

            <div className="tp-card-subtitle">
              Optimized around your priorities
            </div>
          </div>

          <div className="tp-card-pill">
            OPTIMIZED
          </div>

        </div>

        <div className="space-y-2">

          <AIScheduleRow
            time="09:00"
            title="Product analysis"
            duration="2h"
            primary
          />

          <AIScheduleRow
            time="11:30"
            title="Team stand-up"
            duration="30m"
          />

          <AIScheduleRow
            time="12:15"
            title="Recovery break"
            duration="15m"
            muted
          />

          <AIScheduleRow
            time="14:00"
            title="Build dashboard"
            duration="2h"
            primary
          />

        </div>

      </div>

    </div>
  );
}


/* ===============================================================
   TASK PREVIEW
================================================================ */

function TaskPreview() {
  return (
    <div className="tp-preview tp-task-preview">

      <div className="tp-preview-copy">

        <div className="tp-preview-icon tp-task-icon">
          <Target size={19} />
        </div>

        <div className="tp-preview-label tp-task-label">
          SMART TASK CONTROL
        </div>

        <h3>
          Know exactly what
          deserves your attention.
        </h3>

        <p>
          Keep priorities visible, break large
          tasks into manageable sessions and make
          progress without losing context.
        </p>

      </div>

      <div className="tp-task-card">

        <div className="tp-task-header">

          <div>
            <div className="tp-card-title">
              Priority tasks
            </div>

            <div className="tp-card-subtitle">
              Your workload at a glance
            </div>
          </div>

          <div className="tp-task-count">
            8 completed · 11 total
          </div>

        </div>

        <TaskItem
          title="Finish product analysis"
          meta="High priority · 1h 30m"
          progress={82}
          active
        />

        <TaskItem
          title="Prepare team presentation"
          meta="Medium priority · 45m"
          progress={56}
        />

        <TaskItem
          title="Review database migration"
          meta="Medium priority · 30m"
          progress={35}
        />

      </div>

    </div>
  );
}


/* ===============================================================
   ANALYTICS PREVIEW
================================================================ */

function AnalyticsPreview() {
  const bars = [
    35,
    52,
    44,
    68,
    58,
    82,
    72,
    91,
    76,
    88,
    64,
    95,
  ];

  return (
    <div className="tp-preview tp-analytics-preview">

      <div className="tp-preview-copy">

        <div className="tp-preview-icon tp-analytics-icon">
          <BarChart3 size={19} />
        </div>

        <div className="tp-preview-label tp-analytics-label">
          FOCUS ANALYTICS
        </div>

        <h3>
          Understand your productivity
          without the noise.
        </h3>

        <p>
          Simple metrics show when you focus
          best, how much work you complete and
          where your time is going.
        </p>

        <div className="tp-analytics-stats">

          <div className="tp-analytics-stat">
            <strong>87%</strong>

            <span>
              Focus score
            </span>
          </div>

          <div className="tp-analytics-stat">
            <strong>4.6h</strong>

            <span>
              Deep work
            </span>
          </div>

        </div>

      </div>

      <div className="tp-chart-card">

        <div className="tp-chart-header">

          <div className="tp-chart-title">
            Focus activity
          </div>

          <div className="tp-chart-change">
            +18% this week
          </div>

        </div>

        <div className="tp-bars">

          {bars.map((height, index) => (
            <div
              key={index}
              className="tp-bar"
            >
              <span
                style={{
                  height:
                    `${height}%`,
                }}
              />
            </div>
          ))}

        </div>

        <div className="tp-chart-labels">
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
          <span>SUN</span>
        </div>

      </div>

    </div>
  );
}


/* ===============================================================
   AI SCHEDULE ROW
================================================================ */

function AIScheduleRow({
  time,
  title,
  duration,
  primary = false,
  muted = false,
}: {
  time: string;
  title: string;
  duration: string;
  primary?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="tp-ai-row">

      <span className="tp-ai-time">
        {time}
      </span>

      <span
        className={`tp-ai-line ${
          primary
            ? "primary"
            : muted
              ? "break"
              : ""
        }`}
      />

      <span
        className="tp-ai-title"
        style={{
          color: muted
            ? "#aaa"
            : undefined,
        }}
      >
        {title}
      </span>

      <span className="tp-ai-duration">
        {duration}
      </span>

    </div>
  );
}


/* ===============================================================
   TASK ITEM
================================================================ */

function TaskItem({
  title,
  meta,
  progress,
  active = false,
}: {
  title: string;
  meta: string;
  progress: number;
  active?: boolean;
}) {
  return (
    <div className="tp-task-item">

      <div className="tp-task-item-top">

        <div className="tp-task-name">
          {title}
        </div>

        <div
          className="tp-task-percent"
          style={{
            color:
              active
                ? "#3B82F6"
                : "#999",
          }}
        >
          {progress}%
        </div>

      </div>

      <div className="tp-task-meta">
        {meta}
      </div>

      <div className="tp-task-progress">
        <span
          style={{
            width:
              `${progress}%`,
            background:
              active
                ? "#3B82F6"
                : "#cfcfcf",
          }}
        />
      </div>

    </div>
  );
}