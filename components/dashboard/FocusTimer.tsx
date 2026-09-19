"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import GlassCard from "./GlassCard";

/* ================================================================
   TYPES
================================================================ */

type FocusTimerProps = {
  initialMinutes?: number;
  taskTitle?: string;
  onComplete?: () => void;
};

/* ================================================================
   CONSTANTS
================================================================ */

const RADIUS = 94;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MAX_TITLE_LEN = 120;
const MIN_MINUTES = 1;
const MAX_MINUTES = 180;
const TICK_MS = 250;

/* ================================================================
   HELPERS
================================================================ */

function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function clampMinutes(input: unknown): number {
  const n = Number(input);
  if (!Number.isFinite(n)) return 25;
  return Math.min(Math.max(Math.round(n), MIN_MINUTES), MAX_MINUTES);
}

function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60).toString().padStart(2, "0");
  const secs = (safe % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

/* ================================================================
   COMPONENT
================================================================ */

export default function FocusTimer({
  initialMinutes = 25,
  taskTitle = "Focus session",
  onComplete,
}: FocusTimerProps) {
  const minutes = clampMinutes(initialMinutes);
  const initialSeconds = minutes * 60;

  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  /* Deadline timestamp is the source of truth while running.
     `null` means the timer is paused or idle. */
  const endAtRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const aliveRef = useRef(true);
  const onCompleteRef = useRef(onComplete);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Keep the latest callback without restarting the countdown effect. */
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  /* Unmount guard. */
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  /* Reset when the caller changes the duration. */
  useEffect(() => {
    setRunning(false);
    endAtRef.current = null;
    completedRef.current = false;
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  /* ----------------------------------------------------------
     COUNTDOWN — timestamp based, throttle-immune
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!running) return;
    if (endAtRef.current === null) return;

    const tick = () => {
      const end = endAtRef.current;
      if (end === null) return;

      const msLeft = end - Date.now();
      const next = Math.max(0, Math.round(msLeft / 1000));

      setSecondsLeft(next);

      if (next <= 0 && !completedRef.current) {
        completedRef.current = true;
        endAtRef.current = null;
        setRunning(false);

        if (aliveRef.current) {
          try {
            onCompleteRef.current?.();
          } catch {
            /* A throwing callback must never crash the timer. */
          }
        }
      }
    };

    tick();
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  /* ----------------------------------------------------------
     TAB TITLE
  ---------------------------------------------------------- */

  const safeTitle = useMemo(
    () => safeText(taskTitle, MAX_TITLE_LEN).trim() || "Focus session",
    [taskTitle]
  );

  useEffect(() => {
    if (!running) return;

    const previous = document.title;
    document.title = `${formatTime(secondsLeft)} · ${safeTitle}`;

    return () => {
      document.title = previous;
    };
  }, [running, secondsLeft, safeTitle]);

  /* ----------------------------------------------------------
     CONTROLS
  ---------------------------------------------------------- */

  const reset = useCallback(() => {
    endAtRef.current = null;
    completedRef.current = false;
    setRunning(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  const handleToggle = useCallback(() => {
    if (running) {
      // Pause — freeze the remaining time so we can resume precisely.
      if (endAtRef.current !== null) {
        const remainingMs = Math.max(0, endAtRef.current - Date.now());
        endAtRef.current = null;
        setSecondsLeft(Math.round(remainingMs / 1000));
      }
      setRunning(false);
      return;
    }

    if (secondsLeft <= 0) return;

    endAtRef.current = Date.now() + secondsLeft * 1000;
    completedRef.current = false;
    setRunning(true);
  }, [running, secondsLeft]);

  /* When the session is finished, the primary button restarts it. */
  const handlePrimary = useCallback(() => {
    if (secondsLeft <= 0) {
      endAtRef.current = Date.now() + initialSeconds * 1000;
      completedRef.current = false;
      setSecondsLeft(initialSeconds);
      setRunning(true);
      return;
    }
    handleToggle();
  }, [secondsLeft, initialSeconds, handleToggle]);

  /* ----------------------------------------------------------
     KEYBOARD SHORTCUTS
     Space → start / pause · R → reset · Esc → pause
  ---------------------------------------------------------- */

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        handlePrimary();
      } else if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        reset();
      } else if (event.key === "Escape" && running) {
        event.preventDefault();
        handleToggle();
      }
    };

    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [handlePrimary, handleToggle, reset, running]);

  /* ----------------------------------------------------------
     DERIVED
  ---------------------------------------------------------- */

  const done = secondsLeft <= 0;

  const progress = useMemo(() => {
    if (initialSeconds <= 0) return 0;
    const elapsed = initialSeconds - secondsLeft;
    return Math.min(100, Math.max(0, (elapsed / initialSeconds) * 100));
  }, [initialSeconds, secondsLeft]);

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);

  const statusLabel = running
    ? "Active"
    : done
    ? "Complete"
    : "Ready";

  const statusText = running
    ? "Stay focused"
    : done
    ? "Session complete"
    : "Ready when you are";

  /* Announce only once per whole minute — a per-second live region
     would be a nightmare for screen reader users. */
  const minutesLeft = Math.ceil(secondsLeft / 60);
  const srText = running
    ? `${minutesLeft} minute${minutesLeft === 1 ? "" : "s"} remaining`
    : done
    ? "Focus session complete"
    : `Focus timer ready — ${minutes} minute session`;

  const primaryLabel = done
    ? "Restart"
    : running
    ? "Pause"
    : "Start focus";

  /* ----------------------------------------------------------
     RENDER
  ---------------------------------------------------------- */

  return (
    <GlassCard padding="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/[0.08] blur-3xl" />

      <div
        ref={containerRef}
        tabIndex={0}
        role="group"
        aria-label={`Focus timer — ${safeTitle}`}
        className="
          relative rounded-2xl
          focus:outline-none
          focus-visible:ring-2 focus-visible:ring-purple-500/40
          focus-visible:ring-offset-2 focus-visible:ring-offset-white
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  running ? "animate-pulse bg-purple-500" : "bg-purple-500"
                }`}
                aria-hidden="true"
              />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                Focus
              </span>
            </div>

            <h3
              className="mt-2 truncate text-lg font-semibold text-black"
              title={safeTitle}
            >
              {safeTitle}
            </h3>
          </div>

          <span
            className={`
              shrink-0 rounded-full px-3 py-1.5
              text-[10px] font-bold uppercase tracking-wide
              ${
                running
                  ? "bg-purple-500/10 text-purple-600"
                  : done
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-black/[0.05] text-black/45"
              }
            `}
          >
            {statusLabel}
          </span>
        </div>

        {/* Dial */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative flex h-52 w-52 items-center justify-center">
            <svg
              viewBox="0 0 220 220"
              className="absolute inset-0 h-full w-full -rotate-90"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                cx="110"
                cy="110"
                r={RADIUS}
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="7"
              />

              <circle
                cx="110"
                cy="110"
                r={RADIUS}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                className="transition-[stroke-dashoffset] duration-200 ease-linear"
              />
            </svg>

            <div className="text-center">
              <div
                className="
                  text-5xl font-semibold tracking-[-0.06em]
                  text-black tabular-nums
                "
                aria-hidden="true"
              >
                {formatTime(secondsLeft)}
              </div>

              <div className="mt-2 text-xs font-medium text-black/35">
                {statusText}
              </div>
            </div>
          </div>

          {/* Accessible countdown — fires only on whole-minute changes */}
          <span
            className="sr-only"
            role="timer"
            aria-live="polite"
            aria-atomic="true"
          >
            {srText}
          </span>

          {/* Controls */}
          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrimary}
              className="
                min-w-32 rounded-xl bg-black
                px-5 py-3 text-sm font-semibold text-white
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                transition
                hover:-translate-y-0.5
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black/30
                focus-visible:ring-offset-2
              "
            >
              {primaryLabel}
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={running}
              aria-label="Reset timer"
              className="
                rounded-xl border border-black/[0.08] bg-white
                px-5 py-3 text-sm font-semibold text-black/60
                transition
                hover:bg-black/[0.03]
                disabled:cursor-not-allowed disabled:opacity-40
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black/20
                focus-visible:ring-offset-2
              "
            >
              Reset
            </button>
          </div>

          <p className="mt-4 text-[10px] text-black/30">
            Space to start/pause · R to reset
          </p>
        </div>
      </div>
    </GlassCard>
  );
}