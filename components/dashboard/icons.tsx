"use client";

import {
  forwardRef,
  memo,
  useId,
  type SVGProps,
} from "react";

/* ================================================================
   SHARED TYPES
================================================================ */

type IconProps = {
  /** Rendered width and height in pixels. Default 16. */
  size?: number;
  /** Accessible label. When omitted the icon is treated as decorative. */
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "title">;

/* ================================================================
   BASE
================================================================ */

/**
 * Every icon shares this shell so sizing, a11y, and ref forwarding
 * are handled in exactly one place.
 */
const IconBase = forwardRef<SVGSVGElement, IconProps & { children: React.ReactNode }>(
  function IconBase(
    { size = 16, title, children, ...rest },
    ref
  ) {
    const id = useId();
    const labelled = Boolean(title);

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role={labelled ? "img" : "presentation"}
        aria-hidden={labelled ? undefined : true}
        aria-labelledby={labelled ? id : undefined}
        focusable="false"
        {...rest}
      >
        {labelled && <title id={id}>{title}</title>}
        {children}
      </svg>
    );
  }
);

/* ================================================================
   ICONS
================================================================ */

export const ClockIcon = memo(
  forwardRef<SVGSVGElement, IconProps & { color?: string; accent?: string }>(
    function ClockIcon(
      { color = "#D4AF37", accent = "#FFE08A", ...rest },
      ref
    ) {
      return (
        <IconBase ref={ref} {...rest}>
          <circle
            cx="9"
            cy="9"
            r="7"
            stroke={color}
            strokeWidth="1.3"
          />
          <path
            d="M9 5V9L11.5 10.5"
            stroke={accent}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </IconBase>
      );
    }
  )
);

export const MenuIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(function MenuIcon(props, ref) {
    return (
      <IconBase ref={ref} {...props}>
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </IconBase>
    );
  })
);

export const SearchIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(function SearchIcon(props, ref) {
    return (
      <IconBase ref={ref} {...props}>
        <circle
          cx="11"
          cy="11"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="m16 16 4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </IconBase>
    );
  })
);

export const SparkIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(function SparkIcon(props, ref) {
    return (
      <IconBase ref={ref} {...props}>
        <path
          d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </IconBase>
    );
  })
);

/* ================================================================
   NAV ICON — typed union, exhaustive switch
================================================================ */

export type NavIconName = "overview" | "tasks" | "schedule" | "ai";

type NavIconProps = IconProps & { icon: NavIconName };

export const NavIcon = memo(
  forwardRef<SVGSVGElement, NavIconProps>(function NavIcon(
    { icon, ...rest },
    ref
  ) {
    switch (icon) {
      case "tasks":
        return (
          <IconBase ref={ref} {...rest}>
            <path
              d="M5 7h14M5 12h14M5 17h9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </IconBase>
        );

      case "schedule":
        return (
          <IconBase ref={ref} {...rest}>
            <circle
              cx="12"
              cy="12"
              r="8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 8v4l3 2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </IconBase>
        );

      case "ai":
        return (
          <IconBase ref={ref} {...rest}>
            <path
              d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </IconBase>
        );

      case "overview":
      default:
        return (
          <IconBase ref={ref} {...rest}>
            <rect
              x="4"
              y="4"
              width="6"
              height="6"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="14"
              y="4"
              width="6"
              height="6"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="4"
              y="14"
              width="6"
              height="6"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M14 17h6M17 14v6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </IconBase>
        );
    }
  })
);  