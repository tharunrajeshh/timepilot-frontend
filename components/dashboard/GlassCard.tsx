"use client";

import type { HTMLAttributes, ReactNode } from "react";

/* ================================================================
   TYPES
================================================================ */

type GlassCardTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "main";

type Padding = "none" | "sm" | "md" | "lg";
type Variant = "default" | "solid" | "inset";

type GlassCardProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className"
> & {
  children: ReactNode;
  className?: string;
  /** Renders as a different semantic element. Defaults to "div". */
  tag?: GlassCardTag;
  hover?: boolean;
  padding?: Padding;
  /** `inset` for cards nested inside another GlassCard. */
  variant?: Variant;
};

/* ================================================================
   CONSTANTS — plain Record, no `satisfies` against the optional prop type
================================================================ */

const PADDING: Record<Padding, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6 md:p-7",
};

const SURFACE: Record<Variant, string> = {
  default:
    "bg-white/[0.82] backdrop-blur-[28px] backdrop-saturate-150 border-black/[0.07] shadow-[0_12px_45px_rgba(0,0,0,0.06)]",
  solid:
    "bg-white border-black/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.08)]",
  inset:
    "bg-black/[0.02] backdrop-blur-none border-black/[0.05] shadow-none",
};

/* ================================================================
   COMPONENT
================================================================ */

export default function GlassCard({
  children,
  className = "",
  hover = false,
  padding = "md",
  variant = "default",
  tag = "div",
  ...props
}: GlassCardProps) {
  // Narrow string-literal union — TS resolves JSX correctly (unlike ElementType).
  const Tag = tag;

  return (
    <Tag
      className={`
        relative overflow-hidden rounded-[24px] border
        ${SURFACE[variant]}
        ${
          hover
            ? "motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
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