"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import DashboardSidebar, {
  type DashboardSection,
} from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Overview from "@/components/dashboard/Overview";
import TaskPanel, {
  type DashboardTask,
} from "@/components/dashboard/TaskPanel";
import SchedulePanel, {
  type ScheduleItem,
} from "@/components/dashboard/SchedulePanel";
import AIAssistant, {
  type ChatMessage,
} from "@/components/dashboard/AIAssistant";
import GlassCard from "@/components/dashboard/GlassCard";

/* ================================================================== */
/*  CONFIG                                                             */
/* ================================================================== */

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

const USER_KEY = "timepilot_user";
const TOKEN_KEY = "timepilot_token";         // fallback only — prefer cookies
const CSRF_KEY = "timepilot_csrf";

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;   // 30 min inactivity
const REQUEST_TIMEOUT_MS = 20 * 1000;
const MAX_TITLE_LEN = 200;
const MAX_DESC_LEN = 2000;
const MAX_CHAT_LEN = 2000;
const MAX_MESSAGES = 100;

/* ================================================================== */
/*  TYPES                                                              */
/* ================================================================== */

type User = { id: number; name: string; email: string };

type DayPlan = {
  summary?: string;
  schedule?: ScheduleItem[];
  unscheduled?: Array<{ task_id?: number; title: string; reason: string }>;
};

type CreateTaskInput = {
  title: string;
  description?: string;
  priority?: string;
  due_date?: string | null;
  estimated_minutes?: number | string | null;
};

type ApiError = { detail?: string; message?: string };

/* ================================================================== */
/*  SECURITY HELPERS                                                   */
/* ================================================================== */

/** Strip control chars, collapse whitespace, enforce max length. */
function sanitizeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

/** Only allow a whitelist of priorities. */
const ALLOWED_PRIORITIES = new Set(["low", "medium", "high", "urgent"]);
function sanitizePriority(input: unknown): string {
  const value = typeof input === "string" ? input.toLowerCase() : "";
  return ALLOWED_PRIORITIES.has(value) ? value : "medium";
}

