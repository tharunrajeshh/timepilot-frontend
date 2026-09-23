import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[12px] font-medium tracking-[-0.01em] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.985]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#0a1422] text-[#f6f4ee] hover:bg-[#111f31] shadow-[0_8px_24px_rgba(13,20,32,0.16)]",
  secondary:
    "bg-[#fffdf8] text-[#0d1420] border border-[rgba(13,20,32,0.14)] hover:border-[rgba(13,20,32,0.28)] hover:bg-white",
  ghost:
    "bg-transparent text-[#0d1420] hover:bg-[rgba(13,20,32,0.05)]",
  danger:
    "bg-[#c75b5b] text-white hover:bg-[#b34f4f]",
};

const sizes: Record<Size, string> = {
  sm: "h-[38px] px-4 text-[13px]",
  md: "h-[46px] px-5 text-[14px]",
  lg: "h-[54px] px-6 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    children,
    className = "",
    fullWidth = false,
  } = props;

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, children: _c, className: _cn, fullWidth: _fw, ...rest } =
    props as ButtonAsButton;

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}