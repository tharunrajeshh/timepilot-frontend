"use client";

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import type { DashboardSection } from "./DashboardSidebar";

/* ================================================================
   TYPES
================================================================ */

type DashboardHeaderProps = {
  section: DashboardSection;
  firstName: string;
  /** Visible under the title on ≥sm. If omitted, the header derives today's date. */
  currentDate?: string;
  /** If omitted, the header runs its own clock (minute-aligned, paused when hidden). */
  digitalTime?: string;
  /** Falls back to the first letter of `firstName`. */
  initial?: string;
  /** IANA zone for the clock, e.g. "Asia/Kolkata". Defaults to the runtime zone. */
  timezone?: string;

  onOpenMenu: () => void;
  /** id of the mobile nav container in your sidebar. */
  mobileNavId?: string;

  /** Command palette. If omitted, the header dispatches a global event instead. */
  onOpenCommandPalette?: () => void;
  /** Set false if another component already owns ⌘K. */
  enableCommandShortcut?: boolean;

  notifications?: number;
  onOpenNotifications?: () => void;
  onNewTask?: () => void;
  onNavigate?: (section: DashboardSection) => void;

  user?: { name?: string; email?: string; plan?: string };
  onOpenSettings?: () => void;
  onSignOut?: () => void;

  /** Renders gray placeholders instead of text. */
  loading?: boolean;
};

/* ================================================================
   CONSTANTS
================================================================ */

const MAX_NAME_LEN = 60;
const MAX_DATE_LEN = 80;
const MAX_TIME_LEN = 16;
const SCROLL_THRESHOLD_PX = 4;
const COMMAND_EVENT = "timepilot:command-palette";

const SECTION_TITLES = {
  overview: "Good to see you",
  tasks: "Your tasks",
  schedule: "Your schedule",
  assistant: "AI Assistant",
} satisfies Record<DashboardSection, string>;

const SECTION_LABELS = {
  overview: "Overview",
  tasks: "Tasks",
  schedule: "Schedule",
  assistant: "Assistant",
} satisfies Record<DashboardSection, string>;

/* ================================================================
   HELPERS
================================================================ */

function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

/** Grapheme-aware, uppercased, with a sane fallback. */
function safeInitial(input: unknown, fallback = "U"): string {
  const clean = safeText(input, MAX_NAME_LEN).trim();
  if (!clean) return fallback;
  return (Array.from(clean)[0] ?? fallback).toUpperCase();
}

function formatClock(date: Date, timeZone?: string): string {
  const opts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  };
  try {
    return new Intl.DateTimeFormat(undefined, opts).format(date);
  } catch {
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  }
}

