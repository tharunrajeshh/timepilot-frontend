"use client";

import Link from "next/link";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ================================================================
   TYPES
================================================================ */

export type DashboardSection =
  | "overview"
  | "tasks"
  | "schedule"
  | "assistant";

type DashboardSidebarProps = {
  section: DashboardSection;
  pending: number;
  name: string;
  email: string;
  initial: string;
  mobile?: boolean;
  onNavigate: (section: DashboardSection) => void;
  onLogout: () => void;
  onClose?: () => void;
  /** Must match the `mobileNavId` passed to DashboardHeader. */
  mobileNavId?: string;
  /** Enables desktop collapse (⌘B / Ctrl B) and persists to localStorage. */
  collapsible?: boolean;
};

type NavItem = {
  id: DashboardSection;
  label: string;
  badge?: "pending";
};

/* ================================================================
   CONSTANTS
================================================================ */

const NAV_ITEMS: readonly NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "tasks", label: "Tasks", badge: "pending" },
  { id: "schedule", label: "Schedule" },
  { id: "assistant", label: "AI Assistant" },
] as const;

const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 200;
const MAX_BADGE = 999;
const DESKTOP_WIDTH = 250;
const COLLAPSED_WIDTH = 72;
const STORAGE_KEY = "timepilot:sidebar-collapsed";

/* ================================================================
   HELPERS
================================================================ */

function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function safeInitial(input: unknown): string {
  const clean = safeText(input, MAX_NAME_LEN).trim();
  if (!clean) return "U";
  return (Array.from(clean)[0] ?? "U").toUpperCase();
}

function clampBadge(n: unknown): number {
  const value = Number(n);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.min(Math.floor(value), MAX_BADGE);
}

/** Stable-identity handler — memoized children never re-render from this. */
function useEvent<T extends (...args: never[]) => unknown>(fn: T): T {
  const ref = useRef(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback(((...args) => ref.current(...args)) as T, []);
}

/* ================================================================
   ICONS
================================================================ */

type IconProps = { className?: string };

const IconGrid = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconCheck = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="m7 10 2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCalendar = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <rect x="3" y="4.5" width="14" height="12.5" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 8.5h14M6.5 3v3M13.5 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconSparkle = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path
      d="M10 3.5 11.4 7.6 15.5 9 11.4 10.4 10 14.5 8.6 10.4 4.5 9 8.6 7.6 10 3.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M15.5 13.5 16 15l1.5.5L16 16l-.5 1.5L15 16l-1.5-.5L15 15l.5-1.5Z" fill="currentColor" opacity="0.5" />
  </svg>
);

const IconClose = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconChevronLeft = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m12 5-4 5 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_ICONS: Record<DashboardSection, (p: IconProps) => React.ReactElement> = {
  overview: IconGrid,
  tasks: IconCheck,
  schedule: IconCalendar,
  assistant: IconSparkle,
};

/* ================================================================
   NAV BUTTON
================================================================ */

type NavButtonProps = {
  id: DashboardSection;
  label: string;
  active: boolean;
  badge: number;
  collapsed: boolean;
  onSelect: (id: DashboardSection) => void;
};

const NavButton = memo(function NavButton({
  id,
  label,
  active,
  badge,
  collapsed,
  onSelect,
}: NavButtonProps) {
  const Icon = NAV_ICONS[id];
  const handleClick = useCallback(() => onSelect(id), [id, onSelect]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={`
        group flex w-full items-center gap-3 rounded-[14px]
        ${collapsed ? "justify-center px-0 py-3" : "px-3 py-3 text-left"}
        text-sm transition-colors duration-200
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-black/20
        ${
          active
            ? "bg-black text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)]"
            : "text-black/55 hover:bg-black/[0.04] hover:text-black"
        }
      `}
    >
      <Icon
        className={`h-[18px] w-[18px] shrink-0 ${
          active ? "text-white" : "text-black/40 group-hover:text-black/70"
        }`}
      />

      {!collapsed && (
        <>
          <span className="flex-1 truncate font-medium">{label}</span>

          {badge > 0 && (
            <span
              className={`
                rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums
                ${
                  active
                    ? "bg-white/15 text-white"
                    : "bg-purple-500/10 text-purple-600"
                }
              `}
              aria-label={`${badge} pending task${badge === 1 ? "" : "s"}`}
            >
              {badge}
            </span>
          )}
        </>
      )}

      {collapsed && badge > 0 && (
        <span
          aria-hidden
          className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-purple-500"
        />
      )}
    </button>
  );
});

