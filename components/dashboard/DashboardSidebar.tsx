"use client";

import Link from "next/link";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
};

/* ================================================================
   CONSTANTS
================================================================ */

const NAV_ITEMS = [
  { id: "overview", label: "Overview", color: "#111111" },
  { id: "tasks", label: "Tasks", color: "#8B5CF6" },
  { id: "schedule", label: "Schedule", color: "#3B82F6" },
  { id: "assistant", label: "AI Assistant", color: "#10B981" },
] as const satisfies ReadonlyArray<{
  id: DashboardSection;
  label: string;
  color: string;
}>;

const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 200;
const MAX_BADGE = 999;

/* ================================================================
   HELPERS
================================================================ */

/** Strip control chars + bound length before anything hits the DOM. */
function safeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

/** First grapheme, uppercased. Handles emoji + accents correctly. */
function safeInitial(input: unknown): string {
  const clean = safeText(input, MAX_NAME_LEN).trim();
  if (!clean) return "U";
  return (Array.from(clean)[0] ?? "U").toUpperCase();
}

/** Clamp the pending badge into a displayable integer. */
function clampBadge(n: unknown): number {
  const value = Number(n);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.min(Math.floor(value), MAX_BADGE);
}

/* ================================================================
   NAV BUTTON (memoized — sidebar re-renders don't touch this)
================================================================ */

type NavButtonProps = {
  id: DashboardSection;
  label: string;
  color: string;
  active: boolean;
  badge: number;
  onSelect: (id: DashboardSection) => void;
};

const NavButton = memo(function NavButton({
  id,
  label,
  color,
  active,
  badge,
  onSelect,
}: NavButtonProps) {
  const handleClick = useCallback(() => onSelect(id), [id, onSelect]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      className={`
        group flex w-full items-center gap-3 rounded-[14px]
        px-3 py-3 text-left text-sm
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-black/20
        ${
          active
            ? "bg-black text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)]"
            : "text-black/55 hover:bg-black/[0.04] hover:text-black"
        }
      `}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125"
        style={{ backgroundColor: active ? "#ffffff" : color }}
        aria-hidden="true"
      />

      <span className="flex-1 font-medium">{label}</span>

      {id === "tasks" && badge > 0 && (
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
    </button>
  );
});

/* ================================================================
   USER CARD (memoized)
================================================================ */

type UserCardProps = {
  name: string;
  email: string;
  initial: string;
  onLogout: () => void;
};

const UserCard = memo(function UserCard({
  name,
  email,
  initial,
  onLogout,
}: UserCardProps) {
  const safeName = safeText(name, MAX_NAME_LEN).trim() || "User";
  const safeEmail = safeText(email, MAX_EMAIL_LEN).trim();
  const safeInit = safeInitial(initial);

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
          <p
            className="truncate text-sm font-semibold text-black"
            title={safeName}
          >
            {safeName}
          </p>

          {safeEmail && (
            <p
              className="truncate text-[11px] text-black/40"
              title={safeEmail}
            >
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
}: {
  onClose?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClose}
      className="
        flex items-center gap-3 rounded-xl px-2 py-1
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-black/20
      "
    >
      <div
        className="
          flex h-10 w-10 items-center justify-center
          rounded-[13px] bg-black text-sm font-bold text-white
          shadow-lg select-none
        "
        aria-hidden="true"
      >
        T
      </div>

      <div>
        <p className="text-[15px] font-semibold tracking-tight text-black">
          TimePilot
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/35">
          Workspace
        </p>
      </div>
    </Link>
  );
});

/* ================================================================
   SHARED NAV BLOCK
================================================================ */

function NavBlock({
  section,
  badge,
  onSelect,
}: {
  section: DashboardSection;
  badge: number;
  onSelect: (id: DashboardSection) => void;
}) {
  return (
    <nav className="mt-3 space-y-1.5" aria-label="Workspace">
      {NAV_ITEMS.map((item) => (
        <NavButton
          key={item.id}
          id={item.id}
          label={item.label}
          color={item.color}
          active={section === item.id}
          badge={item.id === "tasks" ? badge : 0}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
}

/* ================================================================
   MAIN COMPONENT
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
}: DashboardSidebarProps) {
  const asideRef = useRef<HTMLElement>(null);

  const badge = useMemo(() => clampBadge(pending), [pending]);

  const handleSelect = useCallback(
    (next: DashboardSection) => {
      onNavigate(next);
      onClose?.();
    },
    [onNavigate, onClose]
  );

  /* ---------- mobile: focus trap + ESC + scroll lock ---------- */

  useEffect(() => {
    if (!mobile) return;

    const node = asideRef.current;
    if (!node) return;

    const previouslyFocused =
      (document.activeElement as HTMLElement | null) ?? null;

    const getFocusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    // Initial focus goes to the first focusable element.
    const first = getFocusable()[0];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
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

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      // Return focus to whatever opened the drawer.
      if (previouslyFocused && document.body.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [mobile, onClose]);

  /* ---------- shared inner content ---------- */

  const inner = (
    <>
      <div className="flex items-center justify-between">
        <Logo onClose={mobile ? onClose : undefined} />

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full border border-black/[0.08]
              text-lg leading-none text-black/45
              transition
              hover:bg-black/[0.04] hover:text-black
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-black/20
            "
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>

      <div className="mt-10">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">
          Workspace
        </p>

        <NavBlock
          section={section}
          badge={badge}
          onSelect={handleSelect}
        />
      </div>

      <div className="mt-auto pt-6">
        <UserCard
          name={name}
          email={email}
          initial={initial}
          onLogout={onLogout}
        />
      </div>
    </>
  );

  /* ---------- desktop ---------- */

  if (!mobile) {
    return (
      <aside
        className="
          fixed inset-y-0 left-0 z-40 hidden w-[250px] flex-col
          border-r border-black/[0.07]
          bg-white/[0.82]
          px-4 py-5
          backdrop-blur-[30px] backdrop-saturate-150
          lg:flex
        "
        aria-label="Primary"
      >
        {inner}
      </aside>
    );
  }

  /* ---------- mobile drawer ---------- */

  return (
    <>
      {/* Backdrop */}
      <div
        className="
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-sm
          lg:hidden
          animate-in fade-in duration-150
        "
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        id="dashboard-mobile-nav"
        ref={asideRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="
          fixed inset-y-0 left-0 z-50 flex h-full w-[290px] flex-col
          border-r border-black/[0.07]
          bg-white
          px-4 py-5
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          lg:hidden
        "
      >
        {inner}
      </aside>
    </>
  );
}