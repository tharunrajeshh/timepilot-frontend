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
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import GlassCard from "./GlassCard";

/* ================================================================
   TYPES
================================================================ */

export type ChatMessage = {
  /** Stable, unique. Required — index keys will silently break edits/streams. */
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Epoch ms. Used for the timestamp under each bubble. */
  createdAt?: number;
  status?: "sending" | "sent" | "error";
};

export type ContextTask = {
  id: string;
  title: string;
  /** Purely presentational; drives the little priority dot. */
  priority?: "low" | "medium" | "high";
};

type AIAssistantProps = {
  messages: ChatMessage[];
  /** A request is in flight (spinner shown, composer disabled). */
  loading?: boolean;
  /** Assistant message is actively streaming — a cursor is appended. */
  streaming?: boolean;
  /** Non-null shows the inline error banner. */
  error?: string | null;
  onSend: (message: string) => Promise<void> | void;
  /** If provided, failed assistant messages get a "Retry" action. */
  onRetry?: (messageId: string) => Promise<void> | void;
  /** If provided, a Stop button replaces Send while a request is in flight. */
  onStop?: () => void;
  onPlanDay?: () => Promise<void> | void;
  planning?: boolean;
  onNewChat?: () => void;
  /** Tasks the model is aware of; shown in the sidebar context card. */
  contextTasks?: ContextTask[];
  focusStats?: { done: number; total: number };
  modelLabel?: string;
  onFeedback?: (messageId: string, value: "up" | "down") => void;
};

/* ================================================================
   CONSTANTS
================================================================ */

const MAX_MESSAGE_LEN = 4000;
const MAX_TEXTAREA_HEIGHT = 180;
const SCROLL_THRESHOLD_PX = 96;
const COPY_FLASH_MS = 1400;

const STARTER_GROUPS: {
  title: string;
  prompts: { label: string; kind: "plan" | "send" }[];
}[] = [
  {
    title: "Plan",
    prompts: [
      { label: "Plan my day", kind: "plan" },
      { label: "Block 2 hours of deep work", kind: "send" },
    ],
  },
  {
    title: "Prioritize",
    prompts: [
      { label: "What should I focus on first?", kind: "send" },
      { label: "What can I drop this week?", kind: "send" },
    ],
  },
  {
    title: "Break down",
    prompts: [
      { label: "Turn my biggest task into steps", kind: "send" },
      { label: "Help me unblock a stuck task", kind: "send" },
    ],
  },
  {
    title: "Reflect",
    prompts: [
      { label: "Summarize my week", kind: "send" },
      { label: "What am I avoiding?", kind: "send" },
    ],
  },
];

const SIDE_SUGGESTIONS = [
  "Which task should I do first?",
  "Give me a realistic schedule.",
  "I have 2 hours — what should I work on?",
  "Help me finish my highest-priority tasks.",
];

/* ================================================================
   UTILITIES
================================================================ */