/* ================================================================
   USER CARD
================================================================ */

const UserCard = memo(function UserCard({
  name,
  email,
  initial,
  onLogout,
  collapsed,
}: {
  name: string;
  email: string;
  initial: string;
  onLogout: () => void;
  collapsed: boolean;
}) {
  const safeName = safeText(name, MAX_NAME_LEN).trim() || "User";
  const safeEmail = safeText(email, MAX_EMAIL_LEN).trim();
  const safeInit = safeInitial(initial);

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onLogout}
        aria-label={`Sign out ${safeName}`}
        title="Sign out"
        className="
          mx-auto flex h-10 w-10 items-center justify-center
          rounded-full bg-black text-xs font-bold text-white
          transition hover:ring-2 hover:ring-black/10
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30
        "
      >
        {safeInit}
      </button>
    );
  }

  return (
    <div className="rounded-[18px] border border-black/[0.07] bg-black/[0.025] p-3">
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0 select-none items-center justify-center
            rounded-full bg-black text-xs font-bold text-white
          "
          aria-hidden="true"
        >
          {safeInit}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-black" title={safeName}>
            {safeName}
          </p>
          {safeEmail && (
            <p className="truncate text-[11px] text-black/40" title={safeEmail}>
              {safeEmail}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="
          mt-3 w-full rounded-[11px] px-3 py-2
          text-left text-xs font-medium text-black/45
          transition
          hover:bg-black/[0.05] hover:text-black
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-black/20
        "
      >
        Log out
      </button>
    </div>
  );
});

/* ================================================================
   LOGO
================================================================ */

const Logo = memo(function Logo({
  onClose,
  collapsed,
}: {
  onClose?: () => void;
  collapsed: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClose}
      title={collapsed ? "TimePilot" : undefined}
      className={`
        flex items-center rounded-xl
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-black/20
        ${collapsed ? "justify-center p-1" : "gap-3 px-2 py-1"}
      `}
    >
      <div
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-[13px] bg-black text-sm font-bold text-white
          shadow-lg select-none
        "
        aria-hidden="true"
      >
        T
      </div>

      {!collapsed && (
        <div>
          <p className="text-[15px] font-semibold tracking-tight text-black">
            TimePilot
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/35">
            Workspace
          </p>
        </div>
      )}
    </Link>
  );
});

/* ================================================================
   MAIN
================================================================ */

