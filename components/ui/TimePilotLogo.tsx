import Link from "next/link";

type Variant = "light" | "dark";
type Size = "sm" | "md" | "lg";

const sizes: Record<
  Size,
  { box: number; letter: number; wordmark: string; gap: string }
> = {
  sm: { box: 28, letter: 12, wordmark: "text-[15px]", gap: "gap-2" },
  md: { box: 36, letter: 14, wordmark: "text-[17px]", gap: "gap-2.5" },
  lg: { box: 44, letter: 17, wordmark: "text-[20px]", gap: "gap-3" },
};

export default function TimePilotLogo({
  variant = "dark",
  size = "md",
  href = "/",
  withWordmark = true,
}: {
  variant?: Variant;
  size?: Size;
  href?: string;
  withWordmark?: boolean;
}) {
  const s = sizes[size];
  const isLight = variant === "light";

  const boxBg = isLight ? "bg-[#f6f4ee]" : "bg-[#0a1422]";
  const letterColor = isLight ? "text-[#0a1422]" : "text-[#f6f4ee]";
  const wordColor = isLight ? "text-[#f6f4ee]" : "text-[#0d1420]";
  const orbitColor = isLight ? "rgba(246,244,238,0.35)" : "rgba(196,154,97,0.5)";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center ${s.gap}`}
      aria-label="TimePilot home"
    >
      <span
        className={`relative inline-flex shrink-0 items-center justify-center rounded-[10px] ${boxBg} ${letterColor} font-semibold transition-transform duration-300 group-hover:scale-[1.04]`}
        style={{ width: s.box, height: s.box, fontSize: s.letter }}
      >
        T
        <svg
          className="pointer-events-none absolute -inset-[3px]"
          viewBox="0 0 40 40"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke={orbitColor}
            strokeWidth="1"
            strokeDasharray="30 80"
            strokeLinecap="round"
            transform="rotate(-35 20 20)"
          />
        </svg>
      </span>

      {withWordmark && (
        <span
          className={`${s.wordmark} font-medium tracking-[-0.02em] ${wordColor}`}
        >
          TimePilot
        </span>
      )}
    </Link>
  );
}