function sanitizeMessage(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  const cleaned = input.replace(
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
    ""
  );
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function formatTime(ts?: number): string {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

/**
 * Lightweight markdown block parser. Handles paragraphs, bullet lists,
 * and ordered lists. Everything inline is handled by `renderInline`.
 */
function parseBlocks(input: string): Block[] {
  const lines = input.split("\n");
  const blocks: Block[] = [];
  let current: Block | null = null;

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");

    if (!line.trim()) {
      if (current) blocks.push(current);
      current = null;
      continue;
    }

    const ulMatch = line.match(/^\s*[-*•]\s+(.*)$/);
    const olMatch = line.match(/^\s*\d+[.)]\s+(.*)$/);

    if (ulMatch) {
      if (current?.type !== "ul") {
        if (current) blocks.push(current);
        current = { type: "ul", items: [] };
      }
      current.items.push(ulMatch[1]);
    } else if (olMatch) {
      if (current?.type !== "ol") {
        if (current) blocks.push(current);
        current = { type: "ol", items: [] };
      }
      current.items.push(olMatch[1]);
    } else {
      if (current?.type !== "p") {
        if (current) blocks.push(current);
        current = { type: "p", text: line };
      } else {
        current.text += " " + line;
      }
    }
  }

  if (current) blocks.push(current);
  return blocks;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*]+\*)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));

    const token = match[0];
    const key = `${keyPrefix}-${idx++}`;

    if (token.startsWith("**") || token.startsWith("__")) {
      parts.push(
        <strong key={key} className="font-semibold text-current">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={key}
          className="rounded bg-black/[0.07] px-1.5 py-0.5 font-mono text-[0.85em]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }

    cursor = pattern.lastIndex;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

/* ================================================================
   RICH TEXT RENDERER
================================================================ */

const RichText = memo(function RichText({ text }: { text: string }) {
  const blocks = useMemo(() => parseBlocks(text), [text]);

  if (blocks.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => {
        if (block.type === "ul") {
          return (
            <ul key={`ul-${i}`} className="space-y-1.5 pl-4">
              {block.items.map((item, j) => (
                <li key={j} className="relative leading-relaxed">
                  <span
                    aria-hidden
                    className="absolute -left-3 top-[0.55em] h-1 w-1 rounded-full bg-current/45"
                  />
                  {renderInline(item, `u-${i}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={`ol-${i}`} className="space-y-1.5 pl-5">
              {block.items.map((item, j) => (
                <li key={j} className="list-decimal leading-relaxed">
                  {renderInline(item, `o-${i}-${j}`)}
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={`p-${i}`} className="leading-relaxed">
            {renderInline(block.text, `p-${i}`)}
          </p>
        );
      })}
    </div>
  );
});

/* ================================================================
   ICONS (inline, stroke-based, no dependency)
================================================================ */

type IconProps = { className?: string };

function IconCopy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 10.5V4.5A1.5 1.5 0 0 1 4.5 3h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconRetry({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M13 8a5 5 0 1 1-1.5-3.55M13 3v3.5h-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconThumb({ up, className }: IconProps & { up: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden style={up ? undefined : { transform: "scaleY(-1)" }}>
      <path
        d="M5 7.5 7.2 3.2a1.4 1.4 0 0 1 2.55.65l-.2 2.15h2.9a1.5 1.5 0 0 1 1.47 1.8l-.85 4A1.5 1.5 0 0 1 11.6 13H5v-5.5Zm0 0H3.2a.7.7 0 0 0-.7.7V12a.7.7 0 0 0 .7.7H5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSend({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M8 12.5V3.5m0 0 3.5 3.5M8 3.5 4.5 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconStop({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <rect x="4.5" y="4.5" width="7" height="7" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M8 3.5v9m0 0 3.5-3.5M8 12.5 4.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M10 2.5 11.6 7 16 8.5 11.6 10 10 14.5 8.4 10 4 8.5 8.4 7 10 2.5Z"
        fill="currentColor"
      />
      <path d="M15.5 13.5 16.2 15l1.5.7-1.5.7-.7 1.5-.7-1.5L13.3 16l1.5-.7.7-1.8Z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

/* ================================================================
   STREAMING CURSOR & TYPING INDICATOR
================================================================ */

function StreamingCursor() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-4 w-[3px] translate-y-[2px] animate-pulse rounded-sm bg-emerald-500/80"
    />
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start" role="status" aria-label="TimePilot is thinking">
      <div className="rounded-2xl rounded-bl-md bg-black/[0.04] px-4 py-3.5">
        <div className="flex items-center gap-1">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500/70"
              style={{ animationDelay: `${delay}ms`, animationDuration: "1s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MESSAGE ACTIONS
================================================================ */

type MessageActionsProps = {
  role: "user" | "assistant";
  isLast: boolean;
  canRetry: boolean;
  feedback?: "up" | "down";
  onCopy: () => void;
  onRetry?: () => void;
  onFeedback?: (value: "up" | "down") => void;
};

function MessageActions({
  role,
  isLast,
  canRetry,
  feedback,
  onCopy,
  onRetry,
  onFeedback,
}: MessageActionsProps) {
  const showRetry = role === "assistant" && isLast && canRetry && onRetry;
  const showFeedback = role === "assistant" && onFeedback;

  return (
    <div
      className={`
        flex items-center gap-1 pt-1
        opacity-0 transition-opacity
        group-hover:opacity-100 group-focus-within:opacity-100
      `}
    >
      <ActionButton label="Copy message" onClick={onCopy}>
        <IconCopy className="h-3.5 w-3.5" />
      </ActionButton>

      {showRetry && (
        <ActionButton label="Regenerate response" onClick={onRetry}>
          <IconRetry className="h-3.5 w-3.5" />
        </ActionButton>
      )}

      {showFeedback && (
        <>
          <span aria-hidden className="mx-0.5 h-3 w-px bg-black/10" />
          <ActionButton
            label="Good response"
            onClick={() => onFeedback?.("up")}
            active={feedback === "up"}
          >
            <IconThumb up className="h-3.5 w-3.5" />
          </ActionButton>
          <ActionButton
            label="Bad response"
            onClick={() => onFeedback?.("down")}
            active={feedback === "down"}
          >
            <IconThumb up={false} className="h-3.5 w-3.5" />
          </ActionButton>
        </>
      )}
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`
        flex h-6 w-6 items-center justify-center rounded-md
        transition-colors
        ${
          active
            ? "bg-emerald-500/10 text-emerald-600"
            : "text-black/35 hover:bg-black/[0.05] hover:text-black/70"
        }
      `}
    >
      {children}
    </button>
  );
}

/* ================================================================
   MESSAGE BUBBLE
================================================================ */

type BubbleProps = {
  message: ChatMessage;
  isLast: boolean;
  streaming: boolean;
  canRetry: boolean;
  feedback?: "up" | "down";
  onCopy: (content: string) => void;
  onRetry?: (id: string) => void;
  onFeedback?: (id: string, value: "up" | "down") => void;
};

const MessageBubble = memo(function MessageBubble({
  message,
  isLast,
  streaming,
  canRetry,
  feedback,
  onCopy,
  onRetry,
  onFeedback,
}: BubbleProps) {
  const isUser = message.role === "user";
  const isErroring = message.status === "error";

  return (
    <div className={`group flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[88%] flex-col ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`
            rounded-2xl px-4 py-3 text-sm
            ${
              isUser
                ? "rounded-br-md bg-black text-white"
                : "rounded-bl-md bg-black/[0.04] text-black/75"
            }
            ${isErroring ? "ring-1 ring-red-500/30" : ""}
          `}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </p>
          ) : (
            <div className="break-words">
              <RichText text={message.content} />
              {streaming && <StreamingCursor />}
            </div>
          )}
        </div>

        <div className="flex w-full items-center gap-2">
          {message.createdAt && (
            <span
              className={`
                text-[10px] tabular-nums text-black/30
                ${isUser ? "ml-auto mr-0.5 order-2" : "ml-0.5"}
              `}
            >
              {formatTime(message.createdAt)}
            </span>
          )}

          <MessageActions
            role={message.role}
            isLast={isLast}
            canRetry={canRetry}
            feedback={feedback}
            onCopy={() => onCopy(message.content)}
            onRetry={onRetry ? () => onRetry(message.id) : undefined}
            onFeedback={
              onFeedback
                ? (value) => onFeedback(message.id, value)
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
});

/* ================================================================
   COMPOSER
================================================================ */

type ComposerProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  disabled: boolean;
  busy: boolean;
  canStop: boolean;
};

const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(
  function Composer(
    { value, onChange, onSubmit, onStop, disabled, busy, canStop },
    forwardedRef
  ) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    const setRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    // Real auto-grow: measure scrollHeight, clamp to MAX_TEXTAREA_HEIGHT.
    useLayoutEffect(() => {
      const el = localRef.current;
      if (!el) return;
      el.style.height = "auto";
      const next = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT);
      el.style.height = `${next}px`;
      el.style.overflowY = el.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
    }, [value]);

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
        event.preventDefault();
        onSubmit();
      }
    };

    const canSubmit = value.trim().length > 0 && !disabled;

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
          bg-black/[0.02]
          p-2
          transition-all duration-200
          focus-within:border-emerald-500/40
          focus-within:bg-white
          focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.08)]
        "
      >
        <label htmlFor="ai-composer" className="sr-only">
          Ask TimePilot AI
        </label>

        <textarea
          id="ai-composer"
          ref={setRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={MAX_MESSAGE_LEN}
          disabled={disabled}
          placeholder="Ask TimePilot anything…"
          className="
            min-h-11 flex-1 resize-none
            bg-transparent px-2 py-2.5
            text-sm leading-relaxed text-black
            outline-none
            placeholder:text-black/30
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
          style={{ maxHeight: MAX_TEXTAREA_HEIGHT }}
          autoComplete="off"
          spellCheck
        />

        {canStop && onStop ? (
          <button
            type="button"
            onClick={onStop}
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl border border-black/[0.08] bg-white text-black/70
              transition
              hover:border-black/20 hover:text-black
            "
            aria-label="Stop generating"
          >
            <IconStop className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSubmit}
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl bg-black text-white
              transition-all duration-200
              hover:-translate-y-0.5
              disabled:cursor-not-allowed
              disabled:opacity-25
              disabled:hover:translate-y-0
            "
            aria-label={busy ? "Sending message" : "Send message"}
          >
            {busy ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <IconSend className="h-[18px] w-[18px]" />
            )}
          </button>
        )}
      </form>
    );
  }
);

