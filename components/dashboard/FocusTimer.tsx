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
  /** Preset durations in minutes. */
  presets?: readonly number[];
  /** Play a short chime on completion via Web Audio. */
  sound?: boolean;
  /** Survive a page refresh via sessionStorage. */
  persist?: boolean;
};

/* ================================================================
   CONSTANTS
================================================================ */

const RADIUS = 94;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MAX_TITLE_LEN = 120;
const MIN_MINUTES = 1;
const MAX_MINUTES = 180;
const DEFAULT_PRESETS: readonly number[] = [15, 25, 50, 90];
const EXTEND_MINUTES = 5;
const STORAGE_KEY = "timepilot:focus-timer";

/* ================================================================
   HELPERS
================================================================ */

function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
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

/** Short two-tone chime via Web Audio — no dependency, ~15 lines. */
function playChime(): void {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;

    const ctx = new Ctx();
    const now = ctx.currentTime;

    const play = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.18, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      osc.start(now + start);
      osc.stop(now + start + dur + 0.05);
    };

    play(880, 0, 0.45);  // A5
    play(1174.66, 0.18, 0.55); // D6

    window.setTimeout(() => void ctx.close(), 1200);
  } catch {
    /* Audio unavailable or blocked — silently ignore. */
  }
}

/* ================================================================
   COMPONENT
================================================================ */

