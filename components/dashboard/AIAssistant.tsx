"use client";

import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import GlassCard from "./GlassCard";

/* ================================================================
   TYPES
================================================================ */

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AIAssistantProps = {
  messages: ChatMessage[];
  loading?: boolean;
  onSend: (message: string) => Promise<void> | void;
  onPlanDay?: () => Promise<void> | void;
  planning?: boolean;
};

/* ================================================================
   CONSTANTS
================================================================ */

const MAX_MESSAGE_LEN = 2000;
const MAX_TEXTAREA_HEIGHT = 160;
const SCROLL_THRESHOLD_PX = 80;

const STARTER_SUGGESTIONS = [
  { label: "Plan my day", action: "plan" as const },
  { label: "What should I focus on first?", action: "send" as const },
  { label: "Help me organize my tasks", action: "send" as const },
  { label: "How can I improve my productivity?", action: "send" as const },
];

const SIDE_SUGGESTIONS = [
  "Which task should I do first?",
  "Give me a realistic schedule.",
  "I have 2 hours. What should I work on?",
  "Help me finish my highest priority tasks.",
];

/* ================================================================
   HELPERS
================================================================ */

/**
 * Defense-in-depth: the parent already sanitizes, but a component
 * that renders untrusted model output should still enforce its own
 * bounds before placing text into the DOM.
 */
