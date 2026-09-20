"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Status =
  | "checking"
  | "success"
  | "error"
  | "missing";

function VerifyEmailContent() {
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<Status>("checking");
  const [message, setMessage] = useState(
    "Verifying your email..."
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("missing");
      setMessage(
        "The email verification link is missing or invalid."
      );
      return;
    }

    const verifyEmail = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:8000";

        const response = await fetch(
          `${apiUrl}/auth/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
            }),
          }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.detail ||
              data?.message ||
              "Email verification failed."
          );
        }

        setStatus("success");
        setMessage(
          data?.message ||
            "Your email has been verified successfully."
        );
      } catch (error) {
        console.error(
          "Email verification error:",
          error
        );

        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to verify your email."
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090B] px-5 text-white">
      <div className="w-full max-w-md">

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-xl">

          {/* Logo */}

          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-black">
            T
          </div>

          {/* Checking */}

          {status === "checking" && (
            <>
              <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />

              <h1 className="text-2xl font-semibold">
                Verifying your email
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/55">
                Please wait while we verify your
                email address.
              </p>
            </>
          )}

          {/* Success */}

          {status === "success" && (
            <>
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-400">
                ✓
              </div>

              <h1 className="text-2xl font-semibold">
                Email verified
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/55">
                {message}
              </p>

              <Link
                href="/login"
                className="
                  mt-8
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  px-7
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:bg-white/90
                "
              >
                Continue to login
              </Link>
            </>
          )}

          {/* Error */}

          {status === "error" && (
            <>
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-2xl text-red-400">
                !
              </div>

              <h1 className="text-2xl font-semibold">
                Verification failed
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/55">
                {message}
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="
                    flex
                    h-12
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-sm
                    font-semibold
                    text-black
                    transition
                    hover:bg-white/90
                  "
                >
                  Go to login
                </Link>

                <Link
                  href="/signup"
                  className="
                    flex
                    h-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/[0.04]
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-white/[0.08]
                  "
                >
                  Back to signup
                </Link>
              </div>
            </>
          )}

          {/* Missing token */}

          {status === "missing" && (
            <>
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-2xl text-amber-400">
                !
              </div>

              <h1 className="text-2xl font-semibold">
                Invalid verification link
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/55">
                {message}
              </p>

              <Link
                href="/login"
                className="
                  mt-8
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  px-7
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:bg-white/90
                "
              >
                Go to login
              </Link>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          TimePilot · Take control of your time.
        </p>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#08090B] text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}