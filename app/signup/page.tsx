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
  "bg-black/10",
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-emerald-500",
];
const STRENGTH_TEXT = [
  "",
  "text-rose-500",
  "text-orange-500",
  "text-amber-500",
  "text-blue-500",
  "text-emerald-500",
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

  /* ── rate limiting (client-side assist) ───── */
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

  /* ─────────────────────────────────────────────
     Focus the error banner when it appears
  ───────────────────────────────────────────── */
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
     Google OAuth — include CSRF state
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

    // Bot heuristics
    if (honeypotRef.current?.value) return;
    if (Date.now() - mountedAtRef.current < 1500) {
      setFormError("Please take a moment to review your details.");
      return;
    }

    // Mark everything touched so all errors surface
    setTouched({
      name: true, email: true, password: true,
      confirmPassword: true, agreed: true,
    });

    // Client-side gate
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
            detail
              .map((i: { msg?: string }) => i.msg ?? "Invalid input.")
              .join(" "),
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
      /* silent — user already knows it's sent */
    }
  };

  /* ─────────────────────────────────────────────
     Button hover animation
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
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      {/* ═══ BACKGROUND ═══ */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-500/[0.045] blur-[150px]" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[420px] w-[420px] rounded-full bg-blue-500/[0.025] blur-[140px]" />
        <div className="absolute right-[-120px] top-[40%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.025] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(255,255,255,0.3)_55%,rgba(255,255,255,0.95)_100%)]" />
      </div>

      {/* ═══ NAV ═══ */}
      <nav className="signup-nav relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105">
            T
          </span>
          <span className="text-lg font-semibold tracking-[-0.04em]">TimePilot</span>
        </Link>

        <Link
          href="/login"
          className="group flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-4 py-2.5 text-sm font-medium text-black/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-black/[0.13] hover:bg-white hover:text-black"
        >
          Already have an account?
          <span className="font-semibold text-black transition-transform duration-200 group-hover:translate-x-0.5">
            Log in
          </span>
        </Link>
      </nav>

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-20 flex min-h-[calc(100vh-82px)] items-center justify-center px-5 pb-16 pt-8 sm:px-8">
        <div className="w-full max-w-[470px]">
          {stage === "form" ? (
            <>
              {/* Header */}
              <div className="mb-10 text-center">
                <h1 className="signup-field text-4xl font-semibold leading-[1.1] tracking-[-0.06em] text-black sm:text-5xl">
                  Create your account
                </h1>
                <p className="signup-field mx-auto mt-4 max-w-sm text-sm leading-6 text-black/45 sm:text-base">
                  Take control of your time and build a smarter, more intentional workday.
                </p>
              </div>

              {/* Card */}
              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#F7F7F5] p-5 shadow-[0_35px_100px_rgba(0,0,0,0.09)] sm:rounded-[34px] sm:p-7"
              >
                <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[250px] w-[350px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-[90px]" />

                <div className="relative">
                  {/* Live clock */}
                  <div className="signup-field mb-6 flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-3">
                      <AnalogClock time={currentTime} />
                      <div>
                        <p className="font-mono text-sm font-medium tracking-[0.08em] text-black">
                          {digitalTime}
                        </p>
                        <p className="mt-0.5 max-w-[190px] truncate text-xs text-black/40">
                          {date}
                        </p>
                      </div>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Google */}
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="signup-field flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl border border-black/[0.08] bg-white px-4 text-sm font-semibold text-black/70 shadow-[0_5px_20px_rgba(0,0,0,0.025)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.14] hover:bg-white hover:text-black hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                  >
                    <GoogleIcon />
                    Continue with Google
                  </button>

                  {/* Divider */}
                  <div className="signup-field my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-black/[0.07]" />
                    <span className="text-xs font-medium text-black/35">or</span>
                    <div className="h-px flex-1 bg-black/[0.07]" />
                  </div>

                  {/* Form error */}
                  {formError && (
                    <div
                      ref={errorRef}
                      tabIndex={-1}
                      role="alert"
                      aria-live="assertive"
                      className="mb-5 flex items-start gap-3 rounded-xl border border-rose-500/15 bg-rose-500/[0.05] px-4 py-3.5 text-sm text-rose-600 outline-none"
                    >
                      <AlertIcon />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Form */}
                  <form
                    ref={formRef}
                    onSubmit={handleSignup}
                    className="space-y-4"
                    noValidate
                    aria-busy={loading}
                  >
                    {/* Honeypot */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor="company">Company</label>
                      <input
                        ref={honeypotRef}
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Name */}
                    <Field
                      id="name"
                      label="Full name"
                      icon={<UserIcon />}
                      error={fieldErrors.name}
                      touched={touched.name}
                    >
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        placeholder="Mike Johnson"
                        required
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        className={inputClass(Boolean(fieldErrors.name))}
                      />
                    </Field>

                    {/* Email */}
                    <Field
                      id="email"
                      label="Email address"
                      icon={<MailIcon />}
                      error={fieldErrors.email}
                      touched={touched.email}
                      trailing={
                        touched.email && emailValid ? (
                          <EmailStatusBadge status={emailStatus} />
                        ) : null
                      }
                    >
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        placeholder="you@example.com"
                        required
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        className={inputClass(Boolean(fieldErrors.email))}
                      />
                    </Field>

                    {/* Password */}
                    <Field
                      id="password"
                      label="Password"
                      icon={<LockIcon />}
                      error={fieldErrors.password}
                      touched={touched.password}
                    >
                      <div className="relative">
                        <input
                          id="password"
                          name="new-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                          placeholder="Create a strong password"
                          required
                          minLength={8}
                          aria-invalid={Boolean(fieldErrors.password)}
                          aria-describedby="password-requirements"
                          className={`${inputClass(Boolean(fieldErrors.password))} pr-16`}
                        />
                        <VisibilityToggle
                          shown={showPassword}
                          onToggle={() => setShowPassword((s) => !s)}
                          label={showPassword ? "Hide password" : "Show password"}
                        />
                      </div>

                      <div
                        id="password-requirements"
                        className="mt-3 rounded-xl border border-black/[0.05] bg-white/60 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold text-black/55">
                            Password requirements
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              password ? STRENGTH_TEXT[passwordScore] : "text-black/30"
                            }`}
                          >
                            {password ? STRENGTH_LABELS[passwordScore] : ""}
                          </span>
                        </div>

                        <div className="mb-3 flex gap-1" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <span
                              key={step}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                step <= passwordScore
                                  ? STRENGTH_BAR[passwordScore]
                                  : "bg-black/10"
                              }`}
                            />
                          ))}
                        </div>

                        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                          {passwordChecks.map((rule) => (
                            <li
                              key={rule.id}
                              className={`flex items-center gap-1.5 text-xs ${
                                rule.passed ? "text-emerald-600" : "text-black/40"
                              }`}
                            >
                              <span
                                className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                                  rule.passed ? "bg-emerald-500/15" : "bg-black/[0.06]"
                                }`}
                                aria-hidden="true"
                              >
                                {rule.passed ? <CheckIcon /> : null}
                              </span>
                              {rule.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Field>

                    {/* Confirm password */}
                    <Field
                      id="confirmPassword"
                      label="Confirm password"
                      icon={<LockIcon />}
                      error={fieldErrors.confirmPassword}
                      touched={touched.confirmPassword}
                    >
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onBlur={() =>
                            setTouched((t) => ({ ...t, confirmPassword: true }))
                          }
                          placeholder="Repeat your password"
                          required
                          aria-invalid={passwordsMismatch}
                          aria-describedby="confirm-status"
                          className={`${inputClass(passwordsMismatch)} pr-16`}
                        />
                        <VisibilityToggle
                          shown={showConfirmPassword}
                          onToggle={() => setShowConfirmPassword((s) => !s)}
                          label={
                            showConfirmPassword
                              ? "Hide confirmation password"
                              : "Show confirmation password"
                          }
                        />
                      </div>

                      <div id="confirm-status" className="min-h-[18px]">
                        {passwordsMatch && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                            <CheckIcon />
                            Passwords match
                          </div>
                        )}
                        {passwordsMismatch && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                            <AlertIcon />
                            Passwords don&apos;t match yet
                          </div>
                        )}
                      </div>
                    </Field>

                    {/* Terms */}
                    <label
                      className={`signup-field flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs leading-5 transition ${
                        touched.agreed && !agreed
                          ? "border-rose-400/50 bg-rose-500/[0.04] text-rose-700"
                          : "border-black/[0.05] bg-white/50 text-black/45 hover:bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => {
                          setAgreed(e.target.checked);
                          setTouched((t) => ({ ...t, agreed: true }));
                        }}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-black"
                      />
                      <span>
                        I agree to the{" "}
                        <LegalLink kind="terms" />
                        {" "}and{" "}
                        <LegalLink kind="privacy" />
                        .
                      </span>
                    </label>

                    {/* Submit */}
                    <button
                      ref={buttonRef}
                      type="submit"
                      disabled={submitDisabled}
                      onMouseEnter={handleButtonEnter}
                      onMouseLeave={handleButtonLeave}
                      className="signup-field flex min-h-[58px] w-full items-center justify-center rounded-xl bg-black px-5 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(0,0,0,0.16)] transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2.5">
                          <Spinner />
                          Creating account…
                        </span>
                      ) : cooldownLeft > 0 ? (
                        <span>Try again in {cooldownLeft}s</span>
                      ) : (
                        <span className="flex items-center gap-2.5">
                          Create account
                          <ArrowIcon />
                        </span>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-black/35">
                      We&apos;ll send a verification link to your email.
                    </p>
                  </form>

                  <p className="signup-field mt-7 text-center text-sm text-black/40">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-black transition hover:text-blue-600"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </div>

              <p className="signup-field mt-6 text-center text-xs font-medium tracking-wide text-black/30">
                Your time is valuable — use it intentionally
              </p>
            </>
          ) : (
            /* ═══ VERIFY STAGE ═══ */
            <div
              ref={cardRef}
              className="rounded-[30px] border border-black/[0.07] bg-[#F7F7F5] p-7 text-center shadow-[0_35px_100px_rgba(0,0,0,0.09)] sm:rounded-[34px] sm:p-10"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-600">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </div>

              <h1
                ref={verifyHeadingRef}
                tabIndex={-1}
                className="text-2xl font-semibold tracking-[-0.04em] text-black outline-none sm:text-3xl"
              >
                Check your inbox
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/50">
                We sent a verification link to{" "}
                <span className="font-semibold text-black">{email}</span>. Click it
                to activate your account.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendIn > 0}
                  className="min-h-[52px] w-full rounded-xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {resendIn > 0
                    ? `Resend in ${resendIn}s`
                    : "Resend verification email"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStage("form");
                    setFormError("");
                  }}
                  className="min-h-[52px] w-full rounded-xl border border-black/[0.08] bg-white px-5 text-sm font-semibold text-black/60 transition hover:border-black/[0.16] hover:text-black"
                >
                  Wrong email? Start over
                </button>

                <Link
                  href="/login"
                  className="mt-2 text-xs font-semibold text-black/40 transition hover:text-black"
                >
                  Back to log in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════ */

