"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/layout/AuthShell";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import OrbitalClockVisual from "@/components/auth/OrbitalClockVisual";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    if (loading) return;
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Please enter your email address.");
    if (!password) return setError("Please enter your password.");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const text = await res.text();
      let data: {
        detail?: string | Array<{ msg?: string } | string>;
        access_token?: string;
        user_id?: string;
        name?: string;
        email?: string;
      } = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = { detail: text };
        }
      }

      if (!res.ok) {
        const detail = Array.isArray(data?.detail)
          ? data.detail
              .map((i) =>
                typeof i === "string" ? i : i?.msg ?? String(i),
              )
              .join(", ")
          : data?.detail;
        setError(
          typeof detail === "string" && detail
            ? detail
            : "Invalid email or password.",
        );
        return;
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      const other = rememberMe ? sessionStorage : localStorage;
      other.removeItem("timepilot_token");
      other.removeItem("timepilot_user");

      if (data.access_token) storage.setItem("timepilot_token", data.access_token);
      storage.setItem(
        "timepilot_user",
        JSON.stringify({
          id: data.user_id,
          name: data.name,
          email: data.email,
        }),
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="WELCOME BACK"
      title="Take control of your time."
      subtitle="Sign in to continue planning your day with intention."
      visual={<OrbitalClockVisual />}
      footer={
        <>
          New to TimePilot?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#0d1420] hover:text-[#c49a61]"
          >
            Create an account
          </Link>
        </>
      }
    >
      <div
        className="rounded-[20px] border border-[rgba(13,20,32,0.08)] bg-[#fffdf8] p-6 sm:p-8"
        style={{ boxShadow: "0 24px 70px rgba(13,20,32,0.08)" }}
      >
        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex h-[46px] w-full items-center justify-center gap-3 rounded-[12px] border border-[rgba(13,20,32,0.14)] bg-white text-[14px] font-medium text-[#0d1420] transition-all duration-200 hover:border-[rgba(13,20,32,0.24)] hover:bg-[#f6f4ee] disabled:opacity-50"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[rgba(13,20,32,0.08)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#707a89]">
            or
          </span>
          <div className="h-px flex-1 bg-[rgba(13,20,32,0.08)]" />
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-5 rounded-[12px] border border-[rgba(199,91,91,0.25)] bg-[rgba(199,91,91,0.06)] px-4 py-3 text-[13px] leading-5 text-[#c75b5b]"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="rounded-lg px-2 py-1 text-[12px] font-medium text-[#707a89] transition-colors hover:bg-[rgba(13,20,32,0.05)] hover:text-[#0d1420]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-[#344052]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-[rgba(13,20,32,0.2)] accent-[#0a1422]"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-[13px] font-medium text-[#707a89] transition-colors hover:text-[#0d1420]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? "Signing in…" : "Log in"}
            </Button>
          </div>
        </form>
      </div>

      <p className="mt-5 text-center text-[12px] text-[#707a89]">
        Secured with industry-standard encryption.
      </p>
    </AuthShell>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.27-2.09 3.59-5.17 3.59-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.27a12 12 0 0 0 0 10.75l4-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.63l4 3.1C6.22 6.87 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}