"use client";

import { forwardRef, memo, useId, type ReactNode, type SVGProps } from "react";

/* ================================================================
   SHARED TYPES
================================================================ */

type IconProps = {
  /** Rendered width and height in pixels. Default 16. */
  size?: number;
  /** Accessible label. When omitted the icon is decorative. */
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "title">;

/* ================================================================
   BASE
================================================================ */

const IconBase = forwardRef<
  SVGSVGElement,
  IconProps & { children: ReactNode }
>(function IconBase({ size = 16, title, children, ...rest }, ref) {
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
      // role="img" + aria-labelledby is the standard labelled-icon pattern.
      // When unlabelled, aria-hidden suffices — role="presentation" is
      // redundant on an element that already carries aria-hidden.
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      aria-labelledby={labelled ? id : undefined}
      focusable="false"
      {...rest}
    >
      {labelled && <title id={id}>{title}</title>}
      {children}
    </svg>
  );
});

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
          {/* Centered in the 24×24 viewBox — the previous (9,9) r=7 sat in
              the top-left quadrant. */}
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.3" />
          <path
            d="M12 7v5l3.5 2"
            stroke={accent}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
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
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
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
          strokeLinejoin="round"
        />
      </IconBase>
    );
  })
);

export const ChevronLeftIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(function ChevronLeftIcon(props, ref) {
    return (
      <IconBase ref={ref} {...props}>
        <path
          d="m14 6-6 6 6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </IconBase>
    );
  })
);

export const CloseIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(function CloseIcon(props, ref) {
    return (
      <IconBase ref={ref} {...props}>
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </IconBase>
    );
  })
);

export const PlusIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(function PlusIcon(props, ref) {
    return (
      <IconBase ref={ref} {...props}>
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </IconBase>
    );
  })
);

/* ================================================================
   NAV ICON
================================================================ */

/**
 * Kept aligned with `DashboardSection` — accepts both naming conventions
 * so call sites don't have to map between `"ai"` and `"assistant"`.
 */
export type NavIconName =
  | "overview"
  | "tasks"
  | "schedule"
  | "ai"
  | "assistant";

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
              d="M4.5 7.5 6 9l3-3.5M4.5 15 6 16.5l3-3.5M12 7.5h7.5M12 15h7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </IconBase>
        );

      case "schedule":
        return (
          <IconBase ref={ref} {...rest}>
            <rect
              x="3.5"
              y="5"
              width="17"
              height="15.5"
              rx="2.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M3.5 10h17M8 3v4M16 3v4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </IconBase>
        );

      case "ai":
      case "assistant":
        return (
          <IconBase ref={ref} {...rest}>
            <path
              d="M11 3.5 12.6 8 17 9.5 12.6 11 11 15.5 9.4 11 5 9.5 9.4 8 11 3.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 14.5 18.3 16.7 20.5 17.5 18.3 18.3 17.5 20.5 16.7 18.3 14.5 17.5 16.7 16.7 17.5 14.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
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
              width="6.5"
              height="6.5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="13.5"
              y="4"
              width="6.5"
              height="6.5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="4"
              y="13.5"
              width="6.5"
              height="6.5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M13.5 17h6.5M16.75 13.75v6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </IconBase>
        );
    }
  })
);