function sanitizeMessage(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const cleaned = input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function formatTime(index: number): string {
  return new Date(Date.now() - index * 0).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/* ================================================================
   MESSAGE BUBBLE (memoized — the list never re-renders on keystroke)
================================================================ */

type BubbleProps = {
  role: "user" | "assistant";
  content: string;
  onCopy: (text: string) => void;
};

const MessageBubble = memo(function MessageBubble({
  role,
  content,
  onCopy,
}: BubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`group flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className="flex max-w-[85%] flex-col items-start gap-1">
        <div
          className={`
            whitespace-pre-wrap break-words
            rounded-2xl px-4 py-3
            text-sm leading-6
            ${
              isUser
                ? "rounded-br-md bg-black text-white"
                : "rounded-bl-md bg-black/[0.04] text-black/70"
            }
          `}
        >
          {content}
        </div>

        {!isUser && content.length > 0 && (
          <button
            type="button"
            onClick={() => onCopy(content)}
            className="
              ml-1 rounded-md px-1.5 py-0.5
              text-[10px] font-medium text-black/30
              opacity-0 transition
              group-hover:opacity-100
              focus-visible:opacity-100
              hover:text-black/60
            "
            aria-label="Copy message"
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
});

/* ================================================================
   TEXTAREA (forwardRef so the parent can focus it after send)
================================================================ */

type ComposerProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  sending: boolean;
};

const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(
  function Composer({ value, onChange, onSubmit, disabled, sending }, ref) {
    const rows = useMemo(() => {
      const lines = value.split("\n").length;
      return Math.min(Math.max(lines, 1), 8);
    }, [value]);

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="
          flex items-end gap-2
          rounded-2xl
          border border-black/[0.08]
          bg-black/[0.025]
          p-2
          transition
          focus-within:border-emerald-500/30
          focus-within:bg-white
        "
      >
        <label htmlFor="ai-composer" className="sr-only">
          Ask TimePilot AI
        </label>

        <textarea
          id="ai-composer"
          ref={ref}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
          rows={rows}
          maxLength={MAX_MESSAGE_LEN}
          disabled={disabled}
          placeholder="Ask TimePilot anything..."
          className="
            min-h-11 flex-1 resize-none
            bg-transparent px-2 py-2.5
            text-sm text-black
            outline-none
            placeholder:text-black/30
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          style={{ maxHeight: MAX_TEXTAREA_HEIGHT }}
          autoComplete="off"
          spellCheck
        />

        <button
          type="submit"
          disabled={!value.trim() || disabled || sending}
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-xl
            bg-black text-white
            transition
            hover:-translate-y-0.5
            disabled:cursor-not-allowed
            disabled:opacity-30
            disabled:hover:translate-y-0
          "
          aria-label={sending ? "Sending message" : "Send message"}
        >
          {sending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            "↑"
          )}
        </button>
      </form>
    );
  }
);

/* ================================================================
   MAIN COMPONENT
================================================================ */

export default function AIAssistant({
  messages,
  loading = false,
  onSend,
  onPlanDay,
  planning = false,
}: AIAssistantProps) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showJump, setShowJump] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const aliveRef = useRef(true);

  const busy = loading || planning;
  const remaining = MAX_MESSAGE_LEN - input.length;
  const nearLimit = remaining <= 200;

  /* ---------- lifecycle ---------- */

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  /* ---------- auto-scroll ---------- */

  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    return (
      el.scrollHeight - el.scrollTop - el.clientHeight <
      SCROLL_THRESHOLD_PX
    );
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    setShowJump(false);
  }, []);

  useLayoutEffect(() => {
    if (isNearBottom()) scrollToBottom("auto");
    else setShowJump(true);
  }, [messages, loading, isNearBottom, scrollToBottom]);

  /* ---------- submit ---------- */

  const submit = useCallback(
    async (value?: string) => {
      const raw = value ?? input;
      const clean = sanitizeMessage(raw, MAX_MESSAGE_LEN).trim();

      if (!clean || busy) return;

      setInput("");
      setShowJump(false);

      try {
        await onSend(clean);
      } finally {
        if (aliveRef.current) {
          // Return focus to the composer so the user can keep typing.
          composerRef.current?.focus();
        }
      }
    },
    [busy, input, onSend]
  );

  /* ---------- copy ---------- */

  const handleCopy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Legacy fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      if (!aliveRef.current) return;
      setCopied(true);
      window.setTimeout(() => {
        if (aliveRef.current) setCopied(false);
      }, 1500);
    } catch {
      /* Clipboard blocked — silently ignore */
    }
  }, []);

  /* ---------- plan ---------- */

  const handlePlan = useCallback(async () => {
    if (!onPlanDay || busy) return;
    await onPlanDay();
  }, [busy, onPlanDay]);

  /* ================================================================ */

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      {/* ============================================================
          CHAT PANEL
      ============================================================ */}

      <GlassCard padding="none" className="flex min-h-[620px] flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-2xl bg-emerald-500/10 text-emerald-600
              "
              aria-hidden
            >
              ✦
            </div>

            <div>
              <h3 className="font-semibold text-black">TimePilot AI</h3>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    busy ? "animate-pulse bg-amber-500" : "bg-emerald-500"
                  }`}
                />
                <span className="text-xs text-black/40" aria-live="polite">
                  {planning
                    ? "Planning your day"
                    : loading
                    ? "Thinking"
                    : "Ready to help"}
                </span>
              </div>
            </div>
          </div>

          {copied && (
            <span
              className="text-xs font-medium text-emerald-600"
              role="status"
            >
              Copied
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="relative flex min-h-[470px] flex-1 flex-col overflow-hidden">
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto p-5 md:p-6"
            aria-live="polite"
            aria-relevant="additions text"
            role="log"
          >
            {messages.length === 0 ? (
              <EmptyState
                busy={busy}
                onPlanDay={handlePlan}
                onSend={submit}
                hasPlanHandler={Boolean(onPlanDay)}
              />
            ) : (
              messages.map((message, index) => (
                <MessageBubble
                  key={`${message.role}-${index}`}
                  role={message.role}
                  content={message.content}
                  onCopy={handleCopy}
                />
              ))
            )}

            {loading && <TypingIndicator />}
          </div>

          {showJump && (
            <button
              type="button"
              onClick={() => scrollToBottom("smooth")}
              className="
                absolute bottom-4 left-1/2 -translate-x-1/2
                rounded-full border border-black/[0.08]
                bg-white px-3 py-1.5
                text-xs font-medium text-black/60
                shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                transition hover:text-black
              "
            >
              Jump to latest ↓
            </button>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-black/[0.06] p-4 md:p-5">
          <Composer
            ref={composerRef}
            value={input}
            onChange={setInput}
            onSubmit={() => submit()}
            disabled={busy}
            sending={loading}
          />

          <div className="mt-2 flex items-center justify-between">
            <p className="text-[10px] text-black/30">
              Press Enter to send · Shift + Enter for a new line
            </p>

            {nearLimit && (
              <span
                className={`text-[10px] font-medium ${
                  remaining <= 0 ? "text-red-600" : "text-amber-600"
                }`}
                aria-live="polite"
              >
                {remaining} characters left
              </span>
            )}
          </div>
        </div>
      </GlassCard>

      {/* ============================================================
          SIDEBAR
      ============================================================ */}

      <aside className="space-y-5">
        <GlassCard padding="lg">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
              AI planning
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold tracking-tight text-black">
            Let AI structure your day.
          </h3>

          <p className="mt-2 text-sm leading-6 text-black/40">
            TimePilot can turn your open tasks into a focused schedule based
            on priorities and available time.
          </p>

          {onPlanDay && (
            <button
              type="button"
              onClick={handlePlan}
              disabled={busy}
              className="
                mt-6 w-full rounded-xl
                bg-emerald-500 px-4 py-3
                text-sm font-semibold text-white
                shadow-[0_10px_30px_rgba(16,185,129,0.18)]
                transition
                hover:-translate-y-0.5
                disabled:cursor-wait
                disabled:opacity-60
                disabled:hover:translate-y-0
              "
            >
              {planning ? "Planning your day..." : "Plan my day"}
            </button>
          )}
        </GlassCard>

        <GlassCard padding="lg">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
            Try asking
          </p>

          <div className="mt-4 space-y-2">
            {SIDE_SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => submit(item)}
                disabled={busy}
                className="
                  w-full rounded-xl
                  border border-black/[0.06]
                  bg-black/[0.02]
                  px-3.5 py-3
                  text-left text-xs font-medium text-black/55
                  transition
                  hover:bg-emerald-500/[0.05]
                  hover:text-emerald-700
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {item}
              </button>
            ))}
          </div>
        </GlassCard>
      </aside>
    </div>
  );
}

/* ================================================================
   SUB-COMPONENTS
================================================================ */

function EmptyState({
  busy,
  onPlanDay,
  onSend,
  hasPlanHandler,
}: {
  busy: boolean;
  onPlanDay: () => void;
  onSend: (v: string) => void;
  hasPlanHandler: boolean;
}) {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
      <div
        className="
          flex h-16 w-16 items-center justify-center
          rounded-2xl bg-emerald-500/10 text-2xl text-emerald-600
        "
        aria-hidden
      >
        ✦
      </div>

      <h4 className="mt-5 text-xl font-semibold text-black">
        What can I help you plan?
      </h4>

      <p className="mt-2 max-w-md text-sm leading-6 text-black/40">
        Ask TimePilot to organize your day, prioritize tasks, or help you
        decide what deserves your attention.
      </p>

      <div className="mt-6 flex max-w-xl flex-wrap justify-center gap-2">
        {STARTER_SUGGESTIONS.map(({ label, action }) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              if (action === "plan" && hasPlanHandler) onPlanDay();
              else onSend(label);
            }}
            disabled={busy}
            className="
              rounded-full
              border border-black/[0.08]
              bg-white
              px-3.5 py-2
              text-xs font-medium text-black/55
              transition
              hover:border-emerald-500/20
              hover:bg-emerald-500/[0.05]
              hover:text-emerald-700
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-label="TimePilot is typing">
      <div className="rounded-2xl rounded-bl-md bg-black/[0.04] px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}