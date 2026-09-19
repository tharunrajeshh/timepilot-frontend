"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DashboardSection } from "./DashboardSidebar";

/* ================================================================
   TYPES
================================================================ */

type DashboardHeaderProps = {
  section: DashboardSection;
  firstName: string;
  currentDate: string;
  digitalTime: string;
  initial: string;
  onOpenMenu: () => void;
};

/* ================================================================
   CONSTANTS
================================================================ */

const SECTION_TITLES: Record<DashboardSection, string> = {
  overview: "Good to see you",
  tasks: "Your tasks",
  schedule: "Your schedule",
  assistant: "AI Assistant",
};

const MAX_NAME_LEN = 60;
const MAX_DATE_LEN = 80;
const MAX_TIME_LEN = 16;

/* ================================================================
   HELPERS
================================================================ */

/**
 * Strip control characters and enforce a length bound. Even though the
 * parent sanitizes, a header that renders user-derived strings should
 * defend itself — this is the last line before the DOM.
 */
function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

/**
 * Returns the first grapheme-ish character of a name, uppercased.
 * Handles empty strings, whitespace, and emoji safely.
 */
function safeInitial(input: unknown): string {
  const clean = safeText(input, MAX_NAME_LEN).trim();
  if (!clean) return "U";
  const first = Array.from(clean)[0] ?? "U";
  return first.toUpperCase();
}

/* ================================================================
   CLOCK (isolated so the header does not re-render every second)
================================================================ */

const LiveClock = memo(function LiveClock({ time }: { time: string }) {
  const safe = safeText(time, MAX_TIME_LEN);

  return (
    <div className="hidden text-right sm:block">
      <p
        className="font-mono text-sm font-medium tracking-[-0.02em] text-black/65 tabular-nums"
        aria-hidden="true"
      >
        {safe}
      </p>

      {/* Screen-reader friendly, updated less aggressively */}
      <p className="sr-only" aria-live="off">
        Local time {safe}
      </p>

      <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/25">
        Local time
      </p>
    </div>
  );
});

/* ================================================================
   AVATAR
================================================================ */

const Avatar = memo(function Avatar({ initial }: { initial: string }) {
  const safe = safeInitial(initial);

  return (
    <div
      className="
        flex h-10 w-10 shrink-0 items-center justify-center
        rounded-full border border-black/[0.07]
        bg-black text-sm font-semibold text-white
        shadow-[0_6px_20px_rgba(0,0,0,0.12)]
        select-none
      "
      aria-hidden="true"
    >
      {safe}
    </div>
  );
});

/* ================================================================
   MOBILE MENU BUTTON
================================================================ */

const MenuButton = memo(function MenuButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open navigation menu"
      aria-controls="dashboard-mobile-nav"
      aria-haspopup="dialog"
      className="
        flex h-10 w-10 shrink-0 items-center justify-center
        rounded-xl border border-black/[0.08] bg-white
        text-black/60 shadow-sm
        transition
        hover:bg-black/[0.025] hover:text-black
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-black/20
        lg:hidden
      "
    >
      <span className="flex w-4 flex-col gap-[4px]" aria-hidden="true">
        <span className="h-[1.5px] w-full rounded-full bg-current" />
        <span className="h-[1.5px] w-full rounded-full bg-current" />
        <span className="h-[1.5px] w-full rounded-full bg-current" />
      </span>
    </button>
  );
});

/* ================================================================
   HEADER
================================================================ */

export default function DashboardHeader({
  section,
  firstName,
  currentDate,
  digitalTime,
  initial,
  onOpenMenu,
}: DashboardHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  /* ---------- scroll-shadow ---------- */

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 4;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- derived values ---------- */

  const safeFirst = useMemo(
    () => safeText(firstName, MAX_NAME_LEN).trim() || "there",
    [firstName]
  );

  const safeDate = useMemo(
    () => safeText(currentDate, MAX_DATE_LEN).trim(),
    [currentDate]
  );

  const title = useMemo(() => {
    const base = SECTION_TITLES[section] ?? SECTION_TITLES.overview;
    return section === "overview" ? `${base}, ${safeFirst}` : base;
  }, [section, safeFirst]);

  const initialChar = useMemo(() => safeInitial(initial), [initial]);

  const handleOpenMenu = useCallback(() => {
    onOpenMenu();
  }, [onOpenMenu]);

  /* ---------- render ---------- */

  return (
    <header
      className={`
        sticky top-0 z-30
        border-b border-black/[0.06]
        bg-white/[0.82] backdrop-blur-2xl
        supports-[backdrop-filter]:bg-white/70
        transition-shadow duration-200
        ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : ""}
      `}
    >
      <div
        className="
          flex h-[72px] items-center justify-between gap-4
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* ---------------- Left ---------------- */}

        <div className="flex min-w-0 items-center gap-3">
          <MenuButton onClick={handleOpenMenu} />

          <div className="min-w-0">
            {safeDate && (
              <p className="hidden truncate text-[11px] font-medium text-black/35 sm:block">
                {safeDate}
              </p>
            )}

            <h1
              className="
                truncate text-lg font-semibold tracking-[-0.025em]
                text-black sm:text-xl
              "
              title={title}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* ---------------- Right ---------------- */}

        <div className="flex shrink-0 items-center gap-3">
          <LiveClock time={digitalTime} />
          <Avatar initial={initialChar} />
        </div>
      </div>

      {/* Focus ring / visually hidden section announcer for SRs */}
      <span className="sr-only" aria-live="polite">
        {SECTION_TITLES[section] ?? "Dashboard"}
      </span>
    </header>
  );
}   