export default function FocusTimer({
  initialMinutes = 25,
  taskTitle = "Focus session",
  onComplete,
  presets = DEFAULT_PRESETS,
  sound = true,
  persist = true,
}: FocusTimerProps) {
  const [presetMinutes, setPresetMinutes] = useState(() =>
    clampMinutes(initialMinutes)
  );
  const durationSeconds = presetMinutes * 60;

  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [running, setRunning] = useState(false);

  /* Deadline timestamp is the single source of truth while running. */
  const endAtRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const aliveRef = useRef(true);
  const onCompleteRef = useRef(onComplete);
  const titleBackupRef = useRef<string | null>(null);

  /* Keep the latest callback without restarting the countdown. */
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

  /* ----------------------------------------------------------
     RESTORE from sessionStorage (declared AFTER the reset
     effect below so it wins on mount)
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!persist) return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        endAt?: number;
        presetMinutes?: number;
      };
      if (
        typeof parsed?.endAt === "number" &&
        parsed.endAt > Date.now() &&
        typeof parsed?.presetMinutes === "number"
      ) {
        const remaining = Math.ceil((parsed.endAt - Date.now()) / 1000);
        if (remaining > 0) {
          endAtRef.current = parsed.endAt;
          completedRef.current = false;
          setPresetMinutes(clampMinutes(parsed.presetMinutes));
          setSecondsLeft(remaining);
          setRunning(true);
        }
      }
    } catch {
      /* Corrupt storage — ignore. */
    }
  }, [persist]);

  /* ----------------------------------------------------------
     RESET when the caller changes the duration
  ---------------------------------------------------------- */

  useEffect(() => {
    const next = clampMinutes(initialMinutes);
    setRunning(false);
    endAtRef.current = null;
    completedRef.current = false;
    setPresetMinutes(next);
    setSecondsLeft(next * 60);
  }, [initialMinutes]);

  /* ----------------------------------------------------------
     PERSIST whenever a session starts or stops
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!persist) return;
    try {
      if (running && endAtRef.current !== null) {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            endAt: endAtRef.current,
            presetMinutes,
          })
        );
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* Storage full or blocked — ignore. */
    }
  }, [running, presetMinutes, persist]);

  /* ----------------------------------------------------------
     COUNTDOWN — rAF loop, one setState per second change,
     perfectly smooth via a 1s CSS transition on the arc
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!running) return;
    if (endAtRef.current === null) return;

    let raf: number;
    let lastSecond = -1;

    const loop = () => {
      const end = endAtRef.current;
      if (end === null) return;

      const msLeft = Math.max(0, end - Date.now());
      const sec = Math.ceil(msLeft / 1000);

      if (sec !== lastSecond) {
        lastSecond = sec;
        setSecondsLeft(sec);

        if (sec <= 0 && !completedRef.current) {
          completedRef.current = true;
          endAtRef.current = null;
          setRunning(false);

          if (aliveRef.current && sound) playChime();

          try {
            onCompleteRef.current?.();
          } catch {
            /* A throwing callback must never crash the timer. */
          }
          return; // stop the loop
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, sound]);

  /* ----------------------------------------------------------
     TAB TITLE — writes only when the string differs,
     restores the original exactly once per run/pause cycle
  ---------------------------------------------------------- */

  const safeTitle = useMemo(
    () => safeText(taskTitle, MAX_TITLE_LEN).trim() || "Focus session",
    [taskTitle]
  );

  useEffect(() => {
    if (running) {
      if (titleBackupRef.current === null) {
        titleBackupRef.current = document.title;
      }
      const label = `${formatTime(secondsLeft)} · ${safeTitle}`;
      if (document.title !== label) document.title = label;
    } else if (titleBackupRef.current !== null) {
      document.title = titleBackupRef.current;
      titleBackupRef.current = null;
    }
  }, [running, secondsLeft, safeTitle]);

  // Final safety net on unmount.
  useEffect(() => {
    return () => {
      if (titleBackupRef.current !== null) {
        document.title = titleBackupRef.current;
        titleBackupRef.current = null;
      }
    };
  }, []);

  /* ----------------------------------------------------------
     CONTROLS
  ---------------------------------------------------------- */

  const reset = useCallback(() => {
    endAtRef.current = null;
    completedRef.current = false;
    setRunning(false);
    setSecondsLeft(durationSeconds);
  }, [durationSeconds]);

  const handleToggle = useCallback(() => {
    if (running) {
      if (endAtRef.current !== null) {
        const remainingMs = Math.max(0, endAtRef.current - Date.now());
        endAtRef.current = null;
        setSecondsLeft(Math.ceil(remainingMs / 1000));
      }
      setRunning(false);
      return;
    }

    if (secondsLeft <= 0) return;

    endAtRef.current = Date.now() + secondsLeft * 1000;
    completedRef.current = false;
    setRunning(true);
  }, [running, secondsLeft]);

  const extend = useCallback(() => {
    if (!running) return;
    const end = endAtRef.current;
    if (end === null) return;
    endAtRef.current = end + EXTEND_MINUTES * 60 * 1000;
    completedRef.current = false;
  }, [running]);

  const selectPreset = useCallback(
    (minutes: number) => {
      const next = clampMinutes(minutes);
      endAtRef.current = null;
      completedRef.current = false;
      setRunning(false);
      setPresetMinutes(next);
      setSecondsLeft(next * 60);
    },
    []
  );

  /* ----------------------------------------------------------
     KEYBOARD — global, robustly guarded
  ---------------------------------------------------------- */

  useEffect(() => {
    const isFormElement = (el: Element | null) =>
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement ||
      (el instanceof HTMLElement && el.isContentEditable) ||
      // Don't hijack keys inside modals or menus.
      (el instanceof Element && el.closest("[role='dialog'], [role='menu']") !== null);

    const onKey = (event: KeyboardEvent) => {
      if (isFormElement(event.target as Element | null)) return;

      // Space on a button activates the button — don't intercept.
      if (event.code === "Space" && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault();
        handleToggle();
      } else if (event.code === "KeyR") {
        event.preventDefault();
        reset();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleToggle, reset]);

  /* ----------------------------------------------------------
     DERIVED
  ---------------------------------------------------------- */

  const done = secondsLeft <= 0;

  const progress = useMemo(() => {
    if (durationSeconds <= 0) return 0;
    const elapsed = durationSeconds - secondsLeft;
    return Math.min(100, Math.max(0, (elapsed / durationSeconds) * 100));
  }, [durationSeconds, secondsLeft]);

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);

  const statusLabel = running ? "Active" : done ? "Complete" : "Ready";
  const statusText = running
    ? "Stay focused"
    : done
    ? "Session complete"
    : "Ready when you are";

  const primaryLabel = done ? "Restart" : running ? "Pause" : "Start focus";

  const minutesLeft = Math.ceil(secondsLeft / 60);
  const srText = running
    ? `${minutesLeft} minute${minutesLeft === 1 ? "" : "s"} remaining`
    : done
    ? "Focus session complete"
    : `Focus timer ready — ${presetMinutes} minute session`;

  /* ----------------------------------------------------------
     RENDER
  ---------------------------------------------------------- */

  return (
    <GlassCard padding="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/[0.08] blur-3xl" />

      <div
        role="group"
        aria-label={`Focus timer — ${safeTitle}`}
        className="relative rounded-2xl"
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

        {/* Presets */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {presets.map((p) => {
            const mins = clampMinutes(p);
            const active = mins === presetMinutes && !running;
            return (
              <button
                key={mins}
                type="button"
                onClick={() => selectPreset(mins)}
                disabled={running}
                aria-pressed={active}
                className={`
                  rounded-lg px-2.5 py-1 text-[11px] font-semibold
                  transition-colors
                  disabled:cursor-not-allowed disabled:opacity-40
                  ${
                    active
                      ? "bg-purple-500/12 text-purple-700 ring-1 ring-purple-500/30"
                      : "bg-black/[0.04] text-black/50 hover:bg-black/[0.07] hover:text-black/70"
                  }
                `}
              >
                {mins}m
              </button>
            );
          })}
        </div>

        {/* Dial */}
        <div className="mt-6 flex flex-col items-center">
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
                // 1s linear transition + 1 setState/sec = perfectly smooth arc
                className="transition-[stroke-dashoffset] duration-1000 ease-linear"
              />
            </svg>

            <div className="text-center">
              <div
                className="text-5xl font-semibold tracking-[-0.06em] text-black tabular-nums"
                aria-hidden="true"
              >
                {formatTime(secondsLeft)}
              </div>
              <div className="mt-2 text-xs font-medium text-black/35">
                {statusText}
              </div>
            </div>
          </div>

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
              onClick={handleToggle}
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

            {running && (
              <button
                type="button"
                onClick={extend}
                className="
                  rounded-xl border border-purple-500/20 bg-purple-500/[0.06]
                  px-3.5 py-3 text-xs font-semibold text-purple-700
                  transition hover:bg-purple-500/[0.12]
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-purple-500/40
                "
              >
                +{EXTEND_MINUTES}m
              </button>
            )}
          </div>

          <p className="mt-4 text-[10px] text-black/30">
            Space to start/pause · R to reset
          </p>
        </div>
      </div>
    </GlassCard>
  );
}