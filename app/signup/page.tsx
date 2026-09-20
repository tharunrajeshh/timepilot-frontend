"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, createTimeline, stagger } from "animejs";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "One number", test: (p: string) => /\d/.test(p) },
  { id: "special", label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
] as const;

const STRENGTH_LABELS = ["", "Very weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_BAR = [
  "bg-white/20",
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-emerald-500",
];
const STRENGTH_TEXT = [
  "",
  "text-rose-300",
  "text-orange-300",
  "text-amber-300",
  "text-blue-300",
  "text-emerald-300",
];

function useDebounced<T>(value: T, delay = 450) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

type Stage = "form" | "verify";
type EmailStatus = "idle" | "invalid" | "checking" | "available" | "taken" | "error";

export default function SignupForm() {
  /* ── fields ───────────────────────────────── */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /* ── ui state ─────────────────────────────── */
  const [stage, setStage] = useState<Stage>("form");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [resendIn, setResendIn] = useState(0);

  /* ── anti-bot ─────────────────────────────── */
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAtRef = useRef(Date.now());

  /* ── rate limiting ────────────────────────── */
  const [attempts, setAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(Date.now());
  const cooldownLeft = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));

  /* ── live clock ───────────────────────────── */
  const [currentTime, setCurrentTime] = useState(new Date());

  /* ── refs ─────────────────────────────────── */
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const verifyHeadingRef = useRef<HTMLHeadingElement>(null);
  const emailAbortRef = useRef<AbortController | null>(null);

  /* ─────────────────────────────────────────────
     Restore draft + timers
  ───────────────────────────────────────────── */
  useEffect(() => {
    const draft = sessionStorage.getItem("timepilot.signup.draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (typeof parsed.name === "string") setName(parsed.name);
        if (typeof parsed.email === "string") setEmail(parsed.email);
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "timepilot.signup.draft",
      JSON.stringify({ name, email }),
    );
  }, [name, email]);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    const n = setInterval(() => setNow(Date.now()), 500);
    return () => {
      clearInterval(t);
      clearInterval(n);
    };
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  /* ─────────────────────────────────────────────
     Entrance animation
  ───────────────────────────────────────────── */
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(".signup-nav", { opacity: [0, 1], translateY: [-15, 0], duration: 500 });

    if (cardRef.current) {
      tl.add(
        cardRef.current,
        { opacity: [0, 1], translateY: [30, 0], duration: 700 },
        "-=280",
      );
    }
    tl.add(
      ".signup-field",
      { opacity: [0, 1], translateY: [12, 0], duration: 450, delay: stagger(45) },
      "-=400",
    );
    return () => {
      tl.pause();
    };
  }, []);

  /* ─────────────────────────────────────────────
     Debounced email availability check
  ───────────────────────────────────────────── */
  const debouncedEmail = useDebounced(email.trim(), 500);

  useEffect(() => {
    if (!debouncedEmail) {
      setEmailStatus("idle");
      return;
    }
    if (!EMAIL_RE.test(debouncedEmail)) {
      setEmailStatus("invalid");
      return;
    }

    emailAbortRef.current?.abort();
    const controller = new AbortController();
    emailAbortRef.current = controller;

    setEmailStatus("checking");

    fetch(`${API_URL}/auth/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: debouncedEmail }),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("check failed");
        const data = (await res.json()) as { available: boolean };
        setEmailStatus(data.available ? "available" : "taken");
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setEmailStatus("error");
      });

    return () => controller.abort();
  }, [debouncedEmail]);

  useEffect(() => {
    if (formError && errorRef.current) errorRef.current.focus();
  }, [formError]);

  useEffect(() => {
    if (stage === "verify") verifyHeadingRef.current?.focus();
  }, [stage]);

  /* ─────────────────────────────────────────────
     Derived validation
  ───────────────────────────────────────────── */
  const passwordChecks = useMemo(
    () => PASSWORD_RULES.map((r) => ({ ...r, passed: r.test(password) })),
    [password],
  );
  const passwordScore = passwordChecks.filter((c) => c.passed).length;
  const passwordStrong = passwordScore === PASSWORD_RULES.length;

  const emailValid = EMAIL_RE.test(email.trim());
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const fieldErrors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (touched.name && !name.trim()) errs.name = "Enter your full name.";
    if (touched.email) {
      if (!email.trim()) errs.email = "Enter your email address.";
      else if (!emailValid) errs.email = "That email doesn't look right.";
      else if (emailStatus === "taken") errs.email = "That email is already registered.";
    }
    if (touched.password) {
      if (!password) errs.password = "Choose a password.";
      else if (!passwordStrong) errs.password = "Password doesn't meet all requirements yet.";
    }
    if (touched.confirmPassword) {
      if (!confirmPassword) errs.confirmPassword = "Re-enter your password.";
      else if (!passwordsMatch) errs.confirmPassword = "Passwords don't match.";
    }
    if (touched.agreed && !agreed) errs.agreed = "Please accept the terms to continue.";
    return errs;
  }, [
    touched, name, email, emailValid, emailStatus,
    password, passwordStrong, confirmPassword, passwordsMatch, agreed,
  ]);

  /* ─────────────────────────────────────────────
     Google OAuth
  ───────────────────────────────────────────── */
  const handleGoogleSignup = useCallback(() => {
    const state = crypto.randomUUID();
    sessionStorage.setItem("timepilot.oauth.state", state);
    const url = new URL(`${API_URL}/auth/google`);
    url.searchParams.set("state", state);
    url.searchParams.set("redirect", "/onboarding");
    window.location.href = url.toString();
  }, []);

  /* ─────────────────────────────────────────────
     Submit
  ───────────────────────────────────────────── */
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (honeypotRef.current?.value) return;
    if (Date.now() - mountedAtRef.current < 1500) {
      setFormError("Please take a moment to review your details.");
      return;
    }

    setTouched({
      name: true, email: true, password: true,
      confirmPassword: true, agreed: true,
    });

    if (!name.trim()) return setFormError("Enter your full name.");
    if (!emailValid) return setFormError("Enter a valid email address.");
    if (emailStatus === "taken") return setFormError("That email is already registered.");
    if (!passwordStrong) return setFormError("Your password doesn't meet all requirements yet.");
    if (!passwordsMatch) return setFormError("Passwords don't match.");
    if (!agreed) return setFormError("Please accept the Terms of Service and Privacy Policy.");

    if (cooldownLeft > 0) {
      setFormError(`Too many attempts. Try again in ${cooldownLeft}s.`);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const code = (data as { code?: string }).code;

        if (res.status === 429 || code === "RATE_LIMITED") {
          setAttempts((a) => a + 1);
          setCooldownUntil(Date.now() + 30_000);
          setFormError("Too many attempts. Please wait 30 seconds and try again.");
          return;
        }

        if (code === "EMAIL_TAKEN") {
          setEmailStatus("taken");
          setFormError("That email is already registered. Try logging in instead.");
          return;
        }

        const detail = (data as { detail?: unknown }).detail;
        if (typeof detail === "string") setFormError(detail);
        else if (Array.isArray(detail)) {
          setFormError(
            detail.map((i: { msg?: string }) => i.msg ?? "Invalid input.").join(" "),
          );
        } else {
          setFormError("We couldn't create your account. Please try again.");
        }
        return;
      }

      sessionStorage.removeItem("timepilot.signup.draft");
      setStage("verify");
      setResendIn(60);
    } catch (err) {
      console.error(err);
      setFormError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     Resend verification
  ───────────────────────────────────────────── */
  const handleResend = async () => {
    if (resendIn > 0) return;
    setResendIn(60);
    try {
      await fetch(`${API_URL}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {
      /* silent */
    }
  };

  /* ─────────────────────────────────────────────
     Button hover
  ───────────────────────────────────────────── */
  const handleButtonEnter = () => {
    if (!buttonRef.current || loading) return;
    animate(buttonRef.current, { scale: 1.015, duration: 220, ease: "outQuad" });
  };
  const handleButtonLeave = () => {
    if (!buttonRef.current || loading) return;
    animate(buttonRef.current, { scale: 1, duration: 220, ease: "outQuad" });
  };

  const digitalTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const date = currentTime.toLocaleDateString("en-IN", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });

  const submitDisabled =
    loading ||
    cooldownLeft > 0 ||
    emailStatus === "taken" ||
    (touched.password && !passwordStrong);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ═══ BACKGROUND — LIVE MARS ═══ */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Mars surface */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/mars-surface.jpg')" }}
        />

        {/* Space fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />

        {/* Horizon warm glow */}
        <div className="absolute left-0 right-0 top-[38%] h-[45%] bg-gradient-to-b from-transparent via-orange-500/10 to-transparent blur-2xl" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

        {/* Starfield */}
        <Stars layer={1} count={60} size={1} duration={3} opacity={0.55} />
        <Stars layer={2} count={40} size={1.5} duration={5} opacity={0.75} />
        <Stars layer={3} count={25} size={2} duration={7} opacity={1} />

        {/* Shooting stars */}
        <ShootingStars />

        {/* Distant blue planet */}
        <div className="absolute right-[8%] top-[8%] h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 via-blue-400 to-blue-700 shadow-[0_0_60px_20px_rgba(56,189,248,0.35)]" />
          <div className="absolute -inset-1 rounded-full border border-sky-300/30 blur-sm" />
        </div>

        {/* Far moon */}
        <div className="absolute left-[15%] top-[12%] h-3 w-3 rounded-full bg-slate-200/70 shadow-[0_0_12px_3px_rgba(226,232,240,0.5)]" />

        {/* Cyan atmosphere */}
        <div className="absolute left-0 right-0 top-[30%] h-[10%] bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent blur-xl" />

        {/* Surface dust haze */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-900/40 via-orange-800/10 to-transparent" />

        {/* Tech grid */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* ═══ NAV ═══ */}
      <nav className="signup-nav relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black shadow-[0_8px_25px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-105">
            T
          </span>
          <span className="text-lg font-semibold tracking-[-0.04em] text-white">
            TimePilot
          </span>
        </Link>

        <Link
          href="/login"
          className="group flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.22] hover:bg-white/[0.12] hover:text-white"