export default function DashboardSidebar({
  section,
  pending,
  name,
  email,
  initial,
  mobile = false,
  onNavigate,
  onLogout,
  onClose,
  mobileNavId = "dashboard-mobile-nav",
  collapsible = false,
}: DashboardSidebarProps) {
  const asideRef = useRef<HTMLElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ---------- stable handlers (fixes the effect-dependency bug) ---------- */

  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  const close = useEvent(() => onCloseRef.current?.());

  const handleSelect = useEvent((next: DashboardSection) => {
    onNavigate(next);
    onCloseRef.current?.();
  });

  const toggleCollapse = useCallback(() => {
    setCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  /* ---------- restore collapsed state ---------- */

  useEffect(() => {
    if (!collapsible) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setCollapsed(true);
    } catch {}
  }, [collapsible]);

  /* ---------- publish width as a CSS variable for the page layout ---------- */

  useEffect(() => {
    if (mobile || !collapsible) return;
    document.documentElement.style.setProperty(
      "--sidebar-w",
      `${collapsed ? COLLAPSED_WIDTH : DESKTOP_WIDTH}px`
    );
    return () => {
      document.documentElement.style.removeProperty("--sidebar-w");
    };
  }, [mobile, collapsible, collapsed]);

  /* ---------- ⌘B / Ctrl B toggle ---------- */

  useEffect(() => {
    if (!collapsible || mobile) return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [collapsible, mobile, toggleCollapse]);

  /* ---------- mobile: focus trap, ESC, scroll lock ---------- */

  useEffect(() => {
    if (!mobile) return;

    const node = asideRef.current;
    if (!node) return;

    // Capture focus ONCE, at drawer-open. Previously this re-ran whenever the
    // parent re-created `onClose`, stealing focus back to the first item.
    const previouslyFocused =
      (document.activeElement as HTMLElement | null) ?? null;

    const getFocusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);

    const first = getFocusable()[0];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = getFocusable();
      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && active === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Trigger the CSS entry transition one frame after mount.
    const raf = requestAnimationFrame(() => setMounted(true));

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
      setMounted(false);
      if (previouslyFocused && document.body.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [mobile]);

  const badge = useMemo(() => clampBadge(pending), [pending]);

  /* ---------- shared inner content ---------- */

  const inner = (
    <>
      <div className="flex items-center justify-between">
        <Logo onClose={mobile ? close : undefined} collapsed={collapsed} />

        <div className="flex items-center gap-1">
          {collapsible && !mobile && (
            <button
              type="button"
              onClick={toggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              className="
                hidden h-8 w-8 items-center justify-center
                rounded-lg text-black/35 transition
                hover:bg-black/[0.04] hover:text-black
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black/20
                lg:flex
              "
            >
              <IconChevronLeft
                className={`h-4 w-4 transition-transform duration-200 ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          )}

          {mobile && (
            <button
              type="button"
              onClick={close}
              aria-label="Close navigation menu"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full border border-black/[0.08]
                text-black/45 transition
                hover:bg-black/[0.04] hover:text-black
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black/20
              "
            >
              <IconClose className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className={collapsed ? "mt-8" : "mt-10"}>
        {!collapsed && (
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">
            Workspace
          </p>
        )}

        <nav className="mt-3 space-y-1.5" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.id}
              id={item.id}
              label={item.label}
              active={section === item.id}
              badge={item.badge === "pending" ? badge : 0}
              collapsed={collapsed && !mobile}
              onSelect={handleSelect}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-6">
        <UserCard
          name={name}
          email={email}
          initial={initial}
          onLogout={onLogout}
          collapsed={collapsed && !mobile}
        />
      </div>
    </>
  );

  /* ---------- desktop ---------- */

  if (!mobile) {
    return (
      <aside
        ref={asideRef}
        aria-label="Primary"
        style={{ width: collapsed ? COLLAPSED_WIDTH : DESKTOP_WIDTH }}
        className="
          fixed inset-y-0 left-0 z-40 hidden flex-col
          border-r border-black/[0.07]
          bg-white/[0.82]
          px-4 py-5
          backdrop-blur-[30px] backdrop-saturate-150
          transition-[width] duration-300 ease-out
          lg:flex
        "
      >
        {inner}
      </aside>
    );
  }

  /* ---------- mobile drawer ---------- */

  return (
    <>
      {/* Backdrop — a real button now, not an aria-hidden clickable div */}
      <button
        type="button"
        onClick={close}
        tabIndex={-1}
        aria-label="Close navigation menu"
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden
          transition-opacity duration-200
          ${mounted ? "opacity-100" : "opacity-0"}
        `}
      />

      <aside
        id={mobileNavId}
        ref={asideRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full w-[290px] flex-col
          border-r border-black/[0.07] bg-white px-4 py-5
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          transition-transform duration-300 ease-out
          lg:hidden
          ${mounted ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {inner}
      </aside>
    </>
  );
}