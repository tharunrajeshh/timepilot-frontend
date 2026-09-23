import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
  leading?: ReactNode;
};

const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, hint, error, trailing, leading, className = "", id, ...rest },
  ref,
) {
  const inputId = id || rest.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-[13px] font-medium text-[#344052]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leading && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#707a89]">
            {leading}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`h-[50px] w-full rounded-[12px] border bg-white px-4 text-[14px] text-[#0d1420] outline-none transition-all duration-200 placeholder:text-[#707a89]/60 ${
            leading ? "pl-10" : ""
          } ${trailing ? "pr-12" : ""} ${
            error
              ? "border-[#c75b5b]/50 focus:border-[#c75b5b] focus:ring-4 focus:ring-[#c75b5b]/10"
              : "border-[rgba(13,20,32,0.14)] focus:border-[#c49a61] focus:ring-4 focus:ring-[#c49a61]/15"
          } ${className}`}
          aria-invalid={Boolean(error)}
          {...rest}
        />

        {trailing && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            {trailing}
          </span>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-[12px] text-[#c75b5b]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[12px] text-[#707a89]">{hint}</p>
      ) : null}
    </div>
  );
});

export default TextField;