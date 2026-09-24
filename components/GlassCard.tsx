"use client";

import type { HTMLAttributes, ReactNode } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

export default function GlassCard({
  children,
  className = "",
  hover = false,
  padding = "md",
  ...props
}: GlassCardProps) {
  const paddingClass = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-6 md:p-7",
  }[padding];

  return (
    <div
      className={`
        relative overflow-hidden rounded-[24px]
        border border-black/[0.07]
        bg-white/[0.82]
        backdrop-blur-[28px]
        backdrop-saturate-150
        shadow-[0_12px_45px_rgba(0,0,0,0.06)]
        ${
          hover
            ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
            : ""
        }
        ${paddingClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}