function Field({
  id, label, icon, error, touched, trailing, children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  touched?: boolean;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="signup-field">
      <div className="mb-2 flex items-center justify-between gap-2">
        <label htmlFor={id} className="block text-sm font-semibold text-black/60">
          {label}
        </label>
        {trailing}
      </div>
      <div className="relative">
        {icon}
        {children}
      </div>
      {touched && error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}

function VisibilityToggle({
  shown, onToggle, label,
}: { shown: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={shown}
      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-black/35 transition hover:bg-black/[0.04] hover:text-black"
    >
      {shown ? "Hide" : "Show"}
    </button>
  );
}

function EmailStatusBadge({ status }: { status: EmailStatus }) {
  if (status === "checking") {
    return (
      <span className="flex items-center gap-1.5 text-[11px] font-medium text-black/40">
        <span className="h-3 w-3 animate-spin rounded-full border border-black/20 border-t-black/60" />
        Checking…
      </span>
    );
  }
  if (status === "available") {
    return (
      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
        <CheckIcon /> Available
      </span>
    );
  }
  if (status === "taken") {
    return (
      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-500">
        <AlertIcon /> Already in use
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="text-[11px] font-medium text-black/35">
        Couldn&apos;t verify
      </span>
    );
  }
  return null;
}

/* Legal modals with real content, opened inline instead of broken links */
function LegalLink({ kind }: { kind: "terms" | "privacy" }) {
  const [open, setOpen] = useState(false);
  const label = kind === "terms" ? "Terms of Service" : "Privacy Policy";

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="font-semibold text-black/70 underline-offset-2 hover:text-black hover:underline"
      >
        {label}
      </button>

      {open && (
        <LegalModal kind={kind} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

function LegalModal({
  kind, onClose,
}: { kind: "terms" | "privacy"; onClose: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const title = kind === "terms" ? "Terms of Service" : "Privacy Policy";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-h-[80vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-4">
          <h2
            id="legal-title"
            ref={headingRef}
            tabIndex={-1}
            className="text-base font-semibold text-black outline-none"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-black/40 transition hover:bg-black/[0.05] hover:text-black"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5 text-sm leading-6 text-black/60">
          {kind === "terms" ? <TermsContent /> : <PrivacyContent />}
        </div>

        <div className="border-t border-black/[0.06] px-6 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function TermsContent() {
  return (
    <>
      <p>
        By creating a TimePilot account you agree to use the service in
        accordance with these terms. You are responsible for maintaining the
        confidentiality of your credentials and for all activity that occurs
        under your account.
      </p>
      <h3 className="mt-4 font-semibold text-black">1. Acceptable use</h3>
      <p>
        You agree not to misuse the service, attempt to access it by any
        method other than the interface we provide, or use it to violate any
        law or the rights of others.
      </p>
      <h3 className="mt-4 font-semibold text-black">2. Your content</h3>
      <p>
        You retain ownership of the data you submit. We only process it to
        provide and improve the service, as described in the Privacy Policy.
      </p>
      <h3 className="mt-4 font-semibold text-black">3. Termination</h3>
      <p>
        You may close your account at any time. We may suspend accounts that
        violate these terms.
      </p>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <p>
        We collect the minimum information needed to run TimePilot: your
        name, email address, and the content you create inside the app.
      </p>
      <h3 className="mt-4 font-semibold text-black">What we don&apos;t do</h3>
      <p>
        We don&apos;t sell your data, and we don&apos;t share it with
        advertisers. We don&apos;t use your tasks or notes to train third-party
        models.
      </p>
      <h3 className="mt-4 font-semibold text-black">Security</h3>
      <p>
        Passwords are hashed with a modern algorithm. Sessions are
        transmitted over TLS. You can enable two-factor authentication from
        your account settings.
      </p>
      <h3 className="mt-4 font-semibold text-black">Your rights</h3>
      <p>
        You can export or permanently delete your data from your account at
        any time.
      </p>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════ */

function inputClass(invalid: boolean) {
  return `min-h-[54px] w-full rounded-xl border bg-white py-3 pl-11 text-sm text-black outline-none transition-all duration-200 placeholder:text-black/25 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.025)] ${
    invalid
      ? "border-rose-400/60 focus:border-rose-400"
      : "border-black/[0.08] focus:border-black/[0.22]"
  }`;
}

/* ═══════════════════════════════════════════════
   Analog clock
═══════════════════════════════════════════════ */

function AnalogClock({ time }: { time: Date }) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black"
      aria-hidden="true"
    >
      <div className="relative h-6 w-6">
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-0 h-[3px] w-[1px] -translate-x-1/2 bg-white/25"
            style={{ transform: `rotate(${deg}deg) translateY(0px)` }}
          />
        ))}
        <span
          className="absolute bottom-1/2 left-1/2 h-[6px] w-[1.6px] origin-bottom -translate-x-1/2 rounded-full bg-white"
          style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
        />
        <span
          className="absolute bottom-1/2 left-1/2 h-[9px] w-[1.3px] origin-bottom -translate-x-1/2 rounded-full bg-white/85"
          style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}
        />
        <span
          className="absolute bottom-1/2 left-1/2 h-[10px] w-[1px] origin-bottom -translate-x-1/2 rounded-full bg-[#F5A623] transition-transform duration-200 ease-linear"
          style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }}
        />
        <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Icons
═══════════════════════════════════════════════ */

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />
  );
}

function UserIcon() {
  return (
    <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5" />
      <path d="M12 16.5h.01" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.27-2.09 3.59-5.17 3.59-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.27a12 12 0 0 0 0 10.75l4-3.11Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.63l4 3.1C6.22 6.87 8.87 4.75 12 4.75Z" />
    </svg>
  );
}