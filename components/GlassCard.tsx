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
   CONSTANTS
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

const HOVER_CLASS =
  "motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]";

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
  const classes = [
    "relative overflow-hidden rounded-[24px] border",
    SURFACE[variant],
    hover ? HOVER_CLASS : "",
    PADDING[padding],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Every JSX tag is a literal so TypeScript never has to resolve a
  // dynamic component reference. Do NOT refactor this into a variable.
  switch (tag) {
    case "section":
      return (
        <section className={classes} {...props}>
          {children}
        </section>
      );
    case "article":
      return (
        <article className={classes} {...props}>
          {children}
        </article>
      );
    case "aside":
      return (
        <aside className={classes} {...props}>
          {children}
        </aside>
      );
    case "header":
      return (
        <header className={classes} {...props}>
          {children}
        </header>
      );
    case "footer":
      return (
        <footer className={classes} {...props}>
          {children}
        </footer>
      );
    case "nav":
      return (
        <nav className={classes} {...props}>
          {children}
        </nav>
      );
    case "main":
      return (
        <main className={classes} {...props}>
          {children}
        </main>
      );
    case "div":
    default:
      return (
        <div className={classes} {...props}>
          {children}
        </div>
      );
  }
}