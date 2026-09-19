"use client"

import * as React from "react"
import {
  DayPicker,
  type DayButton,
  type Locale,
} from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  locale?: Partial<Locale>
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  locale,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      locale={locale}
      className={className}
      classNames={{
        months: "flex flex-col",
        month: "space-y-4",
        month_caption:
          "flex items-center justify-between px-2 pt-1",
        caption_label:
          "text-sm font-semibold text-white",
        nav: "flex items-center gap-1",
        button_previous:
          "inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white",
        button_next:
          "inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 text-center text-[11px] font-medium uppercase tracking-wider text-white/35",
        week: "mt-1 flex w-full",
        day: "relative h-9 w-9 p-0 text-center text-sm",
        day_button:
          "h-9 w-9 rounded-lg font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white",
        today:
          "text-[#F5A623] font-bold",
        selected:
          "bg-[#F5A623] text-black shadow-[0_0_18px_rgba(245,166,35,0.35)] hover:bg-[#F5A623] hover:text-black",
        outside:
          "text-white/20",
        disabled:
          "text-white/10",
        hidden:
          "invisible",
        range_start:
          "rounded-l-lg bg-[#F5A623]/20",
        range_middle:
          "bg-[#F5A623]/20 text-white",
        range_end:
          "rounded-r-lg bg-[#F5A623]/20",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
        DayButton: CalendarDayButton,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus()
    }
  }, [modifiers.focused])

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected={modifiers.selected || undefined}
      data-today={modifiers.today || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      className={className}
      {...props}
    />
  )
}

export { Calendar }