/* ================================================================
   EMPTY STATE
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
    <div className="flex min-h-[420px] flex-col items-center justify-center px-4 py-8 text-center">
      <div
        className="
          flex h-14 w-14 items-center justify-center
          rounded-2xl bg-emerald-500/10 text-emerald-600
          ring-1 ring-emerald-500/15
        "
        aria-hidden
      >
        <IconSparkle className="h-6 w-6" />
      </div>

      <h4 className="mt-5 text-xl font-semibold tracking-tight text-black">
        What can I help you plan?
      </h4>
      <p className="mt-2 max-w-md text-sm leading-6 text-black/45">
        Ask TimePilot to structure your day, prioritize what matters, or break
        a big task into steps you can actually start.
      </p>

      <div className="mt-8 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {STARTER_GROUPS.map((group) => (
          <div key={group.title} className="text-left">
            <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black/30">
              {group.title}
            </p>
            <div className="space-y-1.5">
              {group.prompts.map(({ label, kind }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (kind === "plan" && hasPlanHandler) onPlanDay();
                    else onSend(label);
                  }}
                  disabled={busy}
                  className="
                    w-full rounded-xl
                    border border-black/[0.06]
                    bg-white/60 px-3.5 py-2.5
                    text-left text-xs font-medium text-black/60
                    transition-all duration-150
                    hover:border-emerald-500/25
                    hover:bg-emerald-500/[0.04]
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
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   SIDEBAR — PROGRESS RING
================================================================ */