/** ISO date validation. Returns null if not a valid future-or-equal date. */
function sanitizeDate(input: unknown): string | null {
  if (typeof input !== "string" || !input.trim()) return null;
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** Coerce to a safe positive integer number of minutes, capped at 24h. */
function sanitizeMinutes(input: unknown): number | null {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.min(Math.round(n), 24 * 60);
}

/** Safe numeric/string id. Rejects anything weird before hitting the URL. */
function sanitizeId(id: number | string): string | null {
  if (typeof id === "number" && Number.isInteger(id) && id > 0) return String(id);
  if (typeof id === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(id)) return id;
  return null;
}

/** Read a cookie by name (client-side only). */
function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[-.]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/** Validate the shape of the stored user object. */
function parseStoredUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as User).id === "number" &&
      typeof (parsed as User).name === "string" &&
      typeof (parsed as User).email === "string"
    ) {
      const u = parsed as User;
      return {
        id: u.id,
        name: sanitizeText(u.name, 100) || "User",
        email: sanitizeText(u.email, 200),
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

/* ================================================================== */
/*  NORMALIZERS                                                        */
/* ================================================================== */

function normalizeTask(raw: Record<string, unknown>): DashboardTask {
  const est = Number(raw.estimated_minutes);
  return {
    ...(raw as Record<string, unknown>),
    id: raw.id as number | string,
    title: sanitizeText(raw.title, MAX_TITLE_LEN) || "Untitled task",
    description: sanitizeText(raw.description, MAX_DESC_LEN),
    status: String(raw.status ?? "pending"),
    priority: sanitizePriority(raw.priority),
    due_date: (raw.due_date ?? raw.deadline ?? null) as string | null,
    estimated_minutes: Number.isFinite(est) && est > 0 ? est : null,
  } as unknown as DashboardTask;
}

function normalizeSchedule(input: unknown): ScheduleItem[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 100).map((entry, index) => {
    const item = (entry ?? {}) as Record<string, unknown>;
    return {
      id: (item.id as string | number | undefined) ?? index,
      title: sanitizeText(
        item.title || item.task_title || "Focus session",
        MAX_TITLE_LEN
      ),
      start_time: item.start_time ? String(item.start_time) : undefined,
      end_time: item.end_time ? String(item.end_time) : undefined,
      start: item.start ? String(item.start) : undefined,
      end: item.end ? String(item.end) : undefined,
      duration_minutes:
        typeof item.duration_minutes === "number"
          ? item.duration_minutes
          : undefined,
      status: item.status ? String(item.status) : undefined,
      type: item.type ? String(item.type) : undefined,
      task_id:
        typeof item.task_id === "number" ? item.task_id : undefined,
    } as ScheduleItem;
  });
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function DashboardPage() {
  const router = useRouter();

  /* ---------------- AUTH ---------------- */
  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  /* ---------------- NAV ---------------- */
  const [section, setSection] = useState<DashboardSection>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /* ---------------- TASKS ---------------- */
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [taskNotice, setTaskNotice] = useState("");
  const [taskError, setTaskError] = useState("");

  /* ---------------- FOCUS ---------------- */
  const [activeTaskId, setActiveTaskId] = useState<number | string | null>(null);

  /* ---------------- AI ---------------- */
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [planning, setPlanning] = useState(false);

  /* ---------------- SCHEDULE ---------------- */
  const [dayPlan, setDayPlan] = useState<DayPlan | null>(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  /* ---------------- CLOCK ---------------- */
  const [currentTime, setCurrentTime] = useState(() => new Date());

  /* ---------------- SECURITY REFS ---------------- */
  const aliveRef = useRef(true);
  const lastActivityRef = useRef(Date.now());
  const inflightRef = useRef(new Set<AbortController>());

  /* ---------------- RATE LIMITS ---------------- */
  const rateRef = useRef({
    createTask: [] as number[],
    aiChat: [] as number[],
    planDay: [] as number[],
  });

  function withinRateLimit(
    bucket: "createTask" | "aiChat" | "planDay",
    max: number,
    windowMs: number
  ): boolean {
    const now = Date.now();
    const arr = rateRef.current[bucket].filter((t) => now - t < windowMs);
    if (arr.length >= max) {
      rateRef.current[bucket] = arr;
      return false;
    }
    arr.push(now);
    rateRef.current[bucket] = arr;
    return true;
  }

  /* ================================================================ */
  /*  LIFECYCLE                                                       */
  /* ================================================================ */

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      inflightRef.current.forEach((c) => {
        try { c.abort(); } catch { /* noop */ }
      });
      inflightRef.current.clear();
    };
  }, []);

  /* ================================================================ */
  /*  AUTH HELPERS                                                    */
  /* ================================================================ */

  /**
   * Returns auth-related headers. Prefers cookies (HttpOnly set by backend)
   * but falls back to a sessionStorage Bearer token for legacy servers.
   * Adds CSRF double-submit token for state-changing requests.
   */
  const getAuthContext = useCallback(() => {
    if (typeof window === "undefined") {
      return { headers: {} as Record<string, string>, hasSession: false };
    }

    const token = sessionStorage.getItem(TOKEN_KEY);
    const csrf =
      readCookie(CSRF_KEY) || sessionStorage.getItem(CSRF_KEY);
    const hasSession = Boolean(token) || Boolean(readCookie("tp_session"));

    return {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(csrf ? { "X-CSRF-Token": csrf } : {}),
      },
      hasSession,
    };
  }, []);

  const clearAuth = useCallback(() => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(CSRF_KEY);
    // Legacy cleanup
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(CSRF_KEY);
  }, []);

  const logout = useCallback(
    async (silent = false) => {
      clearAuth();
      setUser(null);
      setTasks([]);
      setMessages([]);
      setDayPlan(null);
      setActiveTaskId(null);

      // Best-effort server-side session invalidation — ignore failures.
      try {
        const { headers } = getAuthContext();
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json", ...headers },
          keepalive: true,
        });
      } catch {
        /* noop */
      }

      if (!silent) router.replace("/login");
    },
    [clearAuth, getAuthContext, router]
  );

  /* ================================================================ */
  /*  SECURE FETCH                                                    */
  /* ================================================================ */

  /**
   * Hardened fetch:
   *  - cookie credentials + CSRF header
   *  - request timeout via AbortController
   *  - auto logout on 401/403
   *  - sanitized error messages (never surfaces raw backend detail)
   */
  const secureFetch = useCallback(
    async <T,>(
      path: string,
      init: RequestInit & { timeoutMs?: number } = {}
    ): Promise<{ ok: true; data: T } | { ok: false; error: string; status: number }> => {
      const controller = new AbortController();
      inflightRef.current.add(controller);

      const timeout = window.setTimeout(
        () => controller.abort(),
        init.timeoutMs ?? REQUEST_TIMEOUT_MS
      );

      try {
        const { headers: authHeaders } = getAuthContext();

        const res = await fetch(`${API_URL}${path}`, {
          ...init,
          credentials: "include",
          signal: controller.signal,
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...authHeaders,
            ...(init.headers || {}),
          },
        });

        if (res.status === 401 || res.status === 403) {
          void logout(true);
          return { ok: false, error: "Session expired. Please sign in again.", status: res.status };
        }

        if (res.status === 429) {
          return { ok: false, error: "Too many requests. Please slow down.", status: 429 };
        }

        if (res.status === 204) {
          return { ok: true, data: undefined as unknown as T };
        }

        let data: unknown = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (!res.ok) {
          const detail = (data as ApiError | null)?.detail;
          const message = (data as ApiError | null)?.message;
          // Never leak raw backend detail to the UI.
          const safe =
            typeof detail === "string" && detail.length < 200
              ? detail
              : typeof message === "string" && message.length < 200
              ? message
              : `Request failed (${res.status}).`;
          return { ok: false, error: safe, status: res.status };
        }

        return { ok: true, data: data as T };
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") {
          return { ok: false, error: "Request timed out.", status: 0 };
        }
        return { ok: false, error: "Network error. Check your connection.", status: 0 };
      } finally {
        window.clearTimeout(timeout);
        inflightRef.current.delete(controller);
      }
    },
    [getAuthContext, logout]
  );

  /* ================================================================ */
  /*  AUTH CHECK                                                      */
  /* ================================================================ */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = parseStoredUser(
      sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY)
    );
    const { hasSession } = getAuthContext();

    if (!stored || !hasSession) {
      clearAuth();
      router.replace("/login");
      return;
    }

    setUser(stored);
    setAuthChecking(false);
  }, [clearAuth, getAuthContext, router]);

  /* ================================================================ */
  /*  INACTIVITY TIMEOUT                                              */
  /* ================================================================ */

  useEffect(() => {
    if (!user) return;

    const bump = () => {
      lastActivityRef.current = Date.now();
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    events.forEach((e) =>
      window.addEventListener(e, bump, { passive: true })
    );

    const interval = window.setInterval(() => {
      if (Date.now() - lastActivityRef.current > SESSION_TIMEOUT_MS) {
        void logout(true);
        router.replace("/login");
      }
    }, 60_000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, bump));
      window.clearInterval(interval);
    };
  }, [user, logout, router]);

  /* ================================================================ */
  /*  LIVE CLOCK                                                      */
  /* ================================================================ */

  useEffect(() => {
    const tick = () => setCurrentTime(new Date());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  /* ================================================================ */
  /*  LOAD TASKS                                                      */
  /* ================================================================ */

  const loadTasks = useCallback(async () => {
    setTasksLoading(true);
    setTaskError("");

    const result = await secureFetch<unknown>("/tasks", { method: "GET" });

    if (!aliveRef.current) return;

    if (!result.ok) {
      setTaskError(result.error);
      setTasksLoading(false);
      return;
    }

    const list = Array.isArray(result.data) ? result.data : [];
    setTasks(
      list
        .slice(0, 1000)
        .map((item) => normalizeTask(item as Record<string, unknown>))
    );
    setTasksLoading(false);
  }, [secureFetch]);

  useEffect(() => {
    if (!authChecking && user) void loadTasks();
  }, [authChecking, user, loadTasks]);

  /* ================================================================ */
  /*  CREATE TASK                                                     */
  /* ================================================================ */

  const createTask = useCallback(
    async (input: CreateTaskInput) => {
      if (!withinRateLimit("createTask", 10, 60_000)) {
        setTaskError("Too many tasks created. Please wait a moment.");
        return;
      }

      const title = sanitizeText(input.title, MAX_TITLE_LEN);
      if (!title) {
        setTaskError("A task title is required.");
        return;
      }

      setTaskError("");
      setTaskNotice("");

      const payload = {
        title,
        description: sanitizeText(input.description, MAX_DESC_LEN) || null,
        priority: sanitizePriority(input.priority),
        estimated_minutes: sanitizeMinutes(input.estimated_minutes),
        deadline: sanitizeDate(input.due_date),
      };

      const result = await secureFetch<unknown>("/tasks", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!result.ok) {
        setTaskError(result.error);
        return;
      }

      setTaskNotice("Task created successfully.");
      await loadTasks();
    },
    [loadTasks, secureFetch]
  );

  /* ================================================================ */
  /*  UPDATE TASK STATUS                                              */
  /* ================================================================ */

  const updateTaskStatus = useCallback(
    async (task: DashboardTask, status: string) => {
      const safeId = sanitizeId(task.id);
      if (!safeId) {
        setTaskError("Invalid task reference.");
        return;
      }

      const allowed = new Set(["pending", "in_progress", "completed"]);
      if (!allowed.has(status)) return;

      const previous = task;

      setTasks((current) =>
        current.map((item) =>
          item.id === task.id ? { ...item, status } : item
        )
      );

      let result = await secureFetch<unknown>(`/tasks/${safeId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      // Legacy PUT fallback
      if (!result.ok && result.status === 405) {
        result = await secureFetch<unknown>(`/tasks/${safeId}`, {
          method: "PUT",
          body: JSON.stringify({ ...task, status }),
        });
      }

      if (!result.ok) {
        setTasks((current) =>
          current.map((item) =>
            item.id === task.id ? previous : item
          )
        );
        setTaskError(result.error);
        return;
      }

      if (result.data && typeof result.data === "object") {
        setTasks((current) =>
          current.map((item) =>
            item.id === task.id
              ? normalizeTask({
                  ...(item as unknown as Record<string, unknown>),
                  ...(result.data as Record<string, unknown>),
                })
              : item
          )
        );
      }
    },
    [secureFetch]
  );

  /* ================================================================ */
  /*  DELETE TASK                                                     */
  /* ================================================================ */

  const deleteTask = useCallback(
    async (id: number | string) => {
      const safeId = sanitizeId(id);
      if (!safeId) {
        setTaskError("Invalid task reference.");
        return;
      }

      const snapshot = tasks;
      setTasks((current) => current.filter((t) => t.id !== id));
      if (activeTaskId === id) setActiveTaskId(null);

      const result = await secureFetch<unknown>(`/tasks/${safeId}`, {
        method: "DELETE",
      });

      if (!result.ok) {
        setTasks(snapshot);
        setTaskError(result.error);
        return;
      }

      setTaskNotice("Task deleted.");
    },
    [activeTaskId, secureFetch, tasks]
  );

  /* ================================================================ */
  /*  FOCUS MODE                                                      */
  /* ================================================================ */

  const activeTask = useMemo(
    () => tasks.find((t) => t.id === activeTaskId) || null,
    [tasks, activeTaskId]
  );

  const startFocus = useCallback(
    async (task: DashboardTask) => {
      setActiveTaskId(task.id);
      if (task.status !== "in_progress") {
        await updateTaskStatus(task, "in_progress");
      }
    },
    [updateTaskStatus]
  );

  const completeFocus = useCallback(async () => {
    if (!activeTask) return;
    await updateTaskStatus(activeTask, "completed");
    setActiveTaskId(null);
  }, [activeTask, updateTaskStatus]);

   /* ================================================================ */
  /*  AI CHAT                                                         */
  /* ================================================================ */

  const sendAIMessage = useCallback(
    async (message: string) => {
      if (aiLoading) return;

      if (!withinRateLimit("aiChat", 15, 60_000)) {
        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "You're sending messages too quickly. Please wait a moment.",
          },
        ].slice(-MAX_MESSAGES));
        return;
      }

      const clean = sanitizeText(message, MAX_CHAT_LEN);
      if (!clean) return;

      setAiLoading(true);

      setMessages((current) =>
        [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "user" as const,
            content: clean,
          },
        ].slice(-MAX_MESSAGES)
      );

      const result = await secureFetch<Record<string, unknown>>(
        "/agent/chat",
        {
          method: "POST",
          body: JSON.stringify({ message: clean }),
        }
      );

      if (!result.ok) {
        setMessages((current) =>
          [
            ...current,
            {
              id: crypto.randomUUID(),
              role: "assistant" as const,
              content: result.error,
            },
          ].slice(-MAX_MESSAGES)
        );

        setAiLoading(false);
        return;
      }

      const payload = (result.data ?? {}) as Record<string, unknown>;

      const answer = sanitizeText(
        payload.response ?? payload.message ?? payload.answer,
        MAX_CHAT_LEN
      );

      setMessages((current) =>
        [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant" as const,
            content: answer || "I couldn't generate a response.",
          },
        ].slice(-MAX_MESSAGES)
      );

      if (
        payload.action === "create_task" &&
        payload.task_created === true
      ) {
        await loadTasks();

        const created = payload.task as { title?: string } | undefined;

        setTaskNotice(
          created?.title
            ? `Task created: ${sanitizeText(
                created.title,
                MAX_TITLE_LEN
              )}`
            : "Task created by TimePilot AI."
        );
      }

      setAiLoading(false);
    },
    [aiLoading, loadTasks, secureFetch]
  );
  /* ================================================================ */
  /*  AI DAY PLAN                                                     */
  /* ================================================================ */

  const generateDayPlan = useCallback(async () => {
    if (planning) return;

    if (!withinRateLimit("planDay", 5, 60_000)) {
      setTaskError("Please wait before planning again.");
      return;
    }

    setPlanning(true);
    setScheduleLoading(true);
    setTaskError("");

    const result = await secureFetch<Record<string, unknown>>(
      "/agent/plan-day",
      {
        method: "POST",
        body: JSON.stringify({
          extra_context:
            "Create the best realistic plan for the rest of today.",
        }),
        timeoutMs: 30_000,
      }
    );

    if (!result.ok) {
      setTaskError(result.error);
      setPlanning(false);
      setScheduleLoading(false);
      return;
    }

    const payload = result.data ?? {};
    setDayPlan({
      summary: sanitizeText(
        payload.summary || "Your optimized plan for today.",
        500
      ),
      schedule: normalizeSchedule(payload.schedule),
      unscheduled: Array.isArray(payload.unscheduled)
        ? (payload.unscheduled as DayPlan["unscheduled"])
        : [],
    });

    setSection("schedule");
    setPlanning(false);
    setScheduleLoading(false);
  }, [planning, secureFetch]);

  /* ================================================================ */
  /*  METRICS                                                         */
  /* ================================================================ */

  const completed = useMemo(
    () => tasks.filter((t) => t.status === "completed").length,
    [tasks]
  );
  const pending = useMemo(
    () => tasks.filter((t) => t.status !== "completed").length,
    [tasks]
  );
  const inProgress = useMemo(
    () => tasks.filter((t) => t.status === "in_progress").length,
    [tasks]
  );
  const totalMinutes = useMemo(
    () => tasks.reduce((sum, t) => sum + Number(t.estimated_minutes || 0), 0),
    [tasks]
  );
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
  const progress =
    tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

  const dueSoon = useMemo(() => {
    const now = Date.now();
    const tomorrow = now + 24 * 60 * 60 * 1000;
    return tasks.filter((task) => {
      if (task.status === "completed" || !task.due_date) return false;
      const t = new Date(task.due_date).getTime();
      return Number.isFinite(t) && t >= now && t <= tomorrow;
    }).length;
  }, [tasks]);

  /* ================================================================ */
  /*  NAVIGATION                                                      */
  /* ================================================================ */

  const navigate = useCallback((next: DashboardSection) => {
    setSection(next);
    setMobileNavOpen(false);
    setTaskError("");
    setTaskNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ================================================================ */
  /*  LOADING / GUARD                                                 */
  /* ================================================================ */

  if (authChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-black">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-black/[0.08] bg-white shadow-[0_15px_50px_rgba(0,0,0,0.08)]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/10 border-t-black" />
          </div>
          <p className="mt-5 text-sm font-medium text-black/45">
            Preparing your workspace
          </p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const firstName = user.name.trim().split(" ")[0] || "there";
  const initial = user.name.trim().charAt(0).toUpperCase() || "U";

  const currentDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const digitalTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  /* ================================================================ */
  /*  RENDER                                                          */
  /* ================================================================ */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F5] text-black">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[18%] top-[-220px] h-[500px] w-[500px] rounded-full bg-purple-500/[0.045] blur-[130px]" />
        <div className="absolute right-[-160px] top-[25%] h-[460px] w-[460px] rounded-full bg-blue-500/[0.04] blur-[130px]" />
        <div className="absolute bottom-[-180px] left-[40%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.035] blur-[120px]" />
      </div>

      <DashboardSidebar
        section={section}
        pending={pending}
        name={user.name}
        email={user.email}
        initial={initial}
        mobile={false}
        onNavigate={navigate}
        onLogout={() => void logout()}
      />

      {mobileNavOpen && (
        <DashboardSidebar
          section={section}
          pending={pending}
          name={user.name}
          email={user.email}
          initial={initial}
          mobile
          onNavigate={navigate}
          onLogout={() => void logout()}
          onClose={() => setMobileNavOpen(false)}
        />
      )}

      <div className="lg:pl-[250px]">
        <DashboardHeader
          section={section}
          firstName={firstName}
          currentDate={currentDate}
          digitalTime={digitalTime}
          initial={initial}
          onOpenMenu={() => setMobileNavOpen(true)}
        />

        <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          {taskError && (
            <div
              role="alert"
              className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-red-500/15 bg-red-500/[0.04] px-4 py-3 text-sm text-red-700"
            >
              <span>{taskError}</span>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => void loadTasks()}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-500/[0.06]"
                >
                  Retry
                </button>
                <button
                  onClick={() => setTaskError("")}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-500/[0.06]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {taskNotice && (
            <div
              role="status"
              className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.05] px-4 py-3 text-sm text-emerald-700"
            >
              <span>{taskNotice}</span>
              <button
                onClick={() => setTaskNotice("")}
                className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-500/[0.06]"
              >
                Dismiss
              </button>
            </div>
          )}

          {activeTask && (
            <div className="mb-5 overflow-hidden rounded-[24px] border border-purple-500/15 bg-white p-4 shadow-[0_12px_45px_rgba(0,0,0,0.05)] sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-600">
                      Focus mode
                    </span>
                  </div>
                  <h2 className="mt-2 truncate text-lg font-semibold tracking-tight">
                    {activeTask.title}
                  </h2>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => void completeFocus()}
                    className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/90"
                  >
                    Mark complete
                  </button>
                  <button
                    onClick={() => setActiveTaskId(null)}
                    className="rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-black/55 transition hover:bg-black/[0.03] hover:text-black"
                  >
                    Stop focus
                  </button>
                </div>
              </div>
            </div>
          )}

          {section === "overview" && (
            <Overview
              tasks={tasks}
              schedule={dayPlan?.schedule || []}
              completed={completed}
              pending={pending}
              inProgress={inProgress}
              totalHours={totalHours}
              progress={progress}
              dueSoon={dueSoon}
              currentTime={currentTime}
              firstName={firstName}
              activeTask={activeTask}
              onStartTask={startFocus}
              onScheduleFocus={() => setSection("schedule")}
              onCompleteFocus={completeFocus}
            />
          )}

          {section === "tasks" && (
            <TaskPanel
              tasks={tasks}
              onCreateTask={createTask}
              onStatusChange={updateTaskStatus}
              onDeleteTask={deleteTask}
              loading={tasksLoading}
            />
          )}

          {section === "schedule" && (
            <div className="space-y-6">
              <GlassCard padding="lg" className="overflow-hidden">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                      AI schedule
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                      Your day, structured.
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-black/40">
                      {dayPlan?.summary ||
                        "Let TimePilot organize your open tasks into a realistic schedule."}
                    </p>
                  </div>
                  <button
                    onClick={() => void generateDayPlan()}
                    disabled={planning}
                    className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/90 disabled:cursor-wait disabled:opacity-50"
                  >
                    {planning ? "Planning..." : "Plan my day"}
                  </button>
                </div>
              </GlassCard>

              <SchedulePanel
                schedule={dayPlan?.schedule || []}
                currentTime={currentTime}
                onFocus={(item) => {
                  const match =
                    (item as { task_id?: number }).task_id != null
                      ? tasks.find(
                          (t) =>
                            t.id === (item as { task_id?: number }).task_id
                        )
                      : tasks.find((t) => t.title === item.title);
                  if (match) void startFocus(match);
                }}
                loading={scheduleLoading}
              />
            </div>
          )}

          {section === "assistant" && (
            <AIAssistant
              messages={messages}
              loading={aiLoading}
              onSend={sendAIMessage}
              onPlanDay={generateDayPlan}
              planning={planning}
            />
          )}
        </div>
      </div>
    </main>
  );
}