function formatToday(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/**
 * Stable-identity event handler. Lets memoized children receive a handler
 * whose reference never changes, while the parent can keep passing an
 * inline arrow without defeating memo.
 */
function useEvent<T extends (...args: never[]) => unknown>(handler: T): T {
  const ref = useRef(handler);
  useLayoutEffect(() => {
    ref.current = handler;
  });
  return useCallback(((...args) => ref.current(...args)) as T, []);
}

/* ================================================================
   HOOKS
================================================================ */

function useScrolled(threshold = SCROLL_THRESHOLD_PX): boolean {
  const [scrolled, setScrolled] = useState(false);
  const current = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > threshold;
      if (next !== current.current) {
        current.current = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/** Minute-aligned ticking clock with visibility-change resync. */
function useClock(enabled: boolean): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!enabled) return;

    let timer: number | undefined;
    const schedule = () => {
      const delay = 60_000 - (Date.now() % 60_000);
      timer = window.setTimeout(() => {
        setNow(new Date());
        schedule();
      }, delay);
    };
    schedule();

    const onVisibility = () => {
      if (!document.hidden) setNow(new Date());
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  return now;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/* ================================================================
   ICONS
================================================================ */

type IconProps = { className?: string };

function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 6h13M3.5 10h13M3.5 14h13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSearch({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="9" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconBell({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M10 3.25a4.25 4.25 0 0 0-4.25 4.25v2.6L4.6 12.4a.6.6 0 0 0 .5.95h9.8a.6.6 0 0 0 .5-.95L14.25 10.1V7.5A4.25 4.25 0 0 0 10 3.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.25 15.5a1.75 1.75 0 0 0 3.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="m6 8.5 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2.75v1.6M10 15.65v1.6M17.25 10h-1.6M4.35 10h-1.6M15.13 4.87l-1.13 1.13M6 14l-1.13 1.13M15.13 15.13 14 14M6 6 4.87 4.87"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLogout({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M12.5 6.5V4.75a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v11.5a1.5 1.5 0 0 0 1.5 1.5H11a1.5 1.5 0 0 0 1.5-1.5V14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 10h7.5m0 0-2.5-2.5M16.5 10 14 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================
   PRIMITIVES
================================================================ */

const IconButton = memo(function IconButton({
  label,
  onClick,
  badge,
  children,
  className = "",
}: {
  label: string;
  onClick: () => void;
  badge?: number;
  children: ReactNode;
  className?: string;
}) {
  const showBadge = typeof badge === "number" && badge > 0;
  const badgeText = badge && badge > 99 ? "99+" : String(badge ?? 0);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={showBadge ? `${label}, ${badge} unread` : label}
      className={`
        relative flex h-10 w-10 shrink-0 items-center justify-center
        rounded-xl border border-black/[0.07] bg-white
        text-black/55 shadow-[0_1px_2px_rgba(0,0,0,0.03)]
        transition-colors duration-150
        hover:border-black/10 hover:bg-black/[0.02] hover:text-black
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-emerald-500/40
        ${className}
      `}
    >
      {children}

      {showBadge && (
        <span
          aria-hidden
          className="
            absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center
            rounded-full bg-emerald-500 px-1
            text-[9px] font-bold leading-none text-white
            ring-2 ring-white
          "
        >
          {badgeText}
        </span>
      )}
    </button>
  );
});

const Skeleton = memo(function Skeleton({ w }: { w: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-3.5 animate-pulse rounded bg-black/[0.07] ${w}`}
    />
  );
});

/* ================================================================
   AVATAR
================================================================ */

const Avatar = memo(function Avatar({
  initial,
  size = 40,
  onClick,
  expanded,
  hasMenu,
}: {
  initial: string;
  size?: number;
  onClick?: () => void;
  expanded?: boolean;
  hasMenu?: boolean;
}) {
  const safe = safeInitial(initial);

  const content = (
    <span
      aria-hidden
      className="
        flex items-center justify-center rounded-full
        bg-black text-sm font-semibold text-white
        select-none
      "
      style={{ height: size, width: size }}
    >
      {safe}
    </span>
  );

  if (!hasMenu || !onClick) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.07] shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="menu"
      aria-expanded={expanded}
      aria-label="Account menu"
      className="
        flex h-10 w-10 shrink-0 items-center justify-center rounded-full
        border border-black/[0.07] shadow-[0_6px_20px_rgba(0,0,0,0.12)]
        transition
        hover:ring-2 hover:ring-black/[0.06]
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-emerald-500/50
      "
    >
      {content}
    </button>
  );
});

/* ================================================================
   LIVE CLOCK
================================================================ */

const LiveClock = memo(function LiveClock({
  display,
  iso,
  reduced,
}: {
  display: string;
  iso: string;
  reduced: boolean;
}) {
  const safe = safeText(display, MAX_TIME_LEN);
  if (!safe) return null;

  return (
    <div className="hidden flex-col items-end sm:flex">
      <time
        dateTime={iso}
        className={`font-mono text-sm font-medium tracking-[-0.02em] text-black/65 ${
          reduced ? "" : "tabular-nums"
        }`}
      >
        {safe}
      </time>
      <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/25">
        Local time
      </span>
    </div>
  );
});

/* ================================================================
   SEARCH TRIGGER
================================================================ */

const SearchTrigger = memo(function SearchTrigger({
  onClick,
  isMac,
  shortcutEnabled,
}: {
  onClick: () => void;
  isMac: boolean;
  shortcutEnabled: boolean;
}) {
  const modifier = isMac ? "⌘" : "Ctrl";

  return (
    <>
      {/* Full search affordance on md+ */}
      <button
        type="button"
        onClick={onClick}
        className="
          hidden items-center gap-2 rounded-xl
          border border-black/[0.07] bg-black/[0.015]
          py-2 pl-3 pr-2
          text-xs text-black/40
          transition-colors duration-150
          hover:border-black/10 hover:bg-white hover:text-black/60
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-emerald-500/40
          md:flex
        "
      >
        <IconSearch className="h-3.5 w-3.5" />
        <span className="pr-6">Search tasks, schedules…</span>
        {shortcutEnabled && (
          <kbd
            aria-hidden
            className="
              rounded-md border border-black/[0.07] bg-white
              px-1.5 py-0.5 font-sans text-[10px] font-medium text-black/40
            "
          >
            {modifier}K
          </kbd>
        )}
      </button>

      {/* Icon-only below md */}
      <IconButton label="Search" onClick={onClick} className="md:hidden">
        <IconSearch className="h-4 w-4" />
      </IconButton>
    </>
  );
});

/* ================================================================
   USER MENU
================================================================ */

type MenuItem = {
  key: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  tone?: "default" | "danger";
};

const UserMenu = memo(function UserMenu({
  open,
  onClose,
  anchorRef,
  user,
  items,
}: {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  user?: { name?: string; email?: string; plan?: string };
  items: MenuItem[];
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const onCloseEvent = useEvent(onClose);

  // Outside click + horizontal escape closes.
  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return; // let the button toggle
      onCloseEvent();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onCloseEvent();
        anchorRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, anchorRef, onCloseEvent]);

  // Move focus into the panel on open.
  useLayoutEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLButtonElement>(
      "button:not([disabled])"
    );
    first?.focus();
  }, [open]);

  if (!open) return null;

  const name = safeText(user?.name, MAX_NAME_LEN).trim();
  const email = safeText(user?.email, 120).trim();
  const plan = safeText(user?.plan, 40).trim();

  return (
    <div
      ref={panelRef}
      role="menu"
      aria-label="Account"
      className="
        absolute right-0 top-[calc(100%+10px)] z-50 w-64
        origin-top-right
        overflow-hidden rounded-2xl
        border border-black/[0.07] bg-white/95 backdrop-blur-xl
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.20)]
      "
    >
      {(name || email) && (
        <div className="border-b border-black/[0.06] px-4 py-3">
          {name && (
            <p className="truncate text-sm font-semibold text-black">{name}</p>
          )}
          {email && (
            <p className="mt-0.5 truncate text-xs text-black/40">{email}</p>
          )}
          {plan && (
            <span className="mt-2 inline-block rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              {plan}
            </span>
          )}
        </div>
      )}

      <div className="p-1.5">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            role="menuitem"
            onClick={item.onClick}
            className={`
              flex w-full items-center gap-2.5 rounded-lg px-3 py-2
              text-left text-sm font-medium
              transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset
              ${
                item.tone === "danger"
                  ? "text-red-600 hover:bg-red-500/[0.06] focus-visible:ring-red-500/30"
                  : "text-black/70 hover:bg-black/[0.04] focus-visible:ring-emerald-500/30"
              }
            `}
          >
            <span aria-hidden className="text-black/40">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
});

/* ================================================================
   MAIN
================================================================ */

export default function DashboardHeader({
  section,
  firstName,
  currentDate,
  digitalTime,
  initial,
  timezone,
  onOpenMenu,
  mobileNavId = "dashboard-mobile-nav",
  onOpenCommandPalette,
  enableCommandShortcut = true,
  notifications = 0,
  onOpenNotifications,
  onNewTask,
  user,
  onOpenSettings,
  onSignOut,
  loading = false,
}: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const avatarRef = useRef<HTMLDivElement>(null);
  const scrolled = useScrolled();
  const reduced = useReducedMotion();

  const internalClock = useClock(!digitalTime);
  const now = digitalTime ? null : internalClock;

  /* ---------- hydration-safe OS detection ---------- */

  useEffect(() => {
    const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
    const platform = nav.userAgentData?.platform || navigator.platform || "";
    setIsMac(/mac/i.test(platform));
  }, []);

  /* ---------- derived ---------- */

  const displayTime = useMemo(() => {
    if (digitalTime) return safeText(digitalTime, MAX_TIME_LEN);
    if (now) return formatClock(now, timezone);
    return "";
  }, [digitalTime, now, timezone]);

  const isoTime = useMemo(() => (now ? now.toISOString() : ""), [now]);

  const safeDate = useMemo(() => {
    const provided = safeText(currentDate, MAX_DATE_LEN).trim();
    if (provided) return provided;
    if (now) return formatToday();
    return "";
  }, [currentDate, now]);

  const safeFirst = useMemo(
    () => safeText(firstName, MAX_NAME_LEN).trim() || "there",
    [firstName]
  );

  const title = useMemo(() => {
    const base = SECTION_TITLES[section] ?? SECTION_TITLES.overview;
    return section === "overview" ? `${base}, ${safeFirst}` : base;
  }, [section, safeFirst]);

  const initialChar = useMemo(
    () => safeInitial(initial ?? firstName, "U"),
    [initial, firstName]
  );

  /* ---------- stable handlers for memoized children ---------- */

  const openMenu = useEvent(onOpenMenu);
  const openNotifications = useEvent(() => onOpenNotifications?.());
  const createTask = useEvent(() => onNewTask?.());

  const openPalette = useEvent(() => {
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
      return;
    }
    window.dispatchEvent(new CustomEvent(COMMAND_EVENT));
  });

  const toggleUserMenu = useEvent(() => setMenuOpen((v) => !v));
  const closeUserMenu = useEvent(() => setMenuOpen(false));

  /* ---------- global command shortcut ---------- */

  useEffect(() => {
    if (!enableCommandShortcut) return;

    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enableCommandShortcut, openPalette]);

  /* ---------- user menu items ---------- */

  const menuItems: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [];
    if (onOpenSettings) {
      items.push({
        key: "settings",
        label: "Settings",
        icon: <IconSettings className="h-4 w-4" />,
        onClick: () => {
          closeUserMenu();
          onOpenSettings();
        },
      });
    }
    if (onSignOut) {
      items.push({
        key: "signout",
        label: "Sign out",
        icon: <IconLogout className="h-4 w-4" />,
        tone: "danger",
        onClick: () => {
          closeUserMenu();
          onSignOut();
        },
      });
    }
    return items;
  }, [onOpenSettings, onSignOut, closeUserMenu]);

  const hasUserMenu = menuItems.length > 0;

  /* ---------- render ---------- */

  return (
    <header
      className={`
        sticky top-0 z-30
        border-b border-black/[0.06]
        bg-white/[0.82] backdrop-blur-2xl
        supports-[backdrop-filter]:bg-white/70
        transition-shadow duration-200
        ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.045)]" : ""}
      `}
    >
      <div className="flex h-[72px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* ---------------- Left ---------------- */}

        <div className="flex min-w-0 items-center gap-3">
          <IconButton label="Open navigation menu" onClick={openMenu} className="lg:hidden">
            <span
              className="contents"
              // The button carries the aria-label; expose the target via data.
            >
              <IconMenu className="h-5 w-5" />
            </span>
            <span className="sr-only" aria-hidden />
          </IconButton>

          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="hidden sm:block">
              <ol className="flex items-center gap-1.5 text-[11px] font-medium text-black/35">
                <li>Dashboard</li>
                <li aria-hidden className="text-black/20">/</li>
                <li aria-current="page" className="truncate text-black/55">
                  {SECTION_LABELS[section] ?? "Overview"}
                </li>
              </ol>
            </nav>

            <h1
              className="
                truncate text-lg font-semibold tracking-[-0.025em]
                text-black sm:text-xl
              "
              title={loading ? undefined : title}
            >
              {loading ? <Skeleton w="w-40" /> : title}
            </h1>

            {safeDate && (
              <p className="mt-0.5 hidden truncate text-[11px] text-black/35 sm:block">
                {loading ? <Skeleton w="w-28" /> : safeDate}
              </p>
            )}
          </div>
        </div>

        {/* ---------------- Right ---------------- */}

        <div className="flex shrink-0 items-center gap-2">
          <SearchTrigger
            onClick={openPalette}
            isMac={isMac}
            shortcutEnabled={enableCommandShortcut}
          />

          {onNewTask && (
            <button
              type="button"
              onClick={createTask}
              className="
                hidden items-center gap-1.5 rounded-xl
                bg-black px-3.5 py-2
                text-xs font-semibold text-white
                shadow-[0_6px_20px_rgba(0,0,0,0.10)]
                transition-transform duration-150
                hover:-translate-y-0.5
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black/30
                sm:flex
              "
            >
              <IconPlus className="h-3.5 w-3.5" />
              New task
            </button>
          )}

          {onOpenNotifications && (
            <IconButton
              label="Notifications"
              onClick={openNotifications}
              badge={notifications}
            >
              <IconBell className="h-4 w-4" />
            </IconButton>
          )}

          {displayTime && (
            <LiveClock display={displayTime} iso={isoTime} reduced={reduced} />
          )}

          <div ref={avatarRef} className="relative">
            <Avatar
              initial={initialChar}
              onClick={hasUserMenu ? toggleUserMenu : undefined}
              expanded={menuOpen}
              hasMenu={hasUserMenu}
            />

            <UserMenu
              open={menuOpen}
              onClose={closeUserMenu}
              anchorRef={avatarRef as React.RefObject<HTMLElement | null>}
              user={user}
              items={menuItems}
            />
          </div>
        </div>
      </div>

      {/* Announces section changes to screen readers, matching the visible title. */}
      <span className="sr-only" aria-live="polite">
        {title}
      </span>

      {/* Anchor target for the mobile sidebar's aria-controls. */}
      <span id={mobileNavId} hidden />
    </header>
  );
}