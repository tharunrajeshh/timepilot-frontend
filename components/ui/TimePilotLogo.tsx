"use client";

import Link from "next/link";

type TimePilotLogoProps = {
  variant?: "dark" | "light";
  href?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function TimePilotLogo({
  variant = "dark",
  href = "/",
  showText = true,
  size = "md",
}: TimePilotLogoProps) {
  const sizes = {
    sm: {
      mark: "h-8 w-8",
      text: "text-[15px]",
    },
    md: {
      mark: "h-10 w-10",
      text: "text-[17px]",
    },
    lg: {
      mark: "h-12 w-12",
      text: "text-[20px]",
    },
  };

  const isLight = variant === "light";

  return (
    <Link
      href={href}
      aria-label="TimePilot"
      className="group inline-flex items-center gap-3"
    >
      <span
        className={[
          "relative flex shrink-0 items-center justify-center",
          "rounded-[13px] transition-transform duration-200",
          "group-hover:-translate-y-0.5",
          sizes[size].mark,
          isLight
            ? "bg-white text-[#0A1422]"
            : "bg-[#0A1422] text-white",
        ].join(" ")}
      >
        {/* Orbit */}
        <span
          className={[
            "absolute inset-[5px] rounded-full border",
            isLight
              ? "border-[#0A1422]/20"
              : "border-white/20",
          ].join(" ")}
        />

        {/* T */}
        <span
          className={[
            "relative z-10 font-semibold tracking-[-0.06em]",
            size === "sm"
              ? "text-[16px]"
              : size === "md"
                ? "text-[19px]"
                : "text-[22px]",
          ].join(" ")}
        >
          T
        </span>

        {/* Orbit point */}
        <span
          className={[
            "absolute right-[5px] top-[5px] h-1.5 w-1.5 rounded-full",
            isLight
              ? "bg-[#C49A61]"
              : "bg-[#C49A61]",
          ].join(" ")}
        />
      </span>

      {showText && (
        <span
          className={[
            "font-semibold tracking-[-0.025em]",
            sizes[size].text,
            isLight ? "text-white" : "text-[#0D1420]",
          ].join(" ")}
        >
          TimePilot
        </span>
      )}
    </Link>
  );
}