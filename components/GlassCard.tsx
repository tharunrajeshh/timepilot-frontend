"use client";

import type { HTMLAttributes, ReactNode } from "react";

/* ================================================================
   TYPES
================================================================ */

/** Allows <GlassCard as="article"> for task cards, <GlassCard as="section"> for panels. */
type GlassCardTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "main";

type GlassCardProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className"
> & {
  children: ReactNode;
  className?: string;
  as?: GlassCardTag;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  /** `inset` for nested cards inside another GlassCard. */
  variant?: "default" | "solid" | "inset";
};

/* ================================================================
   CONSTANTS
================================================================ */

const PADDING = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6 md:p-7",
} satisfies Record<GlassCardProps["padding"], string>;

const SURFACE = {
  default:
    "bg-white/[0.82] backdrop-blur-[28px] backdrop-saturate-150 border-black/[0.07] shadow-[0_12px_45px_rgba(0,0,0,0.06)]",
  solid:
    "bg-white border-black/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.08)]",
  inset:
    "bg-black/[0.02] backdrop-blur-none border-black/[0.05] shadow-none",
} satisfies Record<GlassCardProps["variant"], string>;

/* ================================================================
   COMPONENT
================================================================ */

export default function GlassCard({
  children,
  className = "",
  hover = false,
  padding = "md",
  variant = "default",
  as = "div",
  ...props
}: GlassCardProps) {
  const Tag = as as React.ElementType;

  return (
    <Tag
      className={`
        relative overflow-hidden rounded-[24px] border
        ${SURFACE[variant]}
        ${
          hover
            ? // `motion-safe:` respects prefers-reduced-motion without JS.
              // Explicit transition list avoids transitioning padding/colors.
              "motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
            : ""
        }
        ${PADDING[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
}