function ProgressRing({ value, size = 48, stroke = 4 }: { value: number; size?: number; stroke?: number }) {
  const clamped = Math.max(0, Math.min(1, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(0,0,0,0.07)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgb(16 185 129)"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-500 ease-out"
      />
    </svg>
  );
}

/* ================================================================
   MAIN COMPONENT
================================================================ */

export default function AIAssistant({
  messages,
  loading = false,
  streaming = false,
  error = null,
  onSend,
  onRetry,
  onStop,
  onPlanDay,
  planning = false,
  onNewChat,
  contextTasks,
  focusStats,
  modelLabel = "TimePilot v2",
  onFeedback,
}: AIAssistantProps) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const [unread, setUnread] = useState(0);
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const aliveRef = useRef(true);
  const lastLengthRef = useRef(messages.length);

  const busy = loading || planning;
  const remaining = MAX_MESSAGE_LEN - input.length;
  const nearLimit = remaining <= 300;

  /* ---------- lifecycle ---------- */

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  /* ---------- global shortcuts ---------- */

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        composerRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === composerRef.current) {
        composerRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- auto-scroll with unread tracking ---------- */

  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD_PX;
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    setShowJump(false);
    setUnread(0);
  }, []);

  useLayoutEffect(() => {
    const grew = messages.length > lastLengthRef.current;
    lastLengthRef.current = messages.length;

    if (isNearBottom()) {
      scrollToBottom("auto");
    } else if (grew) {
      setUnread((count) => count + 1);
      setShowJump(true);
    }
  }, [messages.length, loading, streaming, isNearBottom, scrollToBottom]);

  /* ---------- submit with draft restore ---------- */

  const submit = useCallback(
    async (value?: string) => {
      const raw = value ?? input;
      const clean = sanitizeMessage(raw, MAX_MESSAGE_LEN).trim();
      if (!clean || busy) return;

      setInput("");
      setShowJump(false);

      try {
        await onSend(clean);
      } catch {
        if (aliveRef.current) {
          setInput(clean); // never lose the draft
          composerRef.current?.focus();
        }
        return;
      }

      if (aliveRef.current) composerRef.current?.focus();
    },
    [busy, input, onSend]
  );

  /* ---------- copy ---------- */

  const handleCopy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        try {
          ta.select();
          document.execCommand("copy");
        } finally {
          document.body.removeChild(ta);
        }
      }
      if (!aliveRef.current) return;
      setCopied(true);
      window.setTimeout(() => {
        if (aliveRef.current) setCopied(false);
      }, COPY_FLASH_MS);
    } catch {
      /* Clipboard blocked — silently ignore. */
    }
  }, []);

  /* ---------- plan ---------- */

  const handlePlan = useCallback(async () => {
    if (!onPlanDay || busy) return;
    await onPlanDay();
  }, [busy, onPlanDay]);

  /* ---------- feedback ---------- */

  const handleFeedback = useCallback(
    (id: string, value: "up" | "down") => {
      setFeedback((prev) => {
        const next = { ...prev };
        if (next[id] === value) delete next[id];
        else next[id] = value;
        return next;
      });
      onFeedback?.(id, value);
    },
    [onFeedback]
  );

  /* ---------- derived ---------- */

  const lastMessageId = messages[messages.length - 1]?.id;
  const focusRatio =
    focusStats && focusStats.total > 0 ? focusStats.done / focusStats.total : 0;

  const statusLabel = planning
    ? "Planning your day"
    : streaming
    ? "Streaming"
    : loading
    ? "Thinking"
    : "Ready to help";

  /* ================================================================ */

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      {/* ============================================================
          CHAT PANEL
      ============================================================ */}

      <GlassCard padding="none" className="flex min-h-[680px] flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-black/[0.06] p-5 md:p-6">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5
                text-emerald-600 ring-1 ring-emerald-500/15
              "
              aria-hidden
            >
              <IconSparkle className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold tracking-tight text-black">
                  TimePilot AI
                </h3>
                <span className="hidden rounded-md bg-black/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-black/40 sm:inline">
                  {modelLabel}
                </span>
              </div>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    busy ? "animate-pulse bg-amber-500" : "bg-emerald-500"
                  }`}
                  aria-hidden
                />
                <span className="truncate text-xs text-black/40" aria-live="polite">
                  {statusLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {copied && (
              <span className="text-xs font-medium text-emerald-600" role="status">
                Copied
              </span>
            )}

            {onNewChat && messages.length > 0 && (
              <button
                type="button"
                onClick={onNewChat}
                className="
                  flex items-center gap-1.5 rounded-lg
                  border border-black/[0.08] bg-white/60
                  px-3 py-1.5 text-xs font-medium text-black/60
                  transition
                  hover:border-black/15 hover:text-black
                "
              >
                <IconPlus className="h-3.5 w-3.5" />
                New
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="relative flex min-h-[480px] flex-1 flex-col overflow-hidden">
          <div
            ref={scrollRef}
            className="flex-1 space-y-5 overflow-y-auto p-5 md:p-6"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
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
                  key={message.id}
                  message={message}
                  isLast={message.id === lastMessageId}
                  streaming={streaming && message.id === lastMessageId}
                  canRetry={Boolean(onRetry)}
                  feedback={feedback[message.id]}
                  onCopy={handleCopy}
                  onRetry={onRetry}
                  onFeedback={onFeedback ? handleFeedback : undefined}
                />
              ))
            )}

            {loading && !streaming && <TypingIndicator />}
          </div>

          {showJump && (
            <button
              type="button"
              onClick={() => scrollToBottom("smooth")}
              className="
                absolute bottom-4 left-1/2 -translate-x-1/2
                flex items-center gap-1.5
                rounded-full border border-black/[0.08]
                bg-white px-3 py-1.5
                text-xs font-medium text-black/70
                shadow-[0_8px_28px_rgba(0,0,0,0.10)]
                transition
                hover:-translate-y-0.5 hover:text-black
              "
            >
              <IconArrowDown className="h-3.5 w-3.5" />
              Jump to latest
              {unread > 0 && (
                <span className="ml-0.5 rounded-full bg-emerald-500 px-1.5 text-[10px] font-semibold text-white">
                  {unread}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div className="border-t border-red-500/15 bg-red-500/[0.04] px-5 py-3 md:px-6" role="alert">
            <div className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden />
              <p className="text-xs leading-5 text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Composer */}
        <div className="border-t border-black/[0.06] p-4 md:p-5">
          <Composer
            ref={composerRef}
            value={input}
            onChange={setInput}
            onSubmit={() => submit()}
            onStop={onStop}
            disabled={busy}
            busy={loading}
            canStop={Boolean(onStop) && (loading || streaming)}
          />

          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="truncate text-[10px] text-black/30">
              <kbd className="rounded border border-black/10 bg-black/[0.03] px-1 font-sans">Enter</kbd> to send ·{" "}
              <kbd className="rounded border border-black/10 bg-black/[0.03] px-1 font-sans">Shift+Enter</kbd> new line ·{" "}
              <kbd className="rounded border border-black/10 bg-black/[0.03] px-1 font-sans">⌘K</kbd> focus
            </p>

            {nearLimit && (
              <span
                className={`shrink-0 text-[10px] font-medium tabular-nums ${
                  remaining <= 0 ? "text-red-600" : "text-amber-600"
                }`}
                aria-live="polite"
              >
                {remaining} left
              </span>
            )}
          </div>
        </div>
      </GlassCard>

      {/* ============================================================
          SIDEBAR
      ============================================================ */}

      <aside className="space-y-5">
        {/* Focus today */}
        {focusStats && (
          <GlassCard padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/35">
                  Today&rsquo;s focus
                </p>
                <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-black">
                  {focusStats.done}
                  <span className="text-base font-normal text-black/30">
                    {" "}
                    / {focusStats.total}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-black/40">tasks completed</p>
              </div>

              <div className="relative flex items-center justify-center">
                <ProgressRing value={focusRatio} />
                <span className="absolute text-[10px] font-semibold tabular-nums text-black/60">
                  {Math.round(focusRatio * 100)}%
                </span>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Plan day */}
        <GlassCard padding="lg">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-black/35">
              AI planning
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold tracking-tight text-black">
            Let AI structure your day.
          </h3>
          <p className="mt-2 text-sm leading-6 text-black/45">
            TimePilot turns your open tasks into a realistic schedule based on
            priorities, energy, and the time you actually have.
          </p>

          {onPlanDay && (
            <button
              type="button"
              onClick={handlePlan}
              disabled={busy}
              className="
                mt-6 flex w-full items-center justify-center gap-2
                rounded-xl bg-emerald-500 px-4 py-3
                text-sm font-semibold text-white
                shadow-[0_10px_30px_rgba(16,185,129,0.22)]
                transition-all duration-200
                hover:-translate-y-0.5 hover:bg-emerald-600
                disabled:cursor-wait
                disabled:opacity-60
                disabled:hover:translate-y-0
              "
            >
              {planning ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Planning your day…
                </>
              ) : (
                <>
                  <IconSparkle className="h-4 w-4" />
                  Plan my day
                </>
              )}
            </button>
          )}
        </GlassCard>

        {/* Referenced context */}
        {contextTasks && contextTasks.length > 0 && (
          <GlassCard padding="lg">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/35">
              In context
            </p>
            <p className="mt-2 text-xs leading-5 text-black/45">
              TimePilot can see these {contextTasks.length} task
              {contextTasks.length === 1 ? "" : "s"} while you chat.
            </p>

            <ul className="mt-4 space-y-1.5">
              {contextTasks.slice(0, 5).map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-2.5 rounded-lg border border-black/[0.05] bg-black/[0.015] px-3 py-2"
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    aria-hidden
                  />
                  <span className="truncate text-xs font-medium text-black/65">
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>

            {contextTasks.length > 5 && (
              <p className="mt-3 text-[10px] text-black/35">
                +{contextTasks.length - 5} more
              </p>
            )}
          </GlassCard>
        )}

        {/* Try asking */}
        <GlassCard padding="lg">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/35">
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
                  group w-full rounded-xl
                  border border-black/[0.06] bg-black/[0.015]
                  px-3.5 py-3
                  text-left text-xs font-medium text-black/60
                  transition-all duration-150
                  hover:border-emerald-500/20
                  hover:bg-emerald-500/[0.05]
                  hover:text-emerald-700
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate">{item}</span>
                  <span
                    aria-hidden
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-60"
                  >
                    <IconSend className="h-3 w-3 -rotate-90" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </GlassCard>
      </aside>
    